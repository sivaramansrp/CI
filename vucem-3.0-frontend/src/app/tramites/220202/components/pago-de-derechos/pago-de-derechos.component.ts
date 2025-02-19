import { FormBuilder, FormGroup } from "@angular/forms"
import { Catalogo } from "../../../../core/models/shared/catalogos.model"
import { InputFecha } from "../../../../core/models/shared/components.model"
import { FECHA_DE_PAGO } from "../../../../shared/constantes/220202/fitosanitario.enums"
import { Component, OnInit } from "@angular/core"

import { AgriculturaApiService } from "../../../../core/services/220202/agricultura-api.service"


/**
 * Componente para el formulario de pago de derechos.
 * @class PagoDeDerechosComponent
 * @implements {OnInit}
 */


/**
 * Componente para mostrar el subtítulo del asistente.
 * @component PagoDeDerechosComponent
 * @selector app-pago-de-derechos
 * @templateUrl ./pago-de-derechos.component.html
 * @styleUrls ./pago-de-derechos.component.scss --220202
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
   * @property {Catalogo} justificacionSelector
   */
  justificacionSelector: Catalogo[];

  /**
   * Configuración para el selector de banco.
   * @property {Catalogo} bancoSelector
   */
  bancoSelector: Catalogo[];

  /**
   * Grupo de formularios para el pago de derechos.
   * @property {FormGroup} pagoForm
   */
  pagoForm: FormGroup = this.fb.group({
    exentoPago: [''],
    justificacion: [{ value: '', disabled: false }], // Validators.required removed
    claveReferencia: [{ value: '', disabled: true }],
    cadenaDependencia: [{ value: '', disabled: true }],
    banco: [{ value: '', disabled: true }], // Validators.required removed
    llavePago: [{ value: '', disabled: false }],
    importePago: [{ value: '', disabled: true }], // Validators.required removed
    fechaDePago: [{ value: '', disabled: true }] // Validators.required removed
  });

  /**
   * Opciones para el radio button de exención de pago.
   * @property {any[]} radioOptions
   */
  radioOptions: any[] = [
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
   * @param {AgriculturaApiService} agriculturaApiService - Cliente HTTP para realizar solicitudes.
   */
  constructor(private readonly fb: FormBuilder, private readonly agriculturaApiService: AgriculturaApiService) { }

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
    this.agriculturaApiService.obtenerSelectorList('banco.json').subscribe(data => {
      this.bancoSelector = data as Catalogo[];
    })

  }

  /**
   * Obtiene la lista de justificaciones para el selector. --220202
   * @method obtenerListaDeJustificaciones
   */
  obtenerListaDeJustificaciones() {
    this.agriculturaApiService.obtenerSelectorList('Justificación.json').subscribe(data => {
      this.justificacionSelector = data as Catalogo[];
    })
  }

  /**
   * Los datos seleccionados se configuran en los campos fromGroup. --220202
   * @method seleccionarListDatas
   * @param {Catalogo} e - El catálogo seleccionado.
   * @param {string} name - El nombre del control del formulario a actualizar.
   */
  seleccionarListDatas(e: Catalogo, name: string) {
    this.pagoForm.patchValue({
      [name]: e.id // Se usa notación de corchetes para establecer dinámicamente la propiedad
    });

    if (name === 'justificacion') {
      this.pagoForm.get('justificacion')?.enable();
    }

    if (name === 'banco') {
      this.pagoForm.get('banco')?.enable();
    }
  }
}
