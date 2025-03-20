import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements AfterViewInit {

  
  // Índice para manejar la pestaña seleccionada
  indice: number = 1;

    // Decorador ViewChild para acceder a la instancia del componente SolicitanteComponent
    @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

    ngAfterViewInit(): void {
        
      // Llama al método para obtener el tipo de persona (en este caso, una persona moral nacional)
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);

    }

    /**
   * Este método permite que el usuario seleccione una pestaña cambiando el valor de `indice`.
   * 
   * @param indice El índice de la pestaña seleccionada.
   */
  seleccionaTab(indice: number): void {
    // Establece el índice de la pestaña seleccionada
    this.indice = indice;
  }
}
