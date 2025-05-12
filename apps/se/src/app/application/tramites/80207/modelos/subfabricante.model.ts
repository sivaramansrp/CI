/**
 * Representa la información de registro de un subfabricante.
 * 
 * @interface InfoRegistro
 * @property {string} modalidad - La modalidad del registro.
 * @property {string} folio - El folio asociado al registro.
 * @property {number} ano - El año del registro.
 */
export interface InfoRegistro {
    modalidad: string;
    folio: string;
    ano: number;
  }

  /**
   * Interfaz que representa los datos de un subcontratista.
   * 
   * @interface DatosSubcontratista
   * @property {string} rfc - El Registro Federal de Contribuyentes (RFC) del subcontratista.
   * @property {string} estado - El estado o región donde se encuentra el subcontratista.
   */
  export interface DatosSubcontratista {
    rfc: string;
    estado : string;
  }
  /**
   * Modelo que representa la dirección de un subfabricante.
   * 
   * @interface SubfabricanteDireccionModelo
   * @property {string} calle - Nombre de la calle.
   * @property {number} numExterior - Número exterior del domicilio.
   * @property {number} numInterior - Número interior del domicilio.
   * @property {number} codigoPostal - Código postal del domicilio.
   * @property {string} colonia - Nombre de la colonia.
   */
  export interface SubfabricanteDireccionModelo {
    calle :string,
    numExterior :number,
    numInterior :number,
    codigoPostal:number
    colonia :string
  }
  /**
   * Representa el estado del trámite 80207.
   * 
   * @interface Tramite80207State
   * 
   * @property {InfoRegistro} infoRegistro - Información del registro asociada al trámite.
   * @property {DatosSubcontratista} datosSubcontratista - Datos del subcontratista relacionados con el trámite.
   * @property {SubfabricanteDireccionModelo[]} plantasBuscadas - Lista de plantas buscadas para el subfabricante.
   * @property {SubfabricanteDireccionModelo[]} plantasSubfabricantesAgregar - Lista de plantas de subfabricantes que se agregarán.
   * @property {Object} formaValida - Validación de la forma.
   * @property {boolean} formaValida.esDatosSubcontratistaValido - Indica si los datos del subcontratista son válidos.
   */
  export interface Tramite80207State{
    infoRegistro: InfoRegistro;
    datosSubcontratista: DatosSubcontratista;
    plantasBuscadas:SubfabricanteDireccionModelo[],
    plantasSubfabricantesAgregar:SubfabricanteDireccionModelo[],
    
    formaValida: {
      esDatosSubcontratistaValido:boolean
    },
  }
