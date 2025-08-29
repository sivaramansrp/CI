import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaMensaje, Notificacion, NotificacionesComponent } from '../../notificaciones/notificaciones.component';
import { ConsultaDetalleObservacionRequerimientoComponent } from '../consulta-detalle-observacion-requerimiento/consulta-detalle-observacion-requerimiento.component';
import { ConsultaDetalleRequerimientoComponent } from '../consulta-detalle-requerimiento/consulta-detalle-requerimiento.component';
import { ConsultarequerimientosComponent } from '../consulta-requerimientos/consulta-requerimientos.component';
import { DetalleRequerimientoService } from '../../../../core/services/130118/detalleRequerimiento.service';
import { RequerimientoDetalleResponse } from '../../../../core/models/130118/requerimiento-detalle-response.model';
import { RequerimientosResponse } from '../../../../core/models/130118/requerimientos-response.model';
import { Subject } from 'rxjs';



@Component({
  selector: 'tab-requerimiento',
  standalone: true,
  imports: [CommonModule, ConsultarequerimientosComponent, ConsultaDetalleRequerimientoComponent,ConsultaDetalleObservacionRequerimientoComponent ,NotificacionesComponent],
  templateUrl: './tab-requerimiento.component.html',
  styleUrl: './tab-requerimiento.component.scss'
})
export class TabRequerimientoComponent implements OnDestroy {
  /**
    * @property {RequerimientosResponse[]} requerimientos
    * @description Requerimientos de solicitud.
  */
  @Input() requerimientos: RequerimientosResponse[] = [];

  /**
    * Detalle completo del requerimiento seleccionado
  */
  requerimientoDetalle!: RequerimientoDetalleResponse;

  /**
    * Subject para notificar la destrucción del componente y cancelar suscripciones.
  */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Índice de la pestaña seleccionada en la interfaz de usuario.
  */
  indice: number = 1;

  /**
   * URL de la página actual.
  */
  public nuevaNotificacion: Notificacion | null = null;

  /**
   * Se utiliza para mostrar el folio en la notificación de éxito.
   */
  public alertaNotificacion!: Notificacion;

  /**
   * ID del requerimiento actualmente seleccionado
   */
  idRequerimientoActual!: number;

  /**
   * @property {number} tramite
   * @description Identificador del trámite asociado a las pestañas.
  */
  @Input() tramite!: number;


  /**
   * Constructor del componente
  */
  constructor(
    private detalleRequerimientoService: DetalleRequerimientoService
  ) {

  }

  /**
   * Maneja la selección de un requerimiento
   * @param id ID del requerimiento seleccionado
   */
  onIdRequerimientoSeleccionado(id: number): void {
    this.idRequerimientoActual = id;
    this.seleccionaTab(2);
    this.getRequerimiento(this.idRequerimientoActual);
  }

  /**
   * @method getRequerimiento
   * @description Obtiene el detalle de un requerimiento específico
   * 
   * Realiza una petición al servicio para recuperar el detalle completo
   * de un requerimiento. Asigna el detalle a la variable RequerimientoDetalle
   * si la respuesta es exitosa (código '00'), o muestra un error en caso contrario.
   * 
   * @param {number} idRequerimiento - ID del requerimiento a consultar
   * @returns {void}
  */
  getRequerimiento(idRequerimiento: number): void {
    this.detalleRequerimientoService
    .getDetalleRequerimiento(this.tramite, idRequerimiento)
    .subscribe({
    next: (data) => {
      if (data.codigo === "00") {
        this.requerimientoDetalle = data.datos ?? {} as RequerimientoDetalleResponse;
        this.seleccionaTab(2);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.seleccionaTab(1);
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: CategoriaMensaje.ERROR,
          modo: 'action',
          titulo: data.error || 'Error detalle requerimiento',
          mensaje:
            data.causa ||
            data.mensaje ||
            data.error ||
            'Ocurrió un error al consultar detalle requerimiento.',
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        };
      }
    },
    error: (error) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.nuevaNotificacion = {
        tipoNotificacion: 'toastr',
        categoria: CategoriaMensaje.ERROR,
        modo: 'action',
        titulo: '',
        mensaje: error?.error?.error || 'Error inesperado en detalle requerimiento.',
        cerrar: false,
        txtBtnAceptar: '',
        txtBtnCancelar: '',
      };
    }
  });
  }


  /**
   * Ciclo de vida: OnDestroy
   * Limpia las suscripciones activas
  */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Cambia la pestaña seleccionada en la UI.
   * @param i Índice de la pestaña a activar.
  */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
