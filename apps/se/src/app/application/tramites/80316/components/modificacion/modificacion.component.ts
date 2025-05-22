import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud80316State, Tramite80316Store } from '../../estados/tramite80316.store';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDelModificacion } from '../../models/datos-tramite.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Tramite80316Query } from '../../estados/tramite80316.query';

/**
 * Componente `ModificacionComponent` utilizado para gestionar y mostrar los datos relacionados con la modificación de un trámite.
 * Este componente es independiente (standalone) y utiliza formularios reactivos, tablas dinámicas y catálogos.
 */
@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TituloComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.scss',
})
export class ModificacionComponent implements OnInit, OnDestroy {
  /**
   * Constructor del componente `ModificacionComponent`.
   * Inicializa los servicios necesarios para gestionar el estado del trámite y los datos de modificación.
   * 
   * @param {FormBuilder} fb - Servicio para crear formularios reactivos.
   * @param {SolicitudService} solicitudService - Servicio para gestionar las solicitudes.
   * @param {Tramite80316Store} tramite80316Store - Store para gestionar el estado del trámite.
   * @param {Tramite80316Query} tramite80316Query - Query para consultar el estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    public solicitudService: SolicitudService,
    private tramite80316Store: Tramite80316Store,
    private tramite80316Query: Tramite80316Query
  ) {}

  /**
   * Grupo de formulario para el formulario de modificación.
   * Contiene los campos necesarios para gestionar los datos del trámite.
   * 
   * @type {FormGroup}
   */
  modificacionForm!: FormGroup;

  /**
   * Observable para notificar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas y evitar fugas de memoria.
   * 
   * @type {Subject<void>}
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   * Contiene los datos relacionados con la modificación del trámite.
   * 
   * @type {Solicitud80316State}
   */
  public derechoState: Solicitud80316State = {} as Solicitud80316State;

  /**
   * Define los datos que se mostrarán en la tabla dinámica.
   * 
   * @type {DatosDelModificacion[]}
   */
  datosTabla: DatosDelModificacion[] = [];

  /**
   * Catálogo de actividades productivas.
   * Contiene las opciones disponibles para seleccionar una actividad productiva.
   * 
   * @type {Catalogo[]}
   */
  actividadProductiva!: Catalogo[];

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario, carga los datos de modificación y los datos de la tabla.
   */
  ngOnInit(): void {
    this.tramite80316Query.selectSolicitud$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.derechoState = {
          ...this.derechoState,
          ...seccionState,
        };
      })
    ).subscribe();
    this.inicializarFormulario();
    this.loadDatosModificacion();
    this.inicializaCatalogos();
  }

  /**
   * Inicializa el formulario reactivo con los valores actuales del estado.
   */
  inicializarFormulario(): void {
    this.modificacionForm = this.fb.group({
      rfc: [this.derechoState?.rfc],
      federal: [this.derechoState?.federal],
      tipo: [this.derechoState?.tipo],
      programa: [this.derechoState?.programa],
      actividadActual: [this.derechoState?.actividadActual],
      actividadProductiva: [this.derechoState?.actividadProductiva, Validators.required],
    });
  }

  /**
   * Carga los datos de modificación desde el servicio.
   * Actualiza el estado del trámite y los valores del formulario.
   */
  loadDatosModificacion(): void {
    this.solicitudService.getDatosModificacion().pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((datos) => {
      (this.tramite80316Store.setDatosModificacion as (valor: unknown) => void)(datos);
    });
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   * Carga los datos de actividades productivas desde el servicio.
   */
  public inicializaCatalogos(): void {
    const ACTIVIDAD_PRODUCTIVA$ = this.solicitudService.getActividadProductiva().pipe(
      map((resp) => {
        this.actividadProductiva = resp.data;
      })
    );

    merge(
      ACTIVIDAD_PRODUCTIVA$
    )
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe();
  }

  /**
   * Método que se ejecuta cuando se selecciona una actividad productiva.
   * Actualiza el estado del trámite con la actividad seleccionada.
   */
  actividadProductivaSeleccion(): void {
    const ACTIVIDAD_PRODUCTIVA = this.modificacionForm.get('actividadProductiva')?.value;
    this.tramite80316Store.setActividadProductiva(ACTIVIDAD_PRODUCTIVA);
  }

  /**
   * Establece valores en el store del trámite.
   * 
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Nombre del campo en el formulario.
   * @param {keyof Tramite80316Store} metodoNombre - Nombre del método en el store.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite80316Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite80316Store[metodoNombre] as (valor: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }
}
