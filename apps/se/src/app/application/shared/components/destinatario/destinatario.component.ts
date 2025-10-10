import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CAMPO_DE_DESTINATARIO, CAMPO_DE_DESTINATARIOS } from '../../constantes/modificacion.enum';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DestinatarioService } from '../../services/destinatario.service';
import { MenusDesplegables } from '../../models/modificacion.enum';
import { Subject } from 'rxjs';

/**
 * @description Componente para manejar los detalles de la mercancía.
 * Proporciona entradas para configurar un formulario y opciones para productos, fracciones y unidades.
 */
@Component({
  selector: 'app-destinatario',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CommonModule
  ],
  templateUrl: './destinatario.component.html',
  styleUrl: './destinatario.component.scss'
})
export class DestinatarioComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  /**
   * Identificador del procedimiento asociado al componente.
   * 
   * @type {number}
   * @remarks
   * Este identificador se utiliza para enlazar el componente con un procedimiento específico.
   */
  @Input() idProcedimiento!: number;
  /**
 * Indica si el formulario debe mostrarse solo en modo de lectura.
 * @type {boolean}
 */
  @Input() esFormularioSoloLectura!: boolean;

  /**
   * Indica si el país de destino está habilitado
   * @type {boolean}
   */
  @Input() paisDestino!: boolean;

  /**
   * @input
   * Indica si se debe ocultar la lada (código de área telefónico).
   * 
   * @type {boolean}
   * @memberof DestinatarioComponent
   */
  @Input() ocultarLada!: boolean;


  /**
   * @input
   * Indica si se debe ocultar el campo de fax.
   * 
   * @type {boolean}
   * @memberof DestinatarioComponent
   */
  @Input() ocultarFax!: boolean;

  /**
   * Datos para los menús desplegables
   * @type {MenusDesplegables[]}
   */
  @Input() data!: MenusDesplegables[];

  /**
   * Lista de países de destino disponibles
   * @type {Catalogo[]}
   */
  @Input() paisDestin!: Catalogo[];
  /**
  * Propiedad de entrada que recibe los datos de los tratados/acuerdos para el certificado.
  * @type {Catalogo[]}
  */
  paisDestinDestinatario!: Catalogo[];

  /**
   * Evento que se emite cuando se selecciona un país de destino
   * @type {EventEmitter<Catalogo>}
   */
  @Output() paisDestionSeleccionEvent: EventEmitter<Catalogo> = new EventEmitter<Catalogo>();

  /**
   * Evento que se emite cuando cambia el formulario de destinatario
   * @type {EventEmitter<undefined>}
   */
  @Output() formDestinatarioEvent: EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }> = new EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }>();

  /**
   * Valores actuales del formulario de destinatario
   * @type {{ paisDestin?: string; } | undefined}
   */
  @Input() formDestinatarioValues: { paisDestin?: string; } | undefined;

  /**
   * Datos del formulario completo
   * @type { [key: string]: unknown }
   */
  @Input() datosForm!: { [key: string]: unknown };

  /**
   * FormGroup para el formulario de destinatario
   * @type {FormGroup}
   */
  formDestinatario!: FormGroup;

  /**
   * Lista de medios de transporte disponibles
   * @type {Catalogo[]}
   */
  medioDeTransporte: Catalogo[] = [];

  /**
   * Subject para manejar la destrucción del componente
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
* Emisor de eventos para indicar si el formulario es válido.
* @type {EventEmitter<boolean>}
*/
  @Output() formaValida: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  /**
   * @description Indica si el campo relacionado con el destinatario está activo o no.
   * @type {boolean}
   * @default false
   * @memberof DestinatarioComponent
   */
  campoDestinatario = false;

  // Indica si los campos de destinatarios están activos
  camposDestinatarios = false;

  /**
   * Constructor del componente
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos
   */
  constructor(
    private fb: FormBuilder, public destinatarioService: DestinatarioService) {

    // La función se ejecutará después de un segundo.
    setTimeout(() => {
      if (this.datosForm) {
        this.formDestinatario.patchValue(this.datosForm);
      }
    }, 100);
  }

  /**
   * Método del ciclo de vida ngOnInit. Se ejecuta al inicializar el componente.
   * 
   * @remarks
   * Este método se utiliza para inicializar el estado del componente y realizar configuraciones iniciales.
   */
  ngOnInit(): void {
    this.campoDestinatario = CAMPO_DE_DESTINATARIO.includes(this.idProcedimiento);
    this.camposDestinatarios = CAMPO_DE_DESTINATARIOS.includes(this.idProcedimiento);
    this.inicializarEstadoFormulario();
    this.formDestinatario.patchValue(this.datosForm);
    this.getPaisDestino();
  }

  /** Método público para marcar todos los campos como tocados y mostrar errores */
  public markAllFieldsTouched(): void {
    if (this.formDestinatario) {
      this.formDestinatario.markAllAsTouched();
    }
  }

  ngAfterViewInit(): void {
    if (this.paisDestino) {
      this.formDestinatario.get('paisDestin')?.setValidators([Validators.required, Validators.minLength(0)]);
    }
  }
  /**
* Evalúa si se debe inicializar o cargar datos en el formulario.
*/
  inicializarEstadoFormulario(): void {
    if (!this.formDestinatario) {
      this.createForm();
    }

    if (this.esFormularioSoloLectura) {
      this.formDestinatario.disable();

    }
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
    if (changes['datosForm'] && this.datosForm) {
      if (this.formDestinatario) {
        this.formDestinatario.patchValue(this.datosForm);
      } else {
        this.createForm();
      }
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
    this.formDestinatario = this.fb.group({
      paisDestin: [''],
      ciudad: ['', [Validators.required, Validators.maxLength(50)]],
      calle: ['', [Validators.required, Validators.maxLength(90)]],
      numeroLetra: ['', [Validators.required, Validators.maxLength(30)]],
      lada: ['', [Validators.pattern(/^\d+$/), Validators.maxLength(5)]],
      telefono: ['', [Validators.pattern(/^\d+$/), Validators.maxLength(30)]],
      fax: ['', [Validators.pattern(/^\d+$/), Validators.maxLength(20)]],
      correoElectronico: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(70),
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      ]]
    });

  }

  /**
   * Maneja la selección de un país de destino
   * @param {Catalogo} estado - El país de destino seleccionado
   */
  paisDestionSeleccion(estado: Catalogo): void {
    this.paisDestionSeleccionEvent.emit(estado)
  }
  /**
  /**
   * Valida el formulario y marca los campos como tocados si es inválido
   */
  validarFormularios(): boolean {
    if (this.formDestinatario.invalid) {
      this.formDestinatario.markAllAsTouched();
      return false;
    }
    return true;
  }
  /**
   * Obtiene la lista de países de destino desde el servicio
   */
  getPaisDestino(): void {
    this.destinatarioService.getPaisDestino('110202').subscribe((data) => {
      this.paisDestinDestinatario = data as Catalogo[];
    });
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
    const VALOR = this.formDestinatario.get(campo)?.value;
    this.formaValida.emit(this.formDestinatario.valid);
    this.formDestinatarioEvent.emit({ formGroupName, campo, valor: VALOR, storeStateName });
  }

  /**
  * Método del ciclo de vida ngOnDestroy. Se utiliza para cancelar las suscripciones y evitar fugas de memoria.
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
