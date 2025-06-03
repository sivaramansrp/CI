import { ANIO_CONFIG, CARGO_TIPO, DATOS_EMPRESA, MES_CONFIG} from '../../constants/aviso.enum';
import { BotonAccionesTipos, ConsultaioQuery, InputTypes} from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FormaValidators, InputConfig, MenuConfig, Props } from '@ng-mf/data-access-user';
import { AvisoDatosService } from '../../services/aviso-datos.service';
import { CargaMasivaComponent } from '../carga-masiva/carga-masiva.component';
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { CatalogosService } from '@ng-mf/data-access-user';
import { ColumnasTabla } from '../../models/aviso.model';
import { CommonModule } from '@angular/common';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { InputFechaComponent } from "@ng-mf/data-access-user";
import { InputRadioComponent } from "@ng-mf/data-access-user";
import { LabelValueDatos } from '@ng-mf/data-access-user';
import { ManualAvisoComponent } from '../manual-aviso/manual-aviso.component';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from "@ng-mf/data-access-user";
import { Tramite32504Query } from '../../estados/tramite32504.query';
import { Tramite32504Store } from '../../estados/tramite32504.store';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * @component
 * @name AvisoComponent
 * @description Componente principal para la gestión del aviso en el trámite 32504. Permite capturar, mostrar y modificar los datos de la empresa, tipo de carga y datos manuales, así como gestionar la visualización y edición de una tabla dinámica de destinatarios.
 *
 * @property {InputConfig[]} configuracion - Configuración de los grupos y campos del formulario dinámico.
 * @property {FormularioDinamico[]} fiscal - Arreglo para la gestión de formularios dinámicos fiscales.
 * @property {FormGroup} formulario - Formulario reactivo principal del componente.
 * @property {Object} tableData - Configuración y datos de la tabla dinámica de destinatarios.
 * @property {boolean} esManualAsivoAgregarClicked - Indica si se ha hecho clic en el botón para agregar manualmente un aviso.
 * @property {typeof BotonAccionesTipos} botonAccionesTipos - Enumeración de los tipos de acciones de los botones.
 * @property {typeof TablaSeleccion} TablaSeleccion - Enumeración para la selección de filas en la tabla.
 * @property {any} evento - Objeto para almacenar eventos de interacción.
 * @property {typeof InputTypes} inputTypes - Enumeración de los tipos de input disponibles.
 * @property {Object} cargaTipo - Tipos de carga disponibles (manual o masiva).
 * @property {boolean} esFormularioSoloLectura - Indica si el formulario está en modo solo lectura.
 * @property {Subject<void>} destroyNotifier$ - Notificador para destruir suscripciones activas y evitar fugas de memoria.
 *
 **/
@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, InputFechaComponent, InputRadioComponent, ManualAvisoComponent, CargaMasivaComponent, TablaDinamicaComponent],
  providers: [AvisoDatosService],
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
      headers:
      [
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
  esManualAsivoAgregarClicked = false;
  botonAccionesTipos = BotonAccionesTipos;
  TablaSeleccion = TablaSeleccion;
  evento = {};
  inputTypes = InputTypes;
  cargaTipo = {
    MANUAL: 'manual',
    CARGA_MASIVA: 'carga_masiva',
  };

  esFormularioSoloLectura: boolean = false;

  /**
   * @private
   * @description
   * Notificador utilizado para destruir las suscripciones activas cuando el componente se destruye,
   * evitando así fugas de memoria.
   *
   * @type {Subject<void>}
   * @memberof AvisoComponent
   */
  private destroyNotifier$: Subject<void> = new Subject();


/**
   * @constructor
 * @description Inicializa el componente, inyecta los servicios necesarios y crea el formulario principal.
 * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
 * @param {CatalogosService} catalogosServicios - Servicio para obtener catálogos.
 * @param {Tramite32504Store} store - Store para la gestión del estado del trámite.
 * @param {AvisoDatosService} avisoDatosService - Servicio para obtener datos del aviso.
 * @param {ConsultaioQuery} consultaQuery - Query para consultar el estado de consulta.
 * @param {Tramite32504Query} query - Query para consultar el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private catalogosServicios: CatalogosService,
    private store: Tramite32504Store,
    private avisoDatosService: AvisoDatosService,
    private consultaQuery: ConsultaioQuery,
    private query: Tramite32504Query,
  ) {
    this.crearFormulario();
  }

/** 
 * * @method ngOnInit
 * @description Inicializa los grupos del formulario y suscribe el estado de solo lectura para habilitar o deshabilitar el formulario según corresponda.
 * */
  ngOnInit(): void {
    this.configuracion.forEach((eachConfig: InputConfig, groupIndex: number) => {
      this.inicializarFormGroup(eachConfig.menu, eachConfig.formGroupName, groupIndex);
    });

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
  * @method inicializarEstadoFormulario
  * @description Inicializa el estado del formulario según el modo de solo lectura. Si el formulario está en modo solo lectura, deshabilita todos los campos; de lo contrario, los habilita para su edición.
  * @returns {void}
  *
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
      const VALIDATORS = campo.props?.validators ? AvisoComponent.obtenerValidadores(campo.props.validators) : [Validators.required];
      const CONTROL_NAME = campo.props.campo ? campo.props.campo : campo.props.labelNombre;
      GRUPO.addControl(
        CONTROL_NAME,
        this.fb.control({ value: '', disabled: campo.props.disabled }, VALIDATORS)
      );
      if (campo.inputType === InputTypes.SELECT) {
        // Utilice la siguiente línea una vez que la API funcione bien para obtener los valores del catálogo
        // this.obtenerValoresCatalogo(indiceGrupo, menuIndex, CONTROL_NAME);
        if (campo.props.campo === 'mesCorrespondeAviso') {
          campo.props.catalogos = MES_CONFIG;
        } 
        if (campo.props.campo === 'anoCorrespondeAviso') {
          campo.props.catalogos = ANIO_CONFIG;
        }
      }
      if (campo.inputType === InputTypes.RADIO) {
        this.getRadioData(campo.props.jsonDataFileName, (data) => {
          this.configuracion[1].menu[0].props.radioOptions = data;
          this.configuracion[1].menu[0].props.radioSelectedValue = data[0].value;
        });
      }
    });
    this.query.selectformulario$.pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      if (datos) {
        this.formulario.patchValue(datos);
        this.formulario.get('cargaTipo')?.disable();
      }
    });
  }

  /**
  * Obtenga las opciones de entrada de radio del servicio
  * @param fileName - Este es el nombre del archivo json que necesitamos para las opciones
  * @param callback - Función de devolución de llamada donde se establece la opción en el menú
  */
  getRadioData(fileName: string, callback: (data: LabelValueDatos[]) => void): void {
    this.avisoDatosService.getDatos(fileName)
      .subscribe((data) => {
        callback(data);
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
  *  @method crearFormulario
  * @description Crea el formulario principal e inicializa los subgrupos.
  * @returns {void}
  *
   */
  crearFormulario(): void {
    this.formulario = this.fb.group({
      datosEmpresa: this.fb.group({}),
      cargaTipo: this.fb.group({}),
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
  }

  /**
   * La función maneja las acciones del botón.
   * @param accione - Parámetro que tiene la acción de ser del tipo BotonAccionesTipos.
   */
  accionesBotones(accione: BotonAccionesTipos): void {
    switch (accione) {
      case BotonAccionesTipos.AGREGAR:
        this.esManualAsivoAgregarClicked = true;
        break;
      case BotonAccionesTipos.ELIMINAR:
        
        break;
      case BotonAccionesTipos.MODIFICAR:
        
        break;
    
      default:
        break;
    }
  }

  /**
  *  @method onSubmit
  * @description Envía los datos del formulario al store para su almacenamiento.
  * @returns {void}
   */
  onSubmit(): void {
    this.store.setDatosEmpresa(this.formulario.value.datosEmpresa);
    this.store.setCargaTipo(this.formulario.value.cargaTipo);
  }

  /**
   * @description Actualiza los datos almacenados en el store.
   * @method setValoresStore
   * @param {FormGroup} form - El formulario a obtener los valores.
   * @param {string} campo - El nombre del campo del formulario a obtener.
   */
  setValoresStore(
  ): void {
    const VALOR = this.formulario.value;
    this.store.setEstadoGeneral(VALOR);
  }
}
