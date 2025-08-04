import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";

import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { ANTECEDENTES_DICTAMEN } from "../../../core/constants/constantes-generales";
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
export class GenerarDictamenComponent implements OnInit, OnChanges {
  /**
   * @property {FormGroup} dictamenForm
   * @description Formulario reactivo para la captura de los datos del dictamen.
   */
  public dictamenForm!: FormGroup;
  /**
   * @property {boolean} mostrarCamposFecha
   * @description Controla la visibilidad de los campos de fecha de vigencia autorizada.
   * Se muestra cuando el sentido del dictamen es "Aceptado" (valor '1').
   */
  public mostrarCamposFecha = true;

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
   * @property {boolean} isAntecedentes
   * @description Bandera que indica si los antecedentes son editables o no.
   * Si es true, los antecedentes son editables; si es false, son de solo lectura.
   */
  @Input() public isAntecedentes = true;

  /**
   * @property {string} conformidad
   * @description Texto que representa los antecedentes del dictamen, utilizado para mostrar información relevante.
   * Por defecto, se establece en una constante definida en las constantes generales.
   */
  @Input() public conformidad: string = ANTECEDENTES_DICTAMEN;

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
      mensajeDictamen: ['', [Validators.required, GenerarDictamenComponent.noSoloEspacios]],
      antecedentesEditables: ['', [Validators.required]],
      antecedentesReadonly: [{ value: '', disabled: true }],
      fechaInicioVigenciaAutorizada: [''],
      fechaFinVigenciaAutorizada: ['']
    });

    // Si hay antecedentes de conformidad, se establece en el campo de solo lectura
    if (this.conformidad) {
      this.dictamenForm.get('antecedentesReadonly')?.setValue(this.conformidad);
    }

    // Si los antecedentes no son editables, se elimina el control de antecedentesEditables
    if (!this.isAntecedentes) {
      this.dictamenForm.removeControl('antecedentesEditables');
    }

    // Suscribirse a los cambios del campo cumplimiento para controlar la visibilidad de los campos de fecha
    this.dictamenForm.get('cumplimiento')?.valueChanges.subscribe(value => {
      this.actualizarVisibilidadCamposFecha(value);
    });

    // Establecer el estado inicial
    this.actualizarVisibilidadCamposFecha(this.dictamenForm.get('cumplimiento')?.value);
  }

  /**
   * @method noSoloEspacios
   * @description Validador personalizado que verifica que el campo no contenga solo espacios en blanco.
   * 
   * @param {AbstractControl} control - Control del formulario a validar.
   * @returns {ValidationErrors | null} Retorna un objeto de error si el valor es solo espacios, de lo contrario retorna null.
   */
  static noSoloEspacios(control: AbstractControl): ValidationErrors | null {
    if (control.value && typeof control.value === 'string' && control.value.trim() === '') {
      return { soloEspacios: true };
    }
    return null;
  }


  /**
   * @method actualizarVisibilidadCamposFecha
   * @description Actualiza la visibilidad de los campos de fecha de vigencia autorizada
   * basado en el valor del sentido del dictamen.
   * 
   * @param {string} valorCumplimiento - El valor del campo cumplimiento ('1' para Aceptado, '2' para Rechazado)
   * @returns {void}
   */
  private actualizarVisibilidadCamposFecha(valorCumplimiento: string): void {
    const esDictamenAceptado = valorCumplimiento === 'SEDI.AC';
    this.mostrarCamposFecha = esDictamenAceptado;

    // Actualizar validadores según la visibilidad
    const fechaInicioControl = this.dictamenForm.get('fechaInicioVigenciaAutorizada');
    const fechaFinControl = this.dictamenForm.get('fechaFinVigenciaAutorizada');

    if (esDictamenAceptado) {
      // Si el dictamen es aceptado, los campos de fecha son obligatorios
      fechaInicioControl?.setValidators([Validators.required]);
      fechaFinControl?.setValidators([Validators.required]);
    } else {
      // Si el dictamen es rechazado, remover validadores y limpiar valores
      fechaInicioControl?.clearValidators();
      fechaFinControl?.clearValidators();
      fechaInicioControl?.setValue('');
      fechaFinControl?.setValue('');
    }

    // Actualizar el estado de validación
    fechaInicioControl?.updateValueAndValidity();
    fechaFinControl?.updateValueAndValidity();
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
   * @method ngOnChanges
   * @description Método del ciclo de vida que se ejecuta cuando cambian las propiedades de entrada del componente.
   * 
   * Si la propiedad `conformidad` cambia, actualiza el valor del campo `antecedentesReadonly` en el formulario.
   * 
   * @param {SimpleChanges} changes - Objeto que contiene los cambios en las propiedades de entrada.
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['conformidad'] && this.dictamenForm) {
      this.dictamenForm.get('antecedentesReadonly')?.setValue(this.conformidad);
    }
  }

  /**
   * @method guardar
   * @description Marca todos los campos del formulario como tocados y, si el formulario es válido, emite el evento de guardado con los datos del dictamen.
   * 
   * @returns {void}
   */
  guardar(): void {
    this.dictamenForm.markAllAsTouched();
    if (this.dictamenForm.valid) {
      this.enviarEvento.emit({
        datos: this.dictamenForm.value,
        events: "guardar"
      });
    }
  }

  /**
   * @method firmar
   * @description Marca todos los campos del formulario como tocados y, si el formulario es válido, emite el evento de firmado con los datos del dictamen.
   * 
   * @returns {void}
   */
  firmar(): void {
    this.dictamenForm.markAllAsTouched();
    if (this.dictamenForm.valid) {
      this.enviarEvento.emit({
        datos: this.dictamenForm.value,
        events: "firmar"
      });
    }
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
