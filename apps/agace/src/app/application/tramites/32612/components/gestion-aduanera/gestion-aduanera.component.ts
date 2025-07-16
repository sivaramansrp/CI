import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TEXTOS_ESTATICOS_GESTION } from '../../constants/texto-estatico.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONFIGURACION_ACTUALIZADA, CONFIGURACION_CONTROL, CONFIGURACION_GESTION } from '../../constants/gestion-aduanera.enum';
import { Solicitude32612State, Tramite32612Store } from '../../estados/solicitud32612.store';
import { map, Subject, takeUntil } from 'rxjs';
import { Tramite32612Query } from '../../estados/solicitud32612.query';

@Component({
  selector: 'app-gestion-aduanera',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './gestion-aduanera.component.html',
  styleUrl: './gestion-aduanera.component.scss',
})
export class GestionAduaneraComponent implements OnInit, OnDestroy {

  public textos = TEXTOS_ESTATICOS_GESTION;
  public forma: FormGroup = new FormGroup({
    gestionFormGroup: new FormGroup({}),
    controlFormGroup: new FormGroup({}),
    actualizadaFormGroup: new FormGroup({})
  });
  public gestionDatos = CONFIGURACION_GESTION;
  public controlDatos = CONFIGURACION_CONTROL;
  public actualizadaDatos = CONFIGURACION_ACTUALIZADA;
  public solicitudeState!: Solicitude32612State;
  private destroyNotifier$: Subject<void> = new Subject();

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

  get gestionFormGroup(): FormGroup {
    return this.forma.get('gestionFormGroup') as FormGroup;
  }

  get controlFormGroup(): FormGroup {
    return this.forma.get('controlFormGroup') as FormGroup;
  }

  get actualizadaFormGroup(): FormGroup {
    return this.forma.get('actualizadaFormGroup') as FormGroup;
  }

  public emitirCambioDeValor(event: {campo: string, valor: string}): void {
    this.tramite32612Store.setDynamicFieldValue(event.campo, event.valor);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }



}
