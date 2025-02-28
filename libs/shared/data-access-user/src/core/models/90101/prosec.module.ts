/**
 * Interface representing a step in the wizard.
 */
export interface LISTAPASOWIZARD {
  /** Index of the step */
  indice: number;
  /** Title of the step */
  titulo: string;
  /** Indicates if the step is active */
  activo: boolean;
  /** Indicates if the step is completed */
  completado: boolean;
}

/**
 * Interface representing an action button.
 */
export interface ACCIONBOTON {
  /** Action to be performed */
  accion: string;
  /** Value associated with the action */
  valor: number;
}

/**
 * Interface representing a plant.
 */
export interface plantas {
  /** Modality of the plant */
  modalidad: string;
  /** State where the plant is located */
  Estado: string;
  /** Federal representation of the plant */
  RepresentacionFederal: string;
  /** Productive activity of the plant */
  ActividadProductiva: string;
}

export interface filaPlantas {
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: number;
  colonia: string;
  municipioOAlcaldia: string;
}

export interface filaProductos {
  contribuyentes: string;
  razonSocial: string;
  Correo: string;
}

export interface filaSectors {
  sectorLista: string;
  sectorClave: string;
}

/**
 * Interface representing sectors and goods.
 */
export interface sectoresYMercancias {
  /** Sector of the goods */
  sector: string;
  /** Tariff fraction of the goods */
  Fraccion_arancelaria: string;
}

/**
 * Interface representing the final data list.
 */
export interface ListaDeDatosFinal {
  /** List of plants */
  plantas: plantas[];
  /** List of sectors and goods */
  sectoresYMercancias: sectoresYMercancias[];
}

/**
 * Function to create the state of the data.
 * @param params Partial parameters to initialize the state
 * @returns The initialized state
 */
export function createDatosState(params: Partial<ListaDeDatosFinal> = {}): ListaDeDatosFinal {
  return {
    plantas: params.plantas || [],
    sectoresYMercancias: params.sectoresYMercancias || [],
  };
}