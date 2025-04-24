import { ConfiguracionVisibilidad } from "../models/datos-domicilio-legal.model";

/*
 * Mensaje de alerta que informa al usuario sobre el cumplimiento de requisitos y normatividad aplicable.
 * También establece que la notificación del trámite será a través de la Ventanilla Única de Comercio Exterior.
 */
export const MENSAJE_DE_ALERTA: string =
  'Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una autoridad. Asimismo acepto que la notificación de este trámite, sea a través de la Ventanilla Única de Comercio Exterior por los mecanismos de la misma.';

/*
 * Lista de países disponibles para selección en el formulario.
 */
export const CROSLISTA_DE_PAISES: string[] = [
  'AFGANISTÁN (EMIRATO ISLÁMICO)',
  'ALBANIA (REPÚBLICA DE)',
  'ALEMANIA (REPÚBLICA FEDERAL DE)',
  'ANDORRA (PRINCIPADO DE)',
  'ANGOLA (REPÚBLICA DE)',
  'ANGUILLA',
  'ANTIGUA Y BARBUDA',
  'ARABIA SAUDITA (COMUNIDAD ECONÓMICA EUROPEA)',
  'ARGELIA (REPÚBLICA DEMOCRÁTICA Y POPULAR DE)',
  'ARGENTINA (REPÚBLICA)',
  'AUSTRALIA (COMMONWEALTH OF)',
  'AUSTRIA (REPUBLIC OF)',
  'BAHAMAS (COMMONWEALTH OF THE)',
  'BAHRAIN (KINGDOM OF)',
  "BANGLADESH (PEOPLE'S REPUBLIC OF)",
  'BARbados',
  'BELGIUM (KINGDOM OF)',
  'BELIZE',
  'BENIN (REPUBLIC OF)',
  'BHUTAN (KINGDOM OF)',
];

/*
 * Configuración para el campo de fecha de caducidad en el formulario.
 * Incluye el nombre de la etiqueta, si es obligatorio y si está habilitado.
 */
export const INPUT_FECHA_CADUCIDAD_CONFIG = {
  labelNombre: 'Fecha de caducidad', // Nombre de la etiqueta del campo.
  required: false, // Indica si el campo es obligatorio.
  habilitado: true, // Indica si el campo está habilitado.
};

/*
 * Lista de aduanas de entrada disponibles para selección en el formulario.
 */
export const CROSLISTA_DE_ADUANAS_ENTRADA: string[] = [
  'ACAPULCO, PUERTO Y AEROPUERTO',
  'ADUANA DE PANTACO',
  'AEROPUERTO INT. DE LA CD DE MEXI',
  'AEROPUERTO INTERNACIONAL FELIF',
  'AGUA PRIETA',
  'AGUASCALIENTES, AGS.',
  'ALTAMIRA',
  'CANCUN, AEROPUERTO',
  'CD. CAMARGO, TAMPS.',
  'CD. DEL CARMEN',
  'CD. JUAREZ',
  'CHIHUAHUA, CHIH.',
];

/*
 * Mensaje de alerta que se muestra cuando faltan datos obligatorios como localidad y colonia.
 */
export const ALERT_INSUMOS = {
  ALERTA: `¡Precaución! Debes capturar localidad y colonia`, // Mensaje de alerta que se muestra al usuario.
};

/*
 * Representa la configuración de visibilidad predeterminada para varios campos relacionados con países.
 */
export const DEFAULT_CONFIGURACION_VISIBILIDAD: ConfiguracionVisibilidad = {
  paisOrigen: false, // Indica si el país de origen es visible. Por defecto es `false`.
  paisFabrica: true, // Indica si el país de fabricación es visible. Por defecto es `true`.
  paisElaboracion: true, // Indica si el país de elaboración es visible. Por defecto es `true`.
  paisProveedor: true, // Indica si el país del proveedor es visible. Por defecto es `true`.
  paisProcedencia: true, // Indica si el país de procedencia es visible. Por defecto es `true`.
};