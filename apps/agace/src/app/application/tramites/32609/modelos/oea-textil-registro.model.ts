/**
 * @interfaz
 * @nombre VehiculosTabla
 * @descripción
 * Define la estructura de los datos de la tabla de vehículos.
 * Contiene información básica sobre los vehículos, como marca, modelo y VIN.
 */
export interface NumeroEmpleadosTabla {
  id: number; // Identificador único del vehículo.
  denominacionSocial: string; // Denominación social del vehículo.
  rfc: string; // Modelo del vehículo.
  numeroDeEmpleados: number; // Número de empleados del vehículo.
  bimestre:string; // Bimestre al que corresponde el registro.
}

/**
 * Interface para la respuesta de búsqueda de RFC
 */
export interface BuscarRfcResponse {
  code: number;
  data: Partial<NumeroEmpleadosTabla>; // Datos de RFC obtenidos.
  message: string;
}

/**
 * Interface para la respuesta de la API
 * @template T - Tipo de datos que se espera en la respuesta.
 */
export interface ApiResponse<T> {
  code: number;
  data: T[];
  message: string;
}

/**
 * Interface para las entidades federativas
 */
export interface EntidadFederativa {
  id: number;
  descripcion: string;
}

/**
 * Interface para las instalaciones
 * @template T - Tipo de datos que se espera en la respuesta.
 */
export interface InstalacionesInterface {
    entidadFederativa: string;
    municipio: string;
    direccion: string;
    codigoPostal: string;
    registro: string
}

/**
 * Interface para las instalaciones principales del solicitante.
 * Contiene información detallada sobre los domicilios y actividades productivas.
 */
export interface DomiciliosRfcSolicitanteTabla {
  id?:number;
  InstalacionesPrincipales: string;
  tipoInstalacion: string;
  entidadFederativa: string;
  municipioAlcaldia: string;
  coloniaCalleNumero: string; // This was mislabeled as codigoPostal in the table config
  codigoPostal: string;
  registroSESAT: string;
  procesoProductivo: string;
  acreditaUsoGoceInmueble: string;
  realizaActividadComercioExterior: string;
  reconocimientoMutuoCTPAT: string;
  perfilEmpresa: string;
}