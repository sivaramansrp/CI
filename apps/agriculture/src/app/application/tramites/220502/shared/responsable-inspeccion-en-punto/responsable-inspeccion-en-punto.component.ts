import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
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
import { SolicitudPantallasService } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { inject } from '@angular/core';
/**
 * Componente que representa al responsable de la inspección en un punto.
 * Este componente agrega y administra dinámicamente controles de formulario para los detalles de responsabilidad de inspección.
 */
@Component({
  selector: 'app-responsable-inspeccion-en-punto',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (): ControlContainer =>
        inject<ControlContainer>(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './responsable-inspeccion-en-punto.component.html',
  styleUrls: ['./responsable-inspeccion-en-punto.component.scss'],
})
export class ResponsableInspeccionEnPuntoComponent
  implements OnInit, OnDestroy
{
  /**Entrada de propiedad para identificar la clave de control en el formulario principal */
  @Input() claveDeControl: string = '';
  /** Inyecte el ControlContainer principal para administrar los controles de formulario*/
  contenedorPrincipal = inject(ControlContainer);
  /**
   * Getter para acceder al grupo de formulario principal.
   * Devuelve el grupo de formulario principal al que se agregan controles dinámicos.
   */
  get grupoFormularioPadre(): FormGroup {
    return this.contenedorPrincipal.control as FormGroup;
  }
  /** Almacena datos del catálogo para el tipo de contenedor. */
  tipoContenedor!: CatalogosSelect;

  constructor(
    private solicitudService: SolicitudPantallasService /**Servicio para obtener datos de solicitud */
  ) {
    /** Inyectar el ControlContainer principal para administrar los controles de formulario */
  }
  /**
   * Ciclo de vida que inicializa el componente.
   * Agrega un control de formulario dinámico y carga datos iniciales.
   */
  ngOnInit(): void {
    if (this.claveDeControl) {
      // Agregue un nuevo FormGroup dinámico al formulario principal
      this.grupoFormularioPadre.addControl(
        this.claveDeControl,
        new FormGroup({
          nombre: new FormControl('', [
            Validators.required,
            Validators.maxLength(150),
          ]),
          primerapellido: new FormControl('', [Validators.maxLength(80)]),
          segundoapellido: new FormControl('', [Validators.maxLength(80)]),
          mercancia: new FormControl('', [Validators.required]),
          tipocontenedor: new FormControl('', []),
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
    if (
      this.claveDeControl &&
      this.grupoFormularioPadre.contains(this.claveDeControl)
    ) {
      this.grupoFormularioPadre.controls[this.claveDeControl].patchValue({
        tipocontenedor: e.descripcion,
      });
    }
  }
  /**
   * Carga datos del catálogo inicial para el tipo de contenedor.
   */
  cargarDatosIniciales(): void {
    this.solicitudService.getDataResponsableInspeccion().subscribe({
      next: (data: { tipoContenedor: CatalogosSelect }) => {
        this.tipoContenedor = data.tipoContenedor;
      },
    })
  }
  /**
   * Gancho de ciclo de vida que limpia el componente.
   * Elimina el control de formulario del formulario principal.
   */
  ngOnDestroy(): void {
    if (
      this.claveDeControl &&
      this.grupoFormularioPadre.contains(this.claveDeControl)
    ) {
      this.grupoFormularioPadre.removeControl(this.claveDeControl);
    }
  }
}
