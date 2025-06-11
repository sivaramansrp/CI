import { AccionBoton, ConsultaioState, DatosPasos, ListaPasosWizard, PAGO_DE_DERECHOS, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject,map, takeUntil } from 'rxjs';
import { AvisoDeReciclajeServiceService } from '../../Services/aviso-de-reciclaje-service.service';
import { ConsultaioQuery} from '@ng-mf/data-access-user'
import { PASOS } from '../../constantes/aviso-de-reciclaje.enum';
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

  private destroy$ = new Subject<void>();

  /** Subject para notificar la destrucción del componente. */
  public consultaState!: ConsultaioState;

  constructor(private consultaQuery: ConsultaioQuery,private avisoDeReciclajeServiceService:AvisoDeReciclajeServiceService){

  }

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();

    // Si el estado indica actualización, carga los datos del formulario.
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    }

    this.guardarDatosFormulario();

  }

  guardarDatosFormulario(): void {
    this.avisoDeReciclajeServiceService
      .obtenerDatosSolicitudInicial().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.avisoDeReciclajeServiceService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
 * Updates the index value based on the action button event.
 * @param e The action button event containing the action and value.
 */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent?.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
