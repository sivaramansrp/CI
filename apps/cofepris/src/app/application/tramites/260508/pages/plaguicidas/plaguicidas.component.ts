import { Component, ViewChild } from '@angular/core';
import { ListaPasosWizard, PASOS } from '@libs/shared/data-access-user/src';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { TEXTO_DE_PELIGRO } from '../../constantes/permiso-nutrientes.enum';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Componente principal para la gestión de plaguicidas.
 * Contiene la lógica y la estructura del asistente de plaguicidas.
 */
@Component({
  selector: 'app-plaguicidas',
  templateUrl: './plaguicidas.component.html',
})
export class PlaguicidasComponent {
  /**
   * Lista de pasos del asistente.
   * Se obtiene de una constante definida en otro archivo.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Indice actual del paso en el asistente.
   * Se inicializa en 1.
   */
  indice: number = 1;

  /**
   * Título del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Título del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Indica si se debe mostrar un mensaje de peligro.
   */
  public isPeligro: boolean = false;

  /** Texto de advertencia que se muestra cuando hay condiciones peligrosas. */
  public textoPeligro: string = TEXTO_DE_PELIGRO; 

  /**
   * Referencia al componente `PasoUnoComponent`.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Maneja la acción del botón en el asistente.
   * Cambia el paso actual según la acción del botón.
   *
   * @param e - Objeto que contiene la acción y el valor del botón.
   */
  public getValorIndice(e: AccionBoton): void {
    // const NEXT_INDEX =
    //     e.accion === 'cont' ? e.valor + 1 :
    //     e.accion === 'ant' ? e.valor - 1 :
    //     e.valor;

    if (this.indice === 1 && e.accion === 'cont') {
      const ES_VALIDO = this.validarFormulariosPasoActual();
      if (!ES_VALIDO) {
        this.isPeligro = true; 
        return;
      }
      this.isPeligro = false;
    }
    // if (e.valor > 0 && e.valor < this.pasos.length) {
    //   if (e.accion === 'cont') {
    //     if (this.indice === 1) { 
    //         this.shouldNavigate$()
    //       .subscribe((shouldNavigate) => {
    //         if (shouldNavigate) {
    //           this.indice = NEXT_INDEX;
    //           this.datosPasos.indice = NEXT_INDEX;
    //           this.wizardService.cambio_indice(NEXT_INDEX);
    //           this.wizardComponent.siguiente();
    //         } else {
    //           this.indice = e.valor;
    //           this.datosPasos.indice = e.valor;
    //         }
    //       });
    //     } else {
    //       this.indice = NEXT_INDEX;
    //       this.datosPasos.indice = NEXT_INDEX;
    //       this.wizardService.cambio_indice(NEXT_INDEX);
    //       this.wizardComponent.siguiente();
    //     }
    //   } else {
    //     this.indice = NEXT_INDEX;
    //     this.datosPasos.indice = NEXT_INDEX;
    //     this.wizardComponent.atras();
    //   }
    // }
  }

  /**
   * Valida los formularios del paso actual antes de permitir continuar.
   * @returns {boolean} - `true` si los formularios son válidos, `false` en caso contrario.
   */
  private validarFormulariosPasoActual(): boolean {
    if (this.indice === 1) {
      return this.pasoUnoComponent?.validarFormularios() ?? true;
    }
    return true;
  }
}
