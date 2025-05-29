import { AlertComponent } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Solicitud } from '../../models/solicitud-pantallas.model';
import { TEXTOS } from '../../../220501/constantes/texto-enum';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * Componente que representa los datos de la solicitud.
 */
@Component({
  selector: 'app-solicitud-datos',
  standalone: true,
  imports: [TituloComponent, AlertComponent],
  templateUrl: './solicitud-datos.component.html',
  styleUrl: './solicitud-datos.component.scss',
})
/**
 * Componente que representa los datos de la solicitud
 */ 
export class SolicitudDatosComponent {
  /**
   * Obtiene los datos de enumeración y establece valores de TEXTOS
   */
  TEXTOS = TEXTOS;
  /**
   * Controla la visibilidad del panel plegable.
   * El valor predeterminado está establecido en verdadero (ampliado)
   */
  colapsable: boolean = true;
  /**
   * Recibe datos del encabezado de la tabla como propiedad de entrada
   */
  @Input() tablaHeadData: string[] = [];
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
