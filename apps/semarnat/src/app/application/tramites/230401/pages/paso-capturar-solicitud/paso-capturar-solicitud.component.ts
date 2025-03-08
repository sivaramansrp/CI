import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PAGO_DE_DERECHOS, PASOS4, WizardComponent } from '@ng-mf/data-access-user';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AccionBoton } from '../../enum/pantallas-constante.enum';

@Component({
  selector: 'app-paso-capturar-solicitud',
  templateUrl: './paso-capturar-solicitud.component.html',
})
export class PasoCapturarSolicitudComponent {
  pasos: ListaPasosWizard[] = PASOS4;
  indice: number = 1;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
 * 
 * Una cadena que representa la clase CSS para una alerta de información.
 * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
 */
  public infoAlert = 'alert-info';
  /**
   * Una constante que contiene el valor del objeto 'PROTESTA'.
   * Se utiliza para almacenar datos adicionales relacionados con el componente.
   */

  TEXTOS = PAGO_DE_DERECHOS;

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e - event$: Acción del botón.
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
