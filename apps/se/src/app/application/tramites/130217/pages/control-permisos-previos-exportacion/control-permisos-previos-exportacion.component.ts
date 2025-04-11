/**
 * Importamos los módulos necesarios y constantes.
 * Estos incluyen datos relacionados con el asistente de pasos (wizard) y las enumeraciones específicas de la aplicación. 
 */
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../enums/accion-botton.enum';
import { PASOS_EXPORTACION } from '../../constants/control-permisos-previos-exportacion.enum';

 /**
   * Selector para usar este componente dentro de otras partes de la aplicación.
   * Ruta al archivo HTML que define la plantilla de este componente.
   */
@Component({
  selector: 'app-control-permisos-previos-exportacion',
  templateUrl: './control-permisos-previos-exportacion.component.html',
})
export class ControlPermisosPreviosExportacionComponent {
  /**
   * Lista de pasos requeridos para el asistente,
   * inicializados desde una constante predefinida.
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS_EXPORTACION;

  /**
   * Índice del paso actual en el asistente.
   * Representa el paso activo en el que el usuario está navegando.
   */
  indice: number = 1;

  /**
   * Índice de la pestaña actual.
   * Puede ser utilizado para gestionar la navegación de pestañas si aplica.
   */
  tabIndex: number = 1;

  /**
   * Referencia al componente hijo `WizardComponent`.
   * Permite interactuar directamente con los métodos del asistente,
   * como `siguiente()` o `atras()`.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Objeto que contiene detalles sobre los pasos en el asistente.
   * Incluye el número total de pasos, el índice actual y el texto para los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length, // Número total de pasos en el asistente.
    indice: this.indice, // Índice actual del paso activo.
    txtBtnAnt: 'Anterior', // Texto para el botón "Anterior".
    txtBtnSig: 'Continuar', // Texto para el botón "Continuar".
  };

  /**
   * Actualiza el índice del paso actual según la acción del usuario.
   * Permite la navegación hacia adelante (cont) o hacia atrás a través de los pasos del asistente.
   * 
   * @param e - Un objeto que contiene el valor del paso objetivo y el tipo de acción 
   * ('cont' para continuar o 'back' para retroceder).
   */
  getValorIndice(e: AccionBoton): void {
    // Verifica que el índice del paso objetivo esté dentro del rango válido.
    if (e.valor > 0 && e.valor < 4) {
      this.indice = e.valor; // Actualiza el índice del paso actual.
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente(); // Llama al método para avanzar al siguiente paso.
      } else {
        this.wizardComponent.atras(); // Llama al método para regresar al paso anterior.
      }
    }
  }
}
