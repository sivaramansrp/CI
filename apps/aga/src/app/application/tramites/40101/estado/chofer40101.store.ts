import { ChoferesExtranjeros, DatosDelChoferNacional } from '../models/registro-muestras-mercancias.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

// Define the structure for a single driver, covering all possible fields.
export interface Chofer {
  curp?: string;
  rfc?: string;
  nombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  numeroDeGafete?: string;
  vigenciaGafete?: string;
  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  pais?: string | number;
  estado?: string;
  municipioAlcaldia?: string;
  colonia?: string;
  paisDeResidencia?: string;
  ciudad?: string;
  localidad?: string;
  codigoPostal?: string;
  correoElectronico?: string;
  telefono?: string;
  identificadorFiscal?: string;
  nacionalidad?: string;
  numeroDelSeguroSocial?: string;
}

export type DriverType = 'nacional' | 'extranjero';

// The complete state for the 'chofer' feature
export interface Chofer40101State {
  // For editing a single driver in the dialog
  driverInEdit: {
    nacional: Chofer;
    extranjero: Chofer;
  };
  selectedDriverType: DriverType;

  // For the lists of drivers to be sent in the transaction
  datosDelChoferNacionalAlta: DatosDelChoferNacional[];
  datosDelChoferNacionalModification: DatosDelChoferNacional[];
  datosDelChoferNacionalRetirada: DatosDelChoferNacional[];

  datosDelChoferExtranjerosAlta: ChoferesExtranjeros[];
  datosDelChoferExtranjerosModification: ChoferesExtranjeros[];
  datosDelChoferExtranjerosRetirada: ChoferesExtranjeros[];
}

export function createInitialState(): Chofer40101State {
  return {
    driverInEdit: {
      nacional: {},
      extranjero: {},
    },
    selectedDriverType: 'nacional',
    datosDelChoferNacionalAlta: [],
    datosDelChoferNacionalModification: [],
    datosDelChoferNacionalRetirada: [],
    datosDelChoferExtranjerosAlta: [],
    datosDelChoferExtranjerosModification: [],
    datosDelChoferExtranjerosRetirada: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'chofer40101', resettable: true })
export class Chofer40101Store extends Store<Chofer40101State> {
  constructor() {
    super(createInitialState());
  }

  /**
     * Updates the data for a specific driver type.
     * @param type The type of driver ('nacional' or 'extranjero').
     * @param driverData The partial data of the driver to update.
     */
  setDriver(type: DriverType, driverData: Partial<Chofer>): void {
    this.update(state => ({
      ...state,
      driverInEdit: {
        ...state.driverInEdit,
        [type]: { ...state.driverInEdit[type], ...driverData },
      },
    }));
  }

  /**
   * Sets the currently selected driver type.
   * @param type The driver type to select.
   */
  setSelectedDriverType(type: DriverType): void {
    this.update({ selectedDriverType: type });
  }

  updateDatosDelChoferNacional(data: DatosDelChoferNacional[]): void {
    this.update({ datosDelChoferNacionalAlta: data });
  }

  updateDatosDelChoferNacionalModification(data: DatosDelChoferNacional[]): void {
    this.update({ datosDelChoferNacionalModification: data });
  }

  updateDatosDelChoferNacionalRetirada(data: DatosDelChoferNacional[]): void {
    this.update({ datosDelChoferNacionalRetirada: data });
  }

  updateDatosDelChoferExtranjero(data: ChoferesExtranjeros[]): void {
    this.update({ datosDelChoferExtranjerosAlta: data });
  }

  updateDatosDelChoferExtranjeroModification(data: ChoferesExtranjeros[]): void {
    this.update({ datosDelChoferExtranjerosModification: data });
  }

  updateDatosDelChoferExtranjeroRetirada(data: ChoferesExtranjeros[]): void {
    this.update({ datosDelChoferExtranjerosRetirada: data });
  }

  clear(): void {
    this.reset();
  }
}
