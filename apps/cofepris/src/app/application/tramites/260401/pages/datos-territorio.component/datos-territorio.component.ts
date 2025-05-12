
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';

/**
 * Componente DatosTerritorioComponent
 * 
 * Este componente es responsable de manejar los datos del territorio en la solicitud.
 * Permite la navegación entre los pasos de la solicitud y la actualización del índice del paso actual.
 */
@Component({
  selector: 'app-datos-territorio',
  templateUrl: './datos-territorio.component.html',
})
export class DatosTerritorioComponent implements AfterViewInit {
  
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
}
