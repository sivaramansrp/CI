import { AgregarMiembroEmpresaTabla, ControlInventariosTabla, DomiciliosRfcSolicitanteTabla, EmpresaDelGrupo, NumeroEmpleadosTabla, TablaEnlaceOperativo, TransportistasTable } from '../modelos/oea-textil-registro.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


/**
 * @interfaz
 * @nombre Tramites32609State
 * @descripción
 * Define la estructura del estado para el trámite 32609.
 * Contiene propiedades relacionadas con los datos del trámite, como información de pago, datos de vehículos, agentes y más.
 */

/**
 * Interface para la respuesta de la API
 * @template T - Tipo de datos que se espera en la respuesta.
 */
export interface StoreResponse {
  code: number;
  data: Tramites32609State;
  message: string;
}
export interface Tramites32609State {
  sectorProductivo: string; // Sector productivo al que pertenece la empresa
  sectorServicio: string; // Sector productivo o de servicios al que pertenece la empresa
  cumplimientoFiscalAduanero: string; // Indica si se cumple con las obligaciones fiscales aduaneras
  autorizaOpinionSAT: string; // Indica si se autoriza la opinión del SAT
  cuentaConEmpleadosPropios: string; // Indica si la empresa cuenta con empleados propios
  bimestreUltimo: string; // Último bimestre reportado
  numeroDeEmpleadas: string; // Número de empleadas en el último bimestre
  retencionISRTrabajadores: string; // Indica si se retiene ISR a los trabajadores
  pagoCuotasIMSS: string; // Indica si se pagan cuotas al IMSS
  cuentaConSubcontratacionEspecializada: string; // Indica si se cuenta con subcontratación especializada
  registroPadronLFT: string; // Indica si se cuenta con registro en el padrón de la Ley Federal del Trabajo
  listadoSATArt69: string; // Lista de artículos 69 del SAT
  listadoSATArt69B: string; // Lista de artículos 69 del SAT
  listadoSATArt69BBis: string; // Lista de artículos 69-B Bis del SAT
  certificadosSellosVigentes: string; // Indica si los certificados de sellos digitales están vigentes
  infringioSupuestos17HBis: string; // Indica si se infringieron los supuestos del artículo 17-H Bis
  mediosContactoActualizadosBuzon: string; // Indica si los medios de contacto están actualizados en el buzón
  suspensionPadronImportadoresExportadores: string; // Indica si está suspendido en el padrón de importadores/exportadores
  archivoNacionales?: string; // Indica si se han archivado documentos nacionales
  proveedores: string; // Lista de proveedores asociados al trámite
  domiciliosRegistrados: string; // Indica si los domicilios están registrados
  numeroEmpleadosBimestre:NumeroEmpleadosTabla[]; // Lista de números de empleados por bimestre
  DomiciliosRfcSolicitante:DomiciliosRfcSolicitanteTabla[], // Lista de domicilios del RFC solicitante
  controlInventarios:ControlInventariosTabla[]; // Lista de control de inventarios
  querellaSATUltimos3Anios: string; // Indica si hay querellas del SAT en los últimos 3 años
  ingresoInfoContableSAT:string; // Indica si se ingresa información contable al SAT
  agregarMiembroEmpresa:AgregarMiembroEmpresaTabla[]; 
  manifests:boolean; // Indica si se han agregado manifiestos
  bajoProtesta:boolean; // Indica si se realiza bajo protesta
  sistemaControlInventariosArt59:string;
  comercioExteriorRealizado: string; // Indica si se realiza comercio exterior
  fechaDePago:string; // Fecha de pago asociada a la solicitud
  fechaInicioComercio: string;
  esParteGrupoComercioExterior: string; // Indica si es parte de un grupo de comercio exterior
  rfcEnclaveOperativo: string; // RFC del enclave operativo
  enlaceOperativorfc: string; // RFC del enlace operativo
  denominacionRazonsocial: string; // Razón social del enlace operativo
  domicilio: string; // Domicilio del enlace operativo
  inputfechaDeLaUltimaOperacion: string; // Fecha de la última operación
  fusionEscisionConOperacionExterior: string; // Indica si hay fusión o escisión con operación exterior
  empresaExtranjeraIMMEX: string; // Indica si es una empresa extranjera IMMEX
  monto: string; // Monto total asociado a la solicitud
  operacionesBancarias: string; // Detalles de las operaciones bancarias relacionadas con la solicitud
  llavePago: string; // Llave de pago asociada a la solicitud
  cuentaConProgramaIMMEX: string; // Indica si cuenta con un programa IMMEX
  rubroCertificacion: string; // Rubro de certificación asociado a la solicitud
  fechaFinVigenciaRubro: string; // Fecha de fin de vigencia del rubro de certificación
  numeroOficio: string; // Número de oficio asociado a la solicitud
  declaracionAnualISRRepresentantes: string; // Indica si los representantes han presentado la declaración anual del ISR
  registroEsquemaCertificacionIVAIEPS: string; // Registro del esquema de certificación IVA e IEPS
  registroEsquemaCertificacion: string; // Registro del esquema de certificación
  tipoInformacionEmpresa: string; // Indica si la información de la empresa es clasificada
  ccat: string; // CAAT del enlace operativo
  tablaDatos: EmpresaDelGrupo[]; // Tabla de datos de empresas del grupo
  transportistasLista: TransportistasTable[]; // Lista de transportistas relacionados con la solicitud
  
  representanteRegistro: string;
  representanteRfc: string;
  representanteNombre: string;
  representanteApellidoPaterno: string;
  representanteApellidoMaterno: string;
  representanteTelefono: string;
  representanteCorreo: string;
  registro: string;
  rfc: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  ciudad: string;
  cargo: string;
  telefono: string;
  correo: string;
  suplente: boolean;
  enlaceOperativoData: TablaEnlaceOperativo[];
}


/**
 * @función
 * @nombre createInitialState
 * @descripción
 * Crea y devuelve el estado inicial para el trámite 32609.
 * 
 * @retorna {Tramites32609State} El estado inicial del trámite.
 */
export function createInitialState(): Tramites32609State {
  return {
  sectorProductivo: '',
  sectorServicio: '',
  cumplimientoFiscalAduanero: '',
  autorizaOpinionSAT: '',
  cuentaConEmpleadosPropios: '',
  bimestreUltimo: '',
  numeroDeEmpleadas: '',
  retencionISRTrabajadores: '',
  pagoCuotasIMSS: '',
  cuentaConSubcontratacionEspecializada: '',
  registroPadronLFT: '',
  listadoSATArt69: '',
  listadoSATArt69B: '',
  listadoSATArt69BBis: '',
  certificadosSellosVigentes: '',
  infringioSupuestos17HBis: '',
  mediosContactoActualizadosBuzon: '',
  suspensionPadronImportadoresExportadores: '',
  archivoNacionales: '',
  proveedores: '',
  domiciliosRegistrados:'',
  numeroEmpleadosBimestre:[],
  DomiciliosRfcSolicitante:[],
  controlInventarios: [],
  querellaSATUltimos3Anios: '',
  ingresoInfoContableSAT: '',
  agregarMiembroEmpresa: [],
  manifests:true,
  bajoProtesta:true,
  sistemaControlInventariosArt59: '',
  comercioExteriorRealizado:'',
  fechaDePago: '',
  fechaInicioComercio: '',
  esParteGrupoComercioExterior: '',
  rfcEnclaveOperativo: '',
  enlaceOperativorfc:'',
  denominacionRazonsocial: '',
  domicilio: '',
  inputfechaDeLaUltimaOperacion: '',
  fusionEscisionConOperacionExterior: '',
  empresaExtranjeraIMMEX: '',
  monto: '',
  operacionesBancarias: '',
  llavePago: '',
  cuentaConProgramaIMMEX: '',
  rubroCertificacion: '',
  fechaFinVigenciaRubro: '',
  numeroOficio: '',
  declaracionAnualISRRepresentantes: '',
  registroEsquemaCertificacionIVAIEPS: '',
  registroEsquemaCertificacion: '',
  tipoInformacionEmpresa: '',
  ccat: '',
  tablaDatos: [],
  transportistasLista: [],

  representanteRegistro: '',
  representanteRfc: '',
  representanteNombre: '',
  representanteApellidoPaterno: '',
  representanteApellidoMaterno: '',
  representanteTelefono: '',
  representanteCorreo: '',
  registro: '',
  rfc: '',
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  ciudad: '',
  cargo: '',
  telefono: '',
  correo: '',
  suplente: false,
  enlaceOperativoData: [],
};
}

/**
 * @clase
 * @nombre Tramite32609Store
 * @descripción
 * Clase que extiende de `Store` de Akita para gestionar el estado del trámite 32609.
 * Proporciona métodos para actualizar diferentes partes del estado, como datos de vehículos, agentes y registros.
 * 
 * @decorador @Injectable
 * @decorador @StoreConfig
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites32609', resettable: true })
export class Tramite32609Store extends Store<Tramites32609State> {
   
  /**
   * @constructor
   * @descripción
   * Constructor que inicializa la tienda con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @método
   * @nombre establecerDatos
   * @descripción
   * Actualiza el estado con los valores proporcionados.
   * 
   * @param {Partial<Tramites32609State>} values - Valores parciales para actualizar el estado.
   */
  public establecerDatos(values: Partial<Tramites32609State>): void {    
    this.update((state) => ({
      ...state,
      ...values,
    }));
  }
}