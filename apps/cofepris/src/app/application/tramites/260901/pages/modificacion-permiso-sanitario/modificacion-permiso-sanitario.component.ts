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
 
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  getValorIndice(e: AccionBoton) :void{
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
