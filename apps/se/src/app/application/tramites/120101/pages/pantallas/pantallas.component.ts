import { ALERTA_DE_APLICACION_REGISTRADA, CUPOS_PASOS, ERROR_FORMA_ALERT } from '../../constantes/solicitud-de-registro-tpl.enum';
import {
  AVISO,
  AccionBoton,
  DatosPasos,
  ListaPasosWizard,
  WizardComponent,
  WizardService,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
/**
 * @component PantallasComponent
 * @description
 * Este componente representa la página principal de las pantallas del trámite 120101.
 * Gestiona la navegación entre los pasos del wizard y valida los formularios asociados.
 * 
 * Funcionalidad:
 * - Renderiza el wizard con los pasos definidos en `CUPOS_PASOS`.
 * - Valida los formularios dinámicos asociados a cada paso.
 * - Controla la navegación entre pasos utilizando el componente `WizardComponent`.
 * 
 * @selector app-pantallas
 * @templateUrl ./pantallas.component.html
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent implements OnInit, OnDestroy {
  /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = AVISO.Aviso;

  /**
 * @property applicacionRegistradaAlerta
 * @description
 * Contiene el mensaje de alerta que se muestra cuando la aplicación ha sido registrada.
 * @type {string}
  * @memberof PantallasComponent
 */
  public applicacionRegistradaAlerta = ALERTA_DE_APLICACION_REGISTRADA.message;

  /**
 * @property formErrorAlert
 * @description
 * Contiene el mensaje de alerta que se muestra cuando ocurre un error en el formulario.
 * 
 * Funcionalidad:
 * - Utiliza el mensaje definido en la constante `ERROR_FORMA_ALERT`.
 * - Este mensaje informa al usuario sobre los errores que deben corregirse en el formulario antes de continuar.
 * 
 * @type {string}
 * 
 * @example
 * <div *ngIf="!esFormaValido">
 *   {{ formErrorAlert }}
 * </div>
 */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
 * @property mostrarAplicacionRegistradaAlerta
 * @description
 * Indica si se debe mostrar el mensaje de alerta relacionado con el registro exitoso de la aplicación.
 * @type {boolean}
 * @default false
 */
  public mostrarAplicacionRegistradaAlerta: boolean = false;
  /**
   * Lista de pasos del wizard.
   * @type {ListaPasosWizard[]}
   */
  public pantallasPasos: ListaPasosWizard[] = CUPOS_PASOS;

  /**
   * Índice del paso actual.
   * @type {number}
   * @default 1
   */
  public indice: number = 1;

  /**
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
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;

  /**
 * @property esFormaValido
 * @description
 * Indica si el formulario actual es válido. Se utiliza para habilitar o deshabilitar la navegación entre pasos en el wizard.
 * @type {boolean}
 * @default false
 */
  public esFormaValido!: boolean;

  /**
 * @property wizardService
 * @description
 * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
 * @type {WizardService}
 */
  wizardService = inject(WizardService);

  /**
 * @property subpestanaSeleccionada
 * @description
 * Almacena el índice de la subpestaña seleccionada dentro de un paso del wizard.
 * @type {number}
 */
  public subpestanaSeleccionada!: number;

  /**
 * @property pestanaDosFormularioValido
 * @description
 * Indica si los formularios asociados a la pestaña dos del wizard son válidos.
 * @type {boolean}
 * @default false
 */
  public pestanaDosFormularioValido: boolean = false;

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
 * @description
 * Constructor del componente `PantallasComponent`. Inicializa las dependencias necesarias para el funcionamiento del componente.
 * @param {ServicioDeFormularioService} servicioDeFormularioService - Servicio para gestionar formularios dinámicos.
 */
  constructor(
    public servicioDeFormularioService: ServicioDeFormularioService,
    private consultaQuery: ConsultaioQuery
  ) {
    //
  }

  /**
 * @method ngOnInit
 * @description
 * Método de inicialización del componente `PantallasComponent`.
 * 
 * Detalles:
 * - Se suscribe al observable `selectConsultaioState$` del store `ConsultaioQuery` para obtener el estado actual de la consulta.
 * - Utiliza `takeUntil` para cancelar la suscripción cuando el componente se destruye, evitando fugas de memoria.
 * - Actualiza la propiedad `consultaState` con el estado recibido.
 * - Si el estado está en modo solo lectura (`readonly`), marca la pestaña dos como válida (`pestanaDosFormularioValido = true`).
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
            if (this.consultaState.readonly) {
              this.pestanaDosFormularioValido = true
            }
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
      (this.servicioDeFormularioService.isFormValid('bienFinalForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('consultarCupoForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('representacionFederalForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('insumosForm') ??
      false) &&
      (this.servicioDeFormularioService.isFormValid('procesoProductivoForm') ??
      false)
    );
  }

  /**
 * @getter esConsultarCupoFormValid
 * @description
 * Verifica si el formulario `consultarCupoForm` es válido.
 * @returns {boolean} - `true` si el formulario es válido, de lo contrario `false`.
 */
  get esConsultarCupoFormValid(): boolean {
    return this.servicioDeFormularioService.isFormValid('consultarCupoForm') ?? false;
  }

  /**
 * @getter esBienFinalFormValid
 * @description
 * Verifica si el formulario `esBienFinalFormValid` es válido.
 * @returns {boolean} - `true` si el formulario es válido, de lo contrario `false`.
 */
  get esBienFinalFormValid(): boolean {
    return this.servicioDeFormularioService.isFormValid('bienFinalForm') ?? false;
  }

  /**
 * @getter esRepresentacionFederalFormValid
 * @description
 * Verifica si el formulario `esRepresentacionFederalFormValid` es válido.
 * @returns {boolean} - `true` si el formulario es válido, de lo contrario `false`.
 */
  get esRepresentacionFederalFormValid(): boolean {
    return this.servicioDeFormularioService.isFormValid('representacionFederalForm') ?? false;
  }

  /**
 * @getter esInsumosFormValid
 * @description
 * Verifica si el formulario `esInsumosFormValid` es válido.
 * @returns {boolean} - `true` si el formulario es válido, de lo contrario `false`.
 */
  get esInsumosFormValid(): boolean {
    return this.servicioDeFormularioService.isFormValid('insumosForm') ?? false;
  }

  /**
 * @getter esProcesoProductivoFormValid
 * @description
 * Verifica si el formulario `esProcesoProductivoFormValid` es válido.
 * @returns {boolean} - `true` si el formulario es válido, de lo contrario `false`.
 */
  get esProcesoProductivoFormValid(): boolean {
    return this.servicioDeFormularioService.isFormValid('procesoProductivoForm') ?? false;
  }

/**
 * @method pestanaCambiado
 * @description
 * Maneja el evento de cambio de pestaña en el wizard.
 * 
 * Funcionalidad:
 * - Actualiza el índice de la subpestaña seleccionada con el valor proporcionado por el evento.
 * 
 * @param {number} event - El índice de la nueva subpestaña seleccionada.
 * 
 * @example
 * this.pestanaCambiado(2); // Cambia a la subpestaña con índice 2.
 */
  public pestanaCambiado(event: number): void {
    if (event) {
      this.subpestanaSeleccionada = event;
    }
  }

  /**
   * Actualiza el índice del paso y maneja la navegación hacia adelante o atrás.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
   * @returns {void}
   */
  public getValorIndice(e: AccionBoton): void {
    if (!this.consultaState.readonly) {
      this.esFormaValido = this.verificarLaValidezDelFormulario();
      if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
          if (e.accion === 'cont') {
              this.continuar(e);
          } else if (e.accion === 'ant' && this.esFormaValido) {
              this.indice = e.valor - 1;
              this.datosPasos.indice = e.valor - 1;
              this.wizardComponent.atras();
          } else if (!this.esFormaValido) {
              this.indice = e.valor;
              this.datosPasos.indice = e.valor;
          }
      }
    } else {
      if (e.valor > 0 && this.pantallasPasos.length) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
    }
}

  /**
 * @method continuar
 * @description
 * Maneja la lógica para continuar al siguiente paso del wizard o mostrar alertas según la validez de los formularios.
 * 
 * Funcionalidad:
 * - Verifica si los formularios asociados a la pestaña seleccionada son válidos.
 * - Si la subpestaña seleccionada es `2` y los formularios son válidos, muestra una alerta de registro exitoso.
 * - Si el formulario general es válido, avanza al siguiente paso del wizard.
 * - Si los formularios no son válidos, oculta la alerta de registro exitoso.
 * 
 * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
 * 
 * @example
 * this.continuar({ valor: 2, accion: 'cont' });
 */
  public continuar(e: AccionBoton): void {
    if (this.subpestanaSeleccionada === 2 && this.esConsultarCupoFormValid && this.esBienFinalFormValid && this.esRepresentacionFederalFormValid && !this.esFormaValido) {
      this.mostrarAplicacionRegistradaAlerta = true;
      this.pestanaDosFormularioValido = true;
    } else if (this.esFormaValido) {
      this.pestanaDosFormularioValido = true;
      this.indice = e.valor + 1;
      this.datosPasos.indice = e.valor + 1;
      this.wizardService.cambio_indice(this.datosPasos.indice);
      this.wizardComponent.siguiente();
    } else {
      this.mostrarAplicacionRegistradaAlerta = false;
    }
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
