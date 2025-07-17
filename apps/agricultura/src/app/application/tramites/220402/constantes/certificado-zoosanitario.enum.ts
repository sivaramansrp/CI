import { DatosGenerales, Destinatario, TablaMercancia } from "../models/pantallas-captura.model";
/**
 * Pasos del trámite.
 * 
 * Define los pasos necesarios para completar el trámite, incluyendo su índice, título, 
 * y estado (activo o completado).
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
    titulo: 'Anexar requisitos',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  }
];

/**
 * Textos relacionados con los requisitos del trámite.
 * 
 * Contiene instrucciones y mensajes para guiar al usuario en la anexión de documentos.
 */
export const TEXTOS_REQUISITOS = {
  /**
   * Instrucciones para anexar documentos.
   */
  INSTRUCCIONES: `<h6>Instrucciones</h6>
    <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
    <p>- En caso de que no requieras algún documento, selecciónalo y elimínalo</p>
    <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,

  /**
   * Mensaje para adjuntar nuevos documentos.
   */
  ADJUNTAR: `<p>Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento-- y presiona el botón "Adjuntar documentos"</p>`,
};

/**
 * Mensaje de éxito para la etapa uno del trámite.
 * 
 * Este mensaje se muestra cuando la solicitud ha sido registrada exitosamente con un número temporal.
 */
export const MENSAJE_DE_EXITO_ETAPA_UNO = `La solicitud ha quedado registrada con el número temporal 202758511. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.`;

/**
 * Configuración de los campos para el solicitante físico nacional en el trámite zoosanitario.
 * 
 * Define los campos, etiquetas, clases CSS, validaciones y otros atributos para el formulario del solicitante.
 */
export const ZOOSANITARIO_SOLICITANTE_FISICA_NACIONAL = [
  {
    labelNombre: 'Registro federal de contribuyentes:',
    campo: 'rfc',
    class: 'col-md-4',
    tipo_input: 'text',
    disabled: true,
    tooltip: 'Registro federal de contribuyentes:',
    validators: ['required'],
    placeholder: '',
  },
  {
    labelNombre: 'Denominación o razón social:',
    campo: 'nombreRazonSocial',
    class: 'col-md-8',
    tipo_input: 'text',
    disabled: true,
    tooltip: 'Denominación o razón social',
    validators: ['required'],
    placeholder: '',
  },
  {
    labelNombre: 'Actividad económica preponderante:',
    campo: 'actEconomica',
    class: 'col-md-12',
    tipo_input: 'text',
    disabled: true,
    validators: ['required'],
    placeholder: '',
  },
  {
    labelNombre: 'Correo electrónico',
    campo: 'correo',
    class: 'col-md-4',
    tipo_input: 'text',
    disabled: true,
    validators: ['required'],
    placeholder: '',
  },
];

/**
 * Configuración para el campo de fecha de pago.
 * 
 * Define la etiqueta, si es requerido y si está habilitado.
 */
export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago',
  required: true,
  habilitado: false,
};

/**
 * Mensaje informativo para continuar con el trámite.
 * 
 * Este mensaje indica que se debe agregar al menos una mercancía para continuar.
 */
export const TEXTOS = 'Para continuar con el trámite, deberá agregar por lo menos una mercancía.';

/**
 * Mensaje de alerta para tablas obligatorias.
 * 
 * Indica que las tablas marcadas con asterisco son obligatorias y deben contener al menos un registro.
 */
export const TERCEROR_TEXTO_DE_ALERTA = 'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

/**
 * Identificador del usuario.
 * 
 * Representa el ID del usuario en el sistema.
 */
export const IDDEUSUARIO = 21;
/**
 * @constant RADIO_OPCIONS
 * @description Opciones de radio para seleccionar "Exportación" o "Reexportación".
 */
export const RADIO_OPCIONS = [
  { label: 'Exportación', value: 'exportacion' },
  { label: 'Reexportación', value: 'reexportacion' },
];

/**
 * @constant EXENTO_DE_PAGO
 * @description Opciones de radio para seleccionar "No" o "Si".
 */
export const EXENTO_DE_PAGO = [
  { label: 'No', value: 'No' },
  { label: 'Si', value: 'Si' },
];
export const MENSAJEDEALERTA = {
  ADJUNTAR: `<p class="text-center">Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.</p>`,
};
/**
 * Configuración de las columnas de la tabla para los destinatarios.
 * Cada objeto en esta lista representa una columna de la tabla que se mostrará,
 * con un encabezado, una clave de acceso al campo del destinatario, y un orden
 * de visualización.
 */
export const CONFIGURATION_TABLA_DESTINATARIO = [
  { encabezado: 'Nombre/denominación o razón social', clave: (item: Destinatario): string => item.nombreDenominacionORazonSocial, orden: 1 },
  { encabezado: 'Teléfono', clave: (item: Destinatario): string => item.telefono, orden: 2 },
  { encabezado: 'Correo electrónico', clave: (item: Destinatario): string => item.correoElectronico, orden: 3 },
  { encabezado: 'Domicilio', clave: (item: Destinatario): string | undefined => item.domicilio, orden: 4 },
  { encabezado: 'País', clave: (item: Destinatario): string | undefined => item.pais, orden: 5 },
];
/** Configuración de las columnas de la tabla de datos generales. */
export const CONFIGURATION_TABLA_GENERALES = [
  { encabezado: 'No. partida', clave: (item: DatosGenerales): number => item.id, orden: 1 },
  { encabezado: 'Fracción arancelaria', clave: (item: DatosGenerales): string => item.fraccionArancelaria, orden: 2 },
  { encabezado: 'Descripción de la fracción', clave: (item: DatosGenerales): string => item.descdelaFraccion, orden: 3 },
  { encabezado: 'Cantidad UMT', clave: (item: DatosGenerales): string | undefined => item.cantidadUMT, orden: 4 },
  { encabezado: 'Unidad de medida de tarifa (UMT)', clave: (item: DatosGenerales): string | undefined => item.UMT, orden: 5 },
  { encabezado: 'Cantidad UMC', clave: (item: DatosGenerales): string | undefined => item.cantidadUMC, orden: 6 },
  { encabezado: 'Unidad de medida de comercialización (UMC)', clave: (item: DatosGenerales): string | undefined => item.UMC, orden: 7 },
  { encabezado: 'Descripción adicional del producto', clave: (item: DatosGenerales): string | undefined => item.descripcionProducto, orden: 8 },
  { encabezado: 'Nombre común', clave: (item: DatosGenerales): string | undefined => item.nombreComun, orden: 9 },
  { encabezado: 'Nombre científico', clave: (item: DatosGenerales): string | undefined => item.nombreCientifico, orden: 10 },
  { encabezado: 'Uso', clave: (item: DatosGenerales): string | undefined => item.USO, orden: 11 },
  { encabezado: 'País de orígen', clave: (item: DatosGenerales): string | undefined => item.paisdeOrigen, orden: 12 },
  { encabezado: 'Marcas distintivas', clave: (item: DatosGenerales): string | undefined => item.marcasDistintivas, orden: 13 },
  { encabezado: 'Número', clave: (item: DatosGenerales): string | undefined => item.numero, orden: 14 },
  { encabezado: 'Descripción de los empaques', clave: (item: DatosGenerales): string | undefined => item.empaques, orden: 15 },
];
/** Configuración de las columnas de la tabla de mercancías. */
export const CONFIGURATION_TABLA_MERCANCIA = [
  { encabezado: 'No. partida', clave: (item: TablaMercancia): number => item.id, orden: 1 },
  { encabezado: 'Entidad Federativa de Origen', clave: (item: TablaMercancia): string => item.federativaOrigen, orden: 2 },
  { encabezado: 'Municipio de Origen', clave: (item: TablaMercancia): string => item.origen, orden: 3 },
];
/** Opciones disponibles para los municipios. */
export const MUNICIPIODE_OPCIONS = [
  { label: 'Municipio 1', value: 'Municipio 1' },
  { label: 'Municipio 2', value: 'Municipio 2' },
  { label: 'Municipio 3', value: 'Municipio 3' }
];

export const ERROR_FORMA_ALERT =
`
<div class="d-flex justify-content-center text-center">
  <div>
    <div class="col-md-12">
      Faltan campos por capturar.
    </div>
  </div>
</div>
`