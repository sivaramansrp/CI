
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