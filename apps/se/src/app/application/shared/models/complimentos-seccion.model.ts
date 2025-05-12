import { Catalogo, CatalogoPaises } from '@ng-mf/data-access-user';

import {
  AnexoDosEncabezado,
  AnexoEncabezado,
  AnexoUnoEncabezado,
} from './nuevo-programa-industrial.model';

/**
 * Interfaz para representar la nacionalidad mexicana.
 * @interface NacionalidadMaxicana
 */
export interface NacionalidadMaxicana {
  label: string; // Etiqueta visible para el usuario
  value: string; // Valor asociado a la etiqueta
}

/**
 * Interfaz para representar los datos de socios y accionistas.
 * @interface SociaoAccionistas
 */
export interface SociaoAccionistas {
  id?: string; // Identificador único del socio o accionista
  rfc?: string; // Registro Federal de Contribuyentes
  taxId?: string; // Identificación fiscal (Tax ID)
  razonSocial?: string; // Denominación o razón social
  pais?: string; // País de origen
  codigoPostal?: string; // Código postal
  estado?: string; // Estado o región
  correoElectronico?: string; // Correo electrónico
  nombre?: string; // Nombre del socio o accionista
  apellidoPaterno?: string; // Apellido paterno
  apellidoMaterno?: string; // Apellido materno
  cp?: string; // Código postal (abreviado)
}

/**
 * Interfaz para representar la respuesta de los catálogos.
 * @interface RespuestaCatalogos
 */
export interface RespuestaCatalogos {
  code: number; // Código de respuesta (por ejemplo, 200 para éxito)
  data: Catalogo[]; // Lista de elementos del catálogo
  message: string; // Mensaje asociado a la respuesta
}

export interface ServicioInmex {
  servicio?: string;
  registroContribuyentes?: string;
  denominacionSocial?: string;
  numeroIMMEX?: string;
  anoIMMEX?: string;
}
export interface Servicio {
  descripionDelServicio?: string;
  descripcion?: string;
  tipode?: string;
}

export interface InfoServicios {
  seleccionaLaModalidad: string;
  folio: string;
  ano: string;
}

export interface Servicios {
  seleccionaLaModalidad: string;
  folio: string;
  ano: string;
}

export interface AccionBoton {
  accion: string;
  valor: number;
}

export interface DatosEmpresaExtranjera {
  id: string;
  taxIdEmpresaExt: string;
  nombreEmpresaExt: string;
  entidadFederativaEmpresaExt: string;
  direccionEmpresaExtranjera: string;
}

export interface DatosCatalago {
  labelNombre: string;
  campo: string;
  class: string;
  tipo_input: string;
  required: boolean;
  opciones?: CatalogoPaises[];
  opcionesCatalogo?: Catalogo[];
  orden: number;
}

export interface AnnexoDosTres {
  anexoDosTablaLista: AnexoEncabezado[];
  anexoTresTablaLista: AnexoEncabezado[];
}

export interface AnnexoUno {
  exportarDatosTabla: AnexoDosEncabezado[];
  importarDatosTabla: AnexoUnoEncabezado[];
  datosParaNavegar: AnexoUnoEncabezado | AnexoDosEncabezado;
  seccionActiva: string;
}
export interface AnexoUnoProducto {
  fraccion: string;
  fraccionArancelaria: string;
  descripcion: string;
  anexoII: string;
  tipo: string;
  umt: string;
  categoria: string;
  valorModedaMensual: string;
  valorModedaAnual: string;
  valorMensual: string;
  valorAnual: string;
}
export interface ProveedorCliente {
  fraccion: string;
  paisDeOrigen: string;
  rfcTaxIdProveedor: string;
  razonSocialProveedor: string;
  paisDestino: string;
  rfcTaxClient: string;
  razonsocialCliente: string;
}

export interface ProyectoImmex {
  encabezadoFraccion:string;
  encabezadoTipoDocument: string;
  encabezadoDescripcionOtro: string;
  encabezadoFechaFirma: string;
  encabezadoFechaVigencia: string;
  encabezadoRfc: string;
  encabezadoRazonFirmante: string;

}