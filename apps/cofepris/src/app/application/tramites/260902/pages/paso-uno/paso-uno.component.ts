import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements AfterViewInit {
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
    * Índice actual del subtítulo seleccionado en la interfaz.
    */
   indice: number = 1;
 
   /**
    * Método para actualizar el índice del subtítulo seleccionado.
    * 
    * @param i - Índice de la pestaña seleccionada.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
   }
  /**
   * Indica si se debe mostrar el botón para copiar los datos en la interfaz de usuario.
   * Cuando es `true`, el botón de copiar datos será visible; cuando es `false`, el botón estará oculto.
   */
   mostrarBotonCopiarDatos: boolean = false;
}
