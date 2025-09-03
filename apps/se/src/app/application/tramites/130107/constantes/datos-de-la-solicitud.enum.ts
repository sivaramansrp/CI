/**
 * @constant DATOS_DEL_TRAMITE
 * @description
 * Arreglo de objetos que define la configuración de los campos del formulario relacionados
 * con los datos generales del trámite. Incluye controles como tipo de solicitud, régimen 
 * y clasificación del régimen, con sus propiedades visuales, de validación y comportamiento.
 */
export const DATOS_DEL_TRAMITE = [
  {
    id: 'solicitud',
    labelNombre: 'Solicitud',
    campo: 'solicitud',
    clase: 'col-md-4',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      /**
       * @property {string} tipo - Tipo de validador aplicado (por ejemplo, 'required').
       */
      { tipo: 'required' }
    ],
    valorPredeterminado: 'inicial',
    marcadorDePosicion: '',
    marginTop: 0,
    opciones: [
      /**
       * @property {string} label - Texto que se muestra como opción.
       * @property {string} value - Valor que se enviará al modelo si se selecciona.
       */
      {
        label: 'Inicial',
        value: 'inicial'
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
    marcadorDePosicion: 'Seleccione una opción',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: '',
    labelNombre: ' ',
    campo: '',
    clase: 'col-md-4',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
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
    marcadorDePosicion: 'Seleccione una opción',
    valorPredeterminado: '',
    marginTop: 0
  },
];


/**
 * @constant DATOS_DE_LA_MERCANCIA
 * @description
 * Configuración de los campos dinámicos relacionados con los datos de la mercancía.
 * Incluye información sobre el producto, descripción, fracción arancelaria, cantidad, valor en USD y UMT.
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
    labelNombre: 'Fracción arancelaria',
    campo: 'fraccion_arancelaria',
    clase: 'col-md-12',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: 'Seleccione una opción',
    marginTop: 0
  },
  {
    id: 'cantidad',
    labelNombre: 'Cantidad',
    campo: 'cantidad',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    marginTop: 0
  },
  {
    id: 'usd',
    labelNombre: 'Valor factura USD',
    campo: 'usd',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    marginTop: 0
  },
  {
    id: 'umt',
    labelNombre: 'UMT',
    campo: 'umt',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: 'Seleccione una opción',
    marginTop: 0
  },
];

/**
 * @constant PARTIDAS_DE_LA_MERCANCIA
 * @description
 * Configuración de los campos dinámicos relacionados con las partidas de la mercancía.
 * Incluye información sobre la cantidad, valor en USD y descripción.
 */
export const PARTIDAS_DE_LA_MERCANCIA = [
  {
    id: 'partidasCantidad',
    labelNombre: 'Cantidad',
    campo: 'partidasCantidad',
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
    id: 'valorPartidaUsd',
    labelNombre: 'Valor partida USD',
    campo: 'valorPartidaUsd',
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
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-4',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
    marcadorDePosicion: '',
    marginTop: 0
  },
  {
    id: 'descripcion',
    labelNombre: 'Descripción',
    campo: 'partidasDescripcion',
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
];

/**
 * @constant PARTIDAS
 * @description
 * Configuración de los campos dinámicos relacionados con las partidas totales.
 * Incluye información sobre la cantidad total y el valor total en USD.
 */
export const PARTIDAS = [
  {
    id: 'cantidadTotal',
    labelNombre: 'Cantidad total',
    campo: 'cantidadTotal',
    clase: 'col-md-4',
    tipoInput: 'number',
    desactivado: true,
    soloLectura: false,
    marcadorDePosicion: '',
    marginTop: 0
  },
  {
    id: 'valorTotalUsd',
    labelNombre: 'Valor total USD',
    campo: 'valorTotalUsd',
    clase: 'col-md-4',
    tipoInput: 'number',
    desactivado: true,
    soloLectura: false,
    marcadorDePosicion: '',
    marginTop: 0
  },
];

/**
 * @constant PAIS_PROCEDENCIA
 * @description
 * Configuración de los campos dinámicos relacionados con el país de procedencia.
 * Incluye información sobre el bloque y la selección de todos los países.
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
    marcadorDePosicion: 'Seleccione una opción',
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

export const PAIS_PROCEDENCIA_TODOS = [
  {
    id: 'mercancía',
    labelNombre: 'Uso(s) específico(s) de la mercancía',
    campo: 'mercancía',
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
    id: 'obtiene',
    labelNombre: 'Justificación y beneficio que se obtiene',
    campo: 'obtiene',
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
    id: 'Observaciones',
    labelNombre: 'Observaciones',
    campo: 'Observaciones',
    clase: 'col-md-8',
    tipoInput: 'textarea',
    desactivado: false,
    soloLectura: false,
    marcadorDePosicion: '',
    marginTop: 0
  },
]

export const CROSLISTA_DE_PAISES: string[] = [
  "ESTADOS UNIDOS DE AMERICA",
  "CANADA"
];

/**
 * @constant REPRESENTACION_FEDERAL
 * @description
 * Configuración de los campos dinámicos relacionados con la representación federal.
 * Incluye información sobre la entidad federativa y la representación federal.
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
    marcadorDePosicion: 'Seleccione una opción',
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
    marcadorDePosicion: 'Seleccione una opción',
    marginTop: 0
  },
];

export const PLANTILLA_PRODUCTO = {
  unidad_de_medida: 'Kilogramo',
  fraccion_arancelaria_tigie: '9099',
  precio_unitario: "100"
};
