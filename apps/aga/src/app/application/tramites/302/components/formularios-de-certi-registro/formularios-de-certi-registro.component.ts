import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Catalogo, CatalogosSelect, FormularioDinamico, InputCheckComponent, SelectCatalogosComponent, TituloComponent } from '@libs/shared/data-access-user/src';
@Component({
  selector: 'formularios-de-certi-registro',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    InputCheckComponent,
    SelectCatalogosComponent,
    TituloComponent
  ],
  templateUrl: './formularios-de-certi-registro.component.html',
  styleUrl: './formularios-de-certi-registro.component.css',
})
export class FormulariosDeCertiRegistroComponent {

  @Input() formGroup!: FormGroup;

  @Input() formData!: FormularioDinamico[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() dropdownData!: any;

  @Input() formTitle!: string;
  
  constructor(
    private fb: FormBuilder
  // eslint-disable-next-line no-empty-function
  ) { }

  // eslint-disable-next-line class-methods-use-this
    docSeleccionado(event: Catalogo, form: FormGroup, formControl: string) {
      form?.get(formControl)?.setValue(event?.descripcion);
    }
}
