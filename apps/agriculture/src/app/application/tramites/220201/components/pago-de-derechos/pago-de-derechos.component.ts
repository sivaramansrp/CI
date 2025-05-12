import { HttpClient } from '@angular/common/http';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Catalogo, InputFecha, RespuestaCatalogos } from '@ng-mf/data-access-user';

import { FECHA_DE_PAGO } from '../../constantes/certificado-zoosanitario.enum';

import { RadioOpcion } from '../../models/220201/certificado-zoosanitario.model';

import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';

import { skip } from 'rxjs';

/**
 * @fileoverview Componente para la gestión del formulario de pago de derechos.
 * Este componente maneja la lógica y la presentación del formulario de pago de derechos,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
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
export class PagoDeDerechosComponent implements OnDestroy, OnInit {

  /**
   * Configuración para el input de fecha de pago.
   * @property {InputFecha} fechaInicioInput
   */
  fechaInicioInput: InputFecha = FECHA_DE_PAGO;

  /**
   * Configuración para el selector de justificación.
   * @property {CatalogosSelect} justificacionSelector
   */
  justificacionSelector: Catalogo[] = [];

  /**
   * Configuración para el selector de banco.
   * @property {CatalogosSelect} bancoSelector
   */
  bancoSelector: Catalogo[] = [];

  /**
   * Grupo de formularios para el pago de derechos.
   * @property {FormGroup} pagoForm
   */
  pagoForm: FormGroup = this.fb.group({
    exentoPago: [{ value: '', disabled: false }],
    justificacion: [{ value: '', disabled: false }, Validators.required],
    claveReferencia: [{ value: '', disabled: true }],
    cadenaDependencia: [{ value: '', disabled: true }],
    banco: [{ value: '', disabled: true }],
    llavePago: [{ value: '', disabled: true }],
    importePago: [{ value: '', disabled: true }]
  });


  /**
  * Opciones para el radio button de exención de pago.
  * @property {RadioOpcion[]} radioOptions
  */
  radioOptions: RadioOpcion[] = [
    {
      "label": "No",
      "value": "no"
    },
    {
      "label": "Sí",
      "value": "Si"
    }
  ];
  /**
     * Valor seleccionado en el radio button de exención de pago.
     * @property {string} selectedValue
     */
  selectedValue: string = 'no';

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.
   */
  constructor(private readonly fb: FormBuilder, private readonly httpServicios: HttpClient, private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService) {
    this.obtenerDetallesDeListaDeOpciones();
  }

  ngOnInit(): void {
    this.pagoForm.valueChanges.pipe(skip(1)).subscribe((changes) => {
      const FORMA_VALIDA_ACTUALIZADA = {
        pagoDeformaValida: false,
      };
      if (this.pagoForm.valid) {
        FORMA_VALIDA_ACTUALIZADA.pagoDeformaValida = true;
      }
      this.certificadoZoosanitarioServices.actualizarFormaValida(FORMA_VALIDA_ACTUALIZADA);
    });
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
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/banco.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.bancoSelector = DATOS as Catalogo[];
    });
  }

  /**
   * Obtiene la lista de justificaciones para el selector. --220201
   * @method obtenerListaDeJustificaciones
   */
  obtenerListaDeJustificaciones() {
    this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/Justificación.json').subscribe((data): void => {
      const DATOS = data?.data;
      this.justificacionSelector = DATOS as Catalogo[];
    });
  }
  ngOnDestroy(): void {

    this.certificadoZoosanitarioServices.updatePagoDeDerechos(this.pagoForm.value);
  }
}