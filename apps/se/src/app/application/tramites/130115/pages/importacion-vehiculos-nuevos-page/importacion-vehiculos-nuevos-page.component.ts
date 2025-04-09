// Importaciones necesarias para el componente
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { PASOS_EXPORTACION } from '../../constants/importacion-vehiculos-nuevos-pasos.enum';

import { AccionBoton } from '../../enums/accionbotton.enum';

// Decorador que define el componente y su configuración
@Component({
  selector: 'app-importacion-vehiculos-nuevos-page', // Selector del componente
  templateUrl: './importacion-vehiculos-nuevos-page.component.html' // Ruta de la plantilla HTML
})
export class ImportacionVehiculosNuevosPageComponent {
  // Lista de pasos del asistente, obtenida de una constante
  pasosSolicitar: ListaPasosWizard[] = PASOS_EXPORTACION;

  // Índice del paso actual en el asistente (inicia en 1)
  indice: number = 1;

  // Índice de la pestaña activa (inicia en 1)
  tabIndex: number = 1;

  // Referencia al componente WizardComponent para controlar la navegación
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  // Datos relacionados con los pasos del asistente
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length, // Total de pasos
    indice: this.indice, // Paso actual
    txtBtnAnt: 'Anterior', // Texto del botón "Anterior"
    txtBtnSig: 'Continuar', // Texto del botón "Continuar"
  };

  /**
   * Método para actualizar el índice del paso actual y navegar entre pasos.
   * @param e Objeto con el nuevo índice y la acción ('cont' o 'ant')
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) { // Verifica que el índice esté en rango
      this.indice = e.valor; // Actualiza el índice
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente(); // Navega al siguiente paso
      } else {
        this.wizardComponent.atras(); // Navega al paso anterior
      }
    }
  }
}