import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaEmpresaFusionada } from '../modelos/aviso-de-empresa-fusionadas.model';
import { TablaEmpresaTransportista } from '../modelos/aviso-de-transportistas.model';

export interface Solicitud33304State {
  cambioDocumentoUsoGoce: boolean; //Cambio de documento de uso o goce
  fusionEscisionEmpresas: boolean; //Fusión o escisión de empresas
  reestructuracion: boolean; //Reestructuración
  transportistas: boolean; //¿Incluye transportistas?
  BAJO_MANIFIESTO: boolean; //Bajo manifiesto
  avisoDeOperacion: number | string; //Aviso de operación
  tipoOperacion: number | string; //Tipo de operación
  cuenta: number | string; //Cuenta
  rfc: string; //RFC
  denominacion: string; //Denominación o razón social
  fechaFusioneEfecto: string; //Fecha de fusión con efecto
  folioAcuse: string; //Folio del acuse
  registroCertificacion: string; //Registro de certificación
  empresaFusionadasLista: TablaEmpresaFusionada[]; //Lista de empresas fusionadas
  transportistasLista: TablaEmpresaTransportista[]; //Lista de empresas transportistas


  colonia: string;
  codigoPostal: string;
  direccion: string;
  rfcPartesC: string;
  rfcPartesCons: string;
  nombrePartesCons: string;
  caracterDeCons: string;
  fechaInicioAnterior: string;
  fechaFinAnterior: string;
  cveEntidad: string;
  cveMunicipio: string;
  cveTipoDoc: string;
  observaciones: string;
  ideGenerica2: string;
  direccionNuevo?: string; 
  codigoPostalNuevo?: string;
  cveEntidadNuevo?: string;
  cveMunicipioNuevo?: string;
  cveTipoDocNuevo?: string;
  fechaInicioAnteriorNuevo?: string;
  fechaFinAnteriorNuevo?: string; 
  rfcPartesCNuevo: string;
  rfcPartesConsNuevo: string;
nombrePartesConsNuevo: string;
caracterDeConsNuevo: string;
observacionesNuevo: string;
  modificacionVigencias:string | number;
  modificacionPartes: string | number;
  fechaInicioVigenciaAnterior: string;
  fechaFinVigenciaAnterior: string;
  fechaInicioVigenciaActual: string;
  fechaFinVigenciaActual: string;
  cveTipoDoc2: string;
  direccion2: string;
  codigoPostal2: string; 
  cveEntidad2: string;
  cveMunicipio2: string;
  cveTipo2: string;
  fechaInicioAnterior2: string;
  fechaFinAnterior2: string;
  rfcPartesC2: string;
  rfcPartesCons2: string;
  nombrePartesCons2: string;
  caracterDeCons2: string;
  observaciones2: string;

}


export function createInitialState(): Solicitud33304State {
  return {
    cambioDocumentoUsoGoce: false, //Cambio de documento de uso o goce
    fusionEscisionEmpresas: false, //Fusión o escisión de empresas
    reestructuracion: false, //Reestructuración
    transportistas: false, //¿Incluye transportistas?
    BAJO_MANIFIESTO: false, //Bajo manifiesto
    avisoDeOperacion: 0, //Aviso de operación
    tipoOperacion: 0, //Tipo de operación
    cuenta: 0, //Cuenta
    rfc: '', //RFC
    denominacion: '', //Denominación o razón social
    fechaFusioneEfecto: '', //Fecha de fusión con efecto
    folioAcuse: '', //Folio del acuse
    registroCertificacion: '', //Registro de certificación
    empresaFusionadasLista: [], //Lista de empresas fusionadas
    transportistasLista: [], //Lista de empresas transportistas

    colonia: '',
    codigoPostal: '',
    direccion: '',
    rfcPartesC: '',
    rfcPartesCons: '',
    nombrePartesCons: '',
    caracterDeCons: '',
    fechaInicioAnterior: '',
    fechaFinAnterior: '',
    cveEntidad: '',
    cveMunicipio: '',
    cveTipoDoc: '',
    observaciones: '',
    ideGenerica2: '2',
    direccionNuevo: '',
    codigoPostalNuevo: '',
    cveEntidadNuevo: '',
    cveMunicipioNuevo: '',
    cveTipoDocNuevo: '',
    fechaInicioAnteriorNuevo: '',
    fechaFinAnteriorNuevo: '',
    rfcPartesCNuevo: '',
    rfcPartesConsNuevo: '',
    nombrePartesConsNuevo: '',
    caracterDeConsNuevo: '',
    observacionesNuevo: '',
    modificacionVigencias: '1',
    modificacionPartes: '1',
    fechaInicioVigenciaAnterior: '',
    fechaFinVigenciaAnterior: '',
    fechaInicioVigenciaActual: '',
    fechaFinVigenciaActual: '',
    cveTipoDoc2: '',
    direccion2: '',
    codigoPostal2: '',
    cveEntidad2: '',
    cveMunicipio2: '',
    cveTipo2: '',
    fechaInicioAnterior2: '',
    fechaFinAnterior2: '',
    rfcPartesC2: '',
    rfcPartesCons2: '',
    nombrePartesCons2: '',
    caracterDeCons2: '',
    observaciones2: '',
  };
}


@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite33304', resettable: true })
export class Solicitud33304Store extends Store<Solicitud33304State> {

  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el estado del store con los valores proporcionados.
   * Valores a actualizar en el estado.
   */
  public actualizarEstado(valores: Partial<Solicitud33304State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  } 
}
