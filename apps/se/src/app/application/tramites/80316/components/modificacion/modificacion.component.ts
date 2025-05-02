import { Component, OnDestroy, OnInit } from '@angular/core';
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, map, merge, takeUntil } from 'rxjs';
import { Solicitud80316State, Tramite80316Store } from '../../estados/tramite80316.store';
import { CONFIGURACION_MODIFICACION } from '../../constantes/modificacion.enum';
import { CommonModule } from '@angular/common';
import { SolicitudService } from '../../services/solicitud.service';
import { Tramite80316Query } from '../../estados/tramite80316.query';
import { DatosDelModificacion } from '../../models/datos-tramite.model';

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
  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudService,
    private tramite80316Store: Tramite80316Store,
    private tramite80316Query: Tramite80316Query
  ) {}

  /**
   * Grupo de formulario para el formulario de solicitud.
   */
  modificacionForm!: FormGroup;

  /**
   * Observable para notificar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   * Contiene los datos relacionados con la modificación del trámite.
   */
  public derechoState: Solicitud80316State = {} as Solicitud80316State;

  /**
   * Define los datos que se mostrarán en la tabla dinámica.
   */
  datosTabla: DatosDelModificacion[] = [];
  actividadProductiva!: Catalogo[];

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario, carga los datos de modificación y los datos de la tabla.
   */
  ngOnInit(): void {
    this.tramite80316Query.selectSolicitud$.pipe(takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.derechoState = {
            ...this.derechoState,
            ...seccionState,
          };
        })).subscribe();
    this.inicializarFormulario();
    this.loadDatosModificacion();
    this.inicializaCatalogos();
  }

  /**
   * Inicializa el formulario reactivo con los valores actuales del estado.
   */
  inicializarFormulario(): void {
    this.modificacionForm = this.fb.group({
      rfc: [this.derechoState?.datosModificacion?.rfc],
      federal: [this.derechoState?.datosModificacion?.federal],
      tipo: [this.derechoState?.datosModificacion?.tipo],
      programa: [this.derechoState?.datosModificacion?.programa],
      actividadActual: [this.derechoState?.datosModificacion?.actividadActual],
      actividadProductiva: [this.derechoState?.datosModificacion?.actividadProductiva, Validators.required],
    });
  }

  /**
   * Carga los datos de modificación desde el servicio.
   * Actualiza el estado del trámite y los valores del formulario.
   */
  loadDatosModificacion(): void {
    this.solicitudService.getDatosModificacion().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      (this.tramite80316Store.setDatosModificacion as (valor: unknown) => void)(datos);
    });
  }

  private inicializaCatalogos(): void {
    const ACTIVIDADPRODUCTIVA$ = this.solicitudService.getActividadProductiva().pipe(
      map((resp) => {
        this.actividadProductiva = resp.data;
      })
    );

    merge(
      ACTIVIDADPRODUCTIVA$
    )
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe();
  }

  actividadProductivaSeleccion():void {
    const ACTIVIDADPRODUCTIVA = this.modificacionForm.get('actividadProductiva')?.value;
    this.tramite80316Store.setActividadProductiva(ACTIVIDADPRODUCTIVA);
  }

  /**
   * Establecer valores en el store del trámite.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store.
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
