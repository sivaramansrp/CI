import { Component, ViewChild } from '@angular/core';

import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../enums/accion-botton.enum';
import { PASOS_IMPORTACION } from '../../constants/importacion-equipo-anticontaminante.enum';

import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';

/**
 * Componente para gestionar el asistente de importación de equipo anticontaminante.
 * Contiene la lógica para manejar los pasos del asistente y la navegación entre ellos.
 * Autor: Equipo de Desarrollo
 * Versión: 1.0.0
 * Fecha: 2023-10-01
 */
/**
 * Componente para gestionar el asistente de importación de equipo anticontaminante.
 * Contiene la lógica para manejar los pasos del asistente y la navegación entre ellos.
 * @export
 * @class ImportacionEquipoAnticontaminanteComponent
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
    /**
     * Lista de pasos del asistente para el trámite.
     * @type {ListaPasosWizard[]}
     */
    pasosSolicitar: ListaPasosWizard[] = PASOS_IMPORTACION;

  /** Constante para el aviso de privacidad */
  /**
   * Constante para el aviso de privacidad.
   * @type {string}
   */
  AVISO_DE_PRIVACIDAD = AVISO.Aviso;
  
  // Índice del paso actual en el asistente.
  /**
   * Índice del paso actual en el asistente.
   * @type {number}
   */
  indice: number = 1;

  // Índice de la pestaña activa.
  /**
   * Índice de la pestaña activa.
   * @type {number}
   */
  tabIndex: number = 1;

  // Referencia al componente del asistente (wizard).
  /**
   * Referencia al componente del asistente (wizard).
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  // Datos relacionados con los pasos del asistente.
  /**
   * Datos relacionados con los pasos del asistente.
   * @type {DatosPasos}
   */
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
  /**
   * Método para manejar el cambio de paso en el asistente.
   * Recibe un evento con el valor del paso y la acción a realizar (continuar o retroceder).
   * @param {AccionBoton} e - Evento con el valor y la acción del botón.
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
