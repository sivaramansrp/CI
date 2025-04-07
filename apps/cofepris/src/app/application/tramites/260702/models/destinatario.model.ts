import { CatalogosSelect } from '@libs/shared/data-access-user/src';

/**
 * Interfaz que representa los datos de un destinatario.
 */
export interface Destinatario {
 
 id: number
  nombre: string;

  rfc: string;

  curp: string;

  telefono: string;

  correoElectronico: string;
  tipoPersona: string;
  calle: string;

  numeroExterior: string;

  numeroInterior: string;

  pais: string;

  colonia: string;

  municipio: string;

  localidad: string;

  estado: string;

  estado2: string;
  codigopostal: string;
  domicilio: string;
  lada:string;
  primerApellido: string;
 segundoApellido: string;
 denominacion: string;

}
export interface TramitesAsociados{
    No: number,
    folioTramite: number;
    tipoTramite: string;
    estatus: string;
    fechaaltaderegistro: number;
}

export interface CrossListLable {
    /** Texto que aparece en la parte izquierda de la etiqueta. */
    tituluDeLaIzquierda: string;
  
    /** Texto que aparece en la parte derecha de la etiqueta. */
    derecha: string;
  }
  export interface CrossList {
    /** Etiquetas asociadas a la lista cruzada. */
    label: CrossListLable;
  
    /** Fechas asociadas con los datos de la lista cruzada. */
    fechas: string[];
  }
  export const FECHAINICIAL = {
    labelNombre: 'Fecha de fabricación',
    required: true,
    habilitado: true,
  };
  
  export const FECHAFINAL = {
    labelNombre: 'Fecha de caducidad',
    required: true,
    habilitado: true,
  };

