import {
  AccionBoton,
  DatosPasos,
  ListaPasosWizard,
} from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';

import { PASOS, TITULO_MENSAJE } from '../../constants/destinados-donacio.enum';
import {MENSAJE_DE_VALIDACION}from'../../constants/destinados-donacio.enum';
import { WizardComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Notificacion } from '@ng-mf/data-access-user';
@Component({
  selector: 'app-contenedor-de-pasos',
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-paso.component.scss',
})
export class ContenedorDePasosComponent {
  /**
   * Título del mensaje que se muestra en el componente.
   * Puede ser nulo si no está definido.
   * @type {string | null}
   */
  tituloMensaje: string | null = TITULO_MENSAJE;

  /**
   * Lista de pasos para el componente wizard.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

    /**
 * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
 * }
 */
 esFormaValido: boolean = false;

   /**
      * @property {PasoUnoComponent} pasoUnoComponent
      * @description
      * Referencia al componente hijo `PasoUnoComponent` mediante
      * `@ViewChild`. Permite acceder a sus métodos y propiedades
      * desde este componente padre.
      */
      @ViewChild(PasoUnoComponent)
      pasoUnoComponent!: PasoUnoComponent;

   /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
   esMostrarAlerta: boolean = false;

    /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
  public mostrarAlerta: boolean = false;

  /**
   * Índice del paso actual en el wizard.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Referencia al componente Wizard hijo.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  
  
      /** Nueva notificación relacionada con el RFC. */
      public seleccionarFilaNotificacion!: Notificacion;
  
        /**
       * @property {string} MENSAJE_DE_ERROR
       * @description
       * Propiedad usada para almacenar el mensaje de error actual.
       * Se inicializa como cadena vacía y se actualiza en función
       * de las validaciones o errores capturados en el flujo.
       */
         MENSAJE_DE_ERROR: string = MENSAJE_DE_VALIDACION;
      
  /**
   * Datos de configuración para los pasos del wizard.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Selecciona una pestaña específica del wizard.
   * @method
   * @param {number} i - Índice de la pestaña a seleccionar
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene y procesa el valor del índice desde un evento de botón.
   * @method
   * @param {AccionBoton} e - Objeto con la acción y valor del botón
   */
  getValorIndice(e: AccionBoton): void {
     if (e.accion === 'cont') {
         let isValid = true;
   
           if (this.indice === 1 && this.pasoUnoComponent) {
           isValid = this.pasoUnoComponent.validarPasoUno();
         }
         if(!this.pasoUnoComponent.ValidarPagoDerechos()){
           this.mostrarAlerta=true;
           this.seleccionarFilaNotificacion = {
             tipoNotificacion: 'alert',
             categoria: 'danger',
             modo: 'action',
             titulo: '',
             mensaje: MENSAJE_DE_VALIDACION,
             cerrar: true,
             tiempoDeEspera: 2000,
             txtBtnAceptar: 'SI',
             txtBtnCancelar: 'NO',
           }
         }
         if (!isValid) {
           this.esFormaValido = true;
           this.datosPasos.indice = this.indice;
           return;
         }
   
         this.esFormaValido = false;
         this.indice = e.valor;
         this.datosPasos.indice = this.indice;
   
         this.wizardComponent.siguiente();
         return;
       }
   
         this.indice = e.valor;
       this.datosPasos.indice = this.indice;
       this.wizardComponent.atras();
  }

  /**
   * Método estático que obtiene el nombre del título según el valor del paso.
   * @param {number} valor - Valor numérico del paso actual
   * @returns {string} - Título correspondiente al paso
   */
  static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return TITULO_MENSAJE;
      case 2:
        return 'Cargar archivos';
      case 3:
        return 'Firmar';
      default:
        return TITULO_MENSAJE;
    }
  }
}
