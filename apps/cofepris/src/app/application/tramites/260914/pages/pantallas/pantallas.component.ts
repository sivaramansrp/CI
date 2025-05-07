import { CompleteForm, PagoDeDerechos, SolicitanteData, Tramite } from '../../models/mod-permiso.model';
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/260604/aviso-exportacion.model';
import { DatosComponent } from '../datos/datos.component';
import { PANTA_PASOS } from '@libs/shared/data-access-user/src/core/enums/260604/aviso-exportacion.enum';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * @description
 * Componente principal para gestionar el flujo de pasos en un wizard.
 * Este componente permite navegar entre diferentes pasos utilizando un componente de wizard.
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent {
  /**
   * @description
   * Lista de pasos del wizard cargados desde una constante.
   * Cada paso contiene información relevante para el flujo del wizard.
   */
  pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;

  /**
   * @description
   * Índice actual del paso seleccionado en el wizard.
   * Por defecto, el índice inicial es `1`.
   */
  indice: number = 1;

/**
   * @description
   * Referencia al componente del wizard para controlar la navegación entre pasos.
   * Esta referencia permite acceder a los métodos y propiedades del componente `WizardComponent`,
   * como avanzar al siguiente paso o retroceder al paso anterior.
   * 
   * @type {WizardComponent}
   * 
   * @example
   * // Avanzar al siguiente paso del wizard
   * this.wizardComponent.siguiente();
   */
@ViewChild(WizardComponent) wizardComponent!: WizardComponent;

/**
 * @description
 * Referencia al componente `DatosComponent` para acceder a los valores de los formularios.
 * Esta referencia permite interactuar con los métodos y propiedades del componente `DatosComponent`,
 * como obtener los valores de los formularios o realizar validaciones.
 * 
 * @type {DatosComponent}
 * 
 * @example
 * // Obtener los valores del formulario desde el componente `DatosComponent`
 * const valoresFormulario = this.datosComponent.obtenerValoresFormulario();
 */
@ViewChild(DatosComponent) datosComponent!: DatosComponent;

  /**
   * @description
   * Datos relacionados con los pasos del wizard, como el número total de pasos,
   * el índice actual y los textos de los botones de navegación.
   * @property {number} nroPasos - Número total de pasos en el wizard.
   * @property {number} indice - Índice actual del paso seleccionado.
   * @property {string} txtBtnAnt - Texto del botón para retroceder.
   * @property {string} txtBtnSig - Texto del botón para avanzar.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
  * Objeto para almacenar todos los valores recopilados de los formularios.
  */
  cargaUtil : {
    solicitante?: SolicitanteData;
    datosSolicitud?: CompleteForm[];
    pagoDeDerechos?: PagoDeDerechos[];
    tramitesAsociados?: Tramite[];
  } = {};
  /**
   * @description
   * Método que actualiza el índice del paso seleccionado en el wizard.
   * También controla la navegación hacia adelante o hacia atrás en el wizard.
   * @param {AccionBoton} e - Objeto que contiene la acción (`cont` o `atras`) y el valor del paso.
   */
  getValorIndice(e: AccionBoton): void {
    if (this.datosComponent) {
      // Call collectFormValues() from PasoUnoPagesComponent
      this.cargaUtil = this.datosComponent.obtenerValoresFormulario();

    } else {
      console.error('PasoUnoPagesComponent no está inicializado.');
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
/**
 * @description
 * Método que recopila y devuelve todos los valores de los formularios presentes en el componente `DatosComponent`.
 * Este método obtiene los datos del solicitante, los datos de la solicitud, los pagos de derechos
 * y los trámites asociados, consolidándolos en un único objeto.
 * 
 * @returns Un objeto que contiene:
 * - `solicitante`: Datos del formulario del solicitante.
 * - `datosSolicitud`: Lista de datos de las solicitudes de modificación.
 * - `pagoDeDerechos`: Lista de datos de los pagos de derechos.
 * - `tramitesAsociados`: Lista de trámites asociados.
 */
  obtenerValoresDelFormulario(): {
    datos?: {
     solicitante?: SolicitanteData;
     datosSolicitud?: CompleteForm[];
      pagoDeDerechos?: PagoDeDerechos[];
      tramitesAsociados?: Tramite[];
    };
  }
  {
    const TODOS_VALORES_FORM: {
      datos?: {
        solicitante?: SolicitanteData;
        datosSolicitud?: CompleteForm[];
        pagoDeDerechos?: PagoDeDerechos[];
        tramitesAsociados?: Tramite[];
      };
    } = {};
     // Verifica si el componente `DatosComponent` está disponible
    if (this.datosComponent) {
       // Obtiene los valores del formulario desde el componente `DatosComponent`
      const VALORES_DATOS = this.datosComponent.obtenerValoresFormulario();
      TODOS_VALORES_FORM.datos = VALORES_DATOS ;
    }
  
    return TODOS_VALORES_FORM;
}
}