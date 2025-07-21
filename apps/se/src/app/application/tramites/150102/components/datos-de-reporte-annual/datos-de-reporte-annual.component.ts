import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConfiguracionAporteColumna,
  ConfiguracionColumna,
  Notificacion,
  NotificacionesComponent,
  Pedimento,
  TablaCampoSeleccion,
  TablaConEntradaComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MENSAJES_EXPORTACIONES_TOTALS,
  MENSAJES_VENTAS_TOTALES,
} from '../../constantes/solicitud150102.enum';
import {
  Solicitud150102State,
  Solicitud150102Store,
} from '../../estados/solicitud150102.store';
import { Subject, map, takeUntil } from 'rxjs';
import { BienesProducidos } from '../../models/programas-reporte.model';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from "@ng-mf/data-access-user";
import { Solicitud150102Query } from '../../estados/solicitud150102.query';
import { SolicitudService } from '../../services/solicitud.service';

/**
 * @description Componente que administra los datos del reporte anual y realiza cálculos relevantes.
 * Permite la visualización y edición de bienes producidos, ventas totales, exportaciones e importaciones.
 */
@Component({
  selector: 'app-datos-de-reporte-annual',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaConEntradaComponent,
    TablaDinamicaComponent,
    NotificacionesComponent,
  ],
  templateUrl: './datos-de-reporte-annual.component.html',
  styleUrl: './datos-de-reporte-annual.component.scss',
})
/**
 * @description Componente que administra los datos del reporte anual y realiza cálculos relevantes.
 * Permite la visualización y edición de bienes producidos, ventas totales, exportaciones e importaciones.
 */
export class DatosDeReporteAnnualComponent implements OnInit, OnDestroy {
  /**
   * Identificador del índice o fila seleccionada de los bienes producidos.
   * Se utiliza para marcar la selección en la tabla correspondiente.
   */
  bienesProducidosSelection!: number;

  /**
   * Identificador del índice o fila seleccionada en el listado de producidos.
   * Se utiliza para controlar la fila activa o marcada por el usuario.
   */
  producidosSelection!: number;

  /** Formulario reactivo para gestionar los datos del reporte anual */
  formReporteAnnual!: FormGroup;

  /** Estado de la solicitud utilizado para almacenar datos */
  solicitud150102State: Solicitud150102State = {} as Solicitud150102State;

  /** Observable utilizado para la destrucción de suscripciones */
  private destroyed$ = new Subject<void>();

  /** Tipo de selección de tabla: Radio */
  producidosSeleccionTabla = TablaSeleccion.RADIO;

  /** Lista de bienes producidos */
  producidosDatos: BienesProducidos[] = [];

  /** Configuración de la tabla de bienes producidos */
  producidosConfiguracionTabla: ConfiguracionAporteColumna<BienesProducidos>[] =
    [
      {
        encabezado: 'Clave sector',
        llave: 'claveSector',
        clave: (item: BienesProducidos) => item.claveSector,
        opcionDeEntrada: TablaCampoSeleccion.NONE,
        orden: 1,
        longitudMaxima: 0,
      },
      {
        encabezado: 'sector ',
        llave: 'sector',
        clave: (item: BienesProducidos) => item.sector,
        opcionDeEntrada: TablaCampoSeleccion.NONE,
        orden: 2,
        longitudMaxima: 0,
      },
      {
        encabezado: 'Fracción arancelaria',
        llave: 'fraccion',
        clave: (item: BienesProducidos) => item.fraccion,
        opcionDeEntrada: TablaCampoSeleccion.INPUT,
        orden: 3,
        longitudMaxima: 8,
      },
      {
        encabezado: 'Bienes producidos',
        llave: 'bienProducido',
        clave: (item: BienesProducidos) => item.bienProducido,
        opcionDeEntrada: TablaCampoSeleccion.INPUT,
        orden: 4,
        longitudMaxima: 250,
      },
      {
        encabezado: 'Volumen del total de bienes producidos',
        llave: 'totalBienesProducidos',
        clave: (item: BienesProducidos) => item.totalBienesProducidos,
        opcionDeEntrada: TablaCampoSeleccion.INPUT,
        orden: 5,
        longitudMaxima: 16,
      },
      {
        encabezado: 'Volumen del mercado nacional',
        llave: 'mercadoNacional',
        clave: (item: BienesProducidos) => item.mercadoNacional,
        opcionDeEntrada: TablaCampoSeleccion.INPUT,
        orden: 6,
        longitudMaxima: 16,
      },
      {
        encabezado: 'Volumen de exportaciones',
        llave: 'exportaciones',
        clave: (item: BienesProducidos) => item.exportaciones,
        opcionDeEntrada: TablaCampoSeleccion.INPUT,
        orden: 7,
        longitudMaxima: 16,
      },
    ];

  /** Instancia de bienes producidos seleccionada */
  bienesProducidos: BienesProducidos = {} as BienesProducidos;

  /** Tipo de selección de tabla: Radio */
  bienesProducidosSeleccionTabla = TablaSeleccion.RADIO;

  /** Lista de datos de bienes producidos */
  bienesProducidosDatos: BienesProducidos[] = [];

  /** Configuración de la tabla de bienes producidos */
  bienesProducidosConfiguracionTabla: ConfiguracionColumna<BienesProducidos>[] =
    [
      {
        encabezado: 'Bienes producidos',
        clave: (item: BienesProducidos) => item.bienProducido,
        orden: 1,
      },
      {
        encabezado: 'Clave sector ',
        clave: (item: BienesProducidos) => item.claveSector,
        orden: 2,
      },
      {
        encabezado: 'Fracción arancelaria',
        clave: (item: BienesProducidos) => item.fraccion,
        orden: 3,
      },
      {
        encabezado: 'Unidad de medida',
        clave: (item: BienesProducidos) => item.unidadMedida,
        orden: 4,
      },
      {
        encabezado: 'Volumen del total de bienes producidos',
        clave: (item: BienesProducidos) => item.totalBienesProducidos,
        orden: 5,
      },
      {
        encabezado: 'Volumen del mercado nacional',
        clave: (item: BienesProducidos) => item.mercadoNacional,
        orden: 6,
      },
      {
        encabezado: 'Volumen de exportaciones',
        clave: (item: BienesProducidos) => item.exportaciones,
        orden: 7,
      },
    ];

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Objeto que representa una nueva notificación a mostrar al usuario.
   * Puede incluir información como el tipo, mensaje, duración, etc.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   *  Índice del pedimento marcado para eliminación.
   * */
  public elementoParaEliminar!: number;

  /**
   *  Arreglo que contiene los pedimentos registrados.
   */
  public pedimentos: Array<Pedimento> = [];

  /**
   * Lista de mensajes de validación que se muestran al usuario.
   * Contiene errores de formulario u otras advertencias generadas dinámicamente.
   */
  mensajesDeValidacion: string[] = [];

  /**
   * @description Constructor que inicializa las dependencias necesarias.
   * @param fb Instancia del FormBuilder para la creación de formularios reactivos.
   * @param solicitud150102Store Store que maneja el estado de la solicitud.
   * @param solicitud150102Query Query para seleccionar datos de la solicitud.
   * @param solicitudService Servicio para obtener datos de la solicitud.
   */
  constructor(
    public fb: FormBuilder,
    public solicitud150102Store: Solicitud150102Store,
    public solicitud150102Query: Solicitud150102Query,
    public solicitudService: SolicitudService,
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
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * @description Método que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo y sincroniza datos con el estado actual.
   */
  ngOnInit(): void {
    this.obtenerProducidosDatos();
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
      this.formReporteAnnual.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formReporteAnnual.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Inicializa el formulario `formReporteAnnual` con los datos del estado actual `solicitud150102State`.
   *
   * - Establece valores iniciales para ventas, exportaciones, importaciones, saldo y porcentaje de exportación.
   * - Aplica validaciones de longitud máxima a los campos numéricos editables.
   * - Escucha cambios en el estado para mantener el formulario actualizado en tiempo real.
   */
  inicializarFormulario(): void {
    this.formReporteAnnual = this.fb.group({
      ventasTotales: [
        { value: this.solicitud150102State.ventasTotales, disabled: false },
        [Validators.maxLength(16)],
      ],
      totalExportaciones: [
        {
          value: this.solicitud150102State.totalExportaciones,
          disabled: false,
        },
        [Validators.maxLength(16)],
      ],
      totalImportaciones: [
        {
          value: this.solicitud150102State.totalImportaciones,
          disabled: true,
        },
        [Validators.maxLength(16)],
      ],
      saldo: [{ value: this.solicitud150102State.saldo, disabled: true }],
      porcentajeExportacion: [
        {
          value: this.solicitud150102State.porcentajeExportacion,
          disabled: true,
        },
      ],
    });

    this.solicitud150102Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((respuesta: Solicitud150102State) => {
          this.solicitud150102State = respuesta;
          this.formReporteAnnual.patchValue({
            ventasTotales: this.solicitud150102State.ventasTotales,
            totalExportaciones: this.solicitud150102State.totalExportaciones,
            totalImportaciones: this.solicitud150102State.totalImportaciones,
            saldo: this.solicitud150102State.saldo,
            porcentajeExportacion:
              this.solicitud150102State.porcentajeExportacion,
          });
          this.producidosDatos = this.solicitud150102State.producidosDatos;
          this.bienesProducidosDatos =
            this.solicitud150102State.bienesProducidosDatos;
        })
      )
      .subscribe();
  }

  /**
   * @description Método que obtiene datos de bienes producidos y actualiza el estado con una lista única.
   */
  obtenerProducidosDatos(): void {
    this.solicitudService
      .obtenerProducidosDatos()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: BienesProducidos[]) => {
          const MATRIZ_JSON = [
            ...this.solicitud150102State.producidosDatos,
            ...respuesta.filter(
              (item) =>
                !this.solicitud150102State.producidosDatos.some(
                  (existing) => existing.claveSector === item.claveSector
                )
            ),
          ];
          this.solicitud150102Store.actualizarProducidosDatos(MATRIZ_JSON);
        },
      });
  }

  /**
   * @description Método para obtener y actualizar las ventas totales.
   * @param evento Evento de entrada con el valor ingresado.
   */
  obtenerVentasTotales(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud150102Store.actualizarVentasTotales(VALOR);
    this.calcularReporteAnnual();
  }

  /**
   * @description Método para obtener y actualizar el total de exportaciones.
   * @param evento Evento de entrada con el valor ingresado.
   */
  obtenerTotalExportaciones(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud150102Store.actualizarTotalExportaciones(VALOR);
    this.calcularReporteAnnual();
  }

  /**
   * Valida que el total de exportaciones no sea mayor que las ventas totales.
   * También verifica que ambos campos estén completos.
   *
   * - Si alguno de los campos es inválido, se agrega un mensaje a `mensajesDeValidacion`.
   * - Si las exportaciones superan a las ventas totales, se abre un modal de advertencia.
   *
   * @returns `true` si los valores son válidos, de lo contrario `false`.
   */
  validarTotalExportaciones(): boolean {
    this.mensajesDeValidacion = [];
    const VENTASTOTALES = this.formReporteAnnual.get('ventasTotales')?.value;
    if (!VENTASTOTALES) {
      this.mensajesDeValidacion.push(MENSAJES_VENTAS_TOTALES);
      return false;
    }
    const EXPORTACIONESTOTALS =
      this.formReporteAnnual.get('totalExportaciones')?.value;
    if (!EXPORTACIONESTOTALS) {
      this.mensajesDeValidacion.push(MENSAJES_EXPORTACIONES_TOTALS);
      return false;
    }
    if (Number(VENTASTOTALES) < Number(EXPORTACIONESTOTALS)) {
      this.abrirModal();
      return false;
    }
    return true;
  }

  /**
   * @description Método para obtener y actualizar el total de importaciones.
   * @param evento Evento de entrada con el valor ingresado.
   */
  obtenerTotalImportaciones(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud150102Store.actualizarTotalImportaciones(VALOR);
    this.calcularReporteAnnual();
  }

  /**
   * @description Selecciona una fila y actualiza los bienes producidos en el estado.
   * @param evento Objeto seleccionado de bienes producidos.
   */
  seleccionarFilaDeEntrada(evento: BienesProducidos): void {
    this.bienesProducidos = evento;
    const OBJETO_JSON = [this.bienesProducidos];
    this.solicitud150102Store.actualizarProducidosDatos(OBJETO_JSON);
  }

  /**
   * Reinicia la selección de fila de bienes producidos si el arreglo recibido no está vacío.
   *
   * @param evento - Lista de bienes producidos seleccionados desde la tabla de entrada.
   */
  seleccionarBienesFilaDeEntrada(evento: BienesProducidos[]): void {
    if (evento.length > 0) {
      this.bienesProducidosSelection = -1;
    }
  }

  /**
   * @description Método para agregar nuevos bienes producidos si no existen en la lista.
   */
  agregarBienesProducidos(): void {
    if (
      this.bienesProducidos &&
      Object.keys(this.bienesProducidos)?.length > 0
    ) {
      const EXISTE = this.bienesProducidosDatos.some(
        (item) => item.claveSector === this.bienesProducidos.claveSector
      );
      if (!EXISTE) {
        this.bienesProducidosDatos = [
          ...this.bienesProducidosDatos,
          this.bienesProducidos,
        ];
      }
      this.producidosSelection = -1;
      this.solicitud150102Store.actualizarBienesProducidosDatos(
        this.bienesProducidosDatos
      );
    }
  }

  /**
   * @description Calcula y actualiza el saldo y porcentaje de exportación en el reporte anual.
   */
  calcularReporteAnnual(): void {
    const TOTAL_EXPORTACIONES =
      parseFloat(this.formReporteAnnual.get('totalExportaciones')?.value) || 0;
    const VENTAS_TOTALES =
      parseFloat(this.formReporteAnnual.get('ventasTotales')?.value) || 0;
    const TOTAL_IMPORTACIONES =
      parseFloat(this.formReporteAnnual.get('totalImportaciones')?.value) || 0;
    const TOTAL_PORCENTAJE: number =
      (TOTAL_EXPORTACIONES / VENTAS_TOTALES) * 100;
    const TOTAL_PORCENTAJE_VALUE = Number.isFinite(TOTAL_PORCENTAJE)
      ? TOTAL_PORCENTAJE.toString()
      : '0';
    this.solicitud150102Store.actualizarPorcentajeExportacion(
      TOTAL_PORCENTAJE_VALUE
    );
    const TOTAL_SALDO: number = TOTAL_EXPORTACIONES - TOTAL_IMPORTACIONES;
    this.solicitud150102Store.actualizarSaldo(TOTAL_SALDO.toString());
  }

  /**
 * Abre el modal de confirmación para eliminar un pedimento.
 * 
 * @param i Índice del elemento a eliminar. Valor predeterminado: 0.
 */
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        'Las Ventas Totales deben ser mayores o iguales al Total de Exportaciones.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    this.elementoParaEliminar = i;
  }

  /**
   * Elimina un pedimento si el usuario ha confirmado la acción.
   * 
   * @param borrar Valor booleano que indica si se debe proceder con la eliminación.
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * Reinicia la selección de bienes producidos.
   */
  eliminarBienesProducidos(): void {
    this.bienesProducidosSelection = -1;
  }

  /**
   * @description Método que se ejecuta cuando el componente se destruye.
   * Emite un valor en el observable `destroyed$` para completar todas las suscripciones activas
   * y liberar recursos asociados al componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(); // Notifica a las suscripciones que deben finalizar
    this.destroyed$.complete(); // Completa el Subject para evitar fugas de memoria
  }
}
