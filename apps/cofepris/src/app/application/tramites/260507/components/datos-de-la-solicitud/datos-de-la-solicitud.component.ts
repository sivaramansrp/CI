import { Component } from '@angular/core';

import { DatosDeLaComponent } from '../../../../shared/components/datos-solicitud/datos-solicitud.component';

/**
 * Componente que muestra la sección de Datos de la Solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    DatosDeLaComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent {
  /**
   * Indica si se debe mostrar la sección de Aviso de Licencia
   */
  isAvisoLicenciaVisible: boolean = false;

  /**
   * Indica si se debe mostrar la sección de Aduanas de Entrada
   */
  isAduanasEntradaVisible: boolean = true;
  /**
   * Identificador del procedimiento que se recibe como entrada desde el componente padre.
   * Este valor se utiliza para cargar datos específicos relacionados con el procedimiento,
   * como catálogos o listas asociadas.
   */
  public idProcedimiento: number = 260507;
}
