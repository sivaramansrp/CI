import { Component } from '@angular/core';
import {
  Notificacion,
  NotificacionesComponent,
  WizardComponent,
  BtnContinuarComponent,
  ListaPasosWizard,
  DatosPasos,
  AccionBoton,
} from '@libs/shared/data-access-user/src';
import { PASOS } from '../../constantes/cancelar-reporte-const';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancelar-reporte',
  standalone: true,
  imports: [
    NotificacionesComponent,
    WizardComponent,
    BtnContinuarComponent,
    CommonModule,
  ],
  templateUrl: './cancelar-reporte-mensual.component.html',
})
export class CancelarReporteComponent {
  indice: number = 1;
  esFormaValido: boolean = false;
  formErrorAlert: string = '';
  alertaNotificacion!: Notificacion;
  pasos: ListaPasosWizard[] = PASOS;
  PASO_UNO: number = 1;

  wizardComponent!: WizardComponent;

  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Maneja la navegación entre pasos del wizard.
   * @param e Objeto con información de la acción del botón
   */
  getValorIndice(e: AccionBoton): void {
    if (this.indice === this.PASO_UNO) {
      const FORM_VALIDO = true;
      this.esFormaValido = FORM_VALIDO;
      if (!FORM_VALIDO) {
        this.datosPasos.indice = this.indice;
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
      }
      //this.ejecutarPostGuardar(e);
    } else {
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.actualizarDatosPasos();
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
  }

  /**
   * Actualiza los datos del componente de pasos con el índice actual y el número total de pasos.
   */
  actualizarDatosPasos(): void {
    this.datosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
  }
}
