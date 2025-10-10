import { Injectable } from '@angular/core';

import { ModeloConfig, ServiceConfig } from '../models/service-config.model';
import { TramiteConfig } from '../models/tramite-config.model';


@Injectable({
  providedIn: 'root'
})

/**
 * Servicio que centraliza la configuración por trámite.
 * 
 * Permite obtener tanto la configuración de la UI como la de servicios
 * en base al identificador del trámite (`tramiteId`).
 */
export class TramiteConfigService {

  /**
   * Configuración de interfaz de usuario por trámite.
   * 
   * La clave corresponde al `tramiteId`.
   */
  private configs: Record<number, TramiteConfig> = {
    130118: { habilitarFechas: true, isAntecedentes: false, anexo222se: true },
    120301: { habilitarFechas: false, isAntecedentes: false, anexo222se: false },
    110101: { habilitarFechas: false, isAntecedentes: false, anexo222se: false , descargaSolicitud: true},
  };

  /**
   * Obtiene la configuración de interfaz de usuario para un trámite.
   * 
   * @param tramiteId Identificador del trámite
   * @returns Configuración de UI del trámite correspondiente
   */
  getConfig(tramiteId: number): TramiteConfig {
    return this.configs[tramiteId];
  }

  /**
   * Configuración de servicios por trámite.
   * 
   * La clave corresponde al `tramiteId`.
   */
  private serviceConfig: Record<number, ServiceConfig> = {
    130118: { serviceCriterios: true },
    120301: { serviceCriterios: false },
    110101: { serviceCriterios: false },
  }

  /**
  * Obtiene la configuración de servicios para un trámite.
  * 
  * @param tramiteId Identificador del trámite
  * @returns Configuración de servicios del trámite correspondiente
  */
  getServiceConfig(tramiteId: number): ServiceConfig {
    return this.serviceConfig[tramiteId];
  }

  
  /**
   * Configuración de modelos por trámite.
   * 
   * Cada entrada indica si se debe actualizar el modelo para un trámite específico.
   * La clave es el `tramiteId` y el valor indica la propiedad `actualiarModelo`.
   */
  private actualizarModeloConfig: Record<number, ModeloConfig> = {
    130118: { actualizarModelo: false, actualizarVista: false },
    120301: { actualizarModelo: false, actualizarVista: false },
    110101: { actualizarModelo: true, actualizarVista: true },
  }

   /**
  * Obtiene la configuración de servicios para un trámite.
  * 
  * @param tramiteId Identificador del trámite
  * @returns La configuración del modelo asociada al trámite.
  */
  getModeloConfig(tramiteId: number): ModeloConfig {
    return this.actualizarModeloConfig[tramiteId];
  }
}
