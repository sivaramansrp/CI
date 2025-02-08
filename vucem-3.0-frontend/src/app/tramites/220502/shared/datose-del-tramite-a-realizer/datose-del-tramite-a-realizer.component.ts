/* eslint-disable sort-imports */
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { InputFechaComponent } from '../../../../shared/components/input-fecha/input-fecha.component';
import {
  CatalogosSelect,
  InputFecha,
} from '../../../../core/models/shared/components.model';
import { FECHA_INSPECCION } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';

@Component({
  selector: 'app-datose-del-tramite-a-realizer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TituloComponent,
    SelectCatalogosComponent,
    InputFechaComponent,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () =>
        inject<ControlContainer>(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './datose-del-tramite-a-realizer.component.html',
  styleUrl: './datose-del-tramite-a-realizer.component.scss',
})
export class DatoseDelTramiteARealizerComponent implements OnInit, OnDestroy {
  /**
   * Clave de entrada utilizada para identificar el control dentro del grupo de formulario principal.
   */
  @Input() claveDeControl: string = '';

  /**
   * Inyecta el contenedor de control del formulario principal.
   */
  parentContainer = inject(ControlContainer);

  /**
   * Getter para acceder al grupo de formularios principal.
   */
  get grupoformulariopadre(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  /**
   * Opciones de selección de formulario para diferentes datos del catálogo.
   */
  certificadosAutorizados!: CatalogosSelect;
  horaDeInspeccion!: CatalogosSelect;
  aduanaDeIngreso!: CatalogosSelect;
  sanidadAgropecuaria!: CatalogosSelect;
  puntoDeInspeccion!: CatalogosSelect;

  /**
   * Campo de entrada de fecha inicializado con la constante FECHA_INSPECCION.
   */
  fechaInicioInput: InputFecha = FECHA_INSPECCION;

  /**
   * Gancho de ciclo de vida que inicializa los controles de formulario cuando se carga el componente.
   */
  ngOnInit(): void {
    if (this.claveDeControl) {
      this.grupoformulariopadre.addControl(
        this.claveDeControl,
        new FormGroup({
          certificadosAutorizados: new FormControl('', [Validators.required]),
          horaDeInspeccion: new FormControl('', [Validators.required]),
          aduanaDeIngreso: new FormControl('', [Validators.required]),
          sanidadAgropecuaria: new FormControl('', [Validators.required]),
          puntoDeInspeccion: new FormControl('', [Validators.required]),
          fechaDeInspeccion: new FormControl('', [Validators.required]),
        })
      );
    }
    this.cargarDatosIniciales();
  }

  /**
   * Maneja la selección de 'Certificados Autorizados' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  certificadosSeleccion(e: Catalogo): void {
    this.actualizarFormValue('certificadosAutorizados', e.descripcion);
  }

  /**
   * Maneja la selección de 'Hora de Inspección' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  horaDeSeleccion(e: Catalogo): void {
    this.actualizarFormValue('horaDeInspeccion', e.descripcion);
  }

  /**
   * Maneja la selección de 'Aduana de Ingreso' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  aduanaDeSeleccion(e: Catalogo): void {
    this.actualizarFormValue('aduanaDeIngreso', e.descripcion);
  }

  /**
   * Maneja la selección de 'Sanidad Agropecuaria' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  sanidadSeleccion(e: Catalogo): void {
    this.actualizarFormValue('sanidadAgropecuaria', e.descripcion);
  }

  /**
   * Maneja la selección de 'Punto de Inspección' y actualiza el control del formulario.
   * @param e El artículo del catálogo seleccionado.
   */
  puntoDeSeleccion(e: Catalogo): void {
    this.actualizarFormValue('puntoDeInspeccion', e.descripcion);
  }

  /**
   * Actualiza un control de formulario específico con un nuevo valor.
   * @param nombreDeControl El nombre del control a actualizar.
   * @param value El nuevo valor a establecer.
   */
  private actualizarFormValue(nombreDeControl: string, value: string): void {
    if (this.claveDeControl && this.grupoformulariopadre.contains(this.claveDeControl)) {
      this.grupoformulariopadre.controls[this.claveDeControl].patchValue({
        [nombreDeControl]: value,
      });
    }
  }

  /**
   * Carga datos del catálogo inicial para las selecciones de formulario.
   */
  cargarDatosIniciales(): void {
    const catalogoTemplate = (label: string, required: boolean) => ({
      labelNombre: label,
      required,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        { id: 1, descripcion: 'abc', tam: 'abc', dpi: 'abc' },
        { id: 2, descripcion: 'cde', tam: 'cde', dpi: 'cde' },
        { id: 3, descripcion: 'xyz', tam: 'xyz', dpi: 'xyz' },
      ],
    });

    this.certificadosAutorizados = catalogoTemplate('Certificados autorizados pendientes', true);
    this.horaDeInspeccion = catalogoTemplate('Hora de inspección', true);
    this.aduanaDeIngreso = catalogoTemplate('Aduana de ingreso', false);
    this.sanidadAgropecuaria = catalogoTemplate('Oficina de inspección de Sanidad Agropecuaria', false);
    this.puntoDeInspeccion = catalogoTemplate('Punto de inspección', false);
  }

  /**
   * Getter para acceder al grupo de formularios 'datosServicio'.
   */
  get datosServicio(): FormGroup {
    return this.grupoformulariopadre.get('datosServicio') as FormGroup;
  }

  /**
   * Maneja los cambios en el campo de fecha de inicio.
   * @param nuevo_valor El nuevo valor de fecha seleccionado.
   */
  cambioFechaInicio(nuevo_valor: string): void {
    this.actualizarFormValue('fechaDeInspeccion', nuevo_valor);
  }

  /**
   * Gancho de ciclo de vida para limpiar los controles de formulario cuando se destruye el componente.
   */
  ngOnDestroy(): void {
    if (this.claveDeControl && this.grupoformulariopadre.contains(this.claveDeControl)) {
      this.grupoformulariopadre.removeControl(this.claveDeControl);
    }
  }
}
