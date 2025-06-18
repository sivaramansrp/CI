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
 * @interface RespuestaConsulta
 * @description Representa la respuesta de una consulta realizada en el trámite.
 * 
 * @property {boolean} success - Indica si la consulta fue exitosa.
 * @property {ConsultaDatos} datos - Contiene los datos obtenidos de la consulta.
 * @property {string} message - Mensaje asociado a la respuesta de la consulta.
 */
export interface RespuestaConsulta {
  success: boolean;
  datos: ConsultaDatos;
  message: string;
}
/**
 * @interface ConsultaDatos
 * @description Representa los datos obtenidos de una consulta en el trámite.
 * 
 * @property {boolean} tercerOperador - Indica si existe un tercer operador involucrado.
 * @property {GrupoOperador} grupoOperador - Información del grupo operador.
 * @property {GrupoTratado} grupoTratado - Información del grupo tratado.
 * @property {SeleccionadasTabla[]} mercanciaSeleccionadasTablaDatos - Lista de mercancías seleccionadas en la tabla de datos.
 * @property {DisponiblesTabla[]} mercanciaDisponsiblesTablaDatos - Lista de mercancías disponibles en la tabla de datos.
 * @property {string} observaciones - Observaciones relacionadas con la consulta.
 * @property {string} idioma - Idioma utilizado en la consulta.
 * @property {string} entidadFederativa - Entidad federativa asociada a la consulta.
 * @property {string} representacionFederal - Representación federal asociada a la consulta.
 * @property {GrupoReceptor} grupoReceptor - Información del grupo receptor.
 * @property {GrupoDeDirecciones} grupoDeDirecciones - Información del grupo de direcciones.
 * @property {GrupoRepresentativo} grupoRepresentativo - Información del grupo representativo.
 */
export interface ConsultaDatos {
  tercerOperador: boolean;
  grupoOperador: GrupoOperador;
  grupoTratado: GrupoTratado;
  mercanciaSeleccionadasTablaDatos: SeleccionadasTabla[]
  mercanciaDisponsiblesTablaDatos: DisponiblesTabla[];
  observaciones: string;
  idioma: string;
  entidadFederativa: string;
  representacionFederal: string;
  grupoReceptor: GrupoReceptor;
  grupoDeDirecciones: GrupoDeDirecciones;
  grupoRepresentativo: GrupoRepresentativo;
}