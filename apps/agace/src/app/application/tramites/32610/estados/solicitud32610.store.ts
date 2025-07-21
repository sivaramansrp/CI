import { AgregarMiembroEmpresaTabla, ControlInventariosTabla, DomiciliosRfcSolicitanteTabla, NumeroEmpleadosTabla } from '../models/oea-textil-registro.model';
import { EmpresaDelGrupo } from '../constants/datos-comunes.enum';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { TablaEnlaceOperativo } from '../models/enlace-operativo-tabla.model';
import { TransportistasTable } from '../constants/datos-comunes.enum';
/**
 * Interfaz que define las propiedades relacionadas con listas de datos
 * de empleados, domicilios, socios, y enlaces operativos.
 */
export interface Solicitud32610State {
  representanteRegistro:string;//Representante registro
  representanteRfc:string;//Representante RFC
  representanteNombre:string;//Representante nombre
  representanteApellidoPaterno:string;//Representante apellido paterno
  representanteApellidoMaterno:string;//Representante apellido materno
  representanteTelefono:string;//Representante teléfono
  representanteCorreo:string;//Representante correo
  registro:string;//Registro único del enlace operativo
  rfc:string;//RFC de la empresa
  nombre:string;//Nombre de la empresa
  apellidoPaterno:string;//Apellido paterno
  apellidoMaterno:string;//Apellido materno
  ciudad:string;//Ciudad
  cargo:string;//Cargo
  telefono:string;//Teléfono
  correo:string;//Correo
  suplente:boolean;//Indica si es suplente
  enlaceOperativoData:TablaEnlaceOperativo[];//Datos del enlace operativo
  sectorProductivo:string;//Sector productivo
  sectorServicio:string;//Sector servicio
  cumplimientoFiscalAduanero:string;//Cumplimiento fiscal aduanero
  autorizaOpinionSAT:string;//Autoriza opinión SAT
  cuentaConEmpleadosPropios:string;//Cuenta con empleados propios
  bimestreUltimo:string;//Bimestre último
  numeroDeEmpleadas:string;//Número de empleadas
  retencionISRTrabajadores:string;//Retención ISR trabajadores
  pagoCuotasIMSS:string;//Pago cuotas IMSS
  cuentaConSubcontratacionEspecializada:string;//Cuenta con subcontratación especializada
  registroPadronLFT:string;//Registro padrón LFT
  listadoSATArt69:string;//Listado SAT Art 69
  listadoSATArt69B:string;//Listado SAT Art 69 B
  listadoSATArt69BBis:string;//Listado SAT Art 69 B Bis
  certificadosSellosVigentes:string;//Certificados sellos vigentes
  infringioSupuestos17HBis:string;//Infringió supuestos 17 H Bis
  mediosContactoActualizadosBuzon:string;//Medios contacto actualizados buzón
  suspensionPadronImportadoresExportadores:string;//Suspensión padrón importadores/exportadores
  archivoNacionales?:string;//Archivo nacionales (opcional)
  proveedores:string;//Proveedores
  domiciliosRegistrados:string;//Domicilios registrados
  numeroEmpleadosBimestre:NumeroEmpleadosTabla[];//Número empleados bimestre
  DomiciliosRfcSolicitante:DomiciliosRfcSolicitanteTabla[];//Domicilios RFC solicitante
  controlInventarios:ControlInventariosTabla[];//Control inventarios
  querellaSATUltimos3Anios:string;//Querella SAT últimos 3 años
  ingresoInfoContableSAT:string;//Ingreso info contable SAT
  agregarMiembroEmpresa:AgregarMiembroEmpresaTabla[];//Agregar miembro empresa
  manifests:boolean;//Manifests
  bajoProtesta:boolean;//Bajo protesta
  sistemaControlInventariosArt59:string;//Sistema control inventarios Art 59
  comercioExteriorRealizado:string;//Indica si la empresa realiza operaciones de comercio exterior ('1' para Sí,'0' para No)
  fechaDePago:string;//Fecha de pago asociado a la solicitud (DD/MM/YYYY)
  fechaInicioComercio:string;//Fecha inicio operaciones comercio exterior (DD/MM/YYYY)
  esParteGrupoComercioExterior:string;//Indica si es parte de grupo comercio exterior ('1' para Sí,'0' para No)
  rfcEnclaveOperativo:string;//RFC o clave operativa de la empresa del enlace operativo
  enlaceOperativorfc:string;//RFC del enlace operativo (solo lectura)
  denominacionRazonsocial:string;//Denominación social o razón social del enlace operativo
  domicilio:string;//Domicilio fiscal completo del enlace operativo
  inputfechaDeLaUltimaOperacion:string;//Fecha última operación comercial (DD/MM/YYYY)
  fusionEscisionConOperacionExterior:string;//Fusión o escisión con operaciones comercio exterior ('1' para Sí,'0' para No)
  empresaExtranjeraIMMEX:string;//Empresa extranjera IMMEX ('1' para Sí,'0' para No)
  monto:string;//Monto total en pesos mexicanos
  operacionesBancarias:string;//Detalles operaciones bancarias
  llavePago:string;//Llave de pago única
  registroEsquemaCertificacion:string;//Registro esquema certificación ('1' para Sí,'0' para No)
  tipoInformacionEmpresa:string;//Tipo información empresa ('1' para Pública,'0' para Privada)
  ccat:string;//Número registro CAAT vigente transportista
  tablaDatos:EmpresaDelGrupo[];//Lista empresas grupo comercial relacionadas
  transportistasLista:TransportistasTable[];//Lista transportistas autorizados
  autorizacionCBP:string;//Autorización CBP
  instalacionesCertificadasCBP:string;//Instalaciones certificadas CBP
  suspensionCancelacionCBP:string;//Suspensión o cancelación CBP
}


/**
 * Crea el estado inicial para `Solicitud32610State`.
 *
 * @returns El estado inicial con valores predeterminados.
 */
/**
 * @summary Crea y retorna el estado inicial para la solicitud 32610.
 * @returns {Solicitud32610State} Objeto con los valores iniciales de todos los campos requeridos en la solicitud.
 */
export function createInitialSolicitudState(): Solicitud32610State {
return {
  representanteRegistro: '', // Representante registro
  representanteRfc: '', // Representante RFC
  representanteNombre: '', // Representante nombre
  representanteApellidoPaterno: '', // Representante apellido paterno
  representanteApellidoMaterno: '', // Representante apellido materno
  representanteTelefono: '', // Representante teléfono
  representanteCorreo: '', // Representante correo
  registro: '', // Registro único del enlace operativo
  rfc: '', // RFC de la empresa
  nombre: '', // Nombre de la empresa
  apellidoPaterno: '', // Apellido paterno
  apellidoMaterno: '', // Apellido materno
  ciudad: '', // Ciudad
  cargo: '', // Cargo
  telefono: '', // Teléfono
  correo: '', // Correo
  suplente: false, // Indica si es suplente
  enlaceOperativoData: [], // Datos del enlace operativo
  sectorProductivo: '', // Sector productivo
  sectorServicio: '', // Sector servicio
  cumplimientoFiscalAduanero: '', // Cumplimiento fiscal aduanero
  autorizaOpinionSAT: '', // Autoriza opinión SAT
  cuentaConEmpleadosPropios: '', // Cuenta con empleados propios
  bimestreUltimo: '', // Bimestre último
  numeroDeEmpleadas: '', // Número de empleadas
  retencionISRTrabajadores: '', // Retención ISR trabajadores
  pagoCuotasIMSS: '', // Pago cuotas IMSS
  cuentaConSubcontratacionEspecializada: '', // Cuenta con subcontratación especializada
  registroPadronLFT: '', // Registro padrón LFT
  listadoSATArt69: '', // Listado SAT Art 69
  listadoSATArt69B: '', // Listado SAT Art 69 B
  listadoSATArt69BBis: '', // Listado SAT Art 69 B Bis
  certificadosSellosVigentes: '', // Certificados sellos vigentes
  infringioSupuestos17HBis: '', // Infringió supuestos 17 H Bis
  mediosContactoActualizadosBuzon: '', // Medios contacto actualizados buzón
  suspensionPadronImportadoresExportadores: '', // Suspensión padrón importadores/exportadores
  archivoNacionales: '', // Archivo nacionales
  proveedores: '', // Proveedores
  domiciliosRegistrados: '', // Domicilios registrados
  numeroEmpleadosBimestre: [], // Número empleados bimestre
  DomiciliosRfcSolicitante: [], // Domicilios RFC solicitante
  controlInventarios: [], // Control inventarios
  querellaSATUltimos3Anios: '', // Querella SAT últimos 3 años
  ingresoInfoContableSAT: '', // Ingreso info contable SAT
  agregarMiembroEmpresa: [], // Agregar miembro empresa
  manifests: true, // Manifests
  bajoProtesta: true, // Bajo protesta
  sistemaControlInventariosArt59: '', // Sistema control inventarios Art 59
  comercioExteriorRealizado: '', // Indica si la empresa realiza operaciones de comercio exterior ('1' para Sí,'0' para No)
  fechaDePago: '', // Fecha de pago asociado a la solicitud (DD/MM/YYYY)
  fechaInicioComercio: '', // Fecha inicio operaciones comercio exterior (DD/MM/YYYY)
  esParteGrupoComercioExterior: '', // Indica si es parte de grupo comercio exterior ('1' para Sí,'0' para No)
  rfcEnclaveOperativo: '', // RFC o clave operativa de la empresa del enlace operativo
  enlaceOperativorfc: '', // RFC del enlace operativo (solo lectura)
  denominacionRazonsocial: '', // Denominación social o razón social del enlace operativo
  domicilio: '', // Domicilio fiscal completo del enlace operativo
  inputfechaDeLaUltimaOperacion: '', // Fecha última operación comercial (DD/MM/YYYY)
  fusionEscisionConOperacionExterior: '', // Fusión o escisión con operaciones comercio exterior ('1' para Sí,'0' para No)
  empresaExtranjeraIMMEX: '', // Empresa extranjera IMMEX ('1' para Sí,'0' para No)
  monto: '', // Monto total en pesos mexicanos
  operacionesBancarias: '', // Detalles operaciones bancarias
  llavePago: '', // Llave de pago única
  registroEsquemaCertificacion: '', // Registro esquema certificación ('1' para Sí,'0' para No)
  tipoInformacionEmpresa: '', // Tipo información empresa ('1' para Pública,'0' para Privada)
  ccat: '', // Número registro CAAT vigente transportista
  tablaDatos: [], // Lista empresas grupo comercial relacionadas
  transportistasLista: [], // Lista transportistas autorizados
  autorizacionCBP: '', // Autorización CBP
  instalacionesCertificadasCBP: '', // Instalaciones certificadas CBP
  suspensionCancelacionCBP: '' // Suspensión o cancelación CBP
};

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'solicitud32610',
  resettable: true,
})
/** Clase encargada de manejar el estado de 'Solicitud32610' mediante el uso de un store.
 *  Esta clase extiende de la clase 'Store', lo que permite la gestión centralizada del estado.
 */
export class Solicitud32610Store extends Store<Solicitud32610State> {
  /**
   * Constructor que inicializa el estado de la solicitud.
   * Utiliza la función `createInitialSolicitudState` para establecer el estado inicial.
   */
  constructor() {
    super(createInitialSolicitudState());
  }


  /**
   * Actualiza el estado del store con los valores proporcionados.
   * Valores parciales para actualizar el estado.
   */
  public actualizarEstado(valores: Partial<Solicitud32610State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }

}
