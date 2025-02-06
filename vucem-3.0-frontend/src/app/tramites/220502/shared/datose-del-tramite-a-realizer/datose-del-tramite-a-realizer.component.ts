import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
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
  @Input() controlKey: string = '';
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  /**
   * Datos del catálogo de régimen de mercancía.
   */
  certificadosAutorizados!: CatalogosSelect;
  horaDeInspeccion!: CatalogosSelect;
  aduanaDeIngreso!: CatalogosSelect;
  sanidadAgropecuaria!: CatalogosSelect;
  puntoDeInspeccion!: CatalogosSelect;

  /**
   * Fecha final de entrada.
   */
  fechaInicioInput: InputFecha = FECHA_INSPECCION;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    if (this.controlKey) {
      this.parentFormGroup.addControl(
        this.controlKey,
        new FormGroup({
          certificadosAutorizados: new FormControl('', [Validators.required]),
          horaDeInspeccion: new FormControl('', [Validators.required]),
          aduanaDeIngreso: new FormControl('', [Validators.required]),
          sanidadAgropecuaria: new FormControl('', [Validators.required]),
          puntoDeInspeccion: new FormControl('', [Validators.required]),
          fechaDeInspección: new FormControl('', [Validators.required]),
        })
      );
    }
    this.getRegimenMercancia();
  }

  /**
   * Método para seleccionar el régimen de mercancía.
   * @param e Régimen de mercancía seleccionado.
   */
  certificadosSeleccion(e: Catalogo): void {
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.controls[this.controlKey].patchValue({
        certificadosAutorizados: e.descripcion,
      });
    }
  }

  horaDeSeleccion(e: Catalogo): void {
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.controls[this.controlKey].patchValue({
        horaDeInspeccion: e.descripcion,
      });
    }
  }

  aduanaDeSeleccion(e: Catalogo): void {
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.controls[this.controlKey].patchValue({
        aduanaDeIngreso: e.descripcion,
      });
    }
  }

  sanidadSeleccion(e: Catalogo): void {
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.controls[this.controlKey].patchValue({
        sanidadAgropecuaria: e.descripcion,
      });
    }
  }

  puntoDeSeleccion(e: Catalogo): void {
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.controls[this.controlKey].patchValue({
        puntoDeInspeccion: e.descripcion,
      });
    }
  }

  /**
   * Método para obtener el catálogo de régimen de mercancía.
   */
  getRegimenMercancia(): void {
    this.certificadosAutorizados = {
      labelNombre: 'Certificados autorizados penientes',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'abc',
          tam: 'abc',
          dpi: 'abc',
        },
        {
          id: 2,
          descripcion: 'cde',
          tam: 'cde',
          dpi: 'cde',
        },
        {
          id: 3,
          descripcion: 'xyz',
          tam: 'xyz',
          dpi: 'xyz',
        },
      ],
    };
    this.horaDeInspeccion = {
      labelNombre: 'Hora de inspección',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'abc',
          tam: 'abc',
          dpi: 'abc',
        },
        {
          id: 2,
          descripcion: 'cde',
          tam: 'cde',
          dpi: 'cde',
        },
        {
          id: 3,
          descripcion: 'xyz',
          tam: 'xyz',
          dpi: 'xyz',
        },
      ],
    };
    this.aduanaDeIngreso = {
      labelNombre: 'Aduana de ingreso',
      required: false,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'abc',
          tam: 'abc',
          dpi: 'abc',
        },
        {
          id: 2,
          descripcion: 'cde',
          tam: 'cde',
          dpi: 'cde',
        },
        {
          id: 3,
          descripcion: 'xyz',
          tam: 'xyz',
          dpi: 'xyz',
        },
      ],
    };
    this.sanidadAgropecuaria = {
      labelNombre: 'Oficina de inspección de Sanidad Agropecuaria',
      required: false,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'abc',
          tam: 'abc',
          dpi: 'abc',
        },
        {
          id: 2,
          descripcion: 'cde',
          tam: 'cde',
          dpi: 'cde',
        },
        {
          id: 3,
          descripcion: 'xyz',
          tam: 'xyz',
          dpi: 'xyz',
        },
      ],
    };
    this.puntoDeInspeccion = {
      labelNombre: 'Punto de inspección',
      required: false,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'abc',
          tam: 'abc',
          dpi: 'abc',
        },
        {
          id: 2,
          descripcion: 'cde',
          tam: 'cde',
          dpi: 'cde',
        },
        {
          id: 3,
          descripcion: 'xyz',
          tam: 'xyz',
          dpi: 'xyz',
        },
      ],
    };
  }

  /**
   * Formulario principal de la solicitud.
   */
  FormSolicitud!: FormGroup;

  /**
   * Obtiene el grupo de formulario 'datosServicio' del formulario principal 'FormSolicitud'.
   *
   * @returns {FormGroup} El grupo de formulario 'datosServicio'.
   */
  get datosServicio(): FormGroup {
    return this.parentFormGroup.get('datosServicio') as FormGroup;
  }

  /**
   * Método para cambiar la fecha final.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  cambioFechaInicio(nuevo_valor: string): void {
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.controls[this.controlKey].patchValue({
        fechaDeInspección: nuevo_valor,
      });
    }
  }

  ngOnDestroy() {
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.removeControl(this.controlKey);
    }
  }
}
