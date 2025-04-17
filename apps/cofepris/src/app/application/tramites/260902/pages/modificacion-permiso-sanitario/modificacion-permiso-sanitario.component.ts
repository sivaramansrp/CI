import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { MODIFICACION_PERMISO_DATA, MODIFICACION_PERMISO_ENUM } from '../../constantes/modificacion-permiso.enum';
interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-modificacion-permiso-sanitario',
  templateUrl: './modificacion-permiso-sanitario.component.html',
})

export class ModificacionPermisoSanitarioComponent {
 /*
 *  * Se define el mensaje de datos para la modificación del permiso sanitario.
 *  * Este mensaje se utiliza para mostrar información relevante al usuario.
 */
  msgData =MODIFICACION_PERMISO_DATA;
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * 
   * Lista de pasos del asistente (wizard) para la modificación PROSEC.
   * Se obtiene a partir de la enumeración `PROSEC_MODIFICACION`.
   * 
   * @type {ListaPasosWizard[]}
   */
  pantallasPasos: ListaPasosWizard[] = MODIFICACION_PERMISO_ENUM;

  /**
   * Índice del paso actual dentro del asistente.
   * 
   * @type {number}
   * @default 1
   */
  indice: number = 1;
 
 /**
   * Objeto que contiene los datos de configuración para los pasos del asistente (wizard).
   * 
   * Propiedades:
   * - `nroPasos`: Número total de pasos en el asistente.
   * - `indice`: Índice del paso actual.
   * - `txtBtnAnt`: Texto para el botón "Anterior".
   * - `txtBtnSig`: Texto para el botón "Continuar".
   */
 datosPasos: DatosPasos = {
  nroPasos: this.pantallasPasos.length,
  indice: this.indice,
  txtBtnAnt: 'Anterior',
  txtBtnSig: 'Continuar',
};

/**
 * Método para actualizar el índice del paso actual en el asistente (wizard).
 * 
 * Este método se ejecuta cuando se realiza una acción en el asistente, como avanzar
 * al siguiente paso o retroceder al paso anterior.
 * 
 * @param e - Objeto de tipo `AccionBoton` que contiene:
 *   - `accion`: La acción a realizar ('cont' para continuar o cualquier otro valor para retroceder).
 *   - `valor`: El índice del paso al que se desea navegar.
 * 
 * Comportamiento:
 * - Si el valor del índice está entre 1 y 4 (inclusive), actualiza el índice actual.
 * - Si la acción es 'cont', avanza al siguiente paso utilizando el método `siguiente` del componente `WizardComponent`.
 * - Si la acción no es 'cont', retrocede al paso anterior utilizando el método `atras` del componente `WizardComponent`.
 */
getValorIndice(e: AccionBoton): void {
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
