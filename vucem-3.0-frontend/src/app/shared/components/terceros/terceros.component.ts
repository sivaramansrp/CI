import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaTerceros } from '../../../core/models/5701/servicios-extraordinarios.model';
import { CONSTANTES } from '../../constantes/servicios-extraordinarios.enum';
import { SeccionQuery } from '../../../core/queries/seccion.query';
import { SeccionState, SeccionStore } from '../../../estados/seccion.store';
import { delay, distinctUntilChanged, map, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'terceros',
  templateUrl: './terceros.component.html',
  styleUrl: './terceros.component.scss',
})
export class TercerosComponent {
  public FormPersona: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    correo: [
      '',
      [Validators.required, Validators.pattern(CONSTANTES.EXP_CORREO)],
    ],
  });

  personas: Array<PersonaTerceros> = [];

  private destroyNotifier$: Subject<void> = new Subject();
  private seccion: SeccionState;

  constructor(
    private fb: FormBuilder,
    private seccionQuery: SeccionQuery,
    private seccionStore: SeccionStore
  ) {}

  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
    this.FormPersona.valueChanges.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      takeUntil(this.destroyNotifier$),
      delay(10),
      tap((value) => {
        const secciones = this.seccion.seccion;

        const formasValidadas = this.seccion.formaValida;
        for (let i = 0; i < this.seccion.seccion.length; i++) {
          if (
            this.seccion.seccion[i] === true &&
            this.seccion.formaValida[i] === false
          )
            formasValidadas[i] = true;
          break;
        }
        const seccionSinValidar = secciones.findIndex(
          (seccion) => seccion === true
        );


        if (this.FormPersona.valid) {
          formasValidadas[seccionSinValidar] = true;
          this.seccionStore.establecerFormaValida(formasValidadas);
        } else {
          formasValidadas[seccionSinValidar] = false;
          this.seccionStore.establecerFormaValida(formasValidadas);
        }
      })
    )
    .subscribe();
  }

  agregaPersona(): void {
    if (this.personas.length < 5 && this.FormPersona.valid) {
      const datos = this.FormPersona.value;
      this.personas.push(datos);
      this.FormPersona.reset();
    } else {
      console.log(
        'No puede agregar mas de cinco personas o el formato de la dirección correo no es valido'
      );
    }
  }

  eliminar(i: number) {
    this.personas.splice(i, 1);
  }
}
