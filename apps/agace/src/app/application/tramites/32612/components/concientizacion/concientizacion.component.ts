import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_CONCIENTIZACION } from '../../constants/texto-estatico.enum';
import { CONFIGURACION_CAPACITACION, CONFIGURACION_CAPACITACIONDOS } from '../../constants/concientizacion.enum';
import { Tramite32612Query } from '../../estados/solicitud32612.query';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-concientizacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './concientizacion.component.html',
  styleUrl: './concientizacion.component.scss',
})
export class ConcientizacionComponent implements OnInit,OnDestroy {

  public textos = TEXTOS_ESTATICOS_CONCIENTIZACION;
  public forma: FormGroup = new FormGroup({
    capacitacionFormGroup: new FormGroup({}),
    capacitacionDosFormGroup: new FormGroup({})
  });

  private destroyNotifier$: Subject<void> = new Subject();
  public capacitacionDatos = CONFIGURACION_CAPACITACION;
  public capacitacionDatosDos = CONFIGURACION_CAPACITACIONDOS;
  public solicitudeState!: Solicitude32612State;

  constructor(
      private tramite32612Store: Tramite32612Store,
      private tramite32612Query: Tramite32612Query
  ) {}

  ngOnInit(): void {
    this.tramite32612Query.selectSolicitude$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudeState = seccionState;
        })
      ).subscribe();
  }

  get capacitacionFormGroup(): FormGroup {
    return this.forma.get('capacitacionFormGroup') as FormGroup;
  }
  get capacitacionDosFormGroup(): FormGroup {
    return this.forma.get('capacitacionDosFormGroup') as FormGroup;
  }

  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
