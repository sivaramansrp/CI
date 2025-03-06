import { Component, OnInit } from '@angular/core';
import { DATOS_GENERALES_SOLICITANTE, DOMICILIO_FISCAL_SOLICITANTE } from '../../constants/permiso-importacion-modification.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { TituloComponent } from "@ng-mf/data-access-user";

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
  
  ngOnInit(): void {
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
    const GRUPO = this.form.get(grupoNombre) as FormGroup;
    config.forEach((campo) => {
      const VALIDATORS = SolicitanteComponent.getValidators(campo.validators);
      GRUPO.addControl(
        campo.campo,
        this.fb.control({ value: '', disabled: campo.disabled }, VALIDATORS)
      );
    });

  }

  static getValidators(validators: string[]): ValidatorFn[] {
    const FORM_VALIDATORS: ValidatorFn[] = [];
    validators.forEach((validator) => {
      if (validator === 'required') {
        FORM_VALIDATORS.push(Validators.required);
      } else if (validator.includes('maxLength')) {
        const MAX = validator.split(':')[1];
        FORM_VALIDATORS.push(Validators.maxLength(Number(MAX)));
      } else if (validator.includes('pattern')) {
        const PATTERN = validator.split(':')[1];
        FORM_VALIDATORS.push(Validators.pattern(PATTERN));
      }
    });
    return FORM_VALIDATORS;
  }

}