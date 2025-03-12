import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Catalogo, InputFecha } from '@ng-mf/data-access-user';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { skip, Subscription } from 'rxjs';

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
interface RadioOption {
  label: string;
  value: string;
}
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss']
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * Configuración para el input de fecha de pago.
   * @property {InputFecha} fechaInicioInput
   */
  fechaInicioInput: InputFecha = {
    labelNombre: '',
    required: false,
    habilitado: false
  };
  /**
   * Configuración para el selector de justificación.
   * @property {Catalogo} justificacionSelector
   */
  justificacionSelector: Catalogo[] = [];
  /**
   * Configuración para el selector de banco.
   * @property {Catalogo} bancoSelector
   */
  bancoSelector: Catalogo[] = [];
  /**
   * Grupo de formularios para el pago de derechos.
   * @property {FormGroup} pagoForm
   */
  pagoForm!: FormGroup;
  /**
   * Opciones para el radio button de exención de pago.
   * @property {RadioOption[]} radioOptions
   */
  radioOptions: RadioOption[] = [
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


  private subscription: Subscription = new Subscription();
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
  constructor(private readonly fb: FormBuilder, private readonly agriculturaApiService: AgriculturaApiService) {
    this.pagoForm = this.fb.group({
      exentoPago: [''],
      justificacion: [{ value: '', disabled: false }],
      claveReferencia: [{ value: '', disabled: true }],
      cadenaDependencia: [{ value: '', disabled: true }],
      banco: [{ value: '', disabled: true }],
      llavePago: [{ value: '', disabled: false }],
      importePago: [{ value: '', disabled: true }],
    });
  }
  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.pagoForm.valueChanges.pipe(skip(1)).subscribe((changes) => {
      const FORMA_VALIDA_ACTUALIZADA = {
        validaciondeFormulariodePago: false,
      };
      FORMA_VALIDA_ACTUALIZADA.validaciondeFormulariodePago = this.pagoForm.valid ? true : FORMA_VALIDA_ACTUALIZADA.validaciondeFormulariodePago;
      this.agriculturaApiService.actualizarFormaValida(FORMA_VALIDA_ACTUALIZADA);
    });
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
      if (data) {
        this.bancoSelector = data;
      }

    })
  }
  /**
   * Obtiene la lista de justificaciones para el selector. --220202
   * @method obtenerListaDeJustificaciones
   */
  obtenerListaDeJustificaciones() {
    this.agriculturaApiService.obtenerSelectorList('Justificación.json').subscribe(data => {
      if (data) {
        this.justificacionSelector = data;
      }

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
      [name]: e.id
    });
    if (name === 'justificacion') {
      this.pagoForm.get('justificacion')?.enable();
    }
    if (name === 'banco') {
      this.pagoForm.get('banco')?.enable();
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.agriculturaApiService.updatePago(this.pagoForm.value);
  }
}