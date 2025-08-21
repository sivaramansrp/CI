import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictamenesComponent } from '../bandeja-dictamenes/dictamenes.component';

import { ConsultaDetalleDictamenComponent } from '../consulta-detalle-dictamen/consulta-detalle-dictamen.component';
import { ConsultaDetalleObservacionDictamenComponent } from '../consulta-detalle-observacion-dictamen/consulta-detalle-observacion-dictamen.component';
import { DetalleDictamenService } from '../../../../core/services/130118/detalleDictamen.service';
import { DictamenDetalleResponse } from '../../../../core/models/130118/dictamen-detalle-response.model';
import { DictamenesResponse } from '../../../../core/models/130118/dictamenes-response.model';

import { CategoriaMensaje, Notificacion, NotificacionesComponent } from '../../notificaciones/notificaciones.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'tab-dictamen',
  standalone: true,
  imports: [CommonModule, DictamenesComponent, ConsultaDetalleDictamenComponent, ConsultaDetalleObservacionDictamenComponent, NotificacionesComponent],
  templateUrl: './tab-dictamen.component.html',
  styleUrl: './tab-dictamen.component.scss',
})
export class TabDictamenComponent implements OnDestroy{
  /**
   * Subject para notificar la destrucción del componente y cancelar suscripciones.
  */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Índice de la pestaña seleccionada en la interfaz de usuario.
  */
  indice: number = 1;

  /**
    * @property {DictamenesResponse[]} dictamenes
    * @description Dictamenes de solicitud.
  */
  @Input() dictamenes: DictamenesResponse[] = [];

  /**
    * Detalle completo del dictamen seleccionado
  */
  dictamenDetalle!: DictamenDetalleResponse;

  /**
   * ID del dictamen actualmente seleccionada
   */
  idDictamenActual!: string;

  /**
   * @property {number} tramite
   * @description Identificador del trámite asociado a las pestañas.
  */
  @Input() tramite!: number;

  /**
   * URL de la página actual.
   */
  public nuevaNotificacion: Notificacion | null = null;

  /**
   * Se utiliza para mostrar el folio en la notificación de éxito.
   */
  public alertaNotificacion!: Notificacion;


  /**
   * Constructor del componente
  */
  constructor(
    private detalleDictamenService: DetalleDictamenService

  ) {

  }

  /**
   * Maneja la selección de un dictamen
   * @param id ID del dictamen seleccionado
   */
  onIdDictamenSeleccionado(id: number): void {
    this.idDictamenActual = id.toString();
    this.seleccionaTab(2);
    this.getDetalleDictamen(this.idDictamenActual);
  }

  /**
   * Obtiene el detalle completo de un dictamen
   * @param idDictamen ID del dictamen a consultar
 */
  getDetalleDictamen(idDictamen: string): void {
    this.detalleDictamenService
      .getDetalleDictamen(this.tramite, idDictamen)
      .subscribe({
       next: (data) => {
          if (data.codigo === "00") {
          this.dictamenDetalle = data.datos ?? {} as DictamenDetalleResponse;
          this.seleccionaTab(2);
        }else{
          window.scrollTo({ top: 0, behavior: 'smooth' }); 
          this.seleccionaTab(1);
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: data.error || 'Error detalle dictamen',
            mensaje:
              data.causa ||
              data.mensaje ||
              data.error ||
              'Ocurrió un error al consultar detalle dictamen.',
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
          mensaje: error?.error?.error || 'Error inesperado en detalle dictamen.',
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
