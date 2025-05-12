import { Component } from '@angular/core';
import { DatosPasos } from '@libs/shared/data-access-user/src';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { REPORTE_ANUAL_PASOS } from '../../enums/reporte-anual.enum';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src';

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
  templateUrl: './solicitud-de-reporte.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './solicitud-de-reporte.component.scss', // Ruta del archivo de estilos
})
export class SolicitudDeReporteComponent {
  /** Referencia al componente del asistente (wizard) */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /** Lista de pasos dentro del asistente */
  pantallasPasos: ListaPasosWizard[] = REPORTE_ANUAL_PASOS;

  /**
   * @description Índice del paso actual dentro del asistente.
   *
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /** Configuración de los datos de los pasos para el asistente */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length, // Número total de pasos en el asistente
    indice: this.indice, // Índice actual del paso
    txtBtnAnt: 'Anterior', // Texto del botón para retroceder
    txtBtnSig: 'Continuar', // Texto del botón para avanzar
  };

  /**
   * @description Método que actualiza el índice del paso actual dentro del asistente.
   * Ejecuta una acción dependiendo del valor de `e.accion` ('cont' para continuar, otro para retroceder).
   *
   * @param {AccionBoton} e Objeto que contiene la acción y el valor del índice.
   */
  getValorIndice(e: AccionBoton): void {
    // Verifica que el valor esté dentro del rango válido
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor; // Actualiza el índice actual
      if (e.accion === 'cont') {
        // Llama al método siguiente() del asistente
        this.wizardComponent.siguiente();
      } else {
        // Llama al método atras() del asistente
        this.wizardComponent.atras();
      }
    }
  }
}
