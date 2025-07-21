import { AgregarMiembroEmpresaTabla, ControlInventariosTabla, DomiciliosRfcSolicitanteTabla, NumeroEmpleadosTabla } from '../../tramites/32610/modelos/oea-textil-registro.model';
import { EmpresaDelGrupo, TransportistasTable } from '../../tramites/32610/constantes/datos-comunes.enum';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaEnlaceOperativo } from '../../tramites/32610/modelos/enlace-operativo-tabla.model';

/**
 * Interface para la respuesta de la API
 * @template T - Tipo de datos que se espera en la respuesta.
 */
export interface StoreResponse {
  code: number;
  data: Tramite32610State;
  message: string;
}

/**
 * Interfaz que representa el estado de Tramite32610.
 */
export interface Tramite32610State {
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
  DomiciliosRfcSolicitante: DomiciliosRfcSolicitanteTabla[];
  controlInventarios: ControlInventariosTabla[];
  querellaSATUltimos3Anios: string;
  ingresoInfoContableSAT: string;
  agregarMiembroEmpresa: AgregarMiembroEmpresaTabla[];
  manifests: boolean;
  bajoProtesta: boolean;
  sistemaControlInventariosArt59: string;
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
  comercioExteriorRealizado: string; 
  fechaDePago:string; 
  fechaInicioComercio: string;
  esParteGrupoComercioExterior: string; 
  rfcEnclaveOperativo: string; 
  enlaceOperativorfc: string; 
  denominacionRazonsocial: string; 
  domicilio: string; 
  inputfechaDeLaUltimaOperacion: string; 
  fusionEscisionConOperacionExterior: string; 
  empresaExtranjeraIMMEX: string; 
  monto: string; 
  operacionesBancarias: string; 
  llavePago: string; 
  registroEsquemaCertificacion: string; 
  tipoInformacionEmpresa: string; 
  ccat: string;
  tablaDatos: EmpresaDelGrupo[]; 
  transportistasLista: TransportistasTable[];
  autorizacionCBP: string;
  instalacionesCertificadasCBP :string,
  suspensionCancelacionCBP : string;
}
/**
 * Función para crear el estado inicial de Solicitud32610Terceros.
 * @returns {Tramite32610State} El estado inicial de Solicitud32610Terceros.
 */
export function createInitialState(): Tramite32610State {
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
     registroEsquemaCertificacion: '',
     tipoInformacionEmpresa: '', 
     ccat: '', 
     tablaDatos: [],
     transportistasLista: [], 
     autorizacionCBP: '',
     instalacionesCertificadasCBP: '',
     suspensionCancelacionCBP: ''
  };
}

/**
 * Decorador Injectable para hacer que la tienda esté disponible a nivel raíz.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Decorador StoreConfig para configurar la tienda con un nombre y una opción de restablecimiento.
 * @param {Object} config - El objeto de configuración.
 * @param {string} config.name - El nombre de la tienda.
 * @param {boolean} config.resettable - Indica si la tienda es restablecible.
 */
@StoreConfig({ name: 'tramite32610Terceros', resettable: true })
export class Tramite32610Store extends Store<Tramite32610State> {
  /**
   * Crea una instancia de Tramite32610Store.
   * Inicializa la tienda con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }
  public actualizarEstado(valores: Partial<Tramite32610State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
}
