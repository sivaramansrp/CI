import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Tramite300105State, Tramite300105Store } from '../estados/tramite300105.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio AutorizacionDeRayosXService
 * Descripción: Servicio encargado de gestionar los datos relacionados con los catálogos y configuraciones de mercancías y rayos X.
 */
@Injectable({
  providedIn: 'root',
})
export class AutorizacionDeRayosXService {
  /**
   * Catálogo de fracciones arancelarias.
   * Contiene las fracciones arancelarias disponibles.
   */
  fraccionArancelaria: Catalogo[] = [];

  /**
   * Catálogo de descripciones de fracciones arancelarias.
   * Contiene las descripciones asociadas a las fracciones arancelarias.
   */
  fraccionArancelariaDescripcion: Catalogo[] = [];

  /**
   * Catálogo de unidades de medida de voltaje.
   * Contiene las unidades de medida disponibles para el voltaje.
   */
  unidadMedidaVoltaje: Catalogo[] = [];

  /**
   * Catálogo de unidades de medida de corriente.
   * Contiene las unidades de medida disponibles para la corriente.
   */
  unidadMedidaCorriente: Catalogo[] = [];

  /**
   * Catálogo de países.
   * Contiene la lista de países disponibles.
   */
  pais: Catalogo[] = [];

  /**
   * Catálogo de tipos de mercancía.
   * Contiene los tipos de mercancía disponibles.
   */
  tipoMercancia: Catalogo[] = [];

  /**
   * Sujeto utilizado como notificador para la destrucción de observables.
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Constructor del servicio.
   * Inicializa el servicio con el cliente HTTP.
   * Parámetros:
   *   - http: Cliente HTTP para realizar solicitudes a los catálogos.
   */
  constructor(private http: HttpClient, private tramite300105Store: Tramite300105Store) {
    // No se realiza ninguna acción aquí.
  }

  /**
   * Método getBancoData
   * Descripción: Obtiene los datos del catálogo de bancos.
   * Devuelve un observable con la lista de bancos disponibles.
   */
  getBancoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/300105/banco-options.json');
  }

  /**
   * Método getTipoOperacion
   * Descripción: Obtiene los datos del catálogo de tipos de operación.
   * Devuelve un observable con la lista de tipos de operación disponibles.
   */
  getTipoOperacion(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/300105/tipo-operacion.json');
  }

  /**
   * Método getFinalidad
   * Descripción: Obtiene los datos del catálogo de finalidades.
   * Devuelve un observable con la lista de finalidades disponibles.
   */
  getFinalidad(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/300105/finalidad.json');
  }

  /**
   * Método inicializaMercanciaDatosCatalogos
   * Descripción: Inicializa los datos de los catálogos relacionados con mercancías.
   * Realiza solicitudes HTTP para obtener los datos de los catálogos y los almacena en las propiedades correspondientes.
   */
  public inicializaMercanciaDatosCatalogos(): void {
    this.obtenerRespuestaPorUrl(this, 'fraccionArancelaria', '/300105/fraccion-arancelaria.json');
    this.obtenerRespuestaPorUrl(this, 'fraccionArancelariaDescripcion', '/300105/fraccion-arancelaria-descripcion.json');
    this.obtenerRespuestaPorUrl(this, 'unidadMedidaVoltaje', '/300105/unidad-medida-voltaje.json');
    this.obtenerRespuestaPorUrl(this, 'unidadMedidaCorriente', '/300105/unidad-medida-corriente.json');
    this.obtenerRespuestaPorUrl(this, 'pais', '/300105/pais.json');
    this.obtenerRespuestaPorUrl(this, 'tipoMercancia', '/300105/tipo-mercancia.json');
  }

  /**
   * Método obtenerRespuestaPorUrl
   * Descripción: Realiza una solicitud HTTP para obtener los datos de un catálogo y los almacena en la propiedad correspondiente.
   * Parámetros:
   *   - self: Instancia del servicio AutorizacionDeRayosXService.
   *   - variable: Nombre de la propiedad donde se almacenarán los datos del catálogo.
   *   - url: URL del archivo JSON que contiene los datos del catálogo.
   */
  obtenerRespuestaPorUrl(
    self: AutorizacionDeRayosXService,
    variable: keyof AutorizacionDeRayosXService,
    url: string
  ): void {
    if (self && variable && url) {
      this.http.get<RespuestaCatalogos>(`assets/json${url}`)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp): void => {
        (self[variable] as Catalogo[]) = resp?.code === 200 && resp.data ? resp.data : [];
      });
    }
  }

  /**
   * Actualiza el estado del formulario estableciendo cada propiedad individualmente en el store
   */
  actualizarEstadoFormulario(DATOS: Tramite300105State): void {
    Object.entries(DATOS).forEach(([campo, VALOR]) => {
      this.tramite300105Store.establecerDatos({ [campo]: VALOR });
    });
  }

  /**
   * Método getAutorizacionDeRayosXDatos
   * Descripción: Obtiene los datos del formulario de autorización de rayos X.
   * Devuelve un observable con el estado del trámite 300105.
   */
  getAutorizacionDeRayosXDatos(): Observable<Tramite300105State> {
    return this.http.get<Tramite300105State>('assets/json/300105/autorizacion-de-rayos-x-datos.json');
  }
}