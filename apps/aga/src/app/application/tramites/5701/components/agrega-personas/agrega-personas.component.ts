import { ADV_MAXIMO_PERSONAS, ERR_BUSQUEDA_GAFETE_SIN_RESULTADOS, ERR_CAMPOS_OBLIGATORIOS, ERR_INPUT_BUSQUEDA_VACIO, MSG_ELIMINA_ELEMENTO, TITULO_MODAL } from '../../../../core/enums/5701/tramite5701.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Solicitud5701State, Tramite5701Store } from '../../../../core/estados/tramites/tramite5701.store';
import { Subject, map, takeUntil } from 'rxjs';
import { UppercaseDirective, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ResponsablesDespacho } from '../../../../core/models/5701/tramite5701.model';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';

@Component({
  selector: 'agrega-personas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, UppercaseDirective],
  templateUrl: './agrega-personas.component.html',
  styleUrl: './agrega-personas.component.scss',
})
export class AgregaPersonasComponent implements OnInit, OnDestroy {
  /**
   * Campo de formulario para el gafete del responsable de despacho.
   */
  gafeteRespoDespacho: FormControl = new FormControl('', [Validators.maxLength(25)]);

  /**
   * Formulario reactivo que contiene los campos de nombre, primer apellido y segundo apellido del responsable de despacho.
   * Los campos están inicialmente deshabilitados.
   * Se utilizan validaciones para asegurarse de que los campos sean obligatorios y no excedan una longitud máxima de 30 caracteres.
   */
  personaForm: FormGroup = this.fb.group({
    nombreRespoDespacho: [{ value: '', disabled: true }],
    paternoRespoDespacho: [{ value: '', disabled: true }],
    maternoRespoDespacho: [{ value: '', disabled: true }],
  });

  /**
   * Objeto que representa a una persona responsable de despacho.
   * Se inicializa como un objeto vacío y se espera que contenga los datos del responsable de despacho.
   */
  persona!: ResponsablesDespacho;

  /**
   * Lista de personas responsables de despacho.
   * Se inicializa como un arreglo vacío y se espera que contenga múltiples objetos de tipo ResponsablesDespacho.
   */
  personas: ResponsablesDespacho[] = [];

  /**
   * Variable que representa el estado del modal.
   * Se inicializa como una cadena vacía y se espera que contenga el estado del modal (por ejemplo, 'show' o '').
   */
  modal: string = '';

  /**
   * Título del modal.
   * Se inicializa como una cadena vacía y se espera que contenga el título que se mostrará en el modal.
   */
  tituloModal!: string;

  /**
   * Mensaje del modal.
   * Se inicializa como una cadena vacía y se espera que contenga el mensaje que se mostrará en el modal.
   */
  mensajeModal!: string;

  /**
   * Estado de la solicitud 5701.
   */
  public solicitudState!: Solicitud5701State;

  /**
   * Subject que se utiliza para notificar la destrucción del componente.
   * Se utiliza para limpiar las suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private tramite5701Query: Tramite5701Query,
    private tramite5701Store: Tramite5701Store
  ) { }

  ngOnInit(): void {
    this.tramite5701Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.solicitudState = state;
        })
      )
      .subscribe();

    if (this.solicitudState.personasResponsablesDespacho.length > 0) {
      this.personas = this.solicitudState.personasResponsablesDespacho;
    }
  }

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
    return this.gafeteRespoDespacho.errors && this.gafeteRespoDespacho.touched;
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
    const GAFETE = this.gafeteRespoDespacho.value;

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
    this.gafeteRespoDespacho.setValidators([Validators.required, Validators.maxLength(25)]);
    this.gafeteRespoDespacho.updateValueAndValidity();

    if (this.gafeteRespoDespacho.invalid || this.personaForm.invalid) {
      this.tituloModal = TITULO_MODAL;
      this.mensajeModal = ERR_CAMPOS_OBLIGATORIOS;
      this.abrirModal();

      this.gafeteRespoDespacho.markAllAsTouched();
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

    let responsable: ResponsablesDespacho | null = {
      gafeteRespoDespacho: this.gafeteRespoDespacho.value,
      nombre: this.personaForm.get('nombreRespoDespacho')?.value,
      primerApellido: this.personaForm.get('paternoRespoDespacho')?.value,
      segundoApellido: this.personaForm.get('maternoRespoDespacho')?.value,
    };

    if (responsable !== null) {
      this.personas.push(responsable);
      this.tramite5701Store.setPersonasResponsablesDespacho(this.personas);
    }

    this.gafeteRespoDespacho.setValue('');
    responsable = null;

    this.gafeteRespoDespacho.reset();
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
    this.tramite5701Store.setPersonasResponsablesDespacho(this.personas);
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

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite5701Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite5701Store[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Notifica y completa el observable `destroyNotifier$` para limpiar suscripciones.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
