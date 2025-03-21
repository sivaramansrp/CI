import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ProductoOption } from '../../constantes/vehiculos-adaptados.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
@Component({
  selector: 'app-detos-del-tramite',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './detos-del-tramite.component.html',
  styleUrl: './detos-del-tramite.component.scss',
})
export class DetosDelTramiteComponent {
  @Input() inputFields: {
    label: string;
    placeholder: string;
    required: boolean;
  }[] = [];
  @Input() catalogosArray: Catalogo[][] = [];
  @Input() solicitudeOptions: any[] = [];
  @Input() detosData: { defaultSelect: string; solicitud: string; fraccion: string } | null = {
    defaultSelect: 'Inicial',
    solicitud: '',
    fraccion: '',
  };
  @Output() valueChange = new EventEmitter<string | number>();
  @Output() formValueChange = new EventEmitter<{
    solicitud: string;
    fraccion: string;
  }>();

  formDelTramite!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.updateFormValues();

    this.formDelTramite.valueChanges.subscribe((values) => {
      this.formValueChange.emit({
        solicitud: values.solicitud || '',
        fraccion: values.fraccion || '',
      });
    });
  }

  ngOnChanges(): void {
    if (this.formDelTramite) {
      this.updateFormValues();
    }
  }

  initializeForm(): void {
    const defaultSelect = this.detosData?.defaultSelect || 'Inicial';
    this.formDelTramite = this.fb.group({
      solicitud: [defaultSelect],
      fraccion: [
        '',
        this.inputFields.some((field) => field.required) ? [Validators.required] : [],
      ],
    });
  }

  private updateFormValues(): void {
    if (this.detosData) {
      this.formDelTramite.patchValue({
        solicitud: this.detosData.solicitud || this.detosData.defaultSelect || 'Inicial',
        fraccion: this.detosData.fraccion || '',
      });
    }
  }

  onValueChange(value: string | number): void {
    this.valueChange.emit(value);
  }
}