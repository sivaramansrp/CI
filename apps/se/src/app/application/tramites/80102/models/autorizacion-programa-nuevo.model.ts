import { AnexoDosEncabezado,AnexoEncabezado,AnexoUnoEncabezado } from "../../../shared/models/nuevo-programa-industrial.model";
import { Catalogo, CatalogoPaises } from "@ng-mf/data-access-user";

/**
 * @description Interfaz que representa los datos de un servicio IMMEX.
 * Contiene información como el servicio, registro de contribuyentes, denominación social, número IMMEX y año IMMEX.
 */

export interface ServicioInmex {
  servicio?: string;
  registroContribuyentes?: string;
  denominacionSocial?: string;
  numeroIMMEX?: string;
  anoIMMEX?: string;
}
/**
 * @description Interfaz que describe un servicio genérico.
 * Incluye información como la descripción del servicio y el tipo.
 */

export interface Servicio {
  descripionDelServicio?: string;
  descripcion?: string;
  tipode?: string;
}


/**
 * @description Interfaz que representa la información de los servicios.
 * Incluye modalidad seleccionada, folio y año.
 */
export interface InfoServicios {
  seleccionaLaModalidad: string;
  folio: string;
  ano: string;
}

/**
 * @description Interfaz que representa los servicios.
 * Contiene modalidad seleccionada, folio y año.
 */
export interface Servicios {
  seleccionaLaModalidad: string;
  folio: string;
  ano: string;
}

/**
 * @description Interfaz que define una acción de botón.
 * Contiene la acción y un valor asociado.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * @description Interfaz que representa los datos de una empresa extranjera.
 * Incluye información como ID, tax ID, nombre, entidad federativa y dirección.
 */
export interface DatosEmpresaExtranjera {
  id: string;
  taxIdEmpresaExt: string;
  nombreEmpresaExt: string;
  entidadFederativaEmpresaExt: string;
  direccionEmpresaExtranjera: string;
}

/**
 * @description Interfaz que define los datos de un catálogo.
 * Contiene información como el nombre del campo, tipo de entrada, si es requerido, opciones y orden.
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
  maxLength?: number;
}

/**
 * @description Interfaz que representa los datos de los anexos dos y tres.
 * Contiene listas de encabezados para ambos anexos.
 */
export interface AnnexoDosTres{
  anexoDosTablaLista: AnexoEncabezado[];
  anexoTresTablaLista: AnexoEncabezado[];
}

/**
 * @description Interfaz que representa los datos del anexo uno.
 * Incluye información como datos para exportar, importar, datos para navegar y la sección activa.
 */
export interface AnnexoUno{
  exportarDatosTabla: AnexoDosEncabezado[];
  importarDatosTabla:AnexoUnoEncabezado[];
  datosParaNavegar:AnexoUnoEncabezado | AnexoDosEncabezado ;
  seccionActiva: string;
}