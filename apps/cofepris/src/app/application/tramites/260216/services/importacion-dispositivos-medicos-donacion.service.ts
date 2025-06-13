import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tramite260216State } from '../estados/tramite260216Store.store';

@Injectable({
  providedIn: 'root'
})
export class ImportacionDispositivosMedicosDonacionService {

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
    getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260216State> {
      return this.http.get<Tramite260216State>('assets/json/260216/respuestaDeActualizacionDe.json');
    }
}
