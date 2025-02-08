/* eslint-disable sort-imports */
import { Component, ViewChild } from '@angular/core';
import { INSPECCIONFISIOPASOS } from '../../../../core/enums/220502/solicitud-pantallas.enum';
import { ListaPasosWizard } from '../../../../core/models/5701/servicios-extraordinarios.model';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

/** Interface to define the structure of button actions */
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-inspeccion-fisica',
  templateUrl: './inspeccion-fisica.component.html',
  styleUrl: './inspeccion-fisica.component.scss',
})
export class InspeccionFisicaComponent {
  /** Lista de pasos del asistente inicializados desde la enumeración */
  pasos: ListaPasosWizard[] = INSPECCIONFISIOPASOS;

  /** Índice de pasos activos actuales*/
  indice: number = 1;

  /** Referencia al componente secundario Wizard */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /** Estructura de datos para gestionar las propiedades de los pasos del asistente */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Método para configurar la pestaña activa según el índice proporcionado
   * @param i - El índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Maneja la navegación entre los pasos del asistente según las acciones de los botones.
   * @param e - La acción del botón que contiene el tipo de acción y el valor del índice.
   */
  getValorIndice(e: AccionBoton) {
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
