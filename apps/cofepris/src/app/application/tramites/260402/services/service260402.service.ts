import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DatosDelSolicituteSeccionState } from '../../../shared/estados/stores/datos-del-solicitute-seccion.store';
import { DatosDelSolicituteSeccionStateStore } from '../../../shared/estados/stores/datos-del-solicitute-seccion.store';
import { PermisoImportacionBiologicaState, PermisoImportacionBiologicaStore } from '../../../shared/estados/permiso-importacion-biologica.store';

@Injectable({
  providedIn: 'root',
})
export class Solocitud260402Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private tramite301Store: DatosDelSolicituteSeccionStateStore,private tramite260402:PermisoImportacionBiologicaStore) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * @param DATOS Estado con la información del solicitante y establecimiento.
   */
  actualizarEstadoFormulario(DATOS: DatosDelSolicituteSeccionState): void {
    this.tramite301Store.setEstablecimientoDenominacionRazonSocial(DATOS.establecimientoDenominacionRazonSocial);
    this.tramite301Store.setEstablecimientoCorreoElectronico(DATOS.establecimientoCorreoElectronico);
    this.tramite301Store.setEstablecimientoDomicilioCodigoPostal(DATOS.establecimientoDomicilioCodigoPostal);
    this.tramite301Store.setEstablecimientoDomicilioEstado(DATOS.establecimientoDomicilioEstado);
    this.tramite301Store.setEstablecimientoMunicipioYAlcaldia(DATOS.establecimientoMunicipioYAlcaldia);
    this.tramite301Store.setEstablecimientoDomicilioLocalidad(DATOS.establecimientoDomicilioLocalidad);
    this.tramite301Store.setEstablecimientoDomicilioColonia(DATOS.establecimientoDomicilioColonia);
    this.tramite301Store.setEstablecimientoDomicilioCalle(DATOS.establecimientoDomicilioCalle);
    this.tramite301Store.setEstablecimientoDomicilioLada(DATOS.establecimientoDomicilioLada);
    this.tramite301Store.setEstablecimientoDomicilioTelefono(DATOS.establecimientoDomicilioTelefono);
    this.tramite301Store.setRfcDelProfesionalResponsable(DATOS.rfcDelProfesionalResponsable);
    this.tramite301Store.setNombreDelProfesionalResponsable(DATOS.nombreDelProfesionalResponsable);
    this.tramite301Store.setRepresentanteRfc(DATOS.representanteRfc);
    this.tramite301Store.setRepresentanteNombre(DATOS.representanteNombre); 
    this.tramite301Store.setRepresentanteApellidos(DATOS.apellidoMaterno,DATOS.apellidoPaterno);
  }

  
/**
 * Actualiza los datos relacionados con el pago de derechos en el formulario,
 * utilizando la información proporcionada en el estado de PermisoImportacionBiologica.
 *
 * @param DATOS - Objeto que contiene los datos necesarios para actualizar el pago de derechos,
 * incluyendo clave de referencia, cadena de la dependencia, llave de pago, fecha e importe.
 */
actualizarPagoDerechosFormulario(DATOS: PermisoImportacionBiologicaState): void {
    this.tramite260402.setClaveDeReferncia(DATOS.setClaveDeReferncia);
    this.tramite260402.setCadenaDeLaDependencia(DATOS.setCadenaDeLaDependencia);
    this.tramite260402.setLlaveDePago(DATOS.setLlaveDePago);
    this.tramite260402.setFechaDePago(DATOS.setFechaDePago);
    this.tramite260402.setImporteDePago(DATOS.setImporteDePago);
}
  /**
   * Obtiene los datos del registro de toma de muestras de mercancías.
   * @returns Observable con el estado de los datos del solicitante.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<DatosDelSolicituteSeccionState> {
    return this.http.get<DatosDelSolicituteSeccionState>('assets/json/260402/serviciosExtraordinarios.json');
  }

  /**
   * Obtiene los datos del pago de derechos.
   * @returns Observable con el estado del permiso de importación biológica.
   */
  getPagoDerechos(): Observable<PermisoImportacionBiologicaState> {
    return this.http.get<PermisoImportacionBiologicaState>('assets/json/260402/pagoDerechos.json');
  }
}
