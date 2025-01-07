export interface RespuestaSolicitud {
  codigo: number;
  descripcion: string;
  data: string;
  message: string;
}
export interface Solicitud {
  id_solicitud: string;
  datos_solicitante: {
    generales: DatosGenerales;
    domicilio_fiscal: DomicilioFiscal;
  };
  datos_solicitud: {
    tipo: number;
    datos_importador_exportador: DatosImportador;
    datos_servicio: DatosServicio;
    datos_despacho: DatosDespacho;
    datos_pedimento: DatosPedimento;
    mercancia: DatosMercancia;
    responsables_despacho: Array<ResponsablesDespacho>;
    pagos: DatosPago;
  };
  terceros_relacionados: Array<Personas>;
  requisitos: Array<TipoDocumento>;
}

export interface DatosGenerales {
  curp: string;
  rfc: string;
  nombre: string;
  a_paterno: string;
  a_materno: string;
  act_economica: string;
  correo: string;
}
export interface DomicilioFiscal {
  pais: string;
  codigo_postal: string;
  entidad_federativa: string;
  municipio: string;
  localidad: string;
  colonia: string;
  calle: string;
  n_ext: string;
  n_int: string;
  lada: string;
  telefono: string;
}
export interface PersonaTerceros {
  nombre: string;
  correo: string;
}

export interface DatosImportador {
  rfc: string;
  nombre: string;
  nro_registro: string;
  programa_fomento: string;
  immex: string;
  industria_automotriz: string;
  tipo_empresa: DatosTipoEmpresa;
  id_socio_comercial: string;
}

export interface DatosTipoEmpresa {
  certificacion_a: boolean;
  certificacion_aa: boolean;
  certificacion_aaa: boolean;
  socio_comercial: boolean;
  op_economico_aut: boolean;
  revision_origen: boolean;
}

export interface DatosServicio {
  f_inicio: string;
  h_inicio: string;
  f_final: string;
  h_final: string;
  f_seleccionadas: Array<string>;
}
export interface DatosDespacho {
  despacho: DatosDespacho;
  rfc_autorizacion: string;
  ddex_autorizacion: string;
  aduana: string;
  seccion_aduanera: string;
  nombre_recinto: string;
  tipo_despacho: string;
  tipo_operacion: string;
  patente: string;
  relacion_sociedad: boolean;
  encargo_conferido: boolean;
  domicilio: string;
}

export interface DatosDespacho {
  lda: boolean;
  dd: boolean;
}
export interface DatosPedimento {
  patente: number;
  pedimento: number;
  aduana: number;
  tipo_pedimento: string;
  numero: number;
  comprobante_valor: string;
  pedimento_validado: boolean;
}

export interface DatosMercancia {
  pais_origen: number;
  pais_procedencia: number;
  descripcion: string;
  justificacion: string;
}
export interface ResponsablesDespacho {
  gafete: string;
  nombre: string;
  a_paterno: string;
  a_materno: string;
}
export interface DatosPago {
  monto_pagar: string;
  linea_captura: string;
  monto: number;
}

export interface Personas {
  razon_social: string;
  correo: string;
}

export interface TipoDocumento {
  tipo_documento: number;
}

export interface ListaPasosWizard {
  indice: number;
  titulo: string;
  activo: boolean;
  completado: boolean;
}

// Pedimento
export interface DatosComponentePedimento {
  patente: number;
  idAduana: number;
}
