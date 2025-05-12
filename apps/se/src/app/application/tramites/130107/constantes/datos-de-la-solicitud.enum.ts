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
      marcadorDePosicion: 'Selecciona un valor',
      marginTop: 0
    },
  ];

  export const PARTIDAS_DE_LA_MERCANCIA = [
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
];

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
  