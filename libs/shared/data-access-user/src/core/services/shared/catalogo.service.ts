
/**
 * @fileoverview Servicio centralizado para el manejo de catálogos del sistema VUCEM.
 * 
 * Este archivo contiene el servicio principal para la consulta y gestión de todos los catálogos
 * utilizados en el sistema VUCEM, incluyendo países, estados, medios de transporte, servicios IMMEX,
 * tratados comerciales y clasificaciones NICO.
 * 
 * @version 1.0.0
 * @since 1.0.0
 * @author Sistema VUCEM
 */

import { CATALOGO_ENTIDADES_FEDERATIVAS, CATALOGO_ESTADOS, CATALOGO_IDIOMA, CATALOGO_IMMEX, CATALOGO_MEDIO_TRANSPORTE, CATALOGO_NICO, CATALOGO_PAISES, CATALOGO_PAISES_BLOQUE, CATALOGO_PAIS_BLOQUE_CLAVE, CATALOGO_REPRESENTACION_FEDERAL, CATALOGO_SECTORES, CATALOGO_SELECCIONAR_REGLA, CATALOGO_TIPO_FACTURA, CATALOGO_TRATADOS_ACUERDOS, CATALOGO_TRATADO_ACUERDO, CATALOGO_TRATADO_ACUERDO_PAIS, CATALOGO_TRATADO_ACUERDO_PAIS_TITRAC, CATALOGO_UNIDAD_MASA_BRUTA, COMUN_URL, UNIDADES_MEDIDA_COMERCIAL } from '../../servers/api-router';
import { BaseResponse } from '../../models/shared/base-response.model';
import { Catalogo } from '../../models/shared/catalogos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio centralizado para la gestión de catálogos del sistema VUCEM.
 * 
 * Este servicio proporciona métodos para consultar diferentes tipos de catálogos
 * utilizados en los trámites del sistema, incluyendo:
 * - Catálogos geográficos (países, estados)
 * - Catálogos comerciales (tratados, acuerdos, medios de transporte)
 * - Catálogos especializados (IMMEX, NICO)
 * - Catálogos de clasificación y agrupación
 * 
 * Todos los métodos retornan Observables que emiten objetos BaseResponse
 * conteniendo arrays de elementos Catalogo, proporcionando una interfaz
 * consistente para el manejo de datos de catálogos.
 * 
 * @description
 * El servicio utiliza el patrón de inyección de dependencias de Angular
 * y está configurado como singleton ('root') para optimizar el uso de memoria
 * y mantener consistencia en toda la aplicación.
 * 
 * @example
 * ```typescript
 * // Inyección en un componente
 * constructor(private catalogoService: CatalogoServices) {}
 * 
 * // Uso básico para obtener países
 * this.catalogoService.paisesCatalogo('110219')
 *   .subscribe(response => {
 *     this.paises = response.datos;
 *   });
 * ```
 * 
 * @see BaseResponse
 * @see Catalogo
 * @see HttpClient
 * @since 1.0.0
 * @author Sistema VUCEM
 */
@Injectable({
  providedIn: 'root'
})
export class CatalogoServices {
  /**
   * URL base del host para todas las consultas de catálogos.
   * 
   * Esta propiedad almacena la URL base configurada desde las variables de entorno
   * y se utiliza como prefijo para construir todos los endpoints de los catálogos.
   * 
   * @type {string}
   * @readonly
   * @since 1.0.0
   */
  host: string;

  /**
   * Constructor del servicio de catálogos.
   * 
   * Inicializa el servicio configurando la URL base del host desde las constantes
   * de configuración e inyectando el cliente HTTP necesario para realizar las
   * consultas a los diferentes endpoints de catálogos.
   * 
   * @param http - Cliente HTTP de Angular para realizar peticiones a los servicios REST
   * 
   * @example
   * ```typescript
   * // Angular maneja la inyección automáticamente
   * constructor(private catalogoService: CatalogoServices) {
   *   // El servicio está listo para usar
   * }
   * ```
   * 
   * @see HttpClient
   * @see COMUN_URL.BASE_URL
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  constructor(private http: HttpClient) {
    this.host = `${COMUN_URL.BASE_URL}`;
  }


  /**
   * Obtiene el catálogo de servicios IMMEX (Industria Manufacturera, Maquiladora y de Servicios de Exportación).
   * 
   * Este método consulta el catálogo de servicios disponibles bajo el programa IMMEX,
   * que permite a las empresas importar temporalmente bienes para ser utilizados en
   * procesos productivos o de servicios destinados a la exportación, sin cubrir
   * el pago del impuesto general de importación.
   * 
   * @param tramite - Identificador único del trámite (ej: '110219', '130118') que determina
   *                  el contexto y versión del catálogo IMMEX a consultar
   * 
   * @returns {Observable<BaseResponse<Catalogo[]>>} Observable que emite la respuesta del servidor
   *          conteniendo el array de servicios IMMEX disponibles
   * 
   * @throws {HttpErrorResponse} Error HTTP si la consulta falla o el servicio no está disponible
   * 
   * @example
   * ```typescript
   * this.catalogoServices.immexCatalogo('110219')
   *   .pipe(
   *     takeUntil(this.destroyed$),
   *     catchError(error => {
   *       console.error('Error al obtener catálogo IMMEX:', error);
   *       return of({ datos: [], exito: false });
   *     })
   *   )
   *   .subscribe(response => {
   *     if (response.exito) {
   *       this.serviciosIMMEX = response.datos;
   *     }
   *   });
   * ```
   * 
   * @see CATALOGO_IMMEX
   * @see BaseResponse
   * @see Catalogo
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  immexCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_IMMEX(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de estados de la República Mexicana.
   * 
   * Este método consulta el catálogo oficial de entidades federativas (estados)
   * de México, incluyendo información como códigos oficiales, nombres completos
   * y datos administrativos relevantes para los trámites del sistema VUCEM.
   * 
   * @param tramite - Identificador del trámite que determina la versión específica
   *                  del catálogo de estados a consultar
   * 
   * @returns {Observable<BaseResponse<Catalogo[]>>} Observable que emite la respuesta
   *          conteniendo el array completo de estados mexicanos
   * 
   * @throws {HttpErrorResponse} Error HTTP en caso de falla en la comunicación con el servidor
   * 
   * @example
   * ```typescript
   * // Cargar estados para un selector
   * this.catalogoServices.estadosCatalogo('110219')
   *   .subscribe(response => {
   *     this.estadosDisponibles = response.datos.map(estado => ({
   *       clave: estado.clave,
   *       nombre: estado.descripcion
   *     }));
   *   });
   * 
   * this.catalogoServices.estadosCatalogo('130118')
   *   .pipe(
   *     map(response => response.datos.filter(estado => estado.activo))
   *   )
   *   .subscribe(estadosActivos => {
   *     this.catalogoEstados.catalogos = estadosActivos;
   *   });
   * ```
   * 
   * @see CATALOGO_ESTADOS
   * @see BaseResponse
   * @see Catalogo
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  estadosCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_ESTADOS(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo internacional de países.
   * 
   * Este método consulta el catálogo oficial de países reconocidos internacionalmente,
   * incluyendo códigos ISO, nombres oficiales en español, y información relevante
   * para operaciones de comercio exterior y trámites aduaneros del sistema VUCEM.
   * 
   * @param tramite - Identificador del trámite que especifica el contexto y versión
   *                  del catálogo de países a consultar
   * 
   * @returns {Observable<BaseResponse<Catalogo[]>>} Observable que emite la respuesta
   *          del servidor con el listado completo de países disponibles
   * 
   * @throws {HttpErrorResponse} Error HTTP si hay problemas de conectividad o el servicio no responde
   * 
   * @example
   * ```typescript
   * this.catalogoServices.paisesCatalogo('110219')
   *   .pipe(
   *     takeUntil(this.destroyed$)
   *   )
   *   .subscribe(response => {
   *     this.catalogoPaises.catalogos = response.datos;
   *     this.paisesDisponibles = true;
   *   });
   * 
   * this.catalogoServices.paisesCatalogo('130118')
   *   .pipe(
   *     map(response => response.datos.filter(pais => 
   *       pais.descripcion.includes('América')
   *     ))
   *   )
   *   .subscribe(paisesAmerica => {
   *     this.paisesRegionales = paisesAmerica;
   *   });
   * ```
   * 
   * @see CATALOGO_PAISES
   * @see BaseResponse
   * @see Catalogo
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  paisesCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_PAISES(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de códigos NICO (Nomenclatura de Designación y Codificación de Mercancías).
   * 
   * Este método consulta el catálogo de códigos NICO asociados a una fracción arancelaria específica.
   * Los códigos NICO proporcionan una clasificación detallada de mercancías para efectos de
   * comercio exterior, complementando la información de las fracciones arancelarias con
   * especificaciones técnicas y comerciales más precisas.
   * 
   * @param tramite - Identificador del trámite que determina el contexto de la consulta
   * @param claveFraccion - Código de la fracción arancelaria para la cual se requieren
   *                        los códigos NICO asociados (ej: '72162101')
   * 
   * @returns {Observable<BaseResponse<Catalogo[]>>} Observable que emite la respuesta
   *          conteniendo el array de códigos NICO específicos para la fracción
   * 
   * @throws {HttpErrorResponse} Error HTTP si la fracción no existe o hay problemas de conectividad
   * 
   * @example
   * ```typescript
   * this.catalogoServices.nicosCatalogo('110219', '72162101')
   *   .pipe(
   *     takeUntil(this.destroyed$),
   *     catchError(error => {
   *       this.mostrarError('No se encontraron códigos NICO para esta fracción');
   *       return of({ datos: [], exito: false });
   *     })
   *   )
   *   .subscribe(response => {
   *     if (response.exito && response.datos.length > 0) {
   *       this.codigosNICO = response.datos;
   *       this.habilitarSelectorNICO = true;
   *     } else {
   *       this.codigosNICO = [];
   *       this.habilitarSelectorNICO = false;
   *     }
   *   });
   * 
   * this.fraccionControl.valueChanges
   *   .pipe(
   *     debounceTime(300),
   *     distinctUntilChanged(),
   *     switchMap(fraccion => 
   *       this.catalogoServices.nicosCatalogo('130118', fraccion)
   *     )
   *   )
   *   .subscribe(nicosResponse => {
   *     this.actualizarNICOsDisponibles(nicosResponse.datos);
   *   });
   * ```
   * 
   * @see CATALOGO_NICO
   * @see BaseResponse
   * @see Catalogo
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  nicosCatalogo(tramite: string, claveFraccion: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_NICO(tramite, claveFraccion)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de tratados y acuerdos según el trámite y el tipo de tratado/acuerdo especificados.
   *
   * @param tramite - Identificador del trámite para filtrar los datos del catálogo.
   * @param ideTipoTratadoAcuerdo - Identificador del tipo de tratado o acuerdo.
   * @returns Un observable que emite la respuesta base con el arreglo de elementos del catálogo.
   */
  tratadosAcuerdosCatalogoDatos(tramite: string, ideTipoTratadoAcuerdo: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_TRATADO_ACUERDO(tramite, ideTipoTratadoAcuerdo)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
 * Obtiene el catálogo de tratados y acuerdos.
 * @param {string} tramite - El ID del trámite.
 * @param {string} ideTipoTratadoAcuerdo - El ID del tipo de tratado/acuerdo.
 * @returns {Observable<BaseResponse<Catalogo[]>>}
 */
  tratadosAcuerdosCatalogo(tramite: string, ideTipoTratadoAcuerdo: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_TRATADOS_ACUERDOS(tramite, ideTipoTratadoAcuerdo)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }



  /*
   * Obtiene el catálogo de países (bloques).
   * @param {string} tramite - El ID del trámite.
   * @returns {Observable<BaseResponse<Catalogo[]>>}
   */
  paisesBloqueCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_PAISES_BLOQUE(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
   * Obtiene el catálogo de entidades federativas.
   * @param {string} tramite - El ID del trámite.
   * @returns {Observable<BaseResponse<Catalogo[]>>}
   */
  entidadesFederativasCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_ENTIDADES_FEDERATIVAS(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
   * Obtiene el catálogo de representación federal.
   * @param {string} tramite - El ID del trámite.
   * @param {string} cveEntidad - La clave de la entidad.
   * @returns {Observable<BaseResponse<Catalogo[]>>}
   */
  representacionFederalCatalogo(tramite: string, cveEntidad: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_REPRESENTACION_FEDERAL(tramite, cveEntidad)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
   * Obtiene el catálogo de tipos de factura.
   * @param {string} tramite - El ID del trámite.
   * @returns {Observable<BaseResponse<Catalogo[]>>}
   */
  tipoFacturaCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_TIPO_FACTURA(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
   * Obtiene el catálogo de unidad de medida de la masa bruta.
   * @param {string} tramite - El ID del trámite.
   * @returns {Observable<BaseResponse<Catalogo[]>>}
   */
  unidadMasaBrutaCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_UNIDAD_MASA_BRUTA(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
   * Obtiene el catálogo de idiomas.
   * @param {string} tramite - El ID del trámite.
   * @returns {Observable<BaseResponse<Catalogo[]>>}
   */
  catalogoIdioma(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_IDIOMA(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
   * Obtiene el catálogo de medios de transporte.
   * @param {string} tramite - El ID del trámite.
   * @returns {Observable<BaseResponse<Catalogo[]>>}
   */
  catalogoMedioTransporte(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_MEDIO_TRANSPORTE(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
   * Obtiene el catálogo de unidades de medida comercial.
   * @param {string} tramite - El ID del trámite.
   * @returns {Observable<BaseResponse<Catalogo[]>>}
   */
  unidadesMedidaComercialCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${UNIDADES_MEDIDA_COMERCIAL(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de países organizados por bloques comerciales.
   * 
   * Este método consulta el catálogo de países agrupados por bloques o regiones
   * comerciales (como TLCAN/T-MEC, Unión Europea, MERCOSUR, etc.), facilitando
   * la selección de países según los acuerdos comerciales vigentes y las
   * preferencias arancelarias aplicables.
   *
   * @param tramite - Identificador del trámite para el cual se requiere el catálogo
   *                  de países organizados por bloques comerciales
   * 
   * @returns {Observable<BaseResponse<Catalogo[]>>} Observable que emite la respuesta
   *          con el listado de países agrupados por bloques comerciales
   * 
   * @throws {HttpErrorResponse} Error HTTP si el servicio no está disponible
   * 
   * @example
   * ```typescript
   * this.catalogoServices.paisBloqueCatalogo('110219')
   *   .pipe(
   *     takeUntil(this.destroyed$)
   *   )
   *   .subscribe(response => {
   *     this.paisCatalogo.catalogos = response.datos;
   *     this.organizarPaisesPorBloque(response.datos);
   *   });
   * 
   * this.catalogoServices.paisBloqueCatalogo('130118')
   *   .pipe(
   *     map(response => response.datos.filter(pais => 
   *       pais.grupo === 'TLCAN' || pais.grupo === 'T-MEC'
   *     ))
   *   )
   *   .subscribe(paisesNorteamerica => {
   *     this.paisesBloqueSeleccionado = paisesNorteamerica;
   *   });
   * ```
   * 
   * @see CATALOGO_PAISES_BLOQUE
   * @see BaseResponse
   * @see Catalogo
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  paisBloqueCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_PAISES_BLOQUE(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de medios de transporte disponibles para operaciones de comercio exterior.
   * 
   * Este método consulta el catálogo oficial de medios de transporte utilizados
   * en operaciones de importación y exportación, incluyendo transporte marítimo,
   * aéreo, terrestre, ferroviario y otros medios especializados, con sus
   * características, restricciones y códigos oficiales.
   *
   * @param tramite - Identificador del trámite que determina los medios de transporte
   *                  aplicables y las regulaciones específicas
   * 
   * @returns {Observable<BaseResponse<Catalogo[]>>} Observable que emite la respuesta
   *          del servidor con el listado completo de medios de transporte disponibles
   * 
   * @throws {HttpErrorResponse} Error HTTP si hay problemas de conectividad con el catálogo
   * 
   * @example
   * ```typescript
   * this.catalogoServices.medioTransporteCatalogo('110219')
   *   .pipe(
   *     takeUntil(this.destroyed$)
   *   )
   *   .subscribe(response => {
   *     this.mediosTransporte = response.datos;
   *     this.habilitarSelectorTransporte = true;
   *   });
   * 
   * this.catalogoServices.medioTransporteCatalogo('130118')
   *   .pipe(
   *     map(response => response.datos.filter(medio => 
   *       medio.tipo === 'MARITIMO' || medio.tipo === 'AEREO'
   *     ))
   *   )
   *   .subscribe(transporteInternacional => {
   *     this.mediosInternacionales = transporteInternacional;
   *   });
   * 
   * this.origenControl.valueChanges
   *   .pipe(
   *     switchMap(origen => 
   *       this.catalogoServices.medioTransporteCatalogo('110219')
   *     ),
   *     map(response => this.filtrarPorOrigen(response.datos, this.origenControl.value))
   *   )
   *   .subscribe(mediosPermitidos => {
   *     this.actualizarOpcionesTransporte(mediosPermitidos);
   *   });
   * ```
   * 
   * @see CATALOGO_MEDIO_TRANSPORTE
   * @see BaseResponse
   * @see Catalogo
   * @since 1.0.0
   * @author Sistema VUCEM
   */
  medioTransporteCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_MEDIO_TRANSPORTE(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);

  }
  /*
* Obtiene el catálogo de seleccionarReglal ID del trámite.
* @param {string} tramite - El ID del trámite.
* @returns {Observable<BaseResponse<Catalogo[]>>} - Observable con la respuesta del servidor.
*/
  seleccionarReglaCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_SELECCIONAR_REGLA(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /*
 * Obtiene el catálogo de sectores ID del trámite.
 * @param {string} tramite - El ID del trámite.
 * @returns {Observable<BaseResponse<Catalogo[]>>} - Observable con la respuesta del servidor.
 */
  sectoresCatalogo(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    const ENDPOINT = `${this.host}${CATALOGO_SECTORES(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de tratados y acuerdos internacionales aplicables a un país específico.
   * @param tramite - El ID del trámite.
   * @returns {Observable<BaseResponse<Catalogo[]>>} - Observable con la respuesta del servidor.
   */
  tratadoCatalogoPais(tramite: string): Observable<BaseResponse<Catalogo[]>> {
    if (tramite === '110214' || tramite === '110216') {
      const ENDPOINT = `${this.host}${CATALOGO_TRATADO_ACUERDO_PAIS_TITRAC(tramite)}`;
      return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
    }
    const ENDPOINT = `${this.host}${CATALOGO_TRATADO_ACUERDO_PAIS(tramite)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }

  /**
   * Obtiene el catálogo de países aplicables a un trámite específico.
   * @param tramite - El ID del trámite.
   * @param clave - La clave del país.
   * @returns {Observable<BaseResponse<Catalogo[]>>} - Observable con la respuesta del servidor.
   */
  paisCatalogo(tramite: string, clave: string): Observable<BaseResponse<Catalogo[]>> {
      const ENDPOINT = `${this.host}${CATALOGO_PAIS_BLOQUE_CLAVE(tramite, clave)}`;
    return this.http.get<BaseResponse<Catalogo[]>>(ENDPOINT);
  }
}
