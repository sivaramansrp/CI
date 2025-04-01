import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SOLICITUD_HEADER, TEXTOS_SOLICITUD } from '../../constantes/aviso-enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { DatosDelEstablecimientoComponent } from '../datos-del-establecimiento/datos-del-establecimiento.component';
import { Solicitud } from '../../models/aviso-model';

/**
 * Componente para gestionar el datos de la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, AlertComponent, DatosDelEstablecimientoComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.css',
})
export class DatosDeLaSolicitudComponent {
  /**
   * Obtiene los datos de enumeración y establece valores de TEXTOS
   */
  TEXTOS = TEXTOS_SOLICITUD;
  /**
   * Controla la visibilidad del panel plegable.
   * El valor predeterminado está establecido en verdadero (ampliado)
   */
  colapsable: boolean = true;
  /**
   * Recibe datos del encabezado de la tabla como propiedad de entrada
   */
  tablaHeadData = SOLICITUD_HEADER.encabezadoSolicitud;
  /**
   * Recibe la lista de solicitudes como datos de fila de la tabla.
   */
  @Input() tablaFilaDatos: Solicitud[] = [];

  /**
   * Alterna el panel plegable (expandir/contraer)
   */
  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }
}
