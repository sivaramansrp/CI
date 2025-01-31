
import { Component } from '@angular/core';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../core/models/220201/issuance-extension-modification.model';
import { PASOS } from '../../../../shared/constantes/issuance-extension-modification.enum'
import { SUCECESS_MESSAGE_STAGEONE } from '../../../../shared/constantes/issuance-extension-modification.enum'
import { ViewChild } from '@angular/core';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';


/**
 * Interfaz para definir la acción y el valor del botón. --220201
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-zoosanitario-page',
  templateUrl: './zoosanitario-page.component.html',
})
export class ZoosanitarioPageComponent {

  pasos: ListaPasosWizard[] = PASOS;
  tituloMensaje: string | null = 'Zoosanitario para importación';
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  indice: number = 1;
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Guardar',
    txtBtnSig: 'Continuar',
  };
  mensajeDeTextoDeExito: string = SUCECESS_MESSAGE_STAGEONE;
  /**
   * Maneja la acción del botón y determina la navegación (siguiente o anterior).
   * 
   * @param e - Objeto de acción que contiene la acción y el valor a manejar..
   * El `valor` representa el índice del paso al que ir.
   * La `accion` determina si avanzar (cont) o retroceder (atras).  --220201
   */
  getValorIndice(e: AccionBoton) {
    console.log(e);
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      this.tituloMensaje = this.obtenerNombreDelTítulo(e.valor);
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
  /**
     * Obtener un título para todas las páginas.
     * @param valor - valor del índice de página. --220201
     */
  obtenerNombreDelTítulo(valor: number, pestañaÍndice?: number) {
    switch (valor) {
      case 1:
        return 'Zoosanitario para importación';
      case 2:
        return 'Cargar archivos';
      case 3:
        return 'Zoosanitario para importación';
      case 4:
        return 'Firmar'
      default:
        return 'Zoosanitario para importación';
    }

  }
  onTabChange(selectedTab: number): void {
    switch (selectedTab) {
      case 1:
        this.tituloMensaje = 'Zoosanitario para importación';
        break;
      case 2:
        this.tituloMensaje = 'Captura del certificado zoosanitario para importación';
        break;
      case 3:
        this.tituloMensaje = 'Zoosanitario para importación';
        break;
      case 4:
        this.tituloMensaje = 'Zoosanitario para importación';
        break;
      case 5:
        this.tituloMensaje = 'Captura del certificado zoosanitario para importación';
        break;
      default:
        this.tituloMensaje = 'Zoosanitario para importación';
        break;
    }
  }
}
