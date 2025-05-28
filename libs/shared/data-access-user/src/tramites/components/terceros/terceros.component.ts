import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MSG_CAMPOS_VACIOS,
  MSG_ELIMINA_PERSONA,
  MSG_SUCCESS,
  MSG_TERCERO_EXISTE,
  TITULO_MODAL_AVISO,
} from '../../constantes/terceros.enums';
import {
  Notificacion,
  NotificacionesComponent,
} from '../notificaciones/notificaciones.component';
import { Subject, map, takeUntil } from 'rxjs';
import {
  TercerosState,
  TercerosStore,
} from '../../../core/estados/terceros.store';
import { CONSTANTES } from '../../../core/enums/constantes-alertas.enum';
import { CommonModule } from '@angular/common';
import { PersonaTerceros } from '../../../core/models/shared/datos-generales.model';
import { TercerosQuery } from '../../../core/queries/terceros.query';
import { UppercaseDirective } from '../../directives/Uppercase/uppercase.directive';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

import { TituloComponent } from '../titulo/titulo.component';

@Component({
  selector: 'lib-terceros',
  templateUrl: './terceros.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TituloComponent,
    UppercaseDirective,
    NotificacionesComponent,
  ],
  styleUrl: './terceros.component.scss',
})
export class TercerosComponent implements OnInit, OnDestroy,AfterViewInit {
  @Input({ required: true }) tabindex!: number;
  @Input({ required: false }) esFormularioSoloLectura: boolean = false;
  /**
   * @desc Lista de personas asociadas como terceros.
   * @type {PersonaTerceros[]}
   * @input
   * @optional
   * 
   * @description [Compodoc] Arreglo de objetos de tipo PersonaTerceros que representa las personas agregadas como terceros en el trámite. Este input es opcional.
   */
  @Input({ required: false }) personas: PersonaTerceros[] = [];
   /**
   * @description
   * Evento emitido cuando la lista de personas (terceros) cambia.
   * 
   * @type {EventEmitter<PersonaTerceros[]>}
   * @memberof TercerosComponent
   * @event personasChange
   * @see PersonaTerceros
   */
  @Output() personasChange = new EventEmitter<PersonaTerceros[]>();

 
  public FormPersona: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: [
      '',
      [Validators.required, Validators.pattern(CONSTANTES.EXP_CORREO)],
    ],
  });

  /**
   * @description
   * Estado de terceros.
   */
  public tercerosState!: TercerosState;

  /**
   * @description
   * Notificador para destruir el observable al finalizar el componente.
   * Evita fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @descripcion Notificación para mostrar mensajes al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  constructor(
    private fb: FormBuilder,
    private tercerosStore: TercerosStore,
    private tercerosQuery: TercerosQuery,
    private validacionesService: ValidacionesFormularioService
  ) {}

  ngOnInit(): void {
    this.tercerosQuery.selectTerceros$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.tercerosState = state;
        })
      )
      .subscribe();
    if (this.tercerosState.terceros.length > 0) {
      this.personas = this.tercerosState.terceros;
    }
  }

  /**
   * @inheritdoc
   * 
   * @description
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
   * 
   * Si el formulario está en modo solo lectura (`esFormularioSoloLectura` es verdadero), deshabilita el formulario `FormPersona` para evitar modificaciones.
   * En caso contrario, habilita el formulario para permitir la edición.
   */
  ngAfterViewInit(): void {
      if(this.esFormularioSoloLectura){
        this.FormPersona.disable();
      }
      else{
        this.FormPersona.enable();
      }
  }
  /**
   * Agrega una persona al arreglo `personas` si el formulario es válido y hay menos de 5 personas.
   * Resetea el formulario después de agregar.
   * Si no se cumplen las condiciones, se dispara un modal de confirmación.
   *
   * @returns {void} No retorna ningún valor.
   */
  agregaPersona(): void {
    if (this.FormPersona.invalid) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: '',
        modo: 'action',
        titulo: TITULO_MODAL_AVISO,
        mensaje: MSG_CAMPOS_VACIOS,
        cerrar: false,
        txtBtnAceptar: 'Cerrar',
        txtBtnCancelar: '',
      };
      this.FormPersona.markAllAsTouched();
      return;
    }

    if (this.personas.length >= 5) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: '',
        modo: 'action',
        titulo: TITULO_MODAL_AVISO,
        mensaje: 'No se pueden agregar más de 5 personas.',
        cerrar: false,
        txtBtnAceptar: 'Cerrar',
        txtBtnCancelar: '',
      };
      return;
    }

    const DATOS = this.FormPersona.value;
    const EXISTE_TERCERO = this.personas.some(
      (persona) =>
        persona.correo === this.FormPersona.value.correo ||
        persona.nombre === this.FormPersona.value.nombre
    );

    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'action',
      titulo: TITULO_MODAL_AVISO,
      mensaje: EXISTE_TERCERO ? MSG_TERCERO_EXISTE : MSG_SUCCESS,
      cerrar: false,
      txtBtnAceptar: 'Cerrar',
      txtBtnCancelar: '',
    };

    if (!EXISTE_TERCERO) {
      this.personas.push(DATOS);
      this.personasChange.emit(this.personas);
      this.tercerosStore.setTerceros(this.personas);
      this.FormPersona.reset();
    }    
  }

  /**
   * Elimina una persona de la lista en el índice especificado.
   * @param i - Índice de la persona a eliminar.
   * @returns void
   */
  eliminar(i: number): void {
    this.personas.splice(i, 1);
    this.personasChange.emit(this.personas);
    this.tercerosStore.setTerceros(this.personas);
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'action',
      titulo: TITULO_MODAL_AVISO,
      mensaje: MSG_ELIMINA_PERSONA,
      cerrar: false,
      txtBtnAceptar: 'Cerrar',
      txtBtnCancelar: '',
    };
  }

  /**
   * Verifica si un campo específico en el formulario de persona es válido.
   *
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean | null} - Devuelve `true` si el campo es válido, `false` si no lo es,
   * o `null` si no se puede determinar la validez.
   */
  isValid(field: string): boolean | null {
    return this.validacionesService.isValid(this.FormPersona, field);
  }

  /**
   * Verifica si el campo de correo electrónico tiene un formato válido.
   * @returns {boolean | undefined} - Devuelve `true` si el correo es inválido y el campo ha sido tocado.
   */
  correoValido(): boolean | undefined {
    return (
      this.FormPersona.get('correo')?.hasError('pattern') &&
      this.FormPersona.get('correo')?.touched
    );
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
