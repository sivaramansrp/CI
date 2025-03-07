export const DATOS_EMPRESA = [
    {
        labelNombre: 'Número de programa IMMEX:',
        campo: 'numero_programa',
        class: 'col-md-12',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Año de programa IMMEX:',
        campo: 'ano_programa',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Mes al que corresponde el aviso:',
        campo: 'mes_corresponde_aviso',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [],
    },
    {
        labelNombre: 'Año al que corresponde el aviso:',
        campo: 'ano_corresponde_aviso',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [],
    },
];

export const CARGO_TIPO = [
    {
        labelNombre: 'Tipo de carga',
        campo: 'carga_tipo',
        required: true,
        radioOptions: [],
        radioSelectedValue: '',
    },
];

export const DATOS_QUIEN_RECIBE = [
    {
        labelNombre: 'RFC:',
        campo: 'rfc',
        class: 'col-md-12',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Número de programa IMMEX:',
        campo: 'numero_programa_qr',
        class: 'col-md-12',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Año de programa IMMEX:',
        campo: 'ano_programa_qr',
        class: 'col-md-12',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
];

export const DATOS_DOMICILIO_LUGAR = [
    {
        labelNombre: 'Nombre comercial:',
        campo: 'nombre_comercial',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Entidad federativa:',
        campo: 'entidad_federativa',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [],
    },
    {
        labelNombre: 'Alcaldía o Municipio:',
        campo: 'alcalida_municipio',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [],
    },
    {
        labelNombre: 'Colonia:',
        campo: 'colonias',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [],
    },
    {
        labelNombre: 'Calle:',
        campo: 'calles',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Número exterior:',
        campo: 'numero_exterior',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Número interior:',
        campo: 'numero_interior',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Código postal:',
        campo: 'codigo_postal',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
];

export const DATOS_MERCANCIA_SUBMANUFACTURA = [
    {
        labelNombre: 'Fracción arancelaria:',
        campo: 'frac_arancelaria',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [],
    },
    {
        labelNombre: 'NICO:',
        campo: 'nico',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Unidad de medida:',
        campo: 'unidad_medida',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [],
    },
    {
        labelNombre: 'Cantidad:',
        campo: 'cantidad',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Valor USD:',
        campo: 'valor_usd',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Descripcíon de la mercancía:',
        campo: 'descripcion_mercancia',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
];

export const TEXTOS = {
    INSTRUCCIONES: `
    <p>- El archivo no debe exceder los 1000 registros. Para descargar plantilla del archivo de excel de click</p>`,
    FILE_UPLOAD: `Seleccionar archivo`,
    FILE_UPLOAD_TEXT: `Sin archivos seleccionados`,
    FILE_UPLOAD_TEXT_SUCCESS: `El formato del archivo es correcto. Se enviará un correo de notificación con el resultado.`,
};

export const TEXTO_REQUISITOS = {
    REQUISITOS_OBLIGATORIOS: 'Requisitos obligatorios',
    REQUISITOS_OPCIONALES: 'Requisitos opcionales',
    REQUISITOS_OPCIONALES_INSTRUCCIONES: `<h6>Instrucciones</h6>
  <p>- De acuerdo al caso particular, algunos documentos podrían ser obligatorios</p>
  <p>- En caso de que no requieras algún documento, seleccionalo y elíminalo</p>
  <p>- Si necesitas anexar más de un documento del mismo tipo selecciónalo de la lista y presiona "Agregar nuevo".</p>`,
}

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