import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tramite260213State } from '../estados/tramite260213Store.store';

@Injectable({
  providedIn: 'root'
})
export class PermisoSanitarioMedicosUsoPersonalService {

  /**
   * Creates an instance of the service.
   * 
   * @param http - The Angular HttpClient used to perform HTTP requests.
   */
  constructor( private readonly http: HttpClient) { }

  /**
  * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
  * 
  * @returns Observable con los datos del estado de la solicitud `Solicitud230401State`,
  *          cargados desde el archivo JSON especificado en la ruta de `assets`.
  */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260213State> {
    return this.http.get<Tramite260213State>('assets/json/260213/respuestaDeActualizacionDe.json');
  }
}
