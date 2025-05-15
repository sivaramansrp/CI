export const PASOS = [
  {
      indice: 1,
      titulo: 'Capturar solicitud',
      activo: true,
      completado: true,
  },
  {
      indice: 2,
      titulo: 'Anexar requisitos',
      activo: false,
      completado: false,
  },
  {
      indice: 3,
      titulo: 'Firmar solicitud',
      activo: false,
      completado: false,
  },
];


export const TEXTOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista.</p>`,
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar dcumentos"</p>`,
    ADJUNTAR_DOCUMENTOS: `<p>Para poder adjuntar tu documento, deberá cumplir las signuientes características:</p>
    <p><b>•</b> Debe ser formato PDF que no contenga formularios, objetos OLE incrustrados, código java script, etc.</p>
    <p><b>•</b> No debe contener páginas en blanco.</p>`,
    ADJUNTAR_WARNING: `<p>La carga del documento puede tardar varios segundos, este tiempo dependerá del tamaño de tu archivo y de la velocidad de tu conexión.</p>`,
    DECLARACION_DE_RESPONSABILIDAD_SOLIDARIA: `*? En mi calidad de Residente en Territorio Nacional, manifiesto mi voluntad y disposición de asumir la responsabilidad solidaria a que se refiere la fracción VIII del artículo 26 del Código Fiscal de la Federación, por los créditos fiscales que lleguen a derivarse por no retornar las Mercancías a que el presente aviso se refiere, al extranjero dentro del plazo establecido en la Ley"`
  };

/**
 * @description Constantes con el mensaje para el doble clic en un registro.
 */
export const MENSAJE_DOBLE_CLIC = "Al dar doble clic en el registro seleccionado creará una nueva solicitud con los mismos datos de la solicitud elegida.";