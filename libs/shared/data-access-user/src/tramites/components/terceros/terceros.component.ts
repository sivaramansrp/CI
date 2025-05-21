import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import {
  TercerosState,
  TercerosStore,
} from '../../../core/estados/terceros.store';
import { CONSTANTES } from '../../../core/enums/constantes-alertas.enum';
import { CommonModule } from '@angular/common';
import { PersonaTerceros } from '../../../core/models/shared/datos-generales.model';
import { TercerosQuery } from '../../../core/queries/terceros.query';
import { TituloComponent } from '../titulo/titulo.component';
import { UppercaseDirective } from '../../directives/Uppercase/uppercase.directive';
import { ValidacionesFormularioService } from '../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

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
  ],
  styleUrl: './terceros.component.scss',
})
export class TercerosComponent implements OnInit, OnDestroy {
  @Input({ required: true }) tabindex!: number;

  public FormPersona: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: [
      '',
      [Validators.required, Validators.pattern(CONSTANTES.EXP_CORREO)],
    ],
  });

  personas: PersonaTerceros[] = [];

  public tercerosState!: TercerosState;
  private destroyNotifier$: Subject<void> = new Subject();

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
   * Agrega una persona al arreglo `personas` si el formulario es válido y hay menos de 5 personas.
   * Resetea el formulario después de agregar.
   * Si no se cumplen las condiciones, se dispara un modal de confirmación.
   *
   * @returns {void} No retorna ningún valor.
   */
  agregaPersona(): void {
    if (this.personas.length < 5 && this.FormPersona.valid) {
      const DATOS = this.FormPersona.value;
      this.personas.push(DATOS);
      this.tercerosStore.setTerceros(this.personas);
      this.FormPersona.reset();
    } else {
      // Aqui se dispara un modal de confirmacion
    }
  }

  /**
   * Elimina una persona de la lista en el índice especificado.
   * @param i - Índice de la persona a eliminar.
   * @returns void
   */
  eliminar(i: number): void {
    this.personas.splice(i, 1);
    this.tercerosStore.setTerceros(this.personas);
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

  correoValido(): boolean | undefined {
    return this.FormPersona.get('correo')?.hasError('pattern') && this.FormPersona.get('correo')?.touched;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
