import { ItemTransporteDespacho } from '../models/shared/agregar-transporte.model';

/**
 * @description Enum para definir el header de la tabla del tipo transporte carretero.
 */
export const HEADER_TABLA_CARRETERO: ItemTransporteDespacho[] = [
  {
    llave: 'emp_transportista',
    valor: 'Empresa transportista',
  },
  {
    llave: 'numero_porte',
    valor: 'Número carta porte',
  },
  {
    llave: 'fecha_porte',
    valor: 'Fecha carta porte',
  },
  {
    llave: 'marca_transporte',
    valor: 'Marca',
  },
  {
    llave: 'modelo_transporte',
    valor: 'Modelo',
  },
  {
    llave: 'placas_transporte',
    valor: 'Placas',
  },
  {
    llave: 'contenedor_transporte',
    valor: 'Contenedor(es)',
  },
  {
    llave: 'observaciones',
    valor: 'Observaciones',
  },
];

/**
 * @description Enum para definir el header de la tabla del tipo transporte ferroviario.
 */
export const HEADER_TABLA_FERROVIARIO: ItemTransporteDespacho[] = [
  {
    llave: 'numero_bl',
    valor: 'Número BL',
  },
  {
    llave: 'tipo_equipo',
    valor: 'Tipo de Equipo',
  },
  {
    llave: 'iniciales_equipo',
    valor: 'Iniciales Equipo',
  },
  {
    llave: 'numero_equipo',
    valor: 'Número de Equipo',
  },
  {
    llave: 'observaciones',
    valor: 'Observaciones',
  },
];

/**
 * @description Enum para definir el header de la tabla del tipo transporte peatonal.
 */
export const HEADER_TABLA_PEATONAL: ItemTransporteDespacho[] = [
  {
    llave: 'emp_transportista',
    valor: 'Empresa transportista',
  },
  {
    llave: 'rfc_empresa',
    valor: 'RFC empresa responsable',
  },
  {
    llave: 'nombre_transportista',
    valor: 'Nombre transportista',
  },
  {
    llave: 'num_gafete',
    valor: 'ID de gafete',
  },
  {
    llave: 'observaciones',
    valor: 'Observaciones',
  },
];

/**
 * @description Enum para definir el header de la tabla del tipo transporte otro.
 */

export const HEADER_TABLA_OTRO: ItemTransporteDespacho[] = [
  {
    llave: 'emp_transportista',
    valor: 'Empresa transportista',
  },
  {
    llave: 'tipo_transporte_des',
    valor: 'Tipo de transporte',
  },
  {
    llave: 'datos_transporte',
    valor: 'Datos de transporte',
  },
  {
    llave: 'observaciones',
    valor: 'Observaciones',
  },
];

/**
 * @description Enum para definir el header de la tabla del tipo transporte marítimo.
 */

export const HEADER_TABLA_MARITIMO: ItemTransporteDespacho[] = [
  {
    llave: 'guia_bl_Maritimo',
    valor: 'Guía BL',
  },
  {
    llave: 'guia_house_valida',
    valor: 'Guía house',
  },
  {
    llave: 'nombre_buque_maritimo',
    valor: 'Nombre del buque',
  },
  {
    llave: 'contenedor_maritimo',
    valor: 'Contenedor(es)',
  },
  {
    llave: 'observaciones',
    valor: 'Observaciones',
  },
];

/**
 * @description Enum para definir el header de la tabla del tipo transporte aéreo.
 */
export const HEADER_TABLA_AEREO: ItemTransporteDespacho[] = [
  {
    llave: 'arribo_pendiente_aereo',
    valor: 'Arribo pendiente',
  },
  {
    llave: 'guia_master_aereo',
    valor: 'Guía master',
  },
  {
    llave: 'guia_house_aereo',
    valor: 'Guía house',
  },
  {
    llave: 'fecha_arribo_aereo',
    valor: 'Fecha de arribo',
  },
  {
    llave: 'hora_arribo_aereo',
    valor: 'Hora de arribo',
  },
  {
    llave: 'guia_valida',
    valor: 'Guía válida',
  },
  {
    llave: 'observaciones',
    valor: 'Observaciones',
  },
];

/**
 * @description Constante para el manejo de la etiqueta de la hora de arribo en el componente de transporte.
 */
export const LABEL_HORA_ARRIBO = 'Hora llegada (aprox)';

/**
 * @description Constante para el manejo de la descripcion del tipo de transporte en el componente de transporte.
 */
export const DESCRIPCION_TIPO_TRANSPORTE = '{tipoTransporte}';

/**
 * @description Constante para el manejo del mensaje de error al cambiar el tipo de transporte.
 */
export const MSG_CAMBIO_TIPO_TRANSPORTE =
  'Los datos capturados serán borrados, estás de acuerdo (SI/NO)';

/**
 * @description Constante para el manejo del mensaje de éxito al agregar un tipo de transporte a la tabla.
 */
export const MSG_AGREGA_TRANSPORTE_EXITOSAMENTE = `El ${DESCRIPCION_TIPO_TRANSPORTE} fue agregado correctamente.`;

/**
 * @description Lista de tipos de transporte disponibles en el sistema.
 * @param id: Identificador único del tipo de transporte.
 * @param nombre: Nombre del tipo de transporte.
 */
export const LISTA_TIPO_TRANSPORTE = [
  {
    id: 1,
    nombre: 'Carretero',
  },
  {
    id: 2,
    nombre: 'Ferroviario',
  },
  {
    id: 3,
    nombre: 'Peatonal',
  },
  {
    id: 4,
    nombre: 'Marítimo',
  },
  {
    id: 5,
    nombre: 'Aéreo',
  },
  {
    id: 6,
    nombre: 'Otro',
  },
];
