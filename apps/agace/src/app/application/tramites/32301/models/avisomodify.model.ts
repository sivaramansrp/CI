export interface FormularioGrupo {
  /** Fechas seleccionadas para el formulario */
  fechasSeleccionadas: FechasSeleccionadas;
  /** Tipo de devolución y aviso */
  tipoDevAviso: TipoDevAviso,
  /** Información del proveedor extranjero */
  proveedorExtranjero: ProveedorExtranjero,
  /** Modificación de socios en el trámite */
  modificacionSocios: ModificacionSocios,
  /** Modificación de goce de inmueble */
  modificacionGoceInmueble: ModificacionGoceInmueble,
  /** Información de la persona involucrada en la fusión o escisión */
  personaFusionEscisionDTO: PersonaFusionEscisionDTO,
  /** Datos de la empresa */
  datosEmpresa: DatosEmpresa,
  /** Tipo de carga del trámite */
  cargaTipo: CargaTipo,
  /** Datos de quien recibe el trámite */
  datosQuienRecibe: DatosQuienRecibe,
  /** Datos del domicilio del lugar relacionado con el trámite */
  datosDomicilioLugar: DatosDomicilioLugar,
  /** Datos de la mercancía y submanufactura */
  datosMercanciaSubmanufactura: DatosMercanciaSubmanufactura,
}

export interface TipoDevAviso {
  /** Modalidad de certificación */
  modalidadCertificacion: string;
  /** Indica si es un cliente o proveedor extranjero */
  foreignClientsSuppliers: boolean,
  /** Indica si es un proveedor nacional */
  nationalSuppliers: boolean,
  /** Indica si hay modificaciones de socios */
  modificationsMembers: boolean,
  /** Indica si hay cambios en los documentos legales */
  changesToLegalDocuments: boolean,
  /** Indica si es un aviso de fusión o escisión */
  mergerOrSplitNotice: boolean,
  /** Indica si hay fracciones adicionales */
  additionFractions: boolean,
  /** Aceptación de la sección 253 */
  acepto253: boolean,
}

export interface ProveedorExtranjero {
  /** Archivo relacionado con el proveedor extranjero (puede ser nulo) */
  archivoExtranjero: object | null,
  /** Registros de proveedores extranjeros */
  registrosProveedoresExtranjeros: string
}

export interface ModificacionSocios {
  /** Número que identifica la modificación del socio */
  ensucarácterde: number,
  /** Indica si está obligado a tributar en México */
  obligadoaTributarenMéxico: boolean,
  /** Nacionalidad del socio */
  nacionalidad: number,
  /** Registro federal de contribuyentes del socio (puede ser nulo) */
  registroFederaldeContribuyentes: object | null,
  /** RFC del socio */
  rfc: string,
  /** Nombre completo del socio */
  nombreCompleto: string
}

export interface ModificacionGoceInmueble {
  /** Identificador del inmueble */
  idAviInmueble: string,
  /** Dirección del inmueble */
  direccion: string,
  /** Código postal del inmueble */
  codigoPostal: string,
  /** Clave de la entidad federativa */
  cveEntidad: string,
  /** Clave del municipio */
  cveMunicipio: string,
  /** Clave del tipo de documento */
  cveTipoDoc: string,
  /** Fecha de inicio del goce anterior */
  fechaInicioAnterior: string,
  /** Fecha de fin del goce anterior */
  fechaFinAnterior: string,
  /** Fecha de inicio del goce actual */
  fechaInicioActual: string,
  /** Fecha de fin del goce actual */
  fechaFinActual: string,
  /** RFC de las partes contratantes */
  rfcPartesC: string,
  /** RFC de las partes contratantes (consorcio) */
  rfcPartesCons: string,
  /** Nombre de las partes contratantes (consorcio) */
  nombrePartesCons: string,
  /** Caracter de las partes contratantes */
  caracterDeCons: string,
  /** Observaciones sobre el inmueble */
  observaciones: string
}

export interface PersonaFusionEscisionDTO {
  /** RFC de la persona o entidad */
  rfc: string,
  /** Razón social de la persona o entidad */
  razonSocial: string,
  /** Número de folio del trámite */
  numFolioTramite: string,
  /** Fecha de inicio de la vigencia */
  fechaInicioVigencia: string,
  /** Fecha de fin de la vigencia */
  fechaFinVigencia: string
}

export interface DatosEmpresa {
  /** Número de programa asociado */
  numeroPrograma: string,
  /** Año del programa */
  anoPrograma: string,
  /** Mes al que corresponde el aviso */
  mesCorrespondeAviso: string,
  /** Año al que corresponde el aviso */
  anoCorrespondeAviso: string,
}

export interface CargaTipo {
  /** Tipo de carga del formulario */
  cargaTipo: string,
}

export interface FechasSeleccionadas {
  /** Array de fechas seleccionadas */
  fechasSeleccionadas: string[] // Se asume que es un array de cadenas, ajustar si es necesario
}

export interface DatosQuienRecibe {
  /** RFC de quien recibe */
  rfc: string,
  /** Número de programa del receptor */
  numberProgramaQr: string,
  /** Año del programa del receptor */
  anoProgramaQr: string,
}

export interface DatosDomicilioLugar {
  /** Nombre comercial del lugar */
  nombreComercial: string,
  /** Entidad federativa del lugar */
  entidadFederativa: string,
  /** Alcaldía o municipio del lugar */
  alcaldiaMunicipio: string,
  /** Colonias asociadas al lugar */
  colonias: string,
  /** Calle del lugar */
  calle: string,
  /** Número exterior del lugar */
  numeroExterior: string,
  /** Número interior del lugar */
  numeroInterior: string,
  /** Código postal del lugar */
  codigoPostal: string,
}

export interface DatosMercanciaSubmanufactura {
  /** Fracción arancelaria de la mercancía */
  fracArancelaria: string,
  /** NICO (Número de Identificación de la Mercancía) */
  nico: string,
  /** Unidad de medida de la mercancía */
  unidadMedida: string,
  /** Cantidad de mercancía */
  cantidad: string,
  /** Valor en dólares estadounidenses de la mercancía */
  valorUsd: string,
  /** Descripción de la mercancía */
  descripcionMercancia: string,
}

export interface ColumnasTabla {
  /** RFC de la entidad */
  rfc: string,
  /** Nombre comercial de la entidad */
  nombreComercial: string,
  /** Entidad federativa de la entidad */
  entidadFederativa: string,
  /** Alcaldía o municipio de la entidad */
  alcaldioOMuncipio: string,
  /** Colonia de la entidad */
  colonia: string,
}

export interface TableDataNgTable {
  /** Encabezados de la tabla */
  tableHeader: string[],
  /** Cuerpo de la tabla */
  tableBody: TBodyData[],
}

export interface TBodyData {
  /** Datos de las filas del cuerpo de la tabla */
  tbodyData: string[]
}
