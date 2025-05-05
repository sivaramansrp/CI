import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

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

  /**
   * Restablece el estado de la tienda a su estado inicial.
   */
  resetStore(): void {
    this.reset();
  }
}
