export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha del acta',
  required: true,
  habilitado: true,
};
export const DATOS_FEDERATARIOS = [
  {
    id: 'nombre',
    labelNombre: 'Nombre(s)',
    campo: 'nombre',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {
    id: 'primerApellido',
    labelNombre: 'Primer apellido*',
    campo: 'primerApellido',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    solo_lectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {
    id: 'segundoApellido',
    labelNombre: 'Segundo apellido',
    campo: 'segundoApellido',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    solo_lectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {
    id: 'numeroDeActa',
    labelNombre: 'Número de acta',
    campo: 'numeroDeActa',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    solo_lectura: false,
    validadores: [
      { tipo: '' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {

    id: 'fechaDelActa',
    labelNombre: 'Fecha del acta',
    campo: 'fechaDelActa',
    clase: 'col-md-4',
    tipoInput: 'date',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
    habilitado: true
  },
  {
    id: 'numeroDeNotaria',
    labelNombre: 'Número de notaría',
    campo: 'numeroDeNotaria',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    solo_lectura: false,
    validadores: [
      { tipo: '' }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {
    id: 'estado',
    labelNombre: 'Estado',
    campo: 'estado',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: 'Selecciona un valor',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'estadoOptions',
    labelNombre: 'Municipio o alcaldía',
    campo: 'estadoOptions',
    clase: 'col-md-4',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: 'Selecciona un valor',
    valorPredeterminado: '',
    marginTop: 0,
  },
];

export const EXPRESAS = [
  {
    id: 'taxId',
    labelNombre: 'Tax ID',
    campo: 'taxId',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {
    id: 'nombreDelEmpresa',
    labelNombre: 'Nombre de la Empresa',
    campo: 'nombreDelEmpresa',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 3
  },
  {
    id: 'pais',
    labelNombre: 'País',
    campo: 'pais',
    clase: 'col-md-12',
    tipoInput: 'select-catalogos',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: 'Selecciona un valor',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'direccion',
    labelNombre: 'Dirección',
    campo: 'direccion',
    clase: 'col-md-12',
    tipoInput: 'textarea',
    desactivado: false,
    solo_lectura: false,
    validadores: [
      {
        tipo: 'required'
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    margin_top: 5
  }
];
