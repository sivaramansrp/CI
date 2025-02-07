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
   * Input key used to identify the control inside the parent form group.
   */
  @Input() controlKey: string = '';

  /**
   * Injects the parent form control container.
   */
  parentContainer = inject(ControlContainer);

  /**
   * Getter to access the parent form group.
   */
  get parentFormGroup(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  /**
   * Form select options for different catalog data.
   */
  certificadosAutorizados!: CatalogosSelect;
  horaDeInspeccion!: CatalogosSelect;
  aduanaDeIngreso!: CatalogosSelect;
  sanidadAgropecuaria!: CatalogosSelect;
  puntoDeInspeccion!: CatalogosSelect;

  /**
   * Date input field initialized with FECHA_INSPECCION constant.
   */
  fechaInicioInput: InputFecha = FECHA_INSPECCION;

  /**
   * Lifecycle hook that initializes form controls when the component is loaded.
   */
  ngOnInit(): void {
    if (this.controlKey) {
      this.parentFormGroup.addControl(
        this.controlKey,
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
   * Handles the selection of 'Certificados Autorizados' and updates the form control.
   * @param e The selected catalog item.
   */
  certificadosSeleccion(e: Catalogo): void {
    this.updateFormValue('certificadosAutorizados', e.descripcion);
  }

  /**
   * Handles the selection of 'Hora de Inspección' and updates the form control.
   * @param e The selected catalog item.
   */
  horaDeSeleccion(e: Catalogo): void {
    this.updateFormValue('horaDeInspeccion', e.descripcion);
  }

  /**
   * Handles the selection of 'Aduana de Ingreso' and updates the form control.
   * @param e The selected catalog item.
   */
  aduanaDeSeleccion(e: Catalogo): void {
    this.updateFormValue('aduanaDeIngreso', e.descripcion);
  }

  /**
   * Handles the selection of 'Sanidad Agropecuaria' and updates the form control.
   * @param e The selected catalog item.
   */
  sanidadSeleccion(e: Catalogo): void {
    this.updateFormValue('sanidadAgropecuaria', e.descripcion);
  }

  /**
   * Handles the selection of 'Punto de Inspección' and updates the form control.
   * @param e The selected catalog item.
   */
  puntoDeSeleccion(e: Catalogo): void {
    this.updateFormValue('puntoDeInspeccion', e.descripcion);
  }

  /**
   * Updates a specific form control with a new value.
   * @param controlName The name of the control to update.
   * @param value The new value to set.
   */
  private updateFormValue(controlName: string, value: string): void {
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.controls[this.controlKey].patchValue({
        [controlName]: value,
      });
    }
  }

  /**
   * Loads initial catalog data for the form selects.
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
   * Getter to access the 'datosServicio' form group.
   */
  get datosServicio(): FormGroup {
    return this.parentFormGroup.get('datosServicio') as FormGroup;
  }

  /**
   * Handles changes to the start date field.
   * @param nuevo_valor The new date value selected.
   */
  cambioFechaInicio(nuevo_valor: string): void {
    this.updateFormValue('fechaDeInspeccion', nuevo_valor);
  }

  /**
   * Lifecycle hook to clean up form controls when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.controlKey && this.parentFormGroup.contains(this.controlKey)) {
      this.parentFormGroup.removeControl(this.controlKey);
    }
  }
}
