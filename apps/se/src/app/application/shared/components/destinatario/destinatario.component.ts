import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CAMPO_DE_DESTINATARIO } from '../../constantes/modificacion.enum';
import { CommonModule } from '@angular/common';
import { MenusDesplegables } from '../../models/modificacion.enum';
import { Subject } from 'rxjs';



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
export class DestinatarioComponent implements OnInit, OnDestroy {

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

  /**
   * Constructor del componente
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos
   */
  constructor(
    private fb: FormBuilder) {

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
    this.inicializarEstadoFormulario();
    this.formDestinatario.patchValue(this.datosForm);
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
      paisDestin: ['', [Validators.required, Validators.min(0)]],
      ciudad: [''],
      calle: ['', [Validators.required]],
      numeroLetra: ['', [Validators.required]],
      lada: [''],
      telefono: [''],
      fax: [''],
      correoElectronico: ['', [Validators.required]],
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
  * Método del ciclo de vida ngOnDestroy. Se utiliza para cancelar las suscripciones y evitar fugas de memoria.
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
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
  setValoresStore(formGroupName: string, campo: string, storeStateName: string):void {    
    const VALOR = this.formDestinatario.get(campo)?.value;    
    this.formaValida.emit(this.formDestinatario.valid);
    this.formDestinatarioEvent.emit({ formGroupName, campo, valor: VALOR, storeStateName });
  }
}
