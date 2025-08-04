import { AVISO, DatosPasos, ListaPasosWizard, WizardComponent, WizardService } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { AccionBoton } from '@ng-mf/data-access-user';
import { ERROR_FORMA_ALERT } from '../../constantes/constante260512.enum';
import { PANTA_PASOS } from '@ng-mf/data-access-user';
import { ServicioDeFormularioService } from '../../../../shared/services/forma-servicio/servicio-de-formulario.service';
/**
 * @component PaginasComponent
 * @description
 * Componente principal para gestionar el flujo de pasos en el wizard del trámite 260514.
 * Permite la navegación entre diferentes pantallas/pasos utilizando el componente Wizard.
 * Controla el índice del paso actual y los datos necesarios para la navegación.
 * 
 */
@Component({
  selector: 'app-paginas',
  templateUrl: './paginas.component.html',
})
export class PaginasComponent implements OnInit, OnDestroy {

  /**
   * @property pantallasPasos
   * @type {ListaPasosWizard[]}
   * @description
   * Lista de pasos del wizard, obtenida desde una constante.
   */
  public pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;
 
  /**
   * @property indice
   * @type {number}
   * @default 1
   * @description
   * Índice del paso actual en el wizard.
   */
  public indice: number = 1;
 
  /**
   * @property wizardComponent
   * @type {WizardComponent}
   * @description
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;
 
  /**
   * @property datosPasos
   * @type {DatosPasos}
   * @description
   * Datos utilizados para el control del wizard, como el número de pasos, el índice actual y los textos de los botones.
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
  * compo doc
  * Mensaje relacionado con el aviso de privacidad simplificado.
  * 
  * @type {string}
  * @memberof PantallasComponent
  */
   public avisoPrivacidadAlert: string = AVISO.Aviso;

   /**
  * @property destroyNotifier$
  * @description
  * Subject utilizado para notificar la destrucción del componente y cancelar suscripciones activas.
  */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property consultaState
   * @description
   * Estado actual de la consulta, obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

  /**
 * @property esFormaValido
 * @description
 * Indica si el formulario actual es válido. Se utiliza para habilitar o deshabilitar la navegación entre pasos en el wizard.
 * @type {boolean}
 * @default false
 */
  public esFormaValido!: boolean;

  /**
 * @property formErrorAlert
 * @description
 * Contiene el mensaje de alerta que se muestra cuando ocurre un error en el formulario.
 * @type {string}
 */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
 * @property wizardService
 * @description
 * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
 * @type {WizardService}
 */
  wizardService = inject(WizardService);

   constructor(
    private consultaQuery: ConsultaioQuery,
    public servicioDeFormularioService: ServicioDeFormularioService,
   ) { }

   /**
    * @method ngOnInit
    * @description
    * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
    * Suscribe al estado de la consulta y decide si se deben guardar los datos del formulario o mostrar los datos de respuesta.
    */
    ngOnInit(): void {
      this.consultaQuery.selectConsultaioState$.pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
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
      (this.servicioDeFormularioService.isFormValid('datosDelEstablecimientoRFCForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('domicilioForm') ??
        false) && 
      (this.servicioDeFormularioService.isFormValid('manifiestosForm') ??
        false) && 
      (this.servicioDeFormularioService.isFormValid('representanteForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('derechosForm') ??
        false)
    );
  }
 
  /**
   * @method getValorIndice
   * @description
   * Actualiza el índice del paso y maneja la navegación hacia adelante o atrás en el wizard.
   * Si la acción es 'cont', avanza al siguiente paso; en caso contrario, retrocede.
   * Solo actualiza si el valor está dentro del rango de pasos válidos.
   * 
   * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
   * @returns {void}
   */
  public getValorIndice(e: AccionBoton): void {
    if (!this.consultaState.readonly) {
      this.esFormaValido = this.verificarLaValidezDelFormulario();
      if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
        if (e.accion === 'cont' && this.esFormaValido) {
          this.indice = e.valor + 1;
          this.datosPasos.indice = e.valor + 1;
          this.wizardService.cambio_indice(this.datosPasos.indice);
          this.wizardComponent.siguiente();
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
      if (e && e.valor > 0 && e.valor <= this.pantallasPasos.length) {
      this.indice = e.valor;
      this.datosPasos.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
    }
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Notifica y completa el subject para cancelar todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
