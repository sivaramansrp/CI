/**
 * Representa las columnas del histórico de productores.
 */
export interface HistoricoColumnas {
  id: number;
  nombreProductor: string;
  numeroRegistroFiscal: string;
  direccion: string;
  correoElectronico: string;
  telefono: string;
  fax: string;
}
/**
 * Representa los datos del productor exportador.
 */
export interface ProductorExportador {
  datos: HistoricoColumnas[];
}
/**
 * Representa un elemento de un catálogo.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
}
/**
 * Representa una lista de elementos de un catálogo.
 */
export interface CatalogoLista {
  datos: Catalogo[];
}
/**
 * Representa el formulario para agregar datos del productor.
 */
export interface AgregarDatosProductorFormulario {
  numeroRegistroFiscal: string;
  fax: string;
}
/**
 * Representa los datos del grupo receptor.
 */
export interface GrupoReceptor {
  nombre: string;
  apellidoPrimer: string;
  apellidoSegundo: string;
  numeroFiscal: string;
  razonSocial: string;
}
/**
 * Representa los datos del grupo de direcciones.
 */
export interface GrupoDeDirecciones {
  ciudad: string;
  calle: string;
  numeroLetra: string;
  lada: string;
  telefono: string;
  fax: string;
  correoElectronico: string;
}
/**
 * Representa los datos del grupo representativo.
 */
export interface GrupoRepresentativo {
  lugar: string;
  nombreExportador: string;
  empresa: string;
  cargo: string;
  lada: string;
  telefono: string;
  fax: string;
  correoElectronico: string;
}
/**
 * Representa los datos del grupo de transporte.
 */
export interface GrupoDeTransporte {
  puertoEmbarque: string;
  puertoDesembarque: string;
  puertoTransito: string;
  nombreEmbarcacion: string;
  numeroVuelo: string;
}
/**
 * Representa una acción de un botón.
 */
export interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Representa los datos del grupo operador.
 */
export interface GrupoOperador {
  nombre: string;
  apellidoPrimer: string;
  apellidoSegundo: string;
  numeroFiscal: string;
  razonSocial: string;
}
/**
 * Representa los datos del grupo de domicilio.
 */
export interface GrupoDeDomicilio {
  pais: string;
  ciudad: string;
  calle: string;
  numeroLetra: string;
  lada: string;
  telefono: string;
  fax: string;
  correoElectronico: string;
}
/**
 * Representa los datos del grupo tratado.
 */
export interface GrupoTratado {
  tratado: string;
  pais: string;
  fraccionArancelaria: string;
  numeroRegistro: string;
  nombreComercial: string;
  fechaFinalInput: string;
  fechaInicialInput: string;
}

/**
 * Representa los datos de la tabla de mercancías disponibles.
 */
export interface DisponiblesTabla {
  id?: number;
  fraccionArancelaria: string;
  nombreTecnico: string;
  nombreComercial: string;
  numeroRegistroProductos: string;
  fechaExpedicion: string;
  fechaVencimiento: string;
}
/**
 * Representa los datos de la tabla de mercancías seleccionadas.
 */
export interface SeleccionadasTabla {
  id: number;
  fraccionArancelaria: string;
  cantidad: string;
  unidadMedida: string;
  valorMercancia: string;
  tipoFactura: string;
  numFactura: string;
  complementoDescripcion: string;
  fechaFactura: string;
}
/**
 * Representa los datos del formulario de mercancías.
 */
export interface FormularioMercancia {
  fraccionMercanciaArancelaria: string;
  nombreTecnico: string;
  nombreComercialDelaMercancia: string;
  criterioParaConferir: string;
  nombreEnIngles: string;
  otrasInstancias: string;
  cantidad: string;
  pais: string;
  valorDelaMercancia: string;
  complementoDelaDescripcion: string;
  tipoFactura: string;
  fecha: string;
  numeroFactura: string;
}

/**
 *  Representa los datos del formulario de certificado de origen.
  *  @interface FormularioCertificadoOrigen
  */ 
export interface RespuestaConsulta {
  success: boolean;
  datos: ConsultaDatos;
  message: string;
}

/**
 *  Representa los datos de la consulta del certificado de origen.
 *  @interface ConsultaDatos
  */
export interface ConsultaDatos {
  tercerOperador: boolean;
  grupoOperador: GrupoOperador;
  grupoTratado: GrupoTratado;
  grupoDeDomicilio: GrupoDeDomicilio;
  mercanciaSeleccionadasTablaDatos: SeleccionadasTabla[];
  mercanciaDisponsiblesTablaDatos: DisponiblesTabla[];
  observaciones: string;
  idioma: string;
  entidadFederativa: string;
  representacionFederal: string;
  grupoReceptor: GrupoReceptor;
  grupoDeDirecciones: GrupoDeDirecciones;
  grupoRepresentativo: GrupoRepresentativo;
  grupoDeTransporte: GrupoDeTransporte;
  datosConfidencialesProductor: boolean;
  productorMismoExportador: boolean;
  productoresExportador: HistoricoColumnas[];
}
