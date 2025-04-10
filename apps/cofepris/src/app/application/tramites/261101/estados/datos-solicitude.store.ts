import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns DatosProcedureState
 */
export interface DatosProcedureState {
  /**
 * Object containing the prorroga property.
 */
  prorrogaData: {
    /**
     * The prorroga property.
     * @type {string}
     */
    prorroga: string;
    Justificacion: string;
    Denominacion: string;
    Codigo: string;
    Estado:string
    Municipio: string;
    Localidad: string;
    Colonia: string;
    Calle: string;
    Correo: string;
    Sanitario: string;
    Lada: string;
    Telefono: string;
    Funcionamiento:string;
    Licencia:string;
  };
}

export function createInitialState(): DatosProcedureState {
  return {
    prorrogaData: {
      prorroga: '',
      Justificacion: '',
      Denominacion: '',
      Codigo: '',
      Estado:'',
      Municipio: '',
      Localidad: '',
      Colonia: '',
      Calle: '',
      Correo: '',
      Sanitario: '',
      Lada: '',
      Telefono: '',
      Funcionamiento:'',
      Licencia:'',
    }
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'datosProcedure', resettable: true })
export class DatosProcedureStore extends Store<DatosProcedureState> {
  constructor() {
    super(createInitialState());
  }
  /**
   * Updates the prorroga property in the state.
   * @param {string} prorroga - The new value for prorroga.
   */
  public setProrroga(prorroga: string): void {
    this.update((state) => ({
      ...state,
      prorrogaData: {
        ...state.prorrogaData,
        prorroga: prorroga
      }
    }));
  }

  /**
 * Updates the prorroga property in the state.
 * @param {string} Justificacion - The new value for prorroga.
 */
  public setJustificacion(Justificacion: string): void {
    this.update((state) => ({
      ...state,
      prorrogaData: {
        ...state.prorrogaData,
        Justificacion: Justificacion
      }
    }));
  }

  /**
* Updates the prorroga property in the state.
* @param {string} Denominacion - The new value for prorroga.
*/
  public setDenominacion(Denominacion: string): void {
    this.update((state) => ({
      ...state,
      prorrogaData: {
        ...state.prorrogaData,
        Denominacion: Denominacion
      }
    }));
  }

  /**
* Updates the prorroga property in the state.
* @param {string} codigo - The new value for prorroga.
*/
  public setCodigo(Codigo: string): void {
    this.update((state) => ({
      ...state,
      prorrogaData: {
        ...state.prorrogaData,
        Codigo: Codigo
      }
    }));
  }

  /**
* Updates the prorroga property in the state.
* @param {string} Estado - The new value for prorroga.
*/
  public setEstado(Estado: string): void {
    this.update((state) => ({
      ...state,
      prorrogaData: {
        ...state.prorrogaData,
        Estado: Estado
      }
    }));
  }

    /**
* Updates the prorroga property in the state.
* @param {string} Municipio - The new value for prorroga.
*/
public setMunicipio(Municipio: string): void {
  this.update((state) => ({
    ...state,
    prorrogaData: {
      ...state.prorrogaData,
      Municipio: Municipio
    }
  }));
}

    /**
* Updates the prorroga property in the state.
* @param {string} Localidad - The new value for prorroga.
*/
public setLocalidad(Localidad: string): void {
  this.update((state) => ({
    ...state,
    prorrogaData: {
      ...state.prorrogaData,
      Localidad: Localidad
    }
  }));
}
    /**
* Updates the prorroga property in the state.
* @param {string} Colonia - The new value for prorroga.
*/
public setColonia(Colonia: string): void {
  this.update((state) => ({
    ...state,
    prorrogaData: {
      ...state.prorrogaData,
      Colonia: Colonia
    }
  }));
}

    /**
* Updates the prorroga property in the state.
* @param {string} Calle - The new value for prorroga.
*/
public setCalle(Calle: string): void {
  this.update((state) => ({
    ...state,
    prorrogaData: {
      ...state.prorrogaData,
      Calle: Calle
    }
  }));
}

    /**
* Updates the prorroga property in the state.
* @param {string} Correo - The new value for prorroga.
*/
public setCorreo(Correo: string): void {
  this.update((state) => ({
    ...state,
    prorrogaData: {
      ...state.prorrogaData,
      Correo: Correo
    }
  }));
}



    /**
* Updates the prorroga property in the state.
* @param {string} Sanitario - The new value for prorroga.
*/
public setSanitario(Sanitario: string): void {
  this.update((state) => ({
    ...state,
    prorrogaData: {
      ...state.prorrogaData,
      Sanitario: Sanitario
    }
  }));
}


    /**
* Updates the prorroga property in the state.
* @param {string} Lada - The new value for prorroga.
*/
public setLada(Lada: string): void {
  this.update((state) => ({
    ...state,
    prorrogaData: {
      ...state.prorrogaData,
      Lada: Lada
    }
  }));
}
    /**
* Updates the prorroga property in the state.
* @param {string} Telefono - The new value for prorroga.
*/
public setTelefono(Telefono: string): void {
  this.update((state) => ({
    ...state,
    prorrogaData: {
      ...state.prorrogaData,
      Telefono: Telefono
    }
  }));
}

    /**
* Updates the prorroga property in the state.
* @param {string} Funcionamiento - The new value for prorroga.
*/
public setFuncionamiento(Funcionamiento: string): void {
  this.update((state) => ({
    ...state,
    prorrogaData: {
      ...state.prorrogaData,
      Funcionamiento: Funcionamiento
    }
  }));
}
    /**
* Updates the prorroga property in the state.
* @param {string} Licencia - The new value for prorroga.
*/
public setLicencia(Licencia: string): void {
  this.update((state) => ({
    ...state,
    prorrogaData: {
      ...state.prorrogaData,
      Licencia: Licencia
    }
  }));
}
}

