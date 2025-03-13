export const DATOS_EMPRESA = [
    {
        labelNombre: 'Número de programa IMMEX:',
        campo: 'numeroPrograma',
        class: 'col-md-12',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Año de programa IMMEX:',
        campo: 'anoPrograma',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Mes al que corresponde el aviso:',
        campo: 'mesCorrespondeAviso',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [],
    },
    {
        labelNombre: 'Año al que corresponde el aviso:',
        campo: 'anoCorrespondeAviso',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [],
    },
];

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
        campo: 'anoProgramaQr',
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
        campo: 'nombreComercial',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Entidad federativa:',
        campo: 'entidadFederativa',
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
        campo: 'numeroExterior',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Número interior:',
        campo: 'numeroInterior',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Código postal:',
        campo: 'codigoPostal',
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
        campo: 'fracArancelaria',
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
        campo: 'unidadMedida',
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
        campo: 'valorUsd',
        class: 'col-md-4',
        tipo_input: 'text',
        disabled: true,
        validators: ['required'],
        placeholder: '',
    },
    {
        labelNombre: 'Descripcíon de la mercancía:',
        campo: 'descripcionMercancia',
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
    CARGA_DE_ARCHIVOS: `Seleccionar archivo`,
    CARGA_DE_ARCHIVO_DE_TEXTO: `Sin archivos seleccionados`,
    CARGA_DE_ARCHIVO_DE_TEXTO_EXITOSO: `El formato del archivo es correcto. Se enviará un correo de notificación con el resultado.`,
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