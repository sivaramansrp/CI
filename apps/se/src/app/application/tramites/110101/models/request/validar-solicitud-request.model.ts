/**
 * Modelo de request para el registro de cuestionario de tratados
 */
export interface RegistroCuestionarioRequest {
  /** RFC del solicitante */
  rfc: string;

  /** Clave de la entidad */
  clave_entidad: string;

  /** Clave de la entidad solicitante */
  clave_entidad_solicitante: string;

  /** Clave de la unidad administrativa */
  clave_unidad_admin: string;

  /** Lista de tratados agregados */
  tratados_agregados: TratadoAgregado[];

  /** Registro del cuestionario */
  registro_cuestionario: RegistroCuestionario;
}

/**
 * Modelo para tratado agregado
 */
export interface TratadoAgregado {
  /** Tratado o acuerdo */
  tratado_acuerdo: TratadoAcuerdo;

  /** Clave del grupo de criterio */
  cve_grupo_criterio: string;

  /** Clave del país */
  cve_pais: string;

  /** ID del bloque */
  id_bloque: number;

  /** Clave del bloque */
  cve_bloque: string;

  /** Nombre del país o bloque */
  nombre_pais_o_bloque: string;
}

/**
 * Modelo para tratado o acuerdo
 */
export interface TratadoAcuerdo {
  /** Clave del tratado o acuerdo */
  cve_tratado_acuerdo: string;

  /** ID del tratado o acuerdo */
  id_tratado_acuerdo: number;
}

/**
 * Modelo para registro del cuestionario
 */
export interface RegistroCuestionario {
  /** Indica si existe separación contable */
  separacion_contable: boolean;

  /** Indica si solicita exportador autorizado */
  solicita_exportador_autorizado: boolean;

  /** Condición del exportador autorizado */
  ide_condicion_exportador_autorizado: string;

  /** Indica si solicita exportador autorizado Japón */
  solicita_exportador_autorizado_jpn: boolean;

  /** Condición del exportador autorizado Japón */
  ide_condicion_exportador_autorizado_jpn: string;

  /** Datos de la mercancía */
  mercancia: Mercancia;
}

/**
 * Modelo para datos de la mercancía
 */
export interface Mercancia {
  /** Indica si requiere juegos o surtidos */
  requiere_juegos_o_surtidos: boolean;

  /** Indica si hay acumulación AP */
  acumulacion_ap: boolean;

  /** Tipo de método */
  ide_tipo_metodo: string;

  /** Tipo de método para mercancía Uruguay */
  ide_tipo_metodo_mercancia_uruguay: string;

  /** Tipo de método para mercancía Panamá */
  ide_tipo_metodo_mercancia_panama: string;

  /** Tipo de método para mercancía */
  ide_tipo_metodo_mercancia: string;

  /** Tipo de método para mercancía Alianza Pacífico */
  ide_tipo_metodo_mercancia_alianza_p: string;

  /** Tipo de proceso de mercancía */
  ide_tipo_proceso_mercancia: string;

  /** Nombre comercial */
  nombre_comercial: string;

  /** Lista de insumos */
  insumos: Insumo[];

  /** Lista de empaques */
  empaques: Empaque[];

  /** Procesos solicitados */
  procesos_solicitados: ProcesoSolicitado[];

  /** Clave de fracción */
  cve_fraccion: string;

  /** ID descripción alterna UE */
  id_descripcion_alterna_ue: number;

  /** ID descripción alterna AELC */
  id_descripcion_alterna_aelc: number;

  /** ID descripción alterna SGP */
  id_descripcion_alterna_sgp: number;

  /** ID descripción alterna ACE */
  id_descripcion_alterna_ace: number;

  /** Indica si el peso es requerido */
  peso_es_requerido: boolean;

  /** Indica si el volumen es requerido */
  volumen_es_requerido: boolean;

  /** Tipo de proceso de mercancía */
  tipo_proceso_mercancia: string;

  /** Valor transaccional FOB */
  valor_transaccional_fob: number;

  /** Valor de la transacción */
  valor_transaccion: number;

  /** Costo neto AP */
  costo_neto_ap: number;

  /** Costo neto */
  costo_neto: number;

  /** Costo unitario */
  costo_unitario: number;

  /** Precio franco fábrica */
  precio_franco_fabrica: number;

  /** Nombre en inglés */
  nombre_ingles: string;

  /** Descripción del juego */
  descripcion_juego: string;

  /** Cumple con reglas de juegos o surtidos */
  cumple_juegos_surtidos: boolean;

  /** Cumple juegos surtidos Perú */
  cumple_juegos_surtidos_peru: boolean;

  /** Cumple juegos surtidos Alianza Pacífico */
  cumple_juegos_surtidos_alianza_p: boolean;

  /** Cumple acumulación */
  cumple_acumulacion: boolean;

  /** Materiales intermedios */
  materiales_intermedios: boolean;

  /** Materiales fungibles */
  materiales_fungibles: boolean;

  /** Acumulación */
  acumulacion: boolean;

  /** Materiales intermedios Uruguay */
  materiales_intermedios_uruguay: boolean;

  /** Materiales fungibles Uruguay */
  materiales_fungibles_uruguay: boolean;

  /** Acumulación Uruguay */
  acumulacion_uruguay: boolean;

  /** Materiales intermedios Perú */
  materiales_intermedios_peru: boolean;

  /** Materiales fungibles Perú */
  materiales_fungibles_peru: boolean;

  /** Acumulación Perú */
  acumulacion_peru: boolean;

  /** Clave fracción NALADI */
  cve_fraccion_naladi: string;

  /** Clave fracción NALADISA 93 */
  cve_fraccion_naladisa93: string;

  /** Clave fracción NALADISA 96 */
  cve_fraccion_naladisa96: string;

  /** Clave fracción NALADISA 02 */
  cve_fraccion_naladisa02: string;

  /** Peso */
  peso: number;

  /** Volumen */
  volumen: number;
}

/**
 * Modelo para insumo
 */
export interface Insumo {
  /** Tipo de insumo */
  ide_tipo_insumo: string;

  /** Importe valor */
  importe_valor: number;

  /** Peso */
  peso: number;

  /** Volumen */
  volumen: number;

  /** Nombre del insumo */
  nombre: string;

  /** Descripción del proveedor */
  desc_proveedor: string;

  /** Descripción del fabricante o productor */
  desc_fabricante_productor: string;

  /** Clave fracción */
  cve_fraccion: string;

  /** Fracción arancelaria prevalidada */
  fraccion_arancelaria_prevalidada: boolean;

  /** Clave país */
  cve_pais: string;

  /** RFC fabricante/productor */
  rfc_fabricante_productor: string;

  /** Lista de tratados originarios */
  tratados_originarios: TratadoOriginario[];
}

/**
 * Modelo para empaque
 */
export interface Empaque {
  /** Tipo de insumo */
  ide_tipo_insumo: string;

  /** Importe valor */
  importe_valor: number;

  /** Peso */
  peso: number;

  /** Volumen */
  volumen: number;

  /** Nombre del empaque */
  nombre: string;

  /** Descripción del proveedor */
  desc_proveedor: string;

  /** Descripción del fabricante o productor */
  desc_fabricante_productor: string;

  /** Clave fracción */
  cve_fraccion: string;

  /** Fracción arancelaria prevalidada */
  fraccion_arancelaria_prevalidada: boolean;

  /** Clave país */
  cve_pais: string;

  /** RFC fabricante/productor */
  rfc_fabricante_productor: string;

  /** Lista de tratados originarios */
  tratados_originarios: TratadoOriginario[];
}

/**
 * Modelo para tratado originario
 */
export interface TratadoOriginario {
  /** Clave país */
  cve_pais: string;

  /** ID bloque */
  id_bloque: number;

  /** Clave bloque */
  cve_bloque: string;

  /** Clave tratado acuerdo */
  cve_tratado_acuerdo: string;
}

/**
 * Modelo para proceso solicitado
 */
export interface ProcesoSolicitado {
  /** ID del proceso CEROR */
  id_proceso_ceror: number;

  /** Cumple proceso */
  cumple_proceso: number;
}
