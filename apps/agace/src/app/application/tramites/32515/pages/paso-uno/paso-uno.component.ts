import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';  
import { SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements AfterViewInit {

  /**
   * @property solicitante - Referencia al componente `SolicitanteComponent` que se utiliza para manejar
   *                          la lógica y los datos relacionados con el solicitante en este paso del trámite.
   * @command Este decorador `@ViewChild` permite acceder al componente hijo para interactuar con sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * @property indice - Representa el índice actual utilizado en el componente.
   * @type {number}
   * @default 1
   * @remarks Este valor se utiliza para rastrear el estado o posición en el flujo del componente.
   * @command Este índice puede ser modificado dinámicamente según las necesidades del flujo.
   */
  indice: number = 1;

  constructor(private cdr: ChangeDetectorRef) {
    // Constructor no realiza ninguna acción en este caso
  }


  /**
   * @method ngAfterViewInit
   * @description Este método se ejecuta después de que la vista del componente ha sido inicializada.
   * Se utiliza para realizar operaciones que dependen de que la vista esté completamente cargada.
   * 
   * @command Este método llama a `obtenerTipoPersona` con el tipo de persona `MORAL_NACIONAL` 
   * y luego fuerza la detección de cambios en el componente.
   */
  ngAfterViewInit(): void {
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
    this.cdr.detectChanges();
  }

  /**
   * Este método permite que el usuario seleccione una pestaña cambiando el valor de `indice`.
   * 
   * @param indice El índice de la pestaña seleccionada.
   * 
   * @example
   * Cambiar la pestaña seleccionada:
   * this.seleccionaTab(2); // Selecciona la segunda pestaña.
   */
  seleccionaTab(indice: number): void {
    // Establece el índice de la pestaña seleccionada
    this.indice = indice;
  }

}
