import { DatosDelSolicituteSeccionState, DatosDelSolicituteSeccionStateStore } from '../../../shared/estados/stores/datos-del-solicitute-seccion.store';
import { PermisoImportacionBiologicaState, PermisoImportacionBiologicaStore } from '../../../shared/estados/permiso-importacion-biologica.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModificacionPermisoLabService {

  constructor(private http: HttpClient,private datosDelSolicituteSeccionStateStore:DatosDelSolicituteSeccionStateStore,private permisoImportacionBiologicaStore: PermisoImportacionBiologicaStore) { 
    //
  }

  actualizarEstadoFormulario(DATOS: DatosDelSolicituteSeccionState): void {
    this.datosDelSolicituteSeccionStateStore.update(DATOS);
  }

  actualizarValoresFormularioPagoDerechos(DATOS: PermisoImportacionBiologicaState): void {
    this.permisoImportacionBiologicaStore.setClaveDeReferncia(DATOS.setClaveDeReferncia);
    this.permisoImportacionBiologicaStore.setCadenaDeLaDependencia(DATOS.setCadenaDeLaDependencia);
    this.permisoImportacionBiologicaStore.setBanco(DATOS.setBanco);
    this.permisoImportacionBiologicaStore.setLlaveDePago(DATOS.setLlaveDePago);
    this.permisoImportacionBiologicaStore.setFechaDePago(DATOS.setFechaDePago);
    this.permisoImportacionBiologicaStore.setImporteDePago(DATOS.setImporteDePago);
  }

  obtenerDatosInicialesFormulario(): Observable<DatosDelSolicituteSeccionState> {
    return this.http.get<DatosDelSolicituteSeccionState>('assets/json/260918/inicializar_formulario.json');
  }

  obtenerValoresFormularioPagoDerechos(): Observable<PermisoImportacionBiologicaState> {
    return this.http.get<PermisoImportacionBiologicaState>('assets/json/260918/inicializar-formulario-pago-derechos.json');
  }
}
