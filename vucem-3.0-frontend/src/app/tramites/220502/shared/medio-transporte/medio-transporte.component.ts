import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { Validators } from '@angular/forms';
import { datosDeMercancias } from '../../../../core/models/220502/solicitud-pantallas.model';
import { inject } from '@angular/core';

/**
 * Componente para gestionar los datos del medio de transporte.
 */
@Component({
  selector: 'app-medio-transporte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    SelectCatalogosComponent,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () =>
        inject<ControlContainer>(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './medio-transporte.component.html',
  styleUrl: './medio-transporte.component.scss',
})
/**
 * Componente para gestionar los datos del medio de transporte
 */
export class MedioTransporteComponent implements OnInit, OnDestroy {
  /** Propiedad de entrada para identificar la clave de control en el formulario principal */
  @Input() claveDeControl: string = '';

  /** Propiedad de entrada para contener datos relacionados con mercancia. */
  @Input() hMercanciaTabla: string[] = [];

  /** Propiedad de entrada para contener datos relacionados con mercancia. */
  @Input() dMercanciaBody: datosDeMercancias[];

  /** Propiedad de entrada para gestionar la selección del método de transporte. */
  @Input() mediodetransporte!: CatalogosSelect;

  /** Inyectar el ControlContainer principal para administrar los controles de formulario */
  parentContainer = inject(ControlContainer);

  /** Getter para acceder al grupo de formularios principal */
  get grupoformulariopadre() {
    return this.parentContainer.control as FormGroup;
  }

  /**
   * Gancho de ciclo de vida que inicializa el componente.
   * Agrega un control de formulario dinámico al formulario principal
   */
  ngOnInit() {
    if (this.claveDeControl) {
      // Agregar un nuevo FormGroup dinámicamente al formulario principal
      this.grupoformulariopadre.addControl(
        this.claveDeControl,
        new FormGroup({
          transporteIdMedio: new FormControl('', [Validators.required]),
          identificacionTransporte: new FormControl('', [
            Validators.maxLength(30),
          ]),
          esSolicitudFerros: new FormControl('', [Validators.required]),
          totalDeGuiasAmparadas: new FormControl('', [Validators.maxLength(50)]),
        })
      );
    }
  }

  /**
   * Maneja la selección de un método de transporte.
   * Actualiza el formulario con la descripción del transporte seleccionado.
   * @param e - El artículo del catálogo seleccionado que representa el método de transporte.
   */
  selecctionMediodetransporte(e) {
    if (
      this.claveDeControl &&
      this.grupoformulariopadre.contains(this.claveDeControl)
    ) {
      this.grupoformulariopadre.controls[this.claveDeControl].patchValue({
        transporteIdMedio: e.descripcion,
      });
    }
  }

  /**
   * Gancho de ciclo de vida que limpia el componente.
   * Elimina el control de formulario dinámico del formulario principal.
   */
  ngOnDestroy() {
    if (
      this.claveDeControl &&
      this.grupoformulariopadre.contains(this.claveDeControl)
    ) {
      this.grupoformulariopadre.removeControl(this.claveDeControl);
    }
  }
}
