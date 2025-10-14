import { Component, ViewChild } from '@angular/core';
import { DatosPasos,WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/303/pasos.enums';

import { ALERTA_COM, REQUISITOS } from '../../constantes/expedicion-certificado.enum';

/**
 * Componente para la página de solicitud de expedición.
 * Este componente gestiona el flujo de pasos en un asistente (wizard) 
 * y permite la navegación entre ellos.
 */
@Component({
  selector: 'app-solicitud-expedicion',
  templateUrl: './solicitud-expedicion-page.component.html',
})
export class SolicitudExpedicionPageComponent {

  /**
 * Constante que asigna el texto de alerta definido en `ALERTA_COM`.
 */
  TEXTOSR= ALERTA_COM;

  /**
   * Lista de pantallas o pasos del asistente.
   * Se inicializa con la entidad correspondiente.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice actual del paso en el asistente.
   * Por defecto, comienza en 1.
   */
  indice: number = 1;

  /**
   * Textos de requisitos utilizados en el componente.
   */
  public TEXTOS = REQUISITOS;

  /**
   * Referencia al componente del asistente (wizard).
   * Se utiliza para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos relacionados con los pasos del asistente.
   * Incluye el número total de pasos, el índice actual y los textos de los botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Método para actualizar el índice del paso actual en el asistente.
   * Permite avanzar o retroceder en función de la acción recibida.
   * 
   * @param e - Objeto de tipo `AccionBoton` que contiene el valor del índice y la acción a realizar.
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
