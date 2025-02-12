import { Component, OnInit } from '@angular/core';
import { FECHA_DE_PAGO } from '../../../../shared/constantes/220202/fitosanitario.enums';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { CatalogosSelect, InputFecha } from '../../../../core/models/shared/components.model';
import { HttpClient } from '@angular/common/http';
import { Catalogo, RespuestaCatalogos } from '../../../../core/models/shared/catalogos.model';

/**
 * @fileoverview Componente para la gestión del formulario de pago de derechos.
 * Este componente maneja la lógica y la presentación del formulario de pago de derechos,
 * incluyendo la inicialización, la obtención de datos, la gestión de los controles del formulario
 * y la validación de los campos.
 * @module pagoDeDerechos
 */

/**
 * Componente para el formulario de pago de derechos.
 * @class PagoDeDerechosComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss']
})
export class PagoDeDerechosComponent implements OnInit {

  /**
   * Configuración para el input de fecha de pago.
   * @property {InputFecha} fechaInicioInput
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  /**
   * Configuración para el selector de justificación.
   * @property {CatalogosSelect} justificacionSelector
   */
  justificacionSelector: Catalogo[];

  /**
   * Configuración para el selector de banco.
   * @property {CatalogosSelect} bancoSelector
   */
  bancoSelector: Catalogo[];

  /**
   * Grupo de formularios para el pago de derechos.
   * @property {FormGroup} pagoForm
   */
  pagoForm: FormGroup = this.fb.group({
    exentoPago: [''],
    justificacion: [{ value: '', disabled: false }, Validators.required], // Add Validators.required
    claveReferencia: [{ value: '', disabled: true }],
    cadenaDependencia: [{ value: '', disabled: true }],
    banco: [{ value: '', disabled: true }, Validators.required], // Add Validators.required
    llavePago: [{ value: '', disabled: false }],
    importePago: [{ value: '', disabled: false }, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]], // Validators for required and decimal format
    fechaDePago: [{ value: '', disabled: true }, Validators.required] // Add Validators.required
  });

  /**
   * @description Método para actualizar la fecha de pago en el formulario.
   * @param {string} nuevo_valor - Nueva fecha a establecer.
   * @returns {void}
   */
  cambioFechaInicio(nuevo_valor: string) {
    this.pagoForm.get('fechaDePago')?.setValue(nuevo_valor);
    this.pagoForm.get('fechaDePago')?.markAsUntouched();
  }

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.
   */
  constructor(private readonly fb: FormBuilder, private readonly httpServicios: HttpClient) { }

  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.obtenerDetallesDeListaDeOpciones();
  }

  /**
   * Obtiene los detalles de las listas de opciones (banco y justificación).
   * @method obtenerDetallesDeListaDeOpciones
   */
  obtenerDetallesDeListaDeOpciones() {
    this.obtenerBancoSelectorList();
    this.obtenerListaDeJustificaciones();
  }

  /**
   * Obtiene la lista de bancos para el selector.
   * @method obtenerBancoSelectorList
   */
  obtenerBancoSelectorList() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/banco.json').subscribe((data): void => {
      const datos = data?.data;
      this.bancoSelector = datos as Catalogo[];
    });
  }

  /**
   * Obtiene la lista de justificaciones para el selector. --220202
   * @method obtenerListaDeJustificaciones
   */
  obtenerListaDeJustificaciones() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220202/Justificación.json').subscribe((data): void => {
      const datos = data?.data;
      this.justificacionSelector = datos as Catalogo[];
    });
  }

  /**
   * Los datos seleccionados se configuran en los campos fromGroup. --220202
   * @method seleccionarListDatas
   * @param {Catalogo} e - El catálogo seleccionado.
   * @param {string} name - El nombre del control del formulario a actualizar.
   */
  seleccionarListDatas(e: Catalogo, name: string) {
    this.pagoForm.patchValue({
      [name]: e.id // Use bracket notation to dynamically set the property
    });

    if (name === 'justificacion') {
      this.pagoForm.get('justificacion')?.enable();
    }

    if (name === 'banco') {
      this.pagoForm.get('banco')?.enable();
    }
  }
}