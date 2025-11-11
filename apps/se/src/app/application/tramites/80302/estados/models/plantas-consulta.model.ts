 
  export interface DomicilioInfo {
    id?: number;
    calle?: string; // Calle de la dirección
    numeroExterior?: string; // Número exterior de la dirección
    numeroInterior?: string; // Número interior de la dirección
    codigoPostal?: string; // Código postal
    localidad?: string; // Localidad
    colonia?: string; // Colonia
    delegacionMunicipio?: string; // Delegación o municipio
    entidadFederativa?: string; // Entidad federativa
    pais?: string; // País
    telefono?: string; // Teléfono
    idPlanta?: string; // ID de la planta (como cadena de texto)
    idSolicitud?: string; // Opcional, ya que puede estar indefinido (id de la solicitud)
    razonSocial?: string; // Razón social
    desEstatus?: 'Baja' | 'Activada'; // Valor fijo que puede ser 'Baja' o 'Activada'
    estatus?: boolean; // Valor booleano para el estado
    rfc?: string
  }
  
  export interface Complimentaria {
    rfc?: string;
    nombre?: string;
    apellidoPrimer?: string;
    apellidoSegundo?: string;
  }

  export interface Federetarios {
    nombre?: string;
    apellidoPrimer?: string;
    apellidoSegundo?: string;
    numeroActa?: string;
    fetchActa?: string;
    numeroNotaria?: string;
    municipioDelegacion?: string;
    estado?: string;

  }

  export interface Operacions extends Complimentaria, Federetarios, DomicilioInfo {
    razonSocial?: string;
    fiscalSolicitante?: string;

    rfc?: string;
    nombre?: string;
    apellidoPrimer?: string;
    apellidoSegundo?: string;

    numeroActa?: string;
    fetchActa?: string;
    numeroNotaria?: string;
    municipioDelegacion?: string;
    estado?: string;

    id?: number;
    calle?: string; // Calle de la dirección
    numeroExterior?: string; // Número exterior de la dirección
    numeroInterior?: string; // Número interior de la dirección
    codigoPostal?: string; // Código postal
    localidad?: string; // Localidad
    colonia?: string; // Colonia
    delegacionMunicipio?: string; // Delegación o municipio
    entidadFederativa?: string; // Entidad federativa
    pais?: string; // País
    telefono?: string; // Teléfono
    idPlanta?: string; // ID de la planta (como cadena de texto)
    idSolicitud?: string; // Opcional, ya que puede estar indefinido (id de la solicitud)
    desEstatus?: 'Baja' | 'Activada'; // Valor fijo que puede ser 'Baja' o 'Activada'
    estatus?: boolean; // Valor booleano para el estado
  }

  export interface Bitacora {
    tipoModificion: string;
    fetchModificion: string;
    valoresAnteriores: string;
    valoresNuevos: string;
  }

  export interface Anexo {
    tipoFraccion?: string;
    fraccionArancelariaExportacion?: string;
    fraccionArancelariaImportacion?: string;
    descripcion?: string;
    valoresAnteriores?: string;
    fraccionArancelariaDeLaMercanciaDeImportacion?: number;
    cantidad?: number;
    valor?: number;
    unidadMedida?: string;
  }

  export interface DatosModificacion {
    
      rfc: string;
      representacionFederal: string;
      tipoModalidad: string;
      descripcionModalidad: string;
  
  }

  export interface DatosSocioAccionista {
    idSolicitud?: number | null;
    nombre?: string;
    rfc?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    curp?: string | null;
    descripcionGiro?: string | null;
    correoElectronico?: string | null;
  }

  export interface Notario {
  idNotario?: string | null;
  idSolicitud?: string | null;
  nombreNotario?: string | null;
  apellidoMaterno?: string | null;
  apellidoPaterno?: string | null;
  rfc?: string | null;
  numeroActa?: string | null;
  fechaActa?: string | null;
  numeroNotaria?: string | null;
  numeroNotario?: string | null;
  delegacionMunicipio?: string | null;
  entidadFederativa: string | null;
}

export interface OperacionsImmex {
  idPlanta: string | null;
  calle: string | null;
  numeroInterior: string | null;
  numeroExterior: string | null;
  codigoPostal: string | null;
  colonia: string | null;
  delegacionMunicipio: string | null;
  entidadFederativa: string | null;
  pais: string | null;
  rfc: string | null;
  domicilioFiscal: string | null;
  razonSocial: string | null;
  claveEntidadFederativa: string | null;
  clavePlantaEmpresa: string | null;
  clavePais: string | null;
  claveDelegacionMunicipio: string | null;
  estatus: boolean;
  desEstatus: string | null;
  localidad: string | null;
  telefono: string | null;
  idSolicitud: string | null;
  fax: string | null;
  idDireccion: string | null;
  testadoP: number | null;
  empresaCalle: string | null;
  empresaNumeroInterior: string | null;
  empresaNumeroExterior: string | null;
  empresaCodigoPostal: string | null;
  empresaColonia: string | null;
  empresaDelegacionMunicipio: string | null;
  empresaEntidadFederativa: string | null;
  empresaPais: string | null;
  empresaClaveEntidadFederativa: string | null;
  empresaClavePlantaEmpresa: string | null;
  empresaClavePais: string | null;
  empresaClaveDelegacionMunicipio: string | null;
  empresaCorreoElectronico: string | null;
  empresaTipo: string | null;
  permaneceMercancia: string | null;
  rfcActivo: string | null;
  domiciliosInscritos: string | null;
  personaMoralISR: string | null;
  opinionSAT: string | null;
  fecha32D: string | null;
  firmantes: unknown[];
  datosComplementariosPlantaDTOs: DatosComplementariosPlantaDTO[];
  montos: Monto[];
  listaCapacidad: Capacidad[];
  datosEmpleados: Empleado[];
}

export interface DatosComplementariosPlantaDTO {
  idPlantaC: string | null;
  idDato: string | null;
  amparoPrograma: string | null;
  tipoDocumento: string | null;
  descDocumento: string | null;
  descripcionOtro: string | null;
  documentoRespaldo: string | null;
  descDocRespaldo: string | null;
  respaldoOtro: string | null;
  fechaFirma: string | null;
  fechaVigencia: string | null;
  fechaFirmaRespaldo: string | null;
  fechaVigenciaRespaldo: string | null;
}

export interface Monto {
  idPlantaM: string | null;
  idMonto: string | null;
  tipo: string | null;
  descTipo: string | null;
  cantidad: string | null;
  descripcion: string | null;
  monto: string | null;
  testado: string | null;
  descTestado: string | null;
}

export interface Capacidad {
  idPlantaCa: string | null;
  idCapacidad: string | null;
  claveServicio: string | null;
  descripcionServicio: string | null;
  cveTipoServicio: string | null;
  tipoServicio: string | null;
  fraccion: string | null;
  fraccionVista: string | null;
  umt: string | null;
  descripcion: string | null;
  capacidadEfectiva: string | null;
  calculo: string | null;
  turnos: string | null;
  horasTurno: string | null;
  cantidadEmpleados: string | null;
  cantidadMaquinaria: string | null;
  descripcionMaquinaria: string | null;
  capacidadMensual: string | null;
  capacidadAnual: string | null;
  testado: string | null;
  descTestado: string | null;
}

export interface Empleado {
  idPlantaE: string | null;
  idEmpleados: string | null;
  totalEmpleados: string | null;
  directos: string | null;
  cedula: string | null;
  fechaCedula: string | null;
  indirectos: string | null;
  contrato: string | null;
  objetoContrato: string | null;
  fechaFirma: string | null;
  fechaFinVigencia: string | null;
  rfcEmpresa: string | null;
  razonEmpresa: string | null;
  testado: string | null;
  descTestado: string | null;
}


export interface ProductoExportacion {
  complemento: Complemento;
  fraccionCompuesta: string | null;
  cveServicioImmex: CveServicioImmex;
  cveSector: string | null;
  idSectorProsecSol: string | null;
  blnFraccionSeleccionada: number;
  descripcionTestado: string | null;
  bienesProducidos: string | null;
  proyectosImmex: ProyectoImmex[];
  proyectosClientes: ProyectoCliente[];
  nicoDtos: NicoDto[];
  claveProductoExportacion: number | null;
  idSolicitud: string | null;
  solicitud: string | null;
  cveFraccion: string | null;
  fraccionArancelaria: string | null;
  sector: string | null;
  testado: boolean;
  claveServicioImmex: string | null;
  tipoFraccion: string | null;
  visible: boolean;
  fraccionPadre: string | null;
  fecIniVigencia: string | null;
  fecFinVigencia: string | null;
  replica: boolean;
  activo: boolean | null;
  idProductoExp: string | null;
}

export interface Complemento {
  idProducto: number | null;
  anexoII: string | null;
  tipo: string | null;
  unidadMedida: string | null;
  categoria: string | null;
  descripcion: string | null;
  valorMensual: string | null;
  valorAnual: string | null;
  volumenMensual: string | null;
  volumenAnual: string | null;
  testado: boolean;
  fecFinVigencia: string | null;
  volumenAnualSolicitado: string | null;
}

export interface CveServicioImmex {
  claveServicio: string | null;
  nombre: string | null;
  tipoServicio: string | null;
  fechaInicioVigencia: string | null;
  fechaFinVigencia: string | null;
  blnActivo: boolean;
}

export interface ProyectoImmex {
  productoProyectoPK: ProductoProyectoPK;
  tipoDocumento: string | null;
  descripcion: string | null;
  fechaFirma: string | null;
  fechaVigencia: string | null;
  rfcFirmante: string | null;
  razonFirmante: string | null;
  testado: boolean;
  fecFinVigencia: string | null;
}

export interface ProductoProyectoPK {
  idProducto: number | null;
  idProyectoImmex: number | null;
}

export interface ProyectoCliente {
  productoProveedorPK: ProductoProveedorPK;
  paisOrigen: string | null;
  rfcProveedor: string | null;
  razonProveedor: string | null;
  paisDestino: string | null;
  rfcClient: string | null;
  razonCliente: string | null;
  domicilioCliente: string | null;
  testado: boolean;
  fecFinVigencia: string | null;
}

export interface ProductoProveedorPK {
  idProducto: number | null;
  idProveedor: number | null;
}

export interface NicoDto {
  claveNico: string | null;
  descripcion: string | null;
  testadoNico: string | null;
  testadoInt: boolean;
}

export interface AnexoImportacion {
  fraccionPadre: string | null;
  descripcionFraccionPadre: string | null;
  tipoFraccion: string | null;
  exenta: string | null;
  fraccionCompuesta: string | null;
  claveFraccionPadre: string | null;
  unidadMedida: string | null;
  fraccionConcatenada: string | null;
  descripcionTestado: string | null;
  testado: boolean;
  tipoOperacion: string | null;
  valorMonedaMensual: string | null;
  valorMonedaAnual: string | null;
  valorProduccionMensual: string | null;
  valorProduccionAnual: string | null;
  valorProduccionAnualSolicitada: string | null;
  claveCategoria: string | null;
  descripcionCategoria: string | null;
  mensaje: string | null;
  descripcionUsuario: string | null;
  umt: string | null;
  idFraccion: string | null;
  idProducto: string | null;
  idProductoPadre: string | null;
  claveProductoExportacion: number | null;
  descripcionServicio: string | null;
  rowID: string | null;
  cveFraccion: string | null;
  capitulo: string | null;
  partida: string | null;
  subPartida: string | null;
  descripcion: string | null;
  fechaCaptura: string | null;
  fechaInicioVigencia: string | null;
  fechaFinVigencia: string | null;
  cveUsuario: string | null;
  cveCapituloFraccion: string | null;
  cvePartidaFraccion: string | null;
  cveSubPartidaFraccion: string | null;
  activo: boolean | null;
  activoAnexo28: boolean | null;
  decretoImmex: string | null;
  sector: string | null;
  cveServicioImmex: string | null;
  listaProveedores: unknown[];
  listaProyecto: unknown[] | null;
  nicoDtos: unknown[] | null;
}

export interface BitacoraModificacion {
  idModificacion: string;
  tipoModificacion: string;
  fechaModificacion: string;
  valoresNuevos: string;
  valoresAnteriores: string;
}

export interface PlantasResponse {
  plantas?: Planta[];
  idFraccion?: string;
  status?: string;
  tipoFraccion?: string;
  idSolicitud?: string;
}

export interface Planta {
  idPlanta: string | null;
  calle: string | null;
  numeroInterior: string | null;
  numeroExterior: string | null;
  codigoPostal: string | null;
  colonia: string | null;
  delegacionMunicipio: string | null;
  entidadFederativa: string | null;
  pais: string | null;
  rfc: string | null;
  domicilioFiscal: string | null;
  razonSocial: string | null;
  claveEntidadFederativa: string | null;
  clavePlantaEmpresa: string | null;
  clavePais: string | null;
  claveDelegacionMunicipio: string | null;
  estatus: boolean;
  desEstatus: string | null;
  localidad: string | null;
  telefono: string | null;
  idSolicitud: string | null;
  fax: string | null;
  idDireccion: string | null;
  testadoP: number | null;
  empresaCalle: string | null;
  empresaNumeroInterior: string | null;
  empresaNumeroExterior: string | null;
  empresaCodigoPostal: string | null;
  empresaColonia: string | null;
  empresaDelegacionMunicipio: string | null;
  empresaEntidadFederativa: string | null;
  empresaPais: string | null;
  empresaClaveEntidadFederativa: string | null;
  empresaClavePlantaEmpresa: string | null;
  empresaClavePais: string | null;
  empresaClaveDelegacionMunicipio: string | null;
  empresaCorreoElectronico: string | null;
  empresaTipo: string | null;
  permaneceMercancia: string | null;
  rfcActivo: string | null;
  domiciliosInscritos: string | null;
  personaMoralISR: string | null;
  opinionSAT: string | null;
  fecha32D: string | null;
  firmantes: unknown[] | null;
  datosComplementariosPlantaDTOs: unknown[] | null;
  montos: unknown[] | null;
  listaCapacidad: unknown[] | null;
  datosEmpleados: unknown[] | null;
}



export interface GuardarSolicitudPayload {
  tipoDeSolicitud?: string;
  idSolicitud?: number;
  idTipoTramite?: number;
  rfc?: string;
  cveUnidadAdministrativa?: string;
  costoTotal?: number;
  discriminatorValue?: string;
  certificadoSerialNumber?: string;
  certificado?: string;

  planta?: PlantaGuardar[];

  sociosAccionistas?: SociosGuardar[];

  notarios?: NotariosGuardar[];

  plantasIMMEX?: PlantaImmexGuardar[];

  fraccionesExportacion?: FraccionesExportacionGuardar[];

  fraccionesImportacion?: FraccionesImportacionGuardar[];

  unidadAdministrativaRepresentacionFederal?: {
    clave?: string;
  };

  solicitante?: {
    rfc?: string;
  };

  datosCertificacion?: string;
  montoImportaciones?: number;
  factorAmpliacion?: number;
  certificacion_sat?: string;
  cveEntidad?: string;
  idProgramaAutorizado?: number;
  tipoPrograma?: string;
  tipoModalidad?: string;
  descripcionModalidad?: string;
}


export interface PlantaGuardar{
    idPlanta?: string | null;
    calle?: string | null;
    numeroInterior?: string | null;
    numeroExterior?: string | null;
    codigoPostal?: string | null;
    colonia?: string | null;
    delegacionMunicipio?: string | null;
    entidadFederativa?: string | null;
    pais?: string | null;
    rfc?: string | null;
    estatus?: boolean | null;
    desEstatus?: string | null;
    localidad?: string | null;
    telefono?: string | null;
    fax?: string | null;
    fecha32D?: string | null;
  }
  export interface SociosGuardar{
    idPersonaSolicitud?: number | null;
    rfc?: string | null;
    razonSocial?: string | null;
    nombre?: string | null;
    apellidoMaterno?: string | null;
    apellidoPaterno?: string | null;
    correoElectronico?: string | null;
  }

  export interface NotariosGuardar{
    nombreNotario?: string | null;
    apellidoMaterno?: string | null;
    apellidoPaterno?: string | null;
    rfc?: string | null;
    numeroActa?: string | null;
    numeroNotaria?: string | null;
    numeroNotario?: string | null;
    delegacionMunicipio?: string | null;
    entidadFederativa?: string | null;
    fechaActa?: string | null;
    numeroRegistro?: string | null;
  }

  export interface PlantaImmexGuardar{
    idPlanta?: string | null;
    calle?: string | null;
    numeroInterior?: string | null;
    numeroExterior?: string | null;
    codigoPostal?: string | null;
    colonia?: string | null;
    delegacionMunicipio?: string | null;
    entidadFederativa?: string | null;
    pais?: string | null;
    rfc?: string | null;
    estatus?: boolean | null;
    desEstatus?: string | null;
    localidad?: string | null;
    telefono?: string | null;
    fax?: string | null;
    fecha32D?: string | null;
    claveEntidadFederativa?: string | null;
    claveDelegacionMunicipio?: string | null;
    idDireccion?: string | null;
  }

  export interface FraccionesExportacionGuardar{
    tipoFraccion?: string | null;
    fraccionPadre?: string | null;
    idProductoExp?: string | null;
    fraccionCompuesta?: string | null;
    idSectorProsecSol?: string | null;
    descripcionTestado?: string | null;
    fraccionArancelaria?: {
      fraccionPadre?: string | null;
      descripcionFraccionPadre?: string | null;
      tipoFraccion?: string | null;
      fraccionCompuesta?: string | null;
      claveFraccionPadre?: string | null;
      idFraccion?: string | null;
      idProducto?: string | null;
    };
  }

  export interface FraccionesImportacionGuardar{
    tipoFraccion?: string | null;
    fraccionPadre?: string | null;
    idProductoExp?: string | null;
    fraccionCompuesta?: string | null;
    idSectorProsecSol?: string | null;
    descripcionTestado?: string | null;
    fraccionArancelaria?: {
      fraccionPadre?: string | null;
      descripcionFraccionPadre?: string | null;
      tipoFraccion?: string | null;
      fraccionCompuesta?: string | null;
      claveFraccionPadre?: string | null;
      idFraccion?: string | null;
      idProducto?: string | null;
    };
  }

  export interface SolicitudPayload{
    idPrograma?: string;
    tipoPrograma?: string;
  }