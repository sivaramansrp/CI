import { ConfiguracionColumna, REGEX_DIGITOS } from "@libs/shared/data-access-user/src";
import { DatosMercanciaModalTabla, EnvasesTabla, InsumosTabla, ProcesosTabla } from "../models/panallas110101.model";

/**
 * @constant RADIO_OPCIONS
 * @description Opciones de radio.
 */
export const RADIO_OPCIONS = [
  { label: 'Programa IMMEX vigente', value: 'CEXPA.01' },
  { label: 'Haber exportador al menos una ocasionya sea en el ultimo ano fiscal o en los ultimos 12 meses anteriores immediatos a partir de la fecha de la solicitud', value: 'CEXPA.02' },
  { label: 'La mercancia a exportar es un producto perecedero', value: 'CEXPA.03' },
  { label: 'La mercancia a exportar es un producto artesanal', value: 'CEXPA.04' }
];

/**
 * @constant OPCIONES
 * @description Opciones de selección si/no.
 */
export const OPCIONES = [
  { label: 'Sí', value: 'si' },
  { label: 'No', value: 'no' }
]

/**
 * @constant SELECCIONAR_TRANSFORMACION
 * @description Opciones para seleccionar el tipo de transformación utilizado en la mercancía.
 */
export const SELECCIONAR_TRANSFORMACION = [
  { label: 'Transformación', value: 'transformacion' },
  { label: 'Ensamble o montaje', value: 'ensamble' }
]

/** Configuración de las columnas para la tabla de insumos en el trámite 110101. */
export const INSUMOS_TABLA: ConfiguracionColumna<InsumosTabla>[] = [
    { encabezado: 'Nombre técnico', clave: (item: InsumosTabla) => item.nombreTecnico ?? undefined, orden: 1 },
    { encabezado: "Proveedor", clave: (item: InsumosTabla) => item.proveedor ?? undefined, orden: 2 },
    { encabezado: "Fabricante o productor", clave: (item: InsumosTabla) => item.fabricanteOProductor ?? undefined, orden: 3 },
    { encabezado: "RFC", clave: (item: InsumosTabla) => item.rfc ?? undefined, orden: 4 },
    { encabezado: "Fracción arancelaria", clave: (item: InsumosTabla) => item.fraccionArancelaria ?? undefined, orden: 5 },
    { encabezado: "Valor en dolares", clave: (item: InsumosTabla) => item.valorEnDolares ?? undefined, orden: 6 },
    { encabezado: "Pais de origen", clave: (item: InsumosTabla) => item.paisDeOrigen ?? undefined, orden: 7 },
    { encabezado: "Peso", clave: (item: InsumosTabla) => item.peso ?? '', orden: 8 },
    { encabezado: "Volumen", clave: (item: InsumosTabla) => item.volumen ?? '', orden: 9 },
  ];

/** Configuración de las columnas para la tabla de procesos en el trámite 110101. */
export const PROCESO_TABLA: ConfiguracionColumna<ProcesosTabla>[] = [
    { encabezado: 'Proceso', clave: (item: ProcesosTabla) => item.proceso, orden: 1 },
];

  /** Configuración de las columnas para la tabla de envases en el trámite 110101. */
export const ENVASES_TABLA: ConfiguracionColumna<EnvasesTabla>[] = [
  { encabezado: 'Nombre técnico', clave: (item: EnvasesTabla) => item.nombreTecnico ?? undefined, orden: 1 },
  { encabezado: "Proveedor", clave: (item: EnvasesTabla) => item.proveedor ?? undefined, orden: 2 },
  { encabezado: "Fabricante o productor", clave: (item: EnvasesTabla) => item.fabricanteOProductor ?? undefined, orden: 3 },
  { encabezado: "Fracción arancelaria", clave: (item: EnvasesTabla) => item.fraccionArancelaria ?? undefined, orden: 4 },
  { encabezado: "Valor de transacción", clave: (item: EnvasesTabla) => item.valorEnDolares ?? undefined, orden: 5 },
  { encabezado: "País de origen", clave: (item: EnvasesTabla) => item.paisDeOrigen ?? undefined, orden: 6 }
];

/** Configuración de las columnas para la tabla modal de mercancías en el trámite 110101. */
export const MODAL_TABLA: ConfiguracionColumna<DatosMercanciaModalTabla>[] = [
  { encabezado: 'Tratado o Acuerdo', clave: (item: DatosMercanciaModalTabla) => item.tratado_nombre, orden: 1 },
  { encabezado: "País o bloque", clave: (item: DatosMercanciaModalTabla) => item.nombre_pais_bloque, orden: 2 }
];

/** Configuración de los campos del formulario modal para agregar o editar datos de mercancía en el trámite 110101. */
export const DATOS_MERCANCIA_MODAL_FORM = [

  {
    id: 'proveedor',
    labelNombre: 'Proveedor',
    campo: 'proveedor',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  
  {
    id: 'fraccionArancelaria',
    labelNombre: 'Fracción arancelaria',
    campo: 'fraccionArancelaria',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  
  {
    id: 'capitulo',
    labelNombre: 'Capítulo',
    campo: 'capitulo',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: true,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },

  {
    id: 'descripcionCapitulo',
    labelNombre: 'Descripción',
    campo: 'descripcionCapitulo',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: true,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },

  {
    id: 'partida',
    labelNombre: 'Partida',
    campo: 'partida',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: true,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },

  {
    id: 'descripcionPartida',
    labelNombre: 'Descripción',
    campo: 'descripcionPartida',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: true,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },

  {
    id: 'subpartida',
    labelNombre: 'Subpartida',
    campo: 'subpartida',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: true,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },

  {
    id: 'descripcionSubpartida',
    labelNombre: 'Descripción',
    campo: 'descripcionSubpartida',
    clase: 'col-md-6',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: true,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },

  {
    id: 'descripcionFraccionArancelaria',
    labelNombre: 'Descripción de la fracción arancelaria',
    campo: 'descripcionFraccionArancelaria',
    clase: 'col-md-12',
    tipoInput: 'text',
    desactivado: true,
    soloLectura: true,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },

  {
    id: 'nombreTecnico',
    labelNombre: 'Nombre técnico',
    campo: 'nombreTecnico',
    clase: 'col-md-12',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },

  {
    id: 'valorDolares',
    labelNombre: 'Valor en dólares',
    campo: 'valorDolares',
    clase: 'col-md-12',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [
      { tipo: 'required' },
      {
        tipo: 'pattern',
        valor: REGEX_DIGITOS,
        mensaje: 'Por favor, escribe un número entero válido',
      }
    ],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
];