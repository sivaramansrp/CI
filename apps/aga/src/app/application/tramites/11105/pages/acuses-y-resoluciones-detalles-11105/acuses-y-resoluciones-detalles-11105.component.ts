import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AcusesYResoluionesFolioDelTramiteDetallesComponent } from '@libs/shared/data-access-user/src/tramites/components/acuses-y-resoluiones-folio-del-tramite-detalles/acuses-y-resoluiones-folio-del-tramite-detalles.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * Componente para gestionar los detalles de acuses y resoluciones del trámite 11105.
 */
@Component({
  selector: 'acuses-y-resoluciones-detalles-11105',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AcusesYResoluionesFolioDelTramiteDetallesComponent,
  ],
  templateUrl: './acuses-y-resoluciones-detalles-11105.component.html',
  styleUrl: './acuses-y-resoluciones-detalles-11105.component.scss',
})
export class AcusesYResolucionesDetalles11105Component {
  /**
   * Constructor de la clase.
   * @param formBuilder Servicio para construir formularios reactivos.
   */
  public constructor(public formBuilder: FormBuilder) {
    // El constructor se utiliza para la inyección de dependencias.
  }
}