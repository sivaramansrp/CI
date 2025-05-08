import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import {
  Domicilios,
  EnlaceOperativo,
  NumeroDeEmpleados,
  SeccionSociosIC,
} from '../models/solicitud.model';

export interface Solicitud32605State {
  idPersonaSolicitud: string;
  rfcTercero: string;
  rfc: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  correoElectronico: string;

  agregarEnlaceRfcTercero: string;
  agregarEnlaceRfc: string;
  agregarEnlaceNombre: string;
  agregarEnlaceApellidoPaterno: string;
  agregarEnlaceApellidoMaterno: string;
  agregarEnlaceCiudadEstado: string;
  agregarEnlaceCargo: string;
  agregarEnlaceTelefono: string;
  agregarEnlaceCorreoElectronico: string;
  agregarEnlaceSuplente: boolean;

  '2089': number | string;
  '2090': number | string;
  '2091': number | string;

  '2042': number | string;
  '2043': number | string;
  '2044': number | string;
  fechaInicioComercio: string;
  fechaPago: string;
  monto: string;
  operacionesBancarias: string;
  llavePago: string;

  transportistaRFC: string;
  transportistaRFCModifTrans: string;
  transportistaRazonSocial: string;
  transportistaDomicilio: string;
  transportistaCaat: string;
  transportistaIdDomicilio: string;
  transportistaIdRFC: string;
  transportistaIdRazonSocial: string;
  transportistaIdCaat: string;

  /**
   * Carácter del miembro en la solicitud.
   */
  miembroCaracterDe: string | number;

  /**
   * Indica si el miembro tiene obligación de tributar en México.
   */
  miembroTributarMexico: number | string;

  /**
   * Nacionalidad del miembro.
   */
  miembroNacionalidad: string | number;

  /**
   * Registro Federal de Contribuyentes (RFC) del miembro.
   */
  miembroRfc: string;

  /**
   * Registro federal del miembro ante autoridades pertinentes.
   */
  miembroRegistroFederal: string;

  /**
   * Nombre completo del miembro.
   */
  miembroNombreCompleto: string;

  /**
   * Tipo de persona muestra en la solicitud.
   */
  miembroTipoPersonaMuestra: string | number;

  /**
   * Nombre del miembro.
   */
  miembroNombre: string;

  /**
   * Apellido paterno del miembro.
   */
  miembroApellidoPaterno: string;

  /**
   * Apellido materno del miembro.
   */
  miembroApellidoMaterno: string;

  /**
   * Nombre de la empresa del miembro.
   */
  miembroNombreEmpresa: string;

  subcontrataRFCBusqueda: string;
  subcontrataRFC: string;
  subcontrataRazonSocial: string;
  subcontrataEmpleados: string;
  subcontrataBimestre: number;

  principales: string | number;
  municipio: string;
  tipoDeInstalacion: string | number;
  entidadFederativa: string;
  registroSESAT: string;
  descripcion: string;
  codigoPostal: string;
  procesoProductivo: string | number;
  goceDelInmueble: string | number;
  empresa: string | number;
  comercioExterior: string | number;
  mutuo: string | number;

  catseleccionados: number;
  servicio: number;
  '190': string | number;
  '191': string | number;
  '199': string | number;
  empleados: string;
  bimestre: number;
  '2034': string | number;
  '236': string | number;
  '237': string | number;
  '238': string | number;
  '239': string | number;
  '240': string | number;
  '243': string | number;
  '244': string | number;
  '245': string | number;
  indiqueTodos: number;
  '246': string | number;
  file1: string;
  file2: string;
  '247': string | number;
  '248': string | number;
  identificacion: string;
  lugarDeRadicacion: string;
  '249': string | number;
  '250': string | number;
  '251': string | number;
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
  actualmente2: string;
  actualmente1: string;

  numeroDeEmpleadosLista: NumeroDeEmpleados[];
  domiciliosDatos: Domicilios[];
  listaSeccionSociosIC: SeccionSociosIC[];

  enlaceOperativosLista: EnlaceOperativo[];
}

export function createInitialSolicitudState(): Solicitud32605State {
  return {
    idPersonaSolicitud: '',
    rfcTercero: '',
    rfc: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    correoElectronico: '',

    agregarEnlaceRfcTercero: '',
    agregarEnlaceRfc: '',
    agregarEnlaceNombre: '',
    agregarEnlaceApellidoPaterno: '',
    agregarEnlaceApellidoMaterno: '',
    agregarEnlaceCiudadEstado: '',
    agregarEnlaceCargo: '',
    agregarEnlaceTelefono: '',
    agregarEnlaceCorreoElectronico: '',
    agregarEnlaceSuplente: false,

    '2089': 0,
    '2090': 0,
    '2091': 0,

    '2042': 0,
    '2043': 0,
    '2044': 0,
    fechaInicioComercio: '',
    fechaPago: '',
    monto: '',
    operacionesBancarias: '',
    llavePago: '',

    transportistaRFC: '',
    transportistaRFCModifTrans: '',
    transportistaRazonSocial: '',
    transportistaDomicilio: '',
    transportistaCaat: '',
    transportistaIdDomicilio: '',
    transportistaIdRFC: '',
    transportistaIdRazonSocial: '',
    transportistaIdCaat: '',

    miembroCaracterDe: '',
    miembroTributarMexico: 0,
    miembroNacionalidad: '',
    miembroRfc: '',
    miembroRegistroFederal: '',
    miembroNombreCompleto: '',
    miembroTipoPersonaMuestra: '',
    miembroNombre: '',
    miembroApellidoPaterno: '',
    miembroApellidoMaterno: '',
    miembroNombreEmpresa: '',

    subcontrataRFCBusqueda: '',
    subcontrataRFC: '',
    subcontrataRazonSocial: '',
    subcontrataEmpleados: '',
    subcontrataBimestre: 0,

    principales: 0,
    municipio: '',
    tipoDeInstalacion: 0,
    entidadFederativa: '',
    registroSESAT: '',
    descripcion: '',
    codigoPostal: '',
    procesoProductivo: 0,
    goceDelInmueble: 0,
    empresa: 0,
    comercioExterior: 0,
    mutuo: 0,

    catseleccionados: 0,
    servicio: 0,
    '190': 0,
    '191': 0,
    '199': 0,
    empleados: '',
    bimestre: 0,
    '2034': 0,
    '236': 0,
    '237': 0,
    '238': 0,
    '239': 0,
    '240': 0,
    '243': 0,
    '244': 0,
    '245': 0,
    indiqueTodos: 0,
    '246': 0,
    file1: '',
    file2: '',
    '247': 0,
    '248': 0,
    identificacion: '',
    lugarDeRadicacion: '',
    '249': 0,
    '250': 0,
    '251': 0,
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    actualmente2: '',
    actualmente1: '',
    numeroDeEmpleadosLista: [] as NumeroDeEmpleados[],
    domiciliosDatos: [] as Domicilios[],
    listaSeccionSociosIC: [] as SeccionSociosIC[],
    enlaceOperativosLista: [] as EnlaceOperativo[],
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'solicitud32605',
  resettable: true,
})
export class Solicitud32605Store extends Store<Solicitud32605State> {
  constructor() {
    super(createInitialSolicitudState());
  }

  actualizarIdPersonaSolicitud(valor: string): void {
    this.update((state) => ({ ...state, idPersonaSolicitud: valor }));
  }

  actualizarRfcTercero(valor: string): void {
    this.update((state) => ({ ...state, rfcTercero: valor }));
  }

  actualizarRfc(valor: string): void {
    this.update((state) => ({ ...state, rfc: valor }));
  }

  actualizarNombre(valor: string): void {
    this.update((state) => ({ ...state, nombre: valor }));
  }

  actualizarApellidoPaterno(valor: string): void {
    this.update((state) => ({ ...state, apellidoPaterno: valor }));
  }

  actualizarApellidoMaterno(valor: string): void {
    this.update((state) => ({ ...state, apellidoMaterno: valor }));
  }

  actualizarTelefono(valor: string): void {
    this.update((state) => ({ ...state, telefono: valor }));
  }

  actualizarCorreoElectronico(valor: string): void {
    this.update((state) => ({ ...state, correoElectronico: valor }));
  }

  actualizarEnlaceRfcTercero(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceRfcTercero: valor }));
  }

  actualizarEnlaceRfc(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceRfc: valor }));
  }

  actualizarEnlaceNombre(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceNombre: valor }));
  }

  actualizarEnlaceApellidoPaterno(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceApellidoPaterno: valor }));
  }

  actualizarEnlaceApellidoMaterno(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceApellidoMaterno: valor }));
  }

  actualizarEnlaceCiudadEstado(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceCiudadEstado: valor }));
  }

  actualizarEnlaceCargo(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceCargo: valor }));
  }

  actualizarEnlaceTelefono(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceTelefono: valor }));
  }

  actualizarEnlaceCorreoElectronico(valor: string): void {
    this.update((state) => ({
      ...state,
      agregarEnlaceCorreoElectronico: valor,
    }));
  }

  actualizarEnlaceSuplente(valor: boolean): void {
    this.update((state) => ({ ...state, agregarEnlaceSuplente: valor }));
  }

  actualizar2089(valor: number | string): void {
    this.update((state) => ({ ...state, '2089': valor }));
  }

  actualizar2090(valor: number | string): void {
    this.update((state) => ({ ...state, '2090': valor }));
  }

  actualizar2091(valor: number | string): void {
    this.update((state) => ({ ...state, '2091': valor }));
  }

  actualizar2042(valor: number | string): void {
    this.update((state) => ({ ...state, '2042': valor }));
  }

  actualizar2043(valor: number | string): void {
    this.update((state) => ({ ...state, '2043': valor }));
  }

  actualizar2044(valor: number | string): void {
    this.update((state) => ({ ...state, '2044': valor }));
  }

  actualizarFechaInicioComercio(valor: string): void {
    this.update((state) => ({ ...state, fechaInicioComercio: valor }));
  }

  actualizarFechaPago(valor: string): void {
    this.update((state) => ({ ...state, fechaPago: valor }));
  }

  actualizarMonto(valor: string): void {
    this.update((state) => ({ ...state, monto: valor }));
  }

  actualizarOperacionesBancarias(valor: string): void {
    this.update((state) => ({ ...state, operacionesBancarias: valor }));
  }

  actualizarLlavePago(valor: string): void {
    this.update((state) => ({ ...state, llavePago: valor }));
  }

  actualizarTransportistaRFC(valor: string): void {
    this.update((state) => ({ ...state, transportistaRFC: valor }));
  }

  actualizarTransportistaRFCModifTrans(valor: string): void {
    this.update((state) => ({ ...state, transportistaRFCModifTrans: valor }));
  }

  actualizarTransportistaRazonSocial(valor: string): void {
    this.update((state) => ({ ...state, transportistaRazonSocial: valor }));
  }

  actualizarTransportistaDomicilio(valor: string): void {
    this.update((state) => ({ ...state, transportistaDomicilio: valor }));
  }

  actualizarTransportistaCaat(valor: string): void {
    this.update((state) => ({ ...state, transportistaCaat: valor }));
  }

  actualizarTransportistaIdDomicilio(valor: string): void {
    this.update((state) => ({ ...state, transportistaIdDomicilio: valor }));
  }

  actualizarTransportistaIdRFC(valor: string): void {
    this.update((state) => ({ ...state, transportistaIdRFC: valor }));
  }

  actualizarTransportistaIdRazonSocial(valor: string): void {
    this.update((state) => ({ ...state, transportistaIdRazonSocial: valor }));
  }

  actualizarTransportistaIdCaat(valor: string): void {
    this.update((state) => ({ ...state, transportistaIdCaat: valor }));
  }

  /**
   * Actualiza el carácter del miembro.
   * @param {string | number} valor - Valor del carácter del miembro.
   */
  actualizarMiembroCaracterDe(valor: string | number): void {
    this.update((state) => ({ ...state, miembroCaracterDe: valor }));
  }

  /**
   * Actualiza la obligación de tributar en México.
   * @param {number | string} valor - Valor de tributar en México.
   */
  actualizarMiembroTributarMexico(valor: number | string): void {
    this.update((state) => ({ ...state, miembroTributarMexico: valor }));
  }

  /**
   * Actualiza la nacionalidad del miembro.
   * @param {string | number} valor - Valor de la nacionalidad.
   */
  actualizarMiembroNacionalidad(valor: string | number): void {
    this.update((state) => ({ ...state, miembroNacionalidad: valor }));
  }

  /**
   * Actualiza el RFC del miembro.
   * @param {string} valor - Valor del RFC.
   */
  actualizarMiembroRFC(valor: string): void {
    this.update((state) => ({ ...state, miembroRfc: valor }));
  }

  /**
   * Actualiza el registro federal del miembro.
   * @param {string} valor - Valor del registro federal.
   */
  actualizarMiembroRegistroFederal(valor: string): void {
    this.update((state) => ({ ...state, miembroRegistroFederal: valor }));
  }

  /**
   * Actualiza el nombre completo del miembro.
   * @param {string} valor - Nombre completo del miembro.
   */
  actualizarMiembroNombreCompleto(valor: string): void {
    this.update((state) => ({ ...state, miembroNombreCompleto: valor }));
  }

  /**
   * Actualiza el tipo de persona muestra del miembro.
   * @param {string | number} valor - Valor del tipo de persona muestra.
   */
  actualizarMiembroTipoPersonaMuestra(valor: string | number): void {
    this.update((state) => ({ ...state, miembroTipoPersonaMuestra: valor }));
  }

  /**
   * Actualiza el nombre del miembro.
   * @param {string} valor - Nombre del miembro.
   */
  actualizarMiembroNombre(valor: string): void {
    this.update((state) => ({ ...state, miembroNombre: valor }));
  }

  /**
   * Actualiza el apellido paterno del miembro.
   * @param {string} valor - Apellido paterno del miembro.
   */
  actualizarMiembroApellidoPaterno(valor: string): void {
    this.update((state) => ({ ...state, miembroApellidoPaterno: valor }));
  }

  /**
   * Actualiza el apellido materno del miembro.
   * @param {string} valor - Apellido materno del miembro.
   */
  actualizarMiembroApellidoMaterno(valor: string): void {
    this.update((state) => ({ ...state, miembroApellidoMaterno: valor }));
  }

  /**
   * Actualiza el nombre de la empresa del miembro.
   * @param {string} valor - Nombre de la empresa.
   */
  actualizarMiembroNombreEmpresa(valor: string): void {
    this.update((state) => ({ ...state, miembroNombreEmpresa: valor }));
  }

  actualizarSubcontrataRFCBusqueda(valor: string): void {
    this.update((state) => ({ ...state, subcontrataRFCBusqueda: valor }));
  }

  actualizarSubcontrataRFC(valor: string): void {
    this.update((state) => ({ ...state, subcontrataRFC: valor }));
  }

  actualizarSubcontrataRazonSocial(valor: string): void {
    this.update((state) => ({ ...state, subcontrataRazonSocial: valor }));
  }

  actualizarSubcontrataEmpleados(valor: string): void {
    this.update((state) => ({ ...state, subcontrataEmpleados: valor }));
  }

  actualizarSubcontrataBimestre(valor: number): void {
    this.update((state) => ({ ...state, subcontrataBimestre: valor }));
  }

  actualizarPrincipales(valor: string | number): void {
    this.update((state) => ({ ...state, principales: valor }));
  }

  actualizarMunicipio(valor: string): void {
    this.update((state) => ({ ...state, municipio: valor }));
  }

  actualizarTipoDeInstalacion(valor: string | number): void {
    this.update((state) => ({ ...state, tipoDeInstalacion: valor }));
  }

  actualizarEntidadFederativa(valor: string): void {
    this.update((state) => ({ ...state, entidadFederativa: valor }));
  }

  actualizarRegistroSESAT(valor: string): void {
    this.update((state) => ({ ...state, registroSESAT: valor }));
  }

  actualizarDescripcion(valor: string): void {
    this.update((state) => ({ ...state, descripcion: valor }));
  }

  actualizarCodigoPostal(valor: string): void {
    this.update((state) => ({ ...state, codigoPostal: valor }));
  }

  actualizarProcesoProductivo(valor: string | number): void {
    this.update((state) => ({ ...state, procesoProductivo: valor }));
  }

  actualizarGoceDelInmueble(valor: string | number): void {
    this.update((state) => ({ ...state, goceDelInmueble: valor }));
  }

  actualizarEmpresa(valor: string | number): void {
    this.update((state) => ({ ...state, empresa: valor }));
  }

  actualizarComercioExterior(valor: string | number): void {
    this.update((state) => ({ ...state, comercioExterior: valor }));
  }

  actualizarMutuo(valor: string | number): void {
    this.update((state) => ({ ...state, mutuo: valor }));
  }

  actualizarCatseleccionados(valor: number): void {
    this.update((state) => ({ ...state, catseleccionados: valor }));
  }

  actualizarServicio(valor: number): void {
    this.update((state) => ({ ...state, servicio: valor }));
  }

  actualizar190(valor: string | number): void {
    this.update((state) => ({ ...state, '190': valor }));
  }

  actualizar191(valor: string | number): void {
    this.update((state) => ({ ...state, '191': valor }));
  }

  actualizar199(valor: string | number): void {
    this.update((state) => ({ ...state, '199': valor }));
  }

  actualizarEmpleados(valor: string): void {
    this.update((state) => ({ ...state, empleados: valor }));
  }

  actualizarBimestre(valor: number): void {
    this.update((state) => ({ ...state, bimestre: valor }));
  }

  actualizar2034(valor: string | number): void {
    this.update((state) => ({ ...state, '2034': valor }));
  }

  actualizar236(valor: string | number): void {
    this.update((state) => ({ ...state, '236': valor }));
  }

  actualizar237(valor: string | number): void {
    this.update((state) => ({ ...state, '237': valor }));
  }

  actualizar238(valor: string | number): void {
    this.update((state) => ({ ...state, '238': valor }));
  }

  actualizar239(valor: string | number): void {
    this.update((state) => ({ ...state, '239': valor }));
  }

  actualizar240(valor: string | number): void {
    this.update((state) => ({ ...state, '240': valor }));
  }

  actualizar243(valor: string | number): void {
    this.update((state) => ({ ...state, '243': valor }));
  }

  actualizar244(valor: string | number): void {
    this.update((state) => ({ ...state, '244': valor }));
  }

  actualizar245(valor: string | number): void {
    this.update((state) => ({ ...state, '245': valor }));
  }

  actualizarIndiqueTodos(valor: number): void {
    this.update((state) => ({ ...state, indiqueTodos: valor }));
  }

  actualizar246(valor: string | number): void {
    this.update((state) => ({ ...state, '246': valor }));
  }

  actualizarFile1(valor: string): void {
    this.update((state) => ({ ...state, file1: valor }));
  }

  actualizarFile2(valor: string): void {
    this.update((state) => ({ ...state, file2: valor }));
  }

  actualizar247(valor: string | number): void {
    this.update((state) => ({ ...state, '247': valor }));
  }

  actualizar248(valor: string | number): void {
    this.update((state) => ({ ...state, '248': valor }));
  }

  actualizarIdentificacion(valor: string): void {
    this.update((state) => ({ ...state, identificacion: valor }));
  }

  actualizarLugarDeRadicacion(valor: string): void {
    this.update((state) => ({ ...state, lugarDeRadicacion: valor }));
  }

  actualizar249(valor: string | number): void {
    this.update((state) => ({ ...state, '249': valor }));
  }

  actualizar250(valor: string | number): void {
    this.update((state) => ({ ...state, '250': valor }));
  }

  actualizar251(valor: string | number): void {
    this.update((state) => ({ ...state, '251': valor }));
  }

  actualizarCheckbox1(valor: boolean): void {
    this.update((state) => ({ ...state, checkbox1: valor }));
  }

  actualizarCheckbox2(valor: boolean): void {
    this.update((state) => ({ ...state, checkbox2: valor }));
  }

  actualizarCheckbox3(valor: boolean): void {
    this.update((state) => ({ ...state, checkbox3: valor }));
  }

  actualizarActualmente2(valor: string): void {
    this.update((state) => ({ ...state, actualmente2: valor }));
  }

  actualizarActualmente1(valor: string): void {
    this.update((state) => ({ ...state, actualmente1: valor }));
  }

  actualizarNumeroDeEmpleadosLista(valor: NumeroDeEmpleados[]): void {
    this.update((state) => ({ ...state, numeroDeEmpleadosLista: valor }));
  }

  actualizarDomiciliosDatos(valor: Domicilios[]): void {
    this.update((state) => ({ ...state, domiciliosDatos: valor }));
  }

  actualizarListaSeccionSociosIC(valor: SeccionSociosIC[]): void {
    this.update((state) => ({ ...state, listaSeccionSociosIC: valor }));
  }

  actualizarEnlaceOperativosLista(valor: EnlaceOperativo[]): void {
    this.update((state) => ({ ...state, enlaceOperativosLista: valor }));
  }

  /**
   * Restablece el estado de la tienda a su estado inicial.
   */
  resetStore(): void {
    this.reset();
  }
}
