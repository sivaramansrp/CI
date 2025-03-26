import { CONFIGURACION_MERCANCIA, MERCANCIA_SELECCIONADAS } from '../../constantes/modificacion.enum';
import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfiguracionColumna, MenusDesplegables } from '../../models/modificacion.enum';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Mercancia } from '../../models/modificacion.enum';
import { Subject } from 'rxjs';

/**
 * Constante que representa la configuración de la fecha final en el componente de certificado de origen.
 * 
 * @constant
 * @type {Object}
 * @property {string} labelNombre - El nombre de la etiqueta para la fecha final.
 * @property {boolean} required - Indica si el campo de fecha final es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha final está habilitado.
*/
export const FECHA_INICIO = {
  labelNombre: 'Fecha inicio',
  required: true,
  habilitado: true,
};


/**
 * Constante que representa la configuración de la fecha final en el componente de certificado de origen.
 * 
 * @constant
 * @type {Object}
 * @property {string} labelNombre - El nombre de la etiqueta para la fecha final.
 * @property {boolean} required - Indica si el campo de fecha final es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha final está habilitado.
*/
export const FECHA_FINAL = {
  labelNombre: 'Fecha final',
  required: true,
  habilitado: true,
};


@Component({
  selector: 'app-certificado-de-origen',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CommonModule,
    TablaDinamicaComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './certificado-de-origen.component.html',
  styleUrl: './certificado-de-origen.component.scss'
})

export class CertificadoDeOrigenComponent implements OnDestroy, OnInit {
  @Input() data!: MenusDesplegables[];
  @Input() operador!: boolean;
  @Input() tablaSeleccionEvent!:boolean;
  @Input() tratadoAcuerdo!: Catalogo[];
  @Input() paisBloqu!: Catalogo[];
  @Input() tableData!: Mercancia[];
  @Input() guardarClicado!: Mercancia[];
  @Output() formCertificadoEvent: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Output() tipoEstadoSeleccionEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();
  @Output() paisBloquEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();
  @Output() setbuscarMercanciaEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() filaClics = new EventEmitter<Mercancia>();

  /**
   * Formulario reactivo utilizado para la gestión de los datos del certificado.
   * @type {FormGroup}
   */
  formCertificado!: FormGroup;

  /**
   * Configuración de las fechas de inicio y fin.
   * @type {InputFecha}
   */
  public fechaInicioInput: InputFecha = FECHA_INICIO;
  public fechaFinalInput: InputFecha = FECHA_FINAL;


  /**
   * Subject para gestionar el ciclo de vida del componente.
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de las columnas de la tabla de bitácora.
   * @type {ConfiguracionColumna<Mercancia>[]}
   */
  configuracionTabla: ConfiguracionColumna<Mercancia>[] = CONFIGURACION_MERCANCIA;

  configuracionTablaMercancia: ConfiguracionColumna<Mercancia>[] = MERCANCIA_SELECCIONADAS;
  /**
   * Datos de la bitácora obtenidos desde el servicio.
   * @type {Mercancia[]}
   */
  datos: Mercancia[] = [];

  /**
   * Estado de la selección de la tabla.
   * @type {TablaSeleccion}
   */
  seleccionTabla = TablaSeleccion.UNDEFINED;
  tablaSeleccion: TablaSeleccion = TablaSeleccion.RADIO;
  @Input() formCertificadoValues: {
    entidadFederativa?: string;
    bloque?: string;
    fraccionArancelariaForm?: string;
    registroProductoForm?: string;
    nombreComercialForm?: string;
    fechaFinal?: string;
    fechaInicio?: string;
  } | undefined;

  /**
 * Datos de la bitácora obtenidos desde el servicio.
 * @type {Mercancia[]}
 */

  datosSeleccionados!: Mercancia;

  /**
   * Constructor del componente.
   * Inicializa el formulario y las dependencias necesarias para la carga de datos.
   * @param fb FormBuilder para la creación del formulario reactivo.
   * @param certificadoService Servicio para la gestión de los certificados.
   */
  private actualizandoFormulario = false;
  constructor(
    private fb: FormBuilder) {
    /**
     * Inicializa el formulario con los campos requeridos y sus validaciones.
     */

    
    this.formCertificado = this.fb.group({
      entidadFederativa: [this.formCertificadoValues?.entidadFederativa ? this.formCertificadoValues.entidadFederativa : '', [Validators.required, Validators.min(0)]],
      bloque: [this.formCertificadoValues?.bloque ? this.formCertificadoValues.bloque : '', [Validators.required, Validators.min(0)]],
      fraccionArancelariaForm: [this.formCertificadoValues?.fraccionArancelariaForm ? this.formCertificadoValues.fraccionArancelariaForm : ''],
      registroProductoForm: [this.formCertificadoValues?.registroProductoForm ? this.formCertificadoValues.registroProductoForm : ''],
      nombreComercialForm: [this.formCertificadoValues?.nombreComercialForm ? this.formCertificadoValues.nombreComercialForm : ''],
      fechaFinal: [this.formCertificadoValues?.fechaFinal ? this.formCertificadoValues?.fechaFinal : '', [Validators.required]],
      fechaInicio: [this.formCertificadoValues?.fechaInicio ? this.formCertificadoValues?.fechaInicio : '', [Validators.required]],
    });
    console.log(this.formCertificadoValues,'formCertificadoValues');

  }


  /**
   * Método del ciclo de vida ngOnInit. Se utiliza para cargar los datos iniciales
   * y suscribirse a los cambios en el formulario.
   */
  ngOnInit(): void {
    this.formCertificado.valueChanges.subscribe((value) => {
      if (!this.actualizandoFormulario) {
        this.formCertificadoEvent.emit(value);
      }
    });
  }
  /**
   * Establece el estado seleccionado en el store.
   * @param {Catalogo} estado El estado seleccionado.
   */
  tipoEstadoSeleccion(estado: Catalogo): void {
    this.tipoEstadoSeleccionEvent.emit(estado)
  }

  /**
   * Establece el bloque seleccionado en el store.
   * @param {Catalogo} estado El bloque seleccionado.
   */
  tipoSeleccion(estado: Catalogo): void {
    this.paisBloquEvent.emit(estado);

  }

  /**
   * Método del ciclo de vida ngOnDestroy. Se utiliza para cancelar las suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Getter para obtener el control del formulario de la entidad federativa.
   * @returns {FormControl} El control para la entidad federativa.
   */
  get formularioControl(): FormControl {
    return this.formCertificado.get('') as FormControl;
  }

  /**
   * Busca la mercancia y actualiza los datos en el store.
   */
  buscarrMercancia(): void {
    this.setbuscarMercanciaEvent.emit(true);
  }

  /**
   * Cambia el valor de la fecha de inicio en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha.
   */
  public cambioFechaInicio(nuevo_valor: string): void {
    this.formCertificado.get('fechaInicio')?.setValue(nuevo_valor);
    this.formCertificado.get('fechaInicio')?.markAsUntouched();
  }

  /**
   * Cambia el valor de la fecha final en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  public cambioFechaFinal(nuevo_valor: string): void {

    this.formCertificado.get('fechaFinal')?.setValue(nuevo_valor);
    this.formCertificado.get('fechaFinal')?.markAsUntouched();
  }

  /**
 * Método para abrir el modal de modificación.
 */
  abrirModificarModal(datos1: Mercancia): void {
    this.filaClics.emit(datos1)
  }



}
