import { Component, OnDestroy } from '@angular/core';
import { ConfiguracionColumna, TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { Bitacora } from '../../models/datos-tramite.model';
import { CONFIGURACION_BITACORA_TABLA } from '../../constantes/modificacion.enum';
import { ComplementariaImmexComponent } from '../complementaria-immex/complementaria-immex.component';
import { SolicitudService } from '../../services/solicitud.service';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';

/**
 * Componente `BitacoraComponent` utilizado para mostrar y gestionar la bitácora de actividades.
 * Este componente es independiente (standalone) y utiliza varios módulos y servicios.
 */
@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.scss',
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    TituloComponent,
    ComplementariaImmexComponent,
  ],
  providers: [ToastrService],
})
export class BitacoraComponent implements OnDestroy {
  /**
   * Subject utilizado para notificar cuando se debe completar y limpiar las suscripciones activas.
   * Esto evita fugas de memoria al completar las suscripciones al destruir el componente.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de las columnas de la tabla que muestra la bitácora.
   * Esta configuración define cómo se mostrarán los datos en la tabla.
   * @type {ConfiguracionColumna<Bitacora>[]}
   */
  configuracionTabla: ConfiguracionColumna<Bitacora>[] =
    CONFIGURACION_BITACORA_TABLA;

  /**
   * Datos de la bitácora obtenidos desde el servicio.
   * Estos datos se muestran en la tabla de la bitácora.
   * @type {Bitacora[]}
   */
  datos: Bitacora[] = [];

  /**
   * Constructor del componente `BitacoraComponent`.
   * Inicializa el servicio de solicitudes y el servicio de notificaciones (Toastr).
   * También realiza la suscripción para obtener los datos de la bitácora.
   *
   * @param {SolicitudService} solicitudService - Servicio para gestionar las solicitudes.
   * @param {ToastrService} toastr - Servicio para mostrar notificaciones al usuario.
   */
  constructor(
    public solicitudService: SolicitudService,
    private toastr: ToastrService
  ) {
    this.solicitudService
      .obtenerBitacora()
      .pipe(takeUntil(this.destroyNotifier$)) // Se cancela la suscripción cuando se destruye el componente.
      .subscribe(
        (data: Bitacora[]) => {
          this.datos = [...data]; // Almacena los datos de la bitácora en la variable `datos`.
        },
        () => {
          this.toastr.error('Error al cargar los estados'); // Manejo de errores.
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
