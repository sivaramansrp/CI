export interface FilaData {
  id: number;
  claveScianG: {
    claveScian: string;
    descripcionDelScian: string;
  };
}
export interface FilaData2 {
    clasificaionProductos: string;
    especificarProducto: string;
    nombreProductoEspecifico: string;
  marca: string;
  tipoProducto: string;
  fraccionArancelaria: string;
  descripcionFraccionArancelaria: string;
  cantidadUMT: string;
  umt: string;
  cantidadUMC: string;
  umc: string;
  paisDeOrigen: string;
  paisDeProcedencia: string;
  usoEspecifico: string;
}
export interface FilaData3 {
  justification: string;
  denominacion: string;
  correoelectronico: string;
  codigopostal: string;
  estado: string;
  municipoyalcaldia: string;
  localidad: string;
  colonia: string;
  calle: string;
  lada: string;
  telefono: string;
  avisoDeFuncionamiento: string;
  licenciaSanitaria: string;
  regimenalque: string;
  aduana: string;
  rfc: string;
  legalRazonSocial: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}
export interface ListaClave {
  id: number;
  claveDeLosLotes: string;
  fechaDeFabricacion: string;
  fechaDeCaducidad: string;
}
