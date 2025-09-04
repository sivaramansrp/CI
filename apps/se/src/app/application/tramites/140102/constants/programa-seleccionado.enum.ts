import { CancelacionTabla } from "../models/Cancelacion-de-autorizaciones";

/**
 * Constante que define los datos del formulario dinámico para el programa seleccionado.
 * Contiene la configuración de los campos, incluyendo etiquetas, tipos de entrada, valores predeterminados, y más.
 */

export const PROGRAMA_SELECCIONADO = [
  {
    id: 'folioDePrograma',
    labelNombre: 'Folio de programa',
    campo: 'folioDePrograma',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    marcadorDePosicion: '',
    valorPredeterminado: '2024-9421',
    marginTop: 0,
  },
  {
    id: 'seleccionaLaModalidad',
    labelNombre: 'Selecciona la modalidad',
    campo: 'seleccionaLaModalidad',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    marcadorDePosicion: '',
    valorPredeterminado: 'PROGRAMA NUEVO PRODUCTOR DIRECTO',
    marginTop: 0,
  },
  {
    id: 'representacionFederal',
    labelNombre: 'Representación federal',
    campo: 'representacionFederal',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    marcadorDePosicion: '',
    valorPredeterminado: 'CULIACAN',
    marginTop: 0,
  },
  {
    id: 'tipoPrograma',
    labelNombre: 'Tipo programa',
    campo: 'tipoPrograma',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    marcadorDePosicion: '',
    valorPredeterminado: 'PROSEC',
    marginTop: 0,
  },
  {
    id: 'estatus',
    labelNombre: 'Estatus',
    campo: 'estatus',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: false,
    marcadorDePosicion: '',
    valorPredeterminado: 'Vigente - Activo',
    marginTop: 0,
  },
  {
    id: '',
    labelNombre: '',
    campo: '',
    clase: 'col-md-4',
    tipoInput: '',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'motivoCancelacion',
    labelNombre: 'Motivo cancelación',
    campo: 'motivoCancelacion',
    clase: 'col-md-12',
    tipoInput: 'textarea',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' },{ 
      tipo: 'pattern', 
      valor: /^[a-zA-Z0-9 ]{0,255}$/, 
      mensaje: ' No puede escribir más de 255 caracteres' 
    }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'Confirmo',
    labelNombre: 'Confirmo estar de acuerdo con la cancelación del Programa IMMEX/PROSEC *',
    campo: 'confirmo',
    clase: 'col-md-12',
    tipoInput: 'checkbox',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
];

/**
 * Constante que define el mensaje de alerta para una solicitud registrada.
 * Contiene un mensaje HTML que informa al usuario sobre el número temporal asignado a la solicitud.
 */
export const ALERTA_DE_APLICACION_REGISTRADA = {
  message: `
    <p>La solicitud ha quedado registrada con el número temporal 202770947. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial será asignado a la solicitud en el momento en que esta sea firmada.</a>`,
};

/**
 * Constante que define el mensaje de error para formularios incompletos.
 * Este mensaje se muestra cuando faltan campos por capturar en el formulario.
 */
export const ERROR_FORMA_ALERT =
  '<strong>¡Error de registro! </strong>Faltan campos por capturar.';

export const CANCELACION_TABLA = [
  {
    encabezado: 'Folio de programa',
    clave: (item: CancelacionTabla): string => item.folioDePrograma,
    orden: 1
  },

  {
    encabezado: 'Selecciona la modalidad',
    clave: (item: CancelacionTabla): string => item.seleccionaLaModalidad,
    orden: 2
  },
  {
    encabezado: 'Representación federal',
    clave: (item: CancelacionTabla): string => item.representacionFederal,
    orden: 3
  },
  {
    encabezado: 'Tipo programa',
    clave: (item: CancelacionTabla): string => item.tipoPrograma,
    orden: 4
  },
  {
    encabezado: 'Estatus',
    clave: (item: CancelacionTabla): string => item.estatus,
    orden: 5
  },
];
/**
 * Array de pasos del wizard de la pantalla.
 * Cada paso contiene:
 *  - indice: número de orden del paso
 *  - titulo: nombre del paso que se muestra al usuario
 *  - activo: indica si el paso está actualmente activo
 *  - completado: indica si el paso ya se completó
 */
export const PANTA_WIZARD_PASOS = [
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
  