import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Catalogo, InputFecha } from '@ng-mf/data-access-user';

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
  exentoPagoValor = 'Si';

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

  private destroyNotifier$ = new Subject<void>();

  /**
   * @description Constructor que inicializa el servicio de formularios y el servicio de importación de acuicultura.
   * @param {FormBuilder} fb FormBuilder para la creación de formularios reactivos.
   * @param {ImportacionDeAcuiculturasService} importacionAcuiculturasServicio Servicio para obtener datos de importación.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionAcuiculturaServicio: ImportacionDeAcuiculturaService
  ) {
    this.crearFormularioPago();
  }

  /**
   * @description Método de inicialización del componente.
   */
  ngOnInit(): void {

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
    this.importacionAcuiculturaServicio.obtenerDatos().subscribe((data) => {
      console.log(data.formularioPago);
      const ESEXENTO = this.exentoPagoValor === 'Si';
      this.formularioPago = this.fb.group({
        exentoPago: [data.formularioPago.exentoPago, Validators.required],
        justificacion: [data.formularioPago.justificacion || '', Validators.required],
        claveReferencia: [{ value: data.formularioPago.claveReferencia || '', disabled: true }, Validators.required],
        cadenaDependencia: [{ value: data.formularioPago.cadenaDependencia || '', disabled: true }, Validators.required],
        banco: [data.formularioPago.cadenaDependencia || '', Validators.required],
        llavePago: [{ value: data.formularioPago.llavePago || '', disabled: ESEXENTO }, Validators.required],
        fechaPago: [{ value: data.formularioPago.fechaPago || '', disabled: true }, Validators.required],
        importePago: [{ value: data.formularioPago.importePago || '', disabled: true }, Validators.required],
      });
    })
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
  setValoresStore(
    form: FormGroup,
    campo: string,
  ): void {
    const VALOR = this.formularioPago.value;
    console.log(this.formularioPago.value);
    (this.importacionAcuiculturaServicio.actualizarFormularioPago as (value: FormularioPago) => void)(VALOR);
  }

  /**
   * @description Método que se ejecuta cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
