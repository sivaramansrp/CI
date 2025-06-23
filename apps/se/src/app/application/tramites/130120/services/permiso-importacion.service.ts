import { DatosGrupos } from '../models/permiso-importacion-modification.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermisoImportacionStore } from '../estados/permiso-importacion.store';

@Injectable({
  providedIn: 'root'
})
export class PermisoImportacionService {

  constructor(private readonly http: HttpClient,
  private store: PermisoImportacionStore
  ) {
      // constructor code
    }


  /**
   * Actualiza el estado del formulario en el store del trámite.
   * @param DATOS Datos del formulario a actualizar.
   */
  actualizarEstadoFormulario(DATOS: DatosGrupos): void {
    this.store.update((state) => ({
      ...state,
      ...DATOS
    }))
  }

  /**
   * Obtiene los datos de registro de toma de muestras de mercancías.
   * @returns Observable con los datos del formulario de registro.
   */
  obtenerRegistroTomarMuestrasDatos(): Observable<DatosGrupos> {
    return this.http.get<DatosGrupos>('assets/json/130120/respuestaDeActualizacionDe.json');
  }
}
