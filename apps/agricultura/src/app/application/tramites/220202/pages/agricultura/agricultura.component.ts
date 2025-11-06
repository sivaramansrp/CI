import { ALERT_TEXTO, PASOS } from '../../constantes/220202/fitosanitario.enums';
import { AccionBoton, ListaPasosWizard } from '../../models/220202/fitosanitario.model';
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, WizardComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

/**
 * @fileoverview Componente para la gestión del formulario de agricultura.
 * Este componente maneja la lógica y la presentación del formulario de agricultura,
 * incluyendo la navegación entre pasos y la gestión de los datos.
 * @module agricultura
 */

/**
 * Componente para el formulario de agricultura.
 * Este componente se encarga de gestionar el formulario de agricultura, incluyendo
 * la navegación entre los pasos del formulario y la actualización de datos.
 * @class AgriculturaComponent
 * @selector app-agricultura
 * @templateUrl ./agricultura.component.html
 */
@Component({
  selector: 'app-agricultura',
  templateUrl: './agricultura.component.html'
})
export class AgriculturaComponent {

  /**
   * @description Texto que se muestra en la alerta del formulario.
   * Este texto es utilizado para proporcionar información al usuario sobre el propósito del formulario.
   * @type {string}
   */
  public readonly alertText = ALERT_TEXTO;

  /**
   * @description Array de objetos que definen los pasos del formulario.
   * Cada objeto contiene información sobre un paso específico,
   * incluyendo su número, título y si está completado.
   * Este array permite la gestión de las secciones o pasos dentro del formulario.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @description Referencia al componente Wizard.
   * Esta referencia permite acceder a los métodos y propiedades del componente Wizard,
   * como `siguiente()` y `atras()`, para controlar la navegación entre los pasos.
   * 
   * @type {WizardComponent}
   * @viewChild WizardComponent
   */
  @ViewChild(WizardComponent) componenteWizard!: WizardComponent;

  //   /**
  //  * @description Referencia al componente btn-continuar.
  //  * Esta referencia permite acceder a los métodos y propiedades del componente btn-continuar,
  //  *
  //  * @type {BtnContinuarComponent}
  //  * @viewChild BtnContinuarComponent
  //  */
  @ViewChild(PasoUnoComponent) pasoUnoRef!: PasoUnoComponent;

  /**
   * @description Índice actual del paso en el que se encuentra el usuario.
   * Este índice se utiliza para determinar qué paso se muestra en cada momento.
   * Los valores posibles de `indice` corresponden a los pasos definidos en el arreglo `pasos`.
   * 
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /** Indica si el botón Guardar debe mostrarse o estar habilitado en el formulario. */
  public btnGuardar: boolean = true;

  /** Indica la visibilidad del botón Guardar. */
  public btnGuardarVisible: string = 'visible';

  /**
 * Mensaje de error del formulario para mostrar en el alert.
 *
 * Contiene el HTML del mensaje de error a mostrar cuando hay validaciones fallidas.
 */
  formErrorAlert: string = '<strong>¡Error de registro! </strong> Faltan campos por capturar';

  /**
 * Indica si el formulario tiene errores de validación.
 *
 * Se utiliza para mostrar/ocultar el alert de errores en el modal.
 */
  esFormaInValido: boolean = false;

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
  getValorIndice(e: AccionBoton): void {
    // Si estamos en el paso 1, validar antes de continuar
    console.log('indicePasos', this.indice);
    if (this.indice === 1) {
      var validaPestañas = this.pasoUnoRef?.validarFormularios();
      console.log('validaPestañas', validaPestañas);
      if (!validaPestañas.valido) {
        // Detener la navegación si no es válido
        console.log('no es valido', this.indice);
        this.datosPasos.indice = this.indice;
        this.esFormaInValido = true;

        if (validaPestañas.mensaje) {
          this.formErrorAlert = '<strong>¡Error de registro! </strong> Faltan campos por capturar <br>' + validaPestañas.mensaje;
        }
        else {
          this.formErrorAlert = '<strong>¡Error de registro! </strong> Faltan campos por capturar';

        }




        return;
      }
    }
    this.esFormaInValido = false;
    if (e.valor > 0 && e.valor < 5) {
      console.log('e.valor', e.valor);
      this.indice = e.valor;
      if (e.accion === 'cont') {
        console.log('continuarCod', this.indice);
        this.componenteWizard.siguiente();
      } else {
        this.componenteWizard.atras();
      }
    }
  }

  // ngAfterViewInit() {
  //   // Aquí ya puedes acceder a sus propiedades o métodos
  //   console.log('BtnContinuarComponent.habilitarBoton');

  //   this.BtnContinuarComponent.habilitarBoton = true;
  // }

  /**
* Obtiene los datos del store y los guarda utilizando el servicio.
*/
  // eslint-disable-next-line class-methods-use-this
  obtenerDatosDelStore(): void {
    // Lógica para obtener datos del store y guardarlos
  }
}
