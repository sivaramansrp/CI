export const BANDEJA_SOLICITUDES_FORMAS = [
    {
        id: 'solicitudId',
        labelNombre: 'Id solicitud',
        campo: 'solicitudId',
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
    },
    {
        id: 'fechaInicial',
        labelNombre: 'Fecha inicial',
        campo: 'fechaInicial',
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
        id: 'fechaFinal',
        labelNombre: 'Fecha final',
        campo: 'fechaFinal',
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
  ];

  export const BANDEJA_DE_TAREAS_PENDIENTES_FORMA = [
    {
      id: 'folio',
      labelNombre: 'Folio',
      campo: 'folio',
      clase: 'col-md-6',
      tipoInput: 'text',
      desactivado: false,
      soloLectura: false,
      validadores: [
      
      ],
      marcadorDePosicion: '',
    },
    {
      id: 'informacionAdicional',
      labelNombre: 'Información adicional',
      campo: 'informacionAdicional',
      clase: 'col-md-6',
      tipoInput: 'text',
      desactivado: false,
      soloLectura: false,
      validadores: [
       
      ],
      marcadorDePosicion: '',
    },
    {
      id: 'fechaInicial',
      labelNombre: 'Fecha inicial',
      campo: 'fechaInicial',
      clase: 'col-md-6',
      tipoInput: 'date',
      desactivado: false,
      soloLectura: false,
      validadores: [
        
      ],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0,
      habilitado: true
    },
    {
      id: 'fechaFinal',
      labelNombre: 'Fecha final',
      campo: 'fechaFinal',
      clase: 'col-md-6',
      tipoInput: 'date',
      desactivado: false,
      soloLectura: false,
      validadores: [
       
      ],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0,
      habilitado: true
    },
    {
      id: 'departamento',
      labelNombre: 'Nombre del departamento',
      campo: 'departamento',
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
      id: 'procedimiento',
      labelNombre: 'Número de procedimiento',
      campo: 'procedimiento',
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

  ];