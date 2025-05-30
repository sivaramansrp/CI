import { Component, ViewChild } from '@angular/core';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

import { EMPRESA_FRONTERA } from '@ng-mf/data-access-user';

import { DatosPasos } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

import { PASOS } from '@ng-mf/data-access-user';

/**
 * @interface AccionBoton
 * @description
 * Interfaz que define la estructura para las acciones de los botones de navegación en el asistente (wizard).
 * 
 * Propiedades:
 * - `accion`: Tipo de acción a realizar (por ejemplo, 'cont' para continuar o 'atras' para retroceder).
 * - `valor`: Valor numérico asociado a la acción, generalmente representa el índice del paso al que se desea navegar.
 * 
 * @example
 * const accion: AccionBoton = { accion: 'cont', valor: 2 };
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * @Component
 * @selector app-empresa-frontera-solicitud
 * @description
 * Componente `EmpresaFronteraSolicitudComponent` que gestiona los pasos de un asistente (wizard) para el trámite de empresa en frontera.
 * 
 * Detalles:
 * - Utiliza el decorador `@Component` para definir las propiedades del componente.
 * - Renderiza la plantilla HTML asociada para mostrar el flujo de pasos del asistente.
 * - Controla la navegación entre pasos mediante el índice y el componente `WizardComponent`.
 * 
 * Propiedades:
 * - `selector`: Define el nombre del selector del componente como `app-empresa-frontera-solicitud`.
 * - `templateUrl`: Ruta al archivo de plantilla HTML del componente.
 * 
 * @example
 * <app-empresa-frontera-solicitud></app-empresa-frontera-solicitud>
 */
@Component({
  selector: 'app-empresa-frontera-solicitud',
  templateUrl: './empresa-frontera-solicitud.html',
})
export class EmpresaFronteraSolicitudComponent {

  /**
 * @property wizardComponent
 * @description
 * Referencia al componente hijo `WizardComponent` dentro de la plantilla.
 * @type {WizardComponent}
 */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
 * @property pasos
 * @description
 * Contiene la lista de pasos del asistente (wizard) para el trámite de empresa en frontera.
 * @type {ListaPasosWizard[]}
 */
  private pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property {ListaPasosWizard[]} pantallasPasos
   * @description Contiene la lista de pasos del asistente (wizard).
   * La información se obtiene de la constante `EMPRESA_FRONTERA `.
   */
  public pantallasPasos: ListaPasosWizard[] = EMPRESA_FRONTERA ;

  /**
   * @property {number} indice
   * @description Representa el índice del paso actual en el asistente.
   * Se inicializa en 2, lo que significa que el asistente comenzará en el tercer paso.
   */
  public indice: number = 1;

  
  /**
 * @property datosPasos
 * @description
 * Objeto de configuración que contiene la información necesaria para el control de los pasos del asistente (wizard).
 * @type {DatosPasos}
 */
  public datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
 * @method getValorIndice
 * @description
 * Método que gestiona la navegación entre los pasos del asistente (wizard) según la acción recibida.
 * 
 * Detalles:
 * - Actualiza el índice del paso actual (`indice`) con el valor recibido en el objeto `e`.
 * - Si la acción es 'cont', avanza al siguiente paso utilizando el método `siguiente()` del `WizardComponent`.
 * - Si la acción es diferente, retrocede al paso anterior utilizando el método `atras()` del `WizardComponent`.
 * - Solo permite la navegación si el valor del paso está entre 1 y 4 (ambos inclusive).
 * 
 * @param {AccionBoton} e - Objeto que contiene la acción ('cont' o 'atras') y el valor del índice del paso.
 * 
 * @example
 * this.getValorIndice({ accion: 'cont', valor: 2 });
 * // Avanza al paso 2 del wizard.
 */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent?.siguiente();
      } else {
        this.wizardComponent?.atras();
      }
    }
  }
  
}
