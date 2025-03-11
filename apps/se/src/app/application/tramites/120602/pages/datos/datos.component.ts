import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SolicitanteComponent,TIPO_PERSONA } from '@libs/shared/data-access-user/src';

/**
 * @class DatosComponent
 * @classdesc Este componente gestiona la selección de pestañas mediante un índice.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements AfterViewInit{

  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
  */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;


    /**
     * Se ejecuta después de que la vista ha sido inicializada.
     * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
     * para establecer el tipo de persona como MORAL_NACIONAL.
     */
    ngAfterViewInit() :void{
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
    }

  /**
   * @constructor
   * @description Inicializa una instancia del `DatosComponent`.
   */
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  constructor() { }

 /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   * @type {number}
   */

  indice: number = 1;
  
 /**
   * @method seleccionaTab
   * @description Este método se utiliza para establecer el índice del subtítulo.
   * @param {number} i - El nuevo índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
