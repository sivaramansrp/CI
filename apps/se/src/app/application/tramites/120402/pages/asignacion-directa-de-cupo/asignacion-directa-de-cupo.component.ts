/**
 * Componente que gestiona la asignación directa de cupo.
 * Muestra una serie de pantallas de pasos y utiliza textos predefinidos.
 */
import { Component, ViewChild } from '@angular/core';
 
import { ASIGNACION } from '@ng-mf/data-access-user';

import { ListaPasosWizard } from '@ng-mf/data-access-user';

import { DatosPasos, Notificacion, WizardComponent } from '@ng-mf/data-access-user';

import { Tramite120402Query } from '../../estados/queries/tramite120402.query';

import { NOTA} from '../../constantes/definiciones.enum';
/**
 * Interface representing the action of a button.
 */
interface AccionBoton {
  /**
   * The action to be performed.
   */
  accion: string;
  /**
   * The value associated with the action.
   */
  valor: number;
}

/**
 * Componente que gestiona la asignación directa de cupo.
 * Muestra una serie de pantallas de pasos y utiliza textos predefinidos.
 */
@Component({
  selector: 'app-asignacion-directa-de-cupo',
  templateUrl: './asignacion-directa-de-cupo.component.html',
})
export class AsignacionDirectaDeCupoComponent {
    /**
   * Reference to the WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * Lista de pasos para el asistente (wizard) de asignación directa.
   */
  pantallasPasos: ListaPasosWizard[] = ASIGNACION;
 
  /**
   * Índice actual del paso en el asistente.
   */
  indice: number = 1;

   /**
   * Mensaje de información para la alerta.
   */
  public infoAlert = 'alert-info';

  public showAlert: boolean = false;

 /**
   * Mensaje de confirmación para campos obligatorios no seleccionados.
   * @type {string}
   */
  
  MENSAJE_CONFIRMACION: string = NOTA.CONTINUAR_BUTTON_ALERT;

    /**
     * Constructor del componente.
   
     * @param tramite120402Query - Query para obtener datos del store.
     */
    constructor(
  
      private tramite120402Query: Tramite120402Query
    ) {}
 



  /**
   * Notificación para mostrar alertas al usuario.
   * @type {Notificacion}
   */
  nuevaAlertaNotificacion!: Notificacion;

    /**
   * The data for the steps in the wizard.
   */
    datosPasos: DatosPasos = {
      nroPasos: this.pantallasPasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };

  /**
   * Updates the index value based on the action button event.
   * @param e The action button event containing the action and value.
   */
  public getValorIndice(e: AccionBoton): void {
       console.log('inside getValorIndice', this.showAlert);
    
       if(this.showAlert===true){
    
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }}
  /**
   * Actualiza el estado del grid de comercializadores de productos.
   */
  actualizaGridComercializadoresProductos(): void {
     const VALOR_ENTIDAD = this.tramite120402Query.getValue().entidad;
    const VALOR_REPRESENTACION =
      this.tramite120402Query.getValue().representacion;
       
      if (!VALOR_ENTIDAD || !VALOR_REPRESENTACION) {//
          console.log('inside actualizaGridComercializadoresProductos');
        this.showAlert = true;
        }
        else{
          this.showAlert = false;
        }
        
      this.nuevaAlertaNotificacion = {
          tipoNotificacion: 'banner',
          categoria: 'danger', 
          modo: 'action',
          titulo: '',
          mensaje: this.MENSAJE_CONFIRMACION,
          cerrar: true,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
  }
}
}