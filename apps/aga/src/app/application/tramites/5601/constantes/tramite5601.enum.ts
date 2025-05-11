/**
 * Título que se mostrará en el modal de aviso.
 */
export const TITULO_MODAL = 'Aviso';

/**
 * Mensaje que se mostrará en el modal, preguntando por la existencia de un documento
 * que acredite la autorización y vigencia del esquema de certificación.
 */
export const MENSAJE_MODAL = '¿Cuenta con algún documento que acredite la autorización y A vigencia de su esquema de certificación?';


export const FORMULARIO_CERTIFICACION_DETALLES = [
    {
        id: 'tieneCertificacion',
        labelNombre: '',
        campo: 'tieneCertificacion',
        clase: 'col-md-1',
        tipoInput: 'checkbox',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop:0
    },
    {
        id: 'certificacionEmpresa',
        labelNombre: '',
        campo: 'certificacionEmpresa',
        clase: 'col-md-6',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    },
    {
        id: 'otraCertificacion',
        labelNombre: 'Especifique otra certificación',
        campo: 'otraCertificacion',
        clase: 'col-md-7',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
    }

]

export const FORMULARIO_DETALLES = [
    {
        id: 'aduana',
        labelNombre: 'Aduana',
        campo: 'aduana',
        clase: 'col-md-6',
        tipoInput: 'select-catalogos',
        desactivado: false,
        soloLectura: false,
        validadores: [{ tipo: 'required' }],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0,
      },
      {
        id: 'seccionAduanera',
        labelNombre: 'Sección Aduanera',
        campo: 'seccionAduanera',
        clase: 'col-md-6',
        tipoInput: 'select-catalogos',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
      },

      {
        id: 'tipoOperacion',
        labelNombre: 'Tipo de operación',
        campo: 'tipoOperacion',
        clase: 'col-md-6',
        tipoInput: 'select-catalogos',
        desactivado: false,
        soloLectura: false,
        validadores: [{ tipo: 'required' }],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
      },
      {
        id: 'fechaOperacion',
        labelNombre: 'Fecha de operación',
        campo: 'fechaOperacion',
        clase: 'col-md-6',
        tipoInput: 'date',
        desactivado: false,
        soloLectura: false,
        validadores: [{ tipo: 'required' }],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0,
        habilitado: true,
        mostrar: false
      },
      {
        id: 'motivoDespachoDomicilio',
        labelNombre: 'Motivo o justificación de despacho a domicilio',
        campo: 'motivoDespachoDomicilio',
        clase: 'col-md-6',
        tipoInput: 'textarea',
        desactivado: false,
        soloLectura: false,
        validadores: [{ tipo: 'required' }],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
      },
      {
        id: 'observaciones',
        labelNombre: 'Observaciones',
        campo: 'observaciones',
        clase: 'col-md-6',
        tipoInput: 'textarea',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
      }       
]

export const MERCANCIA_DETALLES = [
    {
      id: 'valorMercancia',
      labelNombre: 'Valor de la mercancía',
      campo: 'valorMercancia',
      clase: 'col-md-6',
      tipoInput: 'text',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0,
      mostrar: true
    },
    {
      id: 'tipoMoneda',
      labelNombre: 'Tipo de moneda',
      campo: 'tipoMoneda',
      clase: 'col-md-6',
      tipoInput: 'select-catalogos',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0,
      mostrar: true
    },
    {
      id: 'descripcionMercancia',
      labelNombre: 'Nombre o descripción comercial de la mercancía',
      campo: 'descripcionMercancia',
      clase: 'col-md-6',
      tipoInput: 'textarea',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0,
      mostrar: true
    },
    {
      id: 'especificacionesMercancia',
      labelNombre: 'Descripción detallada y/o especificaciones técnicas de la mercancía',
      campo: 'especificacionesMercancia',
      clase: 'col-md-6',
      tipoInput: 'textarea',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0,
      mostrar: true
    }
  ];
  
  export const FORMULARIO_LOGISTICA_OPERACIONES = [
    {
      id: 'esquemasControlSeguridad',
      labelNombre: 'Señale los esquemas de control y seguridad de las operaciones',
      campo: 'esquemasControlSeguridad',
      clase: 'col-md-6',
      tipoInput: 'textarea',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0,
      habilitado: true
    },
    {
      id: 'distanciaRutaTiempos',
      labelNombre: 'Indique distancia, ruta y tiempos de las operaciones',
      campo: 'distanciaRutaTiempos',
      clase: 'col-md-6',
      tipoInput: 'textarea',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0,
      habilitado: true
    }
  ];

  export const UBICACION_MERCANCIA= [
    {
      id: 'direccion',
      labelNombre: 'Dirección',
      campo: 'direccion',
      clase: 'col-md-12',
      tipoInput: 'text',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0,
      habilitado: true
    },
    {
      id: 'telefono',
      labelNombre: 'Teléfono',
      campo: 'telefono',
      clase: 'col-md-4',
      tipoInput: 'text',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0,
      habilitado: true
    },
    {
      id: 'distanciaAduana',
      labelNombre: 'Distancia a la aduana (km)',
      campo: 'distanciaAduana',
      clase: 'col-md-4',
      tipoInput: 'text',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0,
      habilitado: true
    },
    {
      id: 'referencias',
      labelNombre: 'Referencias',
      campo: 'referencias',
      clase: 'col-md-12',
      tipoInput: 'text',
      desactivado: false,
      soloLectura: false,
      validadores: [{ tipo: 'required' }],
      marcadorDePosicion: '',
      valorPredeterminado: '',
      marginTop: 0,
      habilitado: true
    }
  ];
  
  