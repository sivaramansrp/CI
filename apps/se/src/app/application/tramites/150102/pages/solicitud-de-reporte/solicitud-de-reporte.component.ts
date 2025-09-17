import {
  AlertComponent,
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosComponent } from '../datos/datos.component';
import { PAGO_DE_DERECHOS } from '../../constantes/solicitud150102.enum';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { REPORTE_ANUAL_PASOS } from '../../enums/reporte-anual.enum';

/**
 * @description Interfaz que define la estructura y propiedades de una acción asociada a un botón interactivo.
 * Esta interfaz permite manejar eventos y datos relacionados con el funcionamiento del botón.
 *
 * @interface AccionBoton
 * @property {string} accion - Define la acción que se ejecutará cuando se interactúe con el botón.
 * Puede incluir valores como 'cont' para avanzar, o 'atras' para retroceder, según la lógica del asistente.
 * @property {number} valor - Representa un valor numérico asociado a la acción, como el índice del paso actual.
 * Este campo se utiliza para identificar el contexto de la acción realizada.
 */
interface AccionBoton {
  /** Especifica la acción a realizar al presionar el botón (e.g., 'cont' para continuar, 'atras' para retroceder). */
  accion: string;

  /** Valor numérico asociado a la acción, usado para definir el paso o estado actual. */
  valor: number;
}

/**
 * @description Componente que gestiona el proceso de solicitud de reporte.
 * Utiliza un asistente (wizard) para guiar al usuario a través de diferentes pasos.
 */
@Component({
  selector: 'app-solicitud-de-reporte', // Selector del componente
  standalone: true, // Indica que este componente no es independiente y depende de otros módulos
  imports: [
    CommonModule,
    WizardComponent,
    DatosComponent,
    PasoTresComponent,
    AlertComponent,
    BtnContinuarComponent,
    AlertComponent,
  ], // Importa el componente Wizard para su uso en este componente
  templateUrl: './solicitud-de-reporte.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './solicitud-de-reporte.component.scss', // Ruta del archivo de estilos
})
export class SolicitudDeReporteComponent {
  /**
   * Representa el estado actual del pago de derechos.
   *
   * Inicialmente se establece con el valor `ADJUNTAR` de la enumeración `PAGO_DE_DERECHOS`.
   *
   * @type {string}
   */
  PAGO_DE_DERECHOS: string = PAGO_DE_DERECHOS.ADJUNTAR;
  /**
   * Mensaje de error a mostrar.
   */
  esValido = true;

  /** Referencia al componente del asistente (wizard) */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente `DatosComponent` identificado mediante el template reference variable `#datos`.
   *
   * Permite acceder directamente a las propiedades y métodos del componente hijo desde el componente padre.
   */
  @ViewChild('datos') datosComponent!: DatosComponent;

  /** Lista de pasos dentro del asistente */
  pantallasPasos: ListaPasosWizard[] = REPORTE_ANUAL_PASOS;

  /**
   * @description Índice del paso actual dentro del asistente.
   *
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /**
   * Contiene el mensaje de error que se mostrará al usuario.
   *
   * Se actualiza dinámicamente en función de las validaciones del formulario u otras operaciones fallidas.
   */
  mensajeError: string = '';

  /** Configuración de los datos de los pasos para el asistente */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length, // Número total de pasos en el asistente
    indice: this.indice, // Índice actual del paso
    txtBtnAnt: 'Anterior', // Texto del botón para retroceder
    txtBtnSig: 'Continuar', // Texto del botón para avanzar
  };

  /**
   * Genera una cadena HTML con los mensajes de validación del componente de datos anuales.
   *
   * Recorre la lista de mensajes almacenados en `mensajesDeValidacion` y construye
   * un bloque HTML para ser insertado en la interfaz, normalmente en un componente de alerta.
   *
   * @returns HTML en forma de string con los mensajes de error formateados.
   */
  generarValidacionHTML(): string {
    const SOLICITUD_COMPONENT =
      this.datosComponent?.datosDeReporteAnnualComponent;
    const ERRORES_HTML = SOLICITUD_COMPONENT.mensajesDeValidacion
      .map(
        (message, index) => `
        <div class="validation-wrapper">
          <span class="validation-index">${index + 1}.</span>
          <span class="validation-message">${message}</span>
        </div>`
      )
      .join('');
    const HTML = `
    <div class="validation-title">Corrija los siguientes errores:</div>
    ${ERRORES_HTML}
  `;
    return HTML;
  }

  /**
   * @description Método que actualiza el índice del paso actual dentro del asistente.
   * Ejecuta una acción dependiendo del valor de `e.accion` ('cont' para continuar, otro para retroceder).
   *
   * @param {AccionBoton} evento Objeto que contiene la acción y el valor del índice.
   */
  getValorIndice(evento: AccionBoton): void {
    if (evento.valor > 0 && evento.valor < 5) {
      if (this.indice === 1 && this.datosComponent.indice === 3) {
        const SOLICITUD_COMPONENT =
          this.datosComponent?.datosDeReporteAnnualComponent;
        this.esValido =
          SOLICITUD_COMPONENT?.validarTotalExportaciones() ?? false;
      }

      if (!this.esValido) {
        this.mensajeError = this.generarValidacionHTML();
        this.datosPasos.indice = 1;
        return;
      }

      this.indice = evento.valor;
      if (evento.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
