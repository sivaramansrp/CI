import { CONFIGURACION_COMMUNICACION, CONFIGURACION_PROCESOS } from '../../constants/seguridad-de-procesos.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery,ConsultaioState } from '@ng-mf/data-access-user';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { Subject,map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_SEGURIDAD_DE_PROCESOS } from '../../constants/texto-estatico.enum';
import { Tramite32612Query } from '../../estados/solicitud32612.query';

@Component({
  selector: 'app-seguridad-de-procesos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './seguridad-de-procesos.component.html',
  styleUrl: './seguridad-de-procesos.component.scss',
})
export class SeguridadDeProcesosComponent implements OnInit,OnDestroy {

  public textos = TEXTOS_ESTATICOS_SEGURIDAD_DE_PROCESOS;
  public forma: FormGroup = new FormGroup({
    procesamientoFormGroup: new FormGroup({}),
    comunicacionFormGroup: new FormGroup({}),
  });
  public procesamientoDatos = CONFIGURACION_PROCESOS;
  public comunicacionDatos = CONFIGURACION_COMMUNICACION;
  public solicitudeState!: Solicitude32612State;
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!: ConsultaioState;

  constructor(
    private tramite32612Query: Tramite32612Query,
    private tramite32612Store: Tramite32612Store,
    private consultaQuery: ConsultaioQuery
  ) { 
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
  }

  ngOnInit(): void {
    this.tramite32612Query.selectSolicitude$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudeState = seccionState;
        })
      ).subscribe();
  }

  get procesamientoFormGroup(): FormGroup {
    return this.forma.get('procesamientoFormGroup') as FormGroup;
  }
  get comunicacionFormGroup(): FormGroup {
    return this.forma.get('comunicacionFormGroup') as FormGroup;
  }

  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
