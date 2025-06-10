import { Component, OnDestroy, OnInit } from '@angular/core';
import { DESTINATARIO_CONFIGURACION_TABLA2 } from '../../constants/column-config.enum';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Notificacion, NotificacionesComponent, Pedimento } from '@libs/shared/data-access-user/src';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TramitesAsociados } from '../../models/destinatario.model';

/**
 * Componente para mostrar y gestionar los trámites asociados a una solicitud.
 * Permite visualizar los trámites en una tabla dinámica, mostrar notificaciones y controlar la visibilidad de un modal.
 *
 * @selector app-tramites-asociados
 * @templateUrl ./tramites-asociados.component.html
 * @styleUrl ./tramites-asociados.component.scss
 * @standalone true
 * @imports [TablaDinamicaComponent, TituloComponent, NotificacionesComponent]
 */
@Component({
  selector: 'app-tramites-asociados',
  templateUrl: './tramites-asociados.component.html',
  styleUrls: ['./tramites-asociados.component.scss'],
  standalone: true,
  imports: [TablaDinamicaComponent, TituloComponent,NotificacionesComponent],
})
export class TramitesAsociadosComponent implements OnInit, OnDestroy {
  /**
   * Arreglo que contiene los datos de las filas de la tabla.
   * Cada elemento representa un trámite asociado.
   */
  tablaFilaDatos: TramitesAsociados[] = [];

  /**
   * Variable que controla la visibilidad del modal.
   * Si es true, el modal se muestra; si es false, se oculta.
   */
  esModalVisible = false;

  /**
   * Sujeto que se utiliza para manejar la destrucción de suscripciones.
   * Se completa en el método ngOnDestroy para evitar fugas de memoria.
   * @private
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Configuración de las columnas de la tabla para los trámites asociados.
   * Utiliza la configuración definida en DESTINATARIO_CONFIGURACION_TABLA2.
   */
  destinatarioConfiguracionTabla = DESTINATARIO_CONFIGURACION_TABLA2;
   
  /**
   * Configuración para la notificación actual.
   * Se utiliza para mostrar mensajes al usuario.
   */
  public nuevaNotificacion: Notificacion | null = null;

  /**
   * Índice del elemento que se desea eliminar.
   * Se utiliza para identificar el trámite seleccionado para eliminación.
   */
  elementoParaEliminar!: number;

  /**
   * Lista de pedimentos asociados a la solicitud.
   */
  pedimentos: Array<Pedimento> = [];

  /**
   * Constructor de la clase.
   * @param permisosanitariodisposivos Servicio para obtener los trámites asociados.
   */
  constructor(private permisosanitariodisposivos: PermisoSanitarioDispositivosMedicosService) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Llama a la función para obtener los trámites asociados.
   */
  ngOnInit(): void {
    this.getTramitesAsociados();
  }

  /**
   * Método para obtener los trámites asociados desde el servicio.
   * Actualiza el arreglo de datos de la tabla con la información recibida.
   */
  getTramitesAsociados(): void {
    this.permisosanitariodisposivos
      .getTramitesAsociados()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.tablaFilaDatos = data as TramitesAsociados[];
      });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Completa el sujeto destroyed$ para limpiar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}