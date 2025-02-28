import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FECHA_SALIDA_ACUICULTURA, TIPO_RADIO, InputFecha, ImportacionDeAcuiculturaService, Catalogo, OpcionDeRadio } from '@ng-mf/data-access-user';
/**
 * @description Componente para el pago de derechos en la importación de acuicultura.
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
})
export class PagoDeDerechosComponent implements OnInit {
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
  ) { }
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
    const esExento = this.exentoPagoValor === 'Si';
    this.formularioPago = this.fb.group({
      exentoPago: ['', Validators.required],
      justificacion: ['', Validators.required],
      claveReferencia: [{ value: '', disabled: true }],
      cadenaDependencia: [{ value: '', disabled: true }],
      banco: ['', Validators.required],
      llavePago: [{ value: '', disabled: esExento }],
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
}