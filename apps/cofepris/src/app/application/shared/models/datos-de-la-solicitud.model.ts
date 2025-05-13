export interface PropietarioModel {
  NombredenominacionORazonSocial: string;
  rfc: string;
  curp: string;
  telefono: string;
  CorreoElectronico: string;
  calle:string;
  numeroExterior:string;
  numeroInterior:string;
  pais:string;
  colonia:string;
  municipioOAlcaldia:string;
  localidad:string;
  entidadFederativa:string;
  estadoLocalidad:string;
  codigoPostal:string;
}

export interface ScianModel {
  claveScian: string;
  descripcionScian: string;
}
export interface DatosDeLaProductoModel {
  tipoDeProducto: string;
  nombreEspecifico : string;
  cantidadOVolumen : string;
  unidadDeMedida: string;
  Presentacion: string;
  fraccionArancelaria: string;
  descripcionDeLaFraccion: string;
  unidadDeMedidaDeTarifa : string;
  cantidadUMT :string;
  envasePrimario: string;
  envaseSecundario: string;
  paisDeOrigen: string;
  paisDeProcedencia: string;
  paisDeDestino: string;
  usoEpecifico: string;
}
export interface Representante {
  rfc: string;
  curp: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  denominacionRazonSocial: string;
  pais: string;
  estadoLocalidad: string;
  municipioAlcaldia: string;
  localidad: string;
  codigoPostal: string;
  colonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  lada: string;
  telefono: string;
  correoElectronico: string;
}
export interface Manifiestistos {
  rfc: string;
  representanteNombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface PropietarioRadio {
  id: number;
  label: string; 
  value: string; 
}
export interface PropietarioTipoPersona {
  label: string;
  value: string;
}

export interface MercanciasTabla {
  code: number;
  data: MercanciasInfo[];
  message: string;
}

export interface MercanciasInfo {
  clasificacion: string;
  especificar: string;
  denominacionEspecifica: string;
  denominacionDistintiva: string;
  denominacionComun: string;
  formaFarmaceutica: string;
  estadoFisico: string;
  estadoFormaFarmaceutica:string;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  unidad: string;
  cantidadUMC: string;
  unidadUMT: string;
  cantidadUMT: string;
  presentacion: string;
  numeroRegistro: string;
  paisDeOrigen: string;
  paisDeProcedencia: string;
  tipoProducto: string;
  usoEspecifico: string;
}
export interface Asociados {
  id: number;
  folioTramite: string;
  tipoTramite: string;
  estatus:string;
  fechaAltaDeRegistro:string;
}