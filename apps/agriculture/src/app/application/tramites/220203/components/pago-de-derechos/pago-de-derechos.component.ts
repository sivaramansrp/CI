import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Catalogo, InputFecha } from '@ng-mf/data-access-user';

import { FECHA_SALIDA_ACUICULTURA, TIPO_RADIO } from '../../constantes/220203/importacion-de-acuicultura.enum';

import { OpcionDeRadio } from '../../models/220203/importacion-de-acuicultura.module';

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
 */
  formularioPago!: FormGroup;
  /**
   * @description Opciones de radio para la exención de pago.
   */
  exentoPagoRadio: OpcionDeRadio[] = TIPO_RADIO;
  /**
   * @description Valor seleccionado para la exención de pago.
   */
  exentoPagoValor = 'Si';
  /**
   * @description Catálogo de justificaciones para la exención de pago.
   */
  justificacionCatalogo: Catalogo[] = [];
  /**
   * @description Catálogo de bancos para el pago.
   */
  bancoCatalogo: Catalogo[] = [];
  /**
   * @description Configuración para el input de fecha de salida.
   */
  fechaFinalInput: InputFecha = FECHA_SALIDA_ACUICULTURA;

  /**
   * @description Constructor que inicializa el servicio de formularios y el servicio de importación de acuicultura.
   * @param fb FormBuilder para la creación de formularios reactivos.
   * @param importacionAcuiculturaServicio Servicio para obtener datos de importación.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionAcuiculturaServicio: ImportacionDeAcuiculturaService
  ) {
    console.log('PAGO DE DERECHOS COMPONENT');
  }

  /**
   * @description Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.crearFormularioPago();
    this.obtenerListaJustificacion();
    this.obtenerListaBanco();
  }

  /**
   * @description Crea el formulario de pago según el valor de `exentoPagoValor`.
   */
  private crearFormularioPago(): void {
    const ESEXENTO = this.exentoPagoValor === 'Si';
    this.formularioPago = this.fb.group({
      exentoPago: ['', Validators.required],
      justificacion: ['', Validators.required],
      claveReferencia: [{ value: '', disabled: true }],
      cadenaDependencia: [{ value: '', disabled: true }],
      banco: ['', Validators.required],
      llavePago: [{ value: '', disabled: ESEXENTO }],
      fechaPago: [{ value: '', disabled: true }],
      importePago: [{ value: '', disabled: true }],
    });
  }

  /**
   * @description Cambia el valor de un campo del formulario.
   * @param nombreControl Nombre del campo del formulario.
   * @param valor Nuevo valor a asignar.
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
   * @param nuevoValor Nueva fecha de pago.
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
    this.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo('banco.json').subscribe((data) => {
      this.bancoCatalogo = data.data as Catalogo[];
    });
  }

  /**
   * @description Obtiene la lista de justificaciones desde el servicio.
   */
  private obtenerListaJustificacion(): void {
    this.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo('justificacion.json').subscribe((data) => {
      this.justificacionCatalogo = data.data as Catalogo[];
    });
  }
  ngOnDestroy(): void {
    console.log(this.formularioPago.value);
  }
}
