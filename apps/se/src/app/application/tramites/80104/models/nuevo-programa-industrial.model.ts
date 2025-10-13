import { AnexoEncabezado, AnexoUnoEncabezado } from "../../../shared/models/nuevo-programa-industrial.model";
import { AnexoFraccionAnarelaria, AnexoUnoProducto } from "../../../shared/models/complimentos-seccion.model";
import { Catalogo, CatalogoPaises } from "@ng-mf/data-access-user";
import { AnexoDosEncabezado } from "../../../shared/models/nuevo-programa-industrial.model";
import { PlantasSubfabricante } from "../../../shared/models/empresas-subfabricanta.model";
import { ProveedorCliente } from "../../../shared/models/complimentos-seccion.model";

/**
 * Representa la estructura de datos para un servicio IMMEX.
 * 
 * @interface ServicioInmex
 * @property {string} [Servicio] - Nombre del servicio asociado al programa IMMEX.
 * @property {string} [RegistroContribuyentes] - Registro de contribuyentes relacionado con el servicio.
 * @property {string} [DenominaciónSocial] - Denominación social de la empresa asociada.
 * @property {string} [NumeroIMMEX] - Número de identificación del programa IMMEX.
 * @property {string} [AñoIMMEX] - Año en el que se otorgó el programa IMMEX.
 */
export interface ServicioInmex {
  Servicio?: string;
  RegistroContribuyentes?: string;
  DenominaciónSocial?: string;
  NumeroIMMEX?: string;
  AñoIMMEX?: string;
}
/**
 * Representa un servicio con información opcional sobre su descripción y tipo.
 * Esta interfaz se utiliza para modelar los datos relacionados con un servicio específico.
 */
export interface Servicio {
  descripiónDelServicio?: string;
  descripcion?: string;
  tipode?: string;
}

/**
 * Representa la información relacionada con los servicios.
 * 
 * @interface InfoServicios
 * @property {string} seleccionaLaModalidad - Modalidad seleccionada para el servicio.
 * @property {string} folio - Número de folio asociado al servicio.
 * @property {string} ano - Año relacionado con el servicio.
 */
export interface InfoServicios {
  seleccionaLaModalidad: string;
  folio: string;
  ano: string;
}

/**
 * Representa la estructura de los servicios relacionados con un programa industrial.
 * 
 * @interface Servicios
 * @property {string} seleccionaLaModalidad - Modalidad seleccionada para el servicio.
 * @property {string} folio - Número de folio asociado al servicio.
 * @property {string} ano - Año correspondiente al servicio.
 */
export interface Servicios {
  seleccionaLaModalidad: string;
  folio: string;
  ano: string;
}

/**
 * Representa la estructura de un botón de acción con una acción específica y un valor asociado.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Representa los datos de una empresa extranjera.
 * 
 * @interface DatosEmpresaExtranjera
 * @property {string} id - Identificador único de la empresa extranjera.
 * @property {string} taxIdEmpresaExt - Identificación fiscal de la empresa extranjera.
 * @property {string} nombreEmpresaExt - Nombre de la empresa extranjera.
 * @property {string} entidadFederativaEmpresaExt - Entidad federativa donde se encuentra la empresa extranjera.
 * @property {string} direccionEmpresaExtranjera - Dirección física de la empresa extranjera.
 */
export interface DatosEmpresaExtranjera {
  id: string;
  taxIdEmpresaExt: string;
  nombreEmpresaExt: string;
  entidadFederativaEmpresaExt: string;
  direccionEmpresaExtranjera: string;
}

/**
 * Representa los datos de un catálogo utilizados en la aplicación.
 * Esta interfaz define las propiedades necesarias para configurar
 * y mostrar un elemento de catálogo en la interfaz de usuario.
 *
 * @property labelNombre - El nombre que se mostrará como etiqueta del campo.
 * @property campo - El identificador del campo asociado al catálogo.
 * @property class - La clase CSS que se aplicará al elemento para estilos personalizados.
 * @property tipo_input - El tipo de entrada (input) que se utilizará, como texto, número, etc.
 * @property required - Indica si el campo es obligatorio (true) o no (false).
 * @property opciones - Una lista opcional de países disponibles en el catálogo.
 * @property opcionesCatalogo - Una lista opcional de elementos genéricos del catálogo.
 * @property orden - El orden en el que se mostrará el elemento en la interfaz.
 */
export interface DatosCatalago {
  labelNombre: string;
  campo: string;
  class: string;
  tipo_input: string;
  required: boolean;
  opciones?: CatalogoPaises[]
  opcionesCatalogo?: Catalogo[];
  orden: number;
}

/**
 * Representa la estructura de datos para los anexos dos y tres.
 * Contiene listas de encabezados para cada uno de los anexos.
 */
export interface AnnexoDosTres {
  anexoDosTablaLista: AnexoEncabezado[];
  anexoTresTablaLista: AnexoEncabezado[];
}

/**
 * Representa la estructura de datos para el modelo de "Anexo Uno".
 * Esta interfaz define las propiedades necesarias para manejar la información
 * relacionada con la exportación, importación y navegación de datos, así como
 * la sección activa en el contexto de un programa industrial.
 *
 * Propiedades:
 * - `exportarDatosTabla`: Lista de encabezados de tipo `AnexoDosEncabezado` que representan los datos a exportar.
 * - `importarDatosTabla`: Lista de encabezados de tipo `AnexoUnoEncabezado` que representan los datos a importar.
 * - `datosParaNavegar`: Encabezado de tipo `AnexoUnoEncabezado` o `AnexoDosEncabezado` utilizado para la navegación de datos.
 * - `seccionActiva`: Cadena que indica la sección activa actual.
 */
export interface AnnexoUno {
  exportarDatosTabla: AnexoFraccionAnarelaria[];
  importarDatosTabla: AnexoUnoProducto[];
  datosParaNavegar: AnexoUnoEncabezado | AnexoDosEncabezado;
  seccionActiva: string;
  proveedorClienteDatosTabla: ProveedorCliente[];
  proveedorClienteDatosTablaDos: ProveedorCliente[];
}
/**
 * Representa la respuesta de una solicitud de ampliación de servicios.
 * 
 * @interface AmpliacionServiciosResponse
 * @property {number} code - Código de respuesta del servicio.
 * @property {object} data - Datos relacionados con la ampliación de servicios.
 * @property {string} data.idsubmanufacturer - ID del subfabricante.
 * @property {InfoServicios} data.infoServicios - Información sobre los servicios.
 */
export interface AmpliacionServiciosResponse {
  code: number;
  data: {
    idsubmanufacturer: string;
    infoServicios: InfoServicios;
  };
}
/*
  * Representa la respuesta de una solicitud de ampliación de servicios.
  * 
  * @interface AmpliacionServiciosResponse
  * @property {number} code - Código de respuesta del servicio.
  * @property {object} data - Datos relacionados con la ampliación de servicios.
  * @property {string} data.idsubmanufacturer - ID del subfabricante.
  * @property {InfoServicios} data.infoServicios - Información sobre los servicios.
  */
export interface CatalogoResponso {
  code: number;
  data: Catalogo[];
  message: string;
}
/*
  * Representa la respuesta de una solicitud de catálogo.
  * 
  * @interface CatalogoResponse
  * @property {number} code - Código de respuesta del catálogo.
  * @property {Catalogo[]} data - Datos del catálogo.
  * @property {string} message - Mensaje asociado a la respuesta.
  */
export interface PlantasSubfabricanteResponse {
  code: number;
  data: PlantasSubfabricante[];
}

/**
* Representa los datos de la tabla para proveedores y clientes en el contexto de un programa industrial.
*
* @property {number} idProveedor - Identificador único del proveedor.
* @property {string} paisOrigen - País de origen del proveedor.
* @property {string} rfcProveedor - RFC del proveedor.
* @property {string} razonProveedor - Razón social del proveedor.
* @property {string} paisDestino - País de destino del cliente.
* @property {string} rfcClinte - RFC del cliente.
* @property {string} razonSocial - Razón social del cliente.
* @property {string} domicilio - Domicilio del cliente.
* @property {boolean} testado - Indica si el producto ha sido testado.
* @property {number} idProductoP - Identificador del producto.
* @property {string} descTestado - Descripción del estado de testado.
*/
export interface ProveedorClienteDatosTabla {
  idProveedor: number;
  paisOrigen: string;
  rfcProveedor: string;
  razonProveedor: string;
  paisDestino: string;
  rfcClinte: string;
  razonSocial: string;
  domicilio: string;
  testado: boolean;
  idProductoP: number;
  descTestado: string;
}

/**
 * Representa la estructura del Anexo 1, que contiene información sobre el encabezado de la fracción y su descripción.
 *
 * @property {string} encabezadoFraccion - Texto que identifica el encabezado de la fracción.
 * @property {string} encabezadoDescripcion - Descripción asociada al encabezado de la fracción.
 */
export interface Anexo1 {
  encabezadoFraccion: string;
  encabezadoDescripcion: string
}

/**
* Interfaz que representa la información fiscal disponible de una empresa.
*/
export interface DisponsibleFiscal {
  /** Nombre de la calle. */
  calle: string;
  /** Número exterior. */
  numeroExterior: string;
  /** Número interior. */
  numeroInterior?: string;
  /** Código postal. */
  codigoPostal: string;
  /** Nombre de la colonia. */
  colonia: string;
  /** Municipio o delegación. */
  municipioDelegacion: string;
  /** Entidad federativa. */
  entidadFederativa: string | undefined;
  /** País. */
  pais: string;
  /** Registro Federal de Contribuyentes (RFC). */
  registroFederalContribuyentes: string;
  /** Domicilio fiscal del solicitante. */
  domicilioFiscalSolicitante: string;
  /** Razón social. */
  razonSocial: string;
}