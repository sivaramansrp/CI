import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  Catalogo,
  InputFecha
} from '@ng-mf/data-access-user';

import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';

import { Subject, takeUntil } from 'rxjs';

import { ListaDeDatosFinal } from '../../models/220202/fitosanitario.model';

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
    labelNombre: 'saddddddddddddddddd',
    required: true,
    habilitado: true
  };

  /**
   * Configuración para el selector de justificación.
   * Esta propiedad contiene la lista de justificaciones que se usan en el formulario.
   * @property {Catalogo} justificacionSelector
   */
  justificacionSelector: Catalogo[] = [];

  /**
   * Configuración para el selector de banco.
   * Esta propiedad contiene la lista de bancos que se usan en el formulario.
   * @property {Catalogo} bancoSelector
   */
  bancoSelector: Catalogo[] = [];

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
    this.pagoForm = this.fb.group({
      exentoPago: [''],
      justificacion: [{ value: '', disabled: false }],
      claveReferencia: [{ value: '', disabled: true }],
      cadenaDependencia: [{ value: '', disabled: true }],
      banco: [{ value: '', disabled: true }],
      llavePago: [{ value: '', disabled: false }],
      importePago: [{ value: '', disabled: true }],
      fechaInicioInput: ['']
    });
  }

  /**
   * Inicializa el componente.
   * Este método se llama automáticamente después de la creación del componente.
   * Llama a la obtención de las listas de opciones necesarias para el formulario.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.pagoForm.statusChanges
      .pipe(takeUntil(this.destroyNotifier$)) // Ensures unsubscribe on component destruction
      .subscribe(
        () => {

          const FORMA_VALIDA_ACTUALIZADA = {
            validaciondeFormulariodePago: false,
          };
          FORMA_VALIDA_ACTUALIZADA.validaciondeFormulariodePago = this.pagoForm.valid ? true : FORMA_VALIDA_ACTUALIZADA.validaciondeFormulariodePago;
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
          this.bancoSelector = data;
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
          this.justificacionSelector = data;
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
    form: FormGroup,
    campo: string,

  ): void {
    const VALOR = form.get(campo)?.value;
    this.agriculturaApiService.updatePago(VALOR);
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
