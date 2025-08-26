import { ERROR_FORMA_ALERT,ERROR_FORMA_ALERT_DOS,ERROR_FORMA_ALERT_QUAD,ERROR_FORMA_ALERT_TRES,REPORTE_ANUAL_PASOS } from '../../enums/registro-solicitud-anual.enum';
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
   * Método que actualiza el índice del paso actual basado en la acción del botón.
   * 
   * @param {AccionBoton} e - Objeto que contiene la acción ('cont' para continuar, 'atras' para retroceder) y el valor del índice del paso.
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
  if (e.accion === 'cont') {
    let noError=0;
    if (this.indice === 1 ) {
      noError = this.pasoUnoComponent.validarTodosLosFormularios();
    }
    if (noError===1) {
      this.esFormaValido = true;
      this.esFormaValidoDos = false;
      this.esFormaValidoTres = false;
      this.esFormaValidoCuatro = false;
      this.datosPasos.indice = this.indice;
      return;
    }
    else if (noError===2) {
      this.esFormaValidoDos = true;
      this.esFormaValido = false;
      this.esFormaValidoTres = false;
      this.esFormaValidoCuatro = false;
      this.datosPasos.indice = this.indice;
      return;
    }
    else if (noError===3) {
      this.esFormaValidoTres = true;
      this.esFormaValidoDos = false;
      this.esFormaValido = false;
      this.esFormaValidoCuatro = false;
      this.datosPasos.indice = this.indice;
      return;
    }
    else if (noError===4) {
      this.esFormaValidoCuatro = true;
      this.esFormaValidoTres = false;
      this.esFormaValidoDos = false;
      this.esFormaValido = false;
      this.datosPasos.indice = this.indice;
      return;
    }
    else if(noError===5) {
      this.esFormaValido = false;
      this.esFormaValidoDos = false;
      this.esFormaValidoTres = false;
      this.esFormaValidoCuatro = false;
      this.datosPasos.indice = this.indice;
      
      return;
    }
      this.esFormaValido = false;
      this.esFormaValidoDos = false;
      this.esFormaValidoTres = false;
      this.esFormaValidoCuatro = false;
    this.esFormaValido = false;
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;    
    
      this.wizardComponent.siguiente();
  }
}
 /**
   * Método que se ejecuta cuando cambia de tab en paso-uno.
   * Oculta el mensaje de error de validación.
   */
 alCambiarPestana(): void {
  this.esFormaValido = false;
}
}
