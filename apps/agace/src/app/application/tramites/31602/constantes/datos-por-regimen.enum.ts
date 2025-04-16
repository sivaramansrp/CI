
export const INDIQUE_SI_REALIZA = [
    {
      id: 'indiqueSiRealiza',
      labelNombre: 'Indique si realiza o realizará importaciones temporales de mercancías de las fracciones arancelarias listadas en el Anexo II del Decreto IMMEX y/o de las fracciones arancelarias listadas en el Anexo 28.',
      campo: 'indiqueSiRealiza',
      clase: 'col-md-12',
      tipoInput: 'radio',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginTop: 5,
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
];


export const DEPOSITO_FISCAL = [
    {
      id: 'cancelacion',
      labelNombre: 'Indique si se encuentra sujeto a un procedimiento de cancelación',
      campo: 'cancelacion',
      clase: 'col-md-12',
      tipoInput: 'radio',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginTop: 5,
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
      id: 'cumplimientoReglas',
      labelNombre: 'Indique si ha cumplido adecuadamente con los requisitos de las reglas 4.5.30 y 4.5.32.',
      campo: 'cumplimientoReglas',
      clase: 'col-md-12',
      tipoInput: 'radio',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginTop: 5,
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
];

export const ELABORACION = [
  {
    id: 'indiqueCancelacion',
    labelNombre: 'Indique si se encuentra sujeto a un procedimiento de cancelación',
    campo: 'indiqueCancelacion',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcadorDePosicion: '',
    marginTop: 5,
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
    id: 'comercioExterior',
    labelNombre: 'Indique si cumple con los lineamientos que determinen las autoridades aduaneras para el control, vigilancia y seguridad del recinto y de las mercancías del comercio exterior.',
    campo: 'comercioExterior',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcadorDePosicion: '',
    marginTop: 5,
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
];

export const RECINTO_FISCALIZADO = [
  {
    id: 'recintoEstrategico',
    labelNombre: 'Indique si se encuentra sujeto a un procedimiento de cancelación',
    campo: 'recintoEstrategico',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcadorDePosicion: '',
    marginTop: 5,
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
    id: 'cumplimientoLineamientos',
    labelNombre: 'Indique si cumple con los lineamientos que determinan las autoridades aduaneras para el control, vigilancia y seguridad del recinto y de las mercancías del comercio exterior.',
    campo: 'cumplimientoLineamientos',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcadorDePosicion: '',
    marginTop: 5,
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
];


export const IMPORTACION_TEMPORAL = [
  {
    id: 'indique',
    labelNombre: 'Indique si durante los últimos doce meses, el valor de la mercancía transformada y retornada, retornada en su mismo estado, o a la que se le prestó un servicio, durante dicho periodo representa al menos el 80% del valor de las importaciones temporales de insumos durante el mismo periodo. (Declare solo aquellos conceptos que le apliquen).',
    campo: 'indique',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcadorDePosicion: '',
    marginTop: 5,
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
    id: 'empresaSolicitante',
    labelNombre: '¿La empresa solicitante ha realizado operaciones al amparo del Programa IMMEX en al menos los 12 meses previos a la solicitud?',
    campo: 'empresaSolicitante',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcadorDePosicion: '',
    marginTop: 5,
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
    id: 'captureElValorTotal',
    labelNombre: 'Capture el valor total en moneda nacional de sus importaciones temporales de materiales directos e insumos del periodo requerido conforme al párrafo anterior',
    campo: 'captureElValorTotal',
    clase: 'col-md-12',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0
  }
];