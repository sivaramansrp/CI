import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, WizardService } from '@ng-mf/data-access-user';
import { ListaPasosWizard, PASOS } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { ERROR_FORMA_ALERT } from '../../constantes/260501constante.enum';
import { ServicioDeFormularioService } from '../../../../shared/services/forma-servicio/servicio-de-formulario.service';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Componente principal para la gestión de plaguicidas.
 * Contiene la lógica y la estructura del asistente de plaguicidas.
 */
@Component({
  selector: 'app-plaguicidas',
  templateUrl: './plaguicidas.component.html',
})
export class PlaguicidasComponent implements OnInit, OnDestroy {
  /**
   * Lista de pasos del asistente.
   * Se obtiene de una constante definida en otro archivo.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Indice actual del paso en el asistente.
   * Se inicializa en 1.
   */
  indice: number = 1;

  /**
   * Título del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Título del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  public consultaState!: ConsultaioState;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

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
 * @property formErrorAlert
 * @description
 * Contiene el mensaje de alerta que se muestra cuando ocurre un error en el formulario.
 * @type {string}
 */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * @constructor
   * @description
   * Inicializa el componente e inyecta las dependencias necesarias mediante el sistema de inyección de Angular.
   *
   * @param {ServicioDeFormularioService} servicioDeFormularioService 
   * Servicio encargado de registrar, administrar y notificar cambios en los formularios dinámicos.
   *
   * @param {ConsultaioQuery} consultaQuery 
   * Consulta que permite obtener y observar el estado relacionado con la información de consulta.
   */
  constructor(
    private servicioDeFormularioService: ServicioDeFormularioService,
    private consultaQuery: ConsultaioQuery
  ) {}


  /**
 * @method ngOnInit
 * @description
 * Método de inicialización del componente `PlaguicidasComponent`.
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
   * Maneja la acción del botón en el asistente.
   * Cambia el paso actual según la acción del botón.
   *
   * @param e - Objeto que contiene la acción y el valor del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (!this.consultaState.readonly) {
      this.esFormaValido = this.verificarLaValidezDelFormulario();
      if (e.valor > 0 && e.valor <= this.pasos.length) {
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
            this.servicioDeFormularioService.markFormAsTouched('datosSolicitudForm');
            this.servicioDeFormularioService.markFormAsTouched('domicilioForm');
            this.servicioDeFormularioService.markFormAsTouched('manifiestosForm');
            this.servicioDeFormularioService.markFormAsTouched('representanteForm');
        }
      }
    } else {
        if (e.valor > 0 && e.valor < 5) {
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
 * @method verificarLaValidezDelFormulario
 * @description
 * Este método verifica la validez de los formularios dinámicos asociados a los pasos del wizard.
 * @returns {boolean} - Indica si todos los formularios son válidos.
 */
  verificarLaValidezDelFormulario(): boolean {
    return (
      (this.servicioDeFormularioService.isFormValid('datosSolicitudForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('domicilioForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('manifiestosForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('representanteForm') ??
        false)
    );
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
