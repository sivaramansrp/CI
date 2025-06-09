import { AccionBoton, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FORMA_INVALIDO_ALERTA, FORMA_VALIDO_ALERTA } from '../../constantes/cancelacion-garantia.enum';
import { Subject, map, takeUntil } from 'rxjs';
import { FormaServicioService } from '../../services/forma-servicio/forma-servicio.service';
import { PANTA_PASOS } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantallas.enum';

/**
  * @Component
  * @selector pantallas
  * @description
  * Componente `PantallasComponent` que representa la página principal del flujo de pantallas del trámite.
  * 
  * Detalles:
  * - Utiliza el decorador `@Component` para definir las propiedades del componente.
  * - Renderiza la plantilla HTML asociada para mostrar el contenido del wizard y los pasos del trámite.
  * 
  * Propiedades:
  * - `selector`: Define el nombre del selector del componente como `pantallas`.
  * - `templateUrl`: Ruta al archivo de plantilla HTML del componente.
  * 
  * @example
  * <pantallas></pantallas>
  */
@Component({
  selector: 'pantallas',
  templateUrl: './pantallas.component.html',
})

export class PantallasComponent implements OnInit, OnDestroy {
  /**
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
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) public wizardComponent!: WizardComponent;

  /**
  * @property formaInvalidoAlerta
  * @description
  * Mensaje de alerta que se muestra cuando el formulario no es válido.
  * 
  * Detalles:
  * - Utiliza la constante `FORMA_INVALIDO_ALERTA` importada desde el archivo de constantes.
  * - Este mensaje se utiliza para informar al usuario sobre errores en el formulario.
  * 
  * @type {string}
  * 
  * @example
  * console.log(this.formaInvalidoAlerta);
  * // Muestra el mensaje de alerta definido en `FORMA_INVALIDO_ALERTA`.
  */
  public formaInvalidoAlerta = FORMA_INVALIDO_ALERTA.mensaje;

  /**
  * @property formaValidoAlerta
  * @description
  * Mensaje de confirmación que se muestra cuando el formulario es válido.
  * 
  * Detalles:
  * - Utiliza la constante `FORMA_VALIDO_ALERTA` importada desde el archivo de constantes.
  * - Este mensaje se utiliza para informar al usuario que el formulario ha sido enviado correctamente.
  * 
  * @type {string}
  * 
  * @example
  * console.log(this.formaValidoAlerta);
  * // Muestra el mensaje de confirmación definido en `FORMA_VALIDO_ALERTA`.
  */
  public formaValidoAlerta = FORMA_VALIDO_ALERTA.mensaje;

  /**
 * @property esFormaValido
 * @description
 * Indica si el formulario actual es válido. Se utiliza para habilitar o deshabilitar la navegación entre pasos en el wizard.
 * @type {boolean}
 * @default false
 */
  public esFormaValido!: boolean;

  
  /** 
  * @property destroyNotifier$
  * @description
  * Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  public consultaState!: ConsultaioState;

   /**
 * @constructor
 * @description
 * Constructor del componente `PantallasComponent`. Inicializa las dependencias necesarias para el funcionamiento del componente.
 * @param {FormaServicioService} formaServicioService - Servicio para gestionar formularios dinámicos.
 */
   constructor(
    public formaServicioService: FormaServicioService,
    private consultaQuery: ConsultaioQuery
  ) {
    //
  }

   /**
   * compo doc
   * @method ngOnInit
   * @description
   * Método de inicialización del componente `PantallasComponent`.
   * 
   * Detalles:
   * - Se suscribe al observable `selectConsultaioState$` del store `ConsultaioQuery` para obtener el estado actual de la consulta.
   * - Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruye, evitando fugas de memoria.
   * - Actualiza la propiedad `consultaState` con el estado recibido.
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
        this.consultaState = { ...seccionState, update: true, readonly: true };
        // this.consultaState = seccionState;
        console.log('this.consultaState ', this.consultaState)

      })
    ).subscribe();
  }

  /**
 * @method verificarLaValidezDelFormulario
 * @description
 * Este método verifica la validez de los formularios dinámicos asociados a los pasos del wizard.
 * @returns {boolean} - Indica si todos los formularios son válidos.
 */
  verificarLaValidezDelFormulario(): boolean {
    return (
      this.formaServicioService.isFormValid('manifestacionesForm') ??
        false
    );
  }

  /**
   * compo doc
   * Actualiza el índice del paso y maneja la navegación hacia adelante o atrás.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
   * @returns {void}
   */
  public getValorIndice(e: AccionBoton): void {
    this.esFormaValido = this.verificarLaValidezDelFormulario();
    if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
      this.indice = e.valor;
      this.datosPasos.indice = e.valor;

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
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