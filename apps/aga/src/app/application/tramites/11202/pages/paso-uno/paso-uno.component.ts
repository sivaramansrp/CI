import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { Contenedor11202Store } from '../../../../core/estados/tramites/contenedor11202.store';
import { DatosTramiteService } from '@libs/shared/data-access-user/src/core/services/11202/datos-tramite.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente que representa el paso uno de un formulario.
 * Contiene información relacionada con el solicitante y su domicilio fiscal.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent implements AfterViewInit, OnInit, OnDestroy {

  /**
   * Referencia al componente hijo de tipo SolicitanteComponent.
   */
  @ViewChild(SolicitanteComponent)
  solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona (física o moral).
   */
  tipoPersona!: number;

  /**
   * Información de la persona solicitante.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Información del domicilio fiscal de la persona.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Bandera que indica si se ha realizado una validación.
   */
  validacion: boolean = false;

  /**
   * Datos recibidos como entrada relacionados al número de pedimento.
   */
  @Input()
  datosNroPedimento!: unknown;
  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para notificar y completar las suscripciones activas al destruir el componente, evitando fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;
  constructor(private datosTramiteService: DatosTramiteService,
    private consultaioQuery: ConsultaioQuery,
    private contenedorStore: Contenedor11202Store
  ) {

  }
  /**
   * @method ngOnInit
   * @description Método del ciclo de vida que se ejecuta al inicializar el componente.
   * 
   * Este método realiza las siguientes acciones:
   * - Se suscribe al observable `selectConsultaioState$` del servicio `ConsultaioQuery` para obtener el estado actual de la consulta.
   * - Actualiza la propiedad `consultaDatos` con el estado recibido.
   * - Si la propiedad `update` de `consultaDatos` es verdadera, llama al método `fetchGetDatosConsulta` para obtener datos adicionales.
   * 
   * Utiliza el operador `takeUntil` para cancelar las suscripciones cuando el componente se destruye, evitando fugas de memoria.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
        })
      )
      .subscribe();
    if (this.consultaDatos.update) {
      this.fetchGetDatosConsulta();
    }
  }
  /**
   * Gancho del ciclo de vida de Angular que se ejecuta
   * después de que la vista del componente ha sido completamente inicializada.
   * Inicializa los datos de persona y domicilio fiscal.
   */
  ngAfterViewInit(): void {
    this.obtenerTipoPersona();
  }

  /**
   * Cambia la pestaña activa del formulario.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.obtenerTipoPersona();
  }
  /**
   * @method fetchGetDatosConsulta
   * @description Obtiene los datos de consulta desde el servicio `DatosTramiteService` y actualiza el estado del trámite.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de consulta y, si la respuesta es exitosa, actualiza múltiples propiedades del store con los datos recibidos.
   * 
   * Actualiza las siguientes propiedades del store:
   * - `tipoBusqueda`
   * - `aduana`
   * - `inicialesContenedor`
   * - `numeroContenedor`
   * - `tipoContenedor`
   * - `contenedores`
   * 
   * Utiliza el operador `takeUntil` para cancelar las suscripciones cuando el componente se destruye, evitando fugas de memoria.
   * 
   * @returns {void}
   */
  public fetchGetDatosConsulta(): void {
    this.datosTramiteService
      .getDatosConsulta()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((respuesta) => {
        if (respuesta.success) {
          this.contenedorStore.setTipoBusqueda(respuesta.datos.tipoBusqueda);
          this.contenedorStore.setAduana(respuesta.datos.aduana);
          this.contenedorStore.setInicialesContenedor(respuesta.datos.inicialesContenedor);
          this.contenedorStore.setNumeroContenedor(respuesta.datos.numeroContenedor);
          this.contenedorStore.setTipoContenedor(respuesta.datos.tipoContenedor);
          this.contenedorStore.setContenedores(respuesta.datos.datosDelContenedor);
        }
      });
  }
  /**
   * @method obtenerTipoPersona
   * @description Obtiene el tipo de persona y lo establece en el componente `SolicitanteComponent`.
   * 
   * Este método utiliza un `setTimeout` para ejecutar la función `obtenerTipoPersona` del componente `SolicitanteComponent` con el valor `TIPO_PERSONA.MORAL_NACIONAL`.
   * 
   * Verifica si la referencia al componente `SolicitanteComponent` existe antes de llamar al método.
   * 
   * @returns {void}
   */
  obtenerTipoPersona(): void {
    setTimeout(() => {
      if (this.solicitante) {
        this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
      }
    }, 50);
  }
  /**
  * @method ngOnDestroy
  * @description Método del ciclo de vida que se ejecuta al destruir el componente.
  * 
  * Este método emite un valor en el `destroyNotifier$` para notificar la destrucción del componente y completa el `Subject` para liberar recursos y evitar fugas de memoria.
  * 
  * @returns {void}
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
