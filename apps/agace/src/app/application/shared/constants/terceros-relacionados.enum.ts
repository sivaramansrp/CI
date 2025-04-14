export const REPRESENTANTE_LEGAL = [
    {
      id: 'resigtro',
      label_nombre: 'Registro Federal de Contribuyentes',
      campo: 'resigtro',
      clase: 'col-md-4',
      tipo_input: 'text',
      desactivado: false,
      solo_lectura: false,
      validadores: [
        {
          tipo: 'required'
        }
      ],
      marcador_de_posicion: '',
      valor_predeterminado: '',
      margin_top: 0
    },
    {
      id: 'consultarIDC',
      label_nombre: 'Buscar',
      campo: 'buscar',
      clase: 'col-md-8',
      tipo_input: 'button',
      desactivado: false,
      margin_top: 5,
    },
    {
      id: 'rfc',
      label_nombre: 'RFC',
      campo: 'rfc',
      clase: 'col-md-4',
      tipo_input: 'number',
      desactivado: true,
      solo_lectura: false,
      validadores:[
        {
          tipo: 'required'
        }
      ],
      marcador_de_posicion: '',
      margin_top: 3
    },
    {
      id: 'nombre',
      label_nombre: 'Nombre',
      campo: 'nombre',
      clase: 'col-md-4',
      tipo_input: 'text',
      desactivado: true,
      solo_lectura: false,
      validadores: [
        { tipo: 'required' }
      ],
      marcador_de_posicion: '',
      margin_top: 3
    },
    {
      id: 'apellidoPaterno',
      label_nombre: 'Apellido Paterno',
      campo: 'apellidoPaterno',
      clase: 'col-md-4',
      tipo_input: 'text',
      desactivado: true,
      solo_lectura: false,
      validadores: [
        { tipo: '' }
      ],
      marcador_de_posicion: '',
      margin_top: 3
    },
    {
        id: 'apellidoMaterno',
        label_nombre: 'Apellido Materno',
        campo: 'apellidoMaterno',
        clase: 'col-md-4',
        tipo_input: 'text',
        desactivado: true,
        solo_lectura: false,
        validadores: [
            { tipo: '' }
        ],
        marcador_de_posicion: '',
        margin_top: 3
    },
    {
        id: 'telefono',
        label_nombre: 'Teléfono',
        campo: 'telefono',
        clase: 'col-md-4',
        tipo_input: 'text',
        desactivado: true,
        solo_lectura: false,
        validadores: [
            { tipo: '' }
        ],
        marcador_de_posicion: '',
        margin_top: 3
    },
    {
        id: 'correoElectronico',
        label_nombre: 'Correo Electrónico',
        campo: 'correoElectronico',
        clase: 'col-md-4',
        tipo_input: 'text',
        desactivado: true,
        solo_lectura: false,
        validadores:[
            {
            tipo: ''
            }
        ],
        marcador_de_posicion: '',
        margin_top: 3
    }
  ];