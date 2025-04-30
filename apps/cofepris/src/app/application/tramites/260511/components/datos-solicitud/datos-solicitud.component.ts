import {
  ConfiguracionVisibilidad,
  DEFAULT_CONFIGURACION_VISIBILIDAD,
} from '../../constantes/permiso-nutrientes-exportacion.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
   * Indica si se debe mostrar la sección de Aviso de Licencia
   */
  isAvisoLicenciaVisible: boolean = false;

  /**
   * Indica si se debe mostrar la sección de Aduanas de Entrada
   */
  isAduanasEntradaVisible: boolean = true;

  /**
   * Indica si se debe mostrar la sección de Garantías Ofrecidas
   */
  isGarantiasOfrecidasVisible: boolean = true;

  /**
   * Configuración de visibilidad utilizada para determinar qué elementos
   * deben ser visibles en el componente. Se inicializa con la configuración
   * predeterminada definida en `DEFAULT_CONFIGURACION_VISIBILIDAD`.
   */
  configuracionVisibilidad: ConfiguracionVisibilidad =
    DEFAULT_CONFIGURACION_VISIBILIDAD;
}
