import { Monto } from "../models/expedicion-certificados-frontera.models";

/**
 * Lista de pasos del proceso de expedición de certificados en frontera.
 * Cada paso incluye un índice, título, y su estado (activo y completado).
 */
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

/**
 * Configuración del input de fecha de inicio.
 */
export const INPUT_FECHA_INICIO = {
  /**
   * Etiqueta mostrada para el campo.
   */
  labelNombre: 'Fecha inicio:',

  /**
   * Indica si el campo es obligatorio.
   */
  required: false,

  /**
   * Indica si el campo está habilitado.
   */
  habilitado: false,
};

/**
 * Configuración del input de fecha de fin.
 */
export const INPUT_FECHA_FIN = {
  /**
   * Etiqueta mostrada para el campo.
   */
  labelNombre: 'Fecha fin:',

  /**
   * Indica si el campo es obligatorio.
   */
  required: false,

  /**
   * Indica si el campo está habilitado.
   */
  habilitado: false,
};

/**
 * Arreglo que describe los campos del formulario para la información del cupo.
 * Cada objeto define un campo específico, sus atributos y comportamiento.
 */
export const INFORMACION_DESCRIPCION_CUPO = [
  {
    id: 'regimenAduanero',
    labelNombre: 'Régimen aduanero',
    campo: 'regimenAduanero',
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
    id: 'descripcionProducto',
    labelNombre: 'Descripción del producto',
    campo: 'descripcionProducto',
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
    id: 'clasificacionSubProducto',
    labelNombre: 'Clasificación del subproducto',
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
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 3,
  },
  {
    id: 'fechaInicioCupo',
    labelNombre: 'Fecha inicio vigencia del cupo:',
    campo: 'fechaInicioCupo',
    clase: 'col-md-4',
    tipoInput: 'date',
    desactivado: true,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 3,
    habilitado: false,
  },
  {
    id: 'fechaFinCupo',
    labelNombre: 'Fecha fin vigencia del cupo:',
    campo: 'fechaFinCupo',
    clase: 'col-md-4',
    tipoInput: 'date',
    desactivado: true,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 3,
    habilitado: false,
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
    marcadorDePosicion: '',
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
    validadores: [],
    marcadorDePosicion: '',
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
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado:
      '',
    marginTop: 4,
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
    valorPredeterminado: '',
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
    valorPredeterminado: '',
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
    valorPredeterminado: '',
    marginTop: 3,
  },
];
/**
 * Configuración de las columnas de la tabla de montos a expedir.
 * Cada objeto define:
 * - `encabezado`: el nombre que se mostrará en la columna.
 * - `clave`: función para obtener el valor del objeto `Monto` correspondiente a la columna.
 * - `orden`: posición de la columna en la tabla.
 */
export const CONFIGURATION_TABLA_MONTO = [
  {
    encabezado: 'Monto a expedir',
    clave: (item: Monto): string => item.Montoaexpedir,
    orden: 1
  }
];
/**
 * Datos iniciales de la tabla de montos a expedir.
 * Cada elemento es un objeto `Monto` que representa una fila de la tabla.
 */
export const MONTO_DATOS: Monto[] = [
  {
    Montoaexpedir: '10',
  },]