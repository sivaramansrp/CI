import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TEXTOS_ESTATICOS_PLANEACION } from '../../constants/texto-estatico.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONFIGURACION, CONFIGURACION_AUDITORIAS, CONFIGURACION_CONTINGENCIA, CONFIGURACION_POLITICAS } from '../../constants/analisis-riesgo-forma.enum';
import { CONFIGURACION_REVISIONES } from '../../constants/socios-comerciales.enum';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { Tramite32612Query } from '../../estados/solicitud32612.query';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-planeacion',
  standalone: true,
  imports: [
    CommonModule,
    FormasDinamicasComponent,
    ReactiveFormsModule
  ],
  templateUrl: './planeacion.component.html',
  styleUrl: './planeacion.component.scss',
})
export class PlaneacionComponent implements OnInit, OnDestroy {

  public textos = TEXTOS_ESTATICOS_PLANEACION;
  public forma: FormGroup = new FormGroup({
    analisisDeRiesgoFormGroup: new FormGroup({}),
    politicasFormGroup: new FormGroup({}),
    auditoriasFormGroup: new FormGroup({}),
    contingenciaFormGroup: new FormGroup({}),
    revisionesFormGroup: new FormGroup({}),
  });
  public analisisDeRiesgoDatos = CONFIGURACION;
  public politicasDatos = CONFIGURACION_POLITICAS;
  public auditoriasDatos = CONFIGURACION_AUDITORIAS;
  public contingenciaDatos = CONFIGURACION_CONTINGENCIA;
  public revisionesDatos = CONFIGURACION_REVISIONES;
  public solicitudeState!: Solicitude32612State;
  private destroyNotifier$: Subject<void> = new Subject();


  constructor(
    private tramite32612Store: Tramite32612Store,
    private tramite32612Query: Tramite32612Query
  ) {

  }

  ngOnInit() {
    this.tramite32612Query.selectSolicitude$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudeState = seccionState;
        })
      ).subscribe();
  }

  get analisisDeRiesgoFormGroup(): FormGroup {
    return this.forma.get('analisisDeRiesgoFormGroup') as FormGroup;
  }
  get politicasFormGroup(): FormGroup {
    return this.forma.get('politicasFormGroup') as FormGroup;
  }
  get auditoriasFormGroup(): FormGroup {
    return this.forma.get('auditoriasFormGroup') as FormGroup;
  }
  get contingenciaFormGroup(): FormGroup {
    return this.forma.get('contingenciaFormGroup') as FormGroup;
  }
  get revisionesFormGroup(): FormGroup {
    return this.forma.get('revisionesFormGroup') as FormGroup;
  }

  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
