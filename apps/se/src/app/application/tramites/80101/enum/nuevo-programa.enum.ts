/**
* Secciones a mostrar dentro de cada Paso de acuerdo al trámite
*/
export const SECCIONES_TRAMITE_230401 = {
    PASO_1: {
      VALIDACION_SECCION_1: false,
      VALIDACION_SECCION_2: true,
      VALIDACION_SECCION_3: true,
    },
    PASO_2: {
      VALIDACION_SECCION: true,
    },
    PASO_3: {
      requiereValidacion: true,
    },
  };

  export const TEXTOS_REQUISITOS = {
    INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos dcumentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
    ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar dcumentos"</p>`,
};

export interface AccionBoton {
  accion: string;
  valor: number;
}