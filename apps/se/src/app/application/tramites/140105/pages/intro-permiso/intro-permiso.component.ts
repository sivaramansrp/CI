import { Component } from '@angular/core';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import {ERROR_FORMA_ALERT} from '../../constants/intropermiso.enum';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PASOS } from '../../constants/intropermiso.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import {TODOS_PASOS} from '../../constants/intropermiso.enum';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';

interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}
@Component({
  selector: 'app-intro-permiso',
  templateUrl: './intro-permiso.component.html',
  styleUrl: './intro-permiso.component.scss',

})
export class IntroPermisoComponent implements OnInit, OnDestroy{
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
    * @property {boolean} esFormaValido
    * @description
    * Indica si el formulario del paso actual es válido.
    * Se utiliza para mostrar mensajes de error o controlar la navegación en el asistente.
    */
  esFormaValido: boolean = false;


  /**
   * Clase CSS utilizada para mostrar mensajes de alerta informativos en la interfaz.
   */
  infoAlert: string = 'info-alert';
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
   * @description Índice actual del paso en el que se encuentra el usuario.
   * Este índice se utiliza para determinar qué paso se muestra en cada momento.
   * Los valores posibles de `indice` corresponden a los pasos definidos en el arreglo `pasos`.
   * 
   * @type {number}
   * @default 1
   */
  indice: number = 1;

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

  /**
   * @property {PasoUnoComponent} pasoUnoComponent
   * @description
   * Referencia al componente hijo `PasoUnoComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario del primer paso del asistente desde el componente padre.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

   /**
    * @property {string} formErrorAlert
    * @description
    * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
    */
   public formErrorAlert = ERROR_FORMA_ALERT;

    /**
   * Variable utilizada para almacenar el tipo de alerta.
   */
  alerta = TODOS_PASOS.Importante;

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
  constructor(private servicioDeMensajesService: ServicioDeMensajesService){}
/**
   * @description Lifecycle method executed when the component initializes.
   * Subscribes to the message service to update the search display state.
   */
  ngOnInit(): void {
    this.servicioDeMensajesService.mensaje$.subscribe((mensaje) => {
      this.mostrarBusqueda = mensaje;
    });
  }
  /**
   * @description Lifecycle method executed when the component is destroyed.
   * Resets the search display state to false.
   */
  ngOnDestroy(): void {
      this.mostrarBusqueda = false;
  }
 
  /**
   * Obtiene el valor del índice de la acción del botón y controla la navegación del asistente.
   * @param e Acción del botón.
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