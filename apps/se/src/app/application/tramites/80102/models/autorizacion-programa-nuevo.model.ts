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
  clave?: string;
  descripionDelServicio?: string;
  descripcion?: string;
  tipode?: string;
  ide_tipo_servicio_immex?: string;
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
  maxlength?: number;
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

 /**
   * Constante para configurar el input de fecha.
   * Define las propiedades del campo de entrada de fecha.
   */
   export const INPUT_FECHA_CONFIG = {
        /**
         * Propiedad labelNombre
         * Descripción: Etiqueta que se muestra como nombre del campo.
         */
        labelNombre: 'Fecha de expedición',
      
        /**
         * Propiedad required
         * Descripción: Indica si el campo es obligatorio.
         */
        required: true,
      
        /**
         * Propiedad habilitado
         * Descripción: Indica si el campo está habilitado para su edición.
         */
        habilitado: true,
      }

       /**
   * Constante para configurar el input de fecha.
   * Define las propiedades del campo de entrada de fecha.
   */
   export const INPUT_FECHA_CONFIGURACION = {
        /**
         * Propiedad labelNombre
         * Descripción: Etiqueta que se muestra como nombre del campo.
         */
        labelNombre: 'Fecha de emisión del acta',
      
        /**
         * Propiedad required
         * Descripción: Indica si el campo es obligatorio.
         */
        required: true,
      
        /**
         * Propiedad habilitado
         * Descripción: Indica si el campo está habilitado para su edición.
         */
        habilitado: true,
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
    export interface Anexo1{
       encabezadoFraccion: string; 
      encabezadoDescripcion: string
     }