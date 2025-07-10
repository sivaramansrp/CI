export const RADIO_OPCIONS = [
  { label: 'Si Autorizo', value: 'Si' },
  { label: 'No Autorizo', value: 'No' },
];
export const CONFIGURACION = [
    {
      id: 'senaleSi',
      row: 1,
      labelNombre: 'Señale si a la fecha de la presentación de su solicitud la patente aduanal se encuentra activa.',
      campo: 'senaleSi',
      clase: 'col-md-12',
      tipoInput: 'radio',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginBottom: 5,
      opciones: [
          {
          "label": "Si",
          "value": "Si"
         },
          {
          "label": "No",
          "value": "No"
         }
      ]
    },
    {
      id: 'presentacion',
      row: 2,
      labelNombre: 'Señale si a la fecha de la presentación la patente aduanal se encuentra sujeta a un proceso de suspensión, cancelación, extinción inhabilitación o suspensión voluntaria a que se refieren los artículos 164, 165 y 166 de la Ley.',
      campo: 'presentacion',
      clase: 'col-md-12',
      tipoInput: 'radio',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginBottom: 5,
      opciones: [
          {
          "label": "Si",
          "value": "Si"
         },
          {
          "label": "No",
          "value": "No"
         }
      ]
    },
    {
      id: 'manifesteSi',
      row: 3,
      labelNombre: 'Manifieste si cumple con los estándares mínimos en materia de seguridad establecidos en el formato denominado Perfil del Agente Aduanal.',
      campo: 'manifesteSi',
      clase: 'col-md-12',
      tipoInput: 'radio',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginBottom: 5,
      opciones: [
          {
          "label": "Si",
          "value": "Si"
         },
          {
          "label": "No",
          "value": "No"
         }
      ]
    }
]

export const CONFIGURACION_COMERCIAL_CERTIFICADO = [

    {
        id: 'rfc',
        row: 1,
        labelNombre: 'RFC',
        campo: 'rfc',
        clase: 'col-md-12',
        tipoInput: 'radio',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        layout: 'horizontal',
        marcadorDePosicion: '',
        marginBottom: 5,
        opciones: [
        { label: 'Si', value: 'Si' },
        { label: 'No', value: 'No' }
        ]
    },
    {
        id: 'nombreORazonSocial',
        row: 2,
        labelNombre: 'Nombre o Razón Social',
        campo: 'nombreORazonSocial',
        clase: 'col-md-12',
        tipoInput: 'radio',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        layout: 'horizontal',
        marcadorDePosicion: '',
        marginBottom: 5,
        opciones: [
        { label: 'Si', value: 'Si' },
        { label: 'No', value: 'No' }
        ]
    },
    {
        id: 'direccionFiscal',
        row: 3,
        labelNombre: 'Dirección Fiscal',
        campo: 'direccionFiscal',
        clase: 'col-md-12',
        tipoInput: 'radio',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        layout: 'horizontal',
        marcadorDePosicion: '',
        marginBottom: 5,
        opciones: [
        { label: 'Si', value: 'Si' },
        { label: 'No', value: 'No' }
        ]
    },
    {
        id: 'paginaElectronica',
        row: 4,
        labelNombre: 'Página Electrónica',
        campo: 'paginaElectronica',
        clase: 'col-md-12',
        tipoInput: 'radio',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        layout: 'horizontal',
        marcadorDePosicion: '',
        marginBottom: 5,
        opciones: [
        { label: 'Si', value: 'Si' },
        { label: 'No', value: 'No' }
        ]
    },
    {
        id: 'correoElectronico',
        row: 5,
        labelNombre: 'Correo Electrónico de contacto',
        campo: 'correoElectronico',
        clase: 'col-md-12',
        tipoInput: 'radio',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        layout: 'horizontal',
        marcadorDePosicion: '',
        marginBottom: 5,
        opciones: [
        { label: 'Si', value: 'Si' },
        { label: 'No', value: 'No' }
        ]
    },
    {
        id: 'telefonoContacto',
        row: 6,
        labelNombre: 'Teléfono de contacto',
        campo: 'telefonoContacto',
        clase: 'col-md-12',
        tipoInput: 'radio',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        layout: 'horizontal',
        marcadorDePosicion: '',
        marginBottom: 5,
        opciones: [
        { label: 'Si', value: 'Si' },
        { label: 'No', value: 'No' }
        ]
    },
    {
        id: 'pagina',
        row: 4,
        labelNombre: '',
        campo: 'pagina',
        clase: 'col-md-12',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
          {
          tipo: 'required'
          }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0,
        mostrar: false
    },
    {
        id: 'correo',
        row: 5,
        labelNombre: '',
        campo: 'correo',
        clase: 'col-md-12',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
          {
          tipo: 'required'
          }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0,
        mostrar: false
    },
    {
        id: 'lada',
        row: 6,
        labelNombre: 'Lada',
        campo: 'lada',
        clase: 'col-md-2',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
          {
          tipo: 'required'
          }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0,
        mostrar: false
    },
    {
        id: 'telefonoUno',
        row: 6,
        labelNombre: 'Teléfono',
        campo: 'telefonoUno',
        clase: 'col-md-7',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
          {
          tipo: 'required'
          }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0,
        mostrar: false
    },
      {
        id: 'ladaDos',
        row: 7,
        labelNombre: 'Lada',
        campo: 'ladaDos',
        clase: 'col-md-2',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
          {
          tipo: 'required'
          }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 2,
        mostrar: false
    },
    {
        id: 'telefonoDos',
        row: 7,
        labelNombre: 'Teléfono',
        campo: 'telefonoDos',
        clase: 'col-md-7',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
          {
          tipo: 'required'
          }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 2,
        mostrar: false
    },
    {
        id: 'ladatres',
        row: 8,
        labelNombre: 'Lada',
        campo: 'ladaTres',
        clase: 'col-md-2',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
          {
          tipo: 'required'
          }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 2,
        mostrar: false
    },
    {
        id: 'telefonoTres',
        row: 8,
        labelNombre: 'Teléfono',
        campo: 'telefonoTres',
        clase: 'col-md-7',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [
          {
          tipo: 'required'
          }
        ],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 2,
        mostrar: false
    }

]

export const CLASIFICACION = [
    {
        id: 'proporcionada',
        row: 1,
        labelNombre: 'La información proporcionada, durante este trámite para el Registro de Certificación de Empresas es clasificada por la empresa como:',
        campo: 'proporcionada',
        clase: 'col-md-12',
        tipoInput: 'radio',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        layout: 'horizontal',
        marcadorDePosicion: '',
        marginBottom: 5,
        opciones: [
        { label: 'Pública', value: 'Si' },
        { label: 'Privada', value: 'No' }
        ]
    } 
]

export const PAGO_DE_DERECHOS = [
  {
    id: 'claveDeReferencia',
    row: 1,
    labelNombre: 'Clave de referencia',
    campo: 'claveDeReferencia',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'numeroDeOperacion',
    row: 1,
    labelNombre: 'Número de operación',
    campo: 'numeroDeOperacion',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      {
      tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
    },
    
  {
    id: 'cadenaDeDependencia',
    row: 2,
    labelNombre: 'Cadena de la dependencia',
    campo: 'cadenaDeDependencia',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'banco',
    row: 2,
    labelNombre: 'Banco',
    campo: 'banco',
    clase: 'col-md-6',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'llaveDePago',
    row: 3,
    labelNombre: 'Llave de pago',
    campo: 'llaveDePago',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
  {
    id: 'fechaPago',
    row: 3,
    labelNombre: 'Fecha de pago',
    campo: 'fechaPago',
    clase: 'col-md-4',
    tipoInput: 'date',
    desactivado: false,
    soloLectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true
  },
  {
    id: 'importePago',
    row: 3,
    labelNombre: 'Importe de pago',
    campo: 'importePago',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  },
];