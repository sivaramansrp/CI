import { Tramite260209State, Tramite260209Store } from '../estados/tramite260209Store.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportacionDestinadosDonacioService {

  /**
   * Creates an instance of ImportacionDestinadosDonacioService.
   *
   * @param http - The Angular HttpClient used to perform HTTP requests.
   * @param tramite260209Store - The store that manages the state of the 260209 process.
   */
  constructor(
    private readonly http: HttpClient,
    private readonly tramite260209Store: Tramite260209Store
  ) { }

  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * 
   * @param DATOS - Estado de la solicitud `Tramite260209State` con la información 
   *                del tipo de solicitud a actualizar en el store.
   */
  actualizarEstadoFormulario(DATOS: Tramite260209State): void {
    this.tramite260209Store.update((state) => ({
      ...state,
      ...DATOS
    }));
  }

  /**
  * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
  * 
  * @returns Observable con los datos del estado de la solicitud `Solicitud230401State`,
  *          cargados desde el archivo JSON especificado en la ruta de `assets`.
  */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260209State> {
    return this.http.get<Tramite260209State>('assets/json/260209/datos.json');
  }
}
