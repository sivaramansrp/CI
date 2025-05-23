import { AfterViewInit ,Component, ViewChild } from '@angular/core';
import { SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html'
})
/**
 * Componente que gestiona la información del solicitante en el trámite 221603.
 * Permite seleccionar el tipo de persona y cambiar entre diferentes pestañas de datos.
 */
export class DatosComponent implements AfterViewInit {

  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   * Se utiliza para interactuar con el componente hijo y establecer el tipo de persona.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Índice actual del subtítulo seleccionado en la interfaz.
   * Representa la pestaña activa en la vista.
   */
  indice: number = 1;

  /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
  ngAfterViewInit(): void {
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Método para actualizar el índice del subtítulo seleccionado.
   * Cambia la pestaña activa en la interfaz de usuario.
   * 
   * i Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}