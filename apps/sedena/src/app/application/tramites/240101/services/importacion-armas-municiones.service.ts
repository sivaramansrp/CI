import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LabelValueDatos } from '@ng-mf/data-access-user';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Tramite240101State, Tramite240101Store } from '../estados/tramite240101Store.store';


@Injectable({
  providedIn: 'root'
})
export class ImportacionArmasMunicionesService {

  /**
   * URL del archivo JSON que contiene los datos del permiso IMMEX.
   */
  private jsonUrl = 'assets/json/240101';

  constructor(private httpClient: HttpClient,
    public tramite240101Store: Tramite240101Store) { }

  /**
   * Actualiza el estado del formulario en el store del trámite.
   * @param DATOS Datos del formulario a actualizar.
   */
  actualizarEstadoFormulario(DATOS: Tramite240101State): void {
    this.tramite240101Store.update((state) => ({
      ...state,
      ...DATOS
    }))
  }

  /**
   * Obtiene los datos de registro de toma de muestras de mercancías.
   * @returns Observable con los datos del formulario de registro.
   */
  obtenerRegistroTomarMuestrasDatos(): Observable<Tramite240101State> {
    return this.httpClient.get<Tramite240101State>('assets/json/240101/respuestaDeActualizacionDe.json');
  }
}
