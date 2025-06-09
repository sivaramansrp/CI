import { PermisoImportacionBiologicaState, PermisoImportacionBiologicaStore } from '../../../shared/estados/permiso-importacion-biologica.store';
import { DatosDelSolicituteSeccionState } from '../../../shared/estados/stores/datos-del-solicitute-seccion.store';
import { DatosDelSolicituteSeccionStateStore } from '../../../shared/estados/stores/datos-del-solicitute-seccion.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para manejar la lógica relacionada con Solicitud260401.
 * 
 * @export
 * @class Solicitud260401Service
 */
@Injectable({
  providedIn: 'root',
})
export class Solicitud260401Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
    /**
     * urlServerCatalogos es una inyección de dependencias que proporciona la URL del servidor para los catálogos.
     */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
 * Constructor del servicio o componente.
 *
 * Inyecta los siguientes servicios y stores:
 * 
 * - `HttpClient`: Servicio para realizar peticiones HTTP.
 * - `DatosDelSolicituteSeccionStateStore`: Store que maneja el estado de la sección de datos del solicitante.
 * - `PermisoImportacionBiologicaStore`: Store que administra el estado relacionado con permisos de importación biológica.
 *
 * El constructor puede incluir lógica de inicialización si es necesario, aunque actualmente está vacío.
 *
 * @param http Servicio Angular para solicitudes HTTP.
 * @param tramite260401Store Store para gestionar estado de datos de solicitante.
 * @param tramite260401 Store para gestionar estado del permiso de importación biológica.
 */
  constructor(private http: HttpClient, private tramite260401Store: DatosDelSolicituteSeccionStateStore,private tramite260401:PermisoImportacionBiologicaStore) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * @param DATOS Estado con la información del solicitante y establecimiento.
   */
  actualizarEstadoFormulario(DATOS: DatosDelSolicituteSeccionState): void {
    this.tramite260401Store.setEstablecimientoDenominacionRazonSocial(DATOS.establecimientoDenominacionRazonSocial);
    this.tramite260401Store.setEstablecimientoCorreoElectronico(DATOS.establecimientoCorreoElectronico);
    this.tramite260401Store.setEstablecimientoDomicilioCodigoPostal(DATOS.establecimientoDomicilioCodigoPostal);
    this.tramite260401Store.setEstablecimientoDomicilioEstado(DATOS.establecimientoDomicilioEstado);
    this.tramite260401Store.setEstablecimientoMunicipioYAlcaldia(DATOS.establecimientoMunicipioYAlcaldia);
    this.tramite260401Store.setEstablecimientoDomicilioLocalidad(DATOS.establecimientoDomicilioLocalidad);
    this.tramite260401Store.setEstablecimientoDomicilioColonia(DATOS.establecimientoDomicilioColonia);
    this.tramite260401Store.setEstablecimientoDomicilioCalle(DATOS.establecimientoDomicilioCalle);
    this.tramite260401Store.setEstablecimientoDomicilioLada(DATOS.establecimientoDomicilioLada);
    this.tramite260401Store.setEstablecimientoDomicilioTelefono(DATOS.establecimientoDomicilioTelefono);
    this.tramite260401Store.setRfcDelProfesionalResponsable(DATOS.rfcDelProfesionalResponsable);
    this.tramite260401Store.setNombreDelProfesionalResponsable(DATOS.nombreDelProfesionalResponsable);
    this.tramite260401Store.setRepresentanteRfc(DATOS.representanteRfc);
    this.tramite260401Store.setRepresentanteNombre(DATOS.representanteNombre); 
    this.tramite260401Store.setRepresentanteApellidos(DATOS.apellidoMaterno,DATOS.apellidoPaterno);
    this.tramite260401Store.setInformacionConfidencial(DATOS.informacionConfidencialRadio)
    this.tramite260401Store.setAduanaDeSalida(DATOS.aduanaDeSalida);
    this.tramite260401Store.setRegimenAlQueSeDestinaraLaMercancía(DATOS.regimenAlQueSeDestinaraLaMercancía);
    this.tramite260401Store.setNoDeLicenciaSanitariaObservaciones(DATOS.noDeLicenciaSanitariaObservaciones);
    this.tramite260401Store.setNoDeLicenciaSanitaria(DATOS.noDeLicenciaSanitaria);
  }

  /**
 * Actualiza los datos relacionados con el pago de derechos en el formulario,
 * utilizando la información proporcionada en el estado de PermisoImportacionBiologica.
 *
 * @param DATOS - Objeto que contiene los datos necesarios para actualizar el pago de derechos,
 * incluyendo clave de referencia, cadena de la dependencia, llave de pago, fecha e importe.
 */
actualizarPagoDerechosFormulario(DATOS: PermisoImportacionBiologicaState): void {
    this.tramite260401.setClaveDeReferncia(DATOS.setClaveDeReferncia);
    this.tramite260401.setCadenaDeLaDependencia(DATOS.setCadenaDeLaDependencia);
    this.tramite260401.setLlaveDePago(DATOS.setLlaveDePago);
    this.tramite260401.setFechaDePago(DATOS.setFechaDePago);
    this.tramite260401.setImporteDePago(DATOS.setImporteDePago);
}

  /**
   * Obtiene los datos del registro de toma de muestras de mercancías.
   * @returns Observable con el estado de los datos del solicitante.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<DatosDelSolicituteSeccionState> {
    return this.http.get<DatosDelSolicituteSeccionState>('assets/json/260401/territorio-nacional-solicitud.json');
  }

    /**
   * Obtiene los datos del pago de derechos.
   * @returns Observable con el estado del permiso de importación biológica.
   */
  getPagoDerechos(): Observable<PermisoImportacionBiologicaState> {
    return this.http.get<PermisoImportacionBiologicaState>('assets/json/260401/pagoDerechos.json');
  }
}