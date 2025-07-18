import { ANALISIS_DE_RIESGO, AUDITORIAS_INTERNAS, PLANES_DE_CONTINGENCIA, POLITICAS_DE_SEGURIDAD } from '../../constantes/constantes32613.enum';
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RubroTransporteFerrovario32613State, Tramite32613Store } from '../../../../estados/tramites/tramite32613.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite32613Query } from '../../../../estados/queries/tramite32613.query';

@Component({
  selector: 'planeacion-de-la-seguridad',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent
  ],
  templateUrl: './planeacion-de-la-seguridad.component.html',
  styleUrl: './planeacion-de-la-seguridad.component.scss',
})

export class PlaneacionDeLaSeguridadComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  public analisisDeRiesgoFormData = ANALISIS_DE_RIESGO;

  public politicasDeSeguridadFormData = POLITICAS_DE_SEGURIDAD;

  public auditoriasInternasFormData = AUDITORIAS_INTERNAS;

  public planesDeContingenciaFormData = PLANES_DE_CONTINGENCIA;

  public planeacionSeguridadForm: FormGroup = new FormGroup({
    analisisDeRiesgoFormGroup: new FormGroup({}),
    politicasDeSeguridadFormGroup:  new FormGroup({}),
    auditoriasInternasFormGroup:  new FormGroup({}),
    planesDeContingenciaFormGroup:  new FormGroup({}),
  });

  /** Este getter devuelve el grupo de formularios anidado llamado `analisisDeRiesgoFormGroup`*/
  get analisisDeRiesgoFormGroup(): FormGroup {
    return this.planeacionSeguridadForm.get('analisisDeRiesgoFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `politicasDeSeguridadFormGroup`*/
  get politicasDeSeguridadFormGroup(): FormGroup {
    return this.planeacionSeguridadForm.get('politicasDeSeguridadFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `auditoriasInternasFormGroup`*/
  get auditoriasInternasFormGroup(): FormGroup {
    return this.planeacionSeguridadForm.get('auditoriasInternasFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `planesDeContingenciaFormGroup`*/
  get planesDeContingenciaFormGroup(): FormGroup {
    return this.planeacionSeguridadForm.get('planesDeContingenciaFormGroup') as FormGroup;
  }

  public templateMap: Record<string, TemplateRef<unknown>> = {}; 

  /** Estado de la solicitud de la tramite 32613.*/
  public rubroTransporteFerrovariostate!: RubroTransporteFerrovario32613State;
  
  /** Subject para notificar la destrucción del componente.*/
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado de la consulta que se obtiene del store. */
  public consultaState!: ConsultaioState;

  constructor(
    private tramite32613Store: Tramite32613Store,
    private tramite32613Query: Tramite32613Query,
    private consultaQuery: ConsultaioQuery,
  ) {
    //
  }

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          // this.consultaState = seccionState;
          this.consultaState = {...seccionState, update: true, readonly: true }
        })
      )
      .subscribe();

    this.tramite32613Query.selectRubroTransporteFerrovario$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.rubroTransporteFerrovariostate = seccionState;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.templateMap = {
        customSection1: this.customTemplate1
      };
    });
  }

  establecerCambioDeValor(event: {campo: string, valor: string | number | object}): void {
    if (event) {
      this.tramite32613Store.setDynamicFieldValue(event.campo, event.valor);
    }
  }

  /** Este método es parte del ciclo de vida del componente y se ejecuta automáticamente cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones activas y evitar fugas de memoria en la aplicación.*/
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
