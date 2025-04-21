/**
 * Define la estructura de datos para representar un paso en un asistente (wizard).
 * Cada paso incluye su índice, título, estado de actividad y estado de completitud.
 * 
 * Índice numérico del paso dentro del asistente. 
 * Título descriptivo del paso.
 * Indica si el paso está actualmente activo y visible. 
 * Indica si el paso ha sido completado.
 */
export interface ListaPasosWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}

/**
 * Representa el estado de Pago de Derechos.
 * Esta interfaz se utiliza para el FormGroup del componente de pago de derechos.
 */
export interface PagoDerechosState {
  clave: string;
  dependencia: string;
  banco: string;
  llavePago: string;
  fecha: string;
  importePago: string;
}


/**
 * Interfaz que representa una fila en la tabla de materiales.
 *
 * @property {string} numeroCas - Número CAS del material.
 * @property {string} descripcionNoArancelaria - Descripción no arancelaria del material.
 * @property {string} nombreQuimico - Nombre químico o nomenclatura IUPAC del material.
 * @property {string} constanciaCisen - Constancia CISEN asociada al material.
 */
export interface TablaNumeroCasType {
  numeroCas: string;
  descripcionNoArancelaria: string;
  nombreQuimico: string;
  constanciaCisen: string;
}

/**
 * Interfaz que representa un componente de material con su porcentaje de concentración.
 *
 * @property {string} componente - Nombre del componente del material.
 * @property {number} porcentajeConcentracion - Porcentaje de concentración del componente.
 */
export interface ComposicionMaterial {
  componente: string;
  porcentajeConcentracion: number;
}

/**
 * Representa el tipo de formulario para los datos de una solicitud relacionada con materiales peligrosos.
 * 
 * @property tratadoRotterdam - Indica si el material está sujeto al Tratado de Rotterdam.
 * @property listadoNacional - Indica si el material está incluido en el listado nacional.
 * @property fraccionArancelaria - Fracción arancelaria del material.
 * @property descripcionFraccion - Descripción de la fracción arancelaria.
 * @property convenioMinamata - Indica si el material está sujeto al Convenio de Minamata.
 * @property numeroCas - Número CAS (Chemical Abstracts Service) del material.
 * @property descripcionNoArancelaria - Descripción no arancelaria del material.
 * @property nombreQuimico - Nombre químico del material.
 * @property nombreComun - Nombre común del material.
 * @property nombreComercial - Nombre comercial del material.
 * @property estadoFisico - Estado físico del material (sólido, líquido, gas, etc.).
 * @property cantidad - Cantidad del material (puede ser nulo si no se especifica).
 * @property cantidadLetra - Cantidad del material en formato textual.
 * @property unidadMedida - Unidad de medida de la cantidad del material.
 * @property licenciaSanitaria - Licencia sanitaria asociada al material.
 * @property usoEspecifico - Uso específico del material.
 * @property fechaExportacion - Fecha de exportación del material.
 * @property modoCantidad - Indica si la cantidad está en modo específico.
 */
export interface DatosSolicitudFormType {
  tratadoRotterdam: boolean;
  listadoNacional: boolean;
  fraccionArancelaria: string;
  descripcionFraccion: string;
  convenioMinamata: boolean;
  numeroCas: string;
  descripcionNoArancelaria: string;
  nombreQuimico: string;
  nombreComun: string;
  nombreComercial: string;
  estadoFisico: string;
  cantidad: number | null;
  cantidadLetra: string;
  unidadMedida: string;
  licenciaSanitaria: string;
  usoEspecifico: string;
  fechaExportacion: string;
  modoCantidad: boolean;
}

/**
 * Representa un campo de entrada para una fecha en un formulario.
 *
 * @property {string} labelNombre - Etiqueta asociada al campo de fecha.
 * @property {boolean} required - Indica si el campo de fecha es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha está habilitado para la edición.
 */
export interface InputFecha {
  labelNombre: string;
  required: boolean;
  habilitado: boolean;
}