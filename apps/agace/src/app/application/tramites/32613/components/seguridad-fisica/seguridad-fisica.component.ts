import { ACCESO_EN_PUERTAS, ALUMBRADO, APARATOS, BARDAS_PERIMETRALES, CONTROL_DE_LLAVES, ESTACIONAMIENTOS, INSTALACIONES, SISTEMAS_DE_ALARMA } from '../../constantes/constantes32613.enum';
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
  selector: 'seguridad-fisica',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent
  ],
  templateUrl: './seguridad-fisica.component.html',
  styleUrl: './seguridad-fisica.component.scss',
})
export class SeguridadFisicaComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  @ViewChild('customTemplate2') customTemplate2!: TemplateRef<unknown>;

  public instalacionesFormData = INSTALACIONES;

  public accesosEnPuertasFormData = ACCESO_EN_PUERTAS;

  public bardasPerimetralesFormData = BARDAS_PERIMETRALES;

  public estacionamientosFormData = ESTACIONAMIENTOS;

  public controlDeLlavesFormData = CONTROL_DE_LLAVES;

  public alumbradoFormData = ALUMBRADO;

  public aparatosFormData = APARATOS;

  public sistemasDeAlarmaFormData = SISTEMAS_DE_ALARMA;

  public seguridadFisicaForm: FormGroup = new FormGroup({
    instalacionesFormGroup: new FormGroup({}),
    accesosEnPuertasFormGroup: new FormGroup({}),
    bardasPerimetralesFormGroup: new FormGroup({}),
    estacionamientosFormGroup: new FormGroup({}),
    controlDeLlavesFormGroup: new FormGroup({}),
    alumbradoFormGroup: new FormGroup({}),
    aparatosFormGroup: new FormGroup({}),
    sistemasDeAlarmaFormGroup: new FormGroup({}),
  })

  /** Este getter devuelve el grupo de formularios anidado llamado `instalacionesFormGroup`*/
  get instalacionesFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('instalacionesFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `accesosEnPuertasFormGroup`*/
  get accesosEnPuertasFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('accesosEnPuertasFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `bardasPerimetralesFormGroup`*/
  get bardasPerimetralesFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('bardasPerimetralesFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `estacionamientosFormGroup`*/
  get estacionamientosFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('estacionamientosFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `controlDeLlavesFormGroup`*/
  get controlDeLlavesFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('controlDeLlavesFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `alumbradoFormGroup`*/
  get alumbradoFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('alumbradoFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `aparatosFormGroup`*/
  get aparatosFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('aparatosFormGroup') as FormGroup;
  }

  /** Este getter devuelve el grupo de formularios anidado llamado `sistemasDeAlarmaFormGroup`*/
  get sistemasDeAlarmaFormGroup(): FormGroup {
    return this.seguridadFisicaForm.get('sistemasDeAlarmaFormGroup') as FormGroup;
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
