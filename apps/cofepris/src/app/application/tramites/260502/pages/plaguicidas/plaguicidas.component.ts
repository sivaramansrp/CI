import { Component, ViewChild } from '@angular/core';

import { AVISO, ListaPasosWizard, Notificacion, PASOS } from '@libs/shared/data-access-user/src';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
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
  standalone: false,
  templateUrl: './plaguicidas.component.html',
})
export class PlaguicidasComponent {
  /**
   * Lista de pasos del asistente.
   * Se obtiene de una constante definida en otro archivo.
   */
  pasos: ListaPasosWizard[] = PASOS;

   /**
   * 
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
   public infoAlert = 'alert-info';

   /**
    * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
    */

  TEXTOS = AVISO.Aviso;

  /**
   * Indice actual del paso en el asistente.
   * Se inicializa en 1.
   */
  indice: number = 1;
 isFormValid: boolean = false;
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
   * Actualiza el estado local de validez del formulario.
   * Este método recibe el valor emitido por el componente hijo.
   * Se utiliza para saber si el formulario es válido o no desde el componente principal.
   */
onFormValidityChange(isValid: boolean):void {
  this.isFormValid = isValid;
}
/**
   * @description
   * Objeto que representa una notificación de confirmación para agregar servicios.
   * Se utiliza para mostrar modal de confirmación al usuario.
   */
  public notificacionContinuarServicios!: Notificacion;
  /**
   * Maneja la acción del botón en el asistente.
   * Cambia el paso actual según la acción del botón.
   *
   * @param e - Objeto que contiene la acción y el valor del botón.
   */
  getValorIndice(e: AccionBoton): void {
 if (!this.isFormValid) {
   this.notificacionContinuarServicios = {
          tipoNotificacion: 'alert',
          categoria: 'danger',
          modo: 'action',
          titulo: '',
          mensaje: '¿Está seguro que su solicitud no requiere los datos del Pago de derechos?',
          cerrar: true,
          tiempoDeEspera: 2000,
          txtBtnAceptar: 'Si',
          txtBtnCancelar: 'No',          
        };

 }
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
