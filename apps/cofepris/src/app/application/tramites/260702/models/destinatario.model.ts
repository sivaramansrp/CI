import { CatalogosSelect } from '@libs/shared/data-access-user/src';

/**
 * Interfaz que representa los datos de un destinatario.
 */
export interface Destinatario {
  id: number;
  agregarDestinatario: {
 
  nombre: string;

  rfc: string;

  curp: string;

  telefono: string;

  correoElectronico: string;

  calle: string;

  numeroExterior: string;

  numeroInterior: string;

  pais: string;

  colonia: string;

  municipio: string;

  localidad: string;

  estado: string;

  estado2: string;
  codigo: string;
  domicilio: string;
  lada:string;
  primerApellido: string;
 segundoApellido: string;
 denominacion: string;

  }
}


