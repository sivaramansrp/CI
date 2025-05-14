import { AgregarDatosProductorFormulario, Catalogo, FormularioHistorico, HistoricoColumnas, MercanciaTabla } from '../../models/certificado-origen.model';
import { CONFIGURACION_MERCANCIA, CONFIGURACION_PRODUCTOR_EXPORTADOR } from '../../constantes/certificado-tabla.enum';
import { CatalogoSelectComponent, Notificacion } from "@ng-mf/data-access-user";
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConfiguracionColumna, InputCheckComponent, REGEX_SOLO_DIGITOS, TablaDinamicaComponent, TablaSeleccion, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { NotificacionesComponent } from "@ng-mf/data-access-user";
import { Subject } from 'rxjs';

/**
 * Componente para gestionar el histórico de productores.
 * 
 * Este componente permite al usuario visualizar, seleccionar y gestionar productores relacionados
 * con el trámite. También incluye la funcionalidad para agregar nuevos productores y gestionar
 * datos confidenciales.
 */
@Component({
  selector: 'app-historico-productores',
  standalone: true,
  imports: [CommonModule, TituloComponent, FormsModule, ReactiveFormsModule, TablaDinamicaComponent, InputCheckComponent, CatalogoSelectComponent, NotificacionesComponent],
  templateUrl: './historico-productores.component.html',
  styleUrl: './historico-productores.component.scss',
})
export class HistoricoProductoresComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para gestionar los datos de los productores.
   */
  formulario!: FormGroup;
  /**
 * Formulario para gestionar los datos de mercancías.
 * 
 * Permite capturar y validar los datos relacionados con las mercancías.
 */
  formularioMercancia!: FormGroup;

  /**
   * Propiedad de entrada que contiene una lista de opciones de catálogo para el "Tipo Factura".
   * Esta propiedad se espera que sea llenada con un arreglo de objetos `Catalogo`.
   * 
   * @comando Utilizada para proporcionar las opciones disponibles de tipo de factura al componente.
   */
  @Input() optionsTipoFactura!: Catalogo[];
  /**
   * @input tramiteState - Representa el estado del formulario histórico.
   * Este objeto contiene los datos relacionados con el historial de productores.
   * 
   * @command Este decorador permite que el componente reciba datos desde su componente padre.
   */
  @Input() tramiteState: FormularioHistorico = {};
  /**
   * @input mercanciaDatos
   * 
   * Arreglo de objetos de tipo `MercanciaTabla` que contiene los datos de mercancías
   * para ser utilizados en el componente. Este input permite pasar información desde
   * un componente padre.
   * 
   * @type {MercanciaTabla[]}
   * @default []
   */
  @Input() mercanciaDatos: MercanciaTabla[] = [];

  /**
   * @property {MercanciaTabla[]} mercanciaDatosSeleccionada
   * 
   * @description
   * Arreglo que almacena los datos seleccionados de mercancías.
   * 
   * @command
   * Utilizar este arreglo para gestionar la selección de mercancías en la tabla.
   */
  mercanciaDatosSeleccionada:MercanciaTabla[] = [];
  /**
   * @method agregarDatosProductor
   * @description Este decorador de entrada (@Input) se utiliza para recibir un objeto 
   * de tipo `AgregarDatosProductorFormulario` que contiene los datos necesarios 
   * para agregar información del productor en el formulario.
   * 
   * @command Este objeto debe ser proporcionado por el componente padre que utiliza 
   * este componente hijo.
   */

  @Input() agregarDatosProductor: AgregarDatosProductorFormulario = {};
  /**
   * @property {string} mensajeDeAlerta - Mensaje de alerta que indica 
   * la necesidad de agregar al menos un productor por exportador.
   * 
   * @command Este mensaje se utiliza para notificar al usuario 
   * sobre la validación requerida en la asignación de productores.
   */
  mensajeDeAlerta: string = 'Es necesario agregar al menos un productor por exportador';
  /**
   * Propiedad de entrada que recibe los datos de la tabla de mercancia.
   * @type {Mercancia[]}
   */
  /**
   * @input productoresExportador
   * 
   * Lista de productores asociados a un exportador, representada como un arreglo de objetos 
   * del tipo `HistoricoColumnas`. Este dato es proporcionado como entrada al componente.
   * 
   * @type {HistoricoColumnas[]}
   */
  @Input() productoresExportador!: HistoricoColumnas[];

  /**
    * Emisor de eventos para indicar si el formulario es válido.
    * @type {EventEmitter<boolean>}
    */
  @Output() formaValida: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );
  /**
 * Propiedad de salida que emite el valor del formulario cuando se actualiza.
 * @type {EventEmitter<undefined>}
 */
  @Output() formHistoricoEvent: EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }> = new EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }>();

  /**
   * Propiedad de entrada que indica si se debe ocultar el campo de fax.
   * 
   * @type {boolean}
   * @default false
   */
  @Input() ocultarFax!: boolean;

  /**
   * @input esTipoDeSeleccionado Indica si el tipo seleccionado es válido o no.
   * @type {boolean}
   */
  @Input() esTipoDeSeleccionado!: boolean;

  /**
 * Propiedad de salida que emite el valor del formulario cuando se actualiza.
 * @type {EventEmitter<undefined>}
 */
  @Output() agregarDatosProductorFormularioEvent: EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }> = new EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }>();

  /**
 * Configuración de la tabla de selección.
 * 
 * Esta propiedad se utiliza para gestionar la configuración y el comportamiento
 * de la tabla de selección en el componente.
 * 
 * @type {TablaSeleccion}
 */
  TablaSeleccion = TablaSeleccion;

  /**
   * Configuración de las columnas de la tabla dinámica.
   */
  tableColumns: ConfiguracionColumna<HistoricoColumnas>[] = CONFIGURACION_PRODUCTOR_EXPORTADOR;

  /**
   * Lista de productores seleccionados para agregar.
   */
  seleccionadoProductoresExportador: HistoricoColumnas[] = [];
  

  /**
   * Lista de productores ya agregados.
   */
  agregarProductoresExportador: HistoricoColumnas[] = [];

  /**
   * Lista de productores seleccionados para eliminar.
   */
  seleccionadoAgregarProductoresExportador: HistoricoColumnas[] = [];

  /**
   * @property {ConfiguracionColumna<MercanciaTabla>[]} mercanciaTablaConfiguracion
   * 
   * Configuración de las columnas para la tabla de mercancías.
   * 
   * @remarks
   * Este arreglo utiliza la configuración definida en `CONFIGURACION_MERCANCIA` 
   * para establecer las propiedades de las columnas que se mostrarán en la tabla.
   * 
   * @comando
   * Utilice esta propiedad para personalizar o acceder a la configuración de las columnas.
   */
  mercanciaTablaConfiguracion: ConfiguracionColumna<MercanciaTabla>[] = CONFIGURACION_MERCANCIA;
  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();
  /**
   * Referencia al modal para agregar datos del productor.
   */
  @ViewChild('modalAgregarDatosProductorPorExportador') modalElement!: ElementRef;

  /**
   * Referencia al elemento del DOM asociado al modal de búsqueda.
   */
  @ViewChild('modalBuscar') modalElements!: ElementRef;

  /**
 * Referencia al elemento del DOM asociado al modalMercancia.
 */
  @ViewChild('modalMercancia') modalElementsMercancia!: ElementRef;
  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModalMercancia') closeModalMercancia!: ElementRef;
  
  /**
   * @public
   * @property {Notificacion} nuevaNotificacion
   * @description Representa una nueva notificación que se utilizará en el componente.
   * @command Este campo debe ser inicializado antes de su uso.
   */
  public nuevaNotificacion!: Notificacion;
  /**
   * Formulario para agregar datos del productor.
   */
  agregarDatosProductorFormulario!: FormGroup;

  /**
   * Constructor del componente.
   * 
   * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
   */
  constructor(
    public fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Carga los datos iniciales, configura los formularios y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.initFormulario();
    this.inicializarFormularioMercancia()
    this.initAgregarDatosProductorFormulario();
    if (this.tramiteState) {
      this.formulario.patchValue(this.tramiteState);
    }
    if (this.agregarDatosProductor) {
      this.agregarDatosProductorFormulario.patchValue(this.agregarDatosProductor);
    }
  }

  /**
   * Inicializa el formulario principal con los datos del estado del trámite.
   */
  initFormulario(): void {
    this.formulario = this.fb.group({
      datosConfidencialesProductor: [],
      productorMismoExportador: [],
    });
  }
  /**
   * Inicializa el formulario relacionado con las mercancías.
   * 
   * Este método configura los campos y validaciones del formulario de mercancías utilizando los datos del estado actual del trámite.
   */
  inicializarFormularioMercancia(): void {
    this.formularioMercancia = this.fb.group({
      fraccionArancelaria: [{ value: [], disabled: true }],
      nombreComercial: [{ value: [[]], disabled: true }],
      nombreTecnico: [{ value: [[]], disabled: true }],
      numeroDeRegistroFiscal: [],
      valorMercancia: [{ value: '', disabled: true }],
      complemento: [{ value: '', disabled: true }],
      numeroFactura: [{ value: [[]], disabled: true }],
      tipoFactura: [[]],
    });
  }
  /**
   * Inicializa el formulario para agregar datos del productor.
   */
  initAgregarDatosProductorFormulario(): void {
    this.agregarDatosProductorFormulario = this.fb.group({
      numeroRegistroFiscal: [[Validators.required]],
      fax: [[Validators.pattern(REGEX_SOLO_DIGITOS)]]
    });
  }


  /**
   * Obtiene los productores seleccionados en la tabla.
   * 
   * @param {HistoricoColumnas[]} evento - Lista de productores seleccionados.
   */
  obtenerSeleccionadoProductores(evento: HistoricoColumnas[]): void {
    this.seleccionadoProductoresExportador = evento;
  }
 

  /**
   * Obtiene los productores seleccionados para agregar.
   * 
   * @param {HistoricoColumnas[]} evento - Lista de productores seleccionados para agregar.
   */
  obtenerAnadirProductosSeleccionados(evento: HistoricoColumnas[]): void {
    this.seleccionadoAgregarProductoresExportador = evento;
  }

  /**
   * Agrega los productores seleccionados a la lista de productores agregados.
   */
  productoresSeleccionados(): void {
    this.agregarProductoresExportador = [...this.agregarProductoresExportador, ...this.seleccionadoProductoresExportador];
    this.productoresExportador = this.productoresExportador.filter(elementos => !this.seleccionadoProductoresExportador.some(elementosSecundarios => elementosSecundarios.id === elementos.id));
    this.seleccionadoProductoresExportador = [];
  }

  /**
   * Elimina los productores seleccionados de la lista de productores agregados.
   */
  eliminarProductoresSeleccionados(): void {
    this.productoresExportador = [...this.productoresExportador, ...this.seleccionadoAgregarProductoresExportador];
    this.agregarProductoresExportador = this.agregarProductoresExportador.filter(elementos => !this.seleccionadoAgregarProductoresExportador.some(elementosSecundarios => elementosSecundarios.id === elementos.id));
    this.seleccionadoAgregarProductoresExportador = [];
  }

  /**
   * Abre el modal para agregar datos del productor.
   */
  agregarDatosProductorPorExportador(): void {
    if (this.modalElement?.nativeElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Cierra el modal para agregar datos del productor.
   */
  cerrarModal(): void {
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
  }

  /**
   * Agrega un productor si el formulario es válido.
   */
  agregarExportador(): void {
    this.agregarDatosProductorFormulario.markAllAsTouched();
    if (this.agregarDatosProductorFormulario.valid) {
      this.cerrarModal();
    }
  }

  /**
   * Valida un campo del formulario.
   * 
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Actualiza el estado del store con el valor seleccionado en el formulario.
   * 
   * @param {string} formGroupName - Nombre del grupo de formulario.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {string} storeStateName - Nombre del estado del store para actualizar.
   */
  setValoresStore(formGroupName: string, campo: string, storeStateName?: string): void {
    const VALOR = this.formulario.get(campo)?.value;
    this.formaValida.emit(this.formulario.valid);
    this.formHistoricoEvent.emit({ formGroupName, campo, valor: VALOR, storeStateName: storeStateName || '' });

  }
  /**
  * Actualiza el estado del store con el valor seleccionado en el formulario.
  * 
  * @param {string} formGroupName - Nombre del grupo de formulario.
  * @param {string} campo - El nombre del campo en el formulario.
  * @param {string} storeStateName - Nombre del estado del store para actualizar.
  */
  setValoresStoreAgregarForm(formGroupName: string, campo: string, storeStateName?: string): void {
    const VALOR = this.agregarDatosProductorFormulario.get(campo)?.value;
    this.formaValida.emit(this.agregarDatosProductorFormulario.valid);
    this.agregarDatosProductorFormularioEvent.emit({ formGroupName, campo, valor: VALOR, storeStateName: storeStateName || '' });

  }
  /**
   * Abre un modal para agregar mercancía.
   * 
   * @remarks
   * Este método verifica si los elementos del modal están disponibles 
   * y, de ser así, crea una instancia del modal y lo muestra.
   * 
   * @comando
   * - Llama a este método para abrir el modal de mercancía.
   */
  agregarMercancia(): void {
    if (this.esTipoDeSeleccionado) {
      if (this.modalElementsMercancia?.nativeElement) {
        const MODAL_INSTANCE = new Modal(this.modalElementsMercancia.nativeElement);
        MODAL_INSTANCE.show();
        this.formularioMercancia.patchValue(this.mercanciaDatosSeleccionada[0])
      }
    }
    else {
    this.abrirModal();
    }
  }
  /**
   * Cierra el modal para agregar datos del productor.
   */
  cerrarModalMercancia(): void {
    if (this.closeModalMercancia?.nativeElement) {
      this.closeModalMercancia.nativeElement.click();
    }
  }

  /**
   * Método para manejar la selección de una mercancía en la tabla.
   * 
   * @param evento - Objeto de tipo `MercanciaTabla` que representa la mercancía seleccionada.
   * 
   * @command Este método actualiza la propiedad `mercanciaDatosSeleccionada` con la mercancía seleccionada.
   */
  obtenerSeleccionadoMercancia(evento: MercanciaTabla): void {        
    this.mercanciaDatosSeleccionada = [evento];
  }
  /**
   * @method mercanciaAgregarSeleccionada
   * @description Muestra un modal utilizando la instancia de `Modal` si el elemento modal está disponible.
   * @command Abre el modal para agregar una mercancía seleccionada.
   */
  mercanciaAgregarSeleccionada(): void {
    if (this.modalElements?.nativeElement) {
      const MODAL_INSTANCE = new Modal(this.modalElements.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Abre un modal con una notificación configurada.
   * 
   * @command abrirModal
   * @description Este método configura y muestra un modal con una notificación de alerta.
   */
  public abrirModal(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: this.mensajeDeAlerta,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
  }

  /**
    * Método que se ejecuta al destruir el componente.
    * 
    * Libera los recursos y cancela las suscripciones activas.
    */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}