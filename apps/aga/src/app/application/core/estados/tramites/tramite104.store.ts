import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * **Estado del formulario**
 *
 * Representa la estructura del estado para los formularios de fomento a la exportación y dirección.
 */
export interface FormularioState {
  /** Datos del formulario de fomento a la exportación */
  fomentoExportacion: {
    tipoPrograma: string;
    folioAutorizacion: string;
  };

  /** Datos del formulario de dirección */
  direccion: {
    calle: string;
    numeroExterior: string;
    numeroInterior?: string;
    pais: string;
    entidadFederativa: string;
    municipioDelegacion: string;
    colonia: string;
    localidad: string;
    codigoPostal: string;
  };
}

/**
 * **Función para crear el estado inicial del formulario**
 *
 * @returns {FormularioState} Estado inicial del formulario con valores vacíos.
 */
export function createFormularioInitialState(): FormularioState {
  return {
    fomentoExportacion: {
      tipoPrograma: '',
      folioAutorizacion: '',
    },
    direccion: {
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      pais: '',
      entidadFederativa: '',
      municipioDelegacion: '',
      colonia: '',
      localidad: '',
      codigoPostal: '',
    },
  };
}

/**
 * **Store para gestionar el estado de los formularios**
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'formulario', resettable: true })
export class FormularioStore extends Store<FormularioState> {
  constructor() {
    super(createFormularioInitialState());
  }

  /**
   * **Actualiza el formulario de fomento a la exportación**
   * @param datos - Datos a actualizar en el estado.
   */
  public setFomentoExportacion(datos: FormularioState['fomentoExportacion']): void {
    this.update((state) => ({
      ...state,
      fomentoExportacion: datos,
    }));
  }

  /**
   * **Actualiza el formulario de dirección**
   * @param datos - Datos a actualizar en el estado.
   */
  public setDireccion(datos: FormularioState['direccion']): void {
    this.update((state) => ({
      ...state,
      direccion: datos,
    }));
  }

  /**
   * **Limpia el estado del formulario**
   */
  public limpiarFormulario(): void {
    this.reset();
  }
}
