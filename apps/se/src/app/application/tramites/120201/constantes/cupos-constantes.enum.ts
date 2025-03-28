import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { InstrumentoCupoTPLForm } from "../models/cupos.model";

/**
 * Constantes para el manejo de los pasos del wizard de cupos
 * 
 */
export const CUPOS_PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  }
];

/**
 * Constantes para el manejo de los pasos del wizard de cupos
 * @type {ConfiguracionColumna<InstrumentoCupoTPLForm>[]}
 * @description Configuración de las columnas para la tabla de cupos
 */
export const CONFIGURACION_PARA_ENCABEZADO_DE_TABLA: ConfiguracionColumna<InstrumentoCupoTPLForm>[] = [
  { encabezado: 'Tratado o acuerdo', clave: (fila) => fila.cveTratado, orden: 1 },
  { encabezado: 'Clasificación del regimen', clave: (fila) => fila.cveRegimenClasificacion, orden: 2 },
  { encabezado: 'País destino/origen', clave: (fila) => fila.cvePaisDestino, orden: 3 },
  { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 4 },
  { encabezado: 'Descripción de la categoría textil', clave: (fila) => fila.categoriaTextilDescripcion, orden: 5 },
  { encabezado: 'Descripción del producto', clave: (fila) => fila.productoDescripcion, orden: 6 },
  { encabezado: 'Clasificación del subproducto', clave: (fila) => fila.subProductoClasificacion, orden: 7 },
  { encabezado: 'Fecha inicio vigencia', clave: (fila) => fila.fechaInicioVigencia, orden: 8 },
  { encabezado: 'Fecha fin vigencia', clave: (fila) => fila.fechaFinVigencia, orden: 9 },
  { encabezado: 'Monto disponible', clave: (fila) => fila.montoDisponible, orden: 10 },
  { encabezado: 'Categoría textil', clave: (fila) => fila.categoriaTextil, orden: 11 }
];

/**
 * Contiene el aviso de privacidad simplificado con su correspondiente enlace al aviso integral.
 */
export const AVISO_PRIVACIDAD = {
  ADJUNTAR: `<h5>Aviso de privacidad simplificado</h5>
    <p style="text-align: justify">El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el Sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidad en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federaciónel 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal.</p><a href="">Aviso de privacidad integral</a>`
}