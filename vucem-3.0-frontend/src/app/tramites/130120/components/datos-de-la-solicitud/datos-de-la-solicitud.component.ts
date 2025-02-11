import { Component, OnInit } from '@angular/core';
import { DATOS_EXPORTACION, DATOS_EXPORTADOR, DATOS_MERCANCIA, DATOS_PRODUCTOR, DATOS_REALIZAR } from '../../../../shared/constantes/130120/permiso-importacion-modification.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '../../../../core/models/shared/forms-model';
import { InputConfig } from '../../../../core/models/130120/permiso-importacion-modification.model';
import { InputFechaComponent } from "../../../../shared/components/input-fecha/input-fecha.component";
import { InputRadioComponent } from "../../../../shared/components/input-radio/input-radio.component";
import { InputTypes } from '../../../../core/models/130120/permiso-importacion-modification.enum';
import { SelectCatalogosComponent } from "../../../../shared/components/select-catalogos/select-catalogos.component";
import { TituloComponent } from "../../../../shared/components/titulo/titulo.component";
import tipoDePersonaExportadorOptions from '../../../../../assets/json/130120/tipo-de-persona-exportador.json'
import tipoDePersonaProductorOptions from '../../../../../assets/json/130120/tipo-de-persona-productor.json'

@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, SelectCatalogosComponent, InputFechaComponent, InputRadioComponent],
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
          props: DATOS_MERCANCIA[6],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [],
          class: '',
        },
        {
          inputType: InputTypes.DATE,
          props: DATOS_MERCANCIA[7],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[8],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [],
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[9],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[10],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [],
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[11],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[12],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [],
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[13],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[14],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [],
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[15],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[16],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [],
          class: '',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[17],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA[18],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [],
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[19],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA[20],
          class: 'col-md-8',
        },
      ],
    },
    {
      title: 'Documento de salida del pais de exportacion',
      formGroupName: 'datosExporta',
      menu: [
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[0],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.DATE,
          props: DATOS_EXPORTACION[1],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [],
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[2],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [],
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[3],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[4],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [],
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[5],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTACION[6],
          class: 'col-md-4',
        },
      ],
    },
    {
      title: 'Datos del productor',
      formGroupName: 'datosProductor',
      menu: [
        {
          inputType: InputTypes.RADIO,
          props: DATOS_PRODUCTOR[0],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [],
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[1],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[2],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[3],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[4],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_PRODUCTOR[5],
          class: 'col-md-8',
        },
      ],
    },
    {
      title: 'Datos del exportador',
      formGroupName: 'datosExportador',
      menu: [
        {
          inputType: InputTypes.RADIO,
          props: DATOS_EXPORTADOR[0],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.BREAK_CONTENT,
          props: [],
          class: '',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[1],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[2],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[3],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[4],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[5],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EXPORTADOR[6],
          class: 'col-md-8',
        },
      ],
    },
  ];
  radioSelectedValues: any = {};
  fiscal: FormularioDinamico[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit() {
    this.config[3].menu[0].props.options = tipoDePersonaProductorOptions;
    this.config[3].menu[0].props.selectedValue = tipoDePersonaProductorOptions[0].value;
    this.radioSelectedValues.radio3 = tipoDePersonaProductorOptions[0].value;
    this.config[4].menu[0].props.options = tipoDePersonaExportadorOptions;
    this.config[4].menu[0].props.selectedValue = tipoDePersonaExportadorOptions[0].value;
    this.radioSelectedValues.radio4 = tipoDePersonaExportadorOptions[0].value;
    console.log(this.config[3].menu[0]);
    this.config.forEach((eachConfig: InputConfig) => {
      this.inicializarFormGroup(eachConfig.menu, eachConfig.formGroupName);
    });
  }
  
  crearFormulario(): void {
    this.form = this.fb.group({
      datosRealizer: this.fb.group({}),
      datosMercanica: this.fb.group({}),
      datosExporta: this.fb.group({}),
      datosProductor: this.fb.group({}),
      datosExportador: this.fb.group({}),
    });
  }
    
  inicializarFormGroup(
    config: any[],
    grupoNombre: string
  ): void {
    const grupo = this.form.get(grupoNombre) as FormGroup;
    config.forEach((campo) => {
      const validators = campo.validators ? this.getValidators(campo.validators) : [Validators.required];
      grupo.addControl(
        campo.props.campo ? campo.props.campo : campo.props.labelNombre,
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

  fechaCambiado(event: string): void {
    // 
  }

  onValueChange(radioKey: string, event: string | number): void {
    this.config[3].menu[0].props.selectedValue = event;
    this.radioSelectedValues[radioKey] = event;
  }
}
