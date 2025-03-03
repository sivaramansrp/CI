import { Component, OnInit } from '@angular/core';
import { DATOS_EXPORTACION, DATOS_EXPORTADOR, DATOS_MERCANCIA, DATOS_PRODUCTOR, DATOS_REALIZAR } from '../../constants/permiso-importacion-modification.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CatalogoSelectComponent } from "libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component";
import { CatalogosService } from 'libs/shared/data-access-user/src/core/services/shared/catalogos/catalogos.service';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from 'libs/shared/data-access-user/src/core/models/shared/forms-model';
import { InputConfig } from '../../models/permiso-importacion-modification.model';
import { InputFechaComponent } from "libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component";
import { InputRadioComponent } from "libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component";
import { InputTypes } from '../../models/permiso-importacion-modification.enum';
import { TituloComponent } from "libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { map } from 'rxjs';
import tipoDePersonaExportadorOptions from 'libs/shared/theme/assets/json/130120/tipo-de-persona-exportador.json';
import tipoDePersonaProductorOptions from 'libs/shared/theme/assets/json/130120/tipo-de-persona-productor.json';

@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, InputFechaComponent, InputRadioComponent, CatalogoSelectComponent],
})
export class DatosDeLaSolicitudComponent implements OnInit {
  
  configuracion: InputConfig[] = [
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
  valoresSeleccionadosRadio: any = {};
  fiscal: FormularioDinamico[] = [];
  formulario!: FormGroup;

  constructor(private fb: FormBuilder, private catalogosServicios: CatalogosService) {
    this.crearFormulario();
  }

  ngOnInit() {
    this.configuracion[3].menu[0].props.options = tipoDePersonaProductorOptions;
    this.configuracion[3].menu[0].props.selectedValue = tipoDePersonaProductorOptions[0].value;
    this.valoresSeleccionadosRadio.radio3 = tipoDePersonaProductorOptions[0].value;
    this.configuracion[4].menu[0].props.options = tipoDePersonaExportadorOptions;
    this.configuracion[4].menu[0].props.selectedValue = tipoDePersonaExportadorOptions[0].value;
    this.valoresSeleccionadosRadio.radio4 = tipoDePersonaExportadorOptions[0].value;
    this.configuracion.forEach((eachConfig: InputConfig, groupIndex: number) => {
      this.inicializarFormGroup(eachConfig.menu, eachConfig.formGroupName, groupIndex);
    });
  }
  
  /**
   * Crea el formulario principal e inicializa los subgrupos.
   */
  crearFormulario(): void {
    this.formulario = this.fb.group({
      datosRealizer: this.fb.group({}),
      datosMercanica: this.fb.group({}),
      datosExporta: this.fb.group({}),
      datosProductor: this.fb.group({}),
      datosExportador: this.fb.group({}),
    });
  }
  
  /**
   * Inicializa un grupo de formularios con controles basados en la configuración proporcionada.
   * @param configuracion - La configuración para los controles del formulario.
   * @param nombreGrupo - El nombre del grupo de formularios.
   * @param indiceGrupo - El índice del grupo en la matriz de configuración.
   */
  inicializarFormGroup(
    configuracion: any[],
    nombreGrupo: string,
    indiceGrupo: number,
  ): void {
    const GRUPO = this.formulario.get(nombreGrupo) as FormGroup;
    configuracion.forEach((campo: any, menuIndex: number) => {
      const VALIDATORS = campo.validators ? this.getValidators(campo.validators) : [Validators.required];
      const CONTROL_NAME = campo.props.campo;
      GRUPO.addControl(
        CONTROL_NAME,
        this.fb.control({ value: '', disabled: campo.disabled }, VALIDATORS)
      );
      if (campo.inputType === InputTypes.SELECT) {
        this.obtenerValoresCatalogo(indiceGrupo, menuIndex, CONTROL_NAME);
      }
    });
  }

  /**
   * Obtiene los valores del catálogo y actualiza la configuración.
   * @param indiceGrupo - El índice del grupo en la matriz de configuración.
   * @param indiceMenu - El índice del menú en el grupo.
   * @param clave - La clave para obtener los valores del catálogo.
   */
  obtenerValoresCatalogo(indiceGrupo: number, indiceMenu: number, clave: string): void {
    this.catalogosServicios
      .getCatalogo(clave)
      .pipe(
        map((resp) => {
          if (resp.length > 0) {
            this.configuracion[indiceGrupo].menu[indiceMenu].props.catalogs = resp;
          }
        })
      )
      .subscribe();
  }

  /**
   * Genera una matriz de validadores de formularios basada en los patrones proporcionados.
   * @param validadores - Una matriz de patrones regex que se utilizarán para la validación.
   * @returns Una matriz de validadores de formularios.
   */
  getValidators(validadores: string[]): ValidatorFn[] {
    const FORM_VALIDATORS: ValidatorFn[] = [];
    validadores.forEach((validadore) => {
      if (validadore === 'required') {
        FORM_VALIDATORS.push(Validators.required);
      } else if (validadore.includes('maxLength')) {
        const MAX = validadore.split(':')[1];
        FORM_VALIDATORS.push(Validators.maxLength(Number(MAX)));
      } else if (validadore.includes('pattern')) {
        const PATTERN = validadore.split(':')[1];
        FORM_VALIDATORS.push(Validators.pattern(PATTERN));
      }
    });
    return FORM_VALIDATORS;
  }

  /**
   * Maneja el evento de cambio para la entrada de fecha.
   * @param evento - El nuevo valor de la fecha como cadena.
   */
  fechaCambiado(evento: string): void {
    // Manejar cambio de fecha
  }

  /**
   * Maneja el evento de selección para un catálogo.
   * @param nombreControlFormulario - El nombre del control del formulario a actualizar.
   * @param evento - El valor seleccionado del catálogo.
   */
  seleccionCatalogo(nombreControlFormulario: string, evento: any): void {
    this.formulario.get(nombreControlFormulario)?.setValue(evento);
  }

  /**
   * Maneja el evento de cambio para una entrada de radio.
   * @param claveRadio - La clave de la entrada de radio.
   * @param evento - El nuevo valor de la entrada de radio.
   */
  cambioValorRadio(claveRadio: string, evento: string | number): void {
    this.configuracion[3].menu[0].props.selectedValue = evento;
    this.valoresSeleccionadosRadio[claveRadio] = evento;
  }
}