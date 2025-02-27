import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DATOS_DOMICILIO_LUGAR, DATOS_MERCANCIA_SUBMANUFACTURA, DATOS_QUIEN_RECIBE } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputTypes, buttonActionTypes } from '@ng-mf/data-access-user';
import { ActionType } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { InputConfig } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { map } from 'rxjs';

@Component({
  selector: 'app-manual-aviso',
  templateUrl: './manual-aviso.component.html',
  styleUrl: './manual-aviso.component.scss',
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent],
  standalone: true,
})
export class ManualAvisoComponent implements OnInit {

  @Output() emitButtonAction = new EventEmitter<boolean>();

  configuracion: InputConfig[] = [
    {
      title: 'Datos de quien recibe las mercancías(tercero submanufacturero autoriado)',
      formGroupName: 'datosQuienRecibe',
      menu: [
        {
          inputType: InputTypes.TEXT,
          props: DATOS_QUIEN_RECIBE[0],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_QUIEN_RECIBE[1],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_QUIEN_RECIBE[2],
          class: 'col-md-4',
        },
      ],
    },
    {
      title: 'Datos del domicilio del lugar en donde se Ilevarán a cabo las operaciones de submanufactura',
      formGroupName: 'datosDomicilioLugar',
      menu: [
        {
          inputType: InputTypes.TEXT,
          props: DATOS_DOMICILIO_LUGAR[0],
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_DOMICILIO_LUGAR[1],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_DOMICILIO_LUGAR[2],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_DOMICILIO_LUGAR[3],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_DOMICILIO_LUGAR[4],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_DOMICILIO_LUGAR[5],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_DOMICILIO_LUGAR[6],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_DOMICILIO_LUGAR[7],
          class: 'col-md-4',
        },
      ],
    },
  ];
  configuracion_table: InputConfig[] = [
    {
      title: 'Datos de la mercancía transferida para submanufactura',
      formGroupName: 'datosMercanciaSubmanufactura',
      menu: [
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA_SUBMANUFACTURA[0],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA_SUBMANUFACTURA[1],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA_SUBMANUFACTURA[2],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA_SUBMANUFACTURA[3],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA_SUBMANUFACTURA[4],
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA_SUBMANUFACTURA[5],
          class: 'col-md-4',
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
      headers: [
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
  isAgregarClicked = false;
  buttonActionTypes = buttonActionTypes;
  actionTypes = ActionType;
  TablaSeleccion = TablaSeleccion;
  
  constructor(private fb: FormBuilder, private catalogosServicios: CatalogosService) {
    this.crearFormulario();
  }
  
  ngOnInit(): void {
    this.renderGroup(this.configuracion);
  }

  renderGroup(config: InputConfig[]): void { 
    config.forEach((eachConfig: InputConfig, groupIndex: number) => {
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
      datosQuienRecibe: this.fb.group({}),
      datosDomicilioLugar: this.fb.group({}),
      datosMercanciaSubmanufactura: this.fb.group({}),
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

  buttonAcion(actionType: ActionType, action: buttonActionTypes): void {
    switch (actionType) {
      case 'FORM_ACTION':
        switch (action) {
          case buttonActionTypes.AGREGAR:
          case buttonActionTypes.CANCELAR:
            this.emitButtonAction.emit(false);
            break;
          case buttonActionTypes.MODIFICAR:
            
            break;
        
          default:
            break;
        }
        break;
      case 'TABLE_ACTION':
        switch (action) {
          case buttonActionTypes.AGREGAR:
            this.isAgregarClicked = true;
            this.renderGroup(this.configuracion_table);
            break;
          case buttonActionTypes.ELIMINAR:
            this.emitButtonAction.emit(false);
            break;
          case buttonActionTypes.MODIFICAR:
            
            break;
        
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  childTablebuttonAcion(action: buttonActionTypes): void {
    switch (action) {
      case buttonActionTypes.AGREGAR:
      case buttonActionTypes.CANCELAR:
        this.isAgregarClicked = false;
        break;
      default:
        break;
    }
  }
}
