import { ALMACENAJE_DEL_EQUIPO, INSPECCION_DE_LOS_EQUIPOS, SEGURIDAD_EN_VIAS_FERREAS, USO_DE_SELLADOS_Y_O_CANDADOS } from '../../constantes/constantes32613.enum';
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RubroTransporteFerrovario32613State, Tramite32613Store } from '../../../../estados/tramites/tramite32613.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Tramite32613Query } from '../../../../estados/queries/tramite32613.query';

@Component({
  selector: 'seguridad-de-los-equipos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
  ],
  templateUrl: './seguridad-de-los-equipos.component.html',
  styleUrl: './seguridad-de-los-equipos.component.scss',
})
export class SeguridadDeLosEquiposComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  @ViewChild('customTemplate2') customTemplate2!: TemplateRef<unknown>;

  @ViewChild('customTemplate3') customTemplate3!: TemplateRef<unknown>;

  @ViewChild('customTemplate4') customTemplate4!: TemplateRef<unknown>;

  @ViewChild('customTemplate5') customTemplate5!: TemplateRef<unknown>;

  @ViewChild('customTemplate6') customTemplate6!: TemplateRef<unknown>;

  @ViewChild('customTemplate7') customTemplate7!: TemplateRef<unknown>;

  @ViewChild('customTemplate8') customTemplate8!: TemplateRef<unknown>;

  @ViewChild('customTemplate9') customTemplate9!: TemplateRef<unknown>;

  public usoDeSellosYOCandadosFormData = USO_DE_SELLADOS_Y_O_CANDADOS;

  public inspeccionDeLosEquiposFormData = INSPECCION_DE_LOS_EQUIPOS;

  public almacenajeDelEquipoFormData = ALMACENAJE_DEL_EQUIPO;

  public seguridadEnViasFerreasFormData = SEGURIDAD_EN_VIAS_FERREAS;

  public seguridadDeLosEquiposForm: FormGroup = new FormGroup({
    usoDeSellosYOCandadosFormGroup: new FormGroup({}),
    inspeccionDeLosEquiposFormGroup: new FormGroup({}),
    almacenajeDelEquipoFormGroup: new FormGroup({}),
    seguridadEnViasFerreasFormGroup: new FormGroup({}),
  })

  /** Este getter devuelve el grupo de formularios anidado llamado `usoDeSellosYOCandadosFormGroup`*/
  get usoDeSellosYOCandadosFormGroup(): FormGroup {
    return this.seguridadDeLosEquiposForm.get('usoDeSellosYOCandadosFormGroup') as FormGroup;
  }

  get inspeccionDeLosEquiposFormGroup(): FormGroup {
    return this.seguridadDeLosEquiposForm.get('inspeccionDeLosEquiposFormGroup') as FormGroup;
  }

  get almacenajeDelEquipoFormGroup(): FormGroup {
    return this.seguridadDeLosEquiposForm.get('almacenajeDelEquipoFormGroup') as FormGroup;
  }

  get seguridadEnViasFerreasFormGroup(): FormGroup {
    return this.seguridadDeLosEquiposForm.get('seguridadEnViasFerreasFormGroup') as FormGroup;
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
        customSection1: this.customTemplate1,
        customSection2: this.customTemplate2,
        customSection3: this.customTemplate3,
        customSection4: this.customTemplate4,
        customSection5: this.customTemplate5,
        customSection6: this.customTemplate6,
        customSection7: this.customTemplate7,
        customSection8: this.customTemplate8,
        customSection9: this.customTemplate9
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
