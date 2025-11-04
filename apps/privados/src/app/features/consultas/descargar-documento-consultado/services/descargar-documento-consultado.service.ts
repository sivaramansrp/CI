import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthInformationService } from '@/features/auth/services/auth-information.service';
import { TypeResponseStatus } from '@/shared/utils/serviceUtils';
import { SessionStorageService } from '@/shared/services/session-storage.service';
import { FullReportsResponse } from '@/features/consultas/descargar-documento-consultado/interfaces/descargar-documento-consultado.interface';

@Injectable({
  providedIn: 'root',
})
export class DescargarDocumentoConsultadoService {
  private authInformationService = inject(AuthInformationService);
  private http = inject(HttpClient);
  private sessionStorage = inject(SessionStorageService);
  private baseUrl = 'https://consultas-frontend.v30.ultrasist.net/api/v1/aereos';

  public folioFullReport = signal<string>('');

  constructor() {
    this.loadFromSessionStorage();
  }

  getFullReport() {
    this.sessionStorage.set('folioFullReport', this.folioFullReport());
    return this.http
      .get<FullReportsResponse>(
        `${this.baseUrl}/reportes/reporte-completo/${this.authInformationService.authInfo.rfc}`,
        {
          params: {
            folio: this.folioFullReport(),
          },
        },
      )
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.log('Error fetching ', error);
          return throwError(() => new Error('No se pudo obtener la empresa transportista IATA'));
        }),
      );
  }

  downloadFullReport(): Observable<TypeResponseStatus> {
    return this.http
      .get(`${this.baseUrl}/reportes/reporte-completo/${this.folioFullReport()}/download`, {
        responseType: 'blob',
      })
      .pipe(
        tap((blob) => {
          // Immediate download
          const a = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = `reporte-completo-${this.folioFullReport()}.csv`;
          a.click();
          window.URL.revokeObjectURL(url);
        }),
        map(() => ({ success: true })),
        catchError((error) => {
          console.error('Error fetching', error);
          return throwError(() => new Error('No se pudo generar el archivo'));
        }),
      );
  }

  private loadFromSessionStorage() {
    const folioFullReport = this.sessionStorage.get<string>('folioFullReport');
    if (folioFullReport) {
      this.folioFullReport.set(folioFullReport);
    }
  }
}
