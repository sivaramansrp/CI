import { Component, ViewChild } from '@angular/core';
import {
  ConfiguracionVisibilidad,
  DEFAULT_CONFIGURACION_VISIBILIDAD,
} from '../../constantes/permiso-nutrientes-exportacion.enum';
import { CommonModule } from '@angular/common';
import { DatosDeLaComponent } from '../../../../shared/components/datos-solicitud/datos-solicitud.component';

import { Tramite260511Store } from '../../../../shared/estados/stores/260511/tramite260511.store';

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
  /** Referencia al componente 'CertificadoOrigenComponent' en la plantilla.
   * Proporciona acceso a sus métodos y propiedades.
   */
  @ViewChild('DatosDeLaComponent', { static: false }) datosDeLaComponent!: DatosDeLaComponent;

  /**
   * Identificador del procedimiento que se recibe como entrada desde el componente padre.
   * Este valor se utiliza para cargar datos específicos relacionados con el procedimiento,
   * como catálogos o listas asociadas.
   */
  public idProcedimiento: number = 260511;
  /**
   * Indica si se debe mostrar la sección de Aviso de Licencia
   */
  isAvisoLicenciaVisible: boolean = false;

  /**
   * Indica si se debe mostrar la sección de Aduanas de Entrada
   */
  isAduanasEntradaVisible: boolean = true;



  /**
   * Configuración de visibilidad utilizada para determinar qué elementos
   * deben ser visibles en el componente. Se inicializa con la configuración
   * predeterminada definida en `DEFAULT_CONFIGURACION_VISIBILIDAD`.
   */
  configuracionVisibilidad: ConfiguracionVisibilidad =
    DEFAULT_CONFIGURACION_VISIBILIDAD;
     /** Constructor que inicializa el store del trámite 260509. */
  constructor(
    private store: Tramite260511Store,
  ) {
    //
  }

  /** Actualiza la validez del formulario de datos del establecimiento en el store. */
  datosEstabelicimientoFormValidityChange(event: boolean): void {
    this.store.setFormValidity('datosEstablecimiento', event);
  }

  /** Actualiza la validez del formulario de domicilio del establecimiento en el store. */
  domicilioFormValidityChange(event: boolean): void {
    this.store.setFormValidity('domicilioEstablecimiento', event);
  }

  /** Actualiza la validez del formulario de manifiestos en el store. */
  manifiestosFormValidityChange(event: boolean): void {
    this.store.setFormValidity('manifiestos', event);
  }

  /** Actualiza la validez del formulario de representante legal en el store. */
  representanteLegalFormValidityChange(event: boolean): void {
    this.store.setFormValidity('representanteLegal', event);
  }

  /** Ejecuta la validación del formulario desde el componente de datos. */
  validarFormulario(): void {
    this.datosDeLaComponent?.validarClickDeBoton();
  }
}
