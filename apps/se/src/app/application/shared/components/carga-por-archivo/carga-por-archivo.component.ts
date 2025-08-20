import { ActivatedRoute, Router } from '@angular/router';
import { TABLA_DATOS, TEXTOS } from '../../constantes/carga-por-archivo.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-carga-por-archivo',
  standalone: true,
  imports: [CommonModule, TituloComponent],
  templateUrl: './carga-por-archivo.component.html',
  styleUrl: './carga-por-archivo.component.scss',
})
export class CargaPorArchivoComponent {

  /** Contiene los textos y mensajes utilizados en el componente para mostrar información y ayudas al usuario. */
  public TEXTOS = TEXTOS;

  /** Arreglo que contiene la información de las columnas y su posición para mostrar en la tabla de ejemplo de carga por archivo. */
  public tablaDatos: { posicion: number, dato: string }[] = TABLA_DATOS;

  /** Almacena el nombre del archivo seleccionado por el usuario para la carga por archivo. */
  public filaSeleccionadaNombre: string | null = null;

  /**
   * Constructor de la clase CargaPorArchivoComponent.
   * @param {Router} router - Servicio de Angular para la navegación.
   * @param {ActivatedRoute} activatedRoute - Servicio de Angular para obtener información sobre la ruta actual.
   */
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  /**
   * Navega a la ruta de acciones
   */
  cambioPathe(): void {
    this.router.navigate(['../action'], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Maneja el evento de selección de archivo y asigna el nombre del archivo seleccionado a la variable correspondiente.
   * @param event - Evento de cambio del input de archivo.
   */
  onFilaSeleccionada(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    if (INPUT.files && INPUT.files.length > 0) {
      this.filaSeleccionadaNombre = INPUT.files[0].name;
    }
  }
}
