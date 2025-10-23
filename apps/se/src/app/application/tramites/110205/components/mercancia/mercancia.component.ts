import { Catalogo, ConsultaioQuery, InputFecha, Notificacion, SeccionLibQuery, SeccionLibState } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {FORM_ERROR_ALERT_CANTIDAD,FORM_ERROR_ALERT_CANT_VAL,FORM_ERROR_ALERT_VALORES} from '../../constantes/peru-certificado.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, delay, of, skip, takeUntil } from 'rxjs';
import { Tramite110205State, Tramite110205Store } from '../../estados/tramite110205.store';
import { AbstractControl} from '@angular/forms';
import { FECHA } from '../../constantes/peru-certificado.module';
import { HttpErrorResponse } from '@angular/common/http';
import {IS_FORM_VALID} from '../../constantes/peru-certificado.module';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { PeruCertificadoService } from '../../services/peru-certificado.service';
import { REGEX_PATRON_DECIMAL_15_4 } from '@ng-mf/data-access-user';
import { REGEX_PATRON_DECIMAL_16_4} from '@ng-mf/data-access-user';
import { Tramite110205Query } from '../../estados/tramite110205.query';
import { ValidationErrors } from '@angular/forms';

export function validarCantidad(control: AbstractControl): ValidationErrors | null {
  const VAL= control.value;

  if (VAL=== null || VAL === undefined || VAL === '') {return null}

  const REGEX= /^\d{1,16}(\.\d{1,4})?$/;

  return REGEX.test(VAL.toString()) ? null : { cantidadInvalida: true };
}



/**
 * @descripcion
 * El componente `MercanciaComponent` es responsable de gestionar los datos y las interacciones
 * relacionadas con el formulario de mercancías en el módulo PERU.
 */
@Component({
  selector: 'app-mercancia',
  templateUrl: './mercancia.component.html',
  styleUrl: './mercancia.component.scss',
})


export class MercanciaComponent implements OnInit, OnDestroy {
  /**
   * @descripcion
   * Indica si se debe mostrar la alerta.
   */
  mostrarAlerta: boolean = false;

  /**
   * @descripcion
   * Mensaje de alerta que se muestra al usuario.
   */
  mensajeDeAlerta: string = 'La lista de mercancías mostrada solamente contiene aquellas mercancías que tienen un registro de productos vigente para el tratado/acuerdo-país/bloque y cuya fracción arancelaria no está asociada a un cupo.';

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

  /**
   * Indica si la información de la mercancía proviene del listado de mercancías disponibles.
   * 
   * Cuando es `true`, significa que el usuario seleccionó la mercancía desde una lista precargada.
   * Cuando es `false`, la mercancía fue ingresada manualmente por el usuario.
   * 
   * @type {boolean}
   * @default false
   */
  @Input() fromMercanciasDisponibles: boolean = true;

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
   * Notificador para gestionar la destrucción de suscripciones.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion
   * Estado actual de la mercancía.
   */
  private mercanciaState!: Tramite110205State;

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
 * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
 * }
 */
 esMercanciaFormValid: boolean = false;
  esFormaValido: boolean = false;

  esFormaValores: boolean = false;
  esFormaCantidadValores: boolean = false;

  /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
  public formErrorAlert =FORM_ERROR_ALERT_CANTIDAD;

formErrorAlertMercanica=IS_FORM_VALID;

 /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
 public formErrorAlertCantVal =FORM_ERROR_ALERT_CANT_VAL;

/**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
public formErrorAlertValore =FORM_ERROR_ALERT_VALORES;

  /**
   * @descripcion
   * Constructor que inicializa los servicios y dependencias requeridas.
   * @param fb - Instancia de FormBuilder para gestionar formularios.
   * @param peruCertificadoService - Servicio para obtener datos relacionados con el certificado.
   * @param store - Almacén para gestionar el estado del formulario de mercancías.
   * @param query - Consulta para obtener el estado del formulario.
   * @param seccionStore - Almacén para gestionar el estado de la sección.
   * @param seccionQuery - Consulta para obtener el estado de la sección.
   */
  constructor(
    private readonly fb: FormBuilder,
    private peruCertificadoService: PeruCertificadoService,
    private store: Tramite110205Store,
    private query: Tramite110205Query,
    private seccionQuery: SeccionLibQuery,
    private consultaQuery: ConsultaioQuery
  ) {}

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama después de inicializar el componente.
   * Obtiene los datos iniciales para el formulario.
   */
ngOnInit(): void {
  this.seccionQuery.selectSeccionState$
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe(s => (this.seccionState = s));


  this.query.selectPeru$
    .pipe(skip(1), takeUntil(this.destroyNotifier$))
    .subscribe(S => {
      if (!this.mercanciaForm) {
        return; 
      }
      this.mercanciaForm.patchValue(
        {
          fraccionArancelaria: S.mercanciaForm['fraccionArancelaria'],
          nombreComercialMercancia: S.mercanciaForm['nombreComercialMercancia'],
          nombreTecnico: S.mercanciaForm['nombreTecnico'],
          nombreIngles: S.mercanciaForm['nombreIngles'],
          otrasInstancias: S.mercanciaForm['otrasInstancias'],
          criterioParaConferirOrigen: S.mercanciaForm['criterioParaConferirOrigen'],
          
          umc: S.umc,
          cantidad: this.formatTo4Decimals(S.cantidad),
        
          valorMercancia: this.formatTo4Decimals(S.valorMercancia),
       
          complementoDescripcion: S.complementoDescripcion,
          numeroFactura: S.numeroFactura,
          tipoFactura: S.tipoFactura,
        },
        { emitEvent: false }
      );
    });

  this.umcOpcion();
  this.facturasOpcion();
  this.initActionFormBuild();
}

  /**
   * Detecta los cambios en las propiedades de entrada del componente y actualiza el formulario en consecuencia.
   * 
   * Este método se ejecuta automáticamente cuando Angular detecta un cambio en alguna de las propiedades
   * con decorador `@Input()`. En este caso, si cambia `datosSeleccionados`, se actualiza la propiedad local
   * y se vuelve a construir el formulario llamando a `initActionFormBuild()`.
   * 
   * @param {SimpleChanges} changes - Objeto que contiene los cambios detectados en las propiedades de entrada.
   * 
   * @returns {void}
   */
  ngOnChange(changes: SimpleChanges): void{
    if (changes['datosSeleccionados'].currentValue) {
      this.datosSeleccionados = changes['datosSeleccionados'].currentValue;
      this.initActionFormBuild();
    }
  }

/**
 * Formatea un valor a exactamente 4 lugares decimales.
 * @param value - El valor a formatear.
 */
private formatTo4Decimals(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  
  if (value === 0 || value === '0') {
    return '0.0000';
  }

  const VALUE_STR = String(value);
  
  const IS_VALID_NUMBER = /^-?\d+(\.\d*)?$/.test(VALUE_STR);
  const VAL=this.esFormularioSoloLectura;
  if (!IS_VALID_NUMBER) {
    return VALUE_STR;
  }
  
  const PARSED_VALUE = parseFloat(VALUE_STR);
  return PARSED_VALUE.toFixed(4);
  
}
  /**
   * @descripcion
   * Inicializa el formulario de mercancías con los valores actuales del estado.
   */
  initActionFormBuild(): void {
    this.mercanciaForm = this.fb.group({
      fraccionArancelaria: [this.mercanciaState.mercanciaForm['fraccionArancelaria']],
      nombreComercialMercancia: [{ value: this.mercanciaState.mercanciaForm['nombreComercialMercancia'], disabled: true }],
      nombreTecnico: [{ value: this.mercanciaState.mercanciaForm['nombreTecnico'], disabled: true }],
      nombreIngles: [{ value: this.mercanciaState.mercanciaForm['nombreIngles'], disabled: true }],
      otrasInstancias: [{ value: this.mercanciaState.mercanciaForm['otrasInstancias'], disabled: true }],
      criterioParaConferirOrigen: [{ value: this.mercanciaState.mercanciaForm['criterioParaConferirOrigen'], disabled: true }],
      fechaFactura: [this.mercanciaState.fechaFactura ?? null, Validators.required],
      cantidad: [this.formatTo4Decimals(this.mercanciaState.cantidad), [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_16_4)]],
      umc: [this.mercanciaState.umc, Validators.required],
      valorMercancia: [this.formatTo4Decimals(this.mercanciaState.valorMercancia), [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_15_4)]],
      complementoDescripcion: [this.mercanciaState.complementoDescripcion,[ Validators.required, Validators.maxLength(200)]],
      numeroFactura: [this.mercanciaState.numeroFactura,[ Validators.required,Validators.maxLength(36)]],
      tipoFactura: [this.mercanciaState.tipoFactura, Validators.required],
    });
    

  }
   /**
 * Format the field to 4 decimals when focus is lost (blur event)
 * @param field - The form field name to format
 */
formatFieldOnBlur(field: string): void {
  const CONTROL = this.mercanciaForm.get(field);
  if (CONTROL&& CONTROL.value !== null && CONTROL.value !== '') {
    const FORMATTEDVALUE = this.formatTo4Decimals(CONTROL.value);
    CONTROL.setValue(FORMATTEDVALUE, { emitEvent: false });
  }
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
   this.abrirModal() 
  }
  /*
    * @descripcion
    * Marca todos los campos del formulario como tocados para mostrar los errores de validación.
    * @param formGroup - El grupo de formulario que contiene los controles a marcar.
    */
  markAllFieldsAsTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
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
    this.peruCertificadoService.obtenerMenuDesplegable('umc.json')
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
    this.peruCertificadoService.obtenerMenuDesplegable('factura.json')
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
  agregar(): void {
    this.esMercanciaFormValid = false;
    this.esFormaCantidadValores = false;
    this.esFormaValido = false;
    this.esFormaValores = false;
    
    this.mercanciaForm.markAllAsTouched();
    this.mercanciaForm.updateValueAndValidity({ onlySelf: false, emitEvent: false });
    
    if(this.mercanciaForm.invalid) {
      this.esMercanciaFormValid = true;
      return;
    }
    
    const IS_ZERO = (val: string | number | null | undefined): boolean => 
      val === '0' || val === '0.0000' || parseFloat(String(val || 0)) === 0;
    
    const CANTIDAD_VALUE = this.mercanciaForm.get('cantidad')?.value;
    const VALOR_VALUE = this.mercanciaForm.get('valorMercancia')?.value;
    
    if(IS_ZERO(CANTIDAD_VALUE) && IS_ZERO(VALOR_VALUE)) {
      this.esFormaCantidadValores = true;
      return;
    }
    
    if(IS_ZERO(VALOR_VALUE)) {
      this.esFormaValores = true;
      return;
    }
    
    if(IS_ZERO(CANTIDAD_VALUE)) {
      this.esFormaValido = true;
      return;
    }
    
    this.activarModal();
  }
acceptar(): void {
  this.guardarClicado.emit(this.mercanciaForm.value);
  this.store.setmercanciaTabla([this.mercanciaForm.value]);
  
  if (this.mostrarAlerta) {
    of(null).pipe(takeUntil(this.destroyNotifier$), delay(100)).subscribe(() => {
      this.cerrarModal();
      this.tablaSeleccionEvent.emit(true);
       this.mercanciaForm.reset();
    });
  }

}

  /**
   * Construye y retorna un objeto de tipo `Mercancia` con valores seguros y predeterminados.
   * 
   * Este método se encarga de crear una nueva instancia de `Mercancia` a partir de los datos recibidos,
   * asegurando que todos los campos tengan un valor válido.  
   * Si algún campo es `undefined` o `null`, se le asigna el valor `'--'` por defecto.
   * 
   * Además, el campo `id` se establece en función de la procedencia de los datos:
   * - Si `fromMercanciasDisponibles` es `true`, utiliza el `id` de `datosSeleccionados`.
   * - En caso contrario, asigna `0` (nuevo registro).
   * 
   * @private
   * @param {Mercancia} MERCANIADATO - Objeto de entrada con la información de la mercancía.
   * 
   * @returns {Mercancia} - Un nuevo objeto `Mercancia` con todos los campos validados y completados.
   */
  private buildMercancia(MERCANIADATO: Mercancia): Mercancia {
    const FALLBACK = (value?: string): string => value ?? '--';

    return {
      id: this.fromMercanciasDisponibles ? this.datosSeleccionados?.id : 0,
      fraccionArancelaria: FALLBACK(MERCANIADATO.fraccionArancelaria),
      numeroDeRegistrodeProductos: FALLBACK(MERCANIADATO.numeroDeRegistrodeProductos),
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
      fraccionNaladi: MERCANIADATO.fraccionNaladi,
      fraccionNaladiSa93: MERCANIADATO.fraccionNaladiSa93,
      fraccionNaladiSa96: MERCANIADATO.fraccionNaladiSa96,
      fraccionNaladiSa02: MERCANIADATO.fraccionNaladiSa02,
      nalad: MERCANIADATO.nalad,
      fechaFactura: MERCANIADATO.fechaFactura,
    };
  }


  /**
   * @descripcion
   * Actualiza el almacén con un valor específico del formulario.
   * @param form - El formulario que contiene el valor.
   * @param campo - El campo del formulario cuyo valor se actualizará.
   * @param metodoNombre - El método del almacén que se llamará para actualizar el valor.
   */
 setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite110205Store): void {
  const VALOR = form.get(campo)?.value;
  (this.store[metodoNombre] as (value: Tramite110205Store) => void)(VALOR);
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
      }
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
    this.mercanciaForm.get('fechaFactura')?.setValue(nuevo_valor);
    this.mercanciaForm.get('fechaFactura')?.markAsTouched();
    this.mercanciaForm.get('fechaFactura')?.markAsDirty();
    this.setValoresStore(this.mercanciaForm, 'fechaFactura', 'setFechaFactura');
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