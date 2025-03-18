import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import {
  Catalogo,
  InputFecha
} from '@ng-mf/data-access-user';

import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';

import {
  Subject,

  takeUntil
} from 'rxjs';

import { PagoForm } from '../../models/220202/fitosanitario.model';

import {
  FECHA_SALIDA_ACUICULTURA,

  TIPO_RADIO
} from '../../../220203/constantes/220203/importacion-de-acuicultura.enum';

import { OpcionDeRadio } from '../../../220203/models/220203/importacion-de-acuicultura.module';

/**
 * Componente para el formulario de pago de derechos.
 * Este componente maneja la lógica y la presentación del formulario de pago de derechos,
 * incluyendo la gestión de los campos del formulario y la obtención de las listas de opciones.
 * @class PagoDeDerechosComponent
 * @implements {OnInit}
 */

/**
 * Componente para mostrar el subtítulo del asistente de pago de derechos.
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
  private destroyNotifier$ = new Subject<void>();
  /**
   * Configuración para el input de fecha de pago.
   * Este objeto contiene la configuración para el campo de fecha de inicio del pago.
   * @property {InputFecha} fechaInicioInput
   */
  fechaInicioInput: InputFecha = {
    labelNombre: 'Fecha de pago',
    required: true,
    habilitado: false
  };

  /**
   * Configuración para el selector de justificación.
   * Esta propiedad contiene la lista de justificaciones que se usan en el formulario.
   * @property {Catalogo} justificacionCatalogo
   */
  justificacionCatalogo: Catalogo[] = [];

  /**
   * Configuración para el selector de banco.
   * Esta propiedad contiene la lista de bancos que se usan en el formulario.
   * @property {Catalogo} bancoCatalogo
   */
  bancoCatalogo: Catalogo[] = [];

  /**
   * Grupo de formularios para el pago de derechos.
   * Este objeto contiene los campos de formulario utilizados para capturar la información del pago de derechos.
   * @property {FormGroup} pagoForm
   */
  pagoForm!: FormGroup;

  /**
   * Opciones para el radio button de exención de pago.
   * Esta propiedad contiene las opciones de radio button que permiten al usuario elegir si está exento de pagar o no.
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
  formularioPagoStore: PagoForm = {} as PagoForm;
  fechaPagoDate: string = '15/03/2025';
  fechaFinalInput: InputFecha = FECHA_SALIDA_ACUICULTURA;
  /**
 * @description Valor seleccionado para la exención de pago.
 * @type {string}
 */
  exentoPagoValor: string = 'Si';
  exentoPagoRadio: OpcionDeRadio[] = TIPO_RADIO;


  /**
   * Valor seleccionado en el radio button de exención de pago.
   * Esta propiedad almacena el valor seleccionado por el usuario en el radio button de exención de pago.
   * @property {string} selectedValue
   */
  selectedValue: string = 'no';

  /**
   * Método para actualizar la fecha de pago en el formulario.
   * Este método se usa para cambiar el valor de la fecha de pago en el formulario.
   * @method cambioFechaInicio
   * @param {string} nuevo_valor - Nueva fecha a establecer.
   * @returns {void}
   */
  cambioFechaInicio(nuevo_valor: string) {
    this.pagoForm.get('fechaDePago')?.setValue(nuevo_valor);
    this.pagoForm.get('fechaDePago')?.markAsUntouched();
  }

  /**
   * Constructor del componente.
   * Inicializa el formulario y las dependencias necesarias.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {AgriculturaApiService} agriculturaApiService - Cliente HTTP para realizar solicitudes a la API de Agricultura.
   */
  constructor(private readonly fb: FormBuilder, private readonly agriculturaApiService: AgriculturaApiService) {
    this.agriculturaApiService.getAllDatosForma().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.formularioPagoStore = datos.pago;
    })
  }

  /**
   * Inicializa el componente.
   * Este método se llama automáticamente después de la creación del componente.
   * Llama a la obtención de las listas de opciones necesarias para el formulario.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.pagoForm = this.fb.group({
      exentoPago: [this.formularioPagoStore.exentoPago || 'Si', Validators.required],
      justificacion: [this.formularioPagoStore.justificacion, Validators.required],
      claveReferencia: [{ value: this.formularioPagoStore.claveReferencia || '', disabled: true }, Validators.required],
      cadenaDependencia: [{ value: this.formularioPagoStore.cadenaDependencia || '', disabled: true }, Validators.required],
      banco: [this.formularioPagoStore.banco, Validators.required],
      llavePago: [{ value: this.formularioPagoStore.llavePago || '', disabled: true }, Validators.required],
      fechaPago: [{ value: this.formularioPagoStore.fechaPago || '', disabled: true }, Validators.required],
      importePago: [{ value: this.formularioPagoStore.importePago || '', disabled: true }, Validators.required],
    });
    this.pagoForm.statusChanges
      .pipe(takeUntil(this.destroyNotifier$)) // Ensures unsubscribe on component destruction
      .subscribe(
        () => {

          const FORMA_VALIDA_ACTUALIZADA = {
            validaciondeFormulariodePago: false,
          };
          FORMA_VALIDA_ACTUALIZADA.validaciondeFormulariodePago = this.pagoForm.valid ? true : false;
          this.agriculturaApiService.actualizarFormaValida(FORMA_VALIDA_ACTUALIZADA); // Implement this method to handle button state changes
        },
        (error) => {
          console.error('Error during form status changes:', error);
        }
      );
    this.obtenerDetallesDeListaDeOpciones();
  }

  /**
   * Obtiene los detalles de las listas de opciones (banco y justificación).
   * Este método realiza las llamadas necesarias para obtener los datos de los selectores desde el servicio.
   * @method obtenerDetallesDeListaDeOpciones
   * @returns {void}
   */
  obtenerDetallesDeListaDeOpciones() {
    this.obtenerBancoSelectorList();
    this.obtenerListaDeJustificaciones();
  }


  /**
   * @description Actualiza la fecha de pago en el formulario.
   * @param {string} nuevoValor Nueva fecha de pago.
   */
  cambioFechaFinal(nuevoValor: string): void {
    this.pagoForm.patchValue({
      fechaPago: nuevoValor,
    });
    this.fechaPagoDate = nuevoValor;
  }

  /**
   * Obtiene la lista de bancos para el selector.
   * Este método solicita la lista de bancos a la API y la asigna a la propiedad `bancoSelector`.
   * @method obtenerBancoSelectorList
   * @returns {void}
   */
  obtenerBancoSelectorList() {
    this.agriculturaApiService.obtenerSelectorList('banco.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(data => {
        if (data) {
          this.bancoCatalogo = data as Catalogo[];
        }
      });
  }

  /**
   * Obtiene la lista de justificaciones para el selector.
   * Este método solicita la lista de justificaciones a la API y la asigna a la propiedad `justificacionSelector`.
   * @method obtenerListaDeJustificaciones
   * @returns {void}
   */
  obtenerListaDeJustificaciones() {
    this.agriculturaApiService.obtenerSelectorList('Justificación.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(data => {
        if (data) {
          this.justificacionCatalogo = data;
        }
      });
  }

  /**
   * Configura los datos seleccionados en los campos del formulario.
   * Este método actualiza los valores de los controles del formulario según el catálogo seleccionado.
   * @method seleccionarListDatas
   * @param {Catalogo} e - El catálogo seleccionado.
   * @param {string} name - El nombre del control del formulario a actualizar.
   * @returns {void}
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

  /**
   * Actualiza los valores en el store del servicio.
   * Este método obtiene el valor de un campo específico del formulario y lo actualiza en el servicio.
   * @method setValoresStore
   * @param {FormGroup} form - El formulario que contiene los datos a actualizar.
   * @param {string} campo - El nombre del campo cuyo valor se actualizará.
   * @returns {void}
   */
  setValoresStore(
    form?: FormGroup,
    campo?: string,

  ): void {
    if (campo === 'justificacion') {
      this.pagoForm.get('claveReferencia')?.enable();
      this.pagoForm.get('cadenaDependencia')?.enable();
      this.pagoForm.get('llavePago')?.enable();
      this.pagoForm.get('fechaPago')?.enable();
      this.pagoForm.get('importePago')?.enable();
      // After patching the form with values
      this.pagoForm.patchValue({
        claveReferencia: 'CR-123456',
        cadenaDependencia: 'Dependencia-34',
        banco: '2',
        llavePago: 'LL-7890',
        fechaPago: '2025-03-14',
        importePago: '500.00',
      });

    }
    const VALOR = this.pagoForm.value;
    this.agriculturaApiService.updatePago(VALOR);
    this.pagoForm.get('claveReferencia')?.disable();
    this.pagoForm.get('cadenaDependencia')?.disable();
    this.pagoForm.get('llavePago')?.disable();
    this.pagoForm.get('fechaPago')?.disable();
    this.pagoForm.get('importePago')?.disable();
  }
  /**
    * Maneja el evento de cambio para la entrada de fecha.
    * @param evento - El nuevo valor de la fecha como cadena.
    */
  fechaCambiado(evento: string): void {
    // Manejar cambio de fecha
    this.pagoForm.patchValue({
      fechaInicioInput: evento
    });
    const VALOR = this.pagoForm.value;
    this.agriculturaApiService.updatePago(VALOR);
  }
  /**
 * @description Cambia el valor de un campo del formulario.
 * @param {string} nombreControl Nombre del campo del formulario.
 * @param {string} valor Nuevo valor a asignar.
 */
  cambioValorRadio(nombreControl: string, valor: string): void {
    this.pagoForm.patchValue({
      [nombreControl]: valor,
    });
    this.exentoPagoValor = valor;
  }

  /**
   * Limpia las suscripciones activas cuando el componente es destruido.
   * Este método se llama automáticamente cuando el componente es destruido para evitar fugas de memoria.
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
