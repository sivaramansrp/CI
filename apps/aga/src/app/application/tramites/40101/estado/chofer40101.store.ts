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

export interface ChoferWithMetadata {
  data: DatosDelChoferNacional | ChoferesExtranjeros;
  status: 'new' | 'modified' | 'deleted' | 'unchanged';
  originalData?: DatosDelChoferNacional | ChoferesExtranjeros;
}

// The complete state for the 'chofer' feature
export interface Chofer40101State {
  driverInEdit: {
    nacional: Chofer | null;
    extranjero: Chofer | null;
    editingIndex: number | null;
    isNew: boolean;
  };
  selectedDriverType: DriverType;

  // Single arrays with metadata
  driversNacional: ChoferWithMetadata[];
  driversExtranjero: ChoferWithMetadata[];
}

export function createInitialState(): Chofer40101State {
  return {
    driverInEdit: {
      nacional: null,
      extranjero: null,
      editingIndex: null,
      isNew: false,
    },
    selectedDriverType: 'nacional',
    driversNacional: [],
    driversExtranjero: [],
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

  // Add driver
  addDriver(type: DriverType, driver: DatosDelChoferNacional | ChoferesExtranjeros): void {
    const arrayKey = type === 'nacional' ? 'driversNacional' : 'driversExtranjero';
    this.update(state => ({
      [arrayKey]: [...(state[arrayKey] as ChoferWithMetadata[]), { data: driver, status: 'new', originalData: driver }]
    }));
  }

  // Update existing driver
  updateDriver(type: DriverType, index: number, driver: Partial<DatosDelChoferNacional | ChoferesExtranjeros>): void {
      const arrayKey = type === 'nacional' ? 'driversNacional' : 'driversExtranjero';
      this.update(state => {
      const drivers = [...(state[arrayKey] as ChoferWithMetadata[])];
      const existing = drivers[index];
      drivers[index] = {
      ...existing,
      data: { ...existing.data, ...driver },
      status: existing.status === 'new' ? 'new' : 'modified',
      originalData: existing.originalData || existing.data
      };
      return { [arrayKey]: drivers };
      });
      }

      // Mark driver as deleted (soft delete)
      deleteDriver(type: DriverType, index: number): void {
      const arrayKey = type === 'nacional' ? 'driversNacional' : 'driversExtranjero';
      this.update(state => {
      const drivers = [...(state[arrayKey] as ChoferWithMetadata[])];
      if (drivers[index].status === 'new') {
      // Remove completely if it was never saved
      drivers.splice(index, 1);
      } else {
      // Mark as deleted if it exists in backend
      drivers[index] = { ...drivers[index], status: 'deleted' };
      }
      return { [arrayKey]: drivers };
      });
      }

      // Get only drivers that need to be sent to backend
      getDriversForSubmit(type: DriverType) {
      const state = this.getValue();
      const drivers = type === 'nacional' ? state.driversNacional : state.driversExtranjero;

      return {
      alta: drivers.filter(d => d.status === 'new').map(d => d.data),
      modification: drivers.filter(d => d.status === 'modified').map(d => d.data),
      retirada: drivers.filter(d => d.status === 'deleted').map(d => d.data)
      };
      }

  // Method to load initial drivers
  loadInitialDrivers(type: DriverType, drivers: (DatosDelChoferNacional | ChoferesExtranjeros)[]): void {
    const arrayKey = type === 'nacional' ? 'driversNacional' : 'driversExtranjero';
    const driversWithMetadata: ChoferWithMetadata[] = drivers.map(d => ({
      data: d,
      status: 'unchanged',
      originalData: d
    }));
    this.update({ [arrayKey]: driversWithMetadata });
  }

  clear(): void {
    this.reset();
  }
}