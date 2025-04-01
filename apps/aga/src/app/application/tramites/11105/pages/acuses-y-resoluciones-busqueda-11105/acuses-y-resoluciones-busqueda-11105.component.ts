import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AcusesYResoluionesFolioDelTramiteBusquedaComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * Componente para gestionar la búsqueda de acuses y resoluciones del trámite 11105.
 */
@Component({
  selector: 'acuses-y-resoluciones-busqueda-11105',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AcusesYResoluionesFolioDelTramiteBusquedaComponent,
  ],
  templateUrl: './acuses-y-resoluciones-busqueda-11105.component.html',
  styleUrl: './acuses-y-resoluciones-busqueda-11105.component.scss',
})
export class AcusesYResolucionesBusqueda11105Component {
  /**
   * Constructor de la clase.
   * @param formBuilder Servicio para construir formularios reactivos.
   */
  public constructor(protected readonly formBuilder: FormBuilder) {
    // El constructor se utiliza para la inyección de dependencias.
  }
}