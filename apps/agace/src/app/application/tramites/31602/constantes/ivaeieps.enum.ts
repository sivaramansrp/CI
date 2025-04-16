
export const PERMISO_A_DESISTIR = [
  {
    id: 'manifieste',
    labelNombre: 'Manifieste si los proveedores nacionales señalados anteriormente, se encuentran a la fecha de presentación de la solicitud, en las publicaciones a que hace referencia el artículo 69-B, cuarto párrafo del CFF.',
    campo: 'manifieste',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcador_de_posicion: '',
    margin_top: 5,
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


export const PERMISO_A_DESISTIR_DOS = [
  {
    id: 'manifiesteSi',
    labelNombre: 'Manifieste si se le ha notificado algún crédito fiscal por parte del SAT en los últimos 12 meses anteriores a la fecha de presentación de la solicitud o acrediten que están al amparo del procedimiento previsto en el segundo parrafo, de la presente regla o, en su caso, hayan efectuado el pago del mismo.',
    campo: 'manifiesteSi',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcador_de_posicion: '',
    margin_top: 2,
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
    id: 'manifiesteCorrespondiente',
    labelNombre: 'Manifieste si se le ha emitido resolución de improcedencia de las devoluciones del IVA solicitadas en los últimos 6 meses, contados a partir de la fecha de presentación de la solicitud de certificación correspondiente',
    campo: 'manifiesteCorrespondiente',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcador_de_posicion: '',
    margin_top: 2,
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


export const PERMISO_A_DESISTIR_TRES = [
  {
    id: 'contado',
    labelNombre: 'Ha contado previamente con la Certificación en materia de IVA e IEPS, el Registro en el Esquema de Certificación de Empresas bajo la modalidad IVA e IEPS o Garantía del interés fiscal del IVA e IEPS.',
    campo: 'contado',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcador_de_posicion: '',
    margin_top: 2,
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
    id: 'caso',
    labelNombre: 'En caso afirmativo, señale si se encuentra al corriente en el cumplimiento de las obligaciones relativas al Anexo 30 sobre dicho registro:',
    campo: 'caso',
    clase: 'col-md-12',
    tipoInput: 'radio',
    desactivado: false,
    soloLectura: false,
    validadores: [
      
    ],
    layout: 'horizontal',
    marcador_de_posicion: '',
    margin_top: 2,
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


export const DE_LAS_SIGUIENTES = [
  {
    labelNombre: 'Que durante los últimos cuatro años o más han llevado a cabo operaciones al amparo del régimen para el cual solicitan la certificación en la modalidad de IVA e IEPS.',
    campo: 'durante',
    clase: 'col-md-12',
    tipoInput: 'checkbox',
    desactivado: false,
    marcador_de_posicion: '',
  },
  {
    labelNombre: 'Que durante los últimos 12 meses anteriores en promedio contaron con más de 1,000 empleados registrados ante el IMSS Número de empleados ante el IMSS.',
    campo: 'anteElImss',
    clase: 'col-md-12',
    tipoInput: 'checkbox',
    desactivado: false,
    marcador_de_posicion: '',
  },
  {
    labelNombre: 'Que el valor de su maquinaria y equipo es superior a los 50,000,000 de pesos.',
    campo: 'dePesos',
    clase: 'col-md-12',
    tipoInput: 'checkbox',
    desactivado: false,
    marcador_de_posicion: '',
  }
];

export const PAGO_DE_DERECHOS = [
  {
    id: 'claveDeReferencia',
    labelNombre: 'Clave de referencia',
    campo: 'claveDeReferencia',
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
    id: 'folioDePago',
    labelNombre: 'Folio de pago',
    campo: 'folioDePago',
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
    id: 'numeroDeOperacion',
    labelNombre: 'Numero de operación',
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
    id: 'cadenaDependencia',
    labelNombre: 'Cadena de la dependencia',
    campo: 'cadenaDependencia',
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
    id: 'banco',
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
    labelNombre: 'Fecha de pago',
    campo: 'fechaPago',
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
    id: 'importePago',
    labelNombre: 'Importe de pago',
    campo: 'importePago',
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
];