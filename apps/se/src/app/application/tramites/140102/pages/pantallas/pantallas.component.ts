import { ALERTA_DE_APLICACION_REGISTRADA, ERROR_FORMA_ALERT } from '../../constants/programa-seleccionado.enum';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { AVISO } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '@ng-mf/data-access-user';
import { PANTA_PASOS } from '@ng-mf/data-access-user';
import { ValidacionDeFormularioService } from '../../services/forma-servicio/validacion-de-formulario.service';
import { WizardService } from '@ng-mf/data-access-user';

/**
 * @description
 * Componente principal para gestionar el flujo de pasos en un wizard.
 * Este componente permite navegar entre diferentes pasos utilizando un componente de wizard.
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Lista de pasos del wizard cargados desde una constante.
   * Cada paso contiene información relevante para el flujo del wizard.
   */
  public pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;

  /**
   * @description
   * Índice actual del paso seleccionado en el wizard.
   * Por defecto, el índice inicial es `1`.
   */
  public indice: number = 1;

  /**
   * @description
   * Referencia al componente del wizard para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @description
   * Datos relacionados con los pasos del wizard, como el número total de pasos,
   * el índice actual y los textos de los botones de navegación.
   * @property {number} nroPasos - Número total de pasos en el wizard.
   * @property {number} indice - Índice actual del paso seleccionado.
   * @property {string} txtBtnAnt - Texto del botón para retroceder.
   * @property {string} txtBtnSig - Texto del botón para avanzar.
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @description
   * Clase CSS para mostrar alertas de información.
   */
  public infoAlert = 'alert-info';

  /**
   * @description
   * Texto de aviso cargado desde una constante.
   */
  public TEXTOS = AVISO.Aviso;

  /**
   * @description
   * Mensaje de alerta para una aplicación registrada.
   */
  public applicacionRegistradaAlerta = ALERTA_DE_APLICACION_REGISTRADA.message;

  /**
   * @description
   * Mensaje de error para formularios incompletos.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * @description
   * Indica si se debe mostrar la alerta de aplicación registrada.
   */
  public mostrarAplicacionRegistradaAlerta: boolean = false;

  /**
   * @description
   * Indica si el formulario es válido.
   */
  public esFormaValido!: boolean;

  /**
   * @description
   * Índice de la subpestaña seleccionada.
   */
  public subpestanaSeleccionada!: number;

  /**
   * @description
   * Servicio del wizard para manejar cambios de índice.
   */
  wizardService = inject(WizardService);

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
   * variable para contener el índice de la pestaña seleccionada
   * @type {number}
   */
  public indiceDePestanaSeleccionada: number = 1;

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
   * @description
   * Constructor del componente.
   * Inyecta el servicio de validación de formularios.
   * @param validacionDeFormularioService Servicio para manejar la validación de formularios.
   */
  constructor(
    public validacionDeFormularioService: ValidacionDeFormularioService,
    private consultaQuery: ConsultaioQuery
  ) {
    //
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
   * @description
   * Getter que verifica si el formulario del programa seleccionado es válido.
   * @returns {boolean} Retorna `true` si el formulario es válido, de lo contrario `false`.
   */
  get programaSeleccionadoFormValid(): boolean {
    return this.validacionDeFormularioService.isFormValid('programaSeleccionadoForm') ?? false;
  }

  /**
   * @description
   * Método que actualiza el índice de la subpestaña seleccionada.
   * @param {number} event Índice de la subpestaña seleccionada.
   */
  public pestanaCambiado(event: number): void {
    if (event !== undefined && event !== null && !isNaN(event)) {
      this.indiceDePestanaSeleccionada = event;
    } else {
      this.indiceDePestanaSeleccionada = 1;
    }
  }

  /**
   * @description
   * Método que actualiza el índice del paso seleccionado en el wizard.
   * También controla la navegación hacia adelante o hacia atrás en el wizard.
   * @param {AccionBoton} e Objeto que contiene la acción (`cont` o `ant`) y el valor del paso.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
      this.indice = e.valor;
      this.datosPasos.indice = e.valor;

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
      if (e.valor !== 1) {
        this.indiceDePestanaSeleccionada = 1;
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
