// ...existing code...
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CAMPO_DE_DESTINATARIO } from '../../constantes/modificacion.enum';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-del-destinatario',
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './datos-del-destinatario.component.html',
  styleUrl: './datos-del-destinatario.component.scss',
})
export class DatosDelDestinatarioComponent implements OnDestroy, OnInit, OnChanges {

  /**
   * Datos del formulario para inicializar los valores
   * @type { [key: string]: unknown }
   */
  @Input() datosForm!: { [key: string]: unknown };

  /**
   * @Input
   * Identificador único del procedimiento asociado.
   * Este valor es requerido y se utiliza para determinar el procedimiento actual.
   *
   * @type {number}
   */
  @Input() idProcedimiento!: number;

  @Input() razonSocialEditable: boolean = false;

  /**
   * Evento que se emite cuando cambian los datos del formulario del destinatario
   * @type {EventEmitter<undefined>}
   */
  @Output() formDatosDelDestinatarioEvent: EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }> = new EventEmitter<{ formGroupName: string; campo: string; valor: undefined; storeStateName: string }>();
  /**
 * Indica si el formulario debe mostrarse solo en modo de lectura.
 * @type {boolean}
 */
  @Input() esFormularioSoloLectura!: boolean;


  /**
   * FormGroup para el formulario de datos del destinatario
   * @type {FormGroup}
   */
  formDatosDelDestinatario!: FormGroup;

  /**
   * Subject para manejar la destrucción de suscripciones
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
   * Indica si el campo destinatario está habilitado o no.
   * 
   * @type {boolean}
   */
  public campoDestinatario = false;

  /**
   * Constructor del componente
   * @param {FormBuilder} fb - Servicio para crear formularios reactivos
   */
  constructor(private fb: FormBuilder) {
    this.createForm();
  }
  /**
* @inheritdoc
* 
* Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
* Inicializa el estado del formulario llamando a `inicializarEstadoFormulario()`.
*/
  ngOnInit(): void {
    // Parcheo de valores iniciales con retraso para asegurar la renderización
    this.campoDestinatario = CAMPO_DE_DESTINATARIO.includes(this.idProcedimiento);
    this.inicializarEstadoFormulario();

  }

  /** Método público para marcar todos los campos como tocados y mostrar errores */
  public markAllFieldsTouched(): void {
    if (this.formDatosDelDestinatario) {
      this.formDatosDelDestinatario.markAllAsTouched();
    }
  }

  /**
   * Inicializa el formulario 'formDatosDelDestinatario' con los campos requeridos.
   * 
   * @remarks
   * Este método crea un formulario reactivo utilizando FormBuilder y define los campos
   * necesarios para los datos del destinatario. Luego, llama a `inicializarEstadoFormulario`
   * para establecer el estado inicial del formulario.
   *
   * @returns {void} No retorna ningún valor.
   */
  createForm(): void {
    this.formDatosDelDestinatario = this.fb.group({
      nombres: ['', [Validators.maxLength(20)]],
      primerApellido: ['', [Validators.maxLength(20)]],
      segundoApellido: ['', [Validators.maxLength(20)]],
      numeroDeRegistroFiscal: ['', [Validators.maxLength(30)]],
      razonSocial: [{ value: '', disabled: this.razonSocialEditable }],
    });

  }
  /**
   * Aplica validaciones al campo 'numeroDeRegistroFiscal' y 'primerApellido' del formulario
   * 'formDatosDelDestinatario' según el procedimiento actual.
   *  * @remarks
   * Este método establece validadores específicos para los campos 'numeroDeRegistroFiscal' y 'primerApellido'
   * basándose en el identificador del procedimiento (`idProcedimiento`).
   * * Si el procedimiento es 110205, 'numeroDeRegistroFiscal' es requerido y 'primerApellido' no lo es.
   * * En otros casos, 'numeroDeRegistroFiscal' no es requerido y 'primerApellido' es requerido.
   * * @returns {void} No retorna ningún valor.
   * */
  applyNumeroRegistroFiscalValidation(): void {
    const NUMERO_REGISTRO_FISCAL = this.formDatosDelDestinatario.get('numeroDeRegistroFiscal');
    const PRIMER_APELLIDO = this.formDatosDelDestinatario.get('primerApellido');

    if (!NUMERO_REGISTRO_FISCAL || !PRIMER_APELLIDO) return;

    if (this.idProcedimiento === 110205) {
      NUMERO_REGISTRO_FISCAL.setValidators([Validators.required, Validators.maxLength(30)]);
      PRIMER_APELLIDO.setValidators([Validators.maxLength(20)]);
    } else {
      NUMERO_REGISTRO_FISCAL.setValidators([Validators.maxLength(30)]);
      PRIMER_APELLIDO.setValidators([Validators.required, Validators.maxLength(20)]);
    }

    NUMERO_REGISTRO_FISCAL.updateValueAndValidity();
    PRIMER_APELLIDO.updateValueAndValidity();
  }


  /**
* Evalúa si se debe inicializar o cargar datos en el formulario.
*/
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.formDatosDelDestinatario.disable();
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
      if (this.formDatosDelDestinatario) {
        this.formDatosDelDestinatario.patchValue(this.datosForm);
      } else {
        this.createForm();
      }
    }
  }
  /**
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
    const VALOR = this.formDatosDelDestinatario.get(campo)?.getRawValue();
    this.formaValida.emit(this.formDatosDelDestinatario.valid);
    this.formDatosDelDestinatarioEvent.emit({ formGroupName, campo, valor: VALOR, storeStateName });
  }

  /**
  * Método del ciclo de vida ngOnDestroy. Se utiliza para cancelar las suscripciones y evitar fugas de memoria.
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
