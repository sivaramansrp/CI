import { CONFIGURACION, CONFIGURACION_ENTREGAS, CONFIGURACION_IDENTIFICACION } from '../../constants/controles-de-acceso.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery,ConsultaioState } from '@ng-mf/data-access-user';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { Subject,map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_SEGURIDAD_INFORMACION } from '../../constants/texto-estatico.enum';
import { Tramite32612Query } from '../../estados/solicitud32612.query';

@Component({
  selector: 'app-controles-de-acceso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './controles-de-acceso.component.html',
  styleUrl: './controles-de-acceso.component.scss',
})
export class ControlesDeAccesoComponent implements OnInit,OnDestroy {

 public textos = TEXTOS_ESTATICOS_SEGURIDAD_INFORMACION;
  public forma: FormGroup = new FormGroup({
    personalFormGroup: new FormGroup({}),
    identificacionFormGroup: new FormGroup({}),
    entregasFormGroup: new FormGroup({}),
  });
  public personalDatos = CONFIGURACION;
  public identificacionDatos = CONFIGURACION_IDENTIFICACION;
  public entregasDatos = CONFIGURACION_ENTREGAS;
  public solicitudeState!: Solicitude32612State;
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!: ConsultaioState;

  constructor(
      private tramite32612Store: Tramite32612Store,
      private tramite32612Query: Tramite32612Query,
      private consultaQuery: ConsultaioQuery,
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

  get personalFormGroup(): FormGroup {
    return this.forma.get('personalFormGroup') as FormGroup;
  }
  get identificacionFormGroup(): FormGroup {
    return this.forma.get('identificacionFormGroup') as FormGroup;
  }

  get entregasFormGroup(): FormGroup {
    return this.forma.get('entregasFormGroup') as FormGroup;
  }

  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
