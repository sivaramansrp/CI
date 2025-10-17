import {
  AvisoOpcionesDeRadio,
  ResiduoPeligroso,
} from '../../models/aviso-catalogo.model';
import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  REGEX_POSTAL,
  TablaDinamicaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  RadioOpcion,
  SolicitudJson,
} from '@libs/shared/data-access-user/src/core/models/231002/solicitud.model';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoT231002Service } from '../../services/catalogo-t231002.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { DatoSolicitudQuery } from '../../estados/queries/dato-solicitud.query';
import { DatoSolicitudStore } from '../../estados/tramites/dato-solicitud.store';
import { DatosResiduosPeligrososComponent } from '../datos-residuos-peligrosos/datos-residuos-peligrosos.component';
import { ES_CONTROL_INVALIDO } from '../../../../shared/helpers';
import { EstadoDatoSolicitud } from '../../models/datos-solicitud.model';
import { ImmexResponse } from '../../../231001/models/catalogo-response';
import { MercanciasDesmontadasOSinMontarService } from '../../services/mercancias-desmontadas-o-sin-montar.service';
import { Modal } from 'bootstrap';
import { TEXTOS } from '../../constantes/aviso-retorno.enum';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';
import rawData from '@libs/shared/theme/assets/json/231002/solicitud.json';

/**
 * Constante que contiene las opciones de radio y demás datos del archivo JSON.
 */
const RADIO_OPCIONES = rawData as SolicitudJson;

/**
 * Componente que gestiona los datos de la solicitud para el proceso de reciclaje.
 *
 * Maneja múltiples formularios para capturar información sobre:
 * - Solicitud principal
 * - Empresa recicladora
 * - Lugar de reciclaje
 * - Empresa transportista
 * - Precauciones de manejo
 *
 * Integra con estado global mediante stores y queries para persistencia de datos.
 */
@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    InputRadioComponent,
    DatosResiduosPeligrososComponent,
  ],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss',
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Indica si el formulario actual es válido.
   */
  esControlInvalido = ES_CONTROL_INVALIDO;

  /** Indica si el formulario es válido */
  @Input() esFormValido!: boolean;

  /** Referencia al elemento modal para agregar mercancías */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /** Formulario principal de la solicitud */
  solicitudForm!: FormGroup;

  /** Formulario para datos de empresa recicladora */
  formularioEmpresaReciclaje!: FormGroup;

  /** Formulario para datos del lugar de reciclaje */
  formularioLugarReciclaje!: FormGroup;

  /** Formulario para datos de empresa transportista */
  formularioEmpresaTransportista!: FormGroup;

  /** Formulario para precauciones de manejo */
  formularioPrecaucionesManejo!: FormGroup;

  formularioDatosDestinatario!: FormGroup;

  /** Opciones de radio obtenidas del JSON estático */
  radioOptions: RadioOpcion[] = RADIO_OPCIONES?.radioOptions;

  /** Subject para gestionar la destrucción de suscripciones */
  private destroyed$ = new Subject<void>();

  /** Opciones de radio para avisos dinámicos */
  avisoOpcionesDeRadio: AvisoOpcionesDeRadio = {} as AvisoOpcionesDeRadio;

  /** Tipo de aviso actualmente seleccionado */
  tipoAviso: string | number = 'por defecto';

  /** Textos estáticos para la interfaz de usuario */
  TEXTOS = TEXTOS;

  /** Etiquetas y configuraciones de formulario desde JSON */
  etiquetasForm = RADIO_OPCIONES;

  /** Estado actual de la consulta (lectura/edición) */
  public consultaState!: ConsultaioState;

  /** Bandera que indica si el formulario es de solo lectura */
  public esFormularioSoloLectura: boolean = false;

  /** Configuración de columnas para la tabla dinámica */
  configuracionTabla: ConfiguracionColumna<ResiduoPeligroso>[] = [];

  /** Datos para la tabla dinámica */
  datosTabla: ResiduoPeligroso[] = [];

  /** Enum de tipos de selección de tabla para uso en template */
  TablaSeleccion = TablaSeleccion;

  /** Lista de índices de filas seleccionadas en la tabla */
  filasSeleccionadas: Set<number> = new Set();

  /** catalogo immex para llenar el combo */
  immexCatalogo: Catalogo[] = [];

  /** Getter para verificar si hay filas seleccionadas */
  get hayFilasSeleccionadas(): boolean {
    return this.filasSeleccionadas.size > 0;
  }

  /**
   * Constructor para inyección de dependencias.
   *
   * @param fb - FormBuilder para construir formularios reactivos.
   * @param datoSolicitudStore - Store para persistir cambios locales del formulario.
   * @param datoSolicitudQuery - Query para leer el estado actual del store.
   * @param consultaQuery - Query que provee el estado de solo lectura/edición de la aplicación.
   * @param mercanciasDesmontadasOSinMontarService - Servicio que provee opciones de radio y catálogos.
   *
   * El constructor además inicializa la carga de opciones de radio llamando a obtenerAvisoOpcionesDeRadio().
   */
  constructor(
    public fb: FormBuilder,
    private datoSolicitudStore: DatoSolicitudStore,
    private datoSolicitudQuery: DatoSolicitudQuery,
    private consultaQuery: ConsultaioQuery,
    public mercanciasDesmontadasOSinMontarService: MercanciasDesmontadasOSinMontarService,
    private catalogosService: CatalogoT231002Service
  ) {
    this.obtenerAvisoOpcionesDeRadio();
  }

  /**
   * Inicialización del componente:
   * - Crea formularios
   * - Recupera estado guardado
   * - Configura suscripción para estado de solo lectura
   */
  ngOnInit(): void {
    this.inicializarSolicitudForm();
    this.inicializarFormularioEmpresaReciclaje();
    this.inicializarFormularioLugarReciclaje();
    this.inicializarFormularioEmpresaTransportista();
    this.inicializarFormularioPrecaucionesManejo();
    this.inicializarConfiguracionTabla();
    this.recuperarValoresDesdeStore();
    this.configurarSuscripcionEstadoConsulta();
    this.obtenerDatosImmex();
    this.validaEsFormularioValido();
  }

  /**
   * Valida si el formulario es válido y marca los campos como tocados si no lo es.
   */
  validaEsFormularioValido(): void {
    if (!this.esFormValido) {
      this.marcarCamposComoTocados();
    }
  }

  /**
   * Configura la suscripción al estado de consulta para controlar modo lectura/edición
   */
  private configurarSuscripcionEstadoConsulta(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.consultaState = seccionState;
          this.esFormularioSoloLectura = seccionState.readonly;
          this.actualizarEstadoFormularios();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el formulario principal de solicitud con validadores
   */
  private inicializarSolicitudForm(): void {
    this.solicitudForm = this.fb.group({
      ideGenerica1: ['primera_vez', Validators.required],
      numeroRegistroAmbiental: ['', Validators.required],
      descripcionGenerica1: ['', Validators.required],
      numeroProgramaImmex: ['', Validators.required],
      domicilio: ['', Validators.required],
    });
  }

  /**
   * Valida todos los formularios y la existencia de al menos una fila en la tabla.
   * Marca los campos como tocados si la validación falla.
   *
   * @returns true si todos los formularios son válidos y existen datos en la tabla; false en caso contrario.
   */
  validarFormulario(): boolean {
    const IS_VALID =
      this.solicitudForm.valid &&
      this.formularioEmpresaReciclaje.valid &&
      this.formularioLugarReciclaje.valid &&
      this.formularioEmpresaTransportista.valid &&
      this.formularioPrecaucionesManejo.valid &&
      this.datosTabla.length > 0;

    if (!IS_VALID) {
      this.marcarCamposComoTocados();
    }

    return IS_VALID;
  }

  /**
   * Marca todos los campos relevantes como "touched" para forzar la aparición
   * de mensajes de validación en la UI.
   *
   * Se usa cuando la validación global falla para que el usuario identifique
   * los campos que requieren atención.
   */
  marcarCamposComoTocados(): void {
    this.solicitudForm.markAllAsTouched();
    this.formularioEmpresaReciclaje.markAllAsTouched();
    this.formularioLugarReciclaje.markAllAsTouched();
    this.formularioEmpresaTransportista.markAllAsTouched();
    this.formularioPrecaucionesManejo.markAllAsTouched();
  }

  /**
   * Inicializa el formulario de empresa recicladora con validadores
   */
  private inicializarFormularioEmpresaReciclaje(): void {
    this.formularioEmpresaReciclaje = this.fb.group({
      requiereEmpresa: ['', Validators.required],
      nombreEmpresa: ['', Validators.required],
      representanteLegal: ['', Validators.required],
      telefono: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Inicializa el formulario de lugar de reciclaje con validadores
   */
  private inicializarFormularioLugarReciclaje(): void {
    this.formularioLugarReciclaje = this.fb.group({
      razonSocial: ['', Validators.required],
      pais: ['', Validators.required],
      destinoDomicilio: ['', Validators.required],
      codigoPostal: [
        '',
        [
          Validators.required,
          Validators.pattern(REGEX_POSTAL),
          Validators.maxLength(8),
        ],
      ],
    });
  }

  /**
   * Inicializa el formulario de empresa transportista con validadores
   */
  private inicializarFormularioEmpresaTransportista(): void {
    this.formularioEmpresaTransportista = this.fb.group({
      nombreEmpresaTransportistaResiduos: ['', Validators.required],
      numeroAutorizacionSemarnat: ['', Validators.required],
    });
  }

  /**
   * Inicializa el formulario de precauciones de manejo con validadores
   */
  private inicializarFormularioPrecaucionesManejo(): void {
    this.formularioPrecaucionesManejo = this.fb.group({
      clave: ['', Validators.required],
      precaucionesManejo: ['', Validators.required],
    });
  }

  /**
   * Inicializa la configuración de la tabla dinámica
   */
  private inicializarConfiguracionTabla(): void {
    // Configuración de columnas para la tabla dinámica de residuos peligrosos
    this.configuracionTabla = [
      {
        encabezado: 'Orígen del residuo',
        clave: (item: ResiduoPeligroso): string => item.origenResiduoGeneracion,
        orden: 1,
      },
      {
        encabezado: 'Fracción Arancelaria',
        clave: (item: ResiduoPeligroso): string => item.fraccionName,
        orden: 2,
      },
      {
        encabezado: 'NICO',
        clave: (item: ResiduoPeligroso): string => item.nicoName,
        orden: 3,
      },
      {
        encabezado: 'Acotación',
        clave: (item: ResiduoPeligroso): string => item.acotacion,
        orden: 4,
      },
      {
        encabezado: 'Nombre Residuo Peligroso',
        clave: (item: ResiduoPeligroso): string => item.nombreResiduoPeligroso,
        orden: 5,
      },
      {
        encabezado: 'Cantidad',
        clave: (item: ResiduoPeligroso): string => item.cantidad,
        orden: 6,
      },
      {
        encabezado: 'Cantidad letra',
        clave: (item: ResiduoPeligroso): string => item.cantidadLetra,
        orden: 7,
      },
      {
        encabezado: 'Unidad de medida',
        clave: (item: ResiduoPeligroso): string => item.unidadMedidaName,
        orden: 8,
      },
      {
        encabezado: 'Clave Clasificación',
        clave: (item: ResiduoPeligroso): string => item.nombreClasificacion,
        orden: 9,
      },
      {
        encabezado: 'Nombre Clasificación',
        clave: (item: ResiduoPeligroso): string => item.claveClasificacionDesc,
        orden: 10,
      },
      {
        encabezado: 'Descripción clasificación',
        clave: (item: ResiduoPeligroso): string =>
          item.descripcionClasificacion,
        orden: 11,
      },
      {
        encabezado: 'Descripción otro Clasificación',
        clave: (item: ResiduoPeligroso): string =>
          item.descripcionOtraClasificacion,
        orden: 12,
      },
      {
        encabezado: 'CRETI',
        clave: (item: ResiduoPeligroso): string => item.cretiDesc,
        orden: 13,
      },
      {
        encabezado: 'Estado físico',
        clave: (item: ResiduoPeligroso): string => item.estadoFisicoDesc,
        orden: 14,
      },
      {
        encabezado: 'Descripción otro estado físico',
        clave: (item: ResiduoPeligroso): string =>
          item.descripcionOtroEstadoFisico,
        orden: 15,
      },
      {
        encabezado: 'No. de manifiesto',
        clave: (item: ResiduoPeligroso): string => item.numeroManifiesto,
        orden: 16,
      },
      {
        encabezado: 'Tipo de contenedor',
        clave: (item: ResiduoPeligroso): string => item.tipoContenedorDesc,
        orden: 17,
      },
      {
        encabezado: 'Descripción otro contenedor',
        clave: (item: ResiduoPeligroso): string =>
          item.descripcionOtroContenedor,
        orden: 18,
      },
      {
        encabezado: 'Capacidad',
        clave: (item: ResiduoPeligroso): string => item.capacidad,
        orden: 19,
      },
    ];
  }

  /**
   * Maneja cambios en el campo "requiereEmpresa" para habilitar/deshabilitar campos relacionados
   * @param valor Valor seleccionado ('Si' o 'No')
   */
  onRequiereEmpresaChange(valor: string): void {
    const DEBE_HABILITAR = valor === 'Si';
    const CAMPOS = [
      'nombreEmpresa',
      'representanteLegal',
      'telefono',
      'correoElectronico',
    ];

    CAMPOS.forEach((campo) => {
      const CONTROL = this.formularioEmpresaReciclaje.get(campo);
      if (CONTROL) {
        if (DEBE_HABILITAR) {
          CONTROL.enable();
        } else {
          CONTROL.disable();
        }
      }
    });
  }

  /**
   * Recupera valores guardados en el store y los aplica a los formularios
   */
  private recuperarValoresDesdeStore(): void {
    const ESTADO = this.datoSolicitudQuery.getValue();
    this.datosTabla = ESTADO.residuos ? [...ESTADO.residuos] : [];
    this.solicitudForm.patchValue(ESTADO.solicitudForm, { emitEvent: false });
    this.formularioEmpresaReciclaje.patchValue(ESTADO.empresaReciclaje, {
      emitEvent: false,
    });
    this.formularioLugarReciclaje.patchValue(ESTADO.lugarReciclaje, {
      emitEvent: false,
    });
    this.formularioEmpresaTransportista.patchValue(
      ESTADO.empresaTransportista,
      { emitEvent: false }
    );
    this.formularioPrecaucionesManejo.patchValue(ESTADO.precaucionesManejo, {
      emitEvent: false,
    });
  }

  /**
   * Actualiza un campo específico del formulario principal en el store
   * @param campo Nombre del campo a actualizar
   */
  actualizarCampoSolicitudForm(
    campo: keyof EstadoDatoSolicitud['solicitudForm']
  ): void {
    const VALOR = this.solicitudForm.get(campo)?.value;
    this.datoSolicitudStore.actualizarSolicitudForm({
      ...this.solicitudForm.getRawValue(),
      [campo]: VALOR,
    });
  }

  /**
   * Actualiza un campo específico del formulario de empresa recicladora en el store
   * @param campo Nombre del campo a actualizar
   */
  actualizarCampoEmpresaReciclaje(
    campo: keyof EstadoDatoSolicitud['empresaReciclaje']
  ): void {
    const VALOR = this.formularioEmpresaReciclaje.get(campo)?.value;

    if (campo === 'requiereEmpresa') {
      this.onRequiereEmpresaChange(VALOR);
    }

    this.datoSolicitudStore.actualizarEmpresaReciclaje({
      ...this.formularioEmpresaReciclaje.getRawValue(),
      [campo]: VALOR,
    });
  }

  /**
   * Actualiza un campo específico del formulario de empresa transportista en el store
   * @param campo Nombre del campo a actualizar
   */
  actualizarCampoEmpresaTransportista(
    campo: keyof EstadoDatoSolicitud['empresaTransportista']
  ): void {
    const VALOR = this.formularioEmpresaTransportista.get(campo)?.value;
    this.datoSolicitudStore.actualizarEmpresaTransportista({
      ...this.formularioEmpresaTransportista.getRawValue(),
      [campo]: VALOR,
    });
  }

  /**
   * Actualiza un campo específico del formulario de precauciones en el store
   * @param campo Nombre del campo a actualizar
   */
  actualizarCampoPrecaucionesManejo(
    campo: keyof EstadoDatoSolicitud['precaucionesManejo']
  ): void {
    const VALOR = this.formularioPrecaucionesManejo.get(campo)?.value;
    this.datoSolicitudStore.actualizarPrecaucionesManejo({
      ...this.formularioPrecaucionesManejo.getRawValue(),
      [campo]: VALOR,
    });
  }

  /**
   * Muestra el modal para agregar operaciones de importación
   */
  agregarOperacionImp(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Establece el tipo de aviso seleccionado
   * @param evento Valor del tipo de aviso
   */
  setTipoDeAviso(evento: string | number): void {
    this.tipoAviso = evento;
  }

  /**
   * Obtiene opciones de radio para avisos desde el servicio
   */
  obtenerAvisoOpcionesDeRadio(): void {
    this.mercanciasDesmontadasOSinMontarService
      .obtenerAvisoOpcionesDeRadio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: AvisoOpcionesDeRadio) => {
          this.avisoOpcionesDeRadio = respuesta;
        },
      });
  }

  /**
   * Actualiza el estado de habilitación de los formularios según el modo (lectura/edición)
   */
  private actualizarEstadoFormularios(): void {
    if (this.esFormularioSoloLectura) {
      this.deshabilitarFormularios();
    } else {
      this.habilitarFormularios();
    }
  }

  /**
   * Deshabilita todos los formularios para modo de solo lectura
   */
  private deshabilitarFormularios(): void {
    this.solicitudForm.disable();
    this.formularioEmpresaReciclaje.disable();
    this.formularioLugarReciclaje.disable();
    this.formularioEmpresaTransportista.disable();
    this.formularioPrecaucionesManejo.disable();
  }

  /**
   * Habilita todos los formularios para modo de edición
   */
  private habilitarFormularios(): void {
    this.solicitudForm.enable();
    this.formularioEmpresaReciclaje.enable();
    this.formularioLugarReciclaje.enable();
    this.formularioEmpresaTransportista.enable();
    this.formularioPrecaucionesManejo.enable();
  }

  /**
   * Maneja el evento cuando se agrega un residuo peligroso desde el modal
   * @param residuoData Datos del residuo peligroso agregado
   */
  onResiduoAgregado(residuoData: ResiduoPeligroso): void {
    // Agregar el nuevo residuo directamente a los datos de la tabla
    this.datosTabla = [...this.datosTabla, residuoData];
    this.datoSolicitudStore.actualizarResiduosPeligrosos(this.datosTabla);
  }

  /**
   * Maneja la selección de filas en la tabla dinámica
   * @param filasSeleccionadas Array de elementos seleccionados
   */
  onFilasSeleccionadas(filasSeleccionadas: ResiduoPeligroso[]): void {
    // Limpiar selecciones previas
    this.filasSeleccionadas.clear();

    // Encontrar los índices de las filas seleccionadas
    filasSeleccionadas.forEach((filaSeleccionada) => {
      const INDEX = this.datosTabla.findIndex(
        (fila) =>
          fila.nico === filaSeleccionada.nico &&
          fila.fraccionArancelaria === filaSeleccionada.fraccionArancelaria &&
          fila.numeroManifiesto === filaSeleccionada.numeroManifiesto
      );
      if (INDEX !== -1) {
        this.filasSeleccionadas.add(INDEX);
      }
    });
  }

  /**
   * Borra las filas seleccionadas de la tabla
   */
  borrarFilasSeleccionadas(): void {
    if (this.filasSeleccionadas.size === 0) {
      return;
    }

    // Convertir a array y ordenar de mayor a menor para eliminar correctamente
    const INDICES_A_ELIMINAR = Array.from(this.filasSeleccionadas).sort(
      (a, b) => b - a
    );

    INDICES_A_ELIMINAR.forEach((index) => {
      this.datosTabla.splice(index, 1);
    });

    // Limpiar selecciones
    this.filasSeleccionadas.clear();

    // Forzar actualización de la tabla
    this.datosTabla = [...this.datosTabla];
  }

  /**
   * Actualiza un campo específico del formulario de lugar de reciclaje en el store.
   *
   * @param campo - Nombre del campo a actualizar dentro de `lugarReciclaje`.
   *
   * Toma el valor actual del control correspondiente y lo persiste en el store.
   */
  actualizarDatosDestinatario(
    campo: keyof EstadoDatoSolicitud['lugarReciclaje']
  ): void {
    const VALOR = this.formularioLugarReciclaje.get(campo)?.value;

    this.datoSolicitudStore.actualizarLugarReciclaje({
      ...this.formularioLugarReciclaje.getRawValue(),
      [campo]: VALOR,
    });
  }

  /**
   * Obtiene los datos IMMEX desde el servicio y los asigna al catálogo correspondiente.
   * Se utiliza un RFC estático para pruebas en lo que se termina el servicio de autenticación.
   */
  obtenerDatosImmex(): void {
    this.catalogosService
      .obtenerDatosImmexByRfc('AAL0409235E6')
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.immexCatalogo = data.datos.map((item: ImmexResponse) => ({
          id: item.id_prog_autorizado,
          descripcion: item.num_folio_tramite,
        }));
      });
  }

  /**
   * Limpieza al destruir el componente:
   * - Completa los subjects de destrucción
   * - Cancela suscripciones activas
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
