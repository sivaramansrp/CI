import { ConfiguracionVisibilidad } from "../models/datos-domicilio-legal.model";

export const MENSAJE_DE_ALERTA: string =
  'Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una autoridad. Asimismo acepto que la notificación de este trámite, sea a través de la Ventanilla Única de Comercio Exterior por los mecanismos de la misma.';

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

export const INPUT_FECHA_CADUCIDAD_CONFIG = {
  labelNombre: 'Fecha de caducidad',
  required: false,
  habilitado: true,
};

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
  'CHIHUAHUA, CHIH.'
];
/**
 * Represents the default visibility configuration for various country-related fields.
 * 
 * @constant
 * @type {ConfiguracionVisibilidad}
 * 
 * @property {boolean} paisOrigen - Indicates whether the country of origin is visible. Default is `false`.
 * @property {boolean} paisFabrica - Indicates whether the country of manufacture is visible. Default is `true`.
 * @property {boolean} paisElaboracion - Indicates whether the country of elaboration is visible. Default is `true`.
 * @property {boolean} paisProveedor - Indicates whether the country of the supplier is visible. Default is `true`.
 * @property {boolean} paisProcedencia - Indicates whether the country of provenance is visible. Default is `true`.
 */
export const DEFAULT_CONFIGURACION_VISIBILIDAD: ConfiguracionVisibilidad = {
  paisOrigen: false, 
  paisFabrica: true,
  paisElaboracion: true,
  paisProveedor: true,
  paisProcedencia: true
};