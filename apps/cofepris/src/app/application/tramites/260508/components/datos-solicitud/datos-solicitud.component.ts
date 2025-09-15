import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosDeLaComponent } from '../../../../shared/components/datos-solicitud/datos-solicitud.component';

/**
 * Componente que muestra la sección de Datos de la Solicitud.
 * Esta sección es común para todos los trámites.
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
   * Indica si se debe mostrar la sección de isGarantiasOfrecidasVisible
   */
   isGarantiasOfrecidasVisible: boolean = true;
  /**
   * Indica si se debe mostrar la sección de Aviso de Licencia
   */
  isAvisoLicenciaVisible: boolean = true;

  /**
   * Indica si se debe mostrar la sección de Aduanas de Entrada
   */
  isAduanasEntradaVisible: boolean = true;

  /**
   * Indica si el solicitante tiene uso específico.
   */
  @Input() tieneUsoEspecifico: boolean = true;

  /**
   * Indica si se debe habilitar el domicilio.
   */
  tieneDomicilioHabilitar: boolean = true;
}
