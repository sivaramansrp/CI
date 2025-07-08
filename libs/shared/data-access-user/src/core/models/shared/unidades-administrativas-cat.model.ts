
/**
 * Interfaz que representa la respuesta del catálogo de Unidades Administrativas.
 */
export interface UnidadesAdministraticasCatResponse {
  /** Descripción de la unidad administrativa */
  descripcion: string;

  /** Clave única de la unidad administrativa */
  cve_unidad_administrativa: string;

  /** Código de la entidad en el sistema IDC */
  cod_entidad_idc: string;

  /** Clave de la entidad asociada a la unidad */
  cve_entidad: string;

  /** Identificador del tipo de unidad administrativa */
  ide_tipo_unidad_administrativa: string;

  /** Identificador de la dirección a la que pertenece */
  id_direccion: string;

  /** Fecha de inicio de la vigencia de la unidad (formato ISO o `YYYY-MM-DD`) */
  fec_ini_vigencia: string;

  /** Nombre completo de la unidad administrativa */
  nombre: string;

  /** Acrónimo o abreviatura de la unidad */
  acronimo: string;

  /** Fecha de fin de la vigencia de la unidad (si aplica) */
  fec_fin_vigencia: string;

  /** Clave de la unidad administrativa responsable o relacionada */
  cve_unidad_administrativa_r: string;

  /** Indicador de si la unidad se encuentra en zona fronteriza ('S' o 'N') */
  fronteriza: string;

  /** Identificador de la dependencia a la que pertenece la unidad */
  id_dependencia: string;

  /** Nivel jerárquico o administrativo de la unidad */
  nivel: string;

  /** Indicador de si la unidad está activa ('S' o 'N') */
  activo: string;
}

