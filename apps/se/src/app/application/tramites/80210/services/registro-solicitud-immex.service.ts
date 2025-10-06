import {
  BuscarPayload,
  PlantasSubfabricante,
} from '../../../shared/models/empresas-subfabricanta.model';
import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src';
import {
  FormularioDatos,
  Plantas,
  RespuestaPlantas,
} from '../modelos/registro-solicitud-immex.model';
import { Injectable, OnDestroy } from '@angular/core';
import {
  Observable,
  Subject,
  catchError,
  map,
  takeUntil,
  throwError,
} from 'rxjs';
import {
  Tramite80210Store,
  Tramites80210State,
} from '../estados/tramites80210.store';
import { API_ROUTES } from '../../../shared/servers/api-route';
import { HttpClient } from '@angular/common/http';
import { JSONResponse } from '@ng-mf/data-access-user';

/**
 * Servicio para manejar las renovaciones de muestras de mercancías.
 *
 * @remarks
 * Este servicio proporciona métodos para interactuar con la API relacionada con las renovaciones de muestras de mercancías.
 */
@Injectable({
  providedIn: 'root',
})
export class registroSolicitudImmexService implements OnDestroy {
  /**
   * Lista de estados obtenidos desde la API.
   *
   * @type {Catalogo[]}
   */
  estados: Catalogo[] = [];

  /**
   * Lista de plantas obtenidas desde la API.
   *
   * @type {Plantas[]}
   */
  plantas: Plantas[] = [];

  /**
   * Notificación para destruir observables al destruir el componente o servicio.
   *
   * @remarks
   * Este Subject emite un valor cuando el componente o servicio se destruye,
   * permitiendo limpiar suscripciones activas y prevenir fugas de memoria.
   */
  private destroy$: Subject<void> = new Subject<void>();
  /**
   * Obtiene los datos del formulario desde un archivo JSON local.
   *
   * @returns {Observable<FormularioDatos>} Un observable que emite los datos del formulario.
   */
  public obtenerFormularioDatos(): Observable<FormularioDatos> {
    return this.http.get<FormularioDatos>(
      'assets/json/80210/formularioDatos.json'
    );
  }

  /**
   * Obtiene la lista de estados desde un archivo JSON local y los asigna a la variable `estados`.
   *
   * @returns {void}
   */
  public obtenerEstados(): void {
    this.obtenerRespuestaPorUrl(this, 'estados', '/80210/estados.json');
  }

  /**
   * Obtiene los datos de las plantas desde un archivo JSON local.
   *
   * @returns {Observable<RespuestaPlantas>} Un observable que emite los datos de las plantas.
   */
  public obtenerPlantasDatos(): Observable<RespuestaPlantas> {
    return this.http.get<RespuestaPlantas>(
      'assets/json/80210/plantasDatos.json'
    );
  }

  /**
   * Constructor del servicio registroSolicitudImmexService.
   *
   * @param http - Cliente HTTP inyectado para realizar solicitudes HTTP.
   */
  constructor(
    private http: HttpClient,
    private tramite80210Store: Tramite80210Store
  ) {
    // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

  /**
   * Método genérico para obtener una respuesta desde una URL y asignarla a una variable del servicio.
   *
   * @param self - Instancia del servicio actual.
   * @param variable - Nombre de la variable del servicio donde se asignará la respuesta.
   * @param url - URL desde donde se obtendrán los datos.
   *
   * @returns {void}
   */
  obtenerRespuestaPorUrl(
    self: registroSolicitudImmexService,
    variable: keyof registroSolicitudImmexService,
    url: string
  ): void {
    if (self && variable && url) {
      this.http
        .get<RespuestaCatalogos>(`assets/json${url}`)
        .pipe(takeUntil(this.destroy$))
        .subscribe((resp): void => {
          (self[variable] as Catalogo[]) =
            resp?.code === 200 && resp.data ? resp.data : [];
        });
    }
  }

  /**
   * Actualiza el estado del formulario en el store global.
   *
   * @param datos - Objeto de tipo Tramites80210State con los datos a establecer en el store.
   * @returns {void}
   */
  actualizarEstadoFormulario(datos: Tramites80210State): void {
    this.tramite80210Store.establecerDatos(datos);
  }

  /**
   * Obtiene los datos de toma de muestras de mercancías desde un archivo JSON local.
   *
   * @returns {Observable<Tramites80210State>} Un observable que emite los datos del trámite 80210.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramites80210State> {
    return this.http.get<Tramites80210State>(
      'assets/json/80210/registro_immex_ampliacion.json'
    );
  }

  /**
   * Obtiene la lista de subfabricantes disponibles.
   * @method getSubfabricantesDisponibles
   * @returns {Observable<TableData>} Observable con la lista de subfabricantes disponibles.
   */
  getSubfabricantesDisponibles(body: BuscarPayload): Observable<JSONResponse> {
    return this.http.post<JSONResponse>(API_ROUTES().buscarPlantas, body).pipe(
      map((response) => response),
      catchError(() => {
        const ERROR = new Error(
          `Error al obtener la lista de subfabricantes en ${
            API_ROUTES().buscarPlantas
          }`
        );
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Mapea la respuesta de la API a un arreglo de objetos PlantasSubfabricante.
   * @param apiResponse - Respuesta de la API que contiene los datos de las plantas subfabricantes.
   * @returns Arreglo de objetos PlantasSubfabricante mapeados.
   */
  // eslint-disable-next-line class-methods-use-this
  mapApiResponseToPlantasSubfabricante(apiResponse: any[]): Plantas[] {
    // eslint-disable-next-line complexity
    return apiResponse.map((item) => {
      const DOMICILIO = item.domicilioDto || {};
      const EMPRESA = item.empresaDto || {};
      const EMPRESA_DOMICILIO = EMPRESA.domicilioSolicitud || {};

      return {
        id: item.id || 0,
        calle: DOMICILIO.calle || EMPRESA_DOMICILIO.calle || item.calle || '',
        numeroExterior:
          (DOMICILIO.numExterior ||
            EMPRESA_DOMICILIO.numExterior ||
            item.numeroExterior ||
            '').toString(),
        numeroInterior:
          (DOMICILIO.numInterior ||
            EMPRESA_DOMICILIO.numInterior ||
            item.numeroInterior ||
            '').toString(),
        codigoPostal:
          (DOMICILIO.codigoPostal ||
            EMPRESA_DOMICILIO.codigoPostal ||
            item.codigoPostal ||
            '').toString(),
        colonia:
          DOMICILIO.colonia || EMPRESA_DOMICILIO.colonia || item.colonia || '',
        municipio:
          DOMICILIO.municipio ||
          EMPRESA_DOMICILIO.municipio ||
          DOMICILIO.delegacionMunicipio ||
          item.delegacionMunicipio ||
          '',
        entidadFederativa:
          DOMICILIO.entidadFederativa?.nombre ||
          EMPRESA_DOMICILIO.entidadFederativa?.nombre ||
          item.entidadFederativa ||
          '',
        pais:
          DOMICILIO.pais?.nombre ||
          EMPRESA_DOMICILIO.pais?.nombre ||
          item.pais ||
          '',
        registroFederal: EMPRESA.registroFederal || item.registroFederal || '',
        domicilio: this.buildDomicilioFiscal(DOMICILIO, EMPRESA_DOMICILIO),
        razon: EMPRESA.razonSocial || item.razonSocial || '',
      };
    });
  }

  /**
   * Construye el domicilio fiscal completo a partir de los datos de domicilio
   * @param domicilio - Objeto domicilioDto
   * @param empresaDomicilio - Objeto domicilioSolicitud de empresaDto
   * @returns String con el domicilio fiscal completo
   */
  // eslint-disable-next-line class-methods-use-this
  private buildDomicilioFiscal(
    domicilio: any,
    empresaDomicilio: any = {}
  ): string {
    const CALLE = domicilio.calle || empresaDomicilio.calle || '';
    const NUM_EXTERIOR =
      domicilio.numExterior || empresaDomicilio.numExterior || '';
    const NUM_INTERIOR =
      domicilio.numInterior || empresaDomicilio.numInterior || '';
    const COLONIA = domicilio.colonia || empresaDomicilio.colonia || '';
    const MUNICIPIO =
      domicilio.municipio ||
      empresaDomicilio.municipio ||
      domicilio.delegacionMunicipio ||
      '';
    const ENTIDAD =
      domicilio.entidadFederativa?.nombre ||
      empresaDomicilio.entidadFederativa?.nombre ||
      '';
    const CODIGO_POSTAL =
      domicilio.codigoPostal || empresaDomicilio.codigoPostal || '';

    const PARTS = [
      CALLE,
      NUM_EXTERIOR,
      NUM_INTERIOR,
      COLONIA,
      MUNICIPIO,
      ENTIDAD,
      CODIGO_POSTAL,
    ]
      .filter((part) => part && part.toString().trim() !== '')
      .map((part) => part.toString().trim());

    return PARTS.join(', ');
  }
  /**
   * Método llamado al destruir el componente o servicio.
   *
   * @remarks
   * Emite un valor al Subject `destroy$` y lo completa para limpiar suscripciones activas
   * y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
