import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tramite240106State } from '../estados/tramite240106Store.store';
import { Tramite240106Store } from '../estados/tramite240106Store.store';


@Injectable({
  providedIn: 'root'
})
export class AvisoImportacionSustanciasQuimicasService {
  /**
   * Crea una instancia del servicio AvisoImportacionSustanciasQuimicasService.
   * @param httpClient Cliente HTTP para realizar peticiones.
   * @param tramite24119Store Store del trámite 240119 para manejar el estado.
   */
  constructor(private httpClient: HttpClient,
    public tramite240106Store: Tramite240106Store) { }

  /**
   * Actualiza el estado del formulario en el store del trámite.
   * @param DATOS Datos del formulario a actualizar.
   */
  actualizarEstadoFormulario(DATOS: Tramite240106State): void {
    this.tramite240106Store.update((state) => ({
      ...state,
      ...DATOS
    }))
  }

  /**
   * Obtiene los datos de registro de toma de muestras de mercancías.
   * @returns Observable con los datos del formulario de registro.
   */
  obtenerRegistroTomarMuestrasDatos(): Observable<Tramite240106State> {
    return this.httpClient.get<Tramite240106State>('assets/json/240106/datos-previos.json');
  }
}
