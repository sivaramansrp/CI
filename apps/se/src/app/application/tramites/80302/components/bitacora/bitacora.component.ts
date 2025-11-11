import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TablaDinamicaComponent, doDeepCopy, esValidArray, esValidObject } from '@ng-mf/data-access-user';
import { BitacoraModificacion } from '../../estados/models/plantas-consulta.model';
import { CONFIGURACION_BITACORA_TABLA } from '../../constantes/modificacion.enum';
import { ComplementariaImmexComponent } from '../complementaria-immex/complementaria-immex.component';
import { ConfiguracionColumna } from '../../../80308/models/configuracio-columna.model';
import { ModificacionSolicitudeService } from '../../../80308/services/modificacion-solicitude.service';
import { SolicitudService } from '../../service/solicitud.service';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { Tramite80302Store } from '../../../../estados/tramites/tramite80302.store';

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
  configuracionTabla: ConfiguracionColumna<BitacoraModificacion>[] =
    CONFIGURACION_BITACORA_TABLA as ConfiguracionColumna<BitacoraModificacion>[];

  /**
   * Datos de la bitácora obtenidos desde el servicio.
   * @type {Bitacora[]}
   */
  datos: BitacoraModificacion[] = [];
  /**
   * Constructor del componente BitacoraComponent.
   * @param modificionService Servicio para manejar las modificaciones de la solicitud.
   * @param toastr Servicio para mostrar notificaciones al usuario.
   * @param solicitudService Servicio para manejar las solicitudes relacionadas con el trámite.
   */
  constructor( public modificionService: ModificacionSolicitudeService, public toastr: ToastrService,
    public solicitudService: SolicitudService,
    public tramite80302Store: Tramite80302Store,
   ) {
    this.obtenerDatosBitacora();
  }
  /**
   * Método para obtener los datos de la bitácora desde el servicio.
   * Realiza una llamada al servicio `solicitudService` para obtener los datos y los almacena en la propiedad `datos`.
   * Maneja errores mostrando una notificación al usuario en caso de fallo.
   */
  obtenerDatosBitacora():void {
    const PARAMS = { idPrograma: `120662` };
        this.solicitudService.obtenerBitacora(PARAMS)
          .pipe(takeUntil(this.destroyNotifier$))
          .subscribe(
            (data) => {
              if(esValidObject(data)) {
                const RESPONSE = doDeepCopy(data);
                if(esValidArray(RESPONSE.datos)) {
                  this.datos = RESPONSE.datos.filter(
                    (obj: BitacoraModificacion) => Object.values(obj).some(value => value !== null)
                  ); // Almacena los datos de operaciones.
                  this.tramite80302Store.setDatosBitacora(this.datos);
                }
              }
            },
            () => {
              this.toastr.error('Error al cargar los anexos de exportación');
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
