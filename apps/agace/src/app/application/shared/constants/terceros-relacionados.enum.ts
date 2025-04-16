export const REPRESENTANTE_LEGAL = [
    {
      id: 'resigtro',
      labelNombre: 'Registro Federal de Contribuyentes',
      campo: 'resigtro',
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
      id: 'consultarIDC',
      labelNombre: 'Buscar',
      campo: 'buscar',
      clase: 'col-md-8',
      tipoInput: 'button',
      desactivado: false,
      marginTop: 5,
    },
    {
      id: 'rfc',
      labelNombre: 'RFC',
      campo: 'rfc',
      clase: 'col-md-4',
      tipoInput: 'number',
      desactivado: true,
      soloLectura: false,
      validadores:[
        {
          tipo: 'required'
        }
      ],
      marcadorDePosicion: '',
      marginTop: 3
    },
    {
      id: 'nombre',
      labelNombre: 'Nombre',
      campo: 'nombre',
      clase: 'col-md-4',
      tipoInput: 'text',
      desactivado: true,
      soloLectura: false,
      validadores: [
        { tipo: 'required' }
      ],
      marcadorDePosicion: '',
      marginTop: 3
    },
    {
      id: 'apellidoPaterno',
      labelNombre: 'Apellido Paterno',
      campo: 'apellidoPaterno',
      clase: 'col-md-4',
      tipoInput: 'text',
      desactivado: true,
      soloLectura: false,
      validadores: [
        { tipo: '' }
      ],
      marcadorDePosicion: '',
      marginTop: 3
    },
    {
        id: 'apellidoMaterno',
        labelNombre: 'Apellido Materno',
        campo: 'apellidoMaterno',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: true,
        soloLectura: false,
        validadores: [
            { tipo: '' }
        ],
        marcadorDePosicion: '',
        marginTop: 3
    },
    {
        id: 'telefono',
        labelNombre: 'Teléfono',
        campo: 'telefono',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: true,
        soloLectura: false,
        validadores: [
            { tipo: '' }
        ],
        marcadorDePosicion: '',
        marginTop: 3
    },
    {
        id: 'correoElectronico',
        labelNombre: 'Correo Electrónico',
        campo: 'correoElectronico',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: true,
        soloLectura: false,
        validadores:[
            {
            tipo: ''
            }
        ],
        marcadorDePosicion: '',
        marginTop: 3
    }
  ];