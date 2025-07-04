import { Catalogo } from "@libs/shared/data-access-user/src";

export interface TercerosrelacionadosTable {
  exportadorNombre: string;
  exportadorTelefono: string;
  exportadorCorreo: string;
  exportadorDomicilio: string;
  exportadorPais: string;
}
export interface TercerosrelacionadosdestinoTable {
  tipoMercancia: string;
  nombre: string;
  primerApellido: string;
  segundoApellido?: string;
  razonSocial: string;
  pais: string;
  codigoPostal: string;
  estado: string;
  municipio?: string;
  colonia?: string;
  calle: string;
  numeroExterior: string;
  numeroInterior?: string;
  lada?: string;
  telefono?: string;
  correo?: string;
}

export interface DatosDeLaSolicitud{
  paises: Catalogo[];
  estados: Catalogo[];
}
