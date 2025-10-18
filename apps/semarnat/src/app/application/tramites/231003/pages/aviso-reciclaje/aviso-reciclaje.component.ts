import {
  AccionBoton,
  ConsultaioState,
  DatosPasos,
  ListaPasosWizard,
  Notificacion,
  PAGO_DE_DERECHOS,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { AvisoDeReciclajeServiceService } from '../../service/aviso-de-reciclaje-service.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { PASOS } from '../../constantes/aviso-de-reciclaje.enum';
import { PasoUnoT231003Component } from '../paso-uno/paso-uno-t231003.component';
/**
 * Componente que representa la sección de aviso de reciclaje.
 * - selector: Etiqueta personalizada para utilizar este componente en otras plantillas.
 * - templateUrl: Archivo de plantilla HTML que contiene el diseño visual del componente.
 */
@Component({
  selector: 'app-aviso-reciclaje',
  templateUrl: './aviso-reciclaje.component.html',
})
export class AvisoReciclajeComponent implements OnInit {
  /**
   * Referencia al componente Wizard utilizado en la plantilla.
   */
  PASO_UNO = 1;

  /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
  public formErrorAlert = `<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      Faltan campos por capturar.
    </div>
  </div>
</div>
`;
  /**
   * Indica si el formulario actual es válido.
   */
  esFormaValido: boolean = true;

  /**
   * Notificación que se puede utilizar para mostrar mensajes emergentes (toastr).
   * Null cuando no hay notificación nueva.
   */
  public nuevaNotificacion: Notificacion | null = null;

  /**
   * Notificación tipo banner que se muestra tras operaciones exitosas.
   */
  public alertaNotificacion!: Notificacion;

  /**
   * @property pasos
   * @type {ListaPasosWizard[]}
   *  Arreglo que contiene los pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property wizardComponent
   * @type {WizardComponent}
   *  Referencia al componente del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente del primer paso para validar formularios.
   */
  @ViewChild(PasoUnoT231003Component) pasoUno!: PasoUnoT231003Component;

  /** Clase CSS utilizada para mostrar una alerta de tipo informativo */
  public infoAlert = 'alert-info';

  /** Textos utilizados relacionados con el pago de derechos */
  TEXTOS = PAGO_DE_DERECHOS;

  /**
   * @property indice
   * @type {number}
   *  El índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * The data for the steps in the wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Subject utilizado para notificar y limpiar las suscripciones al destruir el componente.
   */
  private destroy$ = new Subject<void>();

  /** Subject para notificar la destrucción del componente. */
  public consultaState!: ConsultaioState;

  /**
   * Constructor del componente.
   * @param consultaQuery Servicio para consultar el estado de la consulta.
   * @param avisoDeReciclajeServiceService Servicio para manejar los datos del aviso de reciclaje.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private avisoDeReciclajeServiceService: AvisoDeReciclajeServiceService
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Se suscribe al estado de la consulta y actualiza la propiedad consultaState.
   * Si el estado indica actualización, carga los datos del formulario.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          // Actualiza el estado de la consulta
          this.consultaState = seccionState;
        })
      )
      .subscribe();

    // Si el estado indica actualización, carga los datos del formulario.
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    }
  }

  /**
   * Método para guardar los datos del formulario.
   * Obtiene los datos iniciales de la solicitud y actualiza el estado del formulario si la respuesta es válida.
   */
  guardarDatosFormulario(): void {
    this.avisoDeReciclajeServiceService
      .obtenerDatosSolicitudInicial()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        // Si la respuesta existe, actualiza el estado del formulario
        if (resp) {
          this.avisoDeReciclajeServiceService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Updates the index value based on the action button event.
   * @param e The action button event containing the action and value.
   */
  getValorIndice(e: AccionBoton): void {
    if (this.indice === this.PASO_UNO) {
      const FORM_VALIDO = this.pasoUno?.validarTodosLosFormularios();
      this.esFormaValido = FORM_VALIDO;
      if (!FORM_VALIDO) {
        this.datosPasos.indice = this.indice;
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
        return;
      }
      console.log('aqui ira el guardar solicitud');
    } else {
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.actualizarDatosPasos();
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
  }

  /**
   * Actualiza los datos del componente de pasos con el índice actual y el número total de pasos.
   */
  actualizarDatosPasos(): void {
    this.datosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
  }
}
