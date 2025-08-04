export interface ScianDatos {
    clave: string,
    descripcion: string,
}


export interface MercanciasDatos {
  clasificacion?: string,
  especificar?: string,
  dci?: string,
  denominacion?: string,
  numero?: string,
  fraccion?: string,
  descripcionDeLa?: string,
  tipoDeProducto?: string,
  formaFarmaceutica?: string,
  umt?: string,
  umc?: string,
  numeroCas?: string,
  cantidad?: string,
  kg?: string,
  numeroFabricar?: string,
  descripcionFabricar?: string;
  registroSanitario?: string;
  uso?: string,
  detalle?: string,
  cantidadUmc?: string,
  cantidadUmt?: string
  dePiezas?: string,
  descripcionDePiezas?: string,
  numeroDeReg?: string,
  presentacion?: string,
  paisDeDestino?: string;
  paisDeOrigen?: string;
  paisDeProcedencia?: string;
}

export interface Fabricante {
  nombre: string,
  rfc: string,
  curp: string,
  telefono: string,
  correoElectronico: string,
  calle: string,
  numeroExterior: string,
  numeroInterior: string,
  pais: string,
  colonia: string,
  municipio: string,
  localidad: string,
  entidadFederativa: string,
  estado: string,
  cp: string,
}

export interface Otros {
  tercero: string,
  nombre: string,
  rfc: string,
  curp: string,
  telefono: string,
  correoElectronico: string,
  calle: string,
  numeroExterior: string,
  numeroInterior: string,
  pais: string,
  colonia: string,
  municipio: string,
  localidad: string,
  entidadFederativa: string,
  estado: string,
  cp: string,
}

/**
 * Modelo para representar los datos de terceros en el trámite 260303.
 * Incluye información personal, dirección, nacionalidad, tipo de persona y otros campos relacionados.
 */
export interface Otros260303 {
  tercero?: string,
  nombre?: string,
  rfc?: string,
  curp?: string,
  telefono?: string,
  correoElectronico?: string,
  calle?: string,
  numeroExterior?: string,
  numeroInterior?: string,
  pais?: string,
  colonia?: string,
  municipio?: string,
  localidad?: string,
  entidadFederativa?: string,
  estado?: string,
  cp?: string,
  denominacionSocial?: string,
  terceroNombre?: string,
  tercerosNacionalidad?: string,
  tipoPersona?: string,
  datosPersonalesNombre?: string,
  datosPersonalesPrimerApellido?: string,
  datosPersonalesSegundoApellido?: string,
  codigoPostal?: string,
  lada?: string
}