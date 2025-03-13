export interface Nacional {
  curp: string;
  nombre: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  paisCHN: string;
  estado: string;
  apellidoPaterno: string;
  apellidoMaternoCHN: string;
  rfc: string;
  gafete: string;
  vigenciagafete: string;
  entidadFederativaCHN: string;
  numerodelsegurosocial: string;
  nombres: string;

  delegacionCHN: string;
  coloniaCHN: string;
  paisOrigenCHN: string;
  ciudad: string;
}
export interface extranjero {
  curp: string;
  nombre: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  paisCHN: string;
  estado: string;
  apellidoPaterno: string;
  apellidoMaternoCHN: string;
  rfc: string;
  gafete: string;
  vigenciagafete: string;
  numerodelsegurosocial: string;
  entidadFederativaCHN: string;
}
export interface DatosDelVehículo {
  clave: string;
  descripcion: string;
}
export interface DatosDelVehículoPaisEmisor {
  clave1: number;
  descripcion2: string;
}
export interface VehiculoVEHs{
  clave: string;
  descripcion: string;
}
export interface VehiculoColor{
  clave: string;
  descripcion: string;
}
export interface Emisor2daPlaca{
  clave: string;
  descripcion: string;
}
export interface Catalogo {
  id: number;
  descripcion: string;
  clave?: string;
  tam?: string;
  dpi?: string;
}
