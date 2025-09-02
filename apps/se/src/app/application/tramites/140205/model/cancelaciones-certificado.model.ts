/**
 * Representa los datos de un Grupo de Empresa.
 *
 * @interface GrupoEmpresa
 */
export interface GrupoEmpresa {
  /** RFC (Registro Federal de Contribuyentes) de la empresa. */
  rfc: string;

  /** Nombre de la empresa. */
  nombre: string;

  /** Primer apellido del representante legal de la empresa. */
  primerApellido: string;

  /** Segundo apellido del representante legal de la empresa. */
  segundoApellido: string;

  /** Actividad económica principal de la empresa. */
  actividadEconomica: string;

  /** Información adicional asociada al RFC. */
  datosRfc: string;

  /** Clave de identificación interna de la empresa. */
  clave: string;

  /** Correo electrónico de contacto de la empresa. */
  correo: string;

  /** Nombre de la calle de la dirección fiscal. */
  calle: string;

  /** Número exterior de la dirección de la empresa. */
  numeroExterior: string;

  /** Número interior de la dirección de la empresa. */
  numeroInterior: string;

  /** Código postal correspondiente a la dirección. */
  codigoPostal: string;

  /** Colonia de la dirección de la empresa. */
  colonia: string;

  /** País donde se encuentra ubicada la empresa. */
  pais: string;

  /** Estado o entidad federativa donde se ubica la empresa. */
  estado: string;

  /** Localidad correspondiente a la dirección de la empresa. */
  localidad: string;

  /** Teléfono de contacto de la empresa. */
  telefono: string;

  /** Municipio o alcaldía donde se encuentra la empresa. */
  municipio: string;
}

/**
 * Representa los datos de un GrupoCupo.
 */
/**
 * Representa los datos de un Grupo de Cupo.
 *
 * @interface GrupoCupo
 */
export interface GrupoCupo {
  /** Identificador aduanero asociado al cupo. */
  aduanero: string;

  /** Mecanismo de asignación del cupo. */
  mecanismo: string;

  /** Tratado comercial asociado al cupo. */
  tratado: string;

  /** Nombre del producto principal dentro del cupo. */
  nombreProducto: string;

  /** Nombre del subproducto relacionado al cupo. */
  nombreSubproducto: string;

  /** Indicador federal relacionado con el cupo. */
  federal: string;
}

/**
 * Representa los datos de un GrupoDatalleCupo.
 */
/**
 * Representa los detalles de un cupo.
 *
 * @interface GrupoDatalleCupo
 */
export interface GrupoDatalleCupo {
  /** Identificador aduanero del cupo. */
  aduanero: string;

  /** Clasificación del subproducto asociado al cupo. */
  clasificacionSubproducto: string;

  /** Descripción del producto incluido en el cupo. */
  descripcionProducto: string;

  /** Unidad de medida del producto o subproducto. */
  unidad: string;

  /** Mecanismo de asignación del cupo. */
  mecanismo: string;

  /** Tratado comercial aplicable al cupo. */
  tratado: string;

  /** Fracciones arancelarias relacionadas con el cupo. */
  arancelarias: string;

  /** Países a los que aplica el cupo. */
  paises: string;

  /** Observaciones adicionales sobre el cupo. */
  observaciones: string;

  /** Fundamentos legales o normativos del cupo. */
  fundamentos: string;

  /** Fecha de finalización de la vigencia del cupo. */
  fin: string;

  /** Fecha de inicio de la vigencia del cupo. */
  inicio: string;
}

/**
 * Representa los datos de un GrupoFolio.
 */
/**
 * Representa los datos de un Grupo de Folio.
 *
 * @interface GrupoFolio
 */
export interface GrupoFolio {
  /** Monto total asignado al folio. */
  montoAsignado: string;

  /** Monto aún disponible en el folio. */
  montoDisponible: string;

  /** Monto ya expedido del folio. */
  montoExpedido: string;
}

/**
 * Representa una acción asociada a un botón.
 *
 * @interface AccionBoton
 */
export interface AccionBoton {
  /** Nombre o tipo de la acción que ejecuta el botón. */
  accion: string;

  /** Valor numérico asociado a la acción. */
  valor: number;
}

/**
 * Representa un botón en la interfaz de usuario.
 */
/**
 * Representa un elemento de catálogo.
 *
 * @interface Catalogo
 */
export interface Catalogo {
  /** Identificador único del catálogo. */
  id: number;

  /** Descripción del elemento del catálogo. */
  descripcion: string;
}

/**
 * Representa una lista de catálogos.
 *
 * @interface CatalogoLista
 */
export interface CatalogoLista {
  /** Arreglo que contiene los elementos del catálogo. */
  datos: Catalogo[];
}

/**
 * Representa un registro dentro de la tabla de cupos.
 *
 * @interface CuposTabla
 */
export interface CuposTabla {
  /** Identificador del cupo. */
  cupo: string;

  /** Nombre del producto asociado al cupo. */
  nombreProducto: string;

  /** Nombre del subproducto relacionado con el cupo. */
  nombreSubproducto: string;

  /** Mecanismo de asignación aplicado al cupo. */
  mecanismoAsignacion: string;

  /** Tipo de cupo asignado. */
  tipoCupo: string;
}

/**
 * Representa un registro dentro de la tabla de disponibles.
 *
 * @interface DisponsiblesTabla
 */
export interface DisponsiblesTabla {
  /** Folio asignado al registro disponible. */
  folio: string;

  /** Nombre asociado al registro disponible. */
  nombre: string;

  /** Estado actual del registro disponible. */
  estado: string;

  /** Nombre del fabricante relacionado al registro. */
  fabricante: string;
}

/**
 * Representa una colección de registros de la tabla de disponibles.
 *
 * @interface DisponsiblesTablaDatos
 */
export interface DisponsiblesTablaDatos {
  /** Lista de registros disponibles. */
  datos: DisponsiblesTabla[];
}

/**
 * Representa una colección de registros de la tabla de cupos.
 *
 * @interface CuposTablaDatos
 */
export interface CuposTablaDatos {
  /** Lista de registros de cupos. */
  datos: CuposTabla[];
}

/**
 * Representa la respuesta de una consulta de certificado de origen.
 *
 * @interface RespuestaConsulta
 */
export interface RespuestaConsulta {
  /** Indica si la consulta fue exitosa. */
  success: boolean;

  /** Datos devueltos como resultado de la consulta. */
  datos: ConsultaDatos;

  /** Mensaje informativo de la respuesta. */
  message: string;
}

/**
 * Representa los datos de la consulta de un certificado de origen.
 *
 * @interface ConsultaDatos
 */
export interface ConsultaDatos {
  /** Datos del grupo de folio asociados a la consulta. */
  GrupoFolio: GrupoFolio;

  /** Datos del grupo de empresa asociados a la consulta. */
  GrupoEmpresa: GrupoEmpresa;

  /** Datos del grupo de cupo asociados a la consulta. */
  GrupoCupo: GrupoCupo;

  /** Datos del detalle de cupo asociados a la consulta. */
  GrupoDatalleCupo: GrupoDatalleCupo;
}
