import {
  CONCEPTO,
  DOMICILIOS_CONFIGURACION_COLUMNAS,
  MODALIDAD_DEL_PROGRAMA_IMMEX,
  MODALIDAD_DE_LA_GARANTIA_OPCION,
  SINO_OPCION,
  TIPO_DE_GARANTIA_OPCION,
  TIPO_DE_INVERSION_CONFIG,
  TIPO_SECTOR,
} from '../../constants/solicitud.enum';
import { AgregarImmexProgramComponent } from '../agregar-immex-program/agregar-immex-program.component';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { DatosGeneralesDeLaSolicitudCatologo } from '../../models/solicitud.model';
import { Domicilios } from '../../models/solicitud.model';
import { ElementRef } from '@angular/core';
import { FECHA_DE_FIN_VIGENCIA } from '../../constants/solicitud.enum';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { InputRadio } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { MiembroDeLaEmpresaComponent } from '../miembro-de-la-empresa/miembro-de-la-empresa.component';
import { Modal } from 'bootstrap';
import { ModificarImmexProgramComponent } from '../modificar-immex-program/modificar-immex-program.component';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Pedimento } from '@libs/shared/data-access-user/src';
import { REGEX_SOLO_NUMEROS } from '@libs/shared/data-access-user/src';
import { REG_X } from '@libs/shared/data-access-user/src';
import { ReactiveFormsModule } from '@angular/forms';
import { SECCION_SOCIOSIC_CONFIGURACION_COLUMNAS } from '../../constants/solicitud.enum';
import { SUB_CONTRATISTAS_CONFIGURACION } from '../../constants/solicitud.enum';
import { SeccionSociosIC } from '../../models/solicitud.model';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { Solicitud31101State } from '../../estados/solicitud31101.store';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
import { SolicitudService } from '../../services/solicitud.service';
import { SubContratistas } from '../../models/solicitud.model';
import { Subject } from 'rxjs';
import { TIPO_DE_INVERSION_CONFIGURACION_COLUMNAS } from '../../constants/solicitud.enum';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TipoDeInversion } from '../../models/solicitud.model';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/** Identificador del componente en la plantilla
 * Indica que el componente es independiente
 * Proveedor de servicio de solicitud
 * Ruta de la plantilla HTML del componente
 */
@Component({
  selector: 'app-datos-generales-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    TablaDinamicaComponent,
    NotificacionesComponent,
    MiembroDeLaEmpresaComponent,
    ModificarImmexProgramComponent,
    AgregarImmexProgramComponent,
    InputFechaComponent,
  ],
  providers: [SolicitudService],
  templateUrl: './datos-generales-de-la-solicitud.component.html',
  styleUrl: './datos-generales-de-la-solicitud.component.scss',
})
/** Identificador del componente en la plantilla
 * Indica que el componente es independiente
 * Proveedor de servicio de solicitud
 * Ruta de la plantilla HTML del componente
 */
export class DatosGeneralesDeLaSolicitudComponent implements OnInit, OnDestroy {
  /** Formulario principal que contiene los datos generales */
  datosGeneralesForm!: FormGroup;
  /** Subject utilizado para destruir observables y evitar fugas de memoria */
  private destroy$: Subject<void> = new Subject<void>();
  /** Fecha en que finaliza la vigencia */
  fechaDeFinDeVigencia: InputFecha = FECHA_DE_FIN_VIGENCIA;
  /** Indica si el concepto es un espectáculo */
  espectaculoConcepto: boolean = false;
  /** Define qué hacer si el espectáculo no se realiza */
  espectaculoEnCasoNegativo: boolean = false;
  /** Opciones para el tipo de garantía */
  tipoDeGarantiaOpcion: InputRadio = TIPO_DE_GARANTIA_OPCION;
  /** Opciones para la modalidad de la garantía */
  modalidadDeLaGarantiaOpcion: InputRadio = MODALIDAD_DE_LA_GARANTIA_OPCION;
  /** Opciones para el tipo de sector */
  tipoSectorOpcion: InputRadio = TIPO_SECTOR;
  /** Opciones de sí/no */
  sinoOpcion: InputRadio = SINO_OPCION;
  /** Catálogo de conceptos */
  conceptoLista: CatalogosSelect = CONCEPTO;

  /** Catálogo de tipos de inversión */
  tipoDeInversionLista: CatalogosSelect = TIPO_DE_INVERSION_CONFIG;

  /** Modalidad del programa IMMEX seleccionada */
  modalidadDelProgramaIMMEX: CatalogosSelect = MODALIDAD_DEL_PROGRAMA_IMMEX;

  /** Tipo de selección en tabla: checkbox */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Lista de tipos de inversión seleccionados */
  tipoSeleccionListo: TipoDeInversion[] = [] as TipoDeInversion[];

  /** Configuración de columnas para la tabla de subcontratistas */
  configuracionColumnas: ConfiguracionColumna<SubContratistas>[] =
    SUB_CONTRATISTAS_CONFIGURACION;

  /** Lista de subcontratistas */
  listaDeSubcontratistas: SubContratistas[] = [] as SubContratistas[];

  /** Configuración de columnas para la sección de socios IC */
  seccionSociosICConfiguracionColumnas: ConfiguracionColumna<SeccionSociosIC>[] =
    SECCION_SOCIOSIC_CONFIGURACION_COLUMNAS;

  /** Lista de socios IC */
  listaSeccionSociosIC: SeccionSociosIC[] = [] as SeccionSociosIC[];

  /** Configuración de columnas para tipo de inversión */
  tipoDeInversionConfiguracionColumnas: ConfiguracionColumna<TipoDeInversion>[] =
    TIPO_DE_INVERSION_CONFIGURACION_COLUMNAS;

  /** Datos del tipo de inversión */
  tipoDeInversionDatos: TipoDeInversion[] = [] as TipoDeInversion[];

  /** Configuración de columnas para domicilios */
  domiciliosConfiguracionColumnas: ConfiguracionColumna<Domicilios>[] =
    DOMICILIOS_CONFIGURACION_COLUMNAS;

  /** Datos de los domicilios */
  domiciliosDatos: Domicilios[] = [] as Domicilios[];

  /** Lista de domicilios seleccionados */
  seleccionarDomiciliosDatos: Domicilios[] = [] as Domicilios[];

  /** Lista de régimen aduanero */
  listaRegimenAduanero: string[] = [];

  /** Estado actual de la solicitud 31101 */
  solicitud31101State: Solicitud31101State = {} as Solicitud31101State;

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public eliminarImmexNotificacion!: Notificacion;

  public eliminadosCorrectamenteNotificacion!: Notificacion;

  /**
   * Elemento a eliminar de la tabla de pedimentos.
   */
  elementoParaEliminar!: number;

  /**
   * Array con los datos de los pedimentos.
   * Se utiliza para almacenar los pedimentos ingresados por el usuario.
   */
  pedimentos: Array<Pedimento> = [];

  /** Lista de subcontratistas asociados */
  subContratistasDatos: SubContratistas[] = [];

  selectedListaSeccionSociosIC: SeccionSociosIC[] = [];

  /**
   * Referencia al modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMiembrosEmpresa', { static: false })
  modalElement!: ElementRef;

  /** Referencia al elemento del DOM para modificar el programa IMMEX */
  @ViewChild('modificarImmexProgram', { static: true })
  modificarImmexProgramElement!: ElementRef;

  /** Referencia al elemento del DOM para agregar un nuevo programa IMMEX */
  @ViewChild('agregarImmexProgram', { static: true })
  agregarImmexProgramElement!: ElementRef;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /** Constructor del componente que inyecta dependencias y obtiene datos iniciales */
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud31101Store: Solicitud31101Store,
    public solicitud31101Query: Solicitud31101Query,
    public consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    // this.conseguirDatosGeneralesOpcionDeRadio();
    this.conseguirDatosGeneralesCatologo();
    this.conseguirListaDeSubcontratistas();
    this.conseguirRegimenAduanero();
    this.conseguirMiembrosDeLaEmpresa();
    this.conseguirTipoDeInversionDatos();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   *
   * - Crea el formulario `datosGeneralesForm` con todos sus controles y validaciones.
   * - Muchos campos están deshabilitados ya que son solo de lectura o están controlados por el estado.
   * - Se suscribe al observable `selectSolicitud$` para mantener actualizado el formulario con los datos del estado.
   * - Emite el cambio de `tipoDeEndoso` una vez que los datos se actualizan.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.datosGeneralesForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.datosGeneralesForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  inicializarFormulario(): void {
    this.datosGeneralesForm = this.fb.group({
      tipoDeGarantia: [
        { value: this.solicitud31101State.tipoDeGarantia, disabled: false },
      ],
      modalidadDeLaGarantia: [
        {
          value: this.solicitud31101State.modalidadDeLaGarantia,
          disabled: false,
        },
      ],
      tipoSector: [
        { value: this.solicitud31101State.tipoSector, disabled: false },
      ],
      concepto: [{ value: this.solicitud31101State.concepto, disabled: false }],
      alerta2: [this.solicitud31101State.alerta2],
      '3500': [{ value: this.solicitud31101State['3500'], disabled: false }],
      '3501': [{ value: this.solicitud31101State['3501'], disabled: false }],
      '3502': [{ value: this.solicitud31101State['3502'], disabled: false }],
      datosGeneralesRFC: [
        { value: this.solicitud31101State.datosGeneralesRFC, disabled: false },
      ],
      '3503': [{ value: this.solicitud31101State['3503'], disabled: false }],
      '3504': [{ value: this.solicitud31101State['3504'], disabled: false }],
      '3505': [{ value: this.solicitud31101State['3505'], disabled: false }],
      '3506': [{ value: this.solicitud31101State['3506'], disabled: false }],
      '3507': [{ value: this.solicitud31101State['3507'], disabled: false }],
      '3508': [{ value: this.solicitud31101State['3508'], disabled: false }],
      '3509': [{ value: this.solicitud31101State['3509'], disabled: false }],
      file1: [],
      file2: [],
      file3: [],
      '3511': [{ value: this.solicitud31101State['3511'], disabled: false }],
      '3512': [{ value: this.solicitud31101State['3512'], disabled: false }],
      '3513': [{ value: this.solicitud31101State['3513'], disabled: false }],
      textoGenerico1: [
        { value: this.solicitud31101State.textoGenerico1, disabled: false },
      ],
      textoGenerico2: [
        { value: this.solicitud31101State.textoGenerico2, disabled: false },
      ],
      '3514': [{ value: this.solicitud31101State['3514'], disabled: false }],
      '3515': [{ value: this.solicitud31101State['3515'], disabled: false }],
      '3516': [{ value: this.solicitud31101State['3516'], disabled: false }],
      textoGenerico3: [
        { value: this.solicitud31101State.textoGenerico3, disabled: false },
      ],
      '3517': [{ value: this.solicitud31101State['3517'], disabled: false }],
      '3518': [{ value: this.solicitud31101State['3518'], disabled: false }],
      '3519': [{ value: this.solicitud31101State['3519'], disabled: false }],
      '3520': [{ value: this.solicitud31101State['3520'], disabled: false }],
      tipoInversion: [
        { value: this.solicitud31101State.tipoInversion, disabled: false },
        [Validators.required],
      ],
      cantidadInversion: [
        { value: this.solicitud31101State.cantidadInversion, disabled: false },
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.pattern(REGEX_SOLO_NUMEROS),
        ],
      ],
      descInversion: [
        { value: this.solicitud31101State.descInversion, disabled: false },
        [Validators.required, Validators.maxLength(700)],
      ],
      '3521': [{ value: this.solicitud31101State['3521'], disabled: false }],
      '3522': [{ value: this.solicitud31101State['3522'], disabled: false }],
      claveEnumeracionD0: [
        { value: this.solicitud31101State.claveEnumeracionD0, disabled: false },
      ],
      claveEnumeracionD1: [
        { value: this.solicitud31101State.claveEnumeracionD1, disabled: false },
      ],
      claveEnumeracionD2: [
        { value: this.solicitud31101State.claveEnumeracionD2, disabled: false },
      ],
      claveEnumeracionD3: [
        { value: this.solicitud31101State.claveEnumeracionD3, disabled: false },
      ],
      claveEnumeracionH: [
        this.solicitud31101State.claveEnumeracionH,
        Validators.required,
      ],
      modalidadProgramaImmex: [
        this.solicitud31101State.modalidadProgramaImmex,
        [Validators.required],
      ],
      textoGenerico4: [
        { value: this.solicitud31101State.textoGenerico4, disabled: false },
        [Validators.required, Validators.maxLength(30)],
      ],
      textoGenerico5: [
        { value: this.solicitud31101State.textoGenerico5, disabled: false },
        [Validators.required, Validators.maxLength(30)],
      ],
      '3523': [{ value: this.solicitud31101State['3523'], disabled: false }],
      '3524': [{ value: this.solicitud31101State['3524'], disabled: false }],
      fechaFinVigencia1: [
        this.solicitud31101State.fechaFinVigencia1,
        [Validators.required, Validators.pattern('dd/MM/yyyy')],
      ],
      numeroAutorizacion1: [
        this.solicitud31101State.numeroAutorizacion1,
        [Validators.required, Validators.maxLength(50)],
      ],
      '3525': [{ value: this.solicitud31101State['3525'], disabled: false }],
      '3526': [{ value: this.solicitud31101State['3526'], disabled: false }],
      fechaFinVigencia2: [
        this.solicitud31101State.fechaFinVigencia2,
        [Validators.required, Validators.pattern('dd/MM/yyyy')],
      ],
      numeroAutorizacion2: [
        this.solicitud31101State.numeroAutorizacion2,
        [Validators.required, Validators.maxLength(50)],
      ],
      '3527': [{ value: this.solicitud31101State['3527'], disabled: false }],
      '3528': [{ value: this.solicitud31101State['3528'], disabled: false }],
      '3529': [{ value: this.solicitud31101State['3529'], disabled: false }],
      textoGenerico6: [
        { value: this.solicitud31101State.textoGenerico6, disabled: false },
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      textoGenerico7: [
        { value: this.solicitud31101State.textoGenerico7, disabled: false },
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      '3530': [{ value: this.solicitud31101State['3530'], disabled: false }],
      '3531': [{ value: this.solicitud31101State['3531'], disabled: false }],
      textoGenerico9: [
        { value: this.solicitud31101State.textoGenerico9, disabled: false },
        [Validators.required, Validators.maxLength(700)],
      ],
      textoGenerico10: [
        { value: this.solicitud31101State.textoGenerico10, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico11: [
        { value: this.solicitud31101State.textoGenerico11, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico12: [
        { value: this.solicitud31101State.textoGenerico12, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico13: [
        { value: this.solicitud31101State.textoGenerico13, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico14: [
        { value: this.solicitud31101State.textoGenerico14, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico15: [
        { value: this.solicitud31101State.textoGenerico15, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico16: [
        { value: this.solicitud31101State.textoGenerico16, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico17: [
        { value: this.solicitud31101State.textoGenerico17, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico18: [
        { value: this.solicitud31101State.textoGenerico18, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico19: [
        { value: this.solicitud31101State.textoGenerico19, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico20: [
        { value: this.solicitud31101State.textoGenerico20, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico21: [
        { value: this.solicitud31101State.textoGenerico21, disabled: false },
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern(REG_X.SOLO_NUMEROS),
        ],
      ],
      textoGenerico22: [
        { value: this.solicitud31101State.textoGenerico22, disabled: false },
      ],
      textoGenerico23: [
        { value: this.solicitud31101State.textoGenerico23, disabled: false },
      ],
      textoGenerico24: [
        { value: this.solicitud31101State.textoGenerico24, disabled: false },
      ],
    });

    /**
     * Suscripción al observable del estado:
     * - Actualiza el formulario con los nuevos valores del estado.
     * - Emite el valor actualizado de `tipoDeEndoso` para notificar cambios.
     */
    this.solicitud31101Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud31101State) => {
          this.solicitud31101State = respuesta;
          this.datosGeneralesForm.patchValue({
            tipoDeGarantia: this.solicitud31101State.tipoDeGarantia,
            modalidadDeLaGarantia:
              this.solicitud31101State.modalidadDeLaGarantia,
            tipoSector: this.solicitud31101State.tipoSector,
            alerta2: this.solicitud31101State.alerta2,
            '3500': this.solicitud31101State['3500'],
            '3501': this.solicitud31101State['3501'],
            '3502': this.solicitud31101State['3502'],
            datosGeneralesRFC: this.solicitud31101State.datosGeneralesRFC,
            '3503': this.solicitud31101State['3503'],
            '3504': this.solicitud31101State['3504'],
            '3505': this.solicitud31101State['3505'],
            '3506': this.solicitud31101State['3506'],
            '3507': this.solicitud31101State['3507'],
            '3508': this.solicitud31101State['3508'],
            '3509': this.solicitud31101State['3509'],
            '3511': this.solicitud31101State['3511'],
            '3512': this.solicitud31101State['3512'],
            '3513': this.solicitud31101State['3513'],
            textoGenerico1: this.solicitud31101State.textoGenerico1,
            textoGenerico2: this.solicitud31101State.textoGenerico2,
            '3514': this.solicitud31101State['3514'],
            '3515': this.solicitud31101State['3515'],
            '3516': this.solicitud31101State['3516'],
            textoGenerico3: this.solicitud31101State.textoGenerico3,
            '3517': this.solicitud31101State['3517'],
            '3518': this.solicitud31101State['3518'],
            '3519': this.solicitud31101State['3519'],
            '3520': this.solicitud31101State['3520'],
            tipoInversion: this.solicitud31101State.tipoInversion,
            cantidadInversion: this.solicitud31101State.cantidadInversion,
            descInversion: this.solicitud31101State.descInversion,
            '3521': this.solicitud31101State['3521'],
            '3522': this.solicitud31101State['3522'],
            claveEnumeracionD0: this.solicitud31101State.claveEnumeracionD0,
            claveEnumeracionD1: this.solicitud31101State.claveEnumeracionD1,
            claveEnumeracionD2: this.solicitud31101State.claveEnumeracionD2,
            claveEnumeracionD3: this.solicitud31101State.claveEnumeracionD3,
            claveEnumeracionH: this.solicitud31101State.claveEnumeracionH,
            modalidadProgramaImmex:
              this.solicitud31101State.modalidadProgramaImmex,
            textoGenerico4: this.solicitud31101State.textoGenerico4,
            textoGenerico5: this.solicitud31101State.textoGenerico5,
            '3523': this.solicitud31101State['3523'],
            '3524': this.solicitud31101State['3524'],
            fechaFinVigencia1: this.solicitud31101State.fechaFinVigencia1,
            numeroAutorizacion1: this.solicitud31101State.numeroAutorizacion1,
            '3525': this.solicitud31101State['3525'],
            '3526': this.solicitud31101State['3526'],
            fechaFinVigencia2: this.solicitud31101State.fechaFinVigencia2,
            numeroAutorizacion2: this.solicitud31101State.numeroAutorizacion2,
            '3527': this.solicitud31101State['3527'],
            '3528': this.solicitud31101State['3528'],
            '3529': this.solicitud31101State['3529'],
            textoGenerico6: this.solicitud31101State.textoGenerico6,
            textoGenerico7: this.solicitud31101State.textoGenerico7,
            '3530': this.solicitud31101State['3530'],
            '3531': this.solicitud31101State['3531'],
            textoGenerico9: this.solicitud31101State.textoGenerico9,
            textoGenerico10: this.solicitud31101State.textoGenerico10,
            textoGenerico11: this.solicitud31101State.textoGenerico11,
            textoGenerico12: this.solicitud31101State.textoGenerico12,
            textoGenerico13: this.solicitud31101State.textoGenerico13,
            textoGenerico14: this.solicitud31101State.textoGenerico14,
            textoGenerico15: this.solicitud31101State.textoGenerico15,
            textoGenerico16: this.solicitud31101State.textoGenerico16,
            textoGenerico17: this.solicitud31101State.textoGenerico17,
            textoGenerico18: this.solicitud31101State.textoGenerico18,
            textoGenerico19: this.solicitud31101State.textoGenerico19,
            textoGenerico20: this.solicitud31101State.textoGenerico20,
            textoGenerico21: this.solicitud31101State.textoGenerico21,
            textoGenerico22: this.solicitud31101State.textoGenerico22,
            textoGenerico23: this.solicitud31101State.textoGenerico23,
            textoGenerico24: this.solicitud31101State.textoGenerico24,
          });

          if (this.solicitud31101State.tipoSector) {
            if (this.solicitud31101State.tipoSector === 1) {
              this.datosGeneralesForm.patchValue({
                concepto: this.solicitud31101State.productivoConcepto,
              });
            } else if (this.solicitud31101State.tipoSector === 2) {
              this.datosGeneralesForm.patchValue({
                concepto: this.solicitud31101State.servicioConcepto,
              });
            }
          }
        })
      )
      .subscribe();
  }

  /**
   * Obtiene los datos generales correspondientes a las opciones de tipo de radio.
   * Asigna los valores recibidos a las propiedades correspondientes del componente.
   */
  // conseguirDatosGeneralesOpcionDeRadio(): void {
  //   this.solicitudService
  //     .conseguirDatosGeneralesOpcionDeRadio()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (respuesta: DatosGeneralesDeLaSolicitudRadioLista) => {
  //         // this.tipoDeGarantiaOpcion = respuesta.tipoDeGarantia;
  //         // this.modalidadDeLaGarantiaOpcion = respuesta.modalidadDeLaGarantia;
  //         // this.tipoSectorOpcion = respuesta.tipoSector;
  //         // this.sinoOpcion = respuesta.requisitos;
  //       },
  //     });
  // }

  /**
   * Obtiene los datos generales desde el catálogo.
   * Asigna los valores de concepto y tipo de inversión al componente.
   */
  conseguirDatosGeneralesCatologo(): void {
    this.solicitudService
      .conseguirDatosGeneralesCatologo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosGeneralesDeLaSolicitudCatologo) => {
          this.conceptoLista.catalogos = respuesta.concepto;
          this.tipoDeInversionLista.catalogos = respuesta.tipoDeInversion;
          this.modalidadDelProgramaIMMEX.catalogos =
            respuesta.modalidadDelProgramaIMMEX;
        },
      });
  }

  /**
   * Obtiene la lista de subcontratistas.
   * Asigna la respuesta al listado de subcontratistas del componente.
   */
  conseguirListaDeSubcontratistas(): void {
    this.solicitudService
      .conseguirListaDeSubcontratistas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SubContratistas[]) => {
          this.listaDeSubcontratistas = respuesta;
        },
      });
  }

  /**
   * Obtiene los datos del régimen aduanero.
   * Asigna la respuesta al listado de régimen aduanero del componente.
   */
  conseguirRegimenAduanero(): void {
    this.solicitudService
      .conseguirRegimenAduanero()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: string[]) => {
          this.listaRegimenAduanero = respuesta;
        },
      });
  }

  /**
   * Obtiene la información de los miembros de la empresa.
   * Asigna los datos recibidos a la lista de socios del componente.
   */
  conseguirMiembrosDeLaEmpresa(): void {
    this.solicitudService
      .conseguirMiembrosDeLaEmpresa()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SeccionSociosIC[]) => {
          this.listaSeccionSociosIC = respuesta;
        },
      });
  }

  /**
   * Obtiene los datos relacionados con el tipo de inversión.
   * Asigna la respuesta a la propiedad tipoDeInversionDatos del componente.
   */
  conseguirTipoDeInversionDatos(): void {
    this.solicitudService
      .conseguirTipoDeInversionDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: TipoDeInversion[]) => {
          this.tipoDeInversionDatos = respuesta;
        },
      });
  }

  /**
   * Obtiene la lista de domicilios disponibles.
   * Asigna la respuesta a la propiedad domiciliosDatos del componente.
   */
  conseguirDomicilios(): void {
    this.solicitudService
      .conseguirDomicilios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: Domicilios[]) => {
          this.domiciliosDatos = respuesta;
        },
      });
  }

  /** Actualiza el tipo de garantía */
  actualizarTipoDeGarantia(evento: string | number): void {
    this.solicitud31101Store.actualizarTipoDeGarantia(evento);
  }

  /** Actualiza la modalidad de la garantía */
  actualizarModalidadDeLaGarantia(evento: number | string): void {
    this.solicitud31101Store.actualizarModalidadDeLaGarantia(evento);
  }

  /** Actualiza el tipo de sector basado en el evento */
  actualizarTipoSector(evento: string | number): void {
    if (Number(evento) > 0) {
      this.espectaculoConcepto = true;
    } else {
      this.espectaculoConcepto = false;
    }
    this.solicitud31101Store.actualizarTipoSector(evento);
    // this.datosGeneralesForm.get('concepto')?.reset();
  }

  /** Actualiza el concepto basado en el catálogo */
  actualizarConcepto(evento: Catalogo): void {
    if (this.datosGeneralesForm.get('tipoSector')?.value === 1) {
      this.solicitud31101Store.actualizarProductivoConcepto(evento.id);
    } else if (this.datosGeneralesForm.get('tipoSector')?.value === 2) {
      this.solicitud31101Store.actualizarServicioConcepto(evento.id);
    }
  }

  /** Actualiza el valor de 3500 */
  actualizar3500(evento: number | string): void {
    this.solicitud31101Store.actualizar3500(evento);
  }

  /** Actualiza el valor de 3501 */
  actualizar3501(evento: number | string): void {
    this.solicitud31101Store.actualizar3501(evento);
  }

  /** Actualiza el valor de 3502 */
  actualizar3502(evento: number | string): void {
    this.solicitud31101Store.actualizar3502(evento);
  }

  /** Actualiza los datos generales del RFC */
  actualizarDatosGeneralesRFC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarDatosGeneralesRFC(VALOR);
  }

  /** Actualiza el valor de 3503 */
  actualizar3503(evento: number | string): void {
    this.solicitud31101Store.actualizar3503(evento);
  }

  /** Actualiza el valor de 3504 */
  actualizar3504(evento: number | string): void {
    this.solicitud31101Store.actualizar3504(evento);
  }

  /** Actualiza el valor de 3505 */
  actualizar3505(evento: number | string): void {
    this.solicitud31101Store.actualizar3505(evento);
  }

  /** Actualiza el valor de 3506 y ajusta espectáculo en caso negativo */
  actualizar3506(evento: number | string): void {
    if (evento === 2) {
      this.espectaculoEnCasoNegativo = true;
    } else {
      this.espectaculoEnCasoNegativo = false;
    }
    this.solicitud31101Store.actualizar3506(evento);
  }

  /** Actualiza el valor de 3507 */
  actualizar3507(evento: number | string): void {
    this.solicitud31101Store.actualizar3507(evento);
  }

  /** Actualiza el valor de 3508 */
  actualizar3508(evento: number | string): void {
    this.solicitud31101Store.actualizar3508(evento);
  }

  /** Actualiza el valor de 3509 */
  actualizar3509(evento: number | string): void {
    this.solicitud31101Store.actualizar3509(evento);
  }

  /** Actualiza el valor de 3511 */
  actualizar3511(evento: number | string): void {
    this.solicitud31101Store.actualizar3511(evento);
  }

  /** Actualiza el valor de 3512 */
  actualizar3512(evento: number | string): void {
    this.solicitud31101Store.actualizar3512(evento);
  }

  /** Actualiza el valor de 3513 */
  actualizar3513(evento: number | string): void {
    this.solicitud31101Store.actualizar3513(evento);
  }

  /** Actualiza el primer texto genérico */
  actualizarTextoGenerico1(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico1(VALOR);
  }

  /** Actualiza el segundo texto genérico */
  actualizarTextoGenerico2(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico2(VALOR);
  }

  /** Actualiza el valor de 3514 */
  actualizar3514(evento: number | string): void {
    this.solicitud31101Store.actualizar3514(evento);
  }

  /** Actualiza el valor de 3515 */
  actualizar3515(evento: number | string): void {
    this.solicitud31101Store.actualizar3515(evento);
  }

  /** Actualiza el valor de 3516 */
  actualizar3516(evento: number | string): void {
    this.solicitud31101Store.actualizar3516(evento);
  }

  /** Actualiza el tercer texto genérico */
  actualizarTextoGenerico3(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico3(VALOR);
  }

  /** Actualiza el valor de 3517 */
  actualizar3517(evento: number | string): void {
    this.solicitud31101Store.actualizar3517(evento);
  }

  /** Actualiza el valor de 3518 */
  actualizar3518(evento: number | string): void {
    this.solicitud31101Store.actualizar3518(evento);
  }

  /** Actualiza el valor de 3519 */
  actualizar3519(evento: number | string): void {
    this.solicitud31101Store.actualizar3519(evento);
  }

  /** Actualiza el valor de 3520 */
  actualizar3520(evento: number | string): void {
    this.solicitud31101Store.actualizar3520(evento);
  }

  /** Actualiza el tipo de inversión */
  actualizarTipoInversion(evento: Catalogo): void {
    this.solicitud31101Store.actualizarTipoInversion(evento.id);
  }

  /** Actualiza la cantidad de inversión */
  actualizarCantidadInversion(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarCantidadInversion(VALOR);
  }

  /** Actualiza la descripción de la inversión */
  actualizarDescInversion(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarDescInversion(VALOR);
  }

  /** Actualiza el valor de 3521 */
  actualizar3521(evento: number | string): void {
    this.solicitud31101Store.actualizar3521(evento);
  }

  /** Actualiza el valor de 3522 */
  actualizar3522(evento: number | string): void {
    this.solicitud31101Store.actualizar3522(evento);
  }

  /** Actualiza la clave de enumeración D0 */
  actualizarClaveEnumeracionD0(evento: string): void {
    this.solicitud31101Store.actualizarClaveEnumeracionD0(evento);
  }

  /** Actualiza la clave de enumeración D1 */
  actualizarClaveEnumeracionD1(evento: string): void {
    this.solicitud31101Store.actualizarClaveEnumeracionD1(evento);
  }

  /** Actualiza la clave de enumeración D2 */
  actualizarClaveEnumeracionD2(evento: string): void {
    this.solicitud31101Store.actualizarClaveEnumeracionD2(evento);
  }

  /** Actualiza la clave de enumeración D3 */
  actualizarClaveEnumeracionD3(evento: string): void {
    this.solicitud31101Store.actualizarClaveEnumeracionD3(evento);
  }

  /** Actualiza la clave de enumeración H */
  actualizarClaveEnumeracionH(evento: string): void {
    this.solicitud31101Store.actualizarClaveEnumeracionH(evento);
  }

  /** Actualiza la modalidad del programa IMMEX */
  actualizarModalidadProgramaImmex(evento: Catalogo): void {
    if (evento.id) {
      this.conseguirDomicilios();
      this.solicitud31101Store.actualizarModalidadProgramaImmex(evento.id);
    }
  }

  /** Actualiza el cuarto texto genérico */
  actualizarTextoGenerico4(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico4(VALOR);
  }

  /** Actualiza el quinto texto genérico */
  actualizarTextoGenerico5(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico5(VALOR);
  }

  /** Actualiza el valor de 3523 */
  actualizar3523(evento: number | string): void {
    this.solicitud31101Store.actualizar3523(evento);
  }

  /** Actualiza el valor de 3524 */
  actualizar3524(evento: number | string): void {
    this.solicitud31101Store.actualizar3524(evento);
  }

  /** Actualiza el valor de 3525 */
  actualizar3525(evento: number | string): void {
    this.solicitud31101Store.actualizar3525(evento);
  }

  /** Actualiza el valor de 3526 */
  actualizar3526(evento: number | string): void {
    this.solicitud31101Store.actualizar3526(evento);
  }

  /** Actualiza el valor de 3527 */
  actualizar3527(evento: number | string): void {
    this.solicitud31101Store.actualizar3527(evento);
  }

  /** Actualiza la fecha de fin de vigencia 1 */
  actualizarFechaFinVigencia1(evento: string): void {
    this.solicitud31101Store.actualizarFechaFinVigencia1(evento);
  }

  /** Actualiza el número de autorización 1 */
  actualizarNumeroAutorizacion1(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarNumeroAutorizacion1(VALOR);
  }

  /** Actualiza la fecha de fin de vigencia 2 */
  actualizarFechaFinVigencia2(evento: string): void {
    this.solicitud31101Store.actualizarFechaFinVigencia2(evento);
  }

  /** Actualiza el número de autorización 2 */
  actualizarNumeroAutorizacion2(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarNumeroAutorizacion2(VALOR);
  }

  /** Actualiza el valor de 3528 */
  actualizar3528(evento: number | string): void {
    this.solicitud31101Store.actualizar3528(evento);
  }

  /** Actualiza el valor de 3529 */
  actualizar3529(evento: number | string): void {
    this.solicitud31101Store.actualizar3529(evento);
  }

  /** Actualiza el sexto texto genérico */
  actualizarTextoGenerico6(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico6(VALOR);
  }

  /** Actualiza el séptimo texto genérico */
  actualizarTextoGenerico7(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico7(VALOR);
  }

  /** Actualiza el valor de 3530 */
  actualizar3530(evento: number | string): void {
    this.solicitud31101Store.actualizar3530(evento);
  }

  /** Actualiza el valor de 3531 */
  actualizar3531(evento: number | string): void {
    this.solicitud31101Store.actualizar3531(evento);
  }

  /** Actualiza el noveno texto genérico */
  actualizarTextoGenerico9(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico9(VALOR);
  }

  /** Actualiza el décimo texto genérico y recalcula el valor comercial */
  actualizarTextoGenerico10(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico10(VALOR);
    this.calcularValorComercial();
  }

  /** Actualiza el undécimo texto genérico y recalcula el valor aduanero */
  actualizarTextoGenerico11(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico11(VALOR);
    this.calcularValorAduana();
  }

  /** Actualiza el duodécimo texto genérico y recalcula el porcentaje */
  actualizarTextoGenerico12(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico12(VALOR);
    this.calcularValorPorcentaje();
  }

  /** Actualiza el decimotercer texto genérico y recalcula el valor comercial */
  actualizarTextoGenerico13(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico13(VALOR);
    this.calcularValorComercial();
  }

  /** Actualiza el decimocuarto texto genérico y recalcula el valor aduanero */
  actualizarTextoGenerico14(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico14(VALOR);
    this.calcularValorAduana();
  }

  /** Actualiza el decimoquinto texto genérico y recalcula el porcentaje */
  actualizarTextoGenerico15(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico15(VALOR);
    this.calcularValorPorcentaje();
  }

  /** Actualiza el decimosexto texto genérico y recalcula el valor comercial */
  actualizarTextoGenerico16(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico16(VALOR);
    this.calcularValorComercial();
  }

  /** Actualiza el decimoséptimo texto genérico y recalcula el valor aduanero */
  actualizarTextoGenerico17(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico17(VALOR);
    this.calcularValorAduana();
  }

  /** Actualiza el decimoctavo texto genérico y recalcula el porcentaje */
  actualizarTextoGenerico18(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico18(VALOR);
    this.calcularValorPorcentaje();
  }

  /** Actualiza el decimonoveno texto genérico y recalcula el valor comercial */
  actualizarTextoGenerico19(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico19(VALOR);
    this.calcularValorComercial();
  }

  /** Actualiza el vigésimo texto genérico y recalcula el valor aduanero */
  actualizarTextoGenerico20(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico20(VALOR);
    this.calcularValorAduana();
  }

  /** Actualiza el vigesimoprimer texto genérico y recalcula el porcentaje */
  actualizarTextoGenerico21(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud31101Store.actualizarTextoGenerico21(VALOR);
    this.calcularValorPorcentaje();
  }

  /** Actualiza el estado de la alerta 2 */
  actualizarAlerta2(evento: Event): void {
    const IS_CHECKED = (evento.target as HTMLInputElement).checked;
    this.solicitud31101Store.actualizarAlerta2(IS_CHECKED);
  }

  /** Agrega un nuevo RFC a la lista de subcontratistas */
  agregarRFCDatos(): void {
    if (this.datosGeneralesForm.get('datosGeneralesRFC')?.value) {
      this.listaDeSubcontratistas.push({
        rfc: this.datosGeneralesForm.get('datosGeneralesRFC')?.value,
        razonSocial: 'EUROFOODS DE MEXICO GONZALEZ PINAL',
      });
      this.datosGeneralesForm.patchValue({ datosGeneralesRFC: '' });
    }
  }

  /** Selecciona los datos de los subcontratistas */
  seleccionarSubContratistasDatos(evento: SubContratistas[]): void {
    this.subContratistasDatos = evento;
  }

  /** Elimina un RFC de la lista de subcontratistas */
  eliminarRFCDatos(): void {
    const PEDIMENTO = {
      patente: 0,
      pedimento: 0,
      aduana: 0,
      idTipoPedimento: 0,
      descTipoPedimento: 'Por evaluar',
      numero: '',
      comprobanteValor: '',
      pedimentoValidado: false,
    };

    if (this.subContratistasDatos.length > 0) {
      if (this.listaDeSubcontratistas.length > 0) {
        const RFC_PARA_ELIMINAR = this.subContratistasDatos[0].rfc;

        this.listaDeSubcontratistas = this.listaDeSubcontratistas.filter(
          (subcontratista) => subcontratista.rfc !== RFC_PARA_ELIMINAR
        );

        this.subContratistasDatos = [];
        this.abrirModal('El registro seleccionado fue eliminado correctamente');
        this.pedimentos.push(PEDIMENTO);
      }
    }
  }

  /**
   * Elimina un elemento de la lista de pedimentos en la posición especificada.
   *
   * @param {number} i - El índice del elemento a eliminar.
   *
   * @remarks
   * Después de eliminar el elemento, se actualiza el título y mensaje del modal,
   * y se abre el modal para mostrar un aviso al usuario.
   */
  abrirModal(mensaje: string, i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.elementoParaEliminar = i;
  }

  /** Calcula el valor comercial sumando los valores ingresados */
  calcularValorComercial(): void {
    const VALOR1 = this.datosGeneralesForm.get('textoGenerico10')?.value;
    const VALOR2 = this.datosGeneralesForm.get('textoGenerico13')?.value;
    const VALOR3 = this.datosGeneralesForm.get('textoGenerico16')?.value;
    const VALOR4 = this.datosGeneralesForm.get('textoGenerico19')?.value;

    if (VALOR1 || VALOR2 || VALOR3 || VALOR4) {
      const VALOR_COMERCIAL =
        Number(VALOR1) + Number(VALOR2) + Number(VALOR3) + Number(VALOR4);
      this.solicitud31101Store.actualizarTextoGenerico22(VALOR_COMERCIAL);
    }
  }

  /** Calcula el valor aduanero sumando los valores ingresados */
  calcularValorAduana(): void {
    const VALOR1 = this.datosGeneralesForm.get('textoGenerico11')?.value;
    const VALOR2 = this.datosGeneralesForm.get('textoGenerico14')?.value;
    const VALOR3 = this.datosGeneralesForm.get('textoGenerico17')?.value;
    const VALOR4 = this.datosGeneralesForm.get('textoGenerico20')?.value;

    if (VALOR1 || VALOR2 || VALOR3 || VALOR4) {
      const VALOR_COMERCIAL =
        Number(VALOR1) + Number(VALOR2) + Number(VALOR3) + Number(VALOR4);
      this.solicitud31101Store.actualizarTextoGenerico23(VALOR_COMERCIAL);
    }
  }

  /** Calcula el porcentaje basado en los valores ingresados */
  calcularValorPorcentaje(): void {
    const VALOR1 = this.datosGeneralesForm.get('textoGenerico12')?.value;
    const VALOR2 = this.datosGeneralesForm.get('textoGenerico15')?.value;
    const VALOR3 = this.datosGeneralesForm.get('textoGenerico18')?.value;
    const VALOR4 = this.datosGeneralesForm.get('textoGenerico21')?.value;

    if (VALOR1 || VALOR2 || VALOR3 || VALOR4) {
      const VALOR_COMERCIAL =
        Number(VALOR1) + Number(VALOR2) + Number(VALOR3) + Number(VALOR4);
      this.solicitud31101Store.actualizarTextoGenerico24(VALOR_COMERCIAL);
    }
  }

  /**
   * Elimina un elemento de la tabla de pedimento, si se confirma la acción.
   * @param borrar Indica si se debe proceder con la eliminación.
   * @returns {void}
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  eliminarPedimentoImmexNotificacion(borrar: boolean): void {
    if (borrar) {
      if (
        this.seleccionarDomiciliosDatos.length === 1 &&
        !this.seleccionarDomiciliosDatos[0].id
      ) {
        this.domiciliosDatos = this.domiciliosDatos.filter(
          (item) =>
            item.procesoProductivo !==
            this.seleccionarDomiciliosDatos[0].procesoProductivo
        );
        const PEDIMENTO = {
          patente: 0,
          pedimento: 0,
          aduana: 0,
          idTipoPedimento: 0,
          descTipoPedimento: 'Por evaluar',
          numero: '',
          comprobanteValor: '',
          pedimentoValidado: false,
        };

        this.eliminadosCorrectamenteNotificacion = {
          tipoNotificacion: 'alert',
          categoria: 'danger',
          modo: 'action',
          titulo: '',
          mensaje: 'Datos Eliminados correctamente',
          cerrar: false,
          tiempoDeEspera: 2000,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        };
        this.elementoParaEliminar = 0;
        this.pedimentos.push(PEDIMENTO);
      }
      this.seleccionarDomiciliosDatos = [];
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  eliminarCorrectamenteImmexNotificacion(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /** Muestra el modal para agregar miembros de la empresa */
  agregarMiembrosEmpresa(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /** Guarda la lista de domicilios seleccionados */
  seleccionarDomiciliosLista(evento: Domicilios[]): void {
    this.seleccionarDomiciliosDatos = evento;
  }

  /** Muestra el modal para modificar el programa IMMEX si hay domicilios seleccionados */
  modificarImmexProgram(): void {
    if (this.seleccionarDomiciliosDatos.length > 0) {
      if (this.modificarImmexProgramElement) {
        const MODAL_INSTANCE = new Modal(
          this.modificarImmexProgramElement.nativeElement
        );
        MODAL_INSTANCE.show();
      }
    }
  }

  /** Abre un modal de confirmación y agrega un pedimento si hay domicilios seleccionados */
  eliminarImmexProgram(): void {
    if (
      this.seleccionarDomiciliosDatos.length === 1 &&
      this.seleccionarDomiciliosDatos[0].id
    ) {
      const PEDIMENTO = {
        patente: 0,
        pedimento: 0,
        aduana: 0,
        idTipoPedimento: 0,
        descTipoPedimento: 'Por evaluar',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      };

      this.eliminarImmexNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: 'No puede eliminar domicilios de la SE.',
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };

      this.elementoParaEliminar = 0;
      this.pedimentos.push(PEDIMENTO);
    } else if (
      this.seleccionarDomiciliosDatos.length === 1 &&
      !this.seleccionarDomiciliosDatos[0].id
    ) {
      const PEDIMENTO = {
        patente: 0,
        pedimento: 0,
        aduana: 0,
        idTipoPedimento: 0,
        descTipoPedimento: 'Por evaluar',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      };

      this.eliminarImmexNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'danger',
        modo: 'action',
        titulo: '',
        mensaje: '¿Desea eliminar el registro seleccionado?',
        cerrar: false,
        tiempoDeEspera: 2000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: 'Cancelar',
      };
      this.elementoParaEliminar = 0;
      this.pedimentos.push(PEDIMENTO);
    }
  }

  listaDeFilaSeleccionada(evento: SeccionSociosIC[]): void {
    this.selectedListaSeccionSociosIC = evento;
  }

  eliminarMiembrosEmpresa(): void {
    if (this.selectedListaSeccionSociosIC.length === 1) {
      this.listaSeccionSociosIC = this.listaSeccionSociosIC.filter(
        (item) => item.rfc !== this.selectedListaSeccionSociosIC[0].rfc
      );
      this.selectedListaSeccionSociosIC = [];
    }
  }

  /** Guarda los datos modificados en el programa IMMEX y agrega un pedimento */
  modificarImmexValor(evento: boolean): void {
    if (evento) {
      const PEDIMENTO = {
        patente: 0,
        pedimento: 0,
        aduana: 0,
        idTipoPedimento: 0,
        descTipoPedimento: 'Por evaluar',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      };

      this.abrirModal('Datos guardados correctamente');
      this.pedimentos.push(PEDIMENTO);
    }
  }

  /** Muestra el modal para agregar un programa IMMEX */
  agregarImmexProgramModel(): void {
    if (this.agregarImmexProgramElement) {
      const MODAL_INSTANCE = new Modal(
        this.agregarImmexProgramElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
  }

  /** Agrega miembros de la empresa con detalles de inversión */
  agregarMiembrosDeLaEmpresa(): void {
    if (
      this.datosGeneralesForm.get('tipoInversion')?.value &&
      this.datosGeneralesForm.get('cantidadInversion')?.value &&
      this.datosGeneralesForm.get('descInversion')?.value
    ) {
      let TIPO_INVERSION = '';
      for (const VALOR in this.tipoDeInversionLista.catalogos) {
        if (
          this.tipoDeInversionLista.catalogos[VALOR].id ===
          this.datosGeneralesForm.get('tipoInversion')?.value
        ) {
          TIPO_INVERSION =
            this.tipoDeInversionLista.catalogos[VALOR].descripcion;
        }
      }
      const OBJETO_JSON: TipoDeInversion = {
        idRegistro: '',
        tipoInversion: TIPO_INVERSION,
        valor: this.datosGeneralesForm.get('cantidadInversion')?.value,
        descripcion: this.datosGeneralesForm.get('descInversion')?.value,
        cveTipoInversion: '',
      };
      this.tipoDeInversionDatos = [...this.tipoDeInversionDatos, OBJETO_JSON];
      this.datosGeneralesForm.get('tipoInversion')?.reset();
      this.datosGeneralesForm.get('cantidadInversion')?.reset();
      this.datosGeneralesForm.get('descInversion')?.reset();
    }
  }

  /** Selecciona datos de inversión en la tabla */
  seleccionarTipoSeleccionTabla(evento: TipoDeInversion[]): void {
    this.tipoSeleccionListo = evento;
  }

  /** Elimina miembros de la empresa seleccionados */
  eliminarMiembrosDeLaEmpresa(): void {
    const PEDIMENTO = {
      patente: 0,
      pedimento: 0,
      aduana: 0,
      idTipoPedimento: 0,
      descTipoPedimento: 'Por evaluar',
      numero: '',
      comprobanteValor: '',
      pedimentoValidado: false,
    };

    if (this.tipoSeleccionListo.length > 0) {
      this.tipoDeInversionDatos = this.tipoDeInversionDatos.filter(
        (dato) =>
          dato.tipoInversion !== this.tipoSeleccionListo[0].tipoInversion
      );

      this.tipoSeleccionListo = [];
      this.abrirModal('El registro seleccionado fue eliminado correctamente');
      this.pedimentos.push(PEDIMENTO);
    }
  }

  /** Actualiza los datos de un miembro de la empresa */
  eventoActualizarMiembro(evento: SeccionSociosIC): void {
    this.listaSeccionSociosIC.push(evento);
    const PEDIMENTO = {
      patente: 0,
      pedimento: 0,
      aduana: 0,
      idTipoPedimento: 0,
      descTipoPedimento: 'Por evaluar',
      numero: '',
      comprobanteValor: '',
      pedimentoValidado: false,
    };
    this.abrirModal('Datos guardados correctamente.');
    this.pedimentos.push(PEDIMENTO);
  }

  /** Agrega información de domicilio */
  agregarImmexValor(evento: Domicilios): void {
    this.domiciliosDatos = [...this.domiciliosDatos, evento];
  }

  /**
   * Verifica si un campo del formulario no es válido.
   * @param id Identificador del campo en el formulario.
   * @returns true si el campo es inválido y ha sido tocado, de lo contrario undefined.
   */
  noEsValido(id: string): boolean | undefined {
    const CONTROL = this.datosGeneralesForm.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  /** Se ejecuta al destruir el componente */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
