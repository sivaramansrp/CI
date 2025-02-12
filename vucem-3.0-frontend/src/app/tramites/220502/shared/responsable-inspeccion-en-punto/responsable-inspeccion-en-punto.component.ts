import { Catalogo } from '../../../../core/models/shared/catalogos.model';
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
import { RouterModule } from '@angular/router';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { Validators } from '@angular/forms';
import { inject } from '@angular/core';

@Component({
  selector: 'app-responsable-inspeccion-en-punto',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
  templateUrl: './responsable-inspeccion-en-punto.component.html',
  styleUrl: './responsable-inspeccion-en-punto.component.scss',
})
export class ResponsableInspeccionEnPuntoComponent
  implements OnInit, OnDestroy
{
  /** Propiedad de entrada para identificar la clave de control en el formulario principal */
  @Input() claveDeControl: string = '';

  /** Inyectar el ControlContainer principal para administrar los controles de formulario*/
  contenedorPrincipal = inject(ControlContainer);

  /** Getter para acceder al grupo de formularios principal */
  get grupoformulariopadre() {
    return this.contenedorPrincipal.control as FormGroup;
  }

  /** Almacena datos del catálogo para el tipo de contenedor */
  tipoContenedor!: CatalogosSelect;

  /**
   * Gancho de ciclo de vida que inicializa el componente.
   * Agrega un control de formulario dinámico y carga datos iniciales.
   */
  ngOnInit() {
    if (this.claveDeControl) {
      // Agregar un nuevo FormGroup dinámicamente al formulario principal
      this.grupoformulariopadre.addControl(
        this.claveDeControl,
        new FormGroup({
          nombre: new FormControl('', [
            Validators.required,
            Validators.maxLength(150),
          ]),
          primerapellido: new FormControl('', [Validators.maxLength(80)]),
          segyndoapellido: new FormControl('', [Validators.maxLength(80)]),
          mercancia: new FormControl('', [Validators.required]),
          tipocontenedor: new FormControl('', [Validators.maxLength(3)]),
        })
      );
    }
    this.cargarDatosIniciales(); // Cargar datos del catálogo inicial
  }

  /**
   * Maneja la selección de un artículo del catálogo.
   * Actualiza el formulario con la descripción del catálogo seleccionado.
   * @param e - El artículo del catálogo seleccionado
   */
  tipoContenedorSeleccion(e: Catalogo): void {
    if (this.claveDeControl && this.grupoformulariopadre.contains(this.claveDeControl)) {
      this.grupoformulariopadre.controls[this.claveDeControl].patchValue({
        tipocontenedor: e.descripcion,
      });
    }
  }

  /**
   * Carga datos del catálogo inicial para el tipo contenedor.
   */
  cargarDatosIniciales(): void {
    this.tipoContenedor = {
      labelNombre: 'Tipo contenedor',
      required: false,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Tipo contenedor 1',
          tam: 'Tipo contenedor 1',
          dpi: 'Tipo contenedor 1',
        },
        {
          id: 2,
          descripcion: 'Tipo contenedor 2',
          tam: 'Tipo contenedor 2',
          dpi: 'Tipo contenedor 2',
        },
        {
          id: 3,
          descripcion: 'Tipo contenedor 3',
          tam: 'Tipo contenedor 3',
          dpi: 'Tipo contenedor 3',
        },
      ],
    };
  }

  /**
   * Gancho de ciclo de vida que limpia el componente.
   * Elimina el control de formulario del formulario principal.
   */
  ngOnDestroy() {
    if (this.claveDeControl && this.grupoformulariopadre.contains(this.claveDeControl)) {
      this.grupoformulariopadre.removeControl(this.claveDeControl);
    }
  }
}
