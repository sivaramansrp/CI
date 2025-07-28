import { ALCALDIA_CONFIG, COLONIA_CONFIG, DATOS_DOMICILIO_LUGAR, DATOS_MERCANCIA_SUBMANUFACTURA, DATOS_QUIEN_RECIBE, ENTIDAD_FEDERATIVA_CONFIG, FRACCION_ARANCELARIA_CONFIG, UNIDAD_MEDIDA_CONFIG } from '../../constants/aviso.enum';
import { BotonAccionesTipos, ConsultaioQuery, FormaValidators, InputTypes, Props } from '@ng-mf/data-access-user';
import { ColumnasTabla, ColumnsTableMercancia } from '../../models/aviso.model';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { ActionType } from '../../enum/aviso.enum';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
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

DATOS_MERCANCIA_SUBMANUFACTURA[0].catalogos = FRACCION_ARANCELARIA_CONFIG;
DATOS_MERCANCIA_SUBMANUFACTURA[2].catalogos = UNIDAD_MEDIDA_CONFIG;
DATOS_DOMICILIO_LUGAR[1].catalogos = ENTIDAD_FEDERATIVA_CONFIG;
DATOS_DOMICILIO_LUGAR[2].catalogos = ALCALDIA_CONFIG;
DATOS_DOMICILIO_LUGAR[3].catalogos = COLONIA_CONFIG;

@Component({
  selector: 'app-manual-aviso',
  templateUrl: './manual-aviso.component.html',
  styleUrl: './manual-aviso.component.scss',
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent],
  standalone: true,
})
export class ManualAvisoComponent implements OnInit, OnDestroy {
  /**
 * Evento que se emite cuando se desea agregar una nueva fila a la tabla.
 * Emite un objeto de tipo ColumnasTabla hacia el componente padre.
 */
  @Output() agregarFila = new EventEmitter<ColumnasTabla>();
  /**
   * Evento que emite acciones de los botones principales del formulario.
   * @type {EventEmitter<boolean>}
   */
  @Output() emitButtonAction = new EventEmitter<boolean>();

  /**
   * Notificador para destruir suscripciones activas y evitar fugas de memoria.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   */
  esFormularioSoloLectura: boolean = false;

  /**
  * Indica si se debe mostrar el popup que confirma que un registro fue agregado.
  * Valor booleano que controla la visibilidad del mensaje emergente de confirmación.
  */
  public mostrarPopupRegistroAgregado = false;

  /**
  * Mensaje que se muestra en el popup al agregar un registro exitosamente.
  * Informa al usuario que la operación se realizó correctamente.
  */
  public mensajePopupRegistroAgregado = 'El registro fue agregado correctamente.';

  /**
   * Configuración de los grupos y campos del formulario dinámico principal.
   * @type {InputConfig[]}
   */
  configuracion: InputConfig[] = [
    {
      title: 'Datos de quien recibe las mercancías (tercero submanufacturero autorizado)',
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

  /**
   * Configuración de los campos para la tabla de mercancía transferida.
   * @type {InputConfig[]}
   */
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
          class: 'col-md-12',
        },
      ],
    },
  ];

  /**
   * Arreglo para la gestión de formularios dinámicos fiscales.
   * @type {FormularioDinamico[]}
   */
  fiscal: FormularioDinamico[] = [];

  /**
   * Formulario reactivo principal del componente.
   * @type {FormGroup}
   */
  formulario!: FormGroup;

  /**
   * Configuración y datos de la tabla dinámica de destinatarios.
   * @type {Object}
   */
  tableData: {
    headers: {
      encabezado: string,
      clave: (ele: ColumnsTableMercancia) => string,
      orden: number
    }[],
    data: ColumnsTableMercancia[],
  } = {
      headers: [
        { encabezado: 'Fracción arancelaria', 
          clave: (ele: ColumnsTableMercancia): string => {
            const VALOR = FRACCION_ARANCELARIA_CONFIG.find(c => c.id === Number(ele.fracArancelaria));
            return VALOR ? VALOR.descripcion : ele.fracArancelaria;
          },
          orden: 1 
        },
        {
          encabezado: 'NICO',
          clave: (ele: ColumnsTableMercancia) => ele.nico,
          orden: 2,
        },
        {
          encabezado: 'Unidad de medida',
          clave: (ele: ColumnsTableMercancia): string => {
            const VALOR = UNIDAD_MEDIDA_CONFIG.find(c => c.id === Number(ele.unidadMedida));
            return VALOR ? VALOR.descripcion : ele.unidadMedida;
          },
          orden: 3,
        },
        {
          encabezado: 'Cantidad',
          clave: (ele: ColumnsTableMercancia) => ele.cantidad,
          orden: 4,
        },
        {
          encabezado: 'Valor USD',
          clave: (ele: ColumnsTableMercancia) => ele.valorUsd,
          orden: 5,
        },
        {
          encabezado: 'Descripción de la mercancía',
          clave: (ele: ColumnsTableMercancia) => ele.descripcionMercancia,
          orden: 5,
        },
      ],
      data: []
    };

  /**
   * Indica si se ha hecho clic en el botón para agregar en la tabla secundaria.
   * @type {boolean}
   */
  esAgregarClicked = false;

  /**
   * Enumeración de los tipos de acciones de los botones.
   * @type {typeof BotonAccionesTipos}
   */
  botonAccionesTipos = BotonAccionesTipos;

  /**
   * Enumeración de los tipos de acción del formulario.
   * @type {typeof ActionType}
   */
  actionTypes = ActionType;

  /**
   * Enumeración para la selección de filas en la tabla.
   * @type {typeof TablaSeleccion}
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Objeto para almacenar eventos de interacción.
   * @type {any}
   */
  event = {};

  /**
   * Enumeración de los tipos de input disponibles.
   * @type {typeof InputTypes}
   */
  inputTypes = InputTypes;
  
  /**
   * Inicializa el componente, inyecta los servicios necesarios y crea el formulario principal.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {CatalogosService} catalogosServicios - Servicio para obtener catálogos.
   * @param {Tramite32504Store} store - Store para la gestión del estado del trámite.
   * @param {ConsultaioQuery} consultaQuery - Query para consultar el estado de consulta.
   */
  constructor(
    private fb: FormBuilder,
    private catalogosServicios: CatalogosService,
    private store: Tramite32504Store,
    private consultaQuery: ConsultaioQuery,
  ) {
    this.crearFormulario();
  }
  
  /**
   * Inicializa los grupos del formulario y suscribe el estado de solo lectura para habilitar o deshabilitar el formulario según corresponda.
   */
  ngOnInit(): void {
    this.renderizadoGrupo(this.configuracion);
    this.consultaQuery.selectConsultaioState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.esFormularioSoloLectura = seccionState.readonly;
            this.inicializarEstadoFormulario();
          })
        )
        .subscribe();
  }

  /**
   * Inicializa el estado del formulario según el modo de solo lectura. Si el formulario está en modo solo lectura, deshabilita todos los campos; de lo contrario, los habilita para su edición.
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if(!this.formulario){
        this.configuracion.forEach((eachConfig: InputConfig, groupIndex: number) => {
        this.inicializarFormGroup(eachConfig.menu, eachConfig.formGroupName, groupIndex);
      });     
    }
    if (this.esFormularioSoloLectura) {
        this.formulario.disable();
    } else {
      this.formulario.enable();
    }
  }

  /**
   * Inicializa los grupos de formularios con la configuración proporcionada.
   * @param {InputConfig[]} config - Configuración para los controles del formulario.
   * @returns {void}
   */
  renderizadoGrupo(config: InputConfig[]): void { 
    config.forEach((eachConfig: InputConfig, groupIndex: number) => {
      this.inicializarFormGroup(eachConfig.menu, eachConfig.formGroupName, groupIndex);
    });
  }

  /**
   * Inicializa un grupo de formularios con controles basados en la configuración proporcionada.
   * @param {MenuConfig[]} configuracion - Configuración para los controles del formulario.
   * @param {string} nombreGrupo - Nombre del grupo de formularios.
   * @param {number} indiceGrupo - Índice del grupo en la matriz de configuración.
   * @returns {void}
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
      if (campo.inputType === InputTypes.SELECT &&
          campo.props.campo !== 'colonias') {
          this.obtenerValoresCatalogo(indiceGrupo, menuIndex, CONTROL_NAME);
      }
    });
  }

  /**
   * Obtiene los valores del catálogo y actualiza la configuración del campo correspondiente.
   * @param {number} indiceGrupo - Índice del grupo en la matriz de configuración.
   * @param {number} indiceMenu - Índice del menú en el grupo.
   * @param {string} clave - Clave para obtener los valores del catálogo.
   * @returns {void}
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
   * @returns {void}
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
   * @param {string[]} validadores - Arreglo de patrones regex para la validación.
   * @returns {ValidatorFn[]} Arreglo de validadores de formularios.
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
   * @param {string} evento - Nuevo valor de la fecha.
   * @returns {void}
   */
  fechaCambiado(evento: string): void {
    // Manejar cambio de fecha
    this.event = evento;
  }
  
  /**
 * Asigna el valor seleccionado de un catálogo al formulario.
 * Obtiene el valor del evento y lo establece en el control correspondiente del formulario.
 */
  seleccionCatalogo(formGroupName: string, formControlName: string, evento: Event ): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.formulario.get(formGroupName)?.get(formControlName)?.setValue(VALOR);
  }
  
  /**
   * Maneja el evento de cambio para una entrada de radio y actualiza el valor seleccionado.
   * @param {string} claveRadio - Clave de la entrada de radio.
   * @param {number} groupIndex - Índice del grupo en la configuración.
   * @param {number} menuIndex - Índice del menú en el grupo.
   * @param {string | number} evento - Nuevo valor de la entrada de radio.
   * @returns {void}
   */
  cambioValorRadio(claveRadio: string, groupIndex: number, menuIndex: number, evento: string | number): void {
    this.configuracion[groupIndex].menu[menuIndex].props.radioSelectedValue = evento;
  }

  /**
   * Maneja las acciones de los botones del formulario y la tabla secundaria según el tipo de acción seleccionada.
   * @param {ActionType} accionTipo - Tipo de acción que define el tipo de formulario.
   * @param {BotonAccionesTipos} accione - Tipo de acción a ejecutar.
   * @returns {void}
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
   * Maneja el comportamiento del botón de la tabla secundaria.
   * @param {BotonAccionesTipos} action - Tipo de acción a ejecutar.
   * @returns {void}
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

  /**
   * Envía los datos del formulario al store para su almacenamiento.
   * @returns {void}
   */
  onSubmit(): void {
    this.store.setDatosQuienRecibe(this.formulario.get('datosQuienRecibe')?.value);
    this.store.setDatosDomicilioLugar(this.formulario.get('datosDomicilioLugar')?.value);
    this.store.setDatosMercanciaSubmanufactura(this.formulario.get('datosMercanciaSubmanufactura')?.value);
  }

  /**
 * Valida el formulario y agrega una nueva fila a la tabla si los datos son válidos.
 * Si el formulario es inválido, marca los controles como tocados; de lo contrario,
 * agrega la fila, reinicia el formulario y ejecuta una acción asociada al botón.
 */
  validarYAgregarFila(): void {
  const GRUPO_MERCANCIA = this.formulario.get('datosMercanciaSubmanufactura') as FormGroup;
  if (GRUPO_MERCANCIA.invalid) {
    Object.values(GRUPO_MERCANCIA.controls).forEach(control => control.markAsTouched());
    return; 
  }
    const NEW_ROW = GRUPO_MERCANCIA.value;
    this.tableData.data = [...this.tableData.data, NEW_ROW];

    GRUPO_MERCANCIA.reset();

    this.botonDeTablaInfantilAccion(this.botonAccionesTipos.AGREGAR);

    this.mostrarPopupRegistroAgregado = true;
}

/**
 * Valida los grupos de formulario "datosQuienRecibe" y "datosDomicilioLugar", y si son válidos, emite una nueva fila.
 * Si hay errores, marca los controles como tocados; si no, combina los datos y emite el evento de agregar fila.
 */
validarNewAgregarFila():void{
  const GROUPO_QUIEN_RECIBE = this.formulario.get('datosQuienRecibe') as FormGroup;
  const GROUPO_DOMICILIO_LUGAR = this.formulario.get('datosDomicilioLugar') as FormGroup;

  if (GROUPO_QUIEN_RECIBE.get("rfc")?.invalid || (GROUPO_DOMICILIO_LUGAR.get("nombreComercial")?.invalid && GROUPO_DOMICILIO_LUGAR.get("entidadFederativa")?.invalid) && GROUPO_DOMICILIO_LUGAR.get("alcalida_municipio")?.invalid && GROUPO_DOMICILIO_LUGAR.get("colonias")?.invalid) {
    Object.values(GROUPO_QUIEN_RECIBE.controls).forEach(control => control.markAsTouched());
    Object.values(GROUPO_DOMICILIO_LUGAR.controls).forEach(control => control.markAsTouched());
    return;
  }

  const NEW_ROW = {
    ...GROUPO_QUIEN_RECIBE.value,
    ...GROUPO_DOMICILIO_LUGAR.value
  };
  this.agregarFila.emit(NEW_ROW);

  GROUPO_QUIEN_RECIBE.reset();
  GROUPO_DOMICILIO_LUGAR.reset();

  this.accionesBotones(this.actionTypes.TABLE_ACTION, this.botonAccionesTipos.AGREGAR);
}

  /**
   * Libera los recursos y destruye las suscripciones activas al destruir el componente.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
