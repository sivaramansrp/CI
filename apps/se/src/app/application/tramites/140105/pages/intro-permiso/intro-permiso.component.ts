import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '../../constants/intropermiso.enum';
import { BusquedaFolioComponent } from '../busqueda-folio/busqueda-folio.component';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';

interface AccionBoton {
  accion: string;
  valor: number;
}
@Component({
  selector: 'app-intro-permiso',
  templateUrl: './intro-permiso.component.html',
  styleUrl: './intro-permiso.component.scss',

})
export class IntroPermisoComponent {
  /**
 * @description Array de objetos que definen los pasos del formulario.
 * Cada objeto contiene información sobre un paso específico,
 * incluyendo su número, título y si está completado.
 * Este array permite la gestión de las secciones o pasos dentro del formulario.
 * @type {ListaPasosWizard[]}
 */
  pasos: ListaPasosWizard[] = PASOS;
  mostrarBusqueda: boolean = false;
  /**
   * @description Referencia al componente Wizard.
   * Esta referencia permite acceder a los métodos y propiedades del componente Wizard,
   * como `siguiente()` y `atras()`, para controlar la navegación entre los pasos.
   * 
   * @type {WizardComponent}
   * @viewChild WizardComponent
   */
  @ViewChild(WizardComponent) componenteWizard!: WizardComponent;

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
    txtBtnAnt: 'Guardar',
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

  constructor(private servicioDeMensajesService: ServicioDeMensajesService){}

  ngOnInit() {
    this.servicioDeMensajesService.message$.subscribe((message) => {
      this.mostrarBusqueda = message;
    });
  }
  ngOnDestroy() {
      this.mostrarBusqueda = false;
  }
  getValorIndice(e: AccionBoton) {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.componenteWizard.siguiente();
      } else {
        this.componenteWizard.atras();
      }
    }
  }
}