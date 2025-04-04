/**
 * Mensaje de alerta relacionado con la mercancía.
 */
export const MENSAJE_DE_ALERTA_MERCANCIA: string =
  'De no existir marca anotar "sin marca". En su caso el sistema de marca con las especificaciones correspondientes';

/**
 * Mensaje de alerta relacionado con el aviso de privacidad.
 */
export const MENSAJE_DE_ALERTA_AVISO_PRIVACIDAD: string = `
  <div class="text-center">
     <h4>Aviso de privacidad simplificado</h4>
        <p>
            El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federación el 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal.
        </p>
        <p>
            <a href="https://www.ventanillaunica.gob.mx/vucem/estadisticas/Aviso_Privacidad_Integral.pdf" target="_blank">Aviso de privacidad integral</a>.
        </p>
  </div>
`;

/**
 * Clave de referencia utilizada en el trámite.
 */
export const CLAVE_DE_REFERENCIA: number = 84000966;

/**
 * Cadena de la dependencia asociada al trámite.
 */
export const CADENA_PAGO_DEPENDENCIA: number = 130090940161;

/**
 * Importe de pago requerido para el trámite.
 */
export const IMP_PAGO: number = 672;

/**
 * Etiquetas para los movimientos disponibles y seleccionados en la interfaz.
 */
export const MOVIMIENTO_CROSSLIST_LABEL = {
  /**
   * Título para los movimientos disponibles.
   */
  tituluDeLaIzquierda: 'Movimientos disponibles',

  /**
   * Título para los movimientos seleccionados.
   */
  derecha: 'Movimientos seleccionadas',
};

/**
 * Etiquetas para las aduanas disponibles y seleccionadas en la interfaz.
 */
export const AQUANDAS_CROSSLIST_LABEL = {
  /**
   * Título para las aduanas disponibles.
   */
  tituluDeLaIzquierda: 'Aduanas disponibles',

  /**
   * Título para las aduanas seleccionadas.
   */
  derecha: 'Aduanas seleccionadas',
};

/**
 * Configuración para el campo de fecha.
 */
export const FECHA = {
  /**
   * Etiqueta para el nombre del campo de fecha.
   */
  labelNombre: 'Fecha de pago',

  /**
   * Indica si el campo de fecha es obligatorio.
   */
  required: true,

  /**
   * Indica si el campo de fecha está habilitado.
   */
  habilitado: true,
};