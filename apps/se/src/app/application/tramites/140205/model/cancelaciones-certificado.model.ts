/**
 * Representa los datos de un GrupoEmpresa.
 */
export interface GrupoEmpresa {
  rfc: string;
  nombre:string;
  primerApellido: string;
  segundoApellido: string;
  actividadEconomica: string;
  datosRfc: string;
  clave: string;
  correo: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  colonia: string;
  pais: string;
  estado: string;
  localidad: string;
  telefono: string;
  municipio: string;
}
/**
 * Representa los datos de un GrupoCupo.
 */ 
export interface GrupoCupo {
  aduanero: string;
  mecanismo: string;
  tratado: string;
  nombreProducto: string;
  nombreSubproducto: string;
  federal: string;
}
/**
 * Representa los datos de un GrupoDatalleCupo.
 */  
export interface GrupoDatalleCupo {
  aduanero: string;
  clasificacionSubproducto: string;
  descripcionProducto: string;
  unidad: string;
  mecanismo: string;
  tratado: string;
  arancelarias: string;
  paises: string;
  observaciones: string;
  fundamentos: string;
  fin: string;
  inicio: string;
 
}

/**
 * Representa los datos de un GrupoFolio.
 */
export interface GrupoFolio
{
  montoAsignado: string;
  montoDisponible: string;
  montoExpedido: string;
}



/**
 * Representa una acción de un botón.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}
/**
 * Representa un botón en la interfaz de usuario.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
}
/**
 * Representa una lista de CatalogoLista.
 */
export interface CatalogoLista {
  datos: Catalogo[];
}

/**
 * Representa los datos de la tabla de CuposTabla.
 */
export interface CuposTabla {
  cupo: string;                     
  nombreProducto: string;           
  nombreSubproducto: string;        
  mecanismoAsignacion: string;     
  tipoCupo: string;                 
}

/**
 * Representa los datos de la tabla de disponsiblesTabla.
 */
export interface disponsiblesTabla {

  folio:string;
  nombre:string;
  estado:string;
  fabricante:string;
}
/**
 * Representa los datos de la tabla de disponsiblesTablaDatos.
 */
export interface  disponsiblesTablaDatos{
datos: disponsiblesTabla[];
}


/**
 * Representa los datos de la tabla de CuposTablaDatos.
 */
export interface CuposTablaDatos {
   datos: CuposTabla[];
}