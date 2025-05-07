import { REGEX_ALFANUMERICO_CON_ESPACIOS, REGEX_CORREO_ELECTRONICO, REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, REGEX_PATRON_DECIMAL_15_4, REGEX_POSTAL, REGEX_TELEFONO } from "@libs/shared/data-access-user/src";

import { Mercancia } from "../modelos/sanidad-acuicola-importacion.model";

export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Requisitos neccesarios',
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

export const IMPORTANTE = {
  Importante: `Para continuar con el trámite,debes agregar por lo menos una mercancía`,
};

export const CAMPOS_FORMULARIO_DATOS_DEL_TRAMITE = [
  {
    id: 'aduanaDeIngreso',
    labelNombre: 'Aduana de ingreso',
    campo: 'aduanaDeIngreso',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'medioDeTransporte',
    labelNombre: 'Medio de transporte',
    campo: 'medioDeTransporte',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    opciones: [
      
    ],
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'identificacionDelTransporte',
    labelNombre: 'Identificación del transporte',
    campo: 'identificacionDelTransporte',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'pattren', valor: REGEX_ALFANUMERICO_CON_ESPACIOS, mensaje: 'El campo solo acepta letras y números' },

    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  }
];

export const CAMPOS_FORMULARIO_MERCANCIAS = [
  {
    id: 'descripcion',
    labelNombre: 'Descripción',
    campo: 'descripcion',
    clase: 'col-md-9',
    tipoInput: 'textarea',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' },
      { tipo: 'pattern', valor: REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija la descripción' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'fraccionArancelaria',
    labelNombre: 'Fracción arancelaria',
    campo: 'fraccionArancelaria',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'descripcionFraccion',
    labelNombre: 'Descripción de la fracción',
    campo: 'descripcionFraccion',
    clase: 'col-md-8',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },

  {
    id: 'cantidadUMT',
    labelNombre: 'Cantidad en UMT',
    campo: 'cantidadUMT',
    clase: 'col-md-4',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'pattern', valor: REGEX_PATRON_DECIMAL_15_4, mensaje: 'El valor debe ser un número con hasta 15 dígitos enteros y hasta 4 dígitos decimales.' }

    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'umt',
    labelNombre: 'Unidad de medida (UMT)',
    campo: 'umt',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-4',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'cantidadUMC',
    labelNombre: 'Cantidad en UMC',
    campo: 'cantidadUMC',
    clase: 'col-md-4',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'umc',
    labelNombre: 'Unidad de medida (UMC)',
    campo: 'umc',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    opciones: [],
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-4',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'nombreComun',
    labelNombre: 'Nombre común',
    campo: 'nombreComun',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' },
      { tipo: 'pattern', valor: REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el nombre común' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'nombreCientifico',
    labelNombre: 'Nombre científico',
    campo: 'nombreCientifico',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' },
      { tipo: 'pattern', valor: REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el nombre científico' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-4',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'faseDesarrollo',
    labelNombre: 'Fase de desarrollo',
    campo: 'faseDesarrollo',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-8',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'uso',
    labelNombre: 'Uso',
    campo: 'uso',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    opciones: [],
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'otroUso',
    labelNombre: 'Otro uso',
    campo: 'otroUso',
    clase: 'col-md-8',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: false,
    habilitado: true,
  },
  {
    id: 'origen',
    labelNombre: 'Origen',
    campo: 'origen',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    opciones: [],
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-8',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'paisOrigen',
    labelNombre: 'País de origen',
    campo: 'paisOrigen',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'paisProcedencia',
    labelNombre: 'País de procedencia',
    campo: 'paisProcedencia',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    mostrar: true,
    habilitado: true,
  }
];

export const CAMPOS_FORMULARIO_DATOS_DE_INSTALACION = [
  {
    id: 'numeroEstablecimiento',
    labelNombre: 'Número de establecimiento aprobado o autorizado',
    campo: 'numeroEstablecimiento',
    clase: 'col-md-8',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  },
  {
    id: 'coordenadasGeograficas',
    labelNombre: 'Coordenadas geográficas',
    campo: 'coordenadasGeograficas',
    clase: 'col-md-8',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4,
    mostrar: true,
    habilitado: true,
  }
];


export const CAMPOS_FORMULARIO_DATOS_PERSONALES_AGREGAR_DESTINATARIO = [

  {
    id: 'nombre',
    labelNombre: 'Nombre(s)',
    campo: 'nombre',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
        { tipo: 'required' },
        { tipo: 'pattern', valor: REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el nombre.' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
},
{
    id: 'primerApellido',
    labelNombre: 'primer apellido',
    campo: 'primerApellido',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
        { tipo: 'required' },
        { tipo: 'pattern', valor: REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el primer apellido.' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
},
{
    id: 'segundoApellido',
    labelNombre: 'Segundo apellido',
    campo: 'segundoApellido',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
        { tipo: 'pattern', valor: REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija el segundo apellido.' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
},
{
    id: 'razonSocial',
    labelNombre: 'Denominación/razón social',
    campo: 'razonSocial',
    clase: 'col-md-8',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
        { tipo: 'required' },
        { tipo: 'pattern', valor: REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija la denominación/razón social.' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 4
},
{
  id: '',
  labelNombre: '',
  campo: '',
  clase: 'col-md-4',
  tipoInput: '',
  desactivado: false,
  soloLectura: false,
  validadores: [],
  marcadorDePosicion: '',
  valorPredeterminado: '',
  marginTop: 0
},
  {
    id: 'pais',
    labelNombre: 'País',
    campo: 'pais',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: true,
    soloLectura: false,
    validadores: [
        { tipo: 'required' }
    ],
    opciones: [
        { id: '1', descripcion: 'MEXICO(ESTADOS UNIDOS MEXICANOS)' },
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '1',
    marginTop: 0
},
{
  id: 'codigoPostal',
  labelNombre: 'Código postal',
  campo: 'codigoPostal',
  clase: 'col-md-4',
  tipoInput: 'text',
  desactivado: false,
  soloLectura: false,
  validadores: [
      { tipo: 'pattern', valor:REGEX_POSTAL, mensaje: 'Debe contener sólo 5 números.' }
  ],
  marcadorDePosicion: '',
  valorPredeterminado: '',
  marginTop: 0
},
{
  id: 'estado',
  labelNombre: 'Estado',
  campo: 'estado',
  clase: 'col-md-4',
  tipoInput: 'select-catalogos',
  desactivado: false,
  soloLectura: false,
  validadores: [
      { tipo: 'required' },
  ],
  opciones: [
    { id: '1', descripcion:'VERACRUZ'},
],
  marcadorDePosicion: '',
  valorPredeterminado: '',
  marginTop: 0
},
{
  id: 'municipioAlcaldia',
  labelNombre: 'Municipio o Alcaldía',
  campo: 'municipioAlcaldia',
  clase: 'col-md-4',
  tipoInput: 'select-catalogos',
  desactivado: false,
  soloLectura: false,
  validadores: [
  ],
  opciones: [
    { id: '1', descripcion:'ALVARADO' },
],
  marcadorDePosicion: '',
  valorPredeterminado: '',
  marginTop: 4
},
{
  id: 'colonia',
  labelNombre: 'Colonia',
  campo: 'colonia',
  clase: 'col-md-4',
  tipoInput: 'select-catalogos',
  desactivado: false,
  soloLectura: false,
  validadores: [
  ],
  marcadorDePosicion: '',
  valorPredeterminado: '',
  marginTop: 4
},
  {
      id: 'calle',
      labelNombre: 'Calle',
      campo: 'calle',
      clase: 'col-md-4',
      tipoInput: 'text',
      desactivado: false,
      soloLectura: false,
      validadores: [
          { tipo: 'required' },
          { tipo: 'pattern', valor:REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL, mensaje: 'Por favor, corrija la calle.' }
      ],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 4
  },
  {
      id: 'numeroExterior',
      labelNombre: 'Número exterior',
      campo: 'numeroExterior',
      clase: 'col-md-4',
      tipoInput: 'number',
      desactivado: false,
      soloLectura: false,
      validadores: [
          { tipo: 'required' }
      ],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 4
  },
  {
      id: 'numeroInterior',
      labelNombre: 'Número interior',
      campo: 'numeroInterior',
      clase: 'col-md-4',
      tipoInput: 'number',
      desactivado: false,
      soloLectura: false,
      validadores: [],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 4
  },
  {
      id: '',
      labelNombre: '',
      campo: '',
      clase: 'col-md-4',
      tipoInput: '',
      desactivado: false,
      soloLectura: false,
      validadores: [],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0
  },
  {
    id: 'lada',
    labelNombre: 'Lada',
    campo: 'lada',
    clase: 'col-md-1',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'telefono',
    labelNombre: 'Teléfono',
    campo: 'telefono',
    clase: 'col-md-3',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
        { tipo: 'required' },
        { tipo: 'pattern', valor:REGEX_TELEFONO, mensaje: 'Por favor, corrija el teléfono.' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
},
  {
      id: 'correoElectronico',
      labelNombre: 'Correo electrónico',
      campo: 'correoElectronico',
      clase: 'col-md-4',
      tipoInput: 'text',
      desactivado: false,
      soloLectura: false,
      validadores: [
          { tipo: 'required' },
          { tipo: 'pattern', valor:REGEX_CORREO_ELECTRONICO, mensaje: 'Por favor, escriba una dirección de correo válida.' }
      ],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0
  }
];

export const FORMULARIO_DATOS_PROPIETARIO_NOMBRE = [
  
];


export const CONFIGURACION_MERCANCIAS = [
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: Mercancia): string => ele.fraccionArancelaria,
    orden: 1
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: Mercancia): string => ele.descripcionFraccion,
    orden: 2
  },
  {
    encabezado: 'Descripción de la mercancía',
    clave: (ele: Mercancia): string => ele.descripcion,
    orden: 3
  },
  {
    encabezado: 'Cantidad en UMT',
    clave: (ele: Mercancia): string => ele.cantidadUMT,
    orden: 4
  },
  {
    encabezado: 'Unidad de medida (UMT)',
    clave: (ele: Mercancia): string => ele.umt,
    orden: 5
  },
  {
    encabezado: 'Cantidad en UMC',
    clave: (ele: Mercancia): string => ele.cantidadUMC,
    orden: 6
  },
  {
    encabezado: 'Unidad de medida (UMC)',
    clave: (ele: Mercancia): string => ele.umc,
    orden: 7
  },
  {
    encabezado: 'Nombre común',
    clave: (ele: Mercancia): string => ele.nombreComun,
    orden: 8
  },
  {
    encabezado: 'Nombre científico',
    clave: (ele: Mercancia): string => ele.nombreCientifico,
    orden: 9
  },
  {
    encabezado: 'Fase de desarrollo',
    clave: (ele: Mercancia): string => ele.faseDesarrollo,
    orden: 10
  },
  {
    encabezado: 'Uso',
    clave: (ele: Mercancia): string => ele.uso,
    orden: 11
  },
  {
    encabezado: 'Otro uso',
    clave: (ele: Mercancia): string => ele.otroUso,
    orden: 12
  },
  {
    encabezado: 'Origen',
    clave: (ele: Mercancia): string => ele.origen,
    orden: 13
  },
  {
    encabezado: 'País de origen',
    clave: (ele: Mercancia): string => ele.paisOrigen,
    orden: 14
  },
  {
    encabezado: 'País de procedencia',
    clave: (ele: Mercancia): string => ele.paisProcedencia,
    orden: 15
  }
];

export const TIPO_PERSONA=[
  {
  label: "Física",
  value: 'Fisica'
  },
  {
    label: "Moral",
    value: 'Moral'
  }
]
