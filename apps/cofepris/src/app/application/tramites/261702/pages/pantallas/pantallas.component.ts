import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/31601/servicios-pantallas.model';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { PANTA_PASOS } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantallas.enum';
/**
 * @component
 * @name PantallasComponent
 * @description
 * Componente que gestiona la visualización de pantallas y permite cambiar entre diferentes pasos o pestañas.
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})

export class PantallasComponent {  
  
  /**
  * compo doc
  * Lista de pasos del wizard.
  * @type {ListaPasosWizard[]}
  */
  public pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;

  /**
  * compo doc 
  * Índice del paso actual.
  * @type {number}
  * @default 1
  */
  public indice: number = 1;

  /**
  * compo doc
  * Mensaje relacionado con el aviso de privacidad simplificado.
  * 
  * @type {string}
  * @memberof PantallasComponent
  */
  public avisoPrivacidadAlert: string = AVISO.Aviso;

  /**
  * compo doc
  * Referencia al componente Wizard para controlar la navegación entre pasos.
  * @type {WizardComponent}
  */
  @ViewChild(WizardComponent) public wizardComponent!: WizardComponent;



  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  public consultaState!: ConsultaioState;

  /**
  * @constructor
  * @description Inicializa una instancia del `DatosComponent`.
  */
constructor() {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
  * compo doc
  * Datos utilizados para el control del wizard.
  * @type {DatosPasos}
  */
  public datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
  * compo doc
  * variable para contener el índice de la pestaña seleccionada
  * @type {number}
  */
  public indiceDePestanaSeleccionada: number = 1;

  /**
  * compo doc
  * Actualiza el índice del paso y maneja la navegación hacia adelante o atrás.
  *
  * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
  * @returns {void}
  */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
      this.indice = e.valor;
      this.datosPasos.indice = e.valor;
  
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
      if (e.valor!==1) {
        this.indiceDePestanaSeleccionada=1;
      }
    }
  }

  /**
   * compo doc
   * Función que obtiene el índice de la pestaña seleccionada
   * @param {number} event - evento de numero
   * @returns {void}
   */
  pestanaCambiado(event: number): void {
    if (event !== undefined && event !== null && !isNaN(event)) {
      this.indiceDePestanaSeleccionada = event;
    } else {
      this.indiceDePestanaSeleccionada = 1;
    }
  }

  
  
}
