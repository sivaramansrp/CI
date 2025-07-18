import { CRITERIO_DE_SELECCION, REQUERIMIENTOS_EN_SEGURIDAD, REVISIONS_OF_COMMERCIAL_PARTNERS } from '../../constantes/constantes32613.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
  selector: 'socios-comercials',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent
  ],
  templateUrl: './socios-comercials.component.html',
  styleUrl: './socios-comercials.component.scss',
})

export class SociosComercialsComponent implements OnInit, OnDestroy {

  public criteriosDeSeleccionFormData = CRITERIO_DE_SELECCION;

  public requerimientosEnSeguridadFormData = REQUERIMIENTOS_EN_SEGURIDAD;

  public revisionesDelSocioComercialFormData = REVISIONS_OF_COMMERCIAL_PARTNERS;

  public sociosComericialsForm = new FormGroup({
    criteriosDeSeleccionFormGroup: new FormGroup({}),
    requerimientosEnSeguridadFormGroup: new FormGroup({}),
    revisionesDelSocioComercialFormGroup: new FormGroup({}),
  })

  /** Este getter devuelve el grupo de formularios anidado llamado `criteriosDeSeleccionFormGroup`*/
  get criteriosDeSeleccionFormGroup(): FormGroup {
    return this.sociosComericialsForm.get('criteriosDeSeleccionFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `requerimientosEnSeguridadFormGroup`*/
  get requerimientosEnSeguridadFormGroup(): FormGroup {
    return this.sociosComericialsForm.get('requerimientosEnSeguridadFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `revisionesDelSocioComercialFormGroup`*/
  get revisionesDelSocioComercialFormGroup(): FormGroup {
    return this.sociosComericialsForm.get('revisionesDelSocioComercialFormGroup') as FormGroup;
  }

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
