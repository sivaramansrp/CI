import { AccionBoton, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { PANTA_PASOS } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantallas.enum';

/**
 * @component
 * @name PantallasComponent
 * @description
 * Componente que gestiona la visualización de pantallas y permite cambiar entre diferentes pasos o pestañas.
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html'
})
export class PantallasComponent implements OnInit, OnDestroy {
   /**
  * compo doc
  * Lista de pasos del wizard.
  * @type {ListaPasosWizard[]}
  */
   public pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;

   /**
  * compo doc 
  * Índice del paso actual.
  * @type {number}
  * @default 1
  */
  public indice: number = 1;

   /**
  * compo doc
  * Datos utilizados para el control del wizard.
  * @type {DatosPasos}
  */
  public datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
  * compo doc
  * variable para contener el índice de la pestaña seleccionada
  * @type {number}
  */
  public indiceDePestanaSeleccionada: number = 1;

   /**
  * compo doc
  * Mensaje relacionado con el aviso de privacidad simplificado.
  * 
  * @type {string}
  * @memberof PantallasComponent
  */
   public avisoPrivacidadAlert: string = AVISO.Aviso;

   /**
  * compo doc
  * Referencia al componente Wizard para controlar la navegación entre pasos.
  * @type {WizardComponent}
  */
   @ViewChild(WizardComponent) public wizardComponent!: WizardComponent;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  public consultaState!: ConsultaioState;

  /**
  * @constructor
  * @description Inicializa una instancia del `DatosComponent`.
  */
  constructor(
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * compo doc
   * @method ngOnInit
   * @description
   * Método de inicialización del componente `DatosComponent`.
   * 
   * Detalles:
   * - Se suscribe al observable `selectConsultaioState$` del store `ConsultaioQuery` para obtener el estado actual de la consulta.
   * - Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruye, evitando fugas de memoria.
   * - Actualiza la propiedad `consultaState` con el estado recibido.
   * - Si la propiedad `update` del estado es verdadera, llama al método `guardarDatosFormulario()`.
   * - Si no, establece la bandera `esDatosRespuesta` en `true` para indicar que se deben mostrar los datos de respuesta.
   * 
   * @example
   * this.ngOnInit();
   * // Inicializa el componente y gestiona el flujo de datos según el estado de la consulta.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
  }

  /**
  * compo doc
  * Actualiza el índice del paso y maneja la navegación hacia adelante o atrás.
  *
  * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
  * @returns {void}
  */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
      this.indice = e.valor;
      this.datosPasos.indice = e.valor;

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
      if (e.valor!==1) {
        this.indiceDePestanaSeleccionada=1;
      }
    }
  }

  /**
   * compo doc
   * Función que obtiene el índice de la pestaña seleccionada
   * @param {number} event - evento de numero
   * @returns {void}
   */
  pestanaCambiado(event: number): void {
    if (event !== undefined && event !== null && !isNaN(event)) {
      this.indiceDePestanaSeleccionada = event;
    } else {
      this.indiceDePestanaSeleccionada = 1;
    }
  }

  /**
 * @method ngOnDestroy
 * @description
 * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
 * 
 * Detalles:
 * - Emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores que el componente está siendo destruido.
 * - Completa el observable para liberar recursos y evitar fugas de memoria.
 * 
 * @returns {void} No retorna ningún valor.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
