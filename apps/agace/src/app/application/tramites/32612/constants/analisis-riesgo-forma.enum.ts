export const CONFIGURACION = [
    {
      id: 'indiqueSi',
      row: 1,
      labelNombre: 'Indique si el procedimiento le permita identificar de forma permanente otras amenazas o riesgos en la cadena de suministros, que se originen por el resultado de algún incidente o por cambios en las condiciones iniciales de las instalaciones y procesos del Agente Aduanal.',
      campo: 'indiqueSi',
      clase: 'col-md-12',
      tipoInput: 'radio',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginTop: 4,
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
      id: 'senaleSi',
      row: 2,
      labelNombre: 'Señale si el procedimiento le permite identificar que las políticas, procedimientos y otros mecanismos de control y seguridad se estén cumpliendo.',
      campo: 'senaleSi',
      clase: 'col-md-12',
      tipoInput: 'radio',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginTop: 4,
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
      id: 'senaleQuienes',
      row: 3,
      labelNombre: 'Señale quienes conforman el Comité de Seguridad de la compañía (Nombre y puesto)',
      campo: 'senaleQuienes',
      clase: 'col-md-12',
      tipoInput: 'textarea',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginTop: 4,
    
    },
    {
      id: 'indiqueCuales',
      row: 4,
      labelNombre: 'Indique cuáles son las fuentes de información utilizadas para calificar los riesgos durante la fase de análisis',
      campo: 'indiqueCuales',
      clase: 'col-md-12',
      tipoInput: 'textarea',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginTop: 4,
    
    }
]

export const CONFIGURACION_POLITICAS = [
    {
      id: 'enunciarPoliticas',
      row: 1,
      labelNombre: 'Enunciar las políticas en materia de seguridad orientadas a prevenir, asegurar y reconocer amenazas en la cadena de suministros e instalaciones del Agente Aduanal',
      campo: 'enunciarPoliticas',
      clase: 'col-md-12',
      tipoInput: 'textarea',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginTop: 4,
    },
    {
      id: 'indiqueCompromiso',
      row: 2,
      labelNombre: 'Indique quién es el responsable de su revisión, firma y difusión hacia los empleados',
      campo: 'indiqueCompromiso',
      clase: 'col-md-12',
      tipoInput: 'textarea',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginTop: 4,
    },
    {
      id: 'indiqueActualizacion',
      row: 3,
      labelNombre: 'Indique la periodicidad con la que se lleva a cabo su actualización.',
      campo: 'indiqueActualizacion',
      clase: 'col-md-12',
      tipoInput: 'radio',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'textarea',
      marcadorDePosicion: '',
      marginTop: 4,
    },
    {
      id: 'indiqueSuministros',
      row: 4,
      labelNombre: 'Indique el programa y/o campaña de difusión que utiliza para comunicar a los empleados la política de seguridad en la cadena de suministros',
      campo: 'indiqueSuministros',
      clase: 'col-md-12',
      tipoInput: 'textarea',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginTop: 4,
    },
    {
      id: 'capacitacion',
      row: 5,
      labelNombre: 'Indique si realiza capacitación inicial y de reforzamiento de la política de seguridad en la cadena de suministros.',
      campo: 'capacitacion',
      clase: 'col-md-12',
      tipoInput: 'radio',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      layout: 'horizontal',
      marcadorDePosicion: '',
      marginTop: 4,
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