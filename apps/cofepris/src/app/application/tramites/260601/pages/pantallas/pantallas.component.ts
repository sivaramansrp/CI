import { Component, ViewChild } from '@angular/core';

import {
  AlertComponent,
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  PASOS,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { AVISO_PRIVACIDAD } from '../../constantes/aviso-enum';
import { CommonModule } from '@angular/common';
import { DatosComponent } from '../datos/datos.component';
import { FirmarSolicitudComponent } from '../firmar-solicitud/firmar-solicitud.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Interfaz que representa el botón de acción.
 */
interface AccionBoton {
  /**
   * La acción a realizar.
   */
  accion: string;

  /**
   * El valor asociado con la acción.
   */
  valor: number;
}

/**
 * Componente para la página de registro de solicitud.
 */
@Component({
  templateUrl: './pantallas.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WizardComponent,
    BtnContinuarComponent,
    DatosComponent,
    PasoDosComponent,
    AlertComponent,
    FirmarSolicitudComponent,
  ],
  styles: ``,
})
export class PantallasComponent {
  /**
   * Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Referencia al componente WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = AVISO_PRIVACIDAD;

  /**
   * Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Selecciona la pestaña especificada.
   *
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice y realiza la acción correspondiente.
   *
   * @param e - El botón de acción con el valor y la acción.
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

export { PASOS };
