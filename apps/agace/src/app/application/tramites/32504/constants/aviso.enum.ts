import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * @constant
 * @name DATOS_EMPRESA
 * @description Configuración de los campos para los datos de la empresa IMMEX que transfiere y presenta el aviso.
 * @type {Array<Object>}
 */
export const DATOS_EMPRESA = [
    {
        labelNombre: 'Número de programa IMMEX*:',
        campo: 'numeroPrograma',
        class: 'col-md-12',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
        maxlength: 9,
    },
    {
        labelNombre: 'Año de programa IMMEX*:',
        campo: 'anoPrograma',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
        maxlength: 4,
    },
    {
        labelNombre: 'Mes al que corresponde el aviso',
        campo: 'mesCorrespondeAviso',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [],
    },
    {
        labelNombre: 'Año al que corresponde el aviso',
        campo: 'anoCorrespondeAviso',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [],
    },
];

/**
 * @constant
 * @name CARGO_TIPO
 * @description Configuración para el tipo de carga (manual o masiva).
 * @type {Array<Object>}
 */
export const CARGO_TIPO = [
    {
        labelNombre: 'Tipo de carga',
        campo: 'cargaTipo',
        required: true,
        radioOptions: [],
        radioSelectedValue: '',
        jsonDataFileName: 'tipo-cargo.json',
    },
];

/**
 * @constant
 * @name DATOS_QUIEN_RECIBE
 * @description Configuración de los campos para los datos de quien recibe las mercancías.
 * @type {Array<Object>}
 */
export const DATOS_QUIEN_RECIBE = [
    {
        labelNombre: 'RFC*:',
        campo: 'rfc',
        class: 'col-md-12',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
        maxlength: 13,
    },
    {
        labelNombre: 'Número de programa IMMEX:',
        campo: 'numero_programa_qr',
        class: 'col-md-12',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
        maxlength: 9,
    },
    {
        labelNombre: 'Año de programa IMMEX:',
        campo: 'anoProgramaQr',
        class: 'col-md-12',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
        maxlength: 4,
    },
];

/**
 * @constant
 * @name DATOS_DOMICILIO_LUGAR
 * @description Configuración de los campos para el domicilio donde se llevará a cabo la submanufactura.
 * @type {Array<Object>}
 */
export const DATOS_DOMICILIO_LUGAR = [
    {
        labelNombre: 'Nombre comercial:',
        campo: 'nombreComercial',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
        maxlength: 250
    },
    {
        labelNombre: 'Entidad federativa',
        campo: 'entidadFederativa',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [] as Catalogo[],
    },
    {
        labelNombre: 'Alcaldía o Municipio',
        campo: 'alcalida_municipio',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [] as Catalogo[],
    },
    {
        labelNombre: 'Colonia',
        campo: 'colonias',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [],
    },
    {
        labelNombre: 'Calle*:',
        campo: 'calles',
        class: 'col-md-4',
        tipo_input: 'text',
        required: true,
        disabled: true,
        validators: ['required'],
        placeholder: '',
        maxlength: 250
    },
    {
        labelNombre: 'Número exterior*:',
        campo: 'numeroExterior',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
        maxlength: 15
    },
    {
        labelNombre: 'Número interior:',
        campo: 'numeroInterior',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
        maxlength: 15
    },
    {
        labelNombre: 'Código postal*:',
        campo: 'codigoPostal',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
        maxlength: 5
    },
];

/**
 * @constant
 * @name DATOS_MERCANCIA_SUBMANUFACTURA
 * @description Configuración de los campos para los datos de la mercancía transferida para submanufactura.
 * @type {Array<Object>}
 */
export const DATOS_MERCANCIA_SUBMANUFACTURA = [
    {
        labelNombre: 'Fracción arancelaria',
        campo: 'fracArancelaria',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [] as Catalogo[],
    },
    {
        labelNombre: 'NICO*:',
        campo: 'nico',
        required: true,
        class: 'col-md-4',
        tipo_input: 'text',
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Unidad de medida',
        campo: 'unidadMedida',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [] as Catalogo[],
    },
    {
        labelNombre: 'Cantidad*:',
        campo: 'cantidad',
        class: 'col-md-4',
        tipo_input: 'text',
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Valor USD*:',
        campo: 'valorUsd',
        class: 'col-md-4',
        tipo_input: 'text',
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Descripcíon de la mercancía*:',
        campo: 'descripcionMercancia',
        class: 'col-md-4',
        tipo_input: 'text',
        validators: ['required'],
        placeholder: '',
    },
];

/**
 * @constant
 * @name TEXTOS
 * @description Textos de ayuda e instrucciones para la carga de archivos y requisitos.
 * @type {Object}
 */
export const TEXTOS = {
    INSTRUCCIONES: `
    <p> El archivo no debe exceder los 1000 registros. Para descargar plantilla del archivo de excel de click* </br> <strong><a href="#">Descargar plantilla</a></strong> </p>`,
    CARGA_DE_ARCHIVOS: `Seleccionar archivo`,
    CARGA_DE_ARCHIVO_DE_TEXTO: `Sin archivos seleccionados`,
    CARGA_DE_ARCHIVO_DE_TEXTO_EXITOSO: `El formato del archivo es correcto. Se enviará un correo de notificación con el resultado.`,
};

/**
 * @constant
 * @name TEXTO_REQUISITOS
 * @description Textos para los requisitos obligatorios y opcionales.
 * @type {Object}
 */
export const TEXTO_REQUISITOS = {
    REQUISITOS_OBLIGATORIOS: 'Requisitos obligatorios',
    REQUISITOS_OPCIONALES: 'Requisitos opcionales',
    REQUISITOS_OPCIONALES_INSTRUCCIONES: `<h6>Instrucciones</h6>
  <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
  <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
  <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
}

/**
 * @constant
 * @name TEXTO_ANEXAR_REQUISITOS
 * @description Textos para la sección de anexar documentos y requisitos.
 * @type {Object}
 */
export const TEXTO_ANEXAR_REQUISITOS = {
    INIT_DOCUMENTO: `
    <p>- Si deseas adjuntar un nuevo documento, selecciona la opción --Adjuntar nuevo documento--y persiona el botón "Adjuntar documentos"</p>`,
    ADJUNTAR_DOCUMENTO: 'Adjuntar documentos',
    ADJUNTAR_DOCUMENTO_INSTRUCCIONES: `
  <p>Para poder adjuntar tu documento, deberá cumplir las siguientes características</p>
  <ul>Debe ser formato PDF que no contega formularios, objetos OLE incrustrados, Codígo java script, etc.</ul>
  <ul>No debe contener páginas en blanco</ul>
  `
}

/**
 * @constant
 * @name MES_CONFIG
 * @description Catálogo de meses para la selección en formularios.
 * @type {Catalogo[]}
 */
export const MES_CONFIG: Catalogo[] = [
    { descripcion: 'Enero', id: 1 },
    { descripcion: 'Febrero', id: 2 },
    { descripcion: 'Marzo', id: 3 },
    { descripcion: 'Abril', id: 4 },
    { descripcion: 'Mayo', id: 5 },
    { descripcion: 'Junio', id: 6 },
    { descripcion: 'Julio', id: 7 },
    { descripcion: 'Agosto', id: 8 },
    { descripcion: 'Septiembre', id: 9 },
    { descripcion: 'Octubre', id: 10 },
    { descripcion: 'Noviembre', id: 11 },
    { descripcion: 'Diciembre', id: 12 },
];

/**
 * @constant
 * @name ANIO_CONFIG
 * @description Catálogo de años para la selección en formularios.
 * @type {Catalogo[]}
 */
export const ANIO_CONFIG: Catalogo[] = [
    { descripcion: '2023', id: 2023 },
    { descripcion: '2024', id: 2024 },
    { descripcion: '2025', id: 2025 },
    { descripcion: '2026', id: 2026 },
    { descripcion: '2027', id: 2027 },
];

export const UNIDAD_MEDIDA_CONFIG: Catalogo[] = [
    { descripcion: 'Kilogramo', id: 1 },
    { descripcion: 'Litro', id: 2 },
    { descripcion: 'Metro', id: 3 },
    { descripcion: 'Unidad', id: 4 },
    { descripcion: 'Caja', id: 5 },
];

export const FRACCION_ARANCELARIA_CONFIG: Catalogo[] = [
    { descripcion: '0101.21.01 - Caballos pura sangre para carreras', id: 1012101 },
    { descripcion: '0207.14.01 - Muslos de pollo congelados', id: 2071401 },
    { descripcion: '2710.12.15 - Gasolina sin plomo', id: 27101215 },
    { descripcion: '8471.30.01 - Computadoras portátiles', id: 84713001 },
    { descripcion: '8703.21.02 - Vehículos de turismo con motor eléctrico', id: 87032102 },
];

export const ENTIDAD_FEDERATIVA_CONFIG: Catalogo[] = [
    { descripcion: 'Aguascalientes', id: 1 },
    { descripcion: 'Baja California', id: 2 },
    { descripcion: 'Baja California Sur', id: 3 },
    { descripcion: 'Campeche', id: 4 },
    { descripcion: 'Chiapas', id: 5 },
    { descripcion: 'Chihuahua', id: 6 },
    { descripcion: 'Ciudad de México', id: 7 },
    { descripcion: 'Coahuila', id: 8 },
    { descripcion: 'Colima', id: 9 },
    { descripcion: 'Durango', id: 10 },
];

export const ALCALDIA_CONFIG: Catalogo[] = [
  { descripcion: 'Álvaro Obregón', id: 1 },
  { descripcion: 'Azcapotzalco', id: 2 },
  { descripcion: 'Benito Juárez', id: 3 },
  { descripcion: 'Coyoacán', id: 4 },
  { descripcion: 'Cuajimalpa de Morelos', id: 5 },
  { descripcion: 'Cuauhtémoc', id: 6 },
  { descripcion: 'Gustavo A. Madero', id: 7 },
  { descripcion: 'Iztacalco', id: 8 },
  { descripcion: 'Iztapalapa', id: 9 },
  { descripcion: 'La Magdalena Contreras', id: 10 },
  { descripcion: 'Miguel Hidalgo', id: 11 },
  { descripcion: 'Milpa Alta', id: 12 },
  { descripcion: 'Tláhuac', id: 13 },
  { descripcion: 'Tlalpan', id: 14 },
  { descripcion: 'Venustiano Carranza', id: 15 },
  { descripcion: 'Xochimilco', id: 16 },
];