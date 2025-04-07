import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SolicitudCatologo } from '../../models/solicitud.model';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(public http: HttpClient) {
    //
  }

  public conseguirSolicitudCatologo(): Observable<SolicitudCatologo> {
    return this.http
      .get<SolicitudCatologo>('assets/json/6101/solicitud-catalogo.json')
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
