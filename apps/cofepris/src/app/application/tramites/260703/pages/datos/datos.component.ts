import { AVISO, DatosPasos, ERROR_FORMA_ALERT } from '@ng-mf/data-access-user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud260702State, Solicitud260702Store } from '../../../../shared/estados/stores/shared2607/tramites260702.store';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS_REGISTRO } from '@ng-mf/data-access-user';
import { Solicitud260702Query } from '../../../../shared/estados/queries/shared2607/tramites260702.query';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

/**
 * Interfaz que representa la acción de un botón.
 */
interface AccionBoton {
  /**
   * La acción que se va a realizar.
   */
  accion: string;
  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente que representa los pasos de datos en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-page',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit {


 /** Indica si el botón continuar ha sido activado para ejecutar las validaciones del formulario. */
  public isContinuarTriggered: boolean = false;

  /**
   * Estado actual de la solicitud para el trámite 260702.
   * Contiene toda la información relevante sobre el proceso de la solicitud,
   * incluyendo datos ingresados por el usuario y el progreso en el flujo del trámite.
   */
  solicitudState!: Solicitud260702State;

    /**
 * @property formErrorAlert
 * @description
 * Contiene el mensaje de alerta que se muestra cuando ocurre un error en el formulario.
 * 
 * Funcionalidad:
 * - Utiliza el mensaje definido en la constante `ERROR_FORMA_ALERT`.
 * - Este mensaje informa al usuario sobre los errores que deben corregirse en el formulario antes de continuar.
 * 
 * @type {string}
 * 
 * @example
 * <div *ngIf="!esFormaValido">
 *   {{ formErrorAlert }}
 * </div>
 */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
     * Referencia al componente `PasoUnoComponent`.
     */
    @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
    
    isPeligro:boolean=true;

  constructor( public solicitud260703Store:Solicitud260702Store,
      private solicitud260703Query:Solicitud260702Query){
 //
  }


  ngOnInit():void{
     this.solicitud260703Query.selectSolicitud$.pipe().subscribe((data) => {
      this.solicitudState = data;
      this.isContinuarTriggered = this.solicitudState['continuarTriggered'] ?? false;
    });
  }

  /**
   * Mensaje de alerta relacionado con el aviso de privacidad.
   */
  mensajeAlertaAvisoPrivacidad: string = AVISO.Aviso;

  /**
   * Lista de pasos en el asistente.
   */
  pasos: ListaPasosWizard[] = PASOS_REGISTRO;

  /**
   * Referencia al componente WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Variable utilizada para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS_REGISTRO;

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

  /**
   * Actualiza el valor del índice según el evento del botón de acción.
   * @param e El evento del botón de acción que contiene la acción y el valor.
   */
  public getValorIndice(e: AccionBoton): void {

    if (this.indice === 1 && e.accion === 'cont') {
      this.solicitud260703Store.setContinuarTriggered(true);
      const ES_VALIDO = this.validarFormulariosPasoActual();
      if (!ES_VALIDO) {
        this.isPeligro = false;
        this.datosPasos.indice = e.valor;
        return;
      }else if(ES_VALIDO){
        this.isPeligro = true;
        this.wizardComponent.siguiente();
      }
    }else{
       this.isPeligro = true;
        this.wizardComponent.siguiente();
    }
  }

 /**
   * Valida los formularios del paso actual antes de permitir continuar.
   * @returns {boolean} - `true` si los formularios son válidos, `false` en caso contrario.
   */
  validarFormulariosPasoActual(): boolean {
    if (this.indice === 1) {
      return this.pasoUnoComponent?.validarFormularios() ?? true;
    }
    return true;
  }
  
}
