import { REGEX_SOLO_DIGITOS } from "@libs/shared/data-access-user/src/tramites/constantes/regex.constants";

/**
  * @constant DATOS_DEL_TRAMITE_REALIZAR
  * @description
  * Este objeto define la configuración de los campos del formulario para los datos del trámite realizar 
  * en el proceso de importación definitiva. Cada campo incluye propiedades como el identificador, 
  * nombre del campo, tipo de entrada, validadores, y opciones dinámicas.
  * 
  * Funcionalidad:
  * - Define los campos del formulario con sus respectivas configuraciones.
  * - Permite la validación y renderización dinámica de los campos en el formulario.
  * 
  * Campos:
  * - `solicitud`: Campo de tipo radio para seleccionar la solicitud inicial.
  * - `regimen`: Campo de tipo select-catalogos para seleccionar el régimen de la mercancía.
  * - `clasificacion`: Campo de tipo select-catalogos para seleccionar la clasificación del régimen.
  * 
  * @example
  * const solicitudField = DATOS_DEL_TRAMITE_REALIZAR.find(field => field.id === 'solicitud');
  * console.log(solicitudField.labelNombre); // "Solicitud"
  */
export const DATOS_DEL_TRAMITE_REALIZAR = [
  {
      id: 'solicitud',
      labelNombre: 'Solicitud',
      campo: 'solicitud',
      clase: 'col-md-4',
      tipoInput: 'radio',
      desactivado: false,
      soloLectura: false,
      validadores: [
        { tipo: 'required' }
      ],
      valorPredeterminado: 'inicial',
      marcadorDePosicion: '',
      marginTop: 0,
      opciones: [
          {
          "label": "Inicial", 
          "value": "inicial" 
         }
      ]
  },
  {
      id: 'regimen',
      labelNombre: 'Régimen al que se destinará la mercancía',
      campo: 'regimen',
      clase: 'col-md-8',
      tipoInput: 'select-catalogos',
      desactivado: false,
      soloLectura: false,
      validadores: [
          { tipo: 'required' }
        ],
      marcadorDePosicion: 'Selecciona un valor',
      valorPredeterminado: '',
      marginTop: 0
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
  id: 'clasificacion',
  labelNombre: 'Clasificación del régimen',
  campo: 'clasificacion',
  clase: 'col-md-8',
  tipoInput: 'select-catalogos',
  desactivado: false,
  soloLectura: false,
  validadores: [
      { tipo: 'required' }
    ],
  marcadorDePosicion: 'Selecciona un valor',
  valorPredeterminado: '',
  marginTop: 0
},
];

/**
  * @constant DATOS_DE_LA_MERCANCIA
  * @description
  * Este objeto define la configuración de los campos del formulario para los datos de la mercancía 
  * en el proceso de importación definitiva. Cada campo incluye propiedades como el identificador, 
  * nombre del campo, tipo de entrada, validadores, y opciones dinámicas.
  * 
  * Funcionalidad:
  * - Define los campos del formulario con sus respectivas configuraciones.
  * - Permite la validación y renderización dinámica de los campos en el formulario.
  * 
  * Campos:
  * - `producto`: Campo de tipo radio para seleccionar si el producto es nuevo o usado.
  * - `descripcion`: Campo de tipo textarea para describir la mercancía.
  * - `fraccion_arancelaria`: Campo de tipo select-catalogos para seleccionar la fracción arancelaria.
  * - `unidad_de_medida`: Campo de tipo select-catalogos para seleccionar la unidad de medida.
  * - `cantidad`: Campo de tipo number para ingresar la cantidad de la mercancía.
  * - `valor_factura_USD`: Campo de tipo number para ingresar el valor de la factura en USD.
  * 
  * @example
  * const productoField = DATOS_DE_LA_MERCANCIA.find(field => field.id === 'producto');
  * console.log(productoField.labelNombre); // "Producto"
  */
export const DATOS_DE_LA_MERCANCIA = [
  {
    id: 'producto',
    labelNombre: 'Producto',
    campo: 'producto',
    clase: 'col-md-4',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: 'nuevo',
    marginTop: 0,
    layout: 'vertical',
    opciones: [
      {
        label: 'Nuevo',
        value: 'nuevo'
      },
      {
        label: 'Usado',
        value: 'usado'
      }
    ]
  },
  {
    id: 'descripcion',
    labelNombre: 'Descripción de la mercancía',
    campo: 'descripcion',
    clase: 'col-md-8',
    tipoInput: 'textarea',
    desactivado: false,
    soloLectura: false,
    validadores: [
      {
        tipo: 'required',
        mensaje: ''
      }
    ],
    marcadorDePosicion: '',
    marginTop: 0
  },
  {
    id: 'fraccion_arancelaria',
    labelNombre: 'Fracción Arancelaria',
    campo: 'fraccion_arancelaria',
    clase: 'col-md-12',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marginTop: 0,
    marcadorDePosicion: 'Selecciona un valor'
  },
  {
    id: 'unidad_de_medida',
    labelNombre: 'Unidad de medida',
    campo: 'unidad_de_medida',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: 'Selecciona un valor',
    marginTop: 0
  },
  {
    id: 'cantidad',
    labelNombre: 'Cantidad',
    campo: 'cantidad',
    clase: 'col-md-4',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    marginTop: 0
  },
  {
    id: 'valor_factura_USD',
    labelNombre: 'Valor factura USD',
    campo: 'valor_factura_USD',
    clase: 'col-md-4',
    tipoInput: 'number',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    marginTop: 0
  }
];

/**
  * @constant PARTIDAS_DE_LA_MERCANCIA
  * @description
  * Este objeto define la configuración de los campos del formulario para las partidas de la mercancía 
  * en el proceso de importación definitiva. Cada campo incluye propiedades como el identificador, 
  * nombre del campo, tipo de entrada, validadores, y opciones dinámicas.
  * 
  * Funcionalidad:
  * - Define los campos del formulario con sus respectivas configuraciones.
  * - Permite la validación y renderización dinámica de los campos en el formulario.
  * 
  * Campos:
  * - `cantidad`: Campo de tipo number para ingresar la cantidad de la mercancía.
  * - `fraccion_arancelaria_tigie`: Campo de tipo number para ingresar la fracción arancelaria TIGIE.
  * - `seleccion_fraccion`: Campo de tipo select-catalogos para seleccionar una fracción específica.
  * - `descripcion`: Campo de tipo textarea para describir la mercancía.
  * - `valor_partida_usd`: Campo de tipo number para ingresar el valor de la partida en USD.
  * 
  * @example
  * const cantidadField = PARTIDAS_DE_LA_MERCANCIA.find(field => field.id === 'cantidad');
  * console.log(cantidadField.labelNombre); // "Cantidad"
  */
export const PARTIDAS_DE_LA_MERCANCIA = [
  {
    id: 'cantidad',
    labelNombre: 'Cantidad',
    campo: 'cantidad',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' },
      { tipo: 'pattern', valor: REGEX_SOLO_DIGITOS, mensaje: 'Por favor, escribe un número entero válido' }
    ],
    marcadorDePosicion: '',
    marginTop: 0
  },
  {
    id: 'fraccion_arancelaria_tigie',
    labelNombre: 'Fracción Arancelaria TIGIE',
    campo: 'fraccion_arancelaria_tigie',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' },
      { tipo: 'pattern', valor: REGEX_SOLO_DIGITOS, mensaje: 'Por favor, escribe un número entero válido' }
    ],
    marcadorDePosicion: '',
    marginTop: 0
  },
  {
    id: '',
    labelNombre: '',
    campo: 'seleccion_fraccion',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: '' }
    ],
    marcadorDePosicion: 'Selecciona una fracción',
    opciones: [
      {
        id: 1,
        descripcion: '87033302 Usados.'
      }
    ],
    marginTop: 0
  },
  {
    id: 'descripcion',
    labelNombre: 'Descripción',
    campo: 'descripcion',
    clase: 'col-md-8',
    tipoInput: 'textarea',
    desactivado: false,
    soloLectura: false,
    validadores: [
      {
        tipo: 'required',
        mensaje: ''
      }
    ],
    marcadorDePosicion: '',
    marginTop: 0
  },
  {
    id: 'valor_partida_usd',
    labelNombre: 'Valor partida USD',
    campo: 'valor_partida_usd',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' },
      { tipo: 'pattern', valor: REGEX_SOLO_DIGITOS, mensaje: 'Por favor, escribe un número entero válido' }
    ],
    marcadorDePosicion: '',
    marginTop: 0
  }
];

/**
  * @constant USO_ESPECIFICO_DE_LA_MERCANCIA
  * @description
  * Este objeto define la configuración de los campos del formulario para el uso específico de la mercancía 
  * en el proceso de importación definitiva. Cada campo incluye propiedades como el identificador, 
  * nombre del campo, tipo de entrada, validadores, y opciones dinámicas.
  * 
  * Funcionalidad:
  * - Define los campos del formulario con sus respectivas configuraciones.
  * - Permite la validación y renderización dinámica de los campos en el formulario.
  * 
  * Campos:
  * - `fraccion_arancelaria`: Campo de tipo select-catalogos para especificar la fracción arancelaria del producto.
  * - `descripcion`: Campo de tipo textarea para describir el nombre comercial o técnico del producto.
  * 
  * @example
  * const fraccionField = USO_ESPECIFICO_DE_LA_MERCANCIA.find(field => field.id === 'fraccion_arancelaria');
  * console.log(fraccionField.labelNombre); // "Fracción arancelaria PROSEC"
  */
export const USO_ESPECIFICO_DE_LA_MERCANCIA = [
  {
    id: 'fraccion_arancelaria',
    labelNombre: 'Fracción arancelaria PROSEC (Especificar la fracción arancelaria del producto en el que se utilizará la mercancía a importar)',
    campo: 'fraccion_arancelaria',
    clase: 'col-md-8',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: 'Selecciona un valor',
    marginTop: 0,
  },
  {
    id: 'descripcion',
    labelNombre: 'Descripción fracción PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizará la mercancía a importar)',
    campo: 'descripcion',
    clase: 'col-md-8',
    tipoInput: 'textarea',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    marginTop: 0
  },
];

/**
  * @constant CRITERIO_DE_DICTAMEN_DE_REGLA_OCTAVA
  * @description
  * Este objeto define la configuración de los campos del formulario para el criterio de dictamen 
  * de la regla octava en el proceso de importación definitiva. Cada campo incluye propiedades como 
  * el identificador, nombre del campo, tipo de entrada, validadores, y opciones dinámicas.
  * 
  * Funcionalidad:
  * - Define los campos del formulario con sus respectivas configuraciones.
  * - Permite la validación y renderización dinámica de los campos en el formulario.
  * 
  * Campos:
  * - `solicitud_mercancia`: Campo de tipo select-catalogos para seleccionar la solicitud de mercancía.
  * - `criterio_de_dictamen`: Campo de tipo textarea para mostrar el criterio de dictamen seleccionado.
  * 
  * @example
  * const solicitudField = CRITERIO_DE_DICTAMEN_DE_REGLA_OCTAVA.find(field => field.id === 'solicitud_mercancia');
  * console.log(solicitudField.labelNombre); // "Solicitud mercancia esquema regla octava clave"
  */
export const CRITERIO_DE_DICTAMEN_DE_REGLA_OCTAVA = [
  {
    id: 'solicitud_mercancia',
    labelNombre: 'Solicitud mercancia esquema regla octava clave',
    campo: 'solicitud_mercancia',
    clase: 'col-md-8',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: 'Selecciona un valor',
    marginTop: 0,
  },
  {
    id: 'criterio_de_dictamen',
    labelNombre: 'Criterio de dictamen de regla octava seleccionado',
    campo: 'criterio_de_dictamen',
    clase: 'col-md-8',
    tipoInput: 'textarea',
    desactivado: true,
    soloLectura: false,
    validadores: [
      { tipo: '' }
    ],
    marcadorDePosicion: '',
    marginTop: 0
  },
];

/**
  * @constant SELECCION
  * @description
  * Este objeto define las constantes utilizadas para la selección en el proceso de importación definitiva.
  * 
  * Funcionalidad:
  * - Proporciona una constante para seleccionar todos los elementos.
  * 
  * Campos:
  * - `SELECT_ALL`: Constante utilizada para seleccionar todos los elementos.
  * 
  * @example
  * console.log(SELECCION.SELECT_ALL); // "selectAll"
  */
export const SELECCION = {
  SELECT_ALL: 'selectAll',
};

/**
  * @constant CROSLISTA_DE_PAISES
  * @description
  * Este arreglo define una lista de países utilizados en el proceso de importación definitiva.
  * 
  * Funcionalidad:
  * - Proporciona una lista de países para ser utilizados en formularios o configuraciones relacionadas.
  * 
  * Campos:
  * - `ESTADOS UNIDOS DE AMERICA`: País incluido en la lista.
  * - `CANADA`: País incluido en la lista.
  * 
  * @example
  * console.log(CROSLISTA_DE_PAISES); // ["ESTADOS UNIDOS DE AMERICA", "CANADA"]
  */
export const CROSLISTA_DE_PAISES: string[] = [
  "ESTADOS UNIDOS DE AMERICA",
  "CANADA"
];

/**
  * @constant PAIS_PROCEDENCIA
  * @description
  * Este objeto define la configuración de los campos del formulario para el país de procedencia 
  * en el proceso de importación definitiva. Cada campo incluye propiedades como el identificador, 
  * nombre del campo, tipo de entrada, validadores, y opciones dinámicas.
  * 
  * Funcionalidad:
  * - Define los campos del formulario con sus respectivas configuraciones.
  * - Permite la validación y renderización dinámica de los campos en el formulario.
  * 
  * Campos:
  * - `bloque`: Campo de tipo select-catalogos para seleccionar un bloque de países.
  * - `todos_los_paises`: Campo de tipo botón para seleccionar todos los países.
  * 
  * @example
  * const bloqueField = PAIS_PROCEDENCIA.find(field => field.id === 'bloque');
  * console.log(bloqueField.labelNombre); // "Bloque"
  */
export const PAIS_PROCEDENCIA = [
  {
    id: 'bloque',
    labelNombre: 'Bloque',
    campo: 'bloque',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: '' }
    ],
    marcadorDePosicion: 'Selecciona un valor',
    marginTop: 0
  },
  {
    id: 'todos_los_paises',
    labelNombre: 'Todos los países',
    campo: 'todos_los_paises',
    clase: 'col-md-8',
    tipoInput: 'button',
    desactivado: false,
    marginTop: 5
  },
];

/**
  * @constant REPRESENTACION_FEDERAL
  * @description
  * Este objeto define la configuración de los campos del formulario para la representación federal 
  * en el proceso de importación definitiva. Cada campo incluye propiedades como el identificador, 
  * nombre del campo, tipo de entrada, validadores, y opciones dinámicas.
  * 
  * Funcionalidad:
  * - Define los campos del formulario con sus respectivas configuraciones.
  * - Permite la validación y renderización dinámica de los campos en el formulario.
  * 
  * Campos:
  * - `entidad`: Campo de tipo select-catalogos para seleccionar la entidad federativa.
  * - `reprsentation_federal`: Campo de tipo select-catalogos para seleccionar la representación federal.
  * 
  * @example
  * const entidadField = REPRESENTACION_FEDERAL.find(field => field.id === 'entidad');
  * console.log(entidadField.labelNombre); // "Entidad federativa"
  */
export const REPRESENTACION_FEDERAL = [
  {
    id: 'entidad',
    labelNombre: 'Entidad federativa',
    campo: 'entidad',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: 'Selecciona un valor',
    marginTop: 0
  },
  {
    id: 'reprsentation_federal',
    labelNombre: 'Representación federal',
    campo: 'reprsentation_federal',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: 'Selecciona una opcion',
    marginTop: 0
  },
];
  