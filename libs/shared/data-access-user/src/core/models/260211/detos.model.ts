

export interface PermisoModel {
 Nombre : string;
  RFC :string;
  CURP :string;
  Teléfono:number;
  CorreoElectrónico:string;
  calle:string;
  numeroExterior:number;
  numeroInterior:number;
     pais:string;
     colonia:string;
     municipio:string;
     localidad:string;
     entidadFederativa:string;
     estadoLocalidad:string;
     codigoPostal:number;

}

export interface TablaDatos {
  /**
   * Datos de la fila representados por un arreglo de cadenas.
   *
   * @property {string[]} tbodyData - Datos de la fila que se mostrarán en la tabla.
   */
  tbodyData: string[];
}
  