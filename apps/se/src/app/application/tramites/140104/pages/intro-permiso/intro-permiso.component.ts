import { PASOS, TEXTOS_CANCELACIONS } from '../../constants/intropermiso.enum';
import { Component } from '@angular/core';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { Subject } from 'rxjs';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { takeUntil } from 'rxjs/operators';
import {PasoUnoComponent} from '../paso-uno/paso-uno.component';
import {ERROR_FORMA_ALERT} from '../../constants/intropermiso.enum';

interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-intro-permiso',
  templateUrl: './intro-permiso.component.html',
  styleUrl: './intro-permiso.component.scss',

})
export class IntroPermisoComponent implements OnInit, OnDestroy{
    /**
   * Indica si se debe mostrar la alerta en la interfaz de usuario.
   * Se utiliza para controlar la visibilidad de mensajes de advertencia o error.
   */
  public showAlert = false;
    /**
   * Contiene los textos que se muestran al usuario cuando ocurre una cancelación.
   * Los textos provienen del archivo de constantes TEXTOS_CANCELACIONS.
   */
   TEXTOS = TEXTOS_CANCELACIONS;
   /**
   * Clase CSS para la alerta de información.
   */
  infoAlert = 'alert-danger';
  /**
 * @description Array de objetos que definen los pasos del formulario.
 * Cada objeto contiene información sobre un paso específico,
 * incluyendo su número, título y si está completado.
 * Este array permite la gestión de las secciones o pasos dentro del formulario.
 * @type {ListaPasosWizard[]}
 */
  pasos: ListaPasosWizard[] = PASOS;
  /**
   * @description Indicates whether the search section should be displayed.
   * Controlled based on service messages.
   * @type {boolean}
   */
  mostrarBusqueda: boolean = false;
  /**
   * @description Referencia al componente Wizard.
   * Esta referencia permite acceder a los métodos y propiedades del componente Wizard,
   * como `siguiente()` y `atras()`, para controlar la navegación entre los pasos.
   * 
   * @type {WizardComponent}
   * @viewChild WizardComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

   /**
   * @property {PasoUnoComponent} pasoUnoComponent
   * @description
   * Referencia al componente hijo `PasoUnoComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario del primer paso del asistente desde el componente padre.
   */
   @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * @description Índice actual del paso en el que se encuentra el usuario.
   * Este índice se utiliza para determinar qué paso se muestra en cada momento.
   * Los valores posibles de `indice` corresponden a los pasos definidos en el arreglo `pasos`.
   * 
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  
   /**
    * @property {string} formErrorAlert
    * @description
    * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
    */
   public formErrorAlert = ERROR_FORMA_ALERT;

  /**
    * @property {boolean} esFormaValido
    * @description
    * Indica si el formulario del paso actual es válido.
    * Se utiliza para mostrar mensajes de error o controlar la navegación en el asistente.
    */
  esFormaValido: boolean = false;

  /**
   * @description Objeto que contiene los datos de los pasos del formulario.
   * Este objeto se utiliza para comunicar información entre el componente Agricultura
   * y el componente Wizard, como el número total de pasos, el índice del paso actual
   * y los textos de los botones de navegación (anterior y siguiente).
   * 
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  mostrarDevolverFacturas: boolean = false;
  private destroy$ = new Subject<void>(); // Subject to manage unsubscription

  /**
   * @description Maneja la acción del botón y determina la navegación (siguiente o anterior).
   * Este método se llama cuando el usuario hace clic en uno de los botones de navegación
   * del formulario.
   * 
   * Recibe un objeto `AccionBoton` que contiene la acción a realizar (`cont` o `atras`)
   * y el valor del índice del paso al que se debe navegar.
   * 
   * @param {AccionBoton} e - Objeto que contiene la acción y el valor a manejar.
   *   El `valor` representa el índice del paso al que ir. La `accion` determina si avanzar
   *   (valor `cont`) o retroceder (valor `atras`).
   * 
   * @returns {void}
   */
/**
   * @description Service for managing and receiving messages.
   * Used to handle communication between components.
   * @param {ServicioDeMensajesService} servicioDeMensajesService
   */
  constructor(private servicioDeMensajesService: ServicioDeMensajesService){
    // Constructor is used for dependency injection
  }
/**
   * @description Lifecycle method executed when the component initializes.
   * Subscribes to the message service to update the search display state.
   */
  ngOnInit(): void {
    this.servicioDeMensajesService.mensaje$
      .pipe(takeUntil(this.destroy$)) // Automatically unsubscribe on destroy
      .subscribe((mensaje) => {
        this.mostrarBusqueda = mensaje;
      });

    this.servicioDeMensajesService.devolverFacturasMensaje$
      .pipe(takeUntil(this.destroy$)) // Automatically unsubscribe on destroy
      .subscribe((mensaje) => {
        this.mostrarDevolverFacturas = mensaje;
      });
     this.servicioDeMensajesService.obtenerMostrarAlerta()
  .pipe(takeUntil(this.destroy$))
  .subscribe((valor) => {
    this.showAlert = valor;
  });
  }
  /**
   * @description Lifecycle method executed when the component is destroyed.
   * Resets the search display state to false.
   */
  ngOnDestroy(): void {
    this.destroy$.next(); // Emit a value to signal completion
    this.destroy$.complete(); // Complete the Subject to clean up resources
   
      this.mostrarBusqueda = false;
  }
  /**
   * @description Handles the button action and determines navigation (next or previous).
   * Called when the user clicks on one of the form navigation buttons.
   *
   * Receives an `AccionBoton` object containing the action to perform (`cont` or `atras`)
   * and the index value of the step to navigate to.
   *
   * @param {AccionBoton} e - Object containing the action and the index value.
   *   `valor` represents the step index. `accion` indicates whether to proceed (`cont`)
   *   or go back (`atras`).
   *
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    if (e.accion === 'cont') {
      let isValid = true;
    
        if (this.indice === 1 && this.pasoUnoComponent) {
        isValid = this.pasoUnoComponent.validarFormularios();
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
}