import {
  CLASIFICACION_NALADISA_1993_IDS,
  CLASIFICACION_NALADISA_1996_IDS,
  CLASIFICACION_NALADISA_2002_IDS,
  CLASIFICACION_NALADI_IDS,
  CRITERIO_PARA_CLASIFICATION,
  CRITERIO_PARA_CONFERIR_ORIGEN_IDS,
  CRITERIO_PARA_TRATO_PREFERENCIAL_IDS,
  FECHA,
  FECHA_DE_PAGO,
  FECHA_FACTURA_IDS,
  FECHA_FACTURA_REFERENCIA,
  FECHA_FACTURA_REFERENCIA_IDS,
  FRACCION_ARANCELARIA_IDS,
  MARCA_IDS,
  NOMBRE_EN_INGLES_IDS,
  NORMA_ORIGEN_IDS,
  NUMERO_DE_SERIE_IDS,
  N_FACTURA_IDS,
  N_FACTURA_REFERENCIA_IDS,
  OTRAS_INSTANCIAS_IDS,
  REQUIRED_CANTIDAD,
  REQUIRED_COMPLEMENTO_DESCRIPCION,
  REQUIRED_FECHA_FACTURA,
  REQUIRED_NUMERO_FACTURA,
  REQUIRED_TIPO_FACTURA,
  REQUIRED_UMC,
  REQUIRED_VALOR_MERCANCIA,
  TIPO_DE_FACTURA_IDS,
  TIPO_DE_FACTURA_REFERENCIA_IDS,
  VALOR_CONTENIDO_REGIONAL_IDS,
  VALOR_MERCANCIA_IDS,
} from '../../constantes/mercancia.enum';
import {
  Catalogo,
  CatalogoSelectComponent,
  InputFecha,
  InputFechaComponent,
  Notificacion,
  NotificacionesComponent,
  SeccionLibQuery,
  SeccionLibState,
} from '@libs/shared/data-access-user/src';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, delay, of, takeUntil } from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Mercancia } from '../../models/modificacion.enum';
import { MercanciaService } from '../../services/mercancia.service';
import { REGEX_PATRON_DECIMAL_15_4 } from '@ng-mf/data-access-user';
import { REGEX_PATRON_DECIMAL_16_4 } from '@ng-mf/data-access-user';
import { ValidationErrors } from '@angular/forms';

export function validarCantidad(
  control: AbstractControl
): ValidationErrors | null {
  const VAL = control.value;

  if (VAL === null || VAL === undefined || VAL === '') {
    return null;
  }

  const REGEX = /^\d{1,16}(\.\d{1,4})?$/;

  return REGEX.test(VAL.toString()) ? null : { cantidadInvalida: true };
}

/**
 * @descripcion
 * El componente `MercanciaComponent` es responsable de gestionar los datos y las interacciones
 * relacionadas con el formulario de mercancías en el módulo PERU.
 */
@Component({
  selector: 'app-datos-mercancia-model',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificacionesComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
  ],
  templateUrl: './mercancia.component.html',
  styleUrl: './mercancia.component.scss',
})
export class MercanciaComponent implements OnInit, OnDestroy, OnChanges {
  /**
   * @descripcion
   * Indica si se debe mostrar la alerta.
   */
  mostrarAlerta: boolean = false;

  /**
   * @descripcion
   * Mensaje de alerta que se muestra al usuario.
   */
  mensajeDeAlerta: string =
    'La lista de mercancías mostrada solamente contiene aquellas mercancías que tienen un registro de productos vigente para el tratado/acuerdo-país/bloque y cuya fracción arancelaria no está asociada a un cupo.';

  /**
   * @descripcion
   * Evento que se emite al cerrar el modal.
   */
  @Output() cerrarClicado = new EventEmitter();

  /**
   * @descripcion
   * Evento que se emite al seleccionar una fila en la tabla.
   */
  @Output() tablaSeleccionEvent = new EventEmitter();

  @Output() EMITMERCANIAS = new EventEmitter();

  /**
   * @descripcion
   * Evento que se emite al guardar los datos del formulario.
   */
  @Output() guardarClicado = new EventEmitter();

  /**
   * @descripcion
   * Datos seleccionados para la mercancía.
   */
  @Input() datosSeleccionados!: Mercancia;

  @Input() fromMercanciasDisponibles: boolean = false;

  /**
   * @descripcion
   * Formulario para capturar los datos de la mercancía.
   */
  mercanciaForm!: FormGroup;

  /**
   * @descripcion
   * Lista de unidades de medida y clasificación (UMC) disponibles.
   */
  umc: Catalogo[] = [];

  /**
   * @descripcion
   * Lista de facturas disponibles.
   */
  factura: Catalogo[] = [];

  /**
   * @descripcion
   * Fecha final para el formulario.
   */
  fechaFactura: InputFecha = FECHA;

  /**
   * @descripcion
   * Fecha final para el formulario.
   */
  fechaFacturaReferencia: InputFecha = FECHA_FACTURA_REFERENCIA;

  /**
   * @descripcion
   * Notificador para gestionar la destrucción de suscripciones.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion
   * Estado actual de la sección.
   */
  private seccionState!: SeccionLibState;
  /**
   * @public
   * @property {Notificacion} nuevaNotificacion
   * @description Representa una nueva notificación que se utilizará en el componente.
   * @command Este campo debe ser inicializado antes de su uso.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @descripcion
   * Indica si el formulario de mercancía se encuentra en modo solo lectura.
   */
  @Input() esFormularioSoloLectura!: boolean;

  /**
   * @property idProcedimiento
   * @description Identificador del procedimiento asociado a este componente.
   * @type {number}
   */
  @Input() idProcedimiento!: number;

  /**
   * Contiene los identificadores de fracción arancelaria.
   * @type {number[]}
   */
  FRACCION_ARANCELARIA: number[] = FRACCION_ARANCELARIA_IDS;

  /**
   * Contiene los identificadores de clasificación NALADI.
   * @type {number[]}
   */
  CLASIFICACION_NALADI: number[] = CLASIFICACION_NALADI_IDS;

  /**
   * Contiene los identificadores de clasificación NALADISA 1993.
   * @type {number[]}
   */
  CLASIFICACION_NALADISA_1993: number[] = CLASIFICACION_NALADISA_1993_IDS;

  /**
   * Contiene los identificadores de clasificación NALADISA 1996.
   * @type {number[]}
   */
  CLASIFICACION_NALADISA_1996: number[] = CLASIFICACION_NALADISA_1996_IDS;

  /**
   * Contiene los identificadores de clasificación NALADISA 2002.
   * @type {number[]}
   */
  CLASIFICACION_NALADISA_2002: number[] = CLASIFICACION_NALADISA_2002_IDS;

  /**
   * Contiene los identificadores del número de factura de referencia.
   * @type {number[]}
   */
  N_FACTURA_REFERENCIA: number[] = N_FACTURA_REFERENCIA_IDS;

  /**
   * Contiene los identificadores del número de factura.
   * @type {number[]}
   */
  N_FACTURA: number[] = N_FACTURA_IDS;

  /**
   * Contiene los identificadores de la norma de origen.
   * @type {number[]}
   */
  NORMA_ORIGEN: number[] = NORMA_ORIGEN_IDS;

  /**
   * Contiene los identificadores del nombre en inglés.
   * @type {number[]}
   */
  NOMBRE_EN_INGLES: number[] = NOMBRE_EN_INGLES_IDS;

  /**
   * Contiene los identificadores de otras instancias relacionadas.
   * @type {number[]}
   */
  OTRAS_INSTANCIAS: number[] = OTRAS_INSTANCIAS_IDS;

  /**
   * Contiene los identificadores del criterio para conferir origen.
   * @type {number[]}
   */
  CRITERIO_PARA_CONFERIR_ORIGEN: number[] = CRITERIO_PARA_CONFERIR_ORIGEN_IDS;

  /**
   * Contiene los identificadores del criterio para trato preferencial.
   * @type {number[]}
   */
  CRITERIO_PARA_TRATO_PREFERENCIAL: number[] =
    CRITERIO_PARA_TRATO_PREFERENCIAL_IDS;

  /**
   * Contiene los identificadores del valor de la mercancía.
   * @type {number[]}
   */
  VALOR_MERCANCIA: number[] = VALOR_MERCANCIA_IDS;

  /**
   * Contiene los identificadores del valor de contenido regional.
   * @type {number[]}
   */
  VALOR_CONTENIDO_REGIONAL: number[] = VALOR_CONTENIDO_REGIONAL_IDS;

  /**
   * Contiene los identificadores de la fecha de la factura.
   * @type {number[]}
   */
  FECHA_FACTURA: number[] = FECHA_FACTURA_IDS;

  /**
   * Contiene los identificadores de la fecha de la factura de referencia.
   * @type {number[]}
   */
  FECHA_FACTURA_REFERENCIA: number[] = FECHA_FACTURA_REFERENCIA_IDS;

  /**
   * Contiene los identificadores del tipo de factura.
   * @type {number[]}
   */
  TIPO_DE_FACTURA: number[] = TIPO_DE_FACTURA_IDS;

  /**
   * Contiene los identificadores del tipo de factura de referencia.
   * @type {number[]}
   */
  TIPO_DE_FACTURA_REFERENCIA: number[] = TIPO_DE_FACTURA_REFERENCIA_IDS;

  /**
   * Contiene los identificadores del número de serie.
   * @type {number[]}
   */
  NUMERO_DE_SERIE: number[] = NUMERO_DE_SERIE_IDS;

  /**
   * Contiene los identificadores asociados a la marca.
   * @type {number[]}
   */
  MARCA: number[] = MARCA_IDS;

  /**
   * Contiene los identificadores en los que el campo "Cantidad" es obligatorio.
   */
  CRITERIO_PARA_CLASIFICATION: number[]= CRITERIO_PARA_CLASIFICATION;

  /**
   * Contiene los identificadores en los que el campo "Fecha de pago" es obligatorio.
   */
  FECHA_DE_PAGO: number[]= FECHA_DE_PAGO;

  /**
   * @descripcion
   * Constructor que inicializa los servicios y dependencias requeridas.
   * @param fb - Instancia de FormBuilder para gestionar formularios.
   * @param mercanciaService - Servicio para obtener datos relacionados con el certificado.
   * @param store - Almacén para gestionar el estado del formulario de mercancías.
   * @param query - Consulta para obtener el estado del formulario.
   * @param seccionStore - Almacén para gestionar el estado de la sección.
   * @param seccionQuery - Consulta para obtener el estado de la sección.
   */
  constructor(
    private readonly fb: FormBuilder,
    private mercanciaService: MercanciaService,
    private seccionQuery: SeccionLibQuery
  ) {}

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama después de inicializar el componente.
   * Obtiene los datos iniciales para el formulario.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((s) => (this.seccionState = s));

    this.umcOpcion();
    this.facturasOpcion();
    this.initActionFormBuild();
  }

  /**
   * Detecta los cambios en las propiedades de entrada del componente y actualiza el estado en consecuencia.
   *
   * @param {SimpleChanges} changes - Objeto que contiene los cambios detectados en las propiedades @Input().
   * @returns {void}
   *
   * @description
   * Este método se ejecuta automáticamente cuando cambian las propiedades de entrada del componente:
   * - Si cambia `datosSeleccionados`, se actualiza su valor y se reconstruye el formulario llamando a `initActionFormBuild()`.
   * - Si cambia `fromMercanciasDisponibles`, se actualiza su valor en la propiedad correspondiente.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosSeleccionados'].currentValue) {
      this.datosSeleccionados = changes['datosSeleccionados'].currentValue;
      this.initActionFormBuild();
    }
    if (changes['fromMercanciasDisponibles'].currentValue) {
      this.fromMercanciasDisponibles =
        changes['fromMercanciasDisponibles'].currentValue;
    }
  }

  /**
   * @descripcion
   * Inicializa el formulario de mercancías con los valores actuales del estado.
   */
  initActionFormBuild(): void {
    this.mercanciaForm = this.fb.group({
      fraccionArancelaria: [this.datosSeleccionados?.fraccionArancelaria],
      fraccionNaladi: [
        { value: this.datosSeleccionados?.fraccionNaladi, disabled: true },
      ],
      fraccionNaladiSa93: [
        { value: this.datosSeleccionados?.fraccionNaladiSa93, disabled: true },
      ],
      fraccionNaladiSa96: [
        { value: this.datosSeleccionados?.fraccionNaladiSa96, disabled: true },
      ],
      fraccionNaladiSa02: [
        { value: this.datosSeleccionados?.fraccionNaladiSa02, disabled: true },
      ],
      nombreComercialMercancia: [
        { value: this.datosSeleccionados?.nombreComercial, disabled: true },
      ],
      nombreTecnico: [
        { value: this.datosSeleccionados?.nombreTecnico, disabled: true },
      ],
      normaOrigen: [{ value: this.datosSeleccionados?.normaOrigen, disabled: true }],
      nombreIngles: [{ value: this.datosSeleccionados?.nombreIngles, disabled: true }],
      otrasInstancias: [{ value: this.datosSeleccionados?.otrasInstancias, disabled: true }],
      criterioParaConferirOrigen: [{ value: this.datosSeleccionados?.criterioParaConferirOrigen, disabled: true }],
      criterioParaTratoPreferencial: [{ value: this.datosSeleccionados?.criterioParaTratoPreferencial, disabled: true }],
      criterioParaClasificacion: [{ value: this.datosSeleccionados?.criterioParaClasificacion }],
      fechaDePago: [{ value: this.datosSeleccionados?.fechaDePago }],
      valorDeContenidoRegional: [{ value: this.datosSeleccionados?.valorDeContenidoRegional, disabled: true }],
      fechaFactura: [
        this.datosSeleccionados?.fechaFactura ?? null,
        REQUIRED_FECHA_FACTURA.includes(this.idProcedimiento)
          ? [Validators.required]
          : null,
      ],
      marca: [this.datosSeleccionados?.marca ?? null],
      cantidad: [
        this.datosSeleccionados?.cantidad,
        [
          ...(REQUIRED_CANTIDAD.includes(this.idProcedimiento)
            ? [Validators.required]
            : []),
          Validators.pattern(REGEX_PATRON_DECIMAL_16_4),
        ],
      ],
      umc: [
        this.datosSeleccionados?.umc,
        REQUIRED_UMC.includes(this.idProcedimiento)
          ? [Validators.required]
          : null,
      ],
      valorMercancia: [
        this.datosSeleccionados?.valorMercancia,
        [
          ...(REQUIRED_VALOR_MERCANCIA.includes(this.idProcedimiento)
            ? [Validators.required]
            : []),
          Validators.pattern(REGEX_PATRON_DECIMAL_15_4),
        ],
      ],
      complementoDescripcion: [
        this.datosSeleccionados?.complementoDescripcion,
        [
          ...(REQUIRED_COMPLEMENTO_DESCRIPCION.includes(this.idProcedimiento)
            ? [Validators.required]
            : []),
          Validators.maxLength(200),
        ],
      ],
      numeroFactura: [
        this.datosSeleccionados?.numeroFactura,
        [
          ...(REQUIRED_NUMERO_FACTURA.includes(this.idProcedimiento)
            ? [Validators.required]
            : []),
          Validators.maxLength(36),
        ],
      ],
      numeroDeSerie: [''],
      tipoFactura: [
        this.datosSeleccionados?.tipoFactura,
        REQUIRED_TIPO_FACTURA.includes(this.idProcedimiento)
          ? [Validators.required]
          : null,
      ],
    });
  }

  /**
   * @descripcion
   * Cierra el modal y oculta la alerta.
   */
  cerrarModal(): void {
    this.cerrarClicado.emit();
    this.mostrarAlerta = false;
  }

  /**
   * @descripcion
   * Activa la alerta en el modal.
   */
  activarModal(): void {
    this.mostrarAlerta = true;
    this.abrirModal();
  }
  /*
   * @descripcion
   * Marca todos los campos del formulario como tocados para mostrar los errores de validación.
   * @param formGroup - El grupo de formulario que contiene los controles a marcar.
   */
  markAllFieldsAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if ((control as FormGroup).controls) {
        const CHILD = control as FormGroup;
        this.markAllFieldsAsTouched(CHILD);
      }
    });
  }

  /**
   * @descripcion
   * Obtiene la lista de unidades de medida y clasificación (UMC) disponibles.
   */
  umcOpcion(): void {
    this.mercanciaService
      .obtenerMenuDesplegable('umc.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.umc = data as Catalogo[];
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al obtener los datos:', error);
          this.umc = [];
        },
      });
  }

  /**
   * @descripcion
   * Obtiene la lista de facturas disponibles.
   */
  facturasOpcion(): void {
    this.mercanciaService
      .obtenerMenuDesplegable('factura.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.factura = data as Catalogo[];
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al obtener los datos:', error);
          this.factura = [];
        },
      });
  }

  /**
   * @descripcion
   * Acepta los datos del formulario, los guarda en el almacén y emite los eventos correspondientes.
   */
  acceptar(agregar: boolean): void {
    this.mercanciaForm.markAllAsTouched();
    this.mercanciaForm.updateValueAndValidity({
      onlySelf: false,
      emitEvent: false,
    });

    if (!(agregar && this.mercanciaForm.valid)) {
      return;
    }

    this.guardarClicado.emit(this.mercanciaForm.value);
    const MERCANIADATO = this.mercanciaForm.getRawValue();
    const MERCANIAS = this.buildMercancia(MERCANIADATO);
    this.EMITMERCANIAS.emit(MERCANIAS);
    if (this.mostrarAlerta) {
      of(null)
        .pipe(takeUntil(this.destroyNotifier$), delay(100))
        .subscribe(() => {
          this.cerrarModal();
          this.tablaSeleccionEvent.emit(true);
          this.mercanciaForm.reset();
        });
    }
  }

  /**
   * Construye un objeto de tipo `Mercancia` a partir de los datos proporcionados,
   * aplicando valores predeterminados cuando sea necesario.
   *
   * @private
   * @param {Mercancia} MERCANIADATO - Objeto que contiene los datos originales de la mercancía.
   * @returns {Mercancia} Objeto `Mercancia` completamente estructurado y con valores de respaldo.
   *
   * @description
   * Este método genera un nuevo objeto `Mercancia` tomando como base los valores recibidos en `MERCANIADATO`.
   * Si alguna propiedad del objeto es `undefined` o `null`, se asigna el valor por defecto `'--'`.
   *
   * Además:
   * - Si la propiedad `fromMercanciasDisponibles` está activa, el campo `id` se inicializa en `0`.
   * - En caso contrario, el `id` se obtiene desde `datosSeleccionados`.
   *
   * El resto de las propiedades se completan con los valores del objeto recibido o con el valor de respaldo.
   */
  private buildMercancia(MERCANIADATO: Mercancia): Mercancia {
    const FALLBACK = (value?: string): string => value ?? '--';
    return {
      id: this.fromMercanciasDisponibles ? 0 : this.datosSeleccionados?.id,
      fraccionArancelaria: FALLBACK(MERCANIADATO.fraccionArancelaria),
      numeroDeRegistrodeProductos: FALLBACK(
        MERCANIADATO.numeroDeRegistrodeProductos
      ),
      fechaExpedicion: FALLBACK(MERCANIADATO.fechaExpedicion),
      fechaVencimiento: FALLBACK(MERCANIADATO.fechaVencimiento),
      nombreTecnico: FALLBACK(MERCANIADATO.nombreTecnico),
      nombreComercial: FALLBACK(MERCANIADATO.nombreComercial),
      normaOrigen: FALLBACK(MERCANIADATO.normaOrigen),
      cantidad: FALLBACK(MERCANIADATO.cantidad),
      umc: FALLBACK(MERCANIADATO.umc),
      tipoFactura: FALLBACK(MERCANIADATO.tipoFactura),
      valorMercancia: FALLBACK(MERCANIADATO.valorMercancia),
      fechaFinalInput: FALLBACK(MERCANIADATO.fechaFinalInput),
      numeroFactura: FALLBACK(MERCANIADATO.numeroFactura),
      unidadMedidaMasaBruta: FALLBACK(MERCANIADATO.unidadMedidaMasaBruta),
      complementoClasificacion: FALLBACK(MERCANIADATO.complementoClasificacion),
      complementoDescripcion: FALLBACK(MERCANIADATO.complementoDescripcion),
      criterioParaClasificacion: FALLBACK(MERCANIADATO.criterioParaClasificacion),
      fechaDePago: FALLBACK(MERCANIADATO.fechaDePago),
      fraccionNaladi: MERCANIADATO.fraccionNaladi,
      fraccionNaladiSa93: MERCANIADATO.fraccionNaladiSa93,
      fraccionNaladiSa96: MERCANIADATO.fraccionNaladiSa96,
      fraccionNaladiSa02: MERCANIADATO.fraccionNaladiSa02,
      nalad: MERCANIADATO.nalad,
      fechaFactura: MERCANIADATO.fechaFactura,
    };
  }

  /**
   * Abre un modal con una notificación configurada.
   *
   * @command abrirModal
   * @description Este método configura y muestra un modal con una notificación de alerta.
   */
  public abrirModal(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: this.mensajeDeAlerta,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama cuando el componente se destruye.
   * Limpia los recursos y suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * @summary Actualiza `fechaFactura` y sincroniza con el store.
   * @description Setea el valor, marca el control como tocado/modificado y persiste vía `setFechaFactura`.
   * @param {string} nuevo_valor Fecha seleccionada (p. ej., '2025-09-04').
   * @returns {void}
   */
  public cambioFechaFactura(nuevo_valor: string): void {
    this.mercanciaForm.patchValue({
      fechaFactura: nuevo_valor,
    });
  }

  /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param nombreControl - Nombre del control a verificar.
   * @returns True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.mercanciaForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }
}
