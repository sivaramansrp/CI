import { CONFIGURACION_ACCIONISTAS, CONFIGURACION_FEDERETARIOS, CONFIGURACION_OPERACIONES } from '../../constantes/modificacion.enum';
import { Complimentaria, Federetarios, Operacions } from '../../estados/models/plantas-consulta.model';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from '../../estados/models/cambio-de-modalidad.model';
import { DatosCertificacionComponent } from '../datos-certificacion/datos-certificacion.component';
import { SolicitudService } from '../../service/solicitud.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    public solicitudService: SolicitudService,
    private toastr: ToastrService
  ) {
    this.obtenerFederetarios(); // Carga los federetarios.
    this.obtenerOperacions(); // Carga las operaciones.
    this.obtenerComplimentaria(); // Carga los datos de complimentaria.
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
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }
}
