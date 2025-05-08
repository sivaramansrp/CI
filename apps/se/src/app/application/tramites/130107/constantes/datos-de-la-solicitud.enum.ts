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
  