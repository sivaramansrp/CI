import { AVISO, AccionBoton, DatosPasos, ListaPasosWizard, PAGO_DE_DERECHOS, PASOS, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
/**
 * Componente para la modificación de permisos de importación.
 */
@Component({
  selector: 'app-modificacion-permiso-importacion',
  templateUrl: './modificacion-permiso-importacion.component.html',
})
export class ModificacionPermisoImportacionComponent {
  /**
    * Lista de pasos en el asistente.
    */
  pasos: ListaPasosWizard[] = PASOS;

  /**
 * Variable que almacena los textos relacionados con el pago de derechos.
 */

  TEXTOS = PAGO_DE_DERECHOS;

  /** Clase CSS utilizada para mostrar una alerta de tipo informativo */
  public infoAlert = 'alert-info';


  /**
   * Referencia al componente WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Variable utilizada para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS;

  /**
   * Variable utilizada para almacenar el índice del paso actual.
   */
  indice: number = 1;

  /**
   * Datos para los pasos en el asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  // contiene el aviso de privacidad y lo asigna al valor correspondiente
  AVISO_DE_PRIVACIDAD = AVISO.Aviso;

  /**
   * Actualiza el valor del índice según el evento del botón de acción.
   * @param e El evento del botón de acción que contiene la acción y el valor.
   */
  public getValorIndice(e: AccionBoton): void {
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
