import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { TipoDeAvisoComponent } from '../../components/tipo-de-aviso/tipo-de-aviso.component';

/**
 * Componente para gestionar el paso uno del trámite.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styles: ``
})
export class DatosComponent implements AfterViewInit {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Referencia al componente TipoDeAvisoComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(TipoDeAvisoComponent) tipoDeAvisoComponent!: TipoDeAvisoComponent;

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  indice: number = 1;

  /**
   * Este método se utiliza para establecer el índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Constructor del componente DatosComponent.
   */
  constructor() {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
    });
  }
}