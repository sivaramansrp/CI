import {
  Catalogo,
  ConfiguracionColumna,
  Notificacion,
  TablaSeleccion
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SolicitudPermisoState,
  Tramite260703Store,
} from '../../estados/store/tramite260703.store';
import { Subject, takeUntil } from 'rxjs';
import { NOTIFICION_INPUT } from '../../enum/solicitud-permiso.enum';
import { SCIAN_DATA } from '../../../../shared/constantes/datos-scian.enum';
import { ScianData } from '../../../../shared/models/datos-modificacion.model';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';

/**
 * Componente que representa la sección de domicilio del establecimiento.
 * Permite capturar y gestionar información relacionada con el domicilio del establecimiento.
 */
@Component({
  selector: 'app-domicilio-del-establecimiento',
  templateUrl: './domicilio-del-establecimiento.component.html',
  styleUrl: './domicilio-del-establecimiento.component.scss',
})
export class DomicilioDelEstablecimientoComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para capturar los datos del domicilio del establecimiento.
   */
  domicilloDelEstablecimientoForm!: FormGroup;

  /**
   * Estado actual de la solicitud de permiso.
   */
  solicitudPermisoState!: SolicitudPermisoState;

  /**
   * Configuración de las columnas de la tabla SCIAN.
   */
  configuracionTabla: ConfiguracionColumna<ScianData>[] = SCIAN_DATA;

  /**
   * Datos de la tabla SCIAN.
   */
  datos!: ScianData[];

  /**
   * Lista de estados disponibles.
   */
  estado: Catalogo[] = [];

  /**
   * Tipo de selección de la tabla (por ejemplo, selección por checkbox).
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de la notificación de entrada.
   * Define los parámetros iniciales para las notificaciones del componente.
   */
  notificacionInput: Notificacion = NOTIFICION_INPUT;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  destruirNotificacion$: Subject<void> = new Subject<void>();

  /**
   * Constructor del componente.
   * Inicializa los servicios necesarios para gestionar el formulario y el estado.
   * formBuilder Servicio para construir formularios reactivos.
   * solicitudPermisoService Servicio para obtener datos relacionados con el domicilio.
   * tramite260703Store Servicio para gestionar el estado del trámite.
   * tramite260703Query Servicio para consultar el estado del trámite.
   */
  constructor(
    private formBuilder: FormBuilder,
    public solicitudPermisoService: SolicitudPermisoService,
    private tramite260703Store: Tramite260703Store,
    private tramite2606703Query: Tramite260703Query
  ) {}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Configura las suscripciones necesarias, obtiene los datos de SCIAN y crea el formulario inicial.
   */
  ngOnInit(): void {
    this.tramite2606703Query.selectSolicitudPermiso$
      .pipe(takeUntil(this.destruirNotificacion$))
      .subscribe((solicitudPermisoState: SolicitudPermisoState) => {
        this.solicitudPermisoState = solicitudPermisoState;
      });
    this.solicitudPermisoService.obtenerDomicilioCatalogo();
    this.obtenerScianData();
    this.inicializarFormularioDomicilioDelEstablecimiento();
  }

  /**
   * Inicializa el formulario reactivo para capturar los datos del domicilio del establecimiento.
   * Los valores iniciales se obtienen del estado actual de la solicitud.
   */
  inicializarFormularioDomicilioDelEstablecimiento(): void {
    this.domicilloDelEstablecimientoForm = this.formBuilder.group({
      codigoPostal: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.codigoPostal,
        [Validators.required],
      ],
      estado: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.estado,
        [Validators.required],
      ],
      descripcionMunicipio: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.descripcionMunicipio,
        [Validators.required],
      ],
      informacionExtra: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.informacionExtra,
      ],
      descripcionColonia: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.descripcionColonia,
      ],
      calle: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.calle,
        [Validators.required],
      ],
      lada: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.lada,
      ],
      telefono: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.telefono,
        [Validators.required],
      ],
      funcionamiento: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.funcionamiento,
      ],
      licencia: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.licencia,
      ],
      regimen: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.regimen,
        [Validators.required],
      ],
      aduana: [
        this.solicitudPermisoState.domicilloDelEstablecimientoFormState?.aduana,
        [Validators.required],
      ],
    });
  }

  /**
   * Obtiene los datos de SCIAN desde el servicio.
   * Actualiza la propiedad 'datos' con los datos obtenidos.
   */
  obtenerScianData(): void {
    this.solicitudPermisoService
      .obtenerScianData()
      .pipe(takeUntil(this.destruirNotificacion$))
      .subscribe((data) => {
        this.datos = data;
      });
  }

  /**
   * Actualiza el estado del formulario de domicilio del establecimiento en el store.
   * campo Nombre del campo del formulario a actualizar.
   */
  setValoresStore(campo: string): void {
    const VALOR = this.domicilloDelEstablecimientoForm.get(campo)?.value;
    this.tramite260703Store.actualizarEstadoFormularioDomicilioDelEstablecimiento({
      [campo]: VALOR,
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destruirNotificacion$.next();
    this.destruirNotificacion$.complete();
  }
}
