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