import { InjectionToken } from "@angular/core";
/**
 * Este token se utiliza para inyectar la configuración de la aplicación en el módulo de la aplicación.
 */
export interface AppConfig {
  // Define las propiedades de la configuración de tu aplicación aquí
  // Por ejemplo:
  apiUrl: string;
  featureFlag?: boolean;
}

export const APPINJECT = new InjectionToken<AppConfig>(
    'Sedena Application config'
  );