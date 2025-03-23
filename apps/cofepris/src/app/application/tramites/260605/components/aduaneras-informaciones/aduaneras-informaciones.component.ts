/* eslint-disable sort-imports */
/* eslint-disable no-empty-function */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tramite260605Store, Solicitud260605State } from '../../../../estados/tramites/tramite260605.store';
import { Tramite260605Query } from '../../../../estados/queries/tramite260605.query';
import { map, Subject, Subscription, takeUntil } from 'rxjs';
@Component({
  selector: 'app-aduaneras-informaciones',
  standalone: true,
  templateUrl: './aduaneras-informaciones.component.html',
  styleUrls: ['./aduaneras-informaciones.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class AduanerasInformacionesComponent implements OnInit, OnDestroy {
  aduanerasInformacionesForm!: FormGroup;
  aduanasSeleccionadas: { id: number; name: string }[] = [];
  aduanasDisponibles = [
    {
      "id": 1,
      "name": "ACAPULCO, PUERTO Y AEROPUERTO"
    },
    {
      "id": 2,
      "name": "ADUANA DE PANTACO"
    },
    {
      "id": 3,
      "name": "Aguascalientes, AGS."
    },
    {
      "id": 4,
      "name": "CD. CAMARGO, TAMPS."
    }
  ]
  indiceSeleccionado: number = 0;
  indiceRemover: number = 0;
  /**
   * Suscripción a los cambios en el formulario react
   */
  private subscription: Subscription = new Subscription();
private destroyNotifier$: Subject<void> = new Subject();

public solicitudState!: Solicitud260605State;

  constructor(private fb: FormBuilder,private tramite260605Store: Tramite260605Store,
    private tramite260605Query: Tramite260605Query) {}

  ngOnInit(): void {
    this.subscription.add(
          this.tramite260605Query.selectSolicitud$
            .pipe(
              takeUntil(this.destroyNotifier$),
              map((seccionState) => {
                this.solicitudState = seccionState;
              })
            )
            .subscribe()
        );
        // this.aduanasSeleccionadas=this.solicitudState?.aduanasSeleccionadas;
    this.aduanerasInformacionesForm = this.fb.group({
      numeroDPmiso: [this.solicitudState?.numeroDPmiso, Validators.required],
      cstumbresAtuales: [this.solicitudState?.cstumbresAtuales, Validators.required],
    });
  }

  validPlafet: boolean = false;

  /**
   * Método que se ejecuta al enviar el formulario.
   * Establece la variable `validPlafet` a `true`.
   */
  onSubmit(): void {
    this.validPlafet = true;
  }

  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260605Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260605Store[metodoNombre] as (value: any) => void)(VALOR);
  }

  /**
   * Método para establecer el índice seleccionado.
   * @param indice - El índice a establecer.
   * @param tipo - El tipo de operación ('add' o 'remove').
   */
  setIndiceSeleccionado(indice: number, tipo: string): void {
    if (tipo === 'add') {
      this.indiceSeleccionado = indice;
    } else if (tipo === 'remove') {
      this.indiceRemover = indice;
    }
  }

  /**
   * Método para agregar todas las aduanas disponibles a las aduanas seleccionadas.
   */
  agregarTodasAduanas(): void {
    while (this.aduanasDisponibles.length) {
      const ADUANA = this.aduanasDisponibles.at(0);
      if (ADUANA) {
        this.aduanasSeleccionadas.push(ADUANA);
      }
      this.aduanasDisponibles.splice(0, 1);
    }

  }

  /**
   * Método para agregar aduanas seleccionadas a las aduanas seleccionadas.
   * @param indicesSeleccionados - Los índices de las aduanas a agregar.
   */
  agregarAduanasSeleccionadas(indicesSeleccionados: number[]): void {
    indicesSeleccionados.sort((a, b) => b - a).forEach(indice => {
      const ADUANA = this.aduanasDisponibles.at(indice);
      if (ADUANA) {
        this.aduanasSeleccionadas.push(ADUANA);
      }
      this.aduanasDisponibles.splice(indice, 1);
    });

  }

  /**
   * Método para remover aduanas seleccionadas de las aduanas seleccionadas.
   * @param indicesSeleccionados - Los índices de las aduanas a remover.
   */
  removerAduanasSeleccionadas(indicesSeleccionados: number[]): void {
    indicesSeleccionados.sort((a, b) => b - a).forEach(indice => {
      const ADUANA = this.aduanasSeleccionadas.at(indice);
      if (ADUANA) {
        this.aduanasDisponibles.push(ADUANA);
      }
      this.aduanasSeleccionadas.splice(indice, 1);
    });

  }

  /**
   * Método para remover todas las aduanas seleccionadas.
   */
  removerTodasAduanas(): void {
    while (this.aduanasSeleccionadas.length) {
      const ADUANA = this.aduanasSeleccionadas.at(0);
      if (ADUANA) {
        this.aduanasDisponibles.push(ADUANA);
      }
      this.aduanasSeleccionadas.splice(0, 1);
    }

  }

  setAduanasSeleccionadas(metodoNombre: keyof Tramite260605Store,values: { id: number; name: string }[]): void {
    (this.tramite260605Store[metodoNombre] as (value: any) => void)(values);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}