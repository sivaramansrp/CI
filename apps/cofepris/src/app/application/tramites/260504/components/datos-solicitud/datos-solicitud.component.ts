import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDeLaComponent } from '../../../../shared/components/datos-solicitud/datos-solicitud.component';

/**
 * Componente `DatosSolicitudComponent`
 *
 * Este componente es responsable de gestionar y mostrar las secciones relacionadas con los datos de la solicitud
 * en el trámite correspondiente. Es un componente independiente (standalone) que utiliza otros módulos y componentes
 * compartidos para su funcionalidad.
 */
@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule, DatosDeLaComponent],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss',
})
export class DatosSolicitudComponent {
  /**
   * Indica si se debe mostrar la sección de Aviso de Licencia
   */
  isAvisoLicenciaVisible: boolean = true;

  /**
   * Indica si se debe mostrar la sección de Aduanas de Entrada
   */
  isAduanasEntradaVisible: boolean = true;
}
