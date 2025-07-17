import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_SEGURIDAD_DEL_PERSONAL } from '../../constants/texto-estatico.enum';
import { CONFIGURACION_ADMINISTRACION, CONFIGURACION_PROCEDIMIENTO, CONFIGURACION_VERIFICACION } from '../../constants/seguridad-del-personal.enum';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { map, Subject, takeUntil } from 'rxjs';
import { Tramite32612Query } from '../../estados/solicitud32612.query';
import { ConsultaioState,ConsultaioQuery } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-seguridad-del-personal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './seguridad-del-personal.component.html',
  styleUrl: './seguridad-del-personal.component.scss',
})
export class SeguridadDelPersonalComponent implements OnInit, OnDestroy {

  public textos = TEXTOS_ESTATICOS_SEGURIDAD_DEL_PERSONAL;
  public forma: FormGroup = new FormGroup({
    antecedentesLaboralesFormGroup: new FormGroup({}),
    procedimientoFormGroup: new FormGroup({}),
    administracionFormGroup: new FormGroup({}),
  });
  public antecedentesLaboralesDatos = CONFIGURACION_VERIFICACION;
  public procedimientoDatos = CONFIGURACION_PROCEDIMIENTO;
  public administracionDatos = CONFIGURACION_ADMINISTRACION;
  public solicitudeState!: Solicitude32612State;
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!: ConsultaioState;


  constructor(
    private tramite32612Store: Tramite32612Store,
    private tramite32612Query: Tramite32612Query,
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


  get antecedentesLaboralesFormGroup(): FormGroup {
    return this.forma.get('antecedentesLaboralesFormGroup') as FormGroup;
  }
  get procedimientoFormGroup(): FormGroup {
    return this.forma.get('procedimientoFormGroup') as FormGroup;
  }
  get administracionFormGroup(): FormGroup {
    return this.forma.get('administracionFormGroup') as FormGroup;
  }

  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
