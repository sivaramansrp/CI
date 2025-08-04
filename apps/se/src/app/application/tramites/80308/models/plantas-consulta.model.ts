 
  export interface DomicilioInfo {
    id?: number;
    calle?: string; // Calle de la dirección
    numeroExterior?: string; // Número exterior de la dirección
    numeroInterior?: string; // Número interior de la dirección
    codigoPostal?: string; // Código postal
    localidad?: string; // Localidad
    colonia?: string; // Colonia
    delegacionMunicipio?: string; // Delegación o municipio
    entidadFederativa?: string; // Entidad federativa
    pais?: string; // País
    telefono?: string; // Teléfono
    idPlanta?: string; // ID de la planta (como cadena de texto)
    idSolicitud?: string; // Opcional, ya que puede estar indefinido (id de la solicitud)
    razonSocial?: string; // Razón social
    desEstatus?: 'Baja' | 'Activada'; // Valor fijo que puede ser 'Baja' o 'Activada'
    estatus?: boolean; // Valor booleano para el estado
    rfc?: string
  }
  
  export interface Complimentaria {
    rfc?: string;
    nombre?: string;
    apellidoPrimer?: string;
    apellidoSegundo?: string;
  }

  export interface Federetarios {
    nombre?: string;
    apellidoPrimer?: string;
    apellidoSegundo?: string;
    numeroActa?: string;
    fetchActa?: string;
    numeroNotaria?: string;
    municipioDelegacion?: string;
    estado?: string;

  }

  export interface Operacions extends Complimentaria, Federetarios, DomicilioInfo {
    razonSocial?: string;
    fiscalSolicitante?: string;

    rfc?: string;
    nombre?: string;
    apellidoPrimer?: string;
    apellidoSegundo?: string;

    numeroActa?: string;
    fetchActa?: string;
    numeroNotaria?: string;
    municipioDelegacion?: string;
    estado?: string;

    id?: number;
    calle?: string; // Calle de la dirección
    numeroExterior?: string; // Número exterior de la dirección
    numeroInterior?: string; // Número interior de la dirección
    codigoPostal?: string; // Código postal
    localidad?: string; // Localidad
    colonia?: string; // Colonia
    delegacionMunicipio?: string; // Delegación o municipio
    entidadFederativa?: string; // Entidad federativa
    pais?: string; // País
    telefono?: string; // Teléfono
    idPlanta?: string; // ID de la planta (como cadena de texto)
    idSolicitud?: string; // Opcional, ya que puede estar indefinido (id de la solicitud)
    desEstatus?: 'Baja' | 'Activada'; // Valor fijo que puede ser 'Baja' o 'Activada'
    estatus?: boolean; // Valor booleano para el estado
  }

  export interface Bitacora {
    tipoModificion: string;
    fetchModificion: string;
    valoresAnteriores: string;
    valoresNuevos: string;
  }

  export interface Anexo {
    tipoFraccion?: string;
    fraccionArancelariaExportacion?: string;
    fraccionArancelariaImportacion?: string;
    descripcion?: string;
    valoresAnteriores?: string;
  }

  export interface DatosModificacion {
    
      rfc: string;
      representacionFederal: string;
      tipoModalidad: string;
      descripcionModalidad: string;
  
  }

  export interface FracciónArancelaria {
    id?: number;
    fraccionArancelariaFraccion?: string;
    cantidad?: string;
    valor?: string;
    unidadMedidaTarifaria?: string;
  }

  export interface DatosImmex {
    rfc?: string;
    domicilioFiscal?:string;
    calle?: string;
    numeroInterior?: string;
    numeroExterior?: string;
    codigoPostal?: string;
    colonia?: string;
    localidad?: string;
    entidadFederativa?: string;
    pais?: string;
    telefono?: string;
   
}

export interface DatosDelModificacion {
  id?: number;
  calle?: string;
  numeroExterior?: number;
  numeroInterior?: number;
  codigoPosta?: number;
  colonia?: string;
  municipioOAlcaldia?: string;
  entidadFederativa?: string;
  pais?: string;
  telefono?: string;
  desEstatus?: string;
}



export interface DatosDelServicios {
  id?: number;
  desEstatus?: string;
  descripcion?: string;
  tipoDeServicio?: string;
  testado?: string;
}

export interface DatosDelModificaciondos {
  id?: number;
  desEstatus?: string;
  descripcion?: string;
  tipoDeServicio?: string;
}