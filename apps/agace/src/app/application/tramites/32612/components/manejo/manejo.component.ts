import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_MANEJO } from '../../constants/texto-estatico.enum';
import { CONFIGURACION } from '../../constants/agente-aduanal.enum';
import { CONFIGURACION_INVESTIGACION, CONFIGURACION_REPORTE_ANOMALIAS } from '../../constants/manejo.enum';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { Subject,map, takeUntil } from 'rxjs';
import { Tramite32612Query } from '../../estados/solicitud32612.query';

@Component({
  selector: 'app-manejo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './manejo.component.html',
  styleUrl: './manejo.component.scss',
})
export class ManejoComponent implements OnInit, OnDestroy {

  public textos = TEXTOS_ESTATICOS_MANEJO;
  public forma = new FormGroup({
    reporteDeAnomaliasFormGroup: new FormGroup({}),
    investigacionFormGroup: new FormGroup({})
  });
  public reporteDeAnomaliasDatos = CONFIGURACION_REPORTE_ANOMALIAS;
  public investigacionDatos = CONFIGURACION_INVESTIGACION;
  public solicitudeState!: Solicitude32612State;
  private destroyNotifier$: Subject<void> = new Subject();


  constructor(
      private tramite32612Store: Tramite32612Store,
      private tramite32612Query: Tramite32612Query
  ) {}

  ngOnInit() {
    this.tramite32612Query.selectSolicitude$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudeState = seccionState;
        })
      ).subscribe();
  }

  get reporteDeAnomaliasFormGroup(): FormGroup {
    return this.forma.get('reporteDeAnomaliasFormGroup') as FormGroup;
  }
  get investigacionFormGroup(): FormGroup {
    return this.forma.get('investigacionFormGroup') as FormGroup;
  }

  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
