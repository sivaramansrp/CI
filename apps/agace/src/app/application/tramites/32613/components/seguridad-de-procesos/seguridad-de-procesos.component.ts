import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ENTREGA_Y_RECEPCION, PROCEDIMIENTO_DE_SEGUIMIENTO, PROCESAMIENTO_DE_INFORMACION } from '../../constantes/constantes32613.enum';
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
  selector: 'seguridad-de-procesos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent
  ],
  templateUrl: './seguridad-de-procesos.component.html',
  styleUrls: ['./seguridad-de-procesos.component.scss'],
})
export class SeguridadDeProcesosComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  @ViewChild('customTemplate2') customTemplate2!: TemplateRef<unknown>;

  public entregaYRecepcionFormData = ENTREGA_Y_RECEPCION;
  
  public procedimientoDeSeguimientoFormData = PROCEDIMIENTO_DE_SEGUIMIENTO;

  public procesamientoDeInformacionFormData = PROCESAMIENTO_DE_INFORMACION;

  public seguridadDeProcesosForm: FormGroup = new FormGroup({
    entregaYRecepcionFormGroup: new FormGroup({}),
    procedimientoDeSeguimientoFormGroup: new FormGroup({}),
    procesamientoDeInformacionFormGroup: new FormGroup({}),
  }); 

  /** Este getter devuelve el grupo de formularios anidado llamado `entregaYRecepcionFormGroup`*/
  get entregaYRecepcionFormGroup(): FormGroup {
    return this.seguridadDeProcesosForm.get('entregaYRecepcionFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `procedimientoDeSeguimientoFormGroup`*/
  get procedimientoDeSeguimientoFormGroup(): FormGroup {
    return this.seguridadDeProcesosForm.get('procedimientoDeSeguimientoFormGroup') as FormGroup;
  }

   /** Este getter devuelve el grupo de formularios anidado llamado `procesamientoDeInformacionFormGroup`*/
  get procesamientoDeInformacionFormGroup(): FormGroup {
    return this.seguridadDeProcesosForm.get('procesamientoDeInformacionFormGroup') as FormGroup;
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
        customSection2: this.customTemplate2
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
