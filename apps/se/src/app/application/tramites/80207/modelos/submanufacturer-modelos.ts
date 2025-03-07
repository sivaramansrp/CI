export interface InfoRegistro {
    modalidad: string;
    folio: string;
    ano: number;
  }

  export interface DatosSubcontratista {
    rfc: string;
    estado : string;
  }
  export interface SubmanufacturerDireccionModelo {
    calle :string,
    numExterior :number,
    numInterior :number,
    codigoPostal:number
    colonia :string
  }
  export interface Tramite80207State{
    infoRegistro: InfoRegistro;
    datosSubcontratista: DatosSubcontratista;
    plantasBuscadas:SubmanufacturerDireccionModelo[],
    plantasSubfabricantesAgregar:SubmanufacturerDireccionModelo[],
    
    formaValida: {
      esDatosSubcontratistaValido:boolean
    },
  }
