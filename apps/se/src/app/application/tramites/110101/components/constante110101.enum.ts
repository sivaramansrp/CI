import { ConfiguracionColumna, REGEX_DIGITOS } from "@libs/shared/data-access-user/src";
import { DatosMercanciaModalTabla, EnvasesTabla, InsumosTabla } from "../models/panallas110101.model";

/**
 * @constant RADIO_OPCIONS
 * @description Opciones de radio.
 */
export const RADIO_OPCIONS = [
  { label: 'Programa IMMEX vigente', value: 'programaImmex' },
  { label: 'Haber exportador al menos una ocasionya sea en el ultimo ano fiscal o en los ultimos 12 meses anteriores immediatos a partir de la fecha de la solicitud', value: 'haberExportador' },
  { label: 'La mercancia a exportar es un producto perecedero', value: 'perecedero' },
  { label: 'La mercancia a exportar es un producto artesanal', value: 'artesanal' }
];

/** Configuración de las columnas para la tabla de insumos en el trámite 110101. */
export const INSUMOS_TABLA: ConfiguracionColumna<InsumosTabla>[] = [
    { encabezado: 'Nombre técnico', clave: (item: InsumosTabla) => item.nombreTecnico, orden: 1 },
    { encabezado: "Proveedor", clave: (item: InsumosTabla) => item.proveedor, orden: 2 },
    { encabezado: "Fabricante o productor", clave: (item: InsumosTabla) => item.fabricanteOProductor, orden: 3 },
    { encabezado: "RFC", clave: (item: InsumosTabla) => item.rfc, orden: 4 },
    { encabezado: "Fracción arancelaria", clave: (item: InsumosTabla) => item.fraccionArancelaria, orden: 5 },
    { encabezado: "Valor de transacción", clave: (item: InsumosTabla) => item.valorDeTransaccion, orden: 6 }
  ];

  /** Configuración de las columnas para la tabla de envases en el trámite 110101. */
export const ENVASES_TABLA: ConfiguracionColumna<EnvasesTabla>[] = [
  { encabezado: 'Nombre técnico', clave: (item: EnvasesTabla) => item.nombreTecnico, orden: 1 },
  { encabezado: "Proveedor", clave: (item: EnvasesTabla) => item.proveedor, orden: 2 },
  { encabezado: "Fabricante o productor", clave: (item: EnvasesTabla) => item.fabricanteOProductor, orden: 3 },
  { encabezado: "Fracción arancelaria", clave: (item: EnvasesTabla) => item.fraccionArancelaria, orden: 4 },
  { encabezado: "Valor de transacción", clave: (item: EnvasesTabla) => item.valorEnDolares, orden: 5 },
  { encabezado: "País de origen", clave: (item: EnvasesTabla) => item.paisDeOrigen, orden: 6 }
];

/** Configuración de las columnas para la tabla modal de mercancías en el trámite 110101. */
export const MODAL_TABLA: ConfiguracionColumna<DatosMercanciaModalTabla>[] = [
  { encabezado: 'Tratado o Acuerdo', clave: (item: DatosMercanciaModalTabla) => item.tratado, orden: 1 },
  { encabezado: "País o bloque", clave: (item: DatosMercanciaModalTabla) => item.pais, orden: 2 }
];

/** Configuración de los campos del formulario modal para agregar o editar datos de mercancía en el trámite 110101. */
export const DATOS_MERCANCIA_MODAL_FORM = [
  {
    id: 'solicitud',
    labelNombre: 'Nombre técnico',
    campo: 'nombreTecnico',
    clase: 'col-md-8',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [{ tipo: 'required' }],
    valorPredeterminado: '',
    marcadorDePosicion: '',
    marginTop: 0,
  },
  {
    id: 'fraccionArancelaria',
    labelNombre: 'Fracción arancelaria',
    campo: 'fraccionArancelaria',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'proveedor',
    labelNombre: 'Proveedor',
    campo: 'proveedor',
    clase: 'col-md-4',
    tipoInput: 'text',
    desactivado: false,
    soloLectura: false,
    validadores: [],
    marcadorDePosicion: '',
    valorPredeterminado: '',
    marginTop: 0,
  },
  {
    id: 'fabricanteProductor',
    labelNombre: 'Fabricante o productor',
    campo: 'fabricanteProductor',
    clase: 'col-md-4',
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
    clase: 'col-md-4',
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