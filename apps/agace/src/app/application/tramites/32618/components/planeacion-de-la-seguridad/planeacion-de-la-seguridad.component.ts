import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ANALISIS_DE_RIESGO, AUDITORIAS_INTERNAS, PLANES_DE_CONTINGENCIA, POLITICAS_DE_SEGURIDAD } from '../../constants/constantes32618.enum';
import { FormGroup } from '@angular/forms';
import { RubroTransporteFerrovario32618State, Tramite32618Store } from '../../estados/tramite32618.store';
import { map, Subject, takeUntil } from 'rxjs';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { Tramite32618Query } from '../../estados/tramite32618query';

@Component({
  selector: 'app-planeacion-de-la-seguridad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planeacion-de-la-seguridad.component.html',
  styleUrl: './planeacion-de-la-seguridad.component.scss',
})
export class PlaneacionDeLaSeguridadComponent implements OnInit, OnDestroy ,AfterViewInit {
  
  /** Referencia a la plantilla personalizada customTemplate1 utilizada en el componente. */
  @ViewChild('customTemplate1') customTemplate1!: TemplateRef<unknown>;

  /** Arreglo con la configuración dinámica de los campos para el formulario de análisis de riesgo. */
  public analisisDeRiesgoFormData = ANALISIS_DE_RIESGO;

  /** Arreglo con la configuración dinámica de los campos para el formulario de políticas de seguridad. */
  public politicasDeSeguridadFormData = POLITICAS_DE_SEGURIDAD;

  /** Arreglo con la configuración dinámica de los campos para el formulario de auditorías internas. */
  public auditoriasInternasFormData = AUDITORIAS_INTERNAS;

  /** Arreglo con la configuración dinámica de los campos para el formulario de planes de contingencia. */
  public planesDeContingenciaFormData = PLANES_DE_CONTINGENCIA;

  /** Formulario principal para la planeación de la seguridad. */
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

  /** Mapa que asocia claves de sección con sus respectivas plantillas personalizadas. */
  public templateMap: Record<string, TemplateRef<unknown>> = {}; 

  /** Estado de la solicitud de la tramite 32613.*/
  public rubroTransporteFerrovariostate!: RubroTransporteFerrovario32618State;
  
  /** Subject para notificar la destrucción del componente.*/
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado de la consulta que se obtiene del store. */
  public consultaState!: ConsultaioState;

  /** Constructor que inyecta los servicios necesarios para gestionar el estado y las consultas del trámite 32613. */
  constructor(
    private tramite32618Store: Tramite32618Store,
    private tramite32618Query: Tramite32618Query,
    private consultaQuery: ConsultaioQuery,
  ) {
    //
  }

  /** Inicializa los estados necesarios del componente, suscribiéndose a los observables de consulta y rubro de transporte ferroviario. */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();

    this.tramite32618Query.selectRubroTransporteFerrovario$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.rubroTransporteFerrovariostate = seccionState;
        })
      )
      .subscribe();
  }

  /** Asigna las referencias de las plantillas personalizadas al mapa después de la inicialización de la vista. */
  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.templateMap = {
        customSection1: this.customTemplate1
      };
    });
  }

  /** Actualiza el valor dinámico de un campo en el store cuando ocurre un cambio en el formulario. */
  establecerCambioDeValor(event: {campo: string, valor: string | number | object}): void {
    if (event) {
      this.tramite32618Store.setDynamicFieldValue(event.campo, event.valor);
    }
  }

  /** Este método es parte del ciclo de vida del componente y se ejecuta automáticamente cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones activas y evitar fugas de memoria en la aplicación.*/
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
