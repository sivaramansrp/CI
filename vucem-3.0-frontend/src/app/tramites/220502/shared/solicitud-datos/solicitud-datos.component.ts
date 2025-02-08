/* eslint-disable sort-imports */
import { Component, Input } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/220502/texto-enum';
import { solicitud } from '../../../../core/models/220502/solicitud-pantallas.model';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';


@Component({
  selector: 'app-solicitud-datos',
  standalone: true,
  imports:[TituloComponent, AlertComponent],
  templateUrl: './solicitud-datos.component.html',
  styleUrl: './solicitud-datos.component.scss'
})
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
  @Input() tablaHeadData : string[];
  /**
   * Recibe la lista de solicitudes como datos de fila de la tabla.
   */
  @Input() tablaFilaDatos : solicitud[];

 /**
   * Alterna el panel plegable (expandir/contraer)
   */
 mostrarColapsable() {
    this.colapsable = !this.colapsable;
  }
}
