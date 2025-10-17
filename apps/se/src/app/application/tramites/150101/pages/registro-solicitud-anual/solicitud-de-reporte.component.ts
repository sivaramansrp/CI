import { ALERTA_COM, ERROR_FORMA_ALERT,ERROR_FORMA_ALERT_DOS,ERROR_FORMA_ALERT_QUAD,ERROR_FORMA_ALERT_TRES,REPORTE_ANUAL_PASOS } from '../../enums/registro-solicitud-anual.enum';
import { Component } from '@angular/core';
import { DatosComponent} from '../datos/datos.component';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src';

/**
 * Interfaz que representa la acción de un botón dentro del asistente.
 * 
 * @interface AccionBoton
 * @property {string} accion - Acción a realizar ('cont' para continuar, 'atras' para retroceder).
 * @property {number} valor - Valor del índice del paso al que se desea mover.
 */
interface AccionBoton {
  /**
   * Fecha de accion
   */
  accion: string;
  /**
   * Fecha de valor
   */
  valor: number;
}

/**
 * Componente que representa la solicitud de reporte dentro del asistente de trámites.
 * Este componente utiliza un asistente (wizard) para guiar al usuario a través de los pasos necesarios.
 *
 * @selector app-solicitud-de-reporte
 * @templateUrl ./solicitud-de-reporte.component.html
 * @styleUrl ./solicitud-de-reporte.component.scss
 */
@Component({
  selector: 'app-solicitud-de-reporte',
  templateUrl: './solicitud-de-reporte.component.html',
  styleUrl: './solicitud-de-reporte.component.scss',
})

/**
 * Clase que maneja la lógica del componente de solicitud de reporte.
 * 
 * @class SolicitudDeReporteComponent
 * @description Este componente gestiona el flujo de pasos para la solicitud de un reporte anual,
 * utilizando un asistente (wizard) para navegar entre los diferentes pasos.
 */
export class SolicitudDeReporteComponent {

   /**
     * Constante que asigna el texto de alerta definido en `ALERTA_COM`.
     */
    TEXTOSR = ALERTA_COM;
  /**
   * Referencia al componente del asistente (wizard) utilizado en este componente.
   * 
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Lista de pasos que conforman el asistente para la solicitud de reporte anual.
   * 
   * @type {ListaPasosWizard[]}
   */
  pantallasPasos: ListaPasosWizard[] = REPORTE_ANUAL_PASOS;

  /**
   * Índice del paso actual dentro del asistente.
   *
   * @type {number}
   * @default 1
   */
  indice: number = 1;
  /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   */
  esFormaValido: boolean = false;
  /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   */
  esFormaValidoDos: boolean = false;

    /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   */
    esFormaValidoTres: boolean = false;
      /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   */
      esFormaValidoCuatro: boolean = false;
  /**
     * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
     */
    public formErrorAlert = ERROR_FORMA_ALERT;

  /**
     * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
     */
  public formErrorAlertDos = ERROR_FORMA_ALERT_DOS;
  /**
     * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
     */
  public formErrorAlertTres = ERROR_FORMA_ALERT_TRES;
  /**
     * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
     */
  public formErrorAlertQuad = ERROR_FORMA_ALERT_QUAD;
  /**
  /**
     * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
     */
    @ViewChild('pasoUnoRef') pasoUnoComponent!: DatosComponent;

  /**
   * @property {number} nroPasos - Número total de pasos en el flujo, calculado a partir de la longitud de `pantallasPasos`.
   * @property {number} indice - Índice actual del paso en el flujo.
   * @property {string} txtBtnAnt - Texto que se muestra en el botón para retroceder al paso anterior.
   * @property {string} txtBtnSig - Texto que se muestra en el botón para avanzar al siguiente paso.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

 /**
   * Updates the index value based on the action button event.
   * @param e The action button event containing the action and value.
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 4) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
 /**
   * Método que se ejecuta cuando cambia de tab en paso-uno.
   * Oculta el mensaje de error de validación.
   */
 alCambiarPestana(): void {
  this.esFormaValido = false;
  this.esFormaValidoDos = false;
  this.esFormaValidoTres = false;
  this.esFormaValidoCuatro = false;
}
}
