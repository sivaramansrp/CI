import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, Catalogo, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFecha, InputFechaComponent, InputRadioComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';

import { FECHA_SALIDA_ACUICULTURA, TIPO_RADIO } from '../../constantes/220203/importacion-de-acuicultura.enum';

import { FormularioPago, OpcionDeRadio } from '../../models/220203/importacion-de-acuicultura.module';

import { Subject, takeUntil } from 'rxjs';

import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';


/**
 * @description Componente para el pago de derechos en la importación de acuicultura.
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  standalone: true,
  imports: [
    InputRadioComponent,
    InputCheckComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
    CrosslistComponent,
    BtnContinuarComponent,
    AnexarDocumentosComponent,
    TableComponent,
    TituloComponent,
    AlertComponent,
    ReactiveFormsModule
  ]
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * @description Formulario para el pago de derechos.
   * @type {FormGroup}
   */
  formularioPago!: FormGroup;

  /**
   * @description Opciones de radio para la exención de pago.
   * @type {OpcionDeRadio[]}
   */
  exentoPagoRadio: OpcionDeRadio[] = TIPO_RADIO;

  /**
   * @description Valor seleccionado para la exención de pago.
   * @type {string}
   */
  exentoPagoValor: string = 'Si';

  /**
   * @description Catálogo de justificaciones para la exención de pago.
   * @type {Catalogo[]}
   */
  justificacionCatalogo: Catalogo[] = [];

  /**
   * @description Catálogo de bancos para el pago.
   * @type {Catalogo[]}
   */
  bancoCatalogo: Catalogo[] = [];

  /**
   * @description Configuración para el input de fecha de salida.
   * @type {InputFecha}
   */
  fechaFinalInput: InputFecha = FECHA_SALIDA_ACUICULTURA;

  fechaPagoDate: string = '15/03/2025';

  private destroyNotifier$ = new Subject<void>();
  formularioPagoStore: FormularioPago = {} as FormularioPago;
  /**
   * @description Constructor que inicializa el servicio de formularios y el servicio de importación de acuicultura.
   * @param {FormBuilder} fb FormBuilder para la creación de formularios reactivos.
   * @param {ImportacionDeAcuiculturasService} importacionAcuiculturasServicio Servicio para obtener datos de importación.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionAcuiculturaServicio: ImportacionDeAcuiculturaService
  ) {
    this.importacionAcuiculturaServicio.obtenerDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.formularioPagoStore = datos.formularioPago
    })

  }

  /**
   * @description Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.crearFormularioPago();
    this.formularioPago.statusChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        () => {
          this.verificarEstadoDelBoton(); // Se puede implementar este método para manejar cambios en el estado del botón.
        },
        (error) => {
          console.error('Error durante los cambios de estado del formulario:', error);
        }
      );

    this.obtenerListaJustificacion();
    this.obtenerListaBanco();
  }

  /**
   * @description Crea el formulario de pago según el valor de `exentoPagoValor`.
   */
  private crearFormularioPago(): void {
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
   * @description Cambia el valor de un campo del formulario.
   * @param {string} nombreControl Nombre del campo del formulario.
   * @param {string} valor Nuevo valor a asignar.
   */
  cambioValorRadio(nombreControl: string, valor: string): void {
    this.formularioPago.patchValue({
      [nombreControl]: valor,
    });
    this.exentoPagoValor = valor;
    this.crearFormularioPago();
  }

  /**
   * @description Actualiza la fecha de pago en el formulario.
   * @param {string} nuevoValor Nueva fecha de pago.
   */
  cambioFechaFinal(nuevoValor: string): void {
    this.formularioPago.patchValue({
      fechaPago: nuevoValor,
    });
    this.fechaPagoDate = nuevoValor;
  }

  /**
   * @description Obtiene la lista de bancos desde el servicio.
   */
  private obtenerListaBanco(): void {
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
   * @description Verifica si el formulario es válido y actualiza el estado del botón.
   */
  verificarEstadoDelBoton() {
    const DATOS = {
      pagoDeformaValida: false,
    }
    if (this.formularioPago.valid) {
      DATOS.pagoDeformaValida = true
    }
    this.importacionAcuiculturaServicio.actualizarFormaValida(DATOS);
  }

  /**
   * @description Obtiene la lista de justificaciones desde el servicio.
   */
  private obtenerListaJustificacion(): void {
    this.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo('justificacion.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        // this.justificacionCatalogo = data.data as Catalogo[];
      }, (error) => {
        console.error(error);
      });
  }

  /**
   * @description Actualiza el valor de un campo en el formulario y lo guarda en el servicio de importación de acuicultura.
   * @param {FormGroup} form El formulario con el campo que se está actualizando.
   * @param {string} campo El nombre del campo que se actualizará.
   */
  /**
 * @description Actualiza el valor de un campo en el formulario y lo guarda en el servicio de importación de acuicultura.
 * @param {FormGroup} formulario El formulario con el campo que se está actualizando.
 * @param {string} campo El nombre del campo que se actualizará.
 */
  setValoresStore(
    formulario: FormGroup,
    campo: string,
  ): void {
    this.actualizarValorAleatorio();
    const VALOR = this.formularioPago.value;
    (this.importacionAcuiculturaServicio.actualizarFormularioPago as (value: FormularioPago) => void)(VALOR);
  }

  /**
   * @description Actualiza ciertos valores en el formulario basados en condiciones.
   * @remarks Si se cumple una condición, se actualizan los valores del formulario.
   */
  actualizarValorAleatorio(): void {
    const HOY = PagoDeDerechosComponent.formatearFecha(new Date());

    // Si la justificación no está vacía y el campo exentoPago es 'Si'
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

    // Si el banco no está vacío y el campo exentoPago es 'No'
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
   * @description Formatea la fecha en el formato 'dd/mm/yyyy'.
   * @param {Date} fecha La fecha a formatear.
   * @returns {string} La fecha formateada como un string.
   */
  static formatearFecha(fecha: Date): string {
    const DIA = fecha.getDate().toString().padStart(2, '0'); // Asegura que el día tenga 2 dígitos
    const MES = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Asegura que el mes tenga 2 dígitos
    const ANO = fecha.getFullYear();

    return `${DIA}/${MES}/${ANO}`;
  }


  /**
   * @description Método que se ejecuta cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
