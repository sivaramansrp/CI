import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { Destinatario } from '../models/destinatario.model';
import { Fabricante } from '../models/fabricante.model';
import { Facturador } from '../models/facturador.model';
import { Mercancia } from "../models/mercancia.model";
import { Proveedor } from '../models/proveedor.model';
import { SCIAN } from "../models/SCIAN.model";
import { SolicitudDatos } from "../models/solicitud-datos.model";
import { TableData } from '@libs/shared/data-access-user/src';

/**
 * Texto que indica cómo copiar datos en una solicitud.
 * Se muestra al usuario para indicar que al hacer doble clic en una solicitud,
 * sus datos se copiarán en la solicitud actual.
 */
export const TEXTOS_SOLICITUD = `Al dar doble-clic en una Solicitud, se copiarán sus datos en esta Solicitud.`;

/**
 * Encabezados de la tabla de solicitudes.
 * Define las columnas que se mostrarán en la tabla de solicitudes.
 */
export const SOLICITUD_HEADER = {
  encabezadoSolicitud: [
    "Fecha Creación",
    "Mercancía",
    "Cantidad",
    "Proveedor"
  ]
};

/**
 * Identificadores de los diferentes catálogos utilizados en la aplicación.
 * Cada clave representa un catálogo específico requerido en el sistema.
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
};

/**
 * Define los paneles colapsables para diferentes secciones en la interfaz de datos mercancía.
 * Cada panel tiene una etiqueta y un estado inicial de colapsado.
 */
export const PANELS = [
  { label: 'País de orígen', isCollapsed: true },
  { label: 'País de procedencia', isCollapsed: true }
];

/**
 * Opciones de botones de radio con etiquetas y valores correspondientes.
 * Se utiliza en formularios donde se requiere selección binaria (Sí/No).
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
 * Permite clasificar a los terceros como nacionales o extranjeros.
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
];

/**
 * Opciones para seleccionar el tipo de persona.
 * Clasifica a las personas en Física, Moral o No contribuyente.
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
];

/**
 * Constante que define las categorías de terceros para clasificación por nacionalidad y tipo de persona.
 * Utilizada para agrupar y filtrar terceros en la interfaz.
 */
export const DATOS_CATEGORIAS_TERCEROS = {
  NACIONAL: 'nacional',
  EXTRANJERO: 'extranjero',
  FISICA: 'fisica',
  MORAL: 'moral',
  NO_CONTRIBUYENTE: 'noContribuyente',
};

/**
 * Mensaje de error mostrado cuando el RFC del representante legal no es ingresado.
 * Se utiliza en validaciones de formularios.
 */
export const MSG_ERROR_REPRESENTANTE_LEGAL = 'Debe ingresar el RFC.';

/**
 * Texto de alerta para tablas obligatorias.
 * Informa al usuario que ciertas tablas requieren al menos un registro.
 */
export const TERCEROR_TEXTO_DE_ALERTA =
  'Las tablas con asterisco son obligatorias y debes agregar por lo menos un registro.';

/**
 * Configuración de botones para acciones relacionadas con las tablas.
 * Define el texto y clases CSS para cada botón de acción en las tablas.
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

/**
 * Configuración de las columnas de la tabla de solicitudes.
 * Define cómo se muestran los datos de las solicitudes en la tabla.
 */
export const CONFIGURACION_COLUMNAS_SOLICITUD: ConfiguracionColumna<SolicitudDatos>[] = [
  {
    /**
     * Columna para mostrar la fecha de creación de la solicitud.
     * @param item Instancia de SolicitudDatos
     * @returns Valor de la propiedad 'fechaCreacion'
     */
    encabezado: 'Fecha creación',
    clave: (item: SolicitudDatos) => item.fechaCreacion,
    orden: 1,
  },
  {
    /**
     * Columna para mostrar la mercancía asociada a la solicitud.
     * @param item Instancia de SolicitudDatos
     * @returns Valor de la propiedad 'mercancia'
     */
    encabezado: 'Mercancía',
    clave: (item: SolicitudDatos) => item.mercancia,
    orden: 2,
  },
  {
    /**
     * Columna para mostrar la cantidad asociada a la solicitud.
     * @param item Instancia de SolicitudDatos
     * @returns Valor de la propiedad 'cantidad'
     */
    encabezado: 'Cantidad',
    clave: (item: SolicitudDatos) => item.cantidad,
    orden: 3,
  },
  {
    /**
     * Columna para mostrar el proveedor asociado a la solicitud.
     * @param item Instancia de SolicitudDatos
     * @returns Valor de la propiedad 'proovedor'
     */
    encabezado: 'Proveedor',
    clave: (item: SolicitudDatos) => item.proovedor,
    orden: 4,
  },
];

/**
 * Configuración de columnas para la tabla de mercancías.
 * Define cómo se muestran los datos de mercancías en la tabla.
 */
export const CONFIGURACION_COLUMNAS_MERCANCIAS: ConfiguracionColumna<Mercancia>[] = [
  {
    /**
     * Clasificación del producto.
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'clasificaionProductos'
     */
    encabezado: 'Clasificación del producto',
    clave: (item: Mercancia) => item.clasificaionProductos,
    orden: 1,
  },
  {
    /**
     * Especificación de la clasificación del producto.
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'especificarProducto'
     */
    encabezado: 'Especificar Clasificación del producto',
    clave: (item: Mercancia) => item.especificarProducto,
    orden: 2,
  },
  {
    /**
     * Denominación específica del producto.
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'nombreProductoEspecifico'
     */
    encabezado: 'Denominación específico del producto',
    clave: (item: Mercancia) => item.nombreProductoEspecifico,
    orden: 3,
  },
  {
    /**
     * Distintiva del producto.
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'distintiva'
     */
    encabezado: 'Distintiva',
    clave: (item: Mercancia) => item.distintiva,
    orden: 4,
  },
  {
    /**
     * Fracción arancelaria.
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'fraccionArancelaria'
     */
    encabezado: 'Fracción arancelaria',
    clave: (item: Mercancia) => item.fraccionArancelaria,
    orden: 5,
  },
  {
    /**
     * Descripción de la fracción arancelaria.
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'descripcionFraccionArancelaria'
     */
    encabezado: 'Descripción de la fracción arancelaria',
    clave: (item: Mercancia) => item.descripcionFraccionArancelaria,
    orden: 6,
  },
  {
    /**
     * Unidad de medida de comercialización (UMC).
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'umc'
     */
    encabezado: 'Unidad de medida de comercialización (UMC)',
    clave: (item: Mercancia) => item.umc,
    orden: 7,
  },
  {
    /**
     * Cantidad en UMC.
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'cantidadUMC'
     */
    encabezado: 'Cantidad UMC',
    clave: (item: Mercancia) => item.cantidadUMC,
    orden: 8,
  },
  {
    /**
     * Unidad de medida de tarifa (UMT).
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'umt'
     */
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (item: Mercancia) => item.umt,
    orden: 9,
  },
  {
    /**
     * Cantidad en UMT.
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'cantidadUMT'
     */
    encabezado: 'Cantidad UMT',
    clave: (item: Mercancia) => item.cantidadUMT,
    orden: 10,
  },
  {
    /**
     * País de origen.
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'paisDeOrigen'
     */
    encabezado: 'País de origen',
    clave: (item: Mercancia) => item.paisDeOrigen,
    orden: 11,
  },
  {
    /**
     * País de procedencia.
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'paisDeProcedencia'
     */
    encabezado: 'País de procedencia',
    clave: (item: Mercancia) => item.paisDeProcedencia,
    orden: 12,
  },
  {
    /**
     * Tipo de producto.
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'tipoProducto'
     */
    encabezado: 'Tipo de producto',
    clave: (item: Mercancia) => item.tipoProducto,
    orden: 13,
  },
  {
    /**
     * Uso específico del producto.
     * @param item Instancia de Mercancia
     * @returns Valor de la propiedad 'usoEspecifico'
     */
    encabezado: 'Uso específico',
    clave: (item: Mercancia) => item.usoEspecifico,
    orden: 14,
  },
];

/**
 * Configuración de columnas para la tabla de SCIAN.
 * Define cómo se muestran los datos de SCIAN en la tabla.
 */
export const CONFIGURACION_COLUMNAS_SCIAN: ConfiguracionColumna<SCIAN>[] = [
  {
    /**
     * Clave SCIAN.
     * @param item Instancia de SCIAN
     * @returns Valor de la propiedad 'claveSCIAN'
     */
    encabezado: 'Clave S.C.I.A.N',
    clave: (item: SCIAN) => item.claveSCIAN,
    orden: 1,
  },
  {
    /**
     * Descripción del SCIAN.
     * @param item Instancia de SCIAN
     * @returns Valor de la propiedad 'claveSCIANDesc'
     */
    encabezado: 'Descripción del S.C.I.A.N.',
    clave: (item: SCIAN) => item.claveSCIANDesc,
    orden: 2,
  }
];

/**
 * Datos iniciales para una estructura de tabla.
 * Utilizado para inicializar tablas antes de cargar datos reales.
 */
export const DATOS_INICIALES_TABLA: TableData = {
  tableHeader: [],
  tableBody: [],
};

/**
 * Configuración de columnas para la tabla de destinatarios.
 * Define cómo se muestran los datos de destinatarios en la tabla.
 */
export const CONFIGURACION_COLUMNAS_DESTINATARIO: ConfiguracionColumna<Destinatario>[] = [
  {
    /**
     * Nombre/denominación o razón social del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'nombre'
     */
    encabezado: 'Nombre/denominación o razón social',
    clave: (item: Destinatario) => item.nombre,
    orden: 1,
  },
  {
    /**
     * RFC del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'rfc'
     */
    encabezado: 'R.F.C.',
    clave: (item: Destinatario) => item.rfc,
    orden: 2,
  },
  {
    /**
     * CURP del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'curp'
     */
    encabezado: 'CURP',
    clave: (item: Destinatario) => item.curp,
    orden: 3,
  },
  {
    /**
     * Teléfono del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'telefono'
     */
    encabezado: 'Teléfono',
    clave: (item: Destinatario) => item.telefono,
    orden: 4,
  },
  {
    /**
     * Correo electrónico del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'correoElectronico'
     */
    encabezado: 'Correo electrónico',
    clave: (item: Destinatario) => item.correoElectronico,
    orden: 5,
  },
  {
    /**
     * Calle del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'calle'
     */
    encabezado: 'Calle',
    clave: (item: Destinatario) => item.calle,
    orden: 6,
  },
  {
    /**
     * Número exterior del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'numeroExterior'
     */
    encabezado: 'Número exterior',
    clave: (item: Destinatario) => item.numeroExterior,
    orden: 7,
  },
  {
    /**
     * Número interior del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'numeroInterior'
     */
    encabezado: 'Número interior',
    clave: (item: Destinatario) => item.numeroInterior,
    orden: 8,
  },
  {
    /**
     * País del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'pais'
     */
    encabezado: 'País',
    clave: (item: Destinatario) => item.pais,
    orden: 9,
  },
  {
    /**
     * Colonia del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'colonia'
     */
    encabezado: 'Colonia',
    clave: (item: Destinatario) => item.colonia,
    orden: 10,
  },
  {
    /**
     * Municipio o alcaldía del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'municipio'
     */
    encabezado: 'Municipio o alcaldía',
    clave: (item: Destinatario) => item.municipio,
    orden: 11,
  },
  {
    /**
     * Localidad del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'localidad'
     */
    encabezado: 'Localidad',
    clave: (item: Destinatario) => item.localidad,
    orden: 12,
  },
  {
    /**
     * Estado del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'estado'
     */
    encabezado: 'Estado',
    clave: (item: Destinatario) => item.estado,
    orden: 13,
  },
  {
    /**
     * Segundo estado del destinatario (si aplica).
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'estado2'
     */
    encabezado: 'Estado',
    clave: (item: Destinatario) => item.estado2,
    orden: 14,
  },
  {
    /**
     * Código postal del destinatario.
     * @param item Instancia de Destinatario
     * @returns Valor de la propiedad 'codigo'
     */
    encabezado: 'Código postal',
    clave: (item: Destinatario) => item.codigo,
    orden: 15,
  },
];

/**
 * Configuración de columnas para la tabla de fabricantes.
 * Define cómo se muestran los datos de fabricantes en la tabla.
 */
export const CONFIGURACION_COLUMNAS_FABRICANTE: ConfiguracionColumna<Fabricante>[] = [
  {
    /**
     * Nombre/denominación o razón social del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'nombre'
     */
    encabezado: 'Nombre/denominación o razón social',
    clave: (item: Fabricante) => item.nombre,
    orden: 1,
  },
  {
    /**
     * RFC del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'rfc'
     */
    encabezado: 'R.F.C.',
    clave: (item: Fabricante) => item.rfc,
    orden: 2,
  },
  {
    /**
     * CURP del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'curp'
     */
    encabezado: 'CURP',
    clave: (item: Fabricante) => item.curp,
    orden: 3,
  },
  {
    /**
     * Teléfono del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'telefono'
     */
    encabezado: 'Teléfono',
    clave: (item: Fabricante) => item.telefono,
    orden: 4,
  },
  {
    /**
     * Correo electrónico del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'correoElectronico'
     */
    encabezado: 'Correo electrónico',
    clave: (item: Fabricante) => item.correoElectronico,
    orden: 5,
  },
  {
    /**
     * Calle del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'calle'
     */
    encabezado: 'Calle',
    clave: (item: Fabricante) => item.calle,
    orden: 6,
  },
  {
    /**
     * Número exterior del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'numeroExterior'
     */
    encabezado: 'Número exterior',
    clave: (item: Fabricante) => item.numeroExterior,
    orden: 7,
  },
  {
    /**
     * Número interior del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'numeroInterior'
     */
    encabezado: 'Número interior',
    clave: (item: Fabricante) => item.numeroInterior,
    orden: 8,
  },
  {
    /**
     * País del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'pais'
     */
    encabezado: 'País',
    clave: (item: Fabricante) => item.pais,
    orden: 9,
  },
  {
    /**
     * Colonia del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'colonia'
     */
    encabezado: 'Colonia',
    clave: (item: Fabricante) => item.colonia,
    orden: 10,
  },
  {
    /**
     * Municipio o alcaldía del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'municipio'
     */
    encabezado: 'Municipio o alcaldía',
    clave: (item: Fabricante) => item.municipio,
    orden: 11,
  },
  {
    /**
     * Localidad del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'localidad'
     */
    encabezado: 'Localidad',
    clave: (item: Fabricante) => item.localidad,
    orden: 12,
  },
  {
    /**
     * Estado del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'estado'
     */
    encabezado: 'Estado',
    clave: (item: Fabricante) => item.estado,
    orden: 13,
  },
  {
    /**
     * Segundo estado del fabricante (si aplica).
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'estado2'
     */
    encabezado: 'Estado',
    clave: (item: Fabricante) => item.estado2,
    orden: 14,
  },
  {
    /**
     * Código postal del fabricante.
     * @param item Instancia de Fabricante
     * @returns Valor de la propiedad 'codigo'
     */
    encabezado: 'Código postal',
    clave: (item: Fabricante) => item.codigo,
    orden: 15,
  },
]; 

/**
 * Configuración de columnas para la tabla de proveedores.
 * Define cómo se muestran los datos de proveedores en la tabla.
 */
export const CONFIGURACION_COLUMNAS_PROVEEDOR: ConfiguracionColumna<Proveedor>[] = [
  {
    /**
     * Nombre/denominación o razón social del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'nombre'
     */
    encabezado: 'Nombre/denominación o razón social',
    clave: (item: Proveedor) => item.nombre,
    orden: 1,
  },
  {
    /**
     * RFC del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'rfc'
     */
    encabezado: 'R.F.C.',
    clave: (item: Proveedor) => item.rfc,
    orden: 2,
  },
  {
    /**
     * CURP del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'curp'
     */
    encabezado: 'CURP',
    clave: (item: Proveedor) => item.curp,
    orden: 3,
  },
  {
    /**
     * Teléfono del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'telefono'
     */
    encabezado: 'Teléfono',
    clave: (item: Proveedor) => item.telefono,
    orden: 4,
  },
  {
    /**
     * Correo electrónico del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'correoElectronico'
     */
    encabezado: 'Correo electrónico',
    clave: (item: Proveedor) => item.correoElectronico,
    orden: 5,
  },
  {
    /**
     * Calle del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'calle'
     */
    encabezado: 'Calle',
    clave: (item: Proveedor) => item.calle,
    orden: 6,
  },
  {
    /**
     * Número exterior del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'numeroExterior'
     */
    encabezado: 'Número exterior',
    clave: (item: Proveedor) => item.numeroExterior,
    orden: 7,
  },
  {
    /**
     * Número interior del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'numeroInterior'
     */
    encabezado: 'Número interior',
    clave: (item: Proveedor) => item.numeroInterior,
    orden: 8,
  },
  {
    /**
     * País del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'pais'
     */
    encabezado: 'País',
    clave: (item: Proveedor) => item.pais,
    orden: 9,
  },
  {
    /**
     * Colonia del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'colonia'
     */
    encabezado: 'Colonia',
    clave: (item: Proveedor) => item.colonia,
    orden: 10,
  },
  {
    /**
     * Municipio o alcaldía del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'municipio'
     */
    encabezado: 'Municipio o alcaldía',
    clave: (item: Proveedor) => item.municipio,
    orden: 11,
  },
  {
    /**
     * Localidad del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'localidad'
     */
    encabezado: 'Localidad',
    clave: (item: Proveedor) => item.localidad,
    orden: 12,
  },
  {
    /**
     * Estado del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'estado'
     */
    encabezado: 'Estado',
    clave: (item: Proveedor) => item.estado,
    orden: 13,
  },
  {
    /**
     * Segundo estado del proveedor (si aplica).
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'estado2'
     */
    encabezado: 'Estado',
    clave: (item: Proveedor) => item.estado2,
    orden: 14,
  },
  {
    /**
     * Código postal del proveedor.
     * @param item Instancia de Proveedor
     * @returns Valor de la propiedad 'codigo'
     */
    encabezado: 'Código postal',
    clave: (item: Proveedor) => item.codigo,
    orden: 15,
  },
];

/**
 * Configuración de columnas para la tabla de facturadores.
 * Define cómo se muestran los datos de facturadores en la tabla.
 */
export const CONFIGURACION_COLUMNAS_ENTIDAD: ConfiguracionColumna<Facturador>[] = [
  {
    /**
     * Nombre/denominación o razón social del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'nombre'
     */
    encabezado: 'Nombre/denominación o razón social',
    clave: (item: Fabricante) => item.nombre,
    orden: 1,
  },
  {
    /**
     * RFC del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'rfc'
     */
    encabezado: 'R.F.C.',
    clave: (item: Fabricante) => item.rfc,
    orden: 2,
  },
  {
    /**
     * CURP del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'curp'
     */
    encabezado: 'CURP',
    clave: (item: Fabricante) => item.curp,
    orden: 3,
  },
  {
    /**
     * Teléfono del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'telefono'
     */
    encabezado: 'Teléfono',
    clave: (item: Fabricante) => item.telefono,
    orden: 4,
  },
  {
    /**
     * Correo electrónico del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'correoElectronico'
     */
    encabezado: 'Correo electrónico',
    clave: (item: Fabricante) => item.correoElectronico,
    orden: 5,
  },
  {
    /**
     * Calle del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'calle'
     */
    encabezado: 'Calle',
    clave: (item: Fabricante) => item.calle,
    orden: 6,
  },
  {
    /**
     * Número exterior del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'numeroExterior'
     */
    encabezado: 'Número exterior',
    clave: (item: Fabricante) => item.numeroExterior,
    orden: 7,
  },
  {
    /**
     * Número interior del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'numeroInterior'
     */
    encabezado: 'Número interior',
    clave: (item: Fabricante) => item.numeroInterior,
    orden: 8,
  },
  {
    /**
     * País del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'pais'
     */
    encabezado: 'País',
    clave: (item: Fabricante) => item.pais,
    orden: 9,
  },
  {
    /**
     * Colonia del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'colonia'
     */
    encabezado: 'Colonia',
    clave: (item: Fabricante) => item.colonia,
    orden: 10,
  },
  {
    /**
     * Municipio o alcaldía del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'municipio'
     */
    encabezado: 'Municipio o alcaldía',
    clave: (item: Fabricante) => item.municipio,
    orden: 11,
  },
  {
    /**
     * Localidad del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'localidad'
     */
    encabezado: 'Localidad',
    clave: (item: Fabricante) => item.localidad,
    orden: 12,
  },
  {
    /**
     * Estado del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'estado'
     */
    encabezado: 'Estado',
    clave: (item: Fabricante) => item.estado,
    orden: 13,
  },
  {
    /**
     * Segundo estado del facturador (si aplica).
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'estado2'
     */
    encabezado: 'Estado',
    clave: (item: Fabricante) => item.estado2,
    orden: 14,
  },
  {
    /**
     * Código postal del facturador.
     * @param item Instancia de Facturador
     * @returns Valor de la propiedad 'codigo'
     */
    encabezado: 'Código postal',
    clave: (item: Fabricante) => item.codigo,
    orden: 15,
  },
];