export interface DatosMercancia {
    fraccionArancelaria: string;
    descripcionFraccion: string;
    unico: string;
    nicoDescripcion: string;
    cantidadInUMT: number;
    unidadDeMedidaRate: string;
    totalDeUMT: number;
    saldoAbierto: number;
    selected?: boolean;
  }
  
  export interface CarroFerrocarril {
    idInspeccionFisica: number,
    numeroAutorizacion: string,
    numeroPartidaMercancia: string,
    numeroTotalCarros: number
  }
  
  export interface InspeccionFisica {
    numeroPartidaMercancia: string;
    fraccionArancelaria: string;
    nico: string;
    cantidadUmt: string;
    cantidadInspeccion: string;
    saldoPendiente: string;
    fechaInspeccionString: string;
  }