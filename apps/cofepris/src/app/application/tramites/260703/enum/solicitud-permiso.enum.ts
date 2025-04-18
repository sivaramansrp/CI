import { ConfiguracionColumna } from "@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model";
import { Notificacion } from "@libs/shared/data-access-user/src";
import { TramiteAsociados } from "../../../shared/models/tramite-asociados.model";

/**
 * Opciones de botones de radio con etiquetas y valores correspondientes.
 */
export const OPCIONES_DE_BOTON_DE_RADIO_INFORMACION_CONFIDENCIAL = [
  {
    label: 'Sí',
    value: '1',
  },
  {
    label: 'No',
    value: '0',
  }
];

/**
 * Opciones de botones de radio para identificar el tipo de trámite genérico 1.
 */
export const OPCIONES_DE_BOTON_DE_RADIO_IDEGENERICA1 = [
  {
    label: 'Prórroga',
    value: 'Prorroga',
  },
  {
    label: 'Modificación',
    value: 'Modificacion',
  },
  {
    label: 'Modificación y prórroga',
    value: 'Modificacion y prorroga',
  },
  ];


/**
   * Configuración para las columnas de la tabla.
   * Define cómo se mostrarán los datos de los trámites asociados.
   */
  export const CONFIGURACIONCOLUMNA: ConfiguracionColumna<TramiteAsociados>[] = [
    { encabezado: '', clave: (item: TramiteAsociados) => item.id, orden: 1 },
    {
      encabezado: 'Folio trámite',
      clave: (item: TramiteAsociados) => item.folioTramite,
      orden: 2,
    },
    {
      encabezado: 'Tipo trámite',
      clave: (item: TramiteAsociados) => item.tipoTramite,
      orden: 3,
    },
    {
      encabezado: 'Estatus',
      clave: (item: TramiteAsociados) => item.estatus,
      orden: 4,
    },
    {
      encabezado: 'Fecha alta de registro',
      clave: (item: TramiteAsociados) => item.fetchaAltaDeRegistro,
      orden: 5,
    },
  ];

  /**
   * Configuración de notificación para alertar al usuario sobre la captura de localidad y colonia.
   */
  export const NOTIFICION_INPUT: Notificacion = {
      mensaje: '¡Precaución! Debes capturar localidad y colonia',
      cerrar: false,
      categoria: 'warning',
      tipoNotificacion: 'banner',
      modo: '',
      titulo: '',
      txtBtnAceptar: '',
      txtBtnCancelar: ''
    };