import { CONFIGURACION, CONFIGURACION_ACCESOS, CONFIGURACION_ALUMBRADO, CONFIGURACION_DISPOSITIVOS, CONFIGURACION_ESTACIONAMIENTOS, CONFIGURACION_PERIMETRALES, CONFIGURACION_SISTEMAS } from '../../constants/seguridad-fisica.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery,ConsultaioState } from '@ng-mf/data-access-user';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { Subject,map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_SEGURIDAD } from '../../constants/texto-estatico.enum';
import { Tramite32612Query } from '../../estados/solicitud32612.query';

@Component({
  selector: 'app-seguridad-fisica',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './seguridad-fisica.component.html',
  styleUrl: './seguridad-fisica.component.scss',
})
export class SeguridadFisicaComponent implements OnInit,OnDestroy {

  public textos = TEXTOS_ESTATICOS_SEGURIDAD;
  public forma: FormGroup = new FormGroup({
    instalacionesFormGroup: new FormGroup({}),
    accesosFormGroup: new FormGroup({}),
    perimetralesFormGroup: new FormGroup({}),
    estacionamientosFormGroup: new FormGroup({}),
    dispositivosFormGroup: new FormGroup({}),
    alumbradoFormGroup: new FormGroup({}),
    sistemasFormGroup: new FormGroup({}),
  });
  public instalacionesDatos = CONFIGURACION;
  public accesosDatos = CONFIGURACION_ACCESOS;
  public perimetralesDatos = CONFIGURACION_PERIMETRALES;
  public estacionamientosDatos = CONFIGURACION_ESTACIONAMIENTOS;
  public dispositivosDatos = CONFIGURACION_DISPOSITIVOS;
  public alumbradoDatos = CONFIGURACION_ALUMBRADO;
  public sistemasDatos = CONFIGURACION_SISTEMAS;
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

  get instalacionesFormGroup(): FormGroup {
    return this.forma.get('instalacionesFormGroup') as FormGroup;
  }
  get accesosFormGroup(): FormGroup {
    return this.forma.get('accesosFormGroup') as FormGroup;
  }
  get perimetralesFormGroup(): FormGroup {
    return this.forma.get('perimetralesFormGroup') as FormGroup;
  }
  get estacionamientosFormGroup(): FormGroup {
    return this.forma.get('estacionamientosFormGroup') as FormGroup;
  }
  get dispositivosFormGroup(): FormGroup {
    return this.forma.get('dispositivosFormGroup') as FormGroup;
  }
  get alumbradoFormGroup(): FormGroup {
    return this.forma.get('alumbradoFormGroup') as FormGroup;
  }
  get sistemasFormGroup(): FormGroup {
    return this.forma.get('sistemasFormGroup') as FormGroup;
  }

  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
