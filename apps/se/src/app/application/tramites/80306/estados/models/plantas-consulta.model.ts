 
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

   export interface ComplimentariaDatos {
    data: Complimentaria[];
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