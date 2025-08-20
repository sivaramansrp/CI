import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Bitacora } from '../../models/plantas-consulta.model';
import { CONFIGURACION_BITACORA_TABLA } from '../../constantes/modificacion.enum';
import { CommonModule } from '@angular/common';
import { ComplementariaImmexComponent } from '../complementaria-immex/complementaria-immex.component';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  standalone: true,
  imports: [TituloComponent, TablaDinamicaComponent, ComplementariaImmexComponent, CommonModule, ReactiveFormsModule],
})
export class BitacoraComponent implements OnDestroy {
  /**
   * Subject utilizado para notificar cuando se debe completar y limpiar las suscripciones activas.
   * Esto evita fugas de memoria al completar las suscripciones cuando el componente es destruido.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de las columnas de la tabla que muestra la bitácora.
   * Este arreglo define las propiedades de las columnas que se mostrarán en la tabla.
   */
  configuracionTabla: ConfiguracionColumna<Bitacora>[] = CONFIGURACION_BITACORA_TABLA;

  /**
   * Datos de la bitácora obtenidos desde el servicio.
   * Este arreglo almacena los registros de la bitácora que se mostrarán en la tabla.
   */
  datos: Bitacora[] = [];

  /**
   * Constructor del componente.
   * @param modificionService Servicio utilizado para obtener los datos de la bitácora.
   * @param toastr Servicio utilizado para mostrar notificaciones al usuario.
   */
  constructor(
    public modificionService: ModificacionSolicitudeService,
    public toastr: ToastrService
  ) {
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
   * Notifica a todos los observables que deben completarse y cancela las suscripciones activas.
   * Esto asegura que no haya fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Se notifica a todos los observables que deben completarse.
    this.destroyNotifier$.unsubscribe(); // Se cancelan las suscripciones activas.
  }
}