import { CancelacionesState, CancelacionesStore } from '../estados/cancelaciones.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private cancelacionesStore: CancelacionesStore,) {
    // Lógica de inicialización si es necesario
  }

  actualizarEstadoFormulario(DATOS: CancelacionesState): void {
    if (DATOS.entidadFederativa) {
      this.cancelacionesStore.setEntidadFed(DATOS.entidadFederativa);
    }
    if (DATOS.colonia) {
      this.cancelacionesStore.setColonia(DATOS.colonia);
    }
    if (DATOS.localidad) {
      this.cancelacionesStore.setLocalidad(DATOS.localidad);
    }
    if (DATOS.municipio) {
      this.cancelacionesStore.setMunicipiosAlcaldia(DATOS.municipio);
    }
    this.cancelacionesStore.setPaisInput(DATOS.paisInput);
    this.cancelacionesStore.setNumeroInterior(DATOS.numeroInterior);
    this.cancelacionesStore.setCodigoPostal(DATOS.codigoPostal);
    this.cancelacionesStore.setTelefono(DATOS.telefono);
    this.cancelacionesStore.setNombre(DATOS.nombre);
    this.cancelacionesStore.setApellidoPaterno(DATOS.apellidoPaterno);
    this.cancelacionesStore.setCorreoElectronico(DATOS.correoElectronico);
    this.cancelacionesStore.setRfcIngresado(DATOS.rfcIngresado);
    this.cancelacionesStore.setMotivoCancelacion(DATOS.motivoCancelacion);
    this.cancelacionesStore.setEntidadExterna(DATOS.entidadExterna);
   this.cancelacionesStore.setNombreSolicitanteIPC(DATOS.nombreSolicitanteIPC);
   this.cancelacionesStore.setCargoSolicitanteIPC(DATOS.cargoSolicitanteIPC);
   this.cancelacionesStore.setFolioOficioSolicitudIPC(DATOS.folioOficioSolicitudIPC);
   this.cancelacionesStore.setCorreoSolicitanteIPC(DATOS.correoSolicitanteIPC);
  }

  getRegistroTomaMuestrasMercanciasData(): Observable<CancelacionesState> {
    return this.http.get<CancelacionesState>('assets/json/140201/actualizar-datos-estado.json');
  }

}
