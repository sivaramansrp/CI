import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ValidacionesFormularioService } from "../../../core/services/shared/validaciones-formulario/validaciones-formulario.service";



/**
 * @component
 * @name GenerarDictamenComponent
 * @description Componente para la generación y emisión de dictámenes en el flujo de trámites.
 * 
 * Permite al usuario capturar el mensaje del dictamen y seleccionar el cumplimiento, validando el formulario antes de emitir el evento de guardado.
 * Incluye botones personalizables para guardar y cancelar, y emite eventos hacia el componente padre según la acción realizada.
 * 
 * @selector app-generar-dictamen
 * @standalone true
 * @imports
 *  - CommonModule
 *  - FormsModule
 *  - ReactiveFormsModule
 * @templateUrl ./generar-dictamen.component.html
 * @styleUrl ./generar-dictamen.component.scss
 */
@Component({
  selector: 'app-generar-dictamen',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './generar-dictamen.component.html',
  styleUrl: './generar-dictamen.component.scss',
})
export class GenerarDictamenComponent implements OnInit {
  /**
   * @property {FormGroup} dictamenForm
   * @description Formulario reactivo para la captura de los datos del dictamen.
   */
  public dictamenForm!: FormGroup;
  /**
   * @property {EventEmitter<{ events: string, datos: unknown }>} enviarEvento
   * @description Evento emitido al guardar o cancelar el dictamen, enviando el tipo de evento y los datos asociados.
   */
  @Output() public enviarEvento = new EventEmitter<{ events: string, datos: unknown }>();
  /**
   * @property {string} botonDeCancelar
   * @description Texto personalizado para el botón de cancelar.
   */
  @Input() public botonDeCancelar = '';
  /**
   * @property {string} botonGuardar
   * @description Texto personalizado para el botón de guardar.
   */
  @Input() public botonGuardar = '';
  /**
   * @property {boolean} mostrarTitulo
   * @description Bandera que controla la visibilidad del título "Generar Dictamen".
   * Si es true, el título se muestra; si es false, el título se oculta.
   */
  @Input() public mostrarTitulo = true;
  /**
   * @constructor
   * @description Constructor del componente. Inicializa los servicios necesarios para la creación y validación del formulario de dictamen.
   * 
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validaciones personalizadas de formularios.
   */
  constructor(private fb: FormBuilder, private validacionesService: ValidacionesFormularioService,) {
  }
  /**
   * @method ngOnInit
   * @description Método del ciclo de vida que se ejecuta al inicializar el componente.
   * 
   * Inicializa el formulario reactivo `dictamenForm` con los campos requeridos:
   * - cumplimiento: valor por defecto '1'.
   * - mensajeDictamen: campo obligatorio.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.dictamenForm = this.fb.group({
      cumplimiento: ['1'],
      mensajeDictamen: ['', [Validators.required]]
    });
  }
  /**
   * @method isValid
   * @description Verifica si un campo específico del formulario es válido utilizando el servicio de validaciones personalizadas.
   * 
   * @param {string} field - Nombre del campo a validar.
   * @returns {boolean} Retorna `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(field: string): boolean {
    const VALIDATIONRESULT = this.validacionesService.isValid(
      this.dictamenForm,
      field
    );
    return VALIDATIONRESULT === null ? false : VALIDATIONRESULT;
  }
  /**
   * @method guardarFirmar
   * @description Marca todos los campos del formulario como tocados y, si el formulario es válido, emite el evento de guardado con los datos del dictamen.
   * 
   * @returns {void}
   */
  guardarFirmar(): void {
    this.dictamenForm.markAllAsTouched();
    if (this.dictamenForm.valid) {
      this.enviarEvento.emit({
        datos: this.dictamenForm.value,
        events: "guardar"
      });
    }
  }
  /**
   * @method cancelar
   * @description Emite el evento de cancelación hacia el componente padre, enviando el tipo de evento "cancelar" y datos nulos.
   * 
   * @returns {void}
   */
  cancelar(): void {
    this.enviarEvento.emit({ events: "cancelar", datos: null });
  }
}
