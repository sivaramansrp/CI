import { BotonAccionesTipos, FormaValidators, InputTypes, Props } from '@ng-mf/data-access-user';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DATOS_DOMICILIO_LUGAR, DATOS_MERCANCIA_SUBMANUFACTURA, DATOS_QUIEN_RECIBE } from '../../constants/aviso.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { ActionType } from '../../enum/aviso.enum';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ColumnasTabla } from '../../models/aviso.model';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { InputConfig } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { MenuConfig } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite32504Store } from '../../estados/tramite32504.store';

@Component({
  selector: 'app-manual-aviso',
  templateUrl: './manual-aviso.component.html',
  styleUrl: './manual-aviso.component.scss',
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent],
  standalone: true,
})
export class ManualAvisoComponent implements OnInit, OnDestroy {

  @Output() emitButtonAction = new EventEmitter<boolean>();

  private destroyNotifier$: Subject<void> = new Subject();

  configuracion: InputConfig[] = [
    {
      title: 'Datos de quien recibe las mercancías(tercero submanufacturero autoriado)',
      formGroupName: 'datosQuienRecibe',
      menu: [
        {
          inputType: InputTypes.TEXT,
          props: DATOS_QUIEN_RECIBE[0] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_QUIEN_RECIBE[1] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_QUIEN_RECIBE[2] as unknown as Props,
          class: 'col-md-4',
        },
      ],
    },
    {
      title: 'Datos del domicilio del lugar en donde se llevarán a cabo las operaciones de submanufactura',
      formGroupName: 'datosDomicilioLugar',
      menu: [
        {
          inputType: InputTypes.TEXT,
          props: DATOS_DOMICILIO_LUGAR[0] as unknown as Props,
          class: 'col-md-8',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_DOMICILIO_LUGAR[1] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_DOMICILIO_LUGAR[2] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_DOMICILIO_LUGAR[3] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_DOMICILIO_LUGAR[4] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_DOMICILIO_LUGAR[5] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_DOMICILIO_LUGAR[6] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_DOMICILIO_LUGAR[7] as unknown as Props,
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
          props: DATOS_MERCANCIA_SUBMANUFACTURA[0] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA_SUBMANUFACTURA[1] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.SELECT,
          props: DATOS_MERCANCIA_SUBMANUFACTURA[2] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA_SUBMANUFACTURA[3] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA_SUBMANUFACTURA[4] as unknown as Props,
          class: 'col-md-4',
        },
        {
          inputType: InputTypes.TEXT,
          props: DATOS_MERCANCIA_SUBMANUFACTURA[5] as unknown as Props,
          class: 'col-md-4',
        },
      ],
    },
  ];
  fiscal: FormularioDinamico[] = [];
  formulario!: FormGroup;
  tableData: {
    headers: {
      encabezado: string,
      clave: (ele: ColumnasTabla) => string,
      orden: number
    }[],
    data: [],
  } = {
      headers: [
        { encabezado: 'RFC', clave: (ele: ColumnasTabla) => ele.rfc, orden: 1 },
        {
          encabezado: 'Nombre comercial',
          clave: (ele: ColumnasTabla) => ele.nombreComercial,
          orden: 2,
        },
        {
          encabezado: 'Entidad federativa',
          clave: (ele: ColumnasTabla) => ele.entidadFederativa,
          orden: 3,
        },
        {
          encabezado: 'Alcaldía o Municipio',
          clave: (ele: ColumnasTabla) => ele.alcaldioOMuncipio,
          orden: 4,
        },
        {
          encabezado: 'Colonia',
          clave: (ele: ColumnasTabla) => ele.colonia,
          orden: 5,
        },
      ],
      data: []
    };
  esAgregarClicked = false;
  botonAccionesTipos = BotonAccionesTipos;
  actionTypes = ActionType;
  TablaSeleccion = TablaSeleccion;
  event = {};
  inputTypes = InputTypes;
  
  constructor(
    private fb: FormBuilder,
    private catalogosServicios: CatalogosService,
    private store: Tramite32504Store
  ) {
    this.crearFormulario();
  }
  
  ngOnInit(): void {
    this.renderizadoGrupo(this.configuracion);
  }

  /**
   * Pase la config para inicializar el formulario
   * @param config - La config para los controles del formulario.
   */
  renderizadoGrupo(config: InputConfig[]): void { 
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
    configuracion: MenuConfig[],
    nombreGrupo: string,
    indiceGrupo: number,
  ): void {
    const GRUPO = this.formulario.get(nombreGrupo) as FormGroup;
    configuracion.forEach((campo: MenuConfig, menuIndex: number) => {
      const VALIDATORS = campo.props.validators ? ManualAvisoComponent.obtenerValidadores(campo.props.validators) : [Validators.required];
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
        takeUntil(this.destroyNotifier$),
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
      datosQuienRecibe: this.fb.group({}),
      datosDomicilioLugar: this.fb.group({}),
      datosMercanciaSubmanufactura: this.fb.group({}),
      manualDatos: this.fb.group({}),
    });
  }

  /**
   * Genera una matriz de validadores de formularios basada en los patrones proporcionados.
   * @param validadores - Una matriz de patrones regex que se utilizarán para la validación.
   * @returns Una matriz de validadores de formularios.
   */
  static obtenerValidadores(validadores: string[]): ValidatorFn[] {
    const FORM_VALIDATORS: ValidatorFn[] = [];
    validadores.forEach((validadore) => {
      if (validadore === FormaValidators.REQUIRED) {
        FORM_VALIDATORS.push(Validators.required);
      } else if (validadore.includes(FormaValidators.MAX_LENGTH)) {
        const MAX = validadore.split(':')[1];
        FORM_VALIDATORS.push(Validators.maxLength(Number(MAX)));
      } else if (validadore.includes(FormaValidators.PATTERN)) {
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
    this.event = evento;
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
  }

  /**
   * La función maneja las acciones de los botones según el formulario actual. Esta función maneja las acciones de los botones para dos formularios
   * @param accionTipo - Tipo de acción que define el tipo de formulario.
   * @param accione - Parámetro que tiene la acción de ser del tipo BotonAccionesTipos.
   */
  accionesBotones(accionTipo: ActionType, accione: BotonAccionesTipos): void {
    switch (accionTipo) {
      case 'FORM_ACTION':
        switch (accione) {
          case BotonAccionesTipos.AGREGAR:
          case BotonAccionesTipos.CANCELAR:
            this.emitButtonAction.emit(false);
            break;
          case BotonAccionesTipos.MODIFICAR:
            
            break;
        
          default:
            break;
        }
        break;
      case 'TABLE_ACTION':
        switch (accione) {
          case BotonAccionesTipos.AGREGAR:
            this.esAgregarClicked = true;
            this.renderizadoGrupo(this.configuracion_table);
            break;
          case BotonAccionesTipos.ELIMINAR:
            this.emitButtonAction.emit(false);
            break;
          case BotonAccionesTipos.MODIFICAR:
            
            break;
        
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  /**
   * Esta función maneja el comportamiento del botón de la tabla secundaria
   * @param accione - Parámetro que tiene la acción de ser del tipo BotonAccionesTipos.
   */
  botonDeTablaInfantilAccion(action: BotonAccionesTipos): void {
    switch (action) {
      case BotonAccionesTipos.AGREGAR:
      case BotonAccionesTipos.CANCELAR:
        this.esAgregarClicked = false;
        break;
      default:
        break;
    }
  }

  onSubmit(): void {
    this.store.setDatosQuienRecibe(this.formulario.get('datosQuienRecibe')?.value);
    this.store.setDatosDomicilioLugar(this.formulario.get('datosDomicilioLugar')?.value);
    this.store.setDatosMercanciaSubmanufactura(this.formulario.get('datosMercanciaSubmanufactura')?.value);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
