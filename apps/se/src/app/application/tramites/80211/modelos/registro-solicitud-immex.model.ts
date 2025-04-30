/**
 * Define la estructura de los datos del formulario.
 * Contiene información básica como modalidad, folio y año.
 */
export interface FormularioDatos {
  /**
   * Modalidad del trámite.
   */
  modalidad: string;

  /**
   * Folio del trámite.
   */
  folio: string;

  /**
   * Año del trámite.
   */
  ano: string;
}

/**
 * Define la estructura de la respuesta para las plantas.
 * Contiene un código de respuesta, un mensaje y una lista de plantas.
 */
export interface RespuestaPlantas {
  /**
   * Código de respuesta.
   */
  code: number;

  /**
   * Mensaje de la respuesta.
   */
  message: string;

  /**
   * Lista de datos de las plantas.
   */
  datos: Plantas[];
}

/**
 * Define la estructura de los datos de una planta.
 * Contiene información como dirección, razón social y registro federal.
 */
export interface Plantas {
  /**
   * Identificador único de la planta.
   */
  id: number;

  /**
   * Calle donde se encuentra la planta.
   */
  calle: string;

  /**
   * Número exterior del domicilio de la planta.
   */
  numeroExterio: string;

  /**
   * Número interior del domicilio de la planta.
   */
  numeroInterio: string;

  /**
   * Código postal del domicilio de la planta.
   */
  codiogoPostal: string;

  /**
   * Colonia donde se encuentra la planta.
   */
  colonia: string;

  /**
   * Municipio donde se encuentra la planta.
   */
  municipio: string;

  /**
   * Entidad federativa donde se encuentra la planta.
   */
  entidadFederativa: string;

  /**
   * País donde se encuentra la planta.
   */
  pais: string;

  /**
   * Registro federal de la planta.
   */
  registroFederal: string;

  /**
   * Domicilio completo de la planta.
   */
  domicilio: string;

  /**
   * Razón social de la planta.
   */
  razon: string;
}