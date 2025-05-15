import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { Mercancia } from '../model/solicitud-permiso.model';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { TramiteAsociados } from '../../../shared/models/tramite-asociados.model';

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
  },
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
  txtBtnCancelar: '',
};

/**
 * Constante que define los datos de mercancías utilizados en la aplicación.
 * Cada objeto dentro del arreglo representa una columna con su encabezado, 
 * una función para obtener el valor correspondiente de un objeto `Mercancia`, 
 * y el orden en el que debe aparecer.
 * 
 * Propiedades:
 * - `encabezado`: El título de la columna que se mostrará en la interfaz de usuario.
 * - `clave`: Una función que toma un objeto `Mercancia` y devuelve el valor correspondiente 
 *   para esa columna.
 * - `orden`: El número que indica la posición de la columna en la tabla.
 * 
 * Columnas definidas:
 * 1. Clasificación del producto.
 * 2. Especificar clasificación del producto.
 * 3. Denominación específica del producto.
 * 4. Marca.
 * 5. Fracción arancelaria.
 * 6. Descripción de la fracción.
 */
export const MERCANCIAS_DATA = [
  {
    encabezado: 'Clasificación del producto',
    clave: (ele: Mercancia): string => ele.productoClassificacion,
    orden: 1,
  },
  {
    encabezado: 'Especificar clasificación del producto',
    clave: (ele: Mercancia): string => ele.productoEspecificarClassificacion,
    orden: 2,
  },
  {
    encabezado: 'Denominación específica del producto',
    clave: (ele: Mercancia): string => ele.denomiacionEspecifica,
    orden: 3,
  },
  {
    encabezado: 'Marca',
    clave: (ele: Mercancia): string => ele.marca,
    orden: 4,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: Mercancia): number => ele.fraccionArancelaria,
    orden: 5,
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: Mercancia): string => ele.descripcionFraccion,
    orden: 6,
  },
];
