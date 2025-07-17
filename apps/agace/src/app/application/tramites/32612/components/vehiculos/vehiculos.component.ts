import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_VEHICULOS } from '../../constants/texto-estatico.enum';
import { CONFIGURACION_ADUANAL_CUENTA, CONFIGURACION_ANEXE_PROCEDIMIENTO, CONFIGURACION_CONSERVARSE, CONFIGURACION_PROCEDIMIENTO, CONFIGURACION_SELLOS } from '../../constants/vehiculos.enum';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { map, Subject, takeUntil } from 'rxjs';
import { Tramite32612Query } from '../../estados/solicitud32612.query';
import { ConsultaioState,ConsultaioQuery } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss',
})
export class VehiculosComponent implements OnInit, OnDestroy {

  public textos = TEXTOS_ESTATICOS_VEHICULOS;
  public forma: FormGroup = new FormGroup({
    sellosFormGroup: new FormGroup({}),
    procedimientoFormGroup: new FormGroup({}),
    anexeElProcedimientoFormGroup: new FormGroup({}),
    aduanalCuentaFormGroup: new FormGroup({}),
    conservarseFormGroup: new FormGroup({})
  });

  public sellosDatos = CONFIGURACION_SELLOS;
  public procedimientoDatos = CONFIGURACION_PROCEDIMIENTO;
  public anexeProcedimientoDatos = CONFIGURACION_ANEXE_PROCEDIMIENTO;
  public aduanalCuentaDatos = CONFIGURACION_ADUANAL_CUENTA;
  public conservarseDatos = CONFIGURACION_CONSERVARSE;
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

  get sellosFormGroup(): FormGroup {
    return this.forma.get('sellosFormGroup') as FormGroup;
  }

  get procedimientoFormGroup(): FormGroup {
    return this.forma.get('procedimientoFormGroup') as FormGroup;
  }
  get anexeElProcedimientoFormGroup(): FormGroup {
    return this.forma.get('anexeElProcedimientoFormGroup') as FormGroup;
  }
  get aduanalCuentaFormGroup(): FormGroup {
    return this.forma.get('aduanalCuentaFormGroup') as FormGroup;
  }
  get conservarseFormGroup(): FormGroup {
    return this.forma.get('conservarseFormGroup') as FormGroup;
  }


  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }



}
