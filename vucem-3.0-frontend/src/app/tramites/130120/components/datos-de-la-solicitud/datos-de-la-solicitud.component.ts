import { Component, OnInit } from '@angular/core';
import { DATOS_MERCANCIA, DATOS_REALIZAR } from '../../../../shared/constantes/130120/permiso-importacion-modification.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '../../../../core/models/shared/forms-model';
import { InputConfig } from '../../../../core/models/130120/permiso-importacion-modification.model';
import { InputTypes } from '../../../../core/models/130120/permiso-importacion-modification.enum';
import { SelectCatalogosComponent } from "../../../../shared/components/select-catalogos/select-catalogos.component";
import { TituloComponent } from "../../../../shared/components/titulo/titulo.component";

@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, SelectCatalogosComponent],
})
export class DatosDeLaSolicitudComponent implements OnInit {
  
  config: InputConfig[] = [
      {
        title: 'Datos del tramite a realizer',
        formGroupName: 'datosRealizer',
        menu: [
          {
            inputType: InputTypes.SELECT,
            props: DATOS_REALIZAR[0],
            class: 'col-md-8',
          },
          {
            inputType: InputTypes.SELECT,
            props: DATOS_REALIZAR[1],
            class: 'col-md-8',
          }
        ],
      },
      {
        title: 'Datos de la mercancia',
        formGroupName: 'datosMercanica',
        menu: [
          {
            inputType: InputTypes.TEXT,
            props: DATOS_MERCANCIA[0],
            class: 'col-md-8',
          },
          {
            inputType: InputTypes.TEXT,
            props: DATOS_MERCANCIA[1],
            class: 'col-md-8',
          },
          {
            inputType: InputTypes.SELECT,
            props: DATOS_MERCANCIA[2],
            class: 'col-md-8',
          },
          {
            inputType: InputTypes.SELECT,
            props: DATOS_MERCANCIA[3],
            class: 'col-md-8',
          },
          {
            inputType: InputTypes.SELECT,
            props: DATOS_MERCANCIA[4],
            class: 'col-md-8',
          },
          {
            inputType: InputTypes.BREAK_CONTENT,
            props: [],
            class: '',
          },
          {
            inputType: InputTypes.SELECT,
            props: DATOS_MERCANCIA[5],
            class: 'col-md-4',
          },
          {
            inputType: InputTypes.TEXT,
            props: DATOS_MERCANCIA[1],
            class: 'col-md-4',
          },
        ],
      }
    ];
  fiscal: FormularioDinamico[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
   }

  ngOnInit() {
    this.config.forEach((eachConfig: InputConfig) => {
      this.inicializarFormGroup(eachConfig.menu, eachConfig.formGroupName);
    });
  }
  
  crearFormulario(): void {
    this.form = this.fb.group({
      datosRealizer: this.fb.group({}),
      datosMercanica: this.fb.group({}),
    });
  }
    
  inicializarFormGroup(
    config: any[],
    grupoNombre: string
  ): void {
    const grupo = this.form.get(grupoNombre) as FormGroup;
    config.forEach((campo) => {
      if (campo.inputType === InputTypes.TEXT) {

        const validators = campo.validators ? this.getValidators(campo.validators) : [];
        grupo.addControl(
          campo.props.campo ? campo.props.campo : campo.props.labelNombre,
          this.fb.control({ value: '', disabled: campo.disabled }, validators)
        );
      }
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
