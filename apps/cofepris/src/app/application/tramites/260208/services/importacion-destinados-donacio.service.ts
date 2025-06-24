import { Tramite260208State, Tramite260208Store } from '../estados/tramite260208Store.store';
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
   * @param tramite260208Store - The store that manages the state of the 260208 process.
   */
  constructor(
    private readonly http: HttpClient,
    private readonly tramite260208Store: Tramite260208Store
  ) { }

  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * 
   * @param DATOS - Estado de la solicitud `Tramite260208State` con la información 
   *                del tipo de solicitud a actualizar en el store.
   */
  actualizarEstadoFormulario(DATOS: Tramite260208State): void {
    this.tramite260208Store.update((state) => ({
      ...state,
      ...DATOS
    }));
  }

  /**
  * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
  * 
  * @returns Observable con los datos del estado de la solicitud `Tramite260208State`,
  *          cargados desde el archivo JSON especificado en la ruta de `assets`.
  */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260208State> {
    return this.http.get<Tramite260208State>('assets/json/260208/datos.json');
  }
}
