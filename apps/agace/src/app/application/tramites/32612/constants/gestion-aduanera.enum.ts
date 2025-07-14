export const CONFIGURACION_GESTION = [
    {
      id: 'manera',
      row: 4,
      labelNombre: '',
      campo: 'manera',
      clase: 'col-md-12',
      tipoInput: 'textarea',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      marcadorDePosicion: '',
      marginTop: 4
    }
]

export const CONFIGURACION_CONTROL = [
    {
        id: 'manera',
        row: 1,
        labelNombre: 'Indique si cuenta con un procedimiento documentado que describa el control de los gafetes oficiales para el personal que ingresa a los recintos fiscales.',
        campo: 'manera',
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

export const CONFIGURACION_ACTUALIZADA = [
    {
        id: 'cuenta',
        row: 1,
        labelNombre: 'Indique si cuenta con una relación actualizada de los gafetes solicitados, así como los que se han dado de baja.',
        campo: 'cuenta',
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
      id: 'proceso',
      row: 2,
      labelNombre: '',
      campo: 'proceso',
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
        id: 'evidencia',
        row: 3,
        labelNombre: 'Indique si cuenta con la evidencia correspondiente que ampare las evaluaciones y certificaciones de los temas antes mencionados.',
        campo: 'evidencia',
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