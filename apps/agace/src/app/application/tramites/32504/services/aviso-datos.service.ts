/**
 * @@Injectable
 * @description Servicio para obtener y actualizar los datos del permiso IMMEX.
 */
import { FormularioGrupo } from '../models/aviso.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LabelValueDatos } from '@ng-mf/data-access-user';
import { Observable } from 'rxjs';
import { Tramite32504Store } from '../estados/tramite32504.store';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisoDatosService {
  /**
   * URL del archivo JSON que contiene los datos del permiso IMMEX.
   */
  private jsonUrl = 'assets/json/32504';

  /**
   * Constructor del servicio AvisoDatosService.
   * @param httpClient Cliente HTTP para realizar solicitudes.
   * @param tramite32504Store Store para manejar el estado del trámite 32504.
   */
  constructor(private httpClient: HttpClient,
    public tramite32504Store: Tramite32504Store
  ) {
    // Código del constructor
  }

  /**
   * Obtiene los datos del permiso IMMEX desde el archivo JSON.
   * @param fileName Nombre del archivo JSON a consultar.
   * @returns Observable con los datos del permiso IMMEX.
   */
  getDatos(fileName: string): Observable<LabelValueDatos[]> {
    return this.httpClient.get<LabelValueDatos[]>(`${this.jsonUrl}/${fileName}`).pipe(
      catchError(error => {
        console.error('Error fetching data from:', this.jsonUrl, error);
        return of([]);
      })
    );
  }

  /**
   * Actualiza el estado del formulario en el store del trámite.
   * @param DATOS Datos del formulario a actualizar.
   */
  actualizarEstadoFormulario(DATOS: FormularioGrupo): void {
    this.tramite32504Store.update((state) => ({
      ...state,
      ...DATOS
    }))
  }

  /**
   * Obtiene los datos de registro de toma de muestras de mercancías.
   * @returns Observable con los datos del formulario de registro.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<FormularioGrupo> {
    return this.httpClient.get<FormularioGrupo>('assets/json/32504/respuestaDeActualizacionDe.json');
  }
}
