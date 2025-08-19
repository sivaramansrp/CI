import { Row, Rows } from '../models/pago-de-derechos.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { MercanciasLista } from '../models/datos-generales.model';

/**
 * Constantes para el catálogo de tipos de solicitud
 */
export const CATALOGOS_ID = {
  CAT_TIPO_SOL: 'tipos-solicitud',
  CAT_PAISES: 'paises',
  CAT_ADUANAS: 'aduanas',
  CAT_SECCION_ADUANAS: 25,
  DATOS_GNRLS_SOL: 5,
  CAT_TIPO_DOCUMENTO: 'tipos-documento',
  CAT_TIPO_OPERACION: 26,
  CAT_MEDIO_DE_TRANSPORTE: 'medio-de-transporte',
  CAT_REGIMEN_MERCANCIA: 'regimen-mercancia',
  CAT_CLASIFI_REGIMEN: 'clasifi-regimen',
  CAT_FRACCION_ARANCELARIA: 'fraccion-arancelaria',
  CAT_NICO: 'nico',
  CAT_UNIDAD_MEDIDA_TARIFARIA: 'unidad-medida-tarifaria',
  CAT_PAIS_ORIGEN: 'pais-origen',
  CAT_PAIS_DESTINO: 'pais-destino',
  CAT_MOLINO: 'molino',
  CAT_ESTADO: 'estado',
  CAT_REPRESENTACION_FEDERAL: 'representacion-federal',
  DATOS_PERSONA_FISICA: 21,
};

/**
 * Lista de elementos de tipo Row.
 */
export const ITEMS: Row[] = [
  {
    nombre: 'Miriam Lopez Solis',
    telefono: '52-2298456543',
    correo: 'miriam@gmail.com',
    domicilio: 'este es un domicilio address',
    pais: 'ANGOLA(REPUBLIC DE)',
  },
];

/**
 * Lista de elementos de tipo Rows.
 */
export const PERSONA: Rows[] = [
  {
    nombre: 'Miriam Lopez Solis',
    telefono: '52-2298456543',
    correo: 'miriam@gmail.com',
    calle: '#10',
    exterior: 856,
    interior: 1,
    pais: 'MEXICO(ESTAD UNIDOS MEXICANOS',
  },
];

/**
 * Texto de alerta utilizado en el componente de terceros relacionados.
 * @constant {string}
 */
export const TERCEROS_TEXTO_DE_ALERTA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';
/**
 * Filas de datos predefinidas.
 */
export const MERCANCIAS_LISTA: MercanciasLista[] = [
  {
    partida: '1',
    tiporequisito: 'Inspección ocular',
    requisito: 'Requisito',
    certificado: 123456,
    fraccion: '01039201',
    fracciondescripcion: 'Con pedigree o certificado de alto registro.',
    nicod: '00',
    nicodescripcion: 'Descripción del NICO',
    descripcion: 'Descripción de la mercancía',
    umt: 'Kilogramo',
    cantidadumt: 100,
    umc: 'Unidad de medida comercialización',
    cantidadumc: 50,
    tipodeproducto: 'Especie de la mercancía',
    uso: 'Uso de la mercancía',
    paisorigen: 'País de origen',
    paisprocedencia: 'País de procedencia',
    certificadoInternacionalElectronico:
      'Certificado Internacional Electrónico',
  }
];

/**
 * Constante que define el parámetro utilizado para determinar el tipo de datos a mostrar.
 */
export const PARAMETERO = {
  EVALUAR: 'FLUJO_FUNCIONARIO_EVALUAR',
  READ_PROCEDEMENTO: 'READ_PROCEDURE',
  SUBSECUENTES: 'SUBSECUENTES',
};

/**
 * Configuración de campos y catálogos utilizados en el formulario de ingreso y control de mercancías.
 * Cada constante define las propiedades visuales y funcionales de un campo del formulario.
 *
 * @property {string} labelNombre - Texto que se muestra como etiqueta del campo.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de elementos para llenar el selector correspondiente.
 */
export const ADUANA_INGRESO = {
  labelNombre: 'Aduana de ingreso',
  required: false,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración para el campo "Oficina de Inspección de Sanidad Agropecuaria".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const OFICIANA_INSPECCION = {
  labelNombre: 'Oficina de Inspección de Sanidad Agropecuaria',
  required: false,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración para el campo "Punto de inspección".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const PUNTO_INSPECCION = {
  labelNombre: 'Punto de inspección',
  required: false,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración para el campo "Establecimiento TIF".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const ESTABLECIMIENTO = {
  labelNombre: 'Establecimiento TIF',
  required: false,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración para el campo "Régimen al que se destinará la mercancía".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const REGIMEN_DESTINARAN = {
  labelNombre: 'Régimen al que se destinará la mercancía',
  required: false,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración para el campo "Datos para movilización nacional".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const MOVILIZACION_NACIONAL = {
  labelNombre: 'Datos para movilización nacional',
  required: false,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración para el campo "Punto de verificación federal".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const PUNTO_VERIFICACION = {
  labelNombre: 'Punto de verificación federal',
  required: false,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración para el campo "Nombre de la empresa transportista".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const EMPRESA_TRANSPORTISTA = {
  labelNombre: 'Nombre de la empresa transportista',
  required: false,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración de las columnas que se mostrarán en la tabla de mercancías.
 * Cada objeto define el encabezado, la clave a mostrar y el orden de la columna.
 */
export const CONFIGURACION_MERCANCIAS_COLUMNAS: ConfiguracionColumna<MercanciasLista>[] =
  [
    {
      encabezado: 'No. partida',
      clave: (item: MercanciasLista) => item.partida,
      orden: 1,
    },
    {
      encabezado: 'Tipo de requisito',
      clave: (item: MercanciasLista) => item.tiporequisito,
      orden: 2,
    },
    {
      encabezado: 'Requisito',
      clave: (item: MercanciasLista) => item.requisito,
      orden: 3,
    },
    {
      encabezado: 'Número de certificado internacional',
      clave: (item: MercanciasLista) => item.certificado,
      orden: 4,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (item: MercanciasLista) => item.fraccion,
      orden: 5,
    },
    {
      encabezado: 'Descripción de la fracción',
      clave: (item: MercanciasLista) => item.fracciondescripcion,
      orden: 6,
    },
    {
      encabezado: 'Nico',
      clave: (item: MercanciasLista) => item.nicod,
      orden: 7,
    },
    {
      encabezado: 'Descripción Nico',
      clave: (item: MercanciasLista) => item.nicodescripcion,
      orden: 8,
    },
    {
      encabezado: 'Descripción',
      clave: (item: MercanciasLista) => item.descripcion,
      orden: 9,
    },
    {
      encabezado: 'Unidad de medida de tarifa (UMT)',
      clave: (item: MercanciasLista) => item.umt,
      orden: 10,
    },
    {
      encabezado: 'Cantidad UMT',
      clave: (item: MercanciasLista) => item.cantidadumt,
      orden: 11,
    },
    {
      encabezado: 'Unidad de medida de comercializacion (UMC)',
      clave: (item: MercanciasLista) => item.umc,
      orden: 12,
    },
    {
      encabezado: 'Cantidad UMC',
      clave: (item: MercanciasLista) => item.cantidadumc,
      orden: 13,
    },
    {
      encabezado: 'Uso',
      clave: (item: MercanciasLista) => item.uso,
      orden: 14,
    },
    {
      encabezado: 'Tipo de producto',
      clave: (item: MercanciasLista) => item.tipodeproducto,
      orden: 15,
    },
    {
      encabezado: 'País de orígen',
      clave: (item: MercanciasLista) => item.paisorigen,
      orden: 16,
    },
    {
      encabezado: 'Pais de procedencia',
      clave: (item: MercanciasLista) => item.paisprocedencia,
      orden: 17,
    },
    {
      encabezado: 'Certificado Internacional Electrónico',
      clave: (item: MercanciasLista) =>
        item.certificadoInternacionalElectronico,
      orden: 18,
    },
  ];

/**
 * Configuración para el campo "Certificados autorizados pendientes".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const CERTIFICADOS_AUTORIZADOS = {
  labelNombre: 'Certificados autorizados pendientes',
  required: true,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración para el campo "Hora de inspección".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const HORA_DE_INSPECCION = {
  labelNombre: 'Hora de inspección',
  required: true,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración para el campo "Aduana de ingreso".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const ADUANA_DE_INGRESO = {
  labelNombre: 'Aduana de ingreso',
  required: false,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración para el campo "Oficina de inspección de Sanidad Agropecuaria".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const SANIDAD_AGROPECUARIA = {
  labelNombre: 'Oficina de inspección de Sanidad Agropecuaria',
  required: false,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración para el campo "Punto de inspección".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const PUNTO_DE_INSPECCION = {
  labelNombre: 'Punto de inspección',
  required: false,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};

/**
 * Configuración para el campo "Tipo contenedor".
 *
 * @property {string} labelNombre - Etiqueta que se muestra en el formulario.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {string} primerOpcion - Texto que se muestra como primera opción en un selector.
 * @property {any[]} catalogos - Lista de opciones disponibles para seleccionar.
 */
export const TIPO_CONTENEDOR = {
  labelNombre: 'Tipo contenedor',
  required: false,
  primerOpcion: 'Selecciona un opción',
  catalogos: [],
};
