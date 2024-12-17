export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Anexar necesarios',
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    completado: false,
  },
];

export const CONSTANTES = {
  EXP_CORREO: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
};

export const TEXTOS = {
  INSTRUCCIONES: `<h6>Instrucciones</h6>
  <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
  <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
  <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista.</p>`,
  ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar dcumentos"</p>`,
};
