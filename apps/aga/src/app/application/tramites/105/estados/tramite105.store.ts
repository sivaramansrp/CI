import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Catalogo {
  id: number;
  descripcion: string;
}
/**
 * Creacion del estado inicial para la interfaz de tramite 10301
 * @returns Solicitud10301
 */
export interface Solicitud105State {
  importacion:boolean;
  exportacion: boolean;
  depositoFiscalGas:boolean;
  depositoFiscalVehiculos: boolean;
  distribucionGas:string;
  serviciosTerceros:string;
  industriaAutomotriz:string;

  // Ubicación
  domicilio:boolean;
  ubicacion: boolean;

  // Inputs importación
  pais: Catalogo[] | null;
  codigoPostal: string | number | null;
  entidadFederativa: Catalogo[] | null;
  municipioDelegacion:Catalogo[] | null;
  localidad: string;
  colonia: Catalogo[] | null;
  entidadFederativaDos: string | null;
  calle: string;
  numeroExterior: string | number | null;
  numeroInterior: string | number | null;
  ubicacionDescripcion: string;
  aduana: Catalogo[] | null;
  fraccionarancelaria: Catalogo[] | null;
  procedimientoCargaDescarga: string;
  sistemasMedicionUbicacion: string ;
  motivoNoDespachoAduana: string;
  operaciones:Catalogo[] | null;
}

export function createInitialState(): Solicitud105State {
  return {
    importacion: false,
    exportacion: false,
    depositoFiscalGas: false,
    depositoFiscalVehiculos: false,
    distribucionGas: '',
    serviciosTerceros: '',
    industriaAutomotriz: '',
    domicilio: false,
    ubicacion: false,
    pais: null,
    codigoPostal: null,
    entidadFederativa: null,
    municipioDelegacion: null,
    localidad:'',
    colonia:null,
    entidadFederativaDos: null,
    calle: '',
    numeroExterior: null,
    numeroInterior: null,
    ubicacionDescripcion: '',
    aduana: null,
    fraccionarancelaria: null,
    procedimientoCargaDescarga: "",
    sistemasMedicionUbicacion: "",
    motivoNoDespachoAduana: "",
    operaciones:null
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite10301', resettable: true })
export class Tramite105Store extends Store<Solicitud105State> {
  constructor() {
    super(createInitialState());
  }

  /**
 * @method setImportacion
 * @description Actualiza el estado de importación.
 * @param {boolean} importacion - Valor de importación.
 */

  public setImportacion(importacion: boolean): void {
    this.update((state) => ({
      ...state,
      importacion,
    }));
  }

  
/**
 * @method setExportacion
 * @description Actualiza el estado de exportación.
 * @param {boolean} exportacion - Valor de exportación.
 */

  public setExportacion(exportacion: boolean): void {
    this.update((state) => ({
      ...state,
      exportacion,
    }));
  }

  /**
 * @method setDepositoFiscalGas
 * @description Actualiza el estado del depósito fiscal de gas.
 * @param {boolean} depositoFiscalGas - Valor del depósito fiscal de gas.
 */

  public setDepositoFiscalGas(depositoFiscalGas: boolean): void {
    this.update((state) => ({
      ...state,
      depositoFiscalGas,
    }));
  }

/**
 * @method setDepositoFiscalVehiculos
 * @description Actualiza el estado del depósito fiscal de vehículos.
 * @param {boolean} depositoFiscalVehiculos - Valor del depósito fiscal de vehículos.
 */

  public setDepositoFiscalVehiculos(depositoFiscalVehiculos: boolean): void {
    this.update((state) => ({
      ...state,
      depositoFiscalVehiculos,
    }));
  }

  /**
 * @method setDistribucionGas
 * @description Actualiza el valor de la distribución de gas.
 * @param {string} distribucionGas - Valor de la distribución de gas.
 */

  public setDistribucionGas(distribucionGas: string): void {
    this.update((state) => ({
      ...state,
      distribucionGas,
    }));
  }

/**
 * @method setServiciosTerceros
 * @description Actualiza el valor de los servicios de terceros.
 * @param {string} serviciosTerceros - Valor de los servicios de terceros.
 */

  public setServiciosTerceros(serviciosTerceros: string): void {
    this.update((state) => ({
      ...state,
      serviciosTerceros,
    }));
  }

/**
 * @method setIndustriaAutomotriz
 * @description Actualiza el estado de la industria automotriz.
 * @param {boolean} industriaAutomotriz - Valor de la industria automotriz.
 */

  public setIndustriaAutomotriz(industriaAutomotriz: string): void {
    this.update((state) => ({
      ...state,
      industriaAutomotriz,
    }));
  }

/**
 * @method setDomicilio
 * @description Actualiza el estado del domicilio.
 * @param {boolean} domicilio - Valor del domicilio.
 */

  public setDomicilio(domicilio: boolean): void {
    this.update((state) => ({
      ...state,
      domicilio,
    }));
  }

/**
 * @method setUbicacion
 * @description Actualiza el estado de la ubicación.
 * @param {boolean} ubicacion - Valor de la ubicación.
 */

  public setUbicacion(ubicacion: boolean): void {
    this.update((state) => ({
      ...state,
      ubicacion,
    }));
  }

  /**
 * @method setPais
 * @description Actualiza el valor del país.
 * @param {Catalogo[]} pais - Lista de países.
 */

  public setPais(pais: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  /**
 * @method setCodigoPostal
 * @description Actualiza el valor del código postal.
 * @param {string | number | null} codigoPostal - Valor del código postal.
 */

  public setCodigoPostal(codigoPostal: string | number | null): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  /**
 * @method setEntidadFederativa
 * @description Actualiza el valor de la entidad federativa.
 * @param {Catalogo[]} entidadFederativa - Lista de entidades federativas.
 */


  public setEntidadFederativa(entidadFederativa: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  /**
 * @method setMunicipioDelegacion
 * @description Actualiza el valor del municipio o delegación.
 * @param {Catalogo[]} municipioDelegacion - Lista de municipios o delegaciones.
 */

  public setMunicipioDelegacion(municipioDelegacion: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      municipioDelegacion,
    }));
  }

/**
 * @method setLocalidad
 * @description Actualiza el valor de la localidad.
 * @param {string} localidad - Valor de la localidad.
 */

  public setlocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

/**
 * @method setColonia
 * @description Actualiza el valor de la colonia.
 * @param {Catalogo[]} colonia - Lista de colonias.
 */

  public setColonia(colonia: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

/**
 * @method setEntidadFederativaDos
 * @description Actualiza el valor de la segunda entidad federativa.
 * @param {string | null} entidadFederativaDos - Valor de la segunda entidad federativa.
 */

  public setEntidadFederativaDos(entidadFederativaDos: string | null): void {
    this.update((state) => ({
      ...state,
      entidadFederativaDos,
    }));
  }

/**
 * @method setCalle
 * @description Actualiza el valor de la calle.
 * @param {string} calle - Valor de la calle.
 */

  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
 * @method setNumeroExterior
 * @description Actualiza el valor del número exterior.
 * @param {string | number | null} numeroExterior - Valor del número exterior.
 */

  public setNumeroExterior(numeroExterior: string | number | null): void {
    this.update((state) => ({
      ...state,
      numeroExterior,
    }));
  }

/**
 * @method setNumeroInterior
 * @description Actualiza el valor del número interior.
 * @param {string | number | null} numeroInterior - Valor del número interior.
 */

  public setNumeroInterior(numeroInterior: string | number | null): void {
    this.update((state) => ({
      ...state,
      numeroInterior,
    }));
  }

  /**
 * @method setUbicacionDescripcion
 * @description Actualiza la descripción de la ubicación.
 * @param {string} ubicacionDescripcion - Descripción de la ubicación.
 */

  public setUbicacionDescripcion(ubicacionDescripcion: string): void {
    this.update((state) => ({
      ...state,
      ubicacionDescripcion,
    }));
  }

/**
 * @method setAduana
 * @description Actualiza el valor de la aduana.
 * @param {Catalogo[]} aduana - Lista de aduanas.
 */

  public setAduana(aduana: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  /**
 * @method setFraccionarancelaria
 * @description Actualiza el valor de la fracción arancelaria.
 * @param {Catalogo[]} fraccionarancelaria - Lista de fracciones arancelarias.
 */

  public setFraccionarancelaria(fraccionarancelaria: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      fraccionarancelaria,
    }));
  }

  /**
 * @method setProcedimientoCargaDescarga
 * @description Actualiza el procedimiento de carga y descarga.
 * @param {string} procedimientoCargaDescarga - Valor del procedimiento de carga y descarga.
 */

  public setProcedimientoCargaDescarga(procedimientoCargaDescarga: string): void {
    this.update((state) => ({
      ...state,
      procedimientoCargaDescarga,
    }));
  }

  /**
 * @method setSistemasMedicionUbicacion
 * @description Actualiza los sistemas de medición de la ubicación.
 * @param {string} sistemasMedicionUbicacion - Valor de los sistemas de medición de la ubicación.
 */

  public setSistemasMedicionUbicacion(sistemasMedicionUbicacion: string): void {
    this.update((state) => ({
      ...state,
      sistemasMedicionUbicacion,
    }));
  }

  /**
 * @method setMotivoNoDespachoAduana
 * @description Actualiza el motivo por el cual no se realiza el despacho en la aduana.
 * @param {string} motivoNoDespachoAduana - Motivo del no despacho en la aduana.
 */

  public setMotivoNoDespachoAduana(motivoNoDespachoAduana: string): void {
    this.update((state) => ({
      ...state,
      motivoNoDespachoAduana,
    }));
  }

  /**
 * @method setOperaciones
 * @description Actualiza el valor de las operaciones.
 * @param {Catalogo[]} operaciones - Lista de operaciones.
 */

  public setOperaciones(operaciones: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      operaciones,
    }));
  }
}
