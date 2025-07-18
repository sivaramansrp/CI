import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ENTREGAS_DE_MENSAJERIA, IDENTIFICACION_DE_LOS_EMPLEADOS, PERSONAL_DE_SEGURIDAD } from '../../constantes/constantes32613.enum';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { RubroTransporteFerrovario32613State, Tramite32613Store } from '../../../../estados/tramites/tramite32613.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Tramite32613Query } from '../../../../estados/queries/tramite32613.query';

@Component({
  selector: 'controles-de-acceso-fisica',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent,
    InputRadioComponent
  ],
  templateUrl: './controles-de-acceso-fisica.component.html',
  styleUrl: './controles-de-acceso-fisica.component.scss',
})
export class ControlesDeAccesoFisicaComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  @ViewChild('customTemplate2') customTemplate2!: TemplateRef<unknown>;

  public personalDeSeguridadFormData = PERSONAL_DE_SEGURIDAD;

  public identificacionDeLosEmpleadosFormData = IDENTIFICACION_DE_LOS_EMPLEADOS;

  public entregasDeMensajeriaFormData = ENTREGAS_DE_MENSAJERIA;

  public controlesDeAccesoFormGroup: FormGroup = new FormGroup({
    personalDeSeguridadFormGroup: new FormGroup({}),
    identificacionDeLosEmpleadosFormGroup: new FormGroup({}),
    elRegistroDeVisitantes: new FormControl(''),
    entregasDeMensajeriaFormGroup: new FormGroup({}),
  })

  /** Este getter devuelve el grupo de formularios anidado llamado `personalDeSeguridadFormGroup`*/
  get personalDeSeguridadFormGroup(): FormGroup {
    return this.controlesDeAccesoFormGroup.get('personalDeSeguridadFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `identificacionDeLosEmpleadosFormGroup`*/
  get identificacionDeLosEmpleadosFormGroup(): FormGroup {
    return this.controlesDeAccesoFormGroup.get('identificacionDeLosEmpleadosFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `entregasDeMensajeriaFormGroup`*/
  get entregasDeMensajeriaFormGroup(): FormGroup {
    return this.controlesDeAccesoFormGroup.get('entregasDeMensajeriaFormGroup') as FormGroup;
  }

  public templateMap: Record<string, TemplateRef<unknown>> = {};

  /** Modelo para la opción de tipo sí/no representado como radio button */
  public sinoOpciones = [
    {
      "label": "Si",
      "value": 1
    },
    {
      "label": "No",
      "value": 2
    }
  ];

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
          if (this.consultaState.readonly) {
            this.controlesDeAccesoFormGroup.get('elRegistroDeVisitantes')?.disable();
          }
        })
      )
      .subscribe();

    this.tramite32613Query.selectRubroTransporteFerrovario$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.rubroTransporteFerrovariostate = seccionState;
          this.controlesDeAccesoFormGroup.patchValue({
            elRegistroDeVisitantes: seccionState['elRegistroDeVisitantes']
          });
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

  cambioRegistroDeVisitantes(event: string | number, campo: string): void {
    if (event) {
      this.tramite32613Store.setDynamicFieldValue(campo, event);
    }
  }

  /** Este método es parte del ciclo de vida del componente y se ejecuta automáticamente cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones activas y evitar fugas de memoria en la aplicación.*/
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
