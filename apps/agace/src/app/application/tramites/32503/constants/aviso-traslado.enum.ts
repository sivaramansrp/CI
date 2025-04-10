/**
 * Constante que define los pasos del wizard en el trámite.
 * 
 * Esta constante contiene un array de objetos que representan los pasos del wizard,
 * incluyendo su índice, título, y estado (activo o completado).
 */
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Requisitos necesarios',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },
  {
    indice: 4,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * Textos utilizados en el trámite.
 * 
 * Esta constante contiene textos como instrucciones o mensajes que se muestran
 * en la interfaz del usuario.
 */
export const TEXTOS = {
  INSTRUCCIONES: `<h5>Aviso de privacidad simplificado</h5>
      <p class="text-left">El Servicio de Administración Tributaria (SAT), es el sujeto obligado y responsable del tratamiento de los datos personales que se recaban a través de la Ventanilla Digital Mexicana de Comercio Exterior (VUCEM), los datos personales podrán ser utilizados y transferidos a la autoridades competentes, con la finalidad de llevar a cabo cualquier trámite relacionado con importaciones, exportaciones y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias que, conforme a la legislación aplicable, sea exigido por las autoridades competentes en materia de comercio exterior y/o consultar información sobre los procedimientos para la importación, exportación y tránsito de mercancías de comercio exterior, incluyendo las regulaciones y restricciones no arancelarias, así como las notificaciones que se deriven de dichos trámites y serán protegidos, incorporados y tratados en el sistema de datos personales de la VUCEM, asimismo podrán ser transmitidos a las autoridades competentes establecidas en el Decreto por el que se establece la Ventanilla Digital Mexicana de Comercio Exterior, publicado en el Diario Oficial de la Federación el 14 de enero de 2011, así como al propio titular de la información. El titular, en su caso, podrá manifestar su negativa para el tratamiento de sus datos personales para finalidades y transferencias de los mismos que requieran el consentimiento del titular. Si desea conocer nuestro aviso de privacidad integral, lo podrá consultar en el portal.</p>
      <p class="mt-5 mb-3 text-muted">Aviso de privacidad integral</p>
      `,
  TIPO_CARGO: ` Datos de la Plantilla de Carga Masiva<span class="">*</span><br />
   <label><a href="javascript:;" target="_blank"> Descargar plantilla</a></label>
      `,
  REQUISITOS_OPCIONALES_INSTRUCCIONES: `<h6>Instrucciones</h6>
      <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
      <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
      <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo"</p>`,
  TERCEROS_TEXTO_DE_ALERTA: 'La solicitud ha quedado registrada con el número temporal 202767903 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.',
  TEXTO_DE_ALERTA_ARCHIVOS: `Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"`,
  TERCEROS_TEXTO_DE_ADJUNTAR: `Para poder adjuntar tu documento, deberá cumplir las siguientes características:<br> <b>&#8226;</b> Debe ser formato PDF que no contenga formularios, objetos OLE incrustrados, código JavaScript, etc.<br><b>&#8226;</b> No debe contener páginas en blanco.`,
  TERCEROS_TEXTO_DE_ADJUNTAR_ALERTA: `La carga del documento puede tardar varois segundos, este tiempo dependerá del tamaño de tu archivo y de tu velocidad de conexión`
};
/**
 * Configuración para la fecha de ingreso.
 * 
 * Define las propiedades de la fecha de ingreso, como el nombre de la etiqueta, si es requerida y si está habilitada.
 */
export const FECHA_INGRESO = {
  labelNombre: 'Fecha de programada del traslado',
  required: true,
  habilitado: true,
};

/**
 * Tipos de aviso disponibles.
 * 
 * Define los valores y etiquetas para los tipos de aviso.
 */
export const TIPAVI = [
  {
    valor: 'inicial',
    etiqueta: 'Inicial',
  },
  {
    valor: 'prorroga',
    etiqueta: 'Prórroga',
  }
];
/**
 * Tipos de carga disponibles.
 * 
 * Define los valores y etiquetas para los tipos de carga.
 */
export const TIPACA = [
  {
    valor: 'manual',
    etiqueta: 'Manual',
  },
  {
    valor: 'carga_masiva',
    etiqueta: 'Carga Masiva',
  }
];
/**
 * Configuración para los tipos de documentos.
 * 
 * Define las propiedades de los tipos de documentos, como el nombre de la etiqueta,
 * si es requerido, la primera opción y los catálogos disponibles.
 */
export const TIPO_DOCUMENTO = {
  labelNombre: 'Tipo de documento',
  required: false,
  primerOpcion: 'Seleccion una valor',
  catalogos: [],
}
/**
 * Configuración para el tamaño de los documentos.
 * 
 * Define las propiedades relacionadas con el tamaño de los documentos, como el nombre del archivo,
 * el tamaño máximo permitido y la resolución mínima.
 */
export const TIPO_DOCUMENTO_TAMANO = {
  nombreDelArchivo: '',
  tamano: 3,
  resolucion: '300',
}
/**
 * Constante que define el mensaje relacionado con el tamaño máximo permitido para los archivos.
 * 
 * Esta constante se utiliza para mostrar un mensaje de advertencia o información
 * cuando el tamaño del archivo excede el límite permitido.
 * 
 * Ejemplo de uso:
 * ```typescript
 * if (archivo.size > 3 * 1024 * 1024) {
 *   console.log(MENSAJE_DE_TAMANO_DE_ARCHIVO);
 * }
 * ```
 */
export const MENSAJE_DE_TAMANO_DE_ARCHIVO = 'El tamaño del archivo debe ser inferior a 3 MB';