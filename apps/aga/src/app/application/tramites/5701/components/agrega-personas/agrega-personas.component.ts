import { ADV_MAXIMO_PERSONAS, ERR_BUSQUEDA_GAFETE_SIN_RESULTADOS, ERR_CAMPOS_OBLIGATORIOS, ERR_INPUT_BUSQUEDA_VACIO, MSG_ELIMINA_ELEMENTO, TITULO_MODAL } from '../../../../core/enums/5701/tramite5701.enum';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UppercaseDirective, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Persona } from '../../../../core/models/5701/tramite5701.model';

@Component({
  selector: 'agrega-personas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, UppercaseDirective],
  templateUrl: './agrega-personas.component.html',
  styleUrl: './agrega-personas.component.scss',
})
export class AgregaPersonasComponent {
  gafete: FormControl = new FormControl('', [Validators.maxLength(25)]);

  personaForm: FormGroup = this.fb.group({
    nombre: [{ value: '', disabled: true }],
    primerApellido: [{ value: '', disabled: true }],
    segundoApellido: [{ value: '', disabled: true }],
  });

  persona!: Persona;

  personas: Persona[] = [];

  modal: string = '';
  tituloModal!: string;
  mensajeModal!: string;

  constructor(private fb: FormBuilder, private validacionesService: ValidacionesFormularioService) { }

  /**
   * Verifica si un campo específico en el formulario de persona es válido.
   *
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean | null} - Devuelve `true` si el campo es válido, `false` si no lo es, 
   * o `null` si no se puede determinar la validez.
   */
  isValid(field: string): boolean | null {
    return this.validacionesService.isValid(this.personaForm, field);
  }

  /**
   * Verifica si el gafete es válido.
   * 
   * @returns {boolean | null} - Devuelve `true` si el gafete tiene errores y ha sido tocado, 
   *                             `false` si no tiene errores o no ha sido tocado, 
   *                             o `null` si no se puede determinar.
   */
  get gafeteIsValid(): boolean | null {
    return this.gafete.errors && this.gafete.touched;
  }

  /**
   * Busca un gafete en un endpoint y maneja los resultados de la búsqueda.
   * 
   * - Si el valor del gafete está vacío, muestra un modal con un mensaje de error.
   * - Si no se encuentra una persona asociada al gafete, muestra un modal con un mensaje de error y habilita los campos del formulario.
   * 
   * @returns {void} No retorna ningún valor.
   */
  buscarGafete(): void {
    // Aquí va a buscar por gafete a un endpoint
    const GAFETE = this.gafete.value;

    if (!GAFETE) {
      this.tituloModal = TITULO_MODAL;
      this.mensajeModal = ERR_INPUT_BUSQUEDA_VACIO;
      this.abrirModal();
      return;
    }

    if (!this.persona) {
      this.tituloModal = TITULO_MODAL;
      this.mensajeModal = ERR_BUSQUEDA_GAFETE_SIN_RESULTADOS;
      this.abrirModal();
      this.habilitarCamposFormulario();
    }
  }

  /**
   * Habilita todos los campos del formulario `personaForm`.
   * 
   * Recorre cada uno de los controles del formulario y les aplica las siguientes configuraciones:
   * - Habilita el control.
   * - Establece los validadores `Validators.required` y `Validators.maxLength(30)`.
   * - Actualiza el estado y la validez del control.
   * 
   * @returns {void}
   */
  habilitarCamposFormulario(): void {
    Object.keys(this.personaForm.controls).forEach((campo) => {
      const CONTROL = this.personaForm.get(campo);
      CONTROL?.enable();
      CONTROL?.setValidators([Validators.required, Validators.maxLength(30)]);
      CONTROL?.updateValueAndValidity();
    });
  }


  /**
   * Agrega una persona a la lista de personas.
   * 
   * - Valida que el campo 'gafete' y el formulario 'personaForm' sean válidos.
   * - Si alguno de los campos es inválido, muestra un modal con un mensaje de error y marca todos los campos como tocados.
   * - Si ya hay 5 personas en la lista, muestra un modal con un mensaje de advertencia.
   * - Si todas las validaciones pasan, crea un objeto 'responsable' con los datos del formulario y lo agrega a la lista de personas.
   * - Resetea el campo 'gafete' y el formulario 'personaForm' después de agregar la persona.
   * 
   * @returns {void}
   */
  agregarPersona(): void {
    this.gafete.setValidators([Validators.required, Validators.maxLength(25)]);
    this.gafete.updateValueAndValidity();

    if (this.gafete.invalid || this.personaForm.invalid) {
      this.tituloModal = TITULO_MODAL;
      this.mensajeModal = ERR_CAMPOS_OBLIGATORIOS;
      this.abrirModal();

      this.gafete.markAllAsTouched();
      this.personaForm.markAllAsTouched();
      this.habilitarCamposFormulario();
      return;
    }

    if (this.personas.length >= 5) {
      this.tituloModal = TITULO_MODAL;
      this.mensajeModal = ADV_MAXIMO_PERSONAS;
      this.abrirModal();
      return;
    }

    let responsable: Persona | null = {
      gafete: this.gafete.value,
      nombre: this.personaForm.get('nombre')?.value,
      primerApellido: this.personaForm.get('primerApellido')?.value,
      segundoApellido: this.personaForm.get('segundoApellido')?.value,
    };

    if (responsable !== null) {
      this.personas.push(responsable);
    }

    this.gafete.setValue('');
    responsable = null;

    this.personaForm.reset();
  }

  /**
   * Elimina una persona de la lista de personas en la posición especificada.
   * 
   * @param {number} i - El índice de la persona a eliminar en la lista.
   * 
   * @remarks
   * Esta función actualiza el título y el mensaje del modal, y luego abre el modal
   * para confirmar la eliminación de la persona.
   */
  eliminar(i: number): void {
    this.personas.splice(i, 1);
    this.tituloModal = TITULO_MODAL;
    this.mensajeModal = MSG_ELIMINA_ELEMENTO;
    this.abrirModal();
  }

  /**
* Abre el modal para eliminar un documento.
* @param {number} i - El índice del documento.
*/
  abrirModal(): void {

    this.modal = 'show';
  }

  /**
  * Cierra el modal.
  */
  cerrarModal(): void {
    this.modal = '';
    this.tituloModal = '';
    this.mensajeModal = '';
  }
}
