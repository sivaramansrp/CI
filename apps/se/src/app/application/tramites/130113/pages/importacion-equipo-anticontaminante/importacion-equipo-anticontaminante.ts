import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../enums/accion-botton.enum';
import { PASOS } from '../../constants/pasos.enum';
import { PASOS_IMPORTACION } from '../../constants/importacion-equipo-anticontaminante.enum';

/**
 * Componente para gestionar el asistente de importación de equipo anticontaminante.
 * Contiene la lógica para manejar los pasos del asistente y la navegación entre ellos.
 * Autor: Equipo de Desarrollo
 * Versión: 1.0.0
 * Fecha: 2023-10-01
 */
@Component({
  selector: 'app-importacion-equipo-anticontaminante',
  templateUrl: './importacion-equipo-anticontaminante.component.html',
  styleUrl: './importacion-equipo-anticontaminante.component.scss',
})
export class ImportacionEquipoAnticontaminanteComponent {
    /**
   * @descripcion
   * Lista de pasos del asistente para el trámite.
   * @type {ListaPasosWizard[]}
   */
    pasosSolicitar: ListaPasosWizard[] = PASOS_IMPORTACION;

  // Índice del paso actual en el asistente.
  indice: number = 1;

  // Índice de la pestaña activa.
  tabIndex: number = 1;

  // Referencia al componente del asistente (wizard).
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  // Datos relacionados con los pasos del asistente.
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Método para manejar el cambio de paso en el asistente.
   * Recibe un evento con el valor del paso y la acción a realizar (continuar o retroceder).
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 4) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
