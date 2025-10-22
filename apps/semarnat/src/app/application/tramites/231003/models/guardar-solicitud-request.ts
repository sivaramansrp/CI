import { Solicitante } from './cadena-original-request';

/**
 * Request para guardar una solicitud del trámite 231002.
 *
 * Contiene información del solicitante, empresa de reciclaje, destinatario,
 * transporte, aduana de salida y la lista de residuos asociados.
 */
export interface GuardarSolicitud231002Request {
  /** Identificador único de la solicitud. */
  id_solicitud: number;
  /** Número del programa IMMEX asociado a la solicitud. */
  numero_programa_immex: number;
  /** Valor discriminador para identificar el tipo de solicitud. */
  discriminator_value: number;
  /** Clave del rol del usuario que captura la solicitud. */
  cve_rol_capturista: string;
  /** Clave del usuario capturista. */
  cve_usuario_capturista: string;
  /** Campo booleano genérico para uso general. */
  boolean_generico: boolean;
  /** Número de registro ambiental asociado. */
  numero_registro_ambiental: number;
  /** Descripción genérica en formato CLOB 2. */
  descripcion_clob_generica2: number;
  /** Descripción genérica en formato CLOB 1. */
  descripcion_clob_generica1: string;
  /** Nombre o razón social de la empresa controladora. */
  empresa_controladora: number;
  /** Datos del solicitante que realiza la solicitud. */
  solicitante: Solicitante;
  /** Información de la empresa que realizará el reciclaje. */
  empresa_reciclaje: EmpresaReciclaje;
  /** Información del destinatario de los residuos. */
  destinatario: Destinatario;
  /** Información del transporte autorizado. */
  transporte: Transporte;
  /** Información de la aduana de salida. */
  aduana_salida: AduanaSalida;
  /** Lista de residuos peligrosos a exportar. */
  residuos: Residuos[];
}

/**
 * Información de la empresa de reciclaje.
 */
interface EmpresaReciclaje {
  /** Identificador único de la empresa. */
  id_empresa: number | null;
  /** Razón social de la empresa de reciclaje. */
  razon_social: string;
  /** Nombre comercial de la empresa. */
  nombre: string;
  /** Número telefónico de contacto. */
  telefono: string;
  /** Dirección de correo electrónico de contacto. */
  correo_electronico: string;
}

/**
 * Información del destinatario de los residuos.
 */
interface Destinatario {
  /** Razón social del destinatario. */
  razon_social: string;
  /** Nombre del destinatario. */
  pais: string;
  /** Número telefónico de contacto del destinatario. */
  domicilio: string;
  /** Dirección de correo electrónico del destinatario. */
  codigo_postal: string;
}

/**
 * Información del transporte autorizado para los residuos.
 */
interface Transporte {
  /** Razón social de la empresa de transporte. */
  razon_social: string;
  /** Número de autorización SEMARNAT para el transporte de residuos peligrosos. */
  autorizacion_semarnat_transporte: string;
}

/**
 * Información de la aduana de salida.
 */
interface AduanaSalida {
  /** Clave de la aduana de salida según el catálogo oficial. */
  clave: string;
}

/**
 * Representa un residuo peligroso dentro de la solicitud de exportación.
 */
interface Residuos {
  /** Valor booleano genérico 1. */
  boolean_generico_1: boolean;
  /** Descripción del valor booleano genérico 1. */
  desc_boolean_generico_1: string;
  /** Fracción arancelaria del residuo. */
  fraccion_arancelaria: string;
  /** Clave NICO (Nomenclatura de Identificación de Compuestos Orgánicos). */
  cve_nico: string;
  /** Descripción de la clave NICO. */
  desc_nico: string;
  /** Unidad de medida del residuo. */
  unidad_medida: string;
  /** Nombre de la unidad de medida. */
  unidad_medida_name: string;
  /** Capacidad del contenedor o envase. */
  capacidad: string;
  /** Nombre químico del residuo. */
  nombre_quimico: string;
  /** Nombre común del residuo. */
  nombre_residuo: string;
  /** Acotación o nota adicional sobre el residuo. */
  acotacion: string;
  /** Nombre específico del residuo peligroso según la normativa. */
  nombre_residuo_peligroso: string;
  /** Cantidad numérica del residuo. */
  cantidad: string;
  /** Cantidad expresada en letra. */
  cantidad_letra: string;
  /** Clave de clasificación del residuo peligroso. */
  cve_clasificacion: string;
  /** Nombre de la clasificación. */
  nombre_clasificacion: string;
  /** Descripción de la clasificación. */
  descripcion_clasificacion: string;
  /** Descripción de otra clasificación si aplica. */
  descripcion_otra_clasificacion: string;
  /** Código CRETI (Corrosivo, Reactivo, Explosivo, Tóxico, Inflamable). */
  creti: string;
  /** Estado físico del residuo (sólido, líquido, gaseoso). */
  estado_fisico: string;
  /** Descripción de otro estado físico si aplica. */
  descripcion_otro_estado_fisico: string;
  /** Número de manifiesto de entrega, transporte y recepción. */
  numero_manifiesto: string;
  /** Tipo de contenedor utilizado para el residuo. */
  tipo_contenedor: string;
  /** Descripción de otro tipo de contenedor si aplica. */
  descripcion_otro_contenedor: string;
  /** Nombre descriptivo de la fracción arancelaria. */
  fraccion_name: string;
  /** Nombre descriptivo de NICO. */
  nico_name: string;
  /** Descripción de la clave de clasificación. */
  clave_clasificacion_desc: string;
  /** Nombre alternativo de la clasificación. */
  name_clasificacion: string;
  /** Descripción alternativa de la clasificación. */
  desc_clasificacion: string;
  /** Descripción del código CRETI. */
  creti_desc: string;
  /** Descripción del estado físico. */
  estado_fisico_desc: string;
  /** Descripción del tipo de contenedor. */
  tipo_contenedor_desc: string;
  /** Descripción de otros aspectos del residuo. */
  descripcion_otro: string;
  /** Lista de materias primas relacionadas con el residuo. */
  materias_primas_relacionadas: MateriasPrimasRelacionadas[];
}

/**
 * Representa una materia prima relacionada con el residuo.
 */
interface MateriasPrimasRelacionadas {
  /** Identificador de la mercancía/materia prima. */
  id_mercancia: number | null;
  /** Descripción de la mercancía/materia prima. */
  descripcion_mercancia: string;
  /** Cantidad numérica de la materia prima. */
  cantidad: number;
  /** Cantidad expresada en letra. */
  cantidad_letra: string;
  /** Descripción de la unidad de medida comercial. */
  descripcion_umc: string;
  /** Clave de la fracción arancelaria. */
  cve_fraccion_arancelaria: string;
  /** Número de bitácora asociado. */
  numeroBitacora: string;
  /** Clave de la unidad de medida comercial. */
  unidadMedidaComercial: string;
  /** Clave de la fracción. */
  cveFraccion: number;
  /** Descripción de la fracción arancelaria. */
  descFraccion: string;
}
