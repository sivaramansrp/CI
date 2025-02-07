import { Component, Input } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/220502/texto-enum';
import { Solicitud } from '../../../../core/models/220502/solicitud-pantallas.model';
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
   * Gets the enum data and sets TEXTOS values
   */
  TEXTOS = TEXTOS;
 /**
   * Controls the collapsible panel's visibility
   * Default value is set to true (expanded)
   */
  colapsable: boolean = true;
  /**
   * Receives table header data as an input property
   */
  @Input() tablaHeadData : string[];
  /**
   * Receives the list of solicitudes as table row data
   */
  @Input() tablaFilaDatos : Solicitud[];

 /**
   * Toggles the collapsible panel (expand/collapse)
   */
 mostrarColapsable() {
    this.colapsable = !this.colapsable;
  }
}
