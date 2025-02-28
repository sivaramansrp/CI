export interface InfoRegistro {
    modalidad: string;
    folio: string;
    año: number;
  }

  export interface DatosSubcontratista {
    rfc: string;
    estado : string;
  }
  export interface SubfacrintaTablaModelo{
    calle :string,
    numExterior :number,
    numInterior :number,
    códigoPostal:number
    colonia :string
  }
  export interface SubManufacturerDatos{
    infoRegistro: InfoRegistro;
    datosSubcontratista: DatosSubcontratista;
  }
