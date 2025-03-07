export interface InfoRegistro {
    modalidad: string;
    folio: string;
    ano: number;
  }

  export interface DatosSubcontratista {
    rfc: string;
    estado : string;
  }
  export interface SubfabricanteDireccionModelo {
    calle :string,
    numExterior :number,
    numInterior :number,
    codigoPostal:number
    colonia :string
  }
  export interface Tramite80207State{
    infoRegistro: InfoRegistro;
    datosSubcontratista: DatosSubcontratista;
    plantasBuscadas:SubfabricanteDireccionModelo[],
    plantasSubfabricantesAgregar:SubfabricanteDireccionModelo[],
    
    formaValida: {
      esDatosSubcontratistaValido:boolean
    },
  }
