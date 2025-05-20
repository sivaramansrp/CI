import {
  CONFIGURACION_ACCIONISTAS,
  CONFIGURACION_EMPRESAS,
  CONFIGURACION_FEDERETARIOS,
  CONFIGURACION_OPERACIONES,
  CONFIGURACION_PLANTAS,
  CONFIGURACION_SERVICIOS,
} from '../../constantes/modificacion.enum';
import { Complimentaria, Empresas, Federetarios, Operacions, Plantas, Servicios } from '../../models/datos-tramite.model';
import { Component, OnDestroy } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosCertificacionComponent } from '../datos-certificacion/datos-certificacion.component';
import { SolicitudService } from '../../services/solicitud.service';
import { ToastrService } from 'ngx-toastr';

/**
 * Componente `DatosComplimentariaComponent` utilizado para gestionar y mostrar los datos relacionados con la información complementaria.
 * Este componente es independiente (standalone) y utiliza varios módulos y servicios relacionados.
 */
@Component({
  selector: 'app-datos-complimentaria',
  templateUrl: './datos-complimentaria.component.html',
  styleUrl: './datos-complimentaria.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    DatosCertificacionComponent,
    TablaDinamicaComponent,
    CommonModule
  ],
  providers: [SolicitudService, ToastrService],
})
export class DatosComplimentariaComponent implements OnDestroy {
  /**
   * Subject utilizado para notificar cuando se debe completar y limpiar las suscripciones activas.
   * Esto ayuda a prevenir fugas de memoria al completar las suscripciones al destruir el componente.
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de las columnas de la tabla para los accionistas (Complimentaria).
   * @type {ConfiguracionColumna<Complimentaria>[]}
   */
  configuracionTabla: ConfiguracionColumna<Complimentaria>[] =
    CONFIGURACION_ACCIONISTAS;

  /**
   * Configuración de las columnas de la tabla para los federetarios.
   * @type {ConfiguracionColumna<Federetarios>[]}
   */
  configuracionFederetios: ConfiguracionColumna<Federetarios>[] =
    CONFIGURACION_FEDERETARIOS;

  /**
   * Configuración de las columnas de la tabla para las operaciones.
   * @type {ConfiguracionColumna<Operacions>[]}
   */
  configuracionOperacion: ConfiguracionColumna<Operacions>[] =
    CONFIGURACION_OPERACIONES;

  /**
   * Configuración de las columnas de la tabla para las empresas.
   * @type {ConfiguracionColumna<Empresas>[]}
   */
  configuracionEmpresas: ConfiguracionColumna<Empresas>[] =
    CONFIGURACION_EMPRESAS;

  /**
   * Configuración de las columnas de la tabla para las plantas.
   * @type {ConfiguracionColumna<Plantas>[]}
   */
  configuracionPlantas: ConfiguracionColumna<Plantas>[] = CONFIGURACION_PLANTAS;

  /**
   * Configuración de las columnas de la tabla para los servicios.
   * @type {ConfiguracionColumna<Servicios>[]}
   */
  configuracionServicios: ConfiguracionColumna<Servicios>[] =
    CONFIGURACION_SERVICIOS;

  /**
   * Datos de los federetarios obtenidos desde el servicio.
   * @type {Federetarios[]}
   */
  datosFederetarios: Federetarios[] = [];

  /**
   * Datos de las operaciones obtenidos desde el servicio.
   * @type {Operacions[]}
   */
  datosOperacions: Operacions[] = [];

  /**
   * Datos de las empresas obtenidos desde el servicio.
   * @type {Empresas[]}
   */
  datosEmpresas: Empresas[] = [];

  /**
   * Datos de las plantas obtenidos desde el servicio.
   * @type {Plantas[]}
   */
  datosPlantas: Plantas[] = [];

  /**
   * Datos de los servicios obtenidos desde el servicio.
   * @type {Servicios[]}
   */
  datosServicios: Servicios[] = [];

  /**
   * Datos de la información complementaria obtenidos desde el servicio.
   * @type {Complimentaria[]}
   */
  datosComplimentaria: Complimentaria[] = [];

  /**
   * Constructor del componente `DatosComplimentariaComponent`.
   * Inicializa los servicios necesarios y carga los datos de información complementaria, federetarios, operaciones, empresas, plantas y servicios.
   * 
   * @param {SolicitudService} solicitudService - Servicio para gestionar las solicitudes.
   * @param {ToastrService} toastr - Servicio para mostrar notificaciones al usuario.
   */
  constructor(
    public solicitudService: SolicitudService,
    private toastr: ToastrService
  ) {
    this.obtenerFederetarios(); // Carga los federetarios.
    this.obtenerOperacions(); // Carga las operaciones.
    this.obtenerComplimentaria(); // Carga los datos de información complementaria.
    this.obtenerEmpresas(); // Carga las empresas.
    this.obtenerPlantas(); // Carga las plantas.
    this.obtenerServicios(); // Carga los servicios.
  }

  /**
   * Método que obtiene los datos de información complementaria desde el servicio.
   * Asigna los datos obtenidos a la variable `datosComplimentaria`.
   */
  obtenerComplimentaria(): void {
    this.solicitudService
      .obtenerComplimentaria()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Complimentaria[]) => {
          this.datosComplimentaria = [...data];
        },
        () => {
          this.toastr.error('Error al cargar los datos de complimentaria');
        }
      );
  }

  /**
   * Método que obtiene los datos de federetarios desde el servicio.
   * Asigna los datos obtenidos a la variable `datosFederetarios`.
   */
  obtenerFederetarios(): void {
    this.solicitudService
      .obtenerFederetarios()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Federetarios[]) => {
          this.datosFederetarios = [...data];
        },
        () => {
          this.toastr.error('Error al cargar los federetarios');
        }
      );
  }

  /**
   * Método que obtiene los datos de operaciones desde el servicio.
   * Asigna los datos obtenidos a la variable `datosOperacions`.
   */
  obtenerOperacions(): void {
    this.solicitudService
      .obtenerOperacion()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Operacions[]) => {
          this.datosOperacions = [...data];
        },
        () => {
          this.toastr.error('Error al cargar las operaciones');
        }
      );
  }

  /**
   * Método que obtiene los datos de empresas desde el servicio.
   * Asigna los datos obtenidos a la variable `datosEmpresas`.
   */
  obtenerEmpresas(): void {
    this.solicitudService
      .obtenerEmpresas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Empresas[]) => {
          this.datosEmpresas = [...data];
        },
        () => {
          this.toastr.error('Error al cargar las empresas');
        }
      );
  }

  /**
   * Método que obtiene los datos de plantas desde el servicio.
   * Asigna los datos obtenidos a la variable `datosPlantas`.
   */
  obtenerPlantas(): void {
    this.solicitudService
      .obtenerPlantas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Plantas[]) => {
          this.datosPlantas = [...data];
        },
        () => {
          this.toastr.error('Error al cargar las plantas');
        }
      );
  }

  /**
   * Método que obtiene los datos de servicios desde el servicio.
   * Asigna los datos obtenidos a la variable `datosServicios`.
   */
  obtenerServicios(): void {
    this.solicitudService
      .obtenerServicios()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Servicios[]) => {
          this.datosServicios = [...data];
        },
        () => {
          this.toastr.error('Error al cargar los servicios');
        }
      );
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.unsubscribe();
  }
}
