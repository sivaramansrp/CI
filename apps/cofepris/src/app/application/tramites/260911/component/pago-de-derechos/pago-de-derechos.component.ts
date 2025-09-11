import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, REGEX_NUMERO_DECIMAL_2_DIGITOS, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite260911State, Tramite260911Store } from '../../estados/tramite260911.store';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { PagoDeDerechosService } from '../../services/datos-de-la-solicitud/pago-de-derechos.service';
import { Tramite260911Query } from '../../estados/tramite260911.query';

/**
 * Componente para gestionar el pago de derechos del trámite 260911.
 * 
 * Este componente maneja la captura y validación de datos relacionados con el pago
 * de derechos, incluyendo información bancaria, fechas de pago, importes y claves
 * de referencia. Soporta modo de solo lectura para consulta de información.
 * 
 * @example
 * ```html
 * <app-pago-de-derechos></app-pago-de-derechos>
 * ```
 * 
 * @author Sistema de Trámites
 * @version 1.0.0
 * @since 2024
 */
@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
  providers: [PagoDeDerechosService],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy, OnChanges {
  ngOnChanges(): void {
    if (this.pagoDeDerechosForm) {
      if (this.tipoTramite === '1' || this.tipoTramite === '2') {
        this.pagoDeDerechosForm.enable();
      } else {
        this.pagoDeDerechosForm.disable();
      }
    }
  }
  @Input() disabled: boolean = false;
  @Input() tipoTramite: string = '';
  /**
   * Resetea todos los campos del formulario de pago de derechos y actualiza el store.
   * Marca los controles como pristine y untouched para ocultar errores de campos requeridos después de borrar.
   * Se invoca al hacer clic en el botón "Borrar datos del pago".
   */
  resetPagoDeDerechos(): void {
    if (this.pagoDeDerechosForm) {
      this.pagoDeDerechosForm.reset();
      Object.values(this.pagoDeDerechosForm.controls).forEach(control => {
        control.markAsPristine();
        control.markAsUntouched();
        control.updateValueAndValidity();
      });
      this.tramite260911Store.setTramite260911State({
        claveDeReferencia: '',
        cadenaPagoDependencia: '',
        clave: '',
        llaveDePago: '',
        fecPago: '',
        impPago: ''
      });
    }
  }

  /**
   * Estado actual de la solicitud del trámite 260911.
   * Contiene toda la información del formulario y su estado.
   */
  public solicitudState!: Tramite260911State;

  /**
   * Indica si el formulario debe mostrarse en modo de solo lectura.
   * Cuando es true, todos los controles del formulario se deshabilitan.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Formulario reactivo para la captura de datos de pago de derechos.
   * Contiene validaciones para cada campo según las reglas de negocio.
   */
  public pagoDeDerechosForm!: FormGroup;

  /**
   * Subject utilizado para controlar la destrucción de suscripciones RxJS.
   * Previene memory leaks al desuscribirse automáticamente en ngOnDestroy.
   */
  public destroyed$ = new Subject<void>();

  /**
   * Estado seleccionado del trámite 260911.
   * Mantiene una copia local del estado para operaciones específicas.
   */
  estadoSeleccionado!: Tramite260911State;

  /**
   * Lista de bancos obtenida del catálogo.
   * Se utiliza para poblar los selectores de instituciones bancarias.
   */
  public bancoList!: Catalogo[];

  /**
   * Constructor del componente PagoDeDerechosComponent.
   * 
   * Inicializa las dependencias necesarias y configura la suscripción
   * al estado de consulta para determinar el modo del formulario.
   * 
   * @param fb - FormBuilder para crear formularios reactivos
   * @param tramite260911Store - Store para gestionar el estado del trámite
   * @param tramite260911Query - Query para consultar el estado del trámite
   * @param Servicio - Servicio para operaciones de pago de derechos
   * @param consultaioQuery - Query para el estado de consulta
   */
  constructor(
    public fb: FormBuilder,
    private tramite260911Store: Tramite260911Store,
    private tramite260911Query: Tramite260911Query,
    private Servicio: PagoDeDerechosService,
    public consultaioQuery: ConsultaioQuery,
  ) {
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
   * Inicializa el estado del formulario según el modo de operación.
   * 
   * Determina si el formulario debe estar en modo lectura o edición
   * y ejecuta las acciones correspondientes para configurar el estado inicial.
   * 
   * @returns void
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearForm();
    }
  }

  /**
   * Guarda los datos del formulario y configura su estado de habilitación.
   * 
   * Crea el formulario y posteriormente lo habilita o deshabilita
   * según el modo de operación (lectura o edición).
   * 
   * @returns void
   */
  guardarDatosFormulario(): void {
    this.crearForm();
    if (this.esFormularioSoloLectura) {
      this.pagoDeDerechosForm.disable();
    }
  }

  /**
   * Método del ciclo de vida OnInit.
   * 
   * Se ejecuta después de la inicialización del componente.
   * Configura el estado inicial del formulario y obtiene la lista de bancos.
   * 
   * @returns void
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.obtenerBancoList();
    if (!this.esFormularioSoloLectura && !this.disabled) {
      if (this.tipoTramite === '1' || this.tipoTramite === '2') {
        this.pagoDeDerechosForm?.enable();
      } else {
        this.pagoDeDerechosForm?.disable();
      }
    } else {
      this.pagoDeDerechosForm?.disable();
    }
    if (this.disabled) {
      this.pagoDeDerechosForm.disable();
    }
  }

  /**
   * Crea el formulario reactivo con validaciones.
   * 
   * Configura todos los controles del formulario con sus respectivas
   * validaciones síncronas y asíncronas. Se suscribe al estado del trámite
   * para obtener los valores iniciales.
   * 
   * Los controles incluyen:
   * - claveDeReferencia: Máximo 50 caracteres
   * - cadenaPagoDependencia: Máximo 50 caracteres  
   * - clave: Campo requerido
   * - llaveDePago: Requerido, patrón alfanumérico de 10 caracteres
   * - fecPago: Requerido, no puede ser fecha futura
   * - impPago: Máximo 16 caracteres, no debe contener comas
   * 
   * @returns void
   */
  crearForm(): void {
    this.tramite260911Query.selectTramite260911$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.pagoDeDerechosForm = this.fb.group({
      claveDeReferencia: [this.solicitudState?.claveDeReferencia, [Validators.required, Validators.maxLength(9)]],
      cadenaPagoDependencia: [this.solicitudState?.cadenaPagoDependencia, [Validators.required, Validators.maxLength(14)]],
      clave: [this.solicitudState?.clave, Validators.required],
      llaveDePago: [this.solicitudState?.llaveDePago, [Validators.required, Validators.maxLength(30)]],
      fecPago: [this.solicitudState?.fecPago, [Validators.required, PagoDeDerechosComponent.fechaLimValidator()]],
      impPago:  [
        this.solicitudState?.impPago || '',
        [
          Validators.required,
          Validators.maxLength(17),
          PagoDeDerechosComponent.noComaValidator(),
          Validators.pattern(REGEX_NUMERO_DECIMAL_2_DIGITOS),
        ],
      ],
    });
    this.pagoDeDerechosForm.disable();
  }

  /**
   * Valida el campo de fecha para evitar fechas futuras.
   * 
   * Actualiza la validación del control de fecha especificado,
   * aplicando las reglas de validación sin emitir eventos de cambio.
   * 
   * @param fecPago - Nombre del control de fecha a validar
   * @returns void
   */
  public validarFechaFutura(fecPago: string): void {
    this.pagoDeDerechosForm.get(fecPago)?.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * Valida que el campo de importe no contenga comas.
   * 
   * Actualiza la validación del control de importe especificado,
   * verificando que no contenga caracteres de coma.
   * 
   * @param impPago - Nombre del control de importe a validar
   * @returns void
   */
  public validarSinComas(impPago: string): void {
    this.pagoDeDerechosForm.get(impPago)?.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * Valida la longitud máxima de un campo y marca el control como tocado para mostrar errores.
   * 
   * Este método se ejecuta en el evento input para mostrar errores de validación
   * cuando el usuario alcanza el límite de caracteres, incluso cuando el HTML
   * maxlength previene la entrada de más caracteres.
   * 
   * @param controlName - Nombre del control a validar
   * @param maxLength - Longitud máxima permitida
   * @returns void
   */
  public validarLongitudMaxima(controlName: string, maxLength: number): void {
    const CONTROL = this.pagoDeDerechosForm.get(controlName);
    if (CONTROL) {
      if (CONTROL.value && CONTROL.value.length > maxLength) {
        CONTROL.setErrors({ ...CONTROL.errors, longitudMaxima: true });
      } else {
        if (CONTROL.errors) {
          const { longitudMaxima: LONGITUD_MAXIMA, ...OTHER_ERRORS } = CONTROL.errors;
          CONTROL.setErrors(Object.keys(OTHER_ERRORS).length ? OTHER_ERRORS : null);
        }
      }
      CONTROL.markAsTouched();
      CONTROL.markAsDirty();
    }
  }

  /**
   * Validador estático para verificar que la fecha no sea futura.
   * 
   * Crea un validador que compara la fecha ingresada con la fecha actual.
   * Si la fecha es posterior a hoy, retorna un error de validación.
   * 
   * @returns ValidatorFn - Función validadora que retorna error o null
   * 
   * @example
   * ```typescript
   * // Uso en FormControl
   * fechaControl: [null, PagoDeDerechosComponent.fechaLimValidator()]
   * ```
   */
  public static fechaLimValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const LIM = control.value;
      if (LIM) {
        const [YEAR, MONTH, DAY] = LIM.split('-');
        const FECHA = new Date(+Number(YEAR), +Number(MONTH) - 1, +Number(DAY));
        const TODAY = new Date();
        if (FECHA.getTime() > TODAY.getTime()) {
          return { fechaLim: true };
        }
      }
      return null;
    };
  }

  /**
   * Validador estático para verificar que el valor no contenga comas.
   * 
   * Valida que el campo no contenga el carácter coma (,) que podría
   * causar problemas en el procesamiento de valores numéricos.
   * 
   * @returns ValidatorFn - Función validadora que retorna error o null
   * 
   * @example
   * ```typescript
   * // Uso en FormControl
   * importeControl: [null, PagoDeDerechosComponent.noComaValidator()]
   * ```
   */
  public static noComaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const VALUE = control.value;
      if (VALUE && VALUE.includes(',')) {
        return { noComa: true };
      }
      return null;
    };
  }

  /**
   * Obtiene la lista de bancos desde el servicio.
   * 
   * Realiza una petición al servicio para obtener el catálogo de bancos
   * disponibles y almacena el resultado en la propiedad bancoList.
   * La suscripción se maneja automáticamente con el patrón takeUntil.
   * 
   * @returns void
   */
  obtenerBancoList(): void {
    this.Servicio.onBancoList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.bancoList = data;
      });
  }

  /**
   * Actualiza el valor de un control específico en el store.
   * 
   * Obtiene el valor actual del control especificado y lo guarda
   * en el estado global del trámite usando el store correspondiente.
   * 
   * @param FormGroup - Grupo de formulario que contiene el control
   * @param control - Nombre del control cuyo valor se va a guardar
   * @returns void
   * 
   * @example
   * ```typescript
   * // Actualizar valor de clave de referencia
   * this.setValoresStore(this.pagoDeDerechosForm, 'claveDeReferencia');
   * ```
   */
  public setValoresStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite260911Store.setTramite260911State({
      [control]: VALOR
    });
  }

  /**
   * Verifica si un control del formulario es inválido y ha sido tocado.
   * 
   * Determina el estado de validación de un control específico,
   * considerando tanto su validez como si ha sido interactuado por el usuario.
   * 
   * @param nombreControl - Nombre del control a evaluar
   * @returns boolean - true si el control es inválido y ha sido tocado/modificado
   * 
   * @example
   * ```typescript
   * // En el template
   * <div *ngIf="esInvalido('claveDeReferencia')" class="error">
   *   Campo inválido
   * </div>
   * ```
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.pagoDeDerechosForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Obtiene el valor actual del estado del trámite desde el store.
   * 
   * Se suscribe al query del trámite para mantener actualizada
   * la propiedad estadoSeleccionado con los datos más recientes.
   * Útil para sincronizar el estado local con el estado global.
   * 
   * @returns void
   */
  getValorStore(): void {
    this.tramite260911Query.selectTramite260911$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.estadoSeleccionado = data;
      }
    );
  }

  /**
   * Devuelve los datos actuales del formulario de pago de derechos.
   */
   getData(): Tramite260911State {
    return this.pagoDeDerechosForm?.value as Tramite260911State;
  }

   /**
   * Indica si el formulario de pago de derechos es válido.
   */
  isValid(): boolean {
    return this.pagoDeDerechosForm?.valid ?? false;
  }
  /**
   * Método del ciclo de vida OnDestroy.
   * 
   * Se ejecuta cuando el componente va a ser destruido.
   * Completa el Subject destroyed$ para cancelar todas las suscripciones
   * activas y prevenir memory leaks.
   * 
   * @returns void
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}