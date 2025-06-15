import { Component, ViewChild } from '@angular/core';

import { DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { PASSOS_TERRITORIO } from '../../constantes/territorio-nacional-solicitude.enum';

/**
 * Interfaz que representa la estructura de un botón con acción.
 * @interface AccionBoton
 */
interface AccionBoton {
  /**
   * Acción que realiza el botón, por ejemplo 'sumar' o 'restar'.
   */
  accion: string;
   /**
   * Valor numérico asociado al botón.
   */
  valor: number;
}
/**
 * Componente que representa la solicitud para el territorio nacional.
 *
 * @export
 * @class TerritorioNacionalSolicitudeComponent
 */
@Component({
  selector: 'app-territorio-nacional-solicitude',
  templateUrl: './territorio-nacional-solicitude.component.html',

})
export class TerritorioNacionalSolicitudeComponent {
  /**
 * Referencia al componente `WizardComponent` hijo, accesible desde la plantilla.
 *
 * Esta propiedad permite interactuar directamente con la instancia del wizard para:
 * - Navegar entre pasos.
 * - Obtener el estado del asistente.
 * - Ejecutar métodos del componente hijo desde el componente padre.
 *
 * La propiedad es inicializada automáticamente por Angular después del ciclo de detección de vistas (`ngAfterViewInit`).
 *
 * @viewChild WizardComponent
 */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * 
   * Lista de pasos del asistente (wizard) para la modificación PROSEC.
   * Se obtiene a partir de la enumeración `PROSEC_MODIFICACION`.
   * 
   * @type {ListaPasosWizard[]}
   */
  territorioPasos: ListaPasosWizard[] = PASSOS_TERRITORIO;

  /**
   * Índice del paso actual dentro del asistente.
   * 
   * @type {number}
   * @default 1
   */
  indice: number = 1;
  /**
   * Datos de los pasos del asistente.
   * 
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.territorioPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  
  /**
   * Método getValorIndice
   * 
   * Actualiza el índice del paso actual y navega al siguiente o anterior paso del asistente.
   * 
   * @param {AccionBoton} e - Objeto que contiene la acción ('cont' para continuar, otro valor para retroceder) y el valor del índice.
   */
  getValorIndice(e: AccionBoton) :void{
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
