/**
 * Texto que indica cómo copiar datos en una solicitud.
 */
export const TEXTOS_SOLICITUD = `Al dar doble-clic en una Solicitud, se copiarán sus datos en esta Solicitud.`

/**
 * Encabezados de la tabla de solicitudes.  
 */
export const SOLICITUD_HEADER = {
  "encabezadoSolicitud": [
    "Fecha Creación",
    "Mercancía",
    "Cantidad",
    "Proveedor"
  ]
}

/**
 * Identificadores de los diferentes catálogos.
 */
export const CATALOGOS_ID = {
  CAT_ESTADO: 'estado',
  CAT_CLAVE_SCIAN: 'clave-scian',
  CAT_DESCRIPCION_SCIAN: 'descripcion-scian',
  CAT_REGIMENES: 'regimenes',
  CAT_ADUANAS: 'aduanas',
  CAT_PRODUCTO_CLASIFICACION: 'producto-clasificacion',
  CAT_ESPECIFICO_PRODUCTO_CLASIFICACION: 'especifico-producto-clasificacion',
  CAT_TIPO_PRODUCTO: 'tipo-producto',
  CAT_PAIS_DESTINO: 'pais-destino',
  CAT_PAIS: 'pais'
}

/**
 * Define los paneles colapsables para diferentes secciones en la interfaz de datos mercancía.
 */
export const PANELS = [
  { label: 'País de orígen', isCollapsed: true },
  { label: 'País de procedencia', isCollapsed: true }
];

/**
 * Opciones de botones de radio con etiquetas y valores correspondientes.
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
 * Opciones para seleccionar la nacionalidad de terceros.
 */
export const TERCEROS_NACIONALIDAD_OPCIONES = [
  {
    label: 'Nacional',
    value: 'nacional',
  },
  {
    label: 'Extranjero',
    value: 'extranjero',
  }
]

/**
 * Opciones para seleccionar el tipo de persona.
 */
export const TIPO_PERSONA_OPCIONES = [
  {
    label: 'Física',
    value: 'fisica',
  },
  {
    label: 'Moral',
    value: 'moral',
  },
  {
    label: 'No contribuyente',
    value: 'noContribuyente',
  }
]

/**
 * Constante que define las categorías de terceros para clasificación por nacionalidad y tipo de persona.
 */
export const DATOS_CATEGORIAS_TERCEROS = {
  NACIONAL: 'nacional',
  EXTRANJERO: 'extranjero',
  FISICA: 'fisica',
  MORAL: 'moral',
  NO_CONTRIBUYENTE: 'noContribuyente',
}

/**
 * Mensaje de error mostrado cuando el RFC del representante legal no es ingresado.
 */
export const MSG_ERROR_REPRESENTANTE_LEGAL = 'Debe ingresar el RFC.';

/**
 * Texto de alerta para tablas obligatorias.
 */
export const TERCEROR_TEXTO_DE_ALERTA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

/**
 * Configuración de botones para acciones relacionadas con las tablas.
 */
export const BOTONS = [
  {
    btnNombre: 'Agregar todos',
    class: 'btn-primary'
  },
  {
    btnNombre: 'Agregar selección',
    class: 'btn-default'
  },
  {
    btnNombre: 'Restar selección',
    class: 'btn-danger'
  },
  {
    btnNombre: 'Restar todos',
    class: 'btn-default'
  },
];