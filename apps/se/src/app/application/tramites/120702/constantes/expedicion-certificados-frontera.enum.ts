export const EXPEDICION_CERTIFICADOS_FRONTERA = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

export const INPUT_FECHA_INICIO = {
  labelNombre: 'Fecha inicio',
  required: false,
  habilitado: true,
};

export const INPUT_FECHA_FIN = {
  labelNombre: 'Fecha fin',
  required: false,
  habilitado: true,
};

export const INPUT_FECHA_INICIO_CUPO = {
  labelNombre: 'Fecha inicio vigencia del cupo',
  required: false,
  habilitado: true,
};

export const INPUT_FECHA_FIN_CUPO = {
  labelNombre: 'Fecha fin vigencia del cupo',
  required: false,
  habilitado: true,
};

export const INFORMACION_DESCRPCION_CUPO = [
  {
    id: 'regimenAduanero',
    labelNombre: 'Regimen aduanero',
    campo: 'regimenAduanero',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: 'EXPORTACION',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'descripcionProducto',
    labelNombre: 'Descripción del producto',
    campo: 'descripcionProducto',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: 'PANTALONES Y FALDAS DE ALGODON',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'clasificacionSubProducto',
    labelNombre: 'Clasificacion del subproducto',
    campo: 'clasificacionSubProducto',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'unidadMedida',
    labelNombre: 'Unidad de medida',
    campo: 'unidadMedida',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [],
  marcadorDePosicion: 'METROS CUADRADOS EQUIVALENTES',
    valorPredeterminado: '',
    marginTop: 3,
  },
  {
    id: 'fechaInicioCupo',
    labelNombre: 'Fecha inicio vigencia del cupo',
    campo: 'fechaInicioCupo',
    clase: 'col-md-4',
    tipoInput: 'date',
    desactivado: true,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: 'PANTALONES Y FALDAS DE ALGODON',
    valorPredeterminado: '',
    marginTop: 3,
    habilitado: true
  },
  {
    id: 'fechaFinCupo',
    labelNombre: 'Fecha fin vigencia del cupo',
    campo: 'fechaFinCupo',
    clase: 'col-md-4',
    tipoInput: 'date',
    desactivado: true,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 3,
    habilitado: true
  },
  {
    id: 'mecanismoAsignacion',
    labelNombre: 'Mecanismo de asignación',
    campo: 'mecanismoAsignacion',
    clase: 'col-md-8',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: 'Asignación directa',
    valorPredeterminado: '',
    marginTop: 3,
  },
  {
    id: 'tratadoAcuerdo',
    labelNombre: 'Tratado / Acuerdo',
    campo: 'tratadoAcuerdo',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    validadores: [
      {
        tipo: '', mensaje: ''
      }
    ],
    marcadorDePosicion: 'Tratado entre Mexico, Estados Unidad',
    valorPredeterminado: '',
    marginTop: 3,
  },
  {
    id: 'fraccionesArancelarias',
    labelNombre: 'Fracciones arancelarias',
    campo: 'fraccionesArancelarias',
    clase: 'col-md-8',
    tipoInput: 'textarea',
    desactivado: true,
    soloLectura: false,
    validadores: [
      {
        tipo: '', mensaje: ''
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '26011101,26011201,26012001,26020002,26030001,26040001,26050001',
    marginTop: 3,
  },
  {
    id: 'paises',
    labelNombre: 'Países',
    campo: 'paises',
    clase: 'col-md-8',
    tipoInput: 'textarea',
    desactivado: true,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: 'ESTADOS UNIDOS DE AMERICA',
    marginTop: 3,
  },
  {
    id: 'observaciones',
    labelNombre: 'Observaciones',
    campo: 'observaciones',
    clase: 'col-md-8',
    tipoInput: 'textarea',
    desactivado: true,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: 'Observación',
    marginTop: 3,
  },
  {
    id: 'fundamento',
    labelNombre: 'Fundamento',
    campo: 'fundamento',
    clase: 'col-md-8',
    tipoInput: 'textarea',
    desactivado: true,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: 'fundamento',
    marginTop: 3,
  },
];