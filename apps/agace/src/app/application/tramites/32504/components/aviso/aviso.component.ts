import { CARGO_TIPO, DATOS_EMPRESA } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputTypes, buttonActionTypes } from '@ng-mf/data-access-user';
import { CargaMasivaComponent } from '../carga-masiva/carga-masiva.component';
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { InputConfig } from '@ng-mf/data-access-user';
import { InputFechaComponent } from "@ng-mf/data-access-user";
import { InputRadioComponent } from "@ng-mf/data-access-user";
import { ManualAvisoComponent } from '../manual-aviso/manual-aviso.component';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from "@ng-mf/data-access-user";
import { map } from 'rxjs';
const TipoCarga = require('libs/shared/theme/assets/json/32504/tipo-cargo.json');


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
          props: DATOS_EMPRESA[0],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_EMPRESA[0],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_EMPRESA[0],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_EMPRESA[1],
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
          props: CARGO_TIPO[0],
          class: 'col-md-8',
        },
      ],
    },
  ];
  valoresSeleccionadosRadio: any = {};
  fiscal: FormularioDinamico[] = [];
  formulario!: FormGroup;
  tableData: {
    headers: { encabezado: string, clave: (ele: any) => any, orden: number }[],
    data: (string | number)[],
  } = {
      headers:
      [
        { encabezado: 'RFC', clave: (ele: any) => ele.rfc, orden: 1 },
        {
          encabezado: 'Nombre comercial',
          clave: (ele: any) => ele.nombreComercial,
          orden: 2,
        },
        {
          encabezado: 'Entidad federativa',
          clave: (ele: any) => ele.entidadFederativa,
          orden: 3,
        },
        {
          encabezado: 'Alcaldío o Municipio',
          clave: (ele: any) => ele.alcaldioOMuncipio,
          orden: 4,
        },
        {
          encabezado: 'Colonia',
          clave: (ele: any) => ele.colonia,
          orden: 5,
        },
      ],
      data: []
    };
  isManualAsivoAgregarClicked = false;
  buttonActionTypes = buttonActionTypes;
  TablaSeleccion = TablaSeleccion;

  constructor(private fb: FormBuilder, private catalogosServicios: CatalogosService) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.configuracion[1].menu[0].props.options = TipoCarga;
    this.configuracion[1].menu[0].props.selectedValue = TipoCarga[0].value;
    this.valoresSeleccionadosRadio.radio1 = TipoCarga[0].value;
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
    configuracion: any[],
    nombreGrupo: string,
    indiceGrupo: number,
  ): void {
    const grupo = this.formulario.get(nombreGrupo) as FormGroup;
    configuracion.forEach((campo: any, menuIndex: number) => {
      const validators = campo.validators ? this.getValidators(campo.validators) : [Validators.required];
      const controlName = campo.props.campo ? campo.props.campo : campo.props.labelNombre;
      grupo.addControl(
        controlName,
        this.fb.control({ value: '', disabled: campo.disabled }, validators)
      );
      if (campo.inputType === InputTypes.SELECT) {
        this.obtenerValoresCatalogo(indiceGrupo, menuIndex, controlName);
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
  getValidators(validadores: string[]): ValidatorFn[] {
    const formValidators: ValidatorFn[] = [];
    validadores.forEach((validadore) => {
      if (validadore === 'required') {
        formValidators.push(Validators.required);
      } else if (validadore.includes('maxLength')) {
        const max = validadore.split(':')[1];
        formValidators.push(Validators.maxLength(Number(max)));
      } else if (validadore.includes('pattern')) {
        const pattern = validadore.split(':')[1];
        formValidators.push(Validators.pattern(pattern));
      }
    });
    return formValidators;
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
  cambioValorRadio(claveRadio: string, groupIndex: number, menuIndex: number, evento: string | number): void {
    this.configuracion[groupIndex].menu[menuIndex].props.selectedValue = evento;
    this.valoresSeleccionadosRadio[claveRadio] = evento;
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
  
}
