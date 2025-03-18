import { Catalogo, CatalogoPaises } from "@ng-mf/data-access-user";

export interface ServicioInmex {
  Servicio?: string;
  RegistroContribuyentes?: string;
  DenominaciónSocial?: string;
  NumeroIMMEX?: string;
  AñoIMMEX?: string;
}
export interface Servicio {
  descripiónDelServicio?: string;
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