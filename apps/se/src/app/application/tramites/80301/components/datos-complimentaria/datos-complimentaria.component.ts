import {
  CONFIGURACION_FEDERETARIOS,
  CONFIGURACION_OPERACIONES,
} from '../../constantes/modificacion.enum';
import {
  Complimentaria,
  Federetarios,
  Operacions,
} from '../../models/plantas-consulta.model';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ComplementariaComponent } from '../../../../shared/components/complementaria/complementaria.component';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { ServiciosImmex } from '../../../../shared/models/complementaria.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datos-complimentaria',
  templateUrl: './datos-complimentaria.component.html',
  styleUrl: './datos-complimentaria.component.scss',
  standalone: true,
  imports: [
    ComplementariaComponent
  ],
  providers: [ModificacionSolicitudeService, ToastrService],
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
   * Datos de la complimentaria obtenidos desde el servicio.
   * @type {Complimentaria[]}
   */
  datosComplimentaria: Complimentaria[] = [];

  /**
   * Datos de los servicios Immex obtenidos desde el servicio.
   * @type {ServiciosImmex[]}
   */
  datosServiciosImmex: ServiciosImmex[] = [];

  /**
   * Constructor del componente DatosComplimentariaComponent.
   * @param modificionService Servicio para manejar las solicitudes de modificación.
   * @param toastr Servicio para mostrar notificaciones.
   */
  constructor(
    public modificionService: ModificacionSolicitudeService,
    private toastr: ToastrService
  ) {
    this.obtenerFederetarios(); // Carga los federetarios.
    this.obtenerOperacions(); // Carga las operaciones.
    this.obtenerComplimentaria(); // Carga los datos de complimentaria.
    this.obtenerServiciosImmex(); // Carga los servicios Immex.
  }

  /**
   * Método que obtiene los datos de complimentaria desde el servicio.
   * Asigna los datos obtenidos a la variable `datosComplimentaria`.
   */
  obtenerComplimentaria(): void {
    this.modificionService
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
    this.modificionService
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
    this.modificionService
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
   * Método que obtiene los datos de servicios Immex desde el servicio.
   * Asigna los datos obtenidos a la variable `datosServiciosImmex`.
   */
  obtenerServiciosImmex(): void {
    this.modificionService
      .obtenerServiciosImmex() // Llama al servicio para obtener los datos de servicios Immex.
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando el componente se destruye.
      .subscribe(
        (data: ServiciosImmex[]) => {
          this.datosServiciosImmex = [...data]; // Almacena los datos de servicios Immex.
        },
        () => {
          this.toastr.error('Error al cargar los servicios Immex'); // Manejo de errores.
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
