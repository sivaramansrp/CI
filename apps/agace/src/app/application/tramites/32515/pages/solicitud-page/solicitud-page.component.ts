import { AVISO, DatosPasos, ListaPasosWizard, WizardComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { PASOS } from "../../constantes/modificacion-aviso-seguro-global.enum";

/**
 * @interface AccionBoton
 * @description Define la estructura del objeto utilizado para representar una acción de botón dentro del flujo de pasos.
 * 
 * @property accion - Acción a ejecutar ('cont' para continuar, otro valor para retroceder).
 * @property valor - Índice del paso al que se desea navegar.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
export class SolicitudPageComponent {

  /**
   * @property pasos
   * @type {ListaPasosWizard[]}
   * @description Contiene la lista de pasos definidos para el wizard.
   * 
   * @command Esta lista se importa desde una constante de enumeración `PASOS` y define la secuencia del flujo.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property indice
   * @type {number}
   * @default 1
   * @description Representa el índice actual del paso activo en el wizard.
   * 
   * @command Se actualiza cuando el usuario navega entre pasos o pestañas.
   */
  indice: number = 1;

  /**
   * @property wizardComponent
   * @type {WizardComponent}
   * @description Referencia al componente hijo `WizardComponent` para controlar la navegación entre pasos.
   * 
   * @command Utiliza el decorador `@ViewChild` para obtener acceso directo a sus métodos `siguiente()` y `atras()`.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property datosPasos
   * @type {DatosPasos}
   * @description Objeto que contiene la configuración del wizard, como el número de pasos, índice actual y texto de botones.
   * 
   * @command Este objeto es utilizado como entrada para controlar dinámicamente el flujo del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @property infoAlert
   * @type {string}
   * @default 'alert-info'
   * @description Define el tipo de clase CSS a utilizar para mostrar mensajes de alerta informativos.
   */
  public infoAlert = 'alert-info';

  /**
   * @property TEXTOS
   * @type {any}
   * @description Contiene los textos relacionados con el módulo de pago de derechos.
   * 
   * @command Estos textos son importados desde una constante compartida y pueden ser utilizados en la plantilla.
   */
  TEXTOS = AVISO;

  /**
   * @method seleccionaTab
   * @description Cambia el valor del índice actual según la pestaña seleccionada por el usuario.
   * 
   * @param indice - Número de índice correspondiente a la pestaña seleccionada.
   * 
   * @command Actualiza la propiedad `indice` para reflejar la pestaña activa en el flujo del componente.
   * 
   * @example
   * this.seleccionaTab(3); // Cambia a la tercera pestaña.
   */
  seleccionaTab(indice: number): void {
    this.indice = indice;
  }

  /**
   * @method getValorIndice
   * @description Determina la acción a realizar (avanzar o retroceder) y actualiza el índice del paso actual.
   * 
   * @param e - Objeto de tipo `AccionBoton` que contiene la acción (`'cont'` o `'atras'`) y el valor del nuevo índice.
   * 
   * @remarks Este método valida que el nuevo índice esté dentro de un rango válido (1 a 4), luego ejecuta el método correspondiente del componente `WizardComponent`.
   * 
   * @command Si la acción es `'cont'`, se avanza al siguiente paso llamando `siguiente()` del `wizardComponent`.
   * @command Si la acción es distinta, se retrocede llamando `atras()` del `wizardComponent`.
   * 
   * @example
   * this.getValorIndice({ accion: 'cont', valor: 2 }); // Avanza al paso 2.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

}
