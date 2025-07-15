import { Domicilios } from '../models/solicitud.model';
import { EmpresaDelGrupo } from '../constants/datos-comunes.enum';
import { EnlaceOperativo } from '../models/solicitud.model';
import { Injectable } from '@angular/core';
import { NumeroDeEmpleados } from '../models/solicitud.model';
import { SeccionSociosIC } from '../models/solicitud.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { TablaEnlaceOperativo } from '../models/enlace-operativo-tabla.model';
import { TransportistasTable } from '../constants/datos-comunes.enum';
/**
 * Interfaz que define las propiedades relacionadas con listas de datos
 * de empleados, domicilios, socios, y enlaces operativos.
 */
export interface Solicitud32605State {
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


  // -------------------------------------------------------------
    /**
     * Indica si la empresa realiza operaciones de comercio exterior.
     * Valor booleano representado como string ('1' para Sí, '0' para No).
     */
    comercioExteriorRealizado: string;

    /**
     * Fecha en que se realizó el pago asociado a la solicitud.
     * Formato esperado: DD/MM/YYYY.
     */
    fechaDePago: string;

    /**
     * Fecha de inicio de las operaciones de comercio exterior de la empresa.
     * Formato esperado: DD/MM/YYYY.
     */
    fechaInicioComercio: string;

    /**
     * Indica si la empresa es parte de un grupo empresarial que realiza comercio exterior.
     * Valor booleano representado como string ('1' para Sí, '0' para No).
     */
    esParteGrupoComercioExterior: string;

    /**
     * RFC o clave operativa de la empresa del enlace operativo.
     * Identificador fiscal único de 12 o 13 caracteres.
     */
    rfcEnclaveOperativo: string;

    /**
     * RFC del enlace operativo obtenido automáticamente del servicio.
     * Campo de solo lectura que se llena al buscar por RFC.
     */
    enlaceOperativorfc: string;

    /**
     * Denominación social o razón social de la empresa del enlace operativo.
     * Nombre legal completo de la empresa registrada.
     */
    denominacionRazonsocial: string;

    /**
     * Domicilio fiscal completo de la empresa del enlace operativo.
     * Dirección registrada ante las autoridades fiscales.
     */
    domicilio: string;

    /**
     * Fecha de la última operación comercial registrada por la empresa.
     * Formato esperado: DD/MM/YYYY. Campo opcional.
     */
    inputfechaDeLaUltimaOperacion: string;

    /**
     * Indica si existe fusión o escisión con operaciones de comercio exterior.
     * Valor booleano representado como string ('1' para Sí, '0' para No).
     */
    fusionEscisionConOperacionExterior: string;

    /**
     * Indica si la empresa es extranjera con programa IMMEX.
     * Valor booleano representado como string ('1' para Sí, '0' para No).
     */
    empresaExtranjeraIMMEX: string;

    /**
     * Monto total en pesos mexicanos asociado a las operaciones.
     * Valor numérico representado como string.
     */
    monto: string;

    /**
     * Detalles de las operaciones bancarias relacionadas con la solicitud.
     * Información alfanumérica sobre transacciones financieras.
     */
    operacionesBancarias: string;

    /**
     * Llave de pago única para identificar la transacción.
     * Código alfanumérico generado por el sistema bancario.
     */
    llavePago: string;

    /**
     * Registro del esquema de certificación empresarial.
     * Indica si se autoriza o no el esquema ('1' para Sí Autorizo, '0' para No Autorizo).
     */
    registroEsquemaCertificacion: string;

    /**
     * Tipo de información de la empresa según su clasificación.
     * Indica si es información pública o privada ('1' para Pública, '0' para Privada).
     */
    tipoInformacionEmpresa: string;

    /**
     * Número de registro CAAT vigente del transportista.
     * Código de autorización para transportistas de carga.
     */
    ccat: string;

    /**
     * Lista de empresas del grupo comercial relacionadas con la solicitud.
     * Array que contiene objetos de tipo EmpresaDelGrupo con RFC, denominación, domicilio y fecha.
     */
    tablaDatos: EmpresaDelGrupo[];

    /**
     * Lista de transportistas autorizados para la operación.
     * Array que contiene objetos de tipo TransportistasTable con RFC, denominación, domicilio y CAAT.
     */
    transportistasLista: TransportistasTable[];
    autorizacionCBP: string;
    instalacionesCertificadasCBP: string;
    suspensionCancelacionCBP: string;
  //--------------------------------------------------------------
}

/**
 * Crea el estado inicial para `Solicitud32605State`.
 *
 * @returns El estado inicial con valores predeterminados.
 */
export function createInitialSolicitudState(): Solicitud32605State {
  return {

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
  //---------------------------------------

    /**
     * Indica si la empresa realiza operaciones de comercio exterior.
     * Valor booleano representado como string ('1' para Sí, '0' para No).
     */
    comercioExteriorRealizado: '',

    /**
    * Fecha en que se realizó el pago asociado a la solicitud.
    * Formato esperado: DD/MM/YYYY.
    */
    fechaDePago: '',

    /**
    * Fecha de inicio de las operaciones de comercio exterior de la empresa.
    * Formato esperado: DD/MM/YYYY.
    */
    fechaInicioComercio: '',

    /**
    * Indica si la empresa es parte de un grupo empresarial que realiza comercio exterior.
    * Valor booleano representado como string ('1' para Sí, '0' para No).
    */
    esParteGrupoComercioExterior: '',

    /**
    * RFC o clave operativa de la empresa del enlace operativo.
    * Identificador fiscal único de 12 o 13 caracteres.
    */
    rfcEnclaveOperativo: '',

    /**
    * RFC del enlace operativo obtenido automáticamente del servicio.
    * Campo de solo lectura que se llena al buscar por RFC.
    */
    enlaceOperativorfc: '',

    /**
    * Denominación social o razón social de la empresa del enlace operativo.
    * Nombre legal completo de la empresa registrada.
    */
    denominacionRazonsocial: '',

    /**
    * Domicilio fiscal completo de la empresa del enlace operativo.
    * Dirección registrada ante las autoridades fiscales.
    */
    domicilio: '',

    /**
    * Fecha de la última operación comercial registrada por la empresa.
    * Formato esperado: DD/MM/YYYY. Campo opcional.
    */
    inputfechaDeLaUltimaOperacion: '',

    /**
    * Indica si existe fusión o escisión con operaciones de comercio exterior.
    * Valor booleano representado como string ('1' para Sí, '0' para No).
    */
    fusionEscisionConOperacionExterior: '',

    /**
    * Indica si la empresa es extranjera con programa IMMEX.
    * Valor booleano representado como string ('1' para Sí, '0' para No).
    */
    empresaExtranjeraIMMEX: '',

    /**
    * Monto total en pesos mexicanos asociado a las operaciones.
    * Valor numérico representado como string.
    */
    monto: '',

    /**
    * Detalles de las operaciones bancarias relacionadas con la solicitud.
    * Información alfanumérica sobre transacciones financieras.
    */
    operacionesBancarias: '',

    /**
    * Llave de pago única para identificar la transacción.
    * Código alfanumérico generado por el sistema bancario.
    */
    llavePago: '',

    /**
    * Registro del esquema de certificación empresarial.
    * Indica si se autoriza o no el esquema ('1' para Sí Autorizo, '0' para No Autorizo).
    */
    registroEsquemaCertificacion: '',

    /**
    * Tipo de información de la empresa según su clasificación.
    * Indica si es información pública o privada ('1' para Pública, '0' para Privada).
    */
    tipoInformacionEmpresa: '',

    /**
    * Número de registro CAAT vigente del transportista.
    * Código de autorización para transportistas de carga.
    */
    ccat: '',

    /**
    * Lista de empresas del grupo comercial relacionadas con la solicitud.
    * Array que contiene objetos de tipo EmpresaDelGrupo con RFC, denominación, domicilio y fecha.
    */
    tablaDatos: [],

    /**
    * Lista de transportistas autorizados para la operación.
    * Array que contiene objetos de tipo TransportistasTable con RFC, denominación, domicilio y CAAT.
    */
    transportistasLista: [],

    autorizacionCBP: '',
    instalacionesCertificadasCBP: '',
    suspensionCancelacionCBP: ''
//--------------------------------------------------------------
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'solicitud32605',
  resettable: true,
})
/** Clase encargada de manejar el estado de 'Solicitud32605' mediante el uso de un store.
 *  Esta clase extiende de la clase 'Store', lo que permite la gestión centralizada del estado.
 */
export class Solicitud32605Store extends Store<Solicitud32605State> {
  /**
   * Constructor que inicializa el estado de la solicitud.
   * Utiliza la función `createInitialSolicitudState` para establecer el estado inicial.
   */
  constructor() {
    super(createInitialSolicitudState());
  }

  /**
   * Actualiza el valor del campo `idPersonaSolicitud` en el estado.
   *
   * @param valor - El nuevo valor para `idPersonaSolicitud`.
   */
  actualizarIdPersonaSolicitud(valor: string): void {
    this.update((state) => ({ ...state, idPersonaSolicitud: valor }));
  }

  /**
   * Actualiza el valor del campo `rfcTercero` en el estado.
   *
   * @param valor - El nuevo valor para `rfcTercero`.
   */
  actualizarRfcTercero(valor: string): void {
    this.update((state) => ({ ...state, rfcTercero: valor }));
  }

  /**
   * Actualiza el valor del campo `rfc` en el estado.
   *
   * @param valor - El nuevo valor para `rfc`.
   */
  actualizarRfc(valor: string): void {
    this.update((state) => ({ ...state, rfc: valor }));
  }

  /**
   * Actualiza el valor del campo `nombre` en el estado.
   *
   * @param valor - El nuevo valor para `nombre`.
   */
  actualizarNombre(valor: string): void {
    this.update((state) => ({ ...state, nombre: valor }));
  }

  /**
   * Actualiza el valor del campo `apellidoPaterno` en el estado.
   *
   * @param valor - El nuevo valor para `apellidoPaterno`.
   */
  actualizarApellidoPaterno(valor: string): void {
    this.update((state) => ({ ...state, apellidoPaterno: valor }));
  }

  /**
   * Actualiza el valor del campo `apellidoMaterno` en el estado.
   *
   * @param valor - El nuevo valor para `apellidoMaterno`.
   */
  actualizarApellidoMaterno(valor: string): void {
    this.update((state) => ({ ...state, apellidoMaterno: valor }));
  }

  /**
   * Actualiza el valor del campo `telefono` en el estado.
   *
   * @param valor - El nuevo valor para `telefono`.
   */
  actualizarTelefono(valor: string): void {
    this.update((state) => ({ ...state, telefono: valor }));
  }

  /**
   * Actualiza el valor del campo `correoElectronico` en el estado.
   *
   * @param valor - El nuevo valor para `correoElectronico`.
   */
  actualizarCorreoElectronico(valor: string): void {
    this.update((state) => ({ ...state, correoElectronico: valor }));
  }

  /**
   * Actualiza el valor del campo `agregarEnlaceRfcTercero` en el estado.
   *
   * @param valor - El nuevo valor para `agregarEnlaceRfcTercero`.
   */
  actualizarEnlaceRfcTercero(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceRfcTercero: valor }));
  }

  /**
   * Actualiza el valor del campo `agregarEnlaceRfc` en el estado.
   *
   * @param valor - El nuevo valor para `agregarEnlaceRfc`.
   */
  actualizarEnlaceRfc(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceRfc: valor }));
  }

  /**
   * Actualiza el valor del campo `agregarEnlaceNombre` en el estado.
   *
   * @param valor - El nuevo valor para `agregarEnlaceNombre`.
   */
  actualizarEnlaceNombre(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceNombre: valor }));
  }

  /**
   * Actualiza el valor del campo `agregarEnlaceApellidoPaterno` en el estado.
   *
   * @param valor - El nuevo valor para `agregarEnlaceApellidoPaterno`.
   */
  actualizarEnlaceApellidoPaterno(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceApellidoPaterno: valor }));
  }

  /**
   * Actualiza el valor del campo `agregarEnlaceApellidoMaterno` en el estado.
   *
   * @param valor - El nuevo valor para `agregarEnlaceApellidoMaterno`.
   */
  actualizarEnlaceApellidoMaterno(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceApellidoMaterno: valor }));
  }

  /**
   * Actualiza el valor del campo `agregarEnlaceCiudadEstado` en el estado.
   *
   * @param valor - El nuevo valor para `agregarEnlaceCiudadEstado`.
   */
  actualizarEnlaceCiudadEstado(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceCiudadEstado: valor }));
  }

  /**
   * Actualiza el valor del campo `agregarEnlaceCargo` en el estado.
   *
   * @param valor - El nuevo valor para `agregarEnlaceCargo`.
   */
  actualizarEnlaceCargo(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceCargo: valor }));
  }

  /**
   * Actualiza el valor del campo `agregarEnlaceTelefono` en el estado.
   *
   * @param valor - El nuevo valor para `agregarEnlaceTelefono`.
   */
  actualizarEnlaceTelefono(valor: string): void {
    this.update((state) => ({ ...state, agregarEnlaceTelefono: valor }));
  }

  /**
   * Actualiza el valor del campo `agregarEnlaceCorreoElectronico` en el estado.
   *
   * @param valor - El nuevo valor para `agregarEnlaceCorreoElectronico`.
   */
  actualizarEnlaceCorreoElectronico(valor: string): void {
    this.update((state) => ({
      ...state,
      agregarEnlaceCorreoElectronico: valor,
    }));
  }

  /**
   * Actualiza el valor del campo `agregarEnlaceSuplente` en el estado.
   *
   * @param valor - El nuevo valor para `agregarEnlaceSuplente`.
   */
  actualizarEnlaceSuplente(valor: boolean): void {
    this.update((state) => ({ ...state, agregarEnlaceSuplente: valor }));
  }

  /**
   * Actualiza el valor del campo `2089` en el estado.
   *
   * @param valor - El nuevo valor para el campo `2089`.
   */
  actualizar2089(valor: number | string): void {
    this.update((state) => ({ ...state, '2089': valor }));
  }

  /**
   * Actualiza el valor del campo `2090` en el estado.
   *
   * @param valor - El nuevo valor para el campo `2090`.
   */
  actualizar2090(valor: number | string): void {
    this.update((state) => ({ ...state, '2090': valor }));
  }

  /**
   * Actualiza el valor del campo `2091` en el estado.
   *
   * @param valor - El nuevo valor para el campo `2091`.
   */
  actualizar2091(valor: number | string): void {
    this.update((state) => ({ ...state, '2091': valor }));
  }

  /**
   * Actualiza el valor del campo `2042` en el estado.
   *
   * @param valor - El nuevo valor para el campo `2042`.
   */
  actualizar2042(valor: number | string): void {
    this.update((state) => ({ ...state, '2042': valor }));
  }

  /**
   * Actualiza el valor del campo `2043` en el estado.
   *
   * @param valor - El nuevo valor para el campo `2043`.
   */
  actualizar2043(valor: number | string): void {
    this.update((state) => ({ ...state, '2043': valor }));
  }

  /**
   * Actualiza el valor del campo `2044` en el estado.
   *
   * @param valor - El nuevo valor para el campo `2044`.
   */
  actualizar2044(valor: number | string): void {
    this.update((state) => ({ ...state, '2044': valor }));
  }

  /**
   * Actualiza el valor del campo `fechaInicioComercio` en el estado.
   *
   * @param valor - El nuevo valor para `fechaInicioComercio`.
   */
  actualizarFechaInicioComercio(valor: string): void {
    this.update((state) => ({ ...state, fechaInicioComercio: valor }));
  }

  /**
   * Actualiza el valor del campo `fechaPago` en el estado.
   *
   * @param valor - El nuevo valor para `fechaPago`.
   */
  actualizarFechaPago(valor: string): void {
    this.update((state) => ({ ...state, fechaPago: valor }));
  }

  /**
   * Actualiza el valor del campo `monto` en el estado.
   *
   * @param valor - El nuevo valor para `monto`.
   */
  actualizarMonto(valor: string): void {
    this.update((state) => ({ ...state, monto: valor }));
  }

  /**
   * Actualiza el valor del campo `operacionesBancarias` en el estado.
   *
   * @param valor - El nuevo valor para `operacionesBancarias`.
   */
  actualizarOperacionesBancarias(valor: string): void {
    this.update((state) => ({ ...state, operacionesBancarias: valor }));
  }

  /**
   * Actualiza el valor del campo `llavePago` en el estado.
   *
   * @param valor - El nuevo valor para `llavePago`.
   */
  actualizarLlavePago(valor: string): void {
    this.update((state) => ({ ...state, llavePago: valor }));
  }

  /**
   * Actualiza el valor del campo `transportistaRFC` en el estado.
   *
   * @param valor - El nuevo valor para `transportistaRFC`.
   */
  actualizarTransportistaRFC(valor: string): void {
    this.update((state) => ({ ...state, transportistaRFC: valor }));
  }

  /**
   * Actualiza el valor del campo `transportistaRFCModifTrans` en el estado.
   *
   * @param valor - El nuevo valor para `transportistaRFCModifTrans`.
   */
  actualizarTransportistaRFCModifTrans(valor: string): void {
    this.update((state) => ({ ...state, transportistaRFCModifTrans: valor }));
  }

  /**
   * Actualiza el valor del campo `transportistaRazonSocial` en el estado.
   *
   * @param valor - El nuevo valor para `transportistaRazonSocial`.
   */
  actualizarTransportistaRazonSocial(valor: string): void {
    this.update((state) => ({ ...state, transportistaRazonSocial: valor }));
  }

  /**
   * Actualiza el valor del campo `transportistaDomicilio` en el estado.
   *
   * @param valor - El nuevo valor para `transportistaDomicilio`.
   */
  actualizarTransportistaDomicilio(valor: string): void {
    this.update((state) => ({ ...state, transportistaDomicilio: valor }));
  }

  /**
   * Actualiza el valor del campo `transportistaCaat` en el estado.
   *
   * @param valor - El nuevo valor para `transportistaCaat`.
   */
  actualizarTransportistaCaat(valor: string): void {
    this.update((state) => ({ ...state, transportistaCaat: valor }));
  }

  /**
   * Actualiza el valor del campo `transportistaIdDomicilio` en el estado.
   *
   * @param valor - El nuevo valor para `transportistaIdDomicilio`.
   */
  actualizarTransportistaIdDomicilio(valor: string): void {
    this.update((state) => ({ ...state, transportistaIdDomicilio: valor }));
  }

  /**
   * Actualiza el valor del campo `transportistaIdRFC` en el estado.
   *
   * @param valor - El nuevo valor para `transportistaIdRFC`.
   */
  actualizarTransportistaIdRFC(valor: string): void {
    this.update((state) => ({ ...state, transportistaIdRFC: valor }));
  }

  /**
   * Actualiza el valor del campo `transportistaIdRazonSocial` en el estado.
   *
   * @param valor - El nuevo valor para `transportistaIdRazonSocial`.
   */
  actualizarTransportistaIdRazonSocial(valor: string): void {
    this.update((state) => ({ ...state, transportistaIdRazonSocial: valor }));
  }

  /**
   * Actualiza el valor del campo `transportistaIdCaat` en el estado.
   *
   * @param valor - El nuevo valor para `transportistaIdCaat`.
   */
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
   * Actualiza el valor del campo `subcontrataRFCBusqueda` en el estado.
   *
   * @param valor - El nuevo valor para `subcontrataRFCBusqueda`.
   */
  actualizarSubcontrataRFCBusqueda(valor: string): void {
    this.update((state) => ({ ...state, subcontrataRFCBusqueda: valor }));
  }

  /**
   * Actualiza el valor del campo `subcontrataRFC` en el estado.
   *
   * @param valor - El nuevo valor para `subcontrataRFC`.
   */
  actualizarSubcontrataRFC(valor: string): void {
    this.update((state) => ({ ...state, subcontrataRFC: valor }));
  }

  /**
   * Actualiza el valor del campo `subcontrataRazonSocial` en el estado.
   *
   * @param valor - El nuevo valor para `subcontrataRazonSocial`.
   */
  actualizarSubcontrataRazonSocial(valor: string): void {
    this.update((state) => ({ ...state, subcontrataRazonSocial: valor }));
  }

  /**
   * Actualiza el valor del campo `subcontrataEmpleados` en el estado.
   *
   * @param valor - El nuevo valor para `subcontrataEmpleados`.
   */
  actualizarSubcontrataEmpleados(valor: string): void {
    this.update((state) => ({ ...state, subcontrataEmpleados: valor }));
  }

  /**
   * Actualiza el valor del campo `subcontrataBimestre` en el estado.
   *
   * @param valor - El nuevo valor para `subcontrataBimestre`.
   */
  actualizarSubcontrataBimestre(valor: number): void {
    this.update((state) => ({ ...state, subcontrataBimestre: valor }));
  }

  /**
   * Actualiza el valor del campo `principales` en el estado.
   *
   * @param valor - El nuevo valor para `principales`.
   */
  actualizarPrincipales(valor: string | number): void {
    this.update((state) => ({ ...state, principales: valor }));
  }

  /**
   * Actualiza el valor del campo `municipio` en el estado.
   *
   * @param valor - El nuevo valor para `municipio`.
   */
  actualizarMunicipio(valor: string): void {
    this.update((state) => ({ ...state, municipio: valor }));
  }

  /**
   * Actualiza el valor del campo `tipoDeInstalacion` en el estado.
   *
   * @param valor - El nuevo valor para `tipoDeInstalacion`.
   */
  actualizarTipoDeInstalacion(valor: string | number): void {
    this.update((state) => ({ ...state, tipoDeInstalacion: valor }));
  }

  /**
   * Actualiza el valor del campo `entidadFederativa` en el estado.
   *
   * @param valor - El nuevo valor para `entidadFederativa`.
   */
  actualizarEntidadFederativa(valor: string): void {
    this.update((state) => ({ ...state, entidadFederativa: valor }));
  }

  /**
   * Actualiza el valor del campo `registroSESAT` en el estado.
   *
   * @param valor - El nuevo valor para `registroSESAT`.
   */
  actualizarRegistroSESAT(valor: string): void {
    this.update((state) => ({ ...state, registroSESAT: valor }));
  }

  /**
   * Actualiza el valor del campo `descripcion` en el estado.
   *
   * @param valor - El nuevo valor para `descripcion`.
   */
  actualizarDescripcion(valor: string): void {
    this.update((state) => ({ ...state, descripcion: valor }));
  }

  /**
   * Actualiza el valor del campo `codigoPostal` en el estado.
   *
   * @param valor - El nuevo valor para `codigoPostal`.
   */
  actualizarCodigoPostal(valor: string): void {
    this.update((state) => ({ ...state, codigoPostal: valor }));
  }

  /**
   * Actualiza el valor del campo `procesoProductivo` en el estado.
   *
   * @param valor - El nuevo valor para `procesoProductivo`.
   */
  actualizarProcesoProductivo(valor: string | number): void {
    this.update((state) => ({ ...state, procesoProductivo: valor }));
  }

  /**
   * Actualiza el valor del campo `goceDelInmueble` en el estado.
   *
   * @param valor - El nuevo valor para `goceDelInmueble`.
   */
  actualizarGoceDelInmueble(valor: string | number): void {
    this.update((state) => ({ ...state, goceDelInmueble: valor }));
  }

  /**
   * Actualiza el valor del campo `empresa` en el estado.
   *
   * @param valor - El nuevo valor para `empresa`.
   */
  actualizarEmpresa(valor: string | number): void {
    this.update((state) => ({ ...state, empresa: valor }));
  }

  /**
   * Actualiza el valor del campo `comercioExterior` en el estado.
   *
   * @param valor - El nuevo valor para `comercioExterior`.
   */
  actualizarComercioExterior(valor: string | number): void {
    this.update((state) => ({ ...state, comercioExterior: valor }));
  }

  /**
   * Actualiza el valor del campo `mutuo` en el estado.
   *
   * @param valor - El nuevo valor para `mutuo`.
   */
  actualizarMutuo(valor: string | number): void {
    this.update((state) => ({ ...state, mutuo: valor }));
  }

  /**
   * Actualiza el valor del campo `catseleccionados` en el estado.
   *
   * @param valor - El nuevo valor para `catseleccionados`.
   */
  actualizarCatseleccionados(valor: number): void {
    this.update((state) => ({ ...state, catseleccionados: valor }));
  }

  /**
   * Actualiza el valor del campo `servicio` en el estado.
   *
   * @param valor - El nuevo valor para `servicio`.
   */
  actualizarServicio(valor: number): void {
    this.update((state) => ({ ...state, servicio: valor }));
  }

  /**
   * Actualiza el valor del campo `190` en el estado.
   *
   * @param valor - El nuevo valor para el campo `190`.
   */
  actualizar190(valor: string | number): void {
    this.update((state) => ({ ...state, '190': valor }));
  }

  /**
   * Actualiza el valor del campo `191` en el estado.
   *
   * @param valor - El nuevo valor para el campo `191`.
   */
  actualizar191(valor: string | number): void {
    this.update((state) => ({ ...state, '191': valor }));
  }

  /**
   * Actualiza el valor del campo `199` en el estado.
   *
   * @param valor - El nuevo valor para el campo `199`.
   */
  actualizar199(valor: string | number): void {
    this.update((state) => ({ ...state, '199': valor }));
  }

  /**
   * Actualiza el valor del campo `empleados` en el estado.
   *
   * @param valor - El nuevo valor para `empleados`.
   */
  actualizarEmpleados(valor: string): void {
    this.update((state) => ({ ...state, empleados: valor }));
  }

  /**
   * Actualiza el valor del campo `bimestre` en el estado.
   *
   * @param valor - El nuevo valor para `bimestre`.
   */
  actualizarBimestre(valor: number): void {
    this.update((state) => ({ ...state, bimestre: valor }));
  }

  /**
   * Actualiza el valor del campo `2034` en el estado.
   *
   * @param valor - El nuevo valor para el campo `2034`.
   */
  actualizar2034(valor: string | number): void {
    this.update((state) => ({ ...state, '2034': valor }));
  }

  /**
   * Actualiza el valor del campo `236` en el estado.
   *
   * @param valor - El nuevo valor para el campo `236`.
   */
  actualizar236(valor: string | number): void {
    this.update((state) => ({ ...state, '236': valor }));
  }

  /**
   * Actualiza el valor del campo `237` en el estado.
   *
   * @param valor - El nuevo valor para el campo `237`.
   */
  actualizar237(valor: string | number): void {
    this.update((state) => ({ ...state, '237': valor }));
  }

  /**
   * Actualiza el valor del campo `238` en el estado.
   *
   * @param valor - El nuevo valor para el campo `238`.
   */
  actualizar238(valor: string | number): void {
    this.update((state) => ({ ...state, '238': valor }));
  }

  /**
   * Actualiza el valor del campo `239` en el estado.
   *
   * @param valor - El nuevo valor para el campo `239`.
   */
  actualizar239(valor: string | number): void {
    this.update((state) => ({ ...state, '239': valor }));
  }

  /**
   * Actualiza el valor del campo `240` en el estado.
   *
   * @param valor - El nuevo valor para el campo `240`.
   */
  actualizar240(valor: string | number): void {
    this.update((state) => ({ ...state, '240': valor }));
  }

  /**
   * Actualiza el valor del campo `243` en el estado.
   *
   * @param valor - El nuevo valor para el campo `243`.
   */
  actualizar243(valor: string | number): void {
    this.update((state) => ({ ...state, '243': valor }));
  }

  /**
   * Actualiza el valor del campo `244` en el estado.
   *
   * @param valor - El nuevo valor para el campo `244`.
   */
  actualizar244(valor: string | number): void {
    this.update((state) => ({ ...state, '244': valor }));
  }

  /**
   * Actualiza el valor del campo `245` en el estado.
   *
   * @param valor - El nuevo valor para el campo `245`.
   */
  actualizar245(valor: string | number): void {
    this.update((state) => ({ ...state, '245': valor }));
  }

  /**
   * Actualiza el valor del campo `indiqueTodos` en el estado.
   *
   * @param valor - El nuevo valor para `indiqueTodos`.
   */
  actualizarIndiqueTodos(valor: number): void {
    this.update((state) => ({ ...state, indiqueTodos: valor }));
  }

  /**
   * Actualiza el valor del campo `246` en el estado.
   *
   * @param valor - El nuevo valor para el campo `246`.
   */
  actualizar246(valor: string | number): void {
    this.update((state) => ({ ...state, '246': valor }));
  }

  /**
   * Actualiza el valor del campo `file1` en el estado.
   *
   * @param valor - El nuevo valor para `file1`.
   */
  actualizarFile1(valor: string): void {
    this.update((state) => ({ ...state, file1: valor }));
  }

  /**
   * Actualiza el valor del campo `file2` en el estado.
   *
   * @param valor - El nuevo valor para `file2`.
   */
  actualizarFile2(valor: string): void {
    this.update((state) => ({ ...state, file2: valor }));
  }

  /**
   * Actualiza el valor del campo `247` en el estado.
   *
   * @param valor - El nuevo valor para el campo `247`.
   */
  actualizar247(valor: string | number): void {
    this.update((state) => ({ ...state, '247': valor }));
  }

  /**
   * Actualiza el valor del campo `248` en el estado.
   *
   * @param valor - El nuevo valor para el campo `248`.
   */
  actualizar248(valor: string | number): void {
    this.update((state) => ({ ...state, '248': valor }));
  }

  /**
   * Actualiza el valor del campo `identificacion` en el estado.
   *
   * @param valor - El nuevo valor para `identificacion`.
   */
  actualizarIdentificacion(valor: string): void {
    this.update((state) => ({ ...state, identificacion: valor }));
  }

  /**
   * Actualiza el valor del campo `lugarDeRadicacion` en el estado.
   *
   * @param valor - El nuevo valor para `lugarDeRadicacion`.
   */
  actualizarLugarDeRadicacion(valor: string): void {
    this.update((state) => ({ ...state, lugarDeRadicacion: valor }));
  }

  /**
   * Actualiza el valor del campo `249` en el estado.
   *
   * @param valor - El nuevo valor para el campo `249`.
   */
  actualizar249(valor: string | number): void {
    this.update((state) => ({ ...state, '249': valor }));
  }

  /**
   * Actualiza el valor del campo `250` en el estado.
   *
   * @param valor - El nuevo valor para el campo `250`.
   */
  actualizar250(valor: string | number): void {
    this.update((state) => ({ ...state, '250': valor }));
  }

  /**
   * Actualiza el valor del campo `251` en el estado.
   *
   * @param valor - El nuevo valor para el campo `251`.
   */
  actualizar251(valor: string | number): void {
    this.update((state) => ({ ...state, '251': valor }));
  }

  /**
   * Actualiza el valor del campo `checkbox1` en el estado.
   *
   * @param valor - El nuevo valor para `checkbox1`.
   */
  actualizarCheckbox1(valor: boolean): void {
    this.update((state) => ({ ...state, checkbox1: valor }));
  }

  /**
   * Actualiza el valor del campo `checkbox2` en el estado.
   *
   * @param valor - El nuevo valor para `checkbox2`.
   */
  actualizarCheckbox2(valor: boolean): void {
    this.update((state) => ({ ...state, checkbox2: valor }));
  }

  /**
   * Actualiza el valor del campo `checkbox3` en el estado.
   *
   * @param valor - El nuevo valor para `checkbox3`.
   */
  actualizarCheckbox3(valor: boolean): void {
    this.update((state) => ({ ...state, checkbox3: valor }));
  }

  /**
   * Actualiza el valor del campo `actualmente2` en el estado.
   *
   * @param valor - El nuevo valor para `actualmente2`.
   */
  actualizarActualmente2(valor: string): void {
    this.update((state) => ({ ...state, actualmente2: valor }));
  }

  /**
   * Actualiza el valor del campo `actualmente1` en el estado.
   *
   * @param valor - El nuevo valor para `actualmente1`.
   */
  actualizarActualmente1(valor: string): void {
    this.update((state) => ({ ...state, actualmente1: valor }));
  }

  /**
   * Actualiza el valor del campo `numeroDeEmpleadosLista` en el estado.
   *
   * @param valor - El nuevo valor para `numeroDeEmpleadosLista`.
   */
  actualizarNumeroDeEmpleadosLista(valor: NumeroDeEmpleados[]): void {
    this.update((state) => ({ ...state, numeroDeEmpleadosLista: valor }));
  }

  /**
   * Actualiza el valor del campo `domiciliosDatos` en el estado.
   *
   * @param valor - El nuevo valor para `domiciliosDatos`.
   */
  actualizarDomiciliosDatos(valor: Domicilios[]): void {
    this.update((state) => ({ ...state, domiciliosDatos: valor }));
  }

  /**
   * Actualiza el valor del campo `listaSeccionSociosIC` en el estado.
   *
   * @param valor - El nuevo valor para `listaSeccionSociosIC`.
   */
  actualizarListaSeccionSociosIC(valor: SeccionSociosIC[]): void {
    this.update((state) => ({ ...state, listaSeccionSociosIC: valor }));
  }

  /**
   * Actualiza el valor del campo `enlaceOperativosLista` en el estado.
   *
   * @param valor - El nuevo valor para `enlaceOperativosLista`.
   */
  actualizarEnlaceOperativosLista(valor: EnlaceOperativo[]): void {
    this.update((state) => ({ ...state, enlaceOperativosLista: valor }));
  }

  /**
   * Restablece el estado de la tienda a su estado inicial.
   */
  resetStore(): void {
    this.reset();
  }



  //------------------------------------------------------------------------------

  /**
   * Actualiza el estado del store con los valores proporcionados.
   * Valores parciales para actualizar el estado.
   */
  public actualizarEstado(valores: Partial<Solicitud32605State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }

  //-------------------------------------------------------------------------------
}
