import { Destinatario, Exportador } from "../models/pago-de-derechos.model";
import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";

/**
 * Matriz de opciones para botones de radio.
 *
 * Cada objeto representa una opción de botón de radio con:
 * - `label`: El texto mostrado a la usuaria.
 * - `value`: El valor correspondiente de la opción.
 */
export const OPCIONES_DE_BOTON_DE_RADIO = [
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
* Constante que define las opciones disponibles para el botón de radio. 
* Se utiliza para capturar la selección del usuario en el formulario.
* 
* - "Animales Vivos" tiene un valor de '1'.
* - "Productos Subproductos" tiene un valor de '0'.
*/
export const CAPTURA_OPCIONES_DE_BOTON_DE_RADIO = [
  {
    label: 'Animales Vivos',
    value: '1',
  },
  {
    label: 'Productos y Subproductos',
    value: '0',
  }
];

/**
* Configuración de columnas para la tabla de destinatarios.
*/
export const DESTINATARIO_CONFIGURACION_TABLA: ConfiguracionColumna<Destinatario>[] = [
  { encabezado: "Nombre/denominación o razón social", clave: (item: Destinatario) => item.nombre, orden: 1, },
  { encabezado: "Teléfono", clave: (item: Destinatario) => item.telefono, orden: 2, },
  { encabezado: "Correo electrónico", clave: (item: Destinatario) => item.correoElectronico, orden: 3, },
  { encabezado: "calle", clave: (item: Destinatario) => item.calle, orden: 4, },
  { encabezado: "numeroExterior", clave: (item: Destinatario) => item.numeroExterior, orden: 5, },
  { encabezado: "numeroInterior", clave: (item: Destinatario) => item.numeroInterior, orden: 6, },
  { encabezado: "País", clave: (item: Destinatario) => item.pais, orden: 7, },

];
/**
* Configuración de columnas para la tabla de exportador.
*/
export const EXPORTADOR_CONFIGURACION_TABLA: ConfiguracionColumna<Exportador>[] = [
  { encabezado: "Nombre/denominación o razón social", clave: (item: Exportador) => item.nombre, orden: 1, },
  { encabezado: "Teléfono", clave: (item: Exportador) => item.telefono, orden: 2, },
  { encabezado: "Correo electrónico", clave: (item: Exportador) => item.correoElectronico, orden: 3, },
  { encabezado: "domoicilio", clave: (item: Exportador) => item.domoicilio, orden: 4, },
  { encabezado: "País", clave: (item: Exportador) => item.pais, orden: 5, },

];