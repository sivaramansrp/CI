import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenusDesplegables } from '../../models/modificacion.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datos-certificado-de',
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, CommonModule],
  templateUrl: './datos-certificado-de.component.html',
  styleUrl: './datos-certificado-de.component.scss'
})
export class DatosCertificadoDeComponent implements OnDestroy, OnInit,OnChanges {
  /**
   * Datos de los menús desplegables.
   * @type {MenusDesplegables[]}
   * @input
   */
  @Input() data!: MenusDesplegables[];

  /**
   * Bandera que indica el idioma (true/false para español/inglés u otro par de idiomas).
   * @type {boolean}
   * @input
   */
  @Input() idioma!: boolean;
  /**
 * Propiedad de entrada booleana que indica si se muestra el contenido.
 * Si es `true`, se renderiza la sección correspondiente.
 * Se utiliza para controlar la visibilidad desde el componente padre.
 */
    @Input() presenta!: boolean;

  /**
   * Bandera que indica si se requiere precisión en los datos.
   * @type {boolean}
   * @input
   */
  @Input() precisa!: boolean;

  /**
   * Catálogo de datos de idiomas disponibles.
   * @type {Catalogo[]}
   * @input
   */
  @Input() idiomaDatos!: Catalogo[];

  /**
   * Catálogo de datos de entidades federativas disponibles.
   * @type {Catalogo[]}
   * @input
   */
  @Input() entidadFederativaDatos!: Catalogo[];

  /**
   * Catálogo de datos de representaciones federales disponibles.
   * @type {Catalogo[]}
   * @input
   */
  @Input() representacionFederalDatos!: Catalogo[];

  /**
   * Evento que emite cuando se completan los datos del certificado.
   * @type {EventEmitter<undefined>}
   * @output
   */
  @Output() formDatosCertificadoEvent: EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }> = new EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }>();

  /**
   * Evento que emite cuando se selecciona un idioma.
   * @type {EventEmitter<Catalogo>}
   * @output
   */
  @Output() idiomaSeleccionEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();

  /**
   * Evento que emite cuando se selecciona una entidad federativa.
   * @type {EventEmitter<Catalogo>}
   * @output
   */
  @Output() entidadFederativaSeleccionEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();

  /**
   * Evento que emite cuando se selecciona una representación federal.
   * @type {EventEmitter<Catalogo>}
   * @output
   */
  @Output() representacionFederalSeleccionEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();

  /**
   * Objeto que contiene los datos del formulario del certificado.
   * @type {{ [key:string]: unknown }}
   * @input
   */
  @Input() datosFormCertificado!: { [key: string]: unknown };

  /**
   * Emisor de eventos para indicar si el formulario es válido.
   * @type {EventEmitter<boolean>}
   */
  @Output() formaValida: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  /**
   * Formulario reactivo que contiene los datos del certificado.
   * Utilizado para la validación y gestión de los datos en el formulario.
   */
  formDatosCertificado!: FormGroup;

  /**
   * Subject utilizado para gestionar el ciclo de vida del componente y cancelar las suscripciones.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Observable que contiene la lista de idiomas disponibles.
   */
  idioma$: Catalogo[] = [];

  /**
   * Observable que contiene la lista de entidades federativas disponibles.
   */
  entidadFederativas$: Catalogo[] = [];

  /**
   * Observable que contiene la lista de representaciones federales disponibles.
   */
  representacionFederal$: Catalogo[] = [];
  /**
 * Indica si el formulario debe mostrarse solo en modo de lectura.
 * @type {boolean}
 */
  @Input() esFormularioSoloLectura!: boolean;

  /**
   * Constructor del componente. Inicializa el formulario y las dependencias necesarias.
   * @param fb Instancia del FormBuilder para la creación del formulario.
   */

  private actualizandoFormulario = false;

  constructor(
    private fb: FormBuilder,
  ) {
  }
  /**
 * @inheritdoc
 * 
 * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
 * Inicializa el estado del formulario llamando a `inicializarEstadoFormulario()`.
 */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }
  /**
* Evalúa si se debe inicializar o cargar datos en el formulario.
*/
  inicializarEstadoFormulario(): void {
    if (!this.formDatosCertificado) {
      this.createForm();
    }
    if (this.esFormularioSoloLectura) {
      this.formDatosCertificado.disable();
    }
  }

  /**
   * Crea e inicializa el formulario reactivo `formDatosCertificado` con los controles y validaciones necesarios.
   * 
   * @remarks
   * Este método configura los campos del formulario, asignando validadores según los requisitos del negocio.
   * 
   * @command
   * Genera el formulario para capturar los datos del certificado, incluyendo observaciones, idioma, entidad federativa,
   * representación federal y precisión, aplicando las validaciones correspondientes.
   */
  createForm(): void {
    this.formDatosCertificado = this.fb.group({
      observacionesDates: [''],
      presenta: [''],
      idiomaDates: ['', [Validators.required, Validators.min(0)]],
      EntidadFederativaDates: ['', [Validators.required, Validators.min(0)]],
      representacionFederalDates: ['', [Validators.required, Validators.min(0)]],
      precisaDates: ['', this.precisa ? [Validators.required] : []]

    });
  }
 /**
   * @method ngOnChanges
   * @description
   * Método del ciclo de vida que se llama cuando cambia alguna propiedad enlazada por datos.
   * Específicamente, verifica si el input `datosForm` ha cambiado. Si es así, actualiza el
   * formulario `formDatosDelDestinatario` con los nuevos valores de `datosForm`. Si el formulario
   * no existe, lo crea.
   * 
   * @param changes - Objeto con pares clave/valor de las propiedades que han cambiado.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosFormCertificado'] && this.datosFormCertificado) {
      if (this.formDatosCertificado) {
        this.formDatosCertificado.patchValue(this.datosFormCertificado);
      } else {
        this.createForm();
      }
    }
  }
  /**
   * Getter para acceder al control del formulario, utilizado para la validación.
   * @returns FormControl del formulario.
   */
  get formularioControl(): FormControl {
    return this.formDatosCertificado.get('') as FormControl;
  }

  /**
    * Establece valores en el store y emite eventos relacionados con el formulario.
    *
    * @param formGroupName - El nombre del grupo de formulario al que pertenece el campo.
    * @param campo - El nombre del campo cuyo valor se desea obtener y procesar.
    * @param storeStateName - El nombre del estado en el store asociado al campo.
    * 
    * @remarks
    * Este método obtiene el valor de un campo específico del formulario `formDatosDelDestinatario`,
    * emite un evento para indicar si el formulario es válido y otro evento con los datos del campo
    * y su estado asociado en el store.
    */
  setValoresStore(formGroupName: string, campo: string, storeStateName: string): void {
    const VALOR = this.formDatosCertificado.get(campo)?.value;
    this.formaValida.emit(this.formDatosCertificado.valid);
    this.formDatosCertificadoEvent.emit({ formGroupName, campo, valor: VALOR, storeStateName });
  }


  /**
   * Método que selecciona un idioma y actualiza el estado en el store.
   * @param estado El estado del idioma seleccionado.
   */
  idiomaSeleccion(estado: Catalogo): void {
    this.idiomaSeleccionEvent.emit(estado);
  }

  /**
   * Método que selecciona una entidad federativa y actualiza el estado en el store.
   * @param estado El estado de la entidad federativa seleccionada.
   */
  entidadFederativaSeleccion(estado: Catalogo): void {
    this.entidadFederativaSeleccionEvent.emit(estado);
  }

  /**
   * Método que selecciona una representación federal y actualiza el estado en el store.
   * @param estado El estado de la representación federal seleccionada.
   */
  representacionFederalSeleccion(estado: Catalogo): void {
    this.representacionFederalSeleccionEvent.emit(estado);
  }

  validarFormularios():boolean{
    if(this.formDatosCertificado.valid){
      return true;
    }
    this.formDatosCertificado.markAllAsTouched();
    return false;
  }
  /**
   * Método de ciclo de vida de Angular, se ejecuta al destruir el componente.
   * Cancela todas las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
