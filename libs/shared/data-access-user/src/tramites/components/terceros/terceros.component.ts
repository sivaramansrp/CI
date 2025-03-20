import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { TercerosState, TercerosStore } from '../../../core/estados/terceros.store';
import { CONSTANTES } from '../../../core/enums/constantes-alertas.enum';
import { CommonModule } from '@angular/common';
import { PersonaTerceros } from '../../../core/models/shared/datos-generales.model';
import { TercerosQuery } from '../../../core/queries/terceros.query';
import { TituloComponent } from '../titulo/titulo.component';
import { UppercaseDirective } from '../../directives/Uppercase/uppercase.directive';

@Component({
  selector: 'lib-terceros',
  templateUrl: './terceros.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TituloComponent, UppercaseDirective],
  styleUrl: './terceros.component.scss',
})
export class TercerosComponent implements OnInit {
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
  ) { }


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

  agregaPersona(): void {
    if (this.personas.length < 5 && this.FormPersona.valid) {
      const DATOS = this.FormPersona.value;
      this.personas.push(DATOS);
      this.tercerosStore.setTerceros(this.personas);
      this.FormPersona.reset();
    } else {
      console.log(
        'No puede agregar mas de cinco personas o el formato de la dirección correo no es valido'
      );
    }
  }

  eliminar(i: number) {
    this.personas.splice(i, 1);
    this.tercerosStore.setTerceros(this.personas);
  }
}
