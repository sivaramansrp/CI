import { Component, OnInit } from '@angular/core';
import { DATOS_GENERALES_SOLICITANTE, DOMICILIO_FISCAL_SOLICITANTE } from '../../constants/permiso-importacion-modification.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from 'libs/shared/data-access-user/src/core/models/shared/forms-model';
import { TituloComponent } from "libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss',
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  standalone: true,
})
export class SolicitanteComponent implements OnInit {
  persona: FormularioDinamico[] = []
  fiscal: FormularioDinamico[] = []
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) {
    this.persona = DATOS_GENERALES_SOLICITANTE;
    this.fiscal = DOMICILIO_FISCAL_SOLICITANTE;
    this.crearFormulario();

  }
  
  ngOnInit() {
    this.inicializarFormGroup(this.persona, 'datosGenerales');
    this.inicializarFormGroup(this.fiscal, 'domicilioFiscal');
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      datosGenerales: this.fb.group({}),
      domicilioFiscal: this.fb.group({}),
    });
  }
  
  inicializarFormGroup(
    config: FormularioDinamico[],
    grupoNombre: string
  ): void {
    const grupo = this.form.get(grupoNombre) as FormGroup;
    config.forEach((campo) => {
      const validators = this.getValidators(campo.validators);
      grupo.addControl(
        campo.campo,
        this.fb.control({ value: '', disabled: campo.disabled }, validators)
      );
    });

  }

  getValidators(validators: string[]): ValidatorFn[] {
    const formValidators: ValidatorFn[] = [];
    validators.forEach((validator) => {
      if (validator === 'required') {
        formValidators.push(Validators.required);
      } else if (validator.includes('maxLength')) {
        const max = validator.split(':')[1];
        formValidators.push(Validators.maxLength(Number(max)));
      } else if (validator.includes('pattern')) {
        const pattern = validator.split(':')[1];
        formValidators.push(Validators.pattern(pattern));
      }
    });
    return formValidators;
  }

}