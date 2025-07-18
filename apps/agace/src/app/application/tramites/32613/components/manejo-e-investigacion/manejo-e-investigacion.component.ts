import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { INVESTIGACION_ANALISIS, REPORTE_DE_ANOMALIAS } from '../../constantes/constantes32613.enum';
import { RubroTransporteFerrovario32613State, Tramite32613Store } from '../../../../estados/tramites/tramite32613.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Tramite32613Query } from '../../../../estados/queries/tramite32613.query';

@Component({
  selector: 'manejo-e-investigacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './manejo-e-investigacion.component.html',
  styleUrls: ['./manejo-e-investigacion.component.scss'],
})
export class ManejoEInvestigacionComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  public reporteDeAnomaliasFormData = REPORTE_DE_ANOMALIAS;

  public investigacionAnalisisFormData = INVESTIGACION_ANALISIS;

  public manejoOInvestigacionForm: FormGroup = new FormGroup({
    reporteDeAnomaliasFormGroup: new FormGroup({}),
    investigacionAnalisisFormGroup: new FormGroup({}),
  });

  /** Este getter devuelve el grupo de formularios anidado llamado `reporteDeAnomaliasFormGroup`*/
  get reporteDeAnomaliasFormGroup(): FormGroup {
    return this.manejoOInvestigacionForm.get('reporteDeAnomaliasFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `reporteDeAnomaliasFormGroup`*/
  get investigacionAnalisisFormGroup(): FormGroup {
    return this.manejoOInvestigacionForm.get('investigacionAnalisisFormGroup') as FormGroup;
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
