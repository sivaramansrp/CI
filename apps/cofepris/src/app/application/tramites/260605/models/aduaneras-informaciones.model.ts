export interface Represtantante {
    rfc: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
  }
  export interface AduanerasInformaciones {
    importPermitNumber: string;
    currentCustoms: string[];
    availableCustoms: string[];
    selectedCustoms: string[];
    technicalJustification: string;
  }
  export interface Aduana {
    id: number;
    name: string;
  }