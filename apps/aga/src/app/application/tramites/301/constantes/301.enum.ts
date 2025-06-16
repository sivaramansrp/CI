// eslint-disable-next-line @nx/enforce-module-boundaries
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { PagoDeDerechosTabla } from "../models/301.models";
/**
 * @constant PAGO_DE_DERECHOS_TABLA
 * @description
 * Define la configuración de las columnas para la tabla de partidas en el proceso de importación definitiva.
 * @type {ConfiguracionColumna<PagoDeDerechosTabla>[]}
 */
  export const PAGO_DE_DERECHOS_TABLA: ConfiguracionColumna<PagoDeDerechosTabla>[] = [
      { encabezado: 'Linea de captura', clave: (artículo) => artículo.lineaDeCaptura, orden: 1 },
      { encabezado: 'Monto', clave: (artículo) => artículo.monto, orden: 2 }
    ];