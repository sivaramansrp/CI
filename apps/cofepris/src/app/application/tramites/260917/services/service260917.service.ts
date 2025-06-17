import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Solicitud260917State, Tramite260917Store } from '../estados/tramites/tramite260917.store';


@Injectable({
  providedIn: 'root',
})
export class Solocitud260917Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private tramite301Store: Tramite260917Store) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * @param DATOS Estado con la información del solicitante y establecimiento.
   */
  actualizarEstadoFormulario(DATOS: Solicitud260917State): void {
    this.tramite301Store.setDenominacionORazonSocial(DATOS.denominacionORazonSocial);
    this.tramite301Store.setCorreoElectronico(DATOS.correoElectronico);
    this.tramite301Store.setCodigoPostal(DATOS.codigoPostal);
    this.tramite301Store.setEstado(DATOS.estado);
    this.tramite301Store.setMunicipio(DATOS.municipio);
    this.tramite301Store.setLocalidad(DATOS.localidad);
    this.tramite301Store.setColonia(DATOS.colonia);
    this.tramite301Store.setCalle(DATOS.calle);
    this.tramite301Store.setLada(DATOS.lada);
    this.tramite301Store.setTelefono(DATOS.telefono);
    this.tramite301Store.setAvisoCheckbox(DATOS.avisoCheckbox);
    this.tramite301Store.setLicenciaSanitaria(DATOS.licenciaSanitaria);
    this.tramite301Store.setMarcarEnCasoDeQueSea(DATOS.marcarEnCasoDeQueSea);
    this.tramite301Store.setRegimen(DATOS.regimen);
    this.tramite301Store.setAduanasEntradas(DATOS.aduanasEntradas);
    this.tramite301Store.setRfc(DATOS.rfc);
    this.tramite301Store.setNombre(DATOS.nombre);
    this.tramite301Store.setApellidoPaterno(DATOS.apellidoPaterno);
    this.tramite301Store.setApellidoMaterno(DATOS.apellidoMaterno);
    this.tramite301Store.setAceptaPublicacion(DATOS.aceptaPublicacion);
    
  }


  
// /**
//  * Actualiza los datos relacionados con el pago de derechos en el formulario,
//  * utilizando la información proporcionada en el estado de PermisoImportacionBiologica.
//  *
//  * @param DATOS - Objeto que contiene los datos necesarios para actualizar el pago de derechos,
//  * incluyendo clave de referencia, cadena de la dependencia, llave de pago, fecha e importe.
//  */
// actualizarPagoDerechosFormulario(DATOS: PermisoImportacionBiologicaState): void {
//     this.tramite260402.setClaveDeReferncia(DATOS.setClaveDeReferncia);
//     this.tramite260402.setCadenaDeLaDependencia(DATOS.setCadenaDeLaDependencia);
//     this.tramite260402.setLlaveDePago(DATOS.setLlaveDePago);
//     this.tramite260402.setFechaDePago(DATOS.setFechaDePago);
//     this.tramite260402.setImporteDePago(DATOS.setImporteDePago);
// }
  /**
   * Obtiene los datos del registro de toma de muestras de mercancías.
   * @returns Observable con el estado de los datos del solicitante.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud260917State> {
    return this.http.get<Solicitud260917State>('assets/json/260917/serviciosExtraordinarios.json');
  }

  // /**
  //  * Obtiene los datos del pago de derechos.
  //  * @returns Observable con el estado del permiso de importación biológica.
  //  */
  // getPagoDerechos(): Observable<PermisoImportacionBiologicaState> {
  //   return this.http.get<PermisoImportacionBiologicaState>('assets/json/260402/pagoDerechos.json');
  // }
}
