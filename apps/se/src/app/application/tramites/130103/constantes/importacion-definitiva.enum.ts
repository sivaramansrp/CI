export const DATOS_DEL_TRAMITE_REALIZER = [
    {
        id: 'solicitud',
        label_nombre: 'Solicitud',
        campo: 'solicitud',
        clase: 'col-md-4',
        tipo_input: 'radio',
        desactivado: false,
        solo_lectura: false,
        validadores: [
          { tipo: 'required' }
        ],
        marcador_de_posicion: '',
        margin_top: 3,
        opciones: [
            {
            "label": "Inicial", 
            "value": "inicial" 
           }
        ]
    },
    {
        id: 'regimen',
        label_nombre: 'Régimen al que se destinará la mercancía',
        campo: 'regimen',
        clase: 'col-md-8',
        tipo_input: 'select-catalogos',
        desactivado: false,
        solo_lectura: false,
        validadores: [
            { tipo: 'required' }
          ],
        marcador_de_posicion: 'Selecciona un valor',
    },
    {
      id: '',
      label_nombre: '',
      campo: '',
      clase: 'col-md-4',
      tipo_input: '',
      desactivado: false,
      solo_lectura: false,
      validadores: [],
      marcador_de_posicion: '',
  },
  {
    id: 'clasificacion',
    label_nombre: 'Clasificación del régimen',
    campo: 'clasificacion',
    clase: 'col-md-8',
    tipo_input: 'select-catalogos',
    desactivado: false,
    solo_lectura: false,
    validadores: [
        { tipo: 'required' }
      ],
    marcador_de_posicion: 'Selecciona un valor',
  },

]

export const DATOS_DE_LA_MERCANCIA = [
  {
    id: 'producto',
    label_nombre: 'Producto',
    campo: 'producto',
    clase: 'col-md-4',
    tipo_input: 'radio',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcador_de_posicion: '',
    margin_top: 3,
    opciones: [
        {
        "label": "Nuevo", 
        "value": "nuevo" 
       },
       {
        "label": "Usado", 
        "value": "usado" 
       }
    ]
  },
  {
    id: 'descripcion',
    label_nombre: 'Descripción de la mercancía',
    campo: 'descripcion',
    clase: 'col-md-8',
    tipo_input: 'textarea',
    desactivado: false,
    solo_lectura: false,
    validadores:[
      {
        tipo: 'required', mensaje: ''
      }
    ],
    marcador_de_posicion: '',
    margin_top: 3
  },
  {
    id: 'fraccion_arancelaria',
    label_nombre: 'Fracción Arancelaria',
    campo: 'fraccion_arancelaria',
    clase: 'col-md-12',
    tipo_input: 'select-catalogos',
    desactivado: false,
    solo_lectura: false,
    validadores: [
        { tipo: 'required' }
      ],
    marcador_de_posicion: 'Selecciona un valor',
  },
  {
    id: 'unidad_de_medida',
    label_nombre: 'Unidad de medida',
    campo: 'unidad_de_medida',
    clase: 'col-md-4',
    tipo_input: 'select-catalogos',
    desactivado: false,
    solo_lectura: false,
    validadores: [
        { tipo: 'required' }
      ],
    marcador_de_posicion: 'Selecciona un valor',
  },
  {
    id: 'cantidad',
    label_nombre: 'Cantidad',
    campo: 'cantidad',
    clase: 'col-md-4',
    tipo_input: 'number',
    desactivado: false,
    solo_lectura: false,
    validadores: [
        { tipo: 'required' }
      ],
    marcador_de_posicion: '',
  },
  {
    id: 'valor_factura_USD',
    label_nombre: 'Valor factura USD',
    campo: 'valor_factura_USD',
    clase: 'col-md-4',
    tipo_input: 'number',
    desactivado: false,
    solo_lectura: false,
    validadores: [
        { tipo: 'required' }
      ],
    marcador_de_posicion: '',
  },
]

export const PARTIDAS_DE_LA_MERCANCIA = [
  {
    id: 'cantidad',
    label_nombre: 'Cantidad',
    campo: 'cantidad',
    clase: 'col-md-4',
    tipo_input: 'number',
    desactivado: false,
    solo_lectura: false,
    validadores: [
        { tipo: 'required' }
      ],
    marcador_de_posicion: '',
  },
  {
    id: 'fraccion_arancelaria_tigie',
    label_nombre: 'Fracción Arancelaria TIGIE',
    campo: 'fraccion_arancelaria_tigie',
    clase: 'col-md-4',
    tipo_input: 'number',
    desactivado: false,
    solo_lectura: false,
    validadores: [
        { tipo: 'required' }
      ],
    marcador_de_posicion: '',
  },
  {
    id: '',
    label_nombre: '',
    campo: 'seleccion_fraccion',
    clase: 'col-md-4',
    tipo_input: 'select-catalogos',
    desactivado: false,
    solo_lectura: false,
    validadores: [
        { tipo: '' }
      ],
    marcador_de_posicion: 'Selecciona una fraccion',
    opciones: [
      {
        id: 1, descripcion: '87033302 Usados.'
      }
    ]
  },
  {
    id: 'descripcion',
    label_nombre: 'Descripción',
    campo: 'descripcion',
    clase: 'col-md-8',
    tipo_input: 'textarea',
    desactivado: false,
    solo_lectura: false,
    validadores:[
      {
        tipo: 'required', mensaje: ''
      }
    ],
    marcador_de_posicion: '',
    margin_top: 3
  },
  {
    id: 'valor_partida_usd',
    label_nombre: 'Valor partida USD',
    campo: 'valor_partida_usd',
    clase: 'col-md-4',
    tipo_input: 'number',
    desactivado: false,
    solo_lectura: false,
    validadores: [
        { tipo: 'required' }
      ],
    marcador_de_posicion: '',
  }
]

export const USO_ESPECIFICO_DE_LA_MERCANCIA = [
  {
    id: 'fraccion_arancelaria',
    label_nombre: 'Fracción arancelaria PROSEC (Especificar la fracción arancelaria del producto en el que se utilizará la mercancía a importar)',
    campo: 'fraccion_arancelaria',
    clase: 'col-md-8',
    tipo_input: 'select-catalogos',
    desactivado: false,
    solo_lectura: false,
    validadores: [
        { tipo: 'required' }
      ],
    marcador_de_posicion: 'Selecciona un valor'
  },
  {
    id: 'descripcion',
    label_nombre: 'Descripción fracción PROSEC (Especificar el nombre comercial o técnico del producto en el que se utilizará la mercancía a importar)',
    campo: 'descripcion',
    clase: 'col-md-8',
    tipo_input: 'textarea',
    desactivado: false,
    solo_lectura: false,
    validadores:[
      {
        tipo: 'required'
      }
    ],
    marcador_de_posicion: '',
    margin_top: 3
  },
]

export const CRITERIO_DE_DICTAMEN_DE_REGLA_OCTAVA = [
  {
    id: 'solicitud_mercancia',
    label_nombre: 'Solicitud mercancia esquema regla octava clave',
    campo: 'solicitud_mercancia',
    clase: 'col-md-8',
    tipo_input: 'select-catalogos',
    desactivado: false,
    solo_lectura: false,
    validadores: [
        { tipo: 'required' }
      ],
    marcador_de_posicion: 'Selecciona un valor'
  },
  {
    id: 'criterio_de_dictamen',
    label_nombre: 'Criterio de dictamen de regla octava seleccionado',
    campo: 'criterio_de_dictamen',
    clase: 'col-md-8',
    tipo_input: 'textarea',
    desactivado: true,
    solo_lectura: false,
    validadores:[
      {
        tipo: ''
      }
    ],
    marcador_de_posicion: '',
    margin_top: 3
  },
]