export interface InfoRegistro {
    modalidad: string;
    folio: string;
    ano: number;
  }

  export interface DatosSubcontratista {
    rfc: string;
    estado : string;
  }
  export interface SubfacrintaTablaModelo{
    calle :string,
    numExterior :number,
    numInterior :number,
    codigoPostal:number
    colonia :string
  }
  export interface SubManufacturerDatos{
    infoRegistro: InfoRegistro;
    datosSubcontratista: DatosSubcontratista;
  }
