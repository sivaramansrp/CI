import { CONFIGURACION_TECNOLOGIA, CONFIGURACION_TECNOLOGIA_DOS } from '../../constants/seguridad-de-la.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery,ConsultaioState } from '@ng-mf/data-access-user';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { Subject,map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_SEGURIDAD_DE_LA } from '../../constants/texto-estatico.enum';
import { Tramite32612Query } from '../../estados/solicitud32612.query';

@Component({
  selector: 'app-seguridad-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './seguridad-de-la.component.html',
  styleUrl: './seguridad-de-la.component.scss',
})
export class SeguridadDeLaComponent implements OnInit, OnDestroy {

  public textos = TEXTOS_ESTATICOS_SEGURIDAD_DE_LA;
  public forma: FormGroup = new FormGroup({
    tecnologiaFormGroup: new FormGroup({}),
    tecnologiaDosFormGroup: new FormGroup({}),
  });

  public tecnologiaDatos = CONFIGURACION_TECNOLOGIA;
  public tecnologiaDosDatos = CONFIGURACION_TECNOLOGIA_DOS;
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

  ngOnInit() {
    this.tramite32612Query.selectSolicitude$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudeState = seccionState;
        })
      ).subscribe();
  }

  get tecnologiaFormGroup(): FormGroup {
    return this.forma.get('tecnologiaFormGroup') as FormGroup;
  }

  get tecnologiaDosFormGroup(): FormGroup {
    return this.forma.get('tecnologiaDosFormGroup') as FormGroup;
  }

  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }


}
