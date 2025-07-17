import { AgregarMiembroEmpresaTabla, ControlInventariosTabla, DomiciliosRfcSolicitanteTabla, NumeroEmpleadosTabla } from '../modelos/oea-textil-registro.model';
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
  numeroEmpleadosBimestre:NumeroEmpleadosTabla[];
  DomiciliosRfcSolicitante:DomiciliosRfcSolicitanteTabla[],
  controlInventarios:ControlInventariosTabla[];
  querellaSATUltimos3Anios: string;
  ingresoInfoContableSAT:string;
  agregarMiembroEmpresa:AgregarMiembroEmpresaTabla[];
  manifests:boolean;
  bajoProtesta:boolean;
  sistemaControlInventariosArt59:string;

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