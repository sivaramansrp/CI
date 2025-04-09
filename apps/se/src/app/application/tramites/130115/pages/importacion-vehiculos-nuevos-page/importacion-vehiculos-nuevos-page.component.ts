/**
 * Componente que representa los pasos de datos en un proceso de múltiples pasos. 
 * */
import { Component, ViewChild } from '@angular/core';
import { DatosPasos, PASOS } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
<<<<<<<< HEAD:apps/se/src/app/application/tramites/130115/pages/importacion-vehiculos-nuevos-page/importacion-vehiculos-nuevos-page.component.ts
========
import { PASOS } from '@libs/shared/data-access-user/src/tramites/constantes/paso-tres-steps.enum';
>>>>>>>> d7f7e885870d6f463bd458ad92a708fd035a9766:apps/agace/src/app/application/tramites/32501/pages/solicitud-page/solicitud-page.component.ts
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que define la estructura de una acción de botón.
 */
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
<<<<<<<< HEAD:apps/se/src/app/application/tramites/130115/pages/importacion-vehiculos-nuevos-page/importacion-vehiculos-nuevos-page.component.ts
  selector: 'app-importacion-vehiculos-nuevos-page',
 templateUrl: './importacion-vehiculos-nuevos-page.component.html'
})
export class ImportacionVehiculosNuevosPageComponent {
========
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
/**
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent {
>>>>>>>> d7f7e885870d6f463bd458ad92a708fd035a9766:apps/agace/src/app/application/tramites/32501/pages/solicitud-page/solicitud-page.component.ts
  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
<<<<<<<< HEAD:apps/se/src/app/application/tramites/130115/pages/importacion-vehiculos-nuevos-page/importacion-vehiculos-nuevos-page.component.ts
   * Referencia al componente WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Variable utilizada para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS;

  /**
   * Variable utilizada para almacenar el índice del paso actual.
========
   * Índice del paso actual.
>>>>>>>> d7f7e885870d6f463bd458ad92a708fd035a9766:apps/agace/src/app/application/tramites/32501/pages/solicitud-page/solicitud-page.component.ts
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
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
