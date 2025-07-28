/**
 * Representa la estructura de una solicitud de cancelación
 * para un trámite de certificado de origen u operación relacionada.
 */
export interface Cancelacion {
  
  /**
   * Identificador único del trámite que se desea cancelar.
   * Este folio es generado por el sistema durante el registro del trámite original.
   */
  folioTramite: string;

  /**
   * Tipo de solicitud de cancelación, por ejemplo:
   * - Cancelación total
   * - Cancelación parcial
   * - Modificación
   */
  tipoDeSolicitud: string;

  /**
   * Régimen aduanero bajo el cual fue registrada la mercancía originalmente.
   * Ejemplo: "Temporal", "Definitivo".
   */
  regimen: string;

  /**
   * Clave del Centro de Documentación y Registro (CDR) que autorizó
   * o está relacionado con el trámite.
   */
  cdr: string;

  /**
   * Estado o condición actual de la mercancía al momento de solicitar la cancelación.
   * Ejemplo: "Dañada", "Extraviada", "No exportada".
   */
  condicionDeLaMercancia: string;

  /**
   * Clave de la fracción arancelaria (según la Tarifa de la Ley de los Impuestos Generales de Importación y Exportación)
   * correspondiente a la mercancía.
   */
  fraccionArancelaria: string;

  /**
   * Unidad de Medida de Tráfico (UMT) empleada para cuantificar la mercancía.
   * Ejemplo: "kg", "lt", "pieza".
   */
  umt: string;

  /**
   * Cantidad de mercancía involucrada en la solicitud de cancelación,
   * expresada en la unidad definida por `umt`.
   */
  cantidad: string;

  /**
   * Valor de la mercancía en dólares estadounidenses (USD),
   * para fines estadísticos y de control.
   */
  usd: string;
}

/**
 * Representa los datos relacionados con los permisos necesarios
 * para llevar a cabo la cancelación de una o varias solicitudes.
 *
 * Esta interfaz se utiliza como contenedor para agrupar un conjunto
 * de cancelaciones junto con un motivo justificado de cancelación.
 */
export interface PermisosDatos {

  /**
   * Lista de objetos que representan cada una de las solicitudes a cancelar.
   * Cada elemento contiene información detallada como folio, régimen, fracción arancelaria,
   * cantidad, valor en USD, entre otros.
   */
  datos: Cancelacion[];

  /**
   * (Opcional) Justificación o razón por la cual se solicita la cancelación.
   * Este campo puede ser utilizado para análisis posteriores o auditoría.
   * 
   * Ejemplos:
   * - "Error en los datos capturados"
   * - "Duplicidad de solicitud"
   * - "Cambio de condiciones comerciales"
   */
  motivoCancelacion?: string;
}

/**
 * Función para crear el estado inicial de los datos de permiso.
 * Esta función crea y devuelve un objeto de tipo PermisosDatos, 
 * con los datos de tipo Cancelacion proporcionados en el parámetro 
 * de entrada. Si no se pasan parámetros, se asigna un array vacío 
 * por defecto.
 * 
 * @param params Parámetros opcionales para personalizar el estado 
 * inicial de los datos. Debe ser de tipo Partial<PermisosDatos>, 
 * lo que significa que es posible no proporcionar todos los campos.
 * @returns Un objeto de tipo PermisosDatos con el campo 'datos' 
 * actualizado con los valores proporcionados o un array vacío por defecto.
 */

export function createDatosState(params: Partial<PermisosDatos> = {}): PermisosDatos {
    return {
        datos: params as Cancelacion[],
        motivoCancelacion: params.motivoCancelacion || '',
    }
}
