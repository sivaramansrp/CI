import { CARGO_TIPO, DATOS_EMPRESA } from '../../constants/aviso.enum';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputConfig, MenuConfig, Props } from '@ng-mf/data-access-user';
import { InputTypes, buttonActionTypes } from '@ng-mf/data-access-user';
import { CargaMasivaComponent } from '../carga-masiva/carga-masiva.component';
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { InputFechaComponent } from "@ng-mf/data-access-user";
import { InputRadioComponent } from "@ng-mf/data-access-user";
import { ManualAvisoComponent } from '../manual-aviso/manual-aviso.component';
import { TablaClomns } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from "@ng-mf/data-access-user";
import { Tramite32504Store } from '../../estados/tramite32504.store';
import { map } from 'rxjs';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, InputFechaComponent, InputRadioComponent, ManualAvisoComponent, CargaMasivaComponent, TablaDinamicaComponent],
  standalone: true,
})
export class AvisoComponent implements OnInit {
  configuracion: InputConfig[] = [
    {
      title: 'Datos de la empresa IMMEX que transfiere y presenta el aviso, asi como del mes al que corresponde',
      formGroupName: 'datosEmpresa',
      menu: [
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EMPRESA[0] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EMPRESA[1] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_EMPRESA[2] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_EMPRESA[3] as unknown as Props,
          class: 'col-md-4',
        }
      ],
    },
    {
      title: 'Tipo de carga',
      formGroupName: 'cargaTipo',
      menu: [
        {
          inputType: InputTypes.RADIO,
          props: CARGO_TIPO[0] as unknown as Props,
          class: 'col-md-8',
        },
      ],
    },
  ];
  valoresSeleccionadosRadio: { [key: string]: string } = {
    radio1: ''
  };
  fiscal: FormularioDinamico[] = [];
  formulario!: FormGroup;
  tableData: {
    headers: {
      encabezado: string,
      clave: (ele: TablaClomns) => string,
      orden: number
    }[],
    data: [],
  } = {
      headers:
      [
        { encabezado: 'RFC', clave: (ele: TablaClomns) => ele.rfc, orden: 1 },
        {
          encabezado: 'Nombre comercial',
          clave: (ele: TablaClomns) => ele.nombreComercial,
          orden: 2,
        },
        {
          encabezado: 'Entidad federativa',
          clave: (ele: TablaClomns) => ele.entidadFederativa,
          orden: 3,
        },
        {
          encabezado: 'Alcaldío o Municipio',
          clave: (ele: TablaClomns) => ele.alcaldioOMuncipio,
          orden: 4,
        },
        {
          encabezado: 'Colonia',
          clave: (ele: TablaClomns) => ele.colonia,
          orden: 5,
        },
      ],
      data: []
    };
  isManualAsivoAgregarClicked = false;
  buttonActionTypes = buttonActionTypes;
  TablaSeleccion = TablaSeleccion;
  evento = {};

  constructor(
    private fb: FormBuilder,
    private catalogosServicios: CatalogosService,
    private store: Tramite32504Store
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    const TIPO_CARGA = [
      {
        "label": "Manual",
        "value": "manual"
      },
      {
        "label": "Carga Masiva",
        "value": "carga_masiva"
      }
    ];  
    this.configuracion[1].menu[0].props.radioOptions = TIPO_CARGA;
    this.configuracion[1].menu[0].props.radioSelectedValue = TIPO_CARGA[0].value;
    this.valoresSeleccionadosRadio = { radio1: TIPO_CARGA[0].value };
    this.configuracion.forEach((eachConfig: InputConfig, groupIndex: number) => {
      this.inicializarFormGroup(eachConfig.menu, eachConfig.formGroupName, groupIndex);
    });
  }

    /**
     * Inicializa un grupo de formularios con controles basados en la configuración proporcionada.
     * @param configuracion - La configuración para los controles del formulario.
     * @param nombreGrupo - El nombre del grupo de formularios.
     * @param indiceGrupo - El índice del grupo en la matriz de configuración.
     */
  inicializarFormGroup(
    configuracion: MenuConfig[],
    nombreGrupo: string,
    indiceGrupo: number,
  ): void {
    const GRUPO = this.formulario.get(nombreGrupo) as FormGroup;
    configuracion.forEach((campo: MenuConfig, menuIndex: number) => {
      const VALIDATORS = campo.props.validators ? AvisoComponent.getValidators(campo.props.validators) : [Validators.required];
      const CONTROL_NAME = campo.props.campo ? campo.props.campo : campo.props.labelNombre;
      GRUPO.addControl(
        CONTROL_NAME,
        this.fb.control({ value: '', disabled: campo.props.disabled }, VALIDATORS)
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
            this.configuracion[indiceGrupo].menu[indiceMenu].props.catalogos = resp;
          }
        })
      )
      .subscribe();
  }

  /**
   * Crea el formulario principal e inicializa los subgrupos.
   */
  crearFormulario(): void {
    this.formulario = this.fb.group({
      datosEmpresa: this.fb.group({}),
      cargaTipo: this.fb.group({}),
      manualDatos: this.fb.group({}),
      // datosExporta: this.fb.group({}),
      // datosProductor: this.fb.group({}),
      // datosExportador: this.fb.group({}),
    });
  }

  /**
   * Genera una matriz de validadores de formularios basada en los patrones proporcionados.
   * @param validadores - Una matriz de patrones regex que se utilizarán para la validación.
   * @returns Una matriz de validadores de formularios.
   */
  static getValidators(validadores: string[]): ValidatorFn[] {
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
    this.evento = evento;
  }
  
  /**
   * Maneja el evento de selección para un catálogo.
   * @param nombreControlFormulario - El nombre del control del formulario a actualizar.
   * @param evento - El valor seleccionado del catálogo.
   */
  seleccionCatalogo(nombreControlFormulario: string, evento: Event): void {
    this.formulario.get(nombreControlFormulario)?.setValue(evento);
  }
  
  /**
   * Maneja el evento de cambio para una entrada de radio.
   * @param claveRadio - La clave de la entrada de radio.
   * @param evento - El nuevo valor de la entrada de radio.
   */
  cambioValorRadio(claveRadio: string, groupIndex: number, menuIndex: number, evento: string | number): void {
    this.configuracion[groupIndex].menu[menuIndex].props.radioSelectedValue = evento;
    this.valoresSeleccionadosRadio[claveRadio] = evento.toString();
  }

  buttonAcion(action: buttonActionTypes): void {
    switch (action) {
      case buttonActionTypes.AGREGAR:
        this.isManualAsivoAgregarClicked = true;
        break;
      case buttonActionTypes.ELIMINAR:
        
        break;
      case buttonActionTypes.MODIFICAR:
        
        break;
    
      default:
        break;
    }
  }

  onSubmit(): void {
    this.store.setDatosEmpresa(this.formulario.value.datosEmpresa);
    this.store.setCargaTipo(this.formulario.value.cargaTipo);
  }
}
