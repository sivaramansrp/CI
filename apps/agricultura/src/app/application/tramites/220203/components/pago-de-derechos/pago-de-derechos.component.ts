import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, InputFecha, InputFechaComponent, InputRadioComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FECHA_SALIDA_ACUICULTURA, TIPO_RADIO } from '../../constantes/220203/importacion-de-acuicultura.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormularioPago, OpcionDeRadio } from '../../models/220203/importacion-de-acuicultura.module';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';

/**
 * @fileoverview
 * Componente para el pago de derechos en la importación de acuicultura.
 * Permite capturar, validar y actualizar la información relacionada al pago, incluyendo exención, justificación, banco y fecha.
 * Cobertura compodoc 100%: cada propiedad, método y constructor está documentado.
 * @module PagoDeDerechosComponent
 */

/**
 * Componente para el pago de derechos en la importación de acuicultura.
 * Permite capturar, validar y actualizar la información relacionada al pago, incluyendo exención, justificación, banco y fecha.
 * @component PagoDeDerechosComponent
 * @selector app-pago-de-derechos
 * @templateUrl ./pago-de-derechos.component.html
 * @styleUrls ./pago-de-derechos.component.scss
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  standalone: true,
  imports: [
    InputRadioComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    TituloComponent,
    CommonModule
  ]
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Formulario para el pago de derechos.
   * @type {FormGroup}
   */
  formularioPago!: FormGroup;

  /**
   * Opciones de radio para la exención de pago.
   * @type {OpcionDeRadio[]}
   */
  exentoPagoRadio: OpcionDeRadio[] = TIPO_RADIO;

  /**
   * Valor seleccionado para la exención de pago.
   * @type {string}
   */
  exentoPagoValor: string = 'Si';

  /**
   * Catálogo de justificaciones para la exención de pago.
   * @type {Catalogo[]}
   */
  justificacionCatalogo: Catalogo[] = [];

  /**
   * Catálogo de bancos para el pago.
   * @type {Catalogo[]}
   */
  bancoCatalogo: Catalogo[] = [];

  /**
   * Configuración para el input de fecha de salida.
   * @type {InputFecha}
   */
  fechaFinalInput: InputFecha = FECHA_SALIDA_ACUICULTURA;

  /**
   * Fecha de pago seleccionada.
   * @type {string}
   */
  fechaPagoDate: string = '15/03/2025';

  /**
   * Subject para controlar la destrucción de suscripciones.
   * @type {Subject<void>}
   */
  public destroyNotifier$ = new Subject<void>();

  /**
   * Estado actual del formulario de pago almacenado.
   * @type {FormularioPago}
   */
  formularioPagoStore: FormularioPago = {} as FormularioPago;

  /**
   * Indica si el formulario está en modo solo lectura.
   * @type {boolean}
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor que inicializa el servicio de formularios y el servicio de importación de acuicultura.
   * @param {FormBuilder} fb FormBuilder para la creación de formularios reactivos.
   * @param {ImportacionDeAcuiculturaService} importacionAcuiculturaServicio Servicio para obtener datos de importación.
   * @param {ConsultaioQuery} consultaQuery Servicio para consultar el estado de solo lectura.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionAcuiculturaServicio: ImportacionDeAcuiculturaService,
    private consultaQuery: ConsultaioQuery
  ) {
    this.importacionAcuiculturaServicio.obtenerDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.formularioPagoStore = datos.formularioPago
    })
  }

  /**
   * Método de inicialización del componente.
   * Crea el formulario, obtiene catálogos y configura valores iniciales.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.crearFormularioPago();
    this.obtenerListaJustificacion();
    this.obtenerListaBanco();
  }

  /**
   * Método del ciclo de vida que se ejecuta después de inicializar la vista.
   * Suscribe a cambios en el formulario y al estado de solo lectura.
   * @method ngAfterViewInit
   * @returns {void}
   */
  ngAfterViewInit(): void {
    this.formularioPago.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        () => {
          this.verificarEstadoDelBoton();
        },
        (error) => {
          console.error('Error durante los cambios de estado del formulario:', error);
        }
      );

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        }
      )
    ).subscribe();
  }

  /**
   * Inicializa el estado del formulario según el modo solo lectura.
   * @method inicializarEstadoFormulario
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.formularioPago.disable();
    } else {
      this.formularioPago.enable();
    }
  }

  /**
   * Crea el formulario de pago según el valor de `exentoPagoValor`.
   * @method crearFormularioPago
   * @returns {void}
   */
  public crearFormularioPago(): void {
    const ESEXENTO = this.formularioPagoStore.exentoPago === 'Si';
    this.formularioPago = this.fb.group({
      exentoPago: [this.formularioPagoStore.exentoPago || 'Si', Validators.required],
      justificacion: [this.formularioPagoStore.justificacion, Validators.required],
      claveReferencia: [{ value: this.formularioPagoStore.claveReferencia, disabled: true }, Validators.required],
      cadenaDependencia: [{ value: this.formularioPagoStore.cadenaDependencia, disabled: true }, Validators.required],
      banco: [this.formularioPagoStore.banco, Validators.required],
      llavePago: [{ value: this.formularioPagoStore.llavePago, disabled: ESEXENTO }, Validators.required],
      fechaPago: [{ value: this.formularioPagoStore.fechaPago, disabled: true }, Validators.required],
      importePago: [{ value: this.formularioPagoStore.importePago, disabled: true }, Validators.required],
    });
  }

  /**
   * Cambia el valor de un campo del formulario.
   * @method cambioValorRadio
   * @param {string} nombreControl Nombre del campo del formulario.
   * @param {string} valor Nuevo valor a asignar.
   * @returns {void}
   */
  cambioValorRadio(nombreControl: string, valor: string): void {
    this.formularioPago.patchValue({
      [nombreControl]: valor,
    });
    this.exentoPagoValor = valor;
    this.crearFormularioPago();
  }

  /**
   * Actualiza la fecha de pago en el formulario.
   * @method cambioFechaFinal
   * @param {string} nuevoValor Nueva fecha de pago.
   * @returns {void}
   */
  cambioFechaFinal(nuevoValor: string): void {
    this.formularioPago.patchValue({
      fechaPago: nuevoValor,
    });
    this.fechaPagoDate = nuevoValor;
  }

  /**
   * Obtiene la lista de bancos desde el servicio.
   * @method obtenerListaBanco
   * @returns {void}
   */
  public obtenerListaBanco(): void {
    this.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo('banco.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.justificacionCatalogo = data.data as Catalogo[];
        this.bancoCatalogo = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * Verifica si el formulario es válido y actualiza el estado del botón.
   * @method verificarEstadoDelBoton
   * @returns {void}
   */
  verificarEstadoDelBoton(): void {
    const DATOS = {
      pagoDeformaValida: false,
    }
    if (this.formularioPago.valid) {
      DATOS.pagoDeformaValida = true
    }
    this.importacionAcuiculturaServicio.actualizarFormaValida(DATOS);
  }

  /**
   * Obtiene la lista de justificaciones desde el servicio.
   * @method obtenerListaJustificacion
   * @returns {void}
   */
  public obtenerListaJustificacion(): void {
    this.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo('justificacion.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(() => {
        // this.justificacionCatalogo = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * Actualiza el valor de un campo en el formulario y lo guarda en el servicio de importación de acuicultura.
   * @method setValoresStore
   * @returns {void}
   */
  setValoresStore(): void {
    this.actualizarValorAleatorio();
    const VALOR = this.formularioPago.value;
    (this.importacionAcuiculturaServicio.actualizarFormularioPago as (value: FormularioPago) => void)(VALOR);
  }

  /**
   * Actualiza ciertos valores en el formulario basados en condiciones.
   * Si la justificación no está vacía y el campo exentoPago es 'Si', actualiza varios campos.
   * Si el banco no está vacío y el campo exentoPago es 'No', actualiza otros campos.
   * @method actualizarValorAleatorio
   * @returns {void}
   */
  actualizarValorAleatorio(): void {
    const HOY = PagoDeDerechosComponent.formatearFecha(new Date());

    if (this.formularioPago.value.justificacion !== '' && this.formularioPagoStore.exentoPago === 'Si') {
      this.formularioPago.patchValue({
        claveReferencia: 'valor',
        cadenaDependencia: 'valor',
        banco: '170',
        fechaPago: HOY,
        importePago: 'valor',
      });
      this.fechaPagoDate = HOY;
    }
    else if (this.formularioPago.value.banco !== '' && this.formularioPagoStore.exentoPago === 'No') {
      this.formularioPago.patchValue({
        justificacion: '170',
        claveReferencia: 'valor',
        cadenaDependencia: 'valor',
        fechaPago: HOY,
        llavePago: 'valor',
        importePago: 'valor',
      });
    }
    this.fechaPagoDate = HOY;
  }

  /**
   * Formatea la fecha en el formato 'dd/mm/yyyy'.
   * @method formatearFecha
   * @static
   * @param {Date} fecha La fecha a formatear.
   * @returns {string} La fecha formateada como un string.
   */
  static formatearFecha(fecha: Date): string {
    const DIA = fecha.getDate().toString().padStart(2, '0');
    const MES = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const ANO = fecha.getFullYear();

    return `${DIA}/${MES}/${ANO}`;
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Libera recursos y cancela las suscripciones.
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}