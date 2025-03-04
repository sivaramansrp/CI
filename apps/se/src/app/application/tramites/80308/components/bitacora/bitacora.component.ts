import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Bitacora } from '../../models/plantas-consulta.model';
import { CONFIGURACION_BITACORA_TABLA } from '../../constantes/modificacion.enum';
import { ComplementariaImmexComponent } from '../complementaria-immex/complementaria-immex.component';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';

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
  providers: [ModificacionSolicitudeService, ToastrService],
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
   * @type {ConfiguracionColumna<Bitacora>[]}
   */
  configuracionTabla: ConfiguracionColumna<Bitacora>[] =
    CONFIGURACION_BITACORA_TABLA;

  /**
   * Datos de la bitácora obtenidos desde el servicio.
   * @type {Bitacora[]}
   */
  datos: Bitacora[] = [];

  constructor( public modificionService: ModificacionSolicitudeService, private toastr: ToastrService ) {
    this.modificionService
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
