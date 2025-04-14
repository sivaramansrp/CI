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
    /**
     * The prorroga property.
     * @type {string}
     */
    ideGenerica1: string;
    observaciones: string;
    denominacion: string;
    codigo: string;
    estado:string
    municipio: string;
    localidad: string;
    colonia: string;
    calle: string;
    correo: string;
    sanitario: string;
    lada: string;
    telefono: string;
    funcionamiento:string;
    licencia:string;
    representanteLegalRFC:string;
    representanteLegalNombre:string;
    buscar:string;
    representanteLegalApPaterno:string;
    representanteLegalApMaterno:string;
    regimen:string;
    informacionConfidencial:string,
    aduanas:string
}

export function createInitialState(): DatosProcedureState {
  return {
      ideGenerica1: '',
      observaciones: '',
      denominacion: '',
      codigo: '',
      estado:'',
      municipio: '',
      localidad: '',
      colonia: '',
      calle: '',
      correo: '',
      sanitario: '',
      lada: '',
      telefono: '',
      funcionamiento:'',
      licencia:'',
      representanteLegalRFC:'',
      representanteLegalNombre:'',
      buscar:'',
      representanteLegalApPaterno:'',
      representanteLegalApMaterno:'',
      regimen:'',
      informacionConfidencial:'',
      aduanas:''
    }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'datosProcedure', resettable: true })
export class DatosProcedureStore extends Store<DatosProcedureState> {
  constructor() {
    super(createInitialState());
  }

  public establecerDatos(values: Partial<DatosProcedureState>): void {    
    this.update((state) => ({
      ...state,
      ...values,
    }));
  }
}