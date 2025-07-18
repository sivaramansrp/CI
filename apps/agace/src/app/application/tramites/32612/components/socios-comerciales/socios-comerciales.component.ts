import { CONFIGURACION, CONFIGURACION_REQUERIMIENTOS } from '../../constants/socios-comerciales.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery,ConsultaioState } from '@ng-mf/data-access-user';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { Subject,map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_SOCIOS_COMERCIALES } from '../../constants/texto-estatico.enum';
import { Tramite32612Query } from '../../estados/solicitud32612.query';

@Component({
  selector: 'app-socios-comerciales',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './socios-comerciales.component.html',
  styleUrl: './socios-comerciales.component.scss',
})
export class SociosComercialesComponent implements OnInit, OnDestroy {

  public textos = TEXTOS_ESTATICOS_SOCIOS_COMERCIALES;
  public forma: FormGroup = new FormGroup({
    criteriosFormGroup: new FormGroup({}),
    requerimientosFormGroup: new FormGroup({}),
  });
  public criteriosDatos = CONFIGURACION;
  public requerimientosDatos = CONFIGURACION_REQUERIMIENTOS;
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

  get criteriosFormGroup(): FormGroup {
    return this.forma.get('criteriosFormGroup') as FormGroup;
  }
  get requerimientosFormGroup(): FormGroup {
    return this.forma.get('requerimientosFormGroup') as FormGroup;
  }

  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
