import {
  CONFIGURACION_ACCIONISTAS,
  CONFIGURACION_EMPRESAS,
  CONFIGURACION_FEDERETARIOS,
  CONFIGURACION_OPERACIONES,
  CONFIGURACION_PLANTAS,
  CONFIGURACION_SERVICIOS,
} from '../../constantes/modificacion.enum';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  TablaDinamicaComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { DatosCertificacionComponent } from '../datos-certificacion/datos-certificacion.component';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracionColumna } from '../../../80308/models/configuracio-columna.model';
import {
  Complimentaria,
  Federetarios,
  Operacions,
} from '../../../80308/models/plantas-consulta.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Empresas, Plantas, Servicios } from '../../models/datos-tramite.model';
import { CONFIGURACION_SERVICIO } from '../../../80208/modelos/cambio-de-modalidad.model';

@Component({
  selector: 'app-datos-complimentaria',
  templateUrl: './datos-complimentaria.component.html',
  styleUrl: './datos-complimentaria.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    DatosCertificacionComponent,
    TablaDinamicaComponent,
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
   * Configuración de las columnas de la tabla para las Empresas.
   * @type {ConfiguracionColumna<Empresas>[]}
   */
  configuracionEmpresas: ConfiguracionColumna<Empresas>[] =
    CONFIGURACION_EMPRESAS;

  /**
   * Configuración de las columnas de la tabla para las Plantas.
   * @type {ConfiguracionColumna<Plantas>[]}
   */
  configuracionPlantas: ConfiguracionColumna<Plantas>[] = CONFIGURACION_PLANTAS;

  /**
   * Configuración de las columnas de la tabla para las Servicios.
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
   * Datos de las Empresas obtenidos desde el servicio.
   * @type {Empresas[]}
   */
  datosEmpresas: Empresas[] = [];

  /**
   * Datos de las Plantas obtenidos desde el servicio.
   * @type {Plantas[]}
   */
  datosPlantas: Plantas[] = [];

  /**
   * Datos de las Servicios obtenidos desde el servicio.
   * @type {Servicios[]}
   */
  datosServicios: Servicios[] = [];

  /**
   * Datos de la complimentaria obtenidos desde el servicio.
   * @type {Complimentaria[]}
   */
  datosComplimentaria: Complimentaria[] = [];

  constructor(
    public solicitudService: SolicitudService,
    private toastr: ToastrService
  ) {
    this.obtenerFederetarios(); // Carga los federetarios.
    this.obtenerOperacions(); // Carga las operaciones.
    this.obtenerComplimentaria(); // Carga los datos de complimentaria.
    this.obtenerEmpresas(); // Carga las empresas.
    this.obtenerPlantas(); // Carga las plantas.
    this.obtenerServicios(); // Carga los servicios.
  }

  /**
   * Método que obtiene los datos de complimentaria desde el servicio.
   * Asigna los datos obtenidos a la variable `datosComplimentaria`.
   */
  obtenerComplimentaria(): void {
    this.solicitudService
      .obtenerComplimentaria() // Llama al servicio para obtener los datos de complimentaria.
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: Complimentaria[]) => {
          this.datosComplimentaria = [...data]; // Almacena los datos de complimentaria.
        },
        () => {
          this.toastr.error('Error al cargar los datos de complimentaria'); // Manejo de errores.
        }
      );
  }

  /**
   * Método que obtiene los datos de federetarios desde el servicio.
   * Asigna los datos obtenidos a la variable `datosFederetarios`.
   */
  obtenerFederetarios(): void {
    this.solicitudService
      .obtenerFederetarios() // Llama al servicio para obtener los datos de federetarios.
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: Federetarios[]) => {
          this.datosFederetarios = [...data]; // Almacena los datos de federetarios.
        },
        () => {
          this.toastr.error('Error al cargar los federetarios'); // Manejo de errores.
        }
      );
  }

  /**
   * Método que obtiene los datos de operaciones desde el servicio.
   * Asigna los datos obtenidos a la variable `datosOperacions`.
   */
  obtenerOperacions(): void {
    this.solicitudService
      .obtenerOperacion() // Llama al servicio para obtener los datos de operaciones.
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: Operacions[]) => {
          this.datosOperacions = [...data]; // Almacena los datos de operaciones.
        },
        () => {
          this.toastr.error('Error al cargar las operaciones'); // Manejo de errores.
        }
      );
  }

  /**
   * Método que obtiene los datos de Empresas desde el servicio.
   * Asigna los datos obtenidos a la variable `datosEmpresas`.
   */
  obtenerEmpresas(): void {
    this.solicitudService
      .obtenerEmpresas()
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: Empresas[]) => {
          this.datosEmpresas = [...data];
        },
        () => {
          this.toastr.error('Error al cargar las Empresas');
        }
      );
  }

  /**
   * Método que obtiene los datos de Plantas desde el servicio.
   * Asigna los datos obtenidos a la variable `datosPlantas`.
   */
  obtenerPlantas(): void {
    this.solicitudService
      .obtenerPlantas()
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: Plantas[]) => {
          this.datosPlantas = [...data];
        },
        () => {
          this.toastr.error('Error al cargar las Empresas');
        }
      );
  }

  /**
   * Método que obtiene los datos de Plantas desde el servicio.
   * Asigna los datos obtenidos a la variable `datosServicios`.
   */
  obtenerServicios(): void {
    this.solicitudService
      .obtenerServicios()
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: Servicios[]) => {
          this.datosServicios = [...data];
        },
        () => {
          this.toastr.error('Error al cargar las Empresas');
        }
      );
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
