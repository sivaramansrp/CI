import { AgregarMiembroEmpresaTabla, ControlInventariosTabla, DomiciliosRfcSolicitanteTabla, EmpresaDelGrupo, NumeroEmpleadosTabla, TransportistasTable } from '../modelos/oea-textil-registro.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaEnlaceOperativo } from '../modelos/enlace-operativo-tabla.model';


/**
 * @interfaz
 * @nombre Tramites32608State
 * @descripción
 * Define la estructura del estado para el trámite 32608.
 * Contiene propiedades relacionadas con los datos del trámite, como información de pago, datos de vehículos, agentes y más.
 */

/**
 * Interface para la respuesta de la API
 * @template T - Tipo de datos que se espera en la respuesta.
 */
export interface StoreResponse {
  code: number;
  data: Tramites32608State;
  message: string;
}
export interface Tramites32608State {
  sectorProductivo: string;
  sectorServicio: string;
  cumplimientoFiscalAduanero: string;
  autorizaOpinionSAT: string;
  cuentaConEmpleadosPropios: string;
  bimestreUltimo: string;
  numeroDeEmpleadas: string;
  retencionISRTrabajadores: string;
  pagoCuotasIMSS: string;
  cuentaConSubcontratacionEspecializada: string;
  registroPadronLFT: string;
  listadoSATArt69: string;
  listadoSATArt69B: string;
  listadoSATArt69BBis: string;
  certificadosSellosVigentes: string;
  infringioSupuestos17HBis: string;
  mediosContactoActualizadosBuzon: string;
  suspensionPadronImportadoresExportadores: string;
  archivoNacionales?: string;
  proveedores: string;
  domiciliosRegistrados: string;
  numeroEmpleadosBimestre: NumeroEmpleadosTabla[];
  DomiciliosRfcSolicitante: DomiciliosRfcSolicitanteTabla[],
  controlInventarios: ControlInventariosTabla[];
  querellaSATUltimos3Anios: string;
  ingresoInfoContableSAT: string;
  agregarMiembroEmpresa: AgregarMiembroEmpresaTabla[];
  manifests: boolean;
  bajoProtesta: boolean;
  sistemaControlInventariosArt59: string;
  autorizacionCBP: string,
  instalacionesCertificadasCBP: string,
  suspensionCancelacionCBP: string

  //terceros-relacionados
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

  // SECIIT OEA Registration

  comercioExteriorRealizado: string; // Indica si se realiza comercio exterior
  fechaDePago: string; // Fecha de pago asociada a la solicitud
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

}


/**
 * @función
 * @nombre createInitialState
 * @descripción
 * Crea y devuelve el estado inicial para el trámite 32608.
 * 
 * @retorna {Tramites32608State} El estado inicial del trámite.
 */
export function createInitialState(): Tramites32608State {
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
    domiciliosRegistrados: '',
    numeroEmpleadosBimestre: [],
    DomiciliosRfcSolicitante: [],
    controlInventarios: [],
    querellaSATUltimos3Anios: '',
    ingresoInfoContableSAT: '',
    agregarMiembroEmpresa: [],
    manifests: true,
    bajoProtesta: true,
    sistemaControlInventariosArt59: '',
    autorizacionCBP: '',
    instalacionesCertificadasCBP: '',
    suspensionCancelacionCBP: '',


    // Add missing properties with initial values
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
    comercioExteriorRealizado: '',
    fechaDePago: '',
    fechaInicioComercio: '',
    esParteGrupoComercioExterior: '',
    rfcEnclaveOperativo: '',
    enlaceOperativorfc: '',
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

  };
}

/**
 * @clase
 * @nombre Tramite32608Store
 * @descripción
 * Clase que extiende de `Store` de Akita para gestionar el estado del trámite 32608.
 * Proporciona métodos para actualizar diferentes partes del estado, como datos de vehículos, agentes y registros.
 * 
 * @decorador @Injectable
 * @decorador @StoreConfig
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites32608', resettable: true })
export class Tramite32608Store extends Store<Tramites32608State> {

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
   * @param {Partial<Tramites32608State>} values - Valores parciales para actualizar el estado.
   */
  public establecerDatos(values: Partial<Tramites32608State>): void {
    this.update((state) => ({
      ...state,
      ...values,
    }));
  }
}