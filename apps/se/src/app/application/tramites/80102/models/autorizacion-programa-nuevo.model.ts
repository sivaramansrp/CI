import { AnexoDosEncabezado,AnexoEncabezado,AnexoUnoEncabezado } from "../../../shared/models/nuevo-programa-industrial.model";
import { Catalogo, CatalogoPaises } from "@ng-mf/data-access-user";

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
  opciones?: CatalogoPaises[]
  opcionesCatalogo?: Catalogo[];
  orden: number;
}

export interface AnnexoDosTres{
  anexoDosTablaLista: AnexoEncabezado[];
  anexoTresTablaLista: AnexoEncabezado[];
}

export interface AnnexoUno{
  exportarDatosTabla: AnexoDosEncabezado[];
  importarDatosTabla:AnexoUnoEncabezado[];
  datosParaNavegar:AnexoUnoEncabezado | AnexoDosEncabezado ;
  seccionActiva: string;
}