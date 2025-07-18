import { ApiResponse, BuscarRfcResponse, InstalacionesInterface, RFCEnlaceOperativo, TransportistasListaInterface } from '../models/oea-textil-registro.model';
import { Observable, forkJoin } from 'rxjs';
import { Solicitud32611State, Solicitud32611Store } from '../estados/solicitud32611.store';
import { SolicitudCatologoSelectLista, SolicitudRadioLista } from '../models/solicitud.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonaRespuestaTabla } from '../models/personas-notificaciones-tabla.model';


@Injectable({
    providedIn: 'root',
})
export class Solocitud32611Service {
    /**
     * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
     */
    urlServer = ENVIRONMENT.URL_SERVER;

    /**
   * URL base para los catálogos auxiliares en formato JSON.
   * Se obtiene desde la configuración de entorno (`ENVIRONMENT.URL_SERVER_JSON_AUXILIAR`).
   *
   * @type {string}
   * @memberof Solocitud32611Service
   */
    urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

   /**
   * Constructor del servicio Solocitud32611Service.
   *
   * Inyecta el cliente HTTP para realizar peticiones a servicios REST y el store para gestionar el estado del trámite 32611.
   *
   * @param {HttpClient} http Cliente HTTP para peticiones a la API.
   * @param {Tramite32611Store} tramite32611Store Store para la gestión del estado del trámite 32611.
   * @memberof Solocitud32611Service
   */
    constructor(private http: HttpClient, private solicitud32611Store: Solicitud32611Store,) { }
         /**
           * Obtiene las opciones de radio de la solicitud desde un archivo JSON local.
           * @returns Observable con un objeto de tipo SolicitudRadioLista.
           */
          conseguirOpcionDeRadio(): Observable<SolicitudRadioLista> {
            return this.http.get<SolicitudRadioLista>(
              'assets/json/32611/solicitud-radio-lista.json'
            );
          }
           /**
             * Obtiene los catálogos selectivos de la solicitud desde un archivo JSON local.
             * @returns Observable con un objeto de tipo SolicitudCatologoSelectLista.
             */
            conseguirSolicitudCatologoSelectLista(): Observable<SolicitudCatologoSelectLista> {
              return this.http.get<SolicitudCatologoSelectLista>(
                'assets/json/32611/solicitud-catologo-select-lista.json'
              );
            }

      /**
         * Obtiene los datos del catálogo de bancos.
         * Realiza una solicitud HTTP para obtener la lista de bancos desde un archivo JSON.
         *
         * @returns Un observable que emite una lista de objetos de tipo `Catalogo`.
         */
        obtenerDatosBanco(): Observable<Catalogo[]> {
          return this.http.get<Catalogo[]>('assets/json/32611/banco.json');
        }

/**
   * Obtiene múltiples catálogos de selección relacionados con sectores y bimestres.
   * 
   * Este método realiza peticiones HTTP concurrentes para obtener tres catálogos diferentes:
   * - Lista de sectores productivos
   * - Lista de sectores de servicios  
   * - Lista de bimestres
   * 
   * Utiliza `forkJoin` para ejecutar todas las peticiones en paralelo y combinar los resultados
   * en un solo objeto que contiene las tres listas de catálogos.
   * 
   * @returns {Observable<{sectorProductivoList: Catalogo[], sectorServicioList: Catalogo[], bimestreList: Catalogo[]}>} 
   *          Un observable que emite un objeto con las tres listas de catálogos:
   *          - `sectorProductivoList`: Lista de catálogos de sectores productivos
   *          - `sectorServicioList`: Lista de catálogos de sectores de servicios
   *          - `bimestreList`: Lista de catálogos de bimestres
   * 
   * @memberof Solocitud32611Service
   * 
   * @example
   * ```typescript
   * this.service.sectorListaDeSelects().subscribe(result => {
   *   console.log('Sectores productivos:', result.sectorProductivoList);
   *   console.log('Sectores de servicios:', result.sectorServicioList);
   *   console.log('Bimestres:', result.bimestreList);
   * });
   * ```
   */
  sectorListaDeSelects(): Observable<{
  sectorProductivoList: Catalogo[];
  sectorServicioList: Catalogo[];
  bimestreList: Catalogo[];
}> {
  return forkJoin({
    sectorProductivoList: this.http.get<Catalogo[]>('assets/json/32611/sector-productivo-list.json'),
    sectorServicioList: this.http.get<Catalogo[]>('assets/json/32611/sector-servicio-list.json'),
    bimestreList: this.http.get<Catalogo[]>('assets/json/32611/bimestre-list.json'),
  });
}

  /**
   * Obtiene los detalles del RFC desde un archivo JSON local.
   * 
   * @returns {Observable<BuscarRfcResponse>} Un observable que emite los detalles del RFC.
   */
  getRFCDetails(): Observable<BuscarRfcResponse> {
    return this.http.get<BuscarRfcResponse>('assets/json/32611/buscar-rfc-datos.json');
  }


     /**
   * Obtiene la lista de Entidades Federativas.
   * 
   * @returns {Observable<any>} Un observable que contiene los datos de las entidades federativas.
   */
  getEntidadesFederativas(): Observable<ApiResponse<Catalogo>> {
    return this.http.get<ApiResponse<Catalogo>>(`assets/json/32611/entidad-federativa-list.json`);
  }

  /**
   * Obtiene la lista de instalaciones desde un archivo JSON local.
   * 
   * @returns {Observable<ApiResponse<InstalacionesInterface>>} Un observable que emite los datos de las instalaciones.
   */
  getInstalacionesDatos(): Observable<ApiResponse<InstalacionesInterface>> {
    return this.http.get<ApiResponse<InstalacionesInterface>>(`assets/json/32611/instalaciones-list.json`);
  }

    /**
   * Obtiene la lista de Entidades Federativas.
   * 
   * @returns {Observable<any>} Un observable que contiene los datos de las entidades federativas.
   */
  getDomiciliosRegistrados(): Observable<ApiResponse<Catalogo>> {
    return this.http.get<ApiResponse<Catalogo>>(`assets/json/32611/domicilios-registrados-list.json`);
  }

  getTipoInstalacion(): Observable<ApiResponse<Catalogo>> {
    return this.http.get<ApiResponse<Catalogo>>(`assets/json/32611/tipo-Instalacion-list.json`);
  }

  /**
     * Actualiza el estado del formulario en el store del trámite 32611.
     *
     * Este método recibe un objeto de tipo `Solicitud32611State` con los datos a actualizar
     * y los establece en el store correspondiente mediante el método `establecerDatos`.
     *
     * @param {Solicitud32611State} DATOS - Datos actualizados del formulario.
     * @memberof Solocitud32611Service
     */
    actualizarEstadoFormulario(DATOS: Solicitud32611State): void {
        this.solicitud32611Store.establecerDatos(DATOS);
    }

  /**
   * Obtiene los datos de registro de toma de muestras de mercancías desde un archivo JSON local.
   *
   * Realiza una petición HTTP GET para recuperar la información del formulario desde el archivo
   * `assets/json/32611/campos-formulario.json` y la retorna como un observable de tipo `Solicitud32611State`.
   *
   * @returns {Observable<Solicitud32611State>} Observable con los datos del formulario.
   * @memberof Solocitud32611Service
   */
    getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud32611State> {
        return this.http.get<Solicitud32611State>('assets/json/32611/guardar-datos-formulario.json');
    }

  empresaListaDeSelects(): Observable<{
  enSuCaracterDeList: Catalogo[];
  nacionalidadList: Catalogo[];
  tipoDePersonaList: Catalogo[];
}> {
  return forkJoin({
    enSuCaracterDeList: this.http.get<Catalogo[]>('assets/json/32611/en-su-caracter-de-list.json'),
    nacionalidadList: this.http.get<Catalogo[]>('assets/json/32611/nacionali-dad-list.json'),
    tipoDePersonaList: this.http.get<Catalogo[]>('assets/json/32611/tipo-de-persona-list.json'),
  });
}



 /**
   * Obtiene los datos de una empresa por RFC
   * @param rfc RFC de la empresa a buscar
   * @returns Observable con los datos de la empresa
   */
  conseguirDatosPorRFC(_rfc: string): Observable<{ [key: string]: RFCEnlaceOperativo }> {
    return this.http.get<{ [key: string]: RFCEnlaceOperativo }>('assets/json/32611/rfc-datos.json');
  }
  /**
   * Obtiene la lista de transportistas desde un archivo JSON local.
   * @returns Observable con un arreglo de TransportistasTable.
   */
  conseguirTransportistasLista(_rfc: string): Observable<{ [key: string]: TransportistasListaInterface }> {
    return this.http.get<{ [key: string]: TransportistasListaInterface }>('assets/json/32611/transportistas-lista.json');
  }

   getDatos(): Observable<Solicitud32611State> {
    return this.http.get<Solicitud32611State>('assets/json/32611/datos.json');
  }


    /**
   * Obtiene los datos de la tabla de personas.
   * Realiza una petición a un recurso local en formato JSON que contiene datos relacionados con personas.
   *
   * @returns {Observable<PersonaRespuestaTabla>} Un observable con los datos de la tabla de personas.
   * @memberof SolicitudDeRegistroInvocarService
   */
  obtenerPersonaTablaDatos(): Observable<PersonaRespuestaTabla> {
    return this.http.get<PersonaRespuestaTabla>('assets/json/32611/personas-notificacione.json');
  }

  /**
  * Obtiene los datos de la solicitud.
  * @returns Observable con los datos de la solicitud.
  */
  getDatosDeLaSolicitud(): Observable<Solicitud32611State> {
    return this.http.get<Solicitud32611State>('assets/json/32611/datos-de-la-solicitud-terceros.json');
  }

  /**
   * Obtiene los datos de la solicitud de OEA Textil.
   * @returns Observable con los datos de la solicitud.
   */
  getDatosrubroTextil(): Observable<Solicitud32611State> {
    return this.http.get<Solicitud32611State>('assets/json/32611/rubro-IVA-textil-datos.json');
  }

}
