import { AgregarDatosProductorFormulario, FormularioHistorico, HistoricoColumnas, MercanciaTabla } from '../../models/certificado-origen.model';
import { CONFIGURACION_MERCANCIA, CONFIGURACION_PRODUCTOR_EXPORTADOR } from '../../constantes/certificado-tabla.enum';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConfiguracionColumna, InputCheckComponent, REGEX_SOLO_DIGITOS } from '@libs/shared/data-access-user/src';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';


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
  imports: [CommonModule, TituloComponent, FormsModule, ReactiveFormsModule, TablaDinamicaComponent, InputCheckComponent],
  templateUrl: './historico-productores.component.html',
  styleUrl: './historico-productores.component.scss',
})
export class HistoricoProductoresComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para gestionar los datos de los productores.
   */
  formulario!: FormGroup;
  @Input() tramiteState: FormularioHistorico = {};
  @Input() mercanciaDatos: MercanciaTabla[] = [];
  @Input() agregarDatosProductor: AgregarDatosProductorFormulario = {};

  /**
   * Propiedad de entrada que recibe los datos de la tabla de mercancia.
   * @type {Mercancia[]}
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
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

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
    if (this.modalElement) {
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
    * Método que se ejecuta al destruir el componente.
    * 
    * Libera los recursos y cancela las suscripciones activas.
    */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}