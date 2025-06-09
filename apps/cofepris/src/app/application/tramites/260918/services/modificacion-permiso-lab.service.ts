import { DatosDelSolicituteSeccionState, DatosDelSolicituteSeccionStateStore } from '../../../shared/estados/stores/datos-del-solicitute-seccion.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModificacionPermisoLabService {

  constructor(private http: HttpClient,private datosDelSolicituteSeccionStateStore:DatosDelSolicituteSeccionStateStore) { 
    //
  }

 actualizarEstadoFormulario(DATOS: DatosDelSolicituteSeccionState): void {
  this.datosDelSolicituteSeccionStateStore.update(DATOS);
}


   obtenerDatosInicialesFormulario(): Observable<DatosDelSolicituteSeccionState> {
    return this.http.get<DatosDelSolicituteSeccionState>('assets/json/260918/inicializar_formulario.json');
  }
}
