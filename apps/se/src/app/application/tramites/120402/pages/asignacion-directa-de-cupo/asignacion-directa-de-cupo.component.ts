/**
 * Componente que gestiona la asignación directa de cupo.
 * Muestra una serie de pantallas de pasos y utiliza textos predefinidos.
 */
import { Component, ViewChild } from '@angular/core';

import { ASIGNACION } from '@ng-mf/data-access-user';

import { ListaPasosWizard } from '@ng-mf/data-access-user';

import { DatosPasos, Notificacion, WizardComponent } from '@ng-mf/data-access-user';

import { Tramite120402Query } from '../../estados/tramite120402.query';

import { NOTA } from '../../constantes/definiciones.enum';

/**
 * Interface que representa la acción de un botón en el wizard.
 */
interface AccionBoton {
  /**
   * Acción que se debe ejecutar (por ejemplo, 'cont' para continuar, 'atras' para retroceder).
   */
  accion: string;
  /**
   * Valor asociado a la acción, generalmente representa el índice del paso.
   */
  valor: number;
}

/**
 * Componente Angular para la asignación directa de cupo.
 * Controla la navegación entre los pasos del wizard y muestra alertas según la interacción del usuario.
 */
@Component({
  selector: 'app-asignacion-directa-de-cupo',
  templateUrl: './asignacion-directa-de-cupo.component.html',
})
export class AsignacionDirectaDeCupoComponent {
  /**
   * Referencia al componente wizard que controla la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Lista de pasos que forman el wizard para la asignación directa.
   */
  pantallasPasos: ListaPasosWizard[] = ASIGNACION;

  /**
   * Índice del paso actual en el wizard.
   */
  indice: number = 1;

  /**
   * Clase CSS para el tipo de alerta que se muestra (info, error, etc.).
   */
  public infoAlert = 'alert-info';

  /**
   * Controla si se debe mostrar o no la alerta al usuario.
   */
  public showAlert: boolean = false;

  /**
   * Mensaje de confirmación que se muestra cuando hay campos obligatorios no seleccionados.
   */
  MENSAJE_CONFIRMACION: string = NOTA.CONTINUAR_BUTTON_ALERT;

  /**
   * Constructor del componente.
   * 
   * @param tramite120402Query - Servicio para consultar el estado del trámite desde el store.
   */
  constructor(private tramite120402Query: Tramite120402Query) {}

  /**
   * Objeto que contiene la notificación actual que se mostrará al usuario.
   */
  nuevaAlertaNotificacion!: Notificacion;

  /**
   * Datos configurables para los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Método que actualiza el índice del paso actual según la acción del botón pulsado.
   * Si la acción es continuar y el valor está entre 1 y 4, avanza al siguiente paso.
   * Si la acción es retroceder, regresa al paso anterior.
   * 
   * @param e - Evento que contiene la acción y el valor del botón pulsado.
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

  /**
   * Método para actualizar el estado del grid de comercializadores de productos.
   * Actualmente no implementado.
   */
}
