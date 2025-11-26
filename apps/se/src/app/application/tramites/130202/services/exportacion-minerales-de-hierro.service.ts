
import { Catalogo, CatalogoServices, JSONResponse, MostrarPartidas } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';
import { PartidasDeLaMercanciaModelo } from '../../../shared/models/partidas-de-la-mercancia.model';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';

import { PROC_130202 } from '../servers/api-route';

import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';

import { Tramite130202State, Tramite130202Store } from '../estados/tramites/tramites130202.store';

import { Tramite130202Query } from '../estados/queries/tramite130202.query';

/**
 * Servicio para gestionar la importación de vehículos.
 * Este servicio proporciona métodos para obtener datos relacionados con la importación de vehículos,
 * como listas de países, entidades federativas, representaciones federales y opciones de productos.
 */
@Injectable({
  providedIn: 'root',
})
export class ExportacionMineralesDeHierroService {
   /**
   * Constructor del servicio.
   * Servicio HttpClient para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient, 
    private tramite130202Store:Tramite130202Store, 
    private tramite130202Query:Tramite130202Query,
    private catalogoServices: CatalogoServices,
) {
    // 
   }

    /**
        * Obtiene todos los datos del estado almacenado en el store.
        * @returns {Observable<TramiteState>} Observable con todos los datos del estado.
        */
     getAllState(): Observable<Tramite130202State> {
       return this.tramite130202Query.selectSolicitud$;
     }
 /**
   * Obtiene la lista de países disponibles desde un archivo JSON.
   * Un observable que emite una lista de países.
   */
  getListaDePaisesDisponibles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/130202/pais-procenia.json');
  }
/**
     * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
     *
     * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
     * @returns Observable con la respuesta de la solicitud POST.
     */
  guardarDatosPost(body: Record<string, unknown>): Observable<JSONResponse> {
    return this.http.post<JSONResponse>(PROC_130202.GUARDAR, body);
  }
  
    /**
      * Obtiene el catálogo de tratados/acuerdos asociados a un trámite.
      * @param tramitesID - Identificador del trámite
      * @param tratadoAsociado - Clave del tratado asociado
      * @returns Observable con un arreglo de tratados (o vacío si no hay datos)
      */
    getRegimenCatalogo(tramitesID: string): Observable<Catalogo[]> {
      return this.catalogoServices.regimenesCatalogo(tramitesID)
        .pipe(
          map(res => res?.datos ?? [])
        );
    }
    
 /**
 * Obtiene el catálogo de clasificación del régimen usando solo el régimenId.
 * @param regimenId - El ID del régimen (ejemplo: '01')
 * @returns Observable con un arreglo de clasificaciones de régimen.
 */
getClasificacionRegimenCatalogo(regimenId: string): Observable<Catalogo[]> {
  const ENDPOINT = PROC_130202.CLASIFICACION_REGIMEN(regimenId);
  return this.http.get<{ datos: Catalogo[] }>(ENDPOINT).pipe(
    map(res => res?.datos ?? [])
  );
}

  /**
 * Obtiene el catálogo de fracciones arancelarias.
 * @returns Observable con un arreglo de fracciones arancelarias.
 */
getFraccionCatalogoService(): Observable<Catalogo[]> {
  return this.http.get<{ datos: Catalogo[] }>(PROC_130202.FRACCIONES_ARANCELARIAS).pipe(
    map(res => res?.datos ?? [])
  );
}
   /**
   *  Obtiene el catálogo de unidades de medida tarifaria asociado a un identificador y fracción arancelaria.
   * @param ID Identificador para obtener las unidades de medida tarifaria
   * @param FRACCION_ID Identificador de la fracción arancelaria
   * @returns Observable con un arreglo de unidades de medida tarifaria (o vacío si no hay datos)
   */
  
  getUMTService(fraccion: string): Observable<Catalogo[]> {
  const ENDPOINT = PROC_130202.UNIDADES_MEDIDAS_TARIFARIAS(fraccion);
  return this.http.get<{ datos: Catalogo[] }>(ENDPOINT).pipe(
    map(res => res?.datos ?? [])
  );
}
   /**
   *  Obtiene el catálogo de entidades federativas asociado a un identificador.
   * @param ID Identificador para obtener las entidades federativas
   * @returns Observable con un arreglo de entidades federativas (o vacío si no hay datos)
   */
  getEntidadesFederativasCatalogo(ID: string): Observable<Catalogo[]> {
    return this.catalogoServices.entidadesFederativasCatalogo(ID).pipe(
      map(res => res?.datos ?? [])
    );
  }

  /**
 * Obtiene la representación federal para una clave de entidad específica.
 * @param cveEntidad - La clave de la entidad (ejemplo: 'DGO').
 * @returns Observable con un arreglo de representación federal.
 */
getRepresentacionFederalCatalogo(cveEntidad: string): Observable<Catalogo[]> {
  const ENDPOINT = PROC_130202.REPRESENTACION_FEDERAL(cveEntidad);
  return this.http.get<{ datos: Catalogo[] }>(ENDPOINT).pipe(
    map(res => res?.datos ?? [])
  );
}
   /**
   *  Obtiene el catálogo de todos los países seleccionados asociado a un identificador.
   * @param ID Identificador para obtener los países seleccionados
   * @returns Observable con un arreglo de países seleccionados (o vacío si no hay datos)
   */
  getTodosPaisesSeleccionados(ID: string): Observable<Catalogo[]> {
    return this.catalogoServices.todosPaisesSeleccionados(ID).pipe(
      map(res => res?.datos ?? [])
    );
  }
  
  /**
   * Obtiene la lista de bloques comerciales (tratados o acuerdos) según el trámite proporcionado.
   *
   * @param {string} tramite - Identificador del trámite o tipo de operación para la consulta del catálogo.
   * @returns {Observable<Catalogo[]>} Un observable que emite un arreglo de elementos del catálogo de bloques.
   */
  getBloqueService(tramite: string): Observable<Catalogo[]> {
    return this.catalogoServices.tratadosAcuerdoCatalogo(tramite, 'TITRAC.TA')
      .pipe(
        map(res => res?.datos ?? [])
      );
  }
  
    /**
     *  Obtiene el catálogo de mostrar partidas asociado a un trámite e identificador.
     * @param tramite Identificador del trámite
     * @param ID Identificador para obtener las mostrar partidas
     * @returns Observable con un arreglo de mostrar partidas (o vacío si no hay datos)
     */
    getMostrarPartidasService(solicitud_id: number): Observable<BaseResponse<MostrarPartidas[]>> {
      const ENDPOINT = PROC_130202.MOSTAR_PARTIDAS + solicitud_id;
      return this.http.get<BaseResponse<MostrarPartidas[]>>(ENDPOINT);
    }
  
    /**
     * Obtiene la lista de países asociados a un bloque comercial según el trámite y el identificador proporcionado.
     *
     * @param {string} tramite - Identificador del trámite o tipo de operación que se está realizando.
     * @param {string} ID - Identificador del bloque o parámetro necesario para la consulta.
     * @returns {Observable<Catalogo[]>} Un observable que emite un arreglo de elementos del catálogo de países.
     */
    getPaisesPorBloqueService(tramite: string, ID: string): Observable<Catalogo[]> {
      return this.catalogoServices.getpaisesBloqueCatalogo(tramite, ID)
        .pipe(
          map(res => res?.datos ?? [])
        );
    }
  
  /**
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * El ID del bloque.
   * Un observable que emite una lista de países agrupados por bloque.
   */
  getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130202/paises-por-bloque.json'
    );
  }

  /**
   * Obtiene la lista de entidades federativas desde un archivo JSON.
   * Un observable que emite una lista de entidades federativas.
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130202/entidad-federativa.json'
    );
  }

  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * Un observable que emite una lista de representaciones federales.
   */
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130202/representacion-federal.json'
    );
  }

  /**
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * Un observable que emite las opciones de solicitud.
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130202/solicitude-options.json'
    );
  }

  /**
   * Obtiene las opciones de producto desde un archivo JSON.
   * Un observable que emite las opciones de producto.
   */
  getProductoOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      'assets/json/130202/producto-opciones.json'
    );
  }

  /**
  * Obtiene los datos de la tabla de partidas de la mercancía.
  * @returns Observable con los datos de la tabla.
  */
  getTablaDatos(): Observable<PartidasDeLaMercanciaModelo[]> {
    return this.http.get<PartidasDeLaMercanciaModelo[]>(
          'assets/json/130202/partidas-de-la.json'
        );
  }

  /**
  * Actualiza el estado del formulario en el store.
  * @param DATOS Estado actualizado del trámite.
  */
  actualizarEstadoFormulario(DATOS: Tramite130202State): void {
    this.tramite130202Store.actualizarEstado(DATOS);
  }

  /**
  * Obtiene los datos de la solicitud.
  * @returns Observable con los datos de la solicitud.
  */
  getDatosDeLaSolicitud(): Observable<Tramite130202State> {
    return this.http.get<Tramite130202State>('assets/json/130202/datos-de-la-solicitud.json');
  }

  
    /**
     * Genera el payload de datos para el trámite 130202 basado en la información proporcionada.
     *
     * @param {Tramite130202State} item - Objeto que contiene la información del trámite,
     * incluyendo datos de tabla y valores autorizados.
     *
     * @returns {any[]} Arreglo de objetos con los datos transformados para ser enviados
     * en el payload del trámite.
     *
     * @description
     * Este método toma las filas de `tableBodyData` dentro del objeto `item` y construye un
     * arreglo de objetos con los valores solicitados y autorizados.  
     * Convierte valores numéricos, extrae descripciones y agrega claves arancelarias y de unidad de medida.
     */
    getPayloadDatos(item: Tramite130202State): unknown {
      const ROWS = Array.isArray(item.tableBodyData) ? item.tableBodyData : [];
      return ROWS.map(row => ({
        unidadesSolicitadas: Number(row.cantidad),
        unidadesAutorizadas: Number(item.cantidad),
        descripcionSolicitada: row.descripcion,
        descripcionAutorizada: item.descripcion,
        importeUnitarioUSD: Number(row.precioUnitarioUSD),
        importeTotalUSD: Number(row.totalUSD),
        autorizada: true,
        importeUnitarioUSDAutorizado: Number(row.precioUnitarioUSD),
        importeTotalUSDAutorizado: Number(item.valorFacturaUSD),
        fraccionArancelariaClave: item.fraccion,
        unidadMedidaClave: item.unidadMedida
      }));
    }
    /**
 * Construye el objeto payload para el trámite 130202 de exportación de minerales de hierro.
 *
 * @param item - Estado actual del trámite, contiene los datos capturados en el formulario.
 * @param solicitudState - Estado de la solicitud, incluye el identificador de la solicitud.
 * @param mercancia - Arreglo de partidas de la mercancía generado por getPayloadDatos.
 * @returns Objeto con la estructura requerida por el backend para guardar la solicitud.
 *
 * @description
 * Este método toma los datos del formulario y del estado de la solicitud, junto con las partidas de la mercancía,
 * y construye el objeto que será enviado al backend para registrar la solicitud de exportación.
 * Incluye información de la mercancía, productor, solicitante, representación federal, entidades federativas y países seleccionados.
 */
buildPayload(item: Tramite130202State, solicitudState: Tramite130202State, mercancia: unknown) {
  return {
    tipoDeSolicitud: "guardar",
    mercancia: {
      cantidadComercial: 0,
      cantidadTarifaria: Number(item.cantidad),
      valorFacturaUSD: Number(item.valorFacturaUSD),
      condicionMercancia: item.producto,
      descripcion: item.descripcion,
      usoEspecifico: item.usoEspecifico,
      justificacionImportacionExportacion: item.justificacionImportacionExportacion,
      observaciones: item.observaciones,
      unidadMedidaTarifaria: {
        clave: item.unidadMedida
      },
      fraccionArancelaria: {
        cveFraccion: item.fraccion
      },
      partidasMercancia: mercancia,
    },
    id_solcitud: solicitudState.idSolicitud || 0,
    cve_regimen: item.regimen,
    cve_clasificacion_regimen: item.clasificacion,
    productor: {
      tipo_persona: true,
      nombre: "Juan",
      apellido_materno: "López",
      apellido_paterno: "Norte",
      razon_social: "Aceros Norte",
      descripcion_ubicacion: "Calle Acero, No. 123, Col. Centro",
      rfc: "AAL0409235E6",
      pais: "SIN"
    },
    solicitante: {
      rfc: "AAL0409235E6",
      nombre: "Juan Pérez",
      es_persona_moral: true,
      certificado_serial_number: "string"
    },
    representacion_federal: {
      cve_entidad_federativa: item.entidad,
      cve_unidad_administrativa: item.representacion
    },
    entidades_federativas: {
      cveEntidad: item.entidad
    },
    lista_paises: item.fechasSeleccionadas
  };
}
}