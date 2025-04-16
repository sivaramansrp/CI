import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notificacion, NotificacionesComponent, Pedimento } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule,NotificacionesComponent],
  templateUrl: './Solicitud.component.html',
  styleUrl: './Solicitud.component.css',
})
export class SolicitudComponent {
  public pedimentos: Array<Pedimento> = [];
  public nuevaNotificacion!: Notificacion;
  public elementoParaEliminar!: number;
  cargarArchivo: boolean = false;

  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: '¿Deseas desistir la solicitud de servicios extraordinarios con el folio 0105700100020252470000001?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Sí',
      txtBtnCancelar: 'No',
    };
    this.elementoParaEliminar = i;
  }

  cargaArchivo(): void {
    this.cargarArchivo = true;
    this.abrirModal();
  }

}
