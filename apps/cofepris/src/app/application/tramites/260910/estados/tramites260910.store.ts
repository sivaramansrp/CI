import { Destinatario } from '../models/destinatario.model';
import { Fabricante } from '../models/fabricante.model';
import { Facturador } from '../models/facturador.model';
import { Injectable } from '@angular/core';
import { Mercancia } from '../models/mercancia.model';
import { Proveedor } from '../models/proveedor.model';
import { SCIAN } from '../models/SCIAN.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interfaz que representa el estado de la solicitud 260910.
 * Contiene toda la información necesaria relacionada con la solicitud, incluyendo datos personales, detalles de mercancías y pagos.
 */
export interface Solicitud260910State {
  /** Seleccione Tipo Operación */
  tipoOperacion: string | number;

  /** Justificación */
  observaciones: string;

  /** RFC del responsable sanitario */
  rfcSanitario: string;

  /** Razón social del solicitante. */
  razonSocial: string;

  /** Dirección de correo electrónico del solicitante. */
  correoElectronico: string;

  /** Código postal del domicilio del solicitante. */
  codigoPostal: string;

  /** Identificador del estado asociado con el domicilio. */
  estado: number;

  /** Municipio donde reside el solicitante. */
  municipio: string;

  /** Localidad específica del domicilio del solicitante. */
  localidad: string;

  /** Colonia asociada al domicilio del solicitante. */
  colonia: string;

  /** Calle del domicilio del solicitante. */
  calle: string;

  /** Código LADA asociado al teléfono del solicitante. */
  lada: number;

  /** Número telefónico del solicitante. */
  telefono: number;

  /** Número clave SCIAN. */
  claveSCIAN: number;

  /** Número Clave descripcion del SCIAN. */
  claveSCIANDesc: number;

  /** Indicador sobre si existe aviso de funcionamiento. */
  avisoDeFuncionamiento: boolean;

  /** Información relacionada con la licencia sanitaria del solicitante. */
  licenciaSanitaria: string;

  /** Estado del producto: fresco, congelado o vivo. */
  liveFreshFrozen: boolean;

  /** Régimen fiscal asociado al solicitante. */
  regimen: number;

  /** Aduana asociada al trámite. */
  aduana: number;

  /** Acción relacionada con la solicitud ("hacerlos"). */
  hacerlos: string | number;

  /** Registro Federal de Contribuyentes (RFC) del solicitante. */
  rfc: string;

  /** Razón social del representante legal. */
  legalRazonSocial: string;

  /** Apellido paterno del solicitante. */
  apellidoPaterno: string;

  /** Apellido materno del solicitante. */
  apellidoMeterno: string;

  /** Lista de mercancías asociadas con la solicitud. */
  mercanciasDatos: Mercancia[];

  /** Lista de SCIAN asociadas con la solicitud. */
  SCIANDatos: SCIAN[];

  /** Indicador sobre si se ha presentado un manifiesto. */
  manifesto: boolean;

  /** Clasificación del producto asociado con la solicitud. */
  clasificaionProductos: string;

  /** Especificación del producto representada por un identificador numérico. */
  especificarProducto: number;

  /** Nombre específico del producto asociado con la solicitud. */
  nombreProductoEspecifico: string;

  /** Distintiva del producto. */
  distintiva: string;

  /** Cientifico del producto. */
  cientifico: string;

  /** Tipo de producto representado por un identificador numérico. */
  tipoProducto: number;

  /** Forma farmacéutica */
  farmaceutica: number;

  /** Estado físico */
  fisico: number;

  /** Fracción arancelaria del producto. */
  fraccionArancelaria: string;

  /** Descripción detallada de la fracción arancelaria. */
  descripcionFraccionArancelaria: string;

  /** Cantidad del producto medida en Unidad de Medida de Tarifa (UMT). */
  cantidadUMT: string;

  /** Unidad de Medida de Tarifa (UMT). */
  umt: string;

  /** Cantidad del producto medida en Unidad de Medida de Comercialización (UMC). */
  cantidadUMC: string;

  /** Unidad de Medida de Comercialización (UMC). */
  umc: number;

  /** Presentación Farmacéutica o tipo de envase */
  presentacionFarmaceutica: string;

  /** Registro sanitario asociado a la mercancía. */
  registroSanitario: number;

  /** Fecha de caducidad de los lotes del producto. */
  fechaCaducidad: string;

  /** Tipo de persona: física o moral, representado por una cadena o número. */
  tipoPersona: string | number;

  /** Indicador para modificar el RFC del solicitante. */
  modificarRFC: string;

  /** Denominación social del solicitante. */
  denominacion: string;

  /** Identificador del país asociado al domicilio del solicitante. */
  domicilioPais: number;

  /** Identificador del estado asociado al domicilio del solicitante. */
  domicilioEstado: number;

  /** Identificador del municipio asociado al domicilio del solicitante. */
  domicilioMunicipio: number;

  /** Identificador de la localidad asociada al domicilio del solicitante. */
  domicilioLocalidad: number;

  /** Código postal asociado al domicilio del solicitante. */
  domicilioCodigo: number;

  /** Identificador de la colonia asociada al domicilio del solicitante. */
  domicilioColonia: number;

  /** Calle asociada al domicilio del solicitante. */
  domiciliCalle: string;

  /** Número exterior del domicilio del solicitante. */
  domiciliNumeroExterior: string;

  /** Número interior del domicilio del solicitante. */
  domiciliNumeroInterior: string;

  /** Código LADA asociado al teléfono del domicilio. */
  domiciliLada: string;

  /** Número telefónico del domicilio. */
  domiciliTelefono: string;

  /** Correo electrónico asociado al domicilio del solicitante. */
  domiciliCorreoElectronioco: string;

  /** Lista de destinatarios relacionados con la solicitud. */
  destinatarioDatos: Destinatario[];

  /** Lista de fabricante relacionados con la solicitud. */
  fabricanteDatos: Fabricante[];

  /** Lista de proveedor relacionados con la solicitud. */
  proveedorDatos: Proveedor[];

  /** Lista de facturador relacionados con la solicitud. */
  facturadorDatos: Facturador[];

  /** Clave de referencia asociada al trámite. */
  claveDeReferencia: string;

  /** Cadena de dependencia asociada a la solicitud. */
  cadenaDeDependencia: string;

  /** Banco asociado al trámite, representado por un identificador numérico. */
  banco: number;

  /** Llave de pago asociada al trámite. */
  liaveDePago: string;

  /** Fecha en la que se realizó el pago relacionado con la solicitud. */
  fechaDePago: string;

  /** Importe del pago realizado para la solicitud. */
  importeDePago: string;

  /** Folio de desistimiento asociado a la solicitud. */
  folioDeDesistimiento: string;

  /** Folio original asociado a la solicitud. */
  folioOriginal: string;
}

/**
 * Función que crea el estado inicial para `Solicitud260910State`.
 * Establece valores predeterminados para todas las propiedades requeridas dentro de la solicitud.
 * @returns Un objeto con el estado inicial de la solicitud 260910.
 */
export function createInitialState(): Solicitud260910State {
  return {
    tipoOperacion: '',
    observaciones: '',
    rfcSanitario: '',
    razonSocial: '',
    correoElectronico: '',
    codigoPostal: '',
    estado: 0,
    municipio: '',
    localidad: '',
    colonia: '',
    calle: '',
    lada: 0,
    telefono: 0,
    claveSCIAN: 0,
    claveSCIANDesc: 0,
    avisoDeFuncionamiento: false,
    licenciaSanitaria: '',
    liveFreshFrozen: false,
    regimen: 0,
    aduana: 0,
    hacerlos: '',
    rfc: '',
    legalRazonSocial: '',
    apellidoPaterno: '',
    apellidoMeterno: '',
    mercanciasDatos: [],
    SCIANDatos: [],
    manifesto: false,
    clasificaionProductos: '',
    especificarProducto: 0,
    nombreProductoEspecifico: '',
    distintiva: '',
    cientifico: '',
    tipoProducto: 0,
    farmaceutica: 0,
    fisico: 0,
    fraccionArancelaria: '',
    descripcionFraccionArancelaria: '',
    cantidadUMT: '',
    umt: '',
    cantidadUMC: '',
    umc: 0,
    presentacionFarmaceutica: '',
    registroSanitario: 0,
    fechaCaducidad: '',
    tipoPersona: '',
    modificarRFC: '',
    denominacion: '',
    domicilioPais: 0,
    domicilioEstado: 0,
    domicilioMunicipio: 0,
    domicilioLocalidad: 0,
    domicilioCodigo: 0,
    domicilioColonia: 0,
    domiciliCalle: '',
    domiciliNumeroExterior: '',
    domiciliNumeroInterior: '',
    domiciliLada: '',
    domiciliTelefono: '',
    domiciliCorreoElectronioco: '',
    destinatarioDatos: [],
    fabricanteDatos: [],
    proveedorDatos: [],
    facturadorDatos: [],
    claveDeReferencia: '',
    cadenaDeDependencia: '',
    banco: 0,
    liaveDePago: '',
    fechaDePago: '',
    importeDePago: '',
    folioDeDesistimiento: '',
    folioOriginal: ''
  };
}

/**
 * Servicio `Solicitud260910Store`.
 * Este servicio gestiona el estado de la solicitud 260910 usando Akita.
 * Permite actualizar valores individuales, agregar o eliminar elementos y limpiar la sección.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Solicitud260910Store', resettable: true })
export class Solicitud260910Store extends Store<Solicitud260910State> {
  /**
   * Constructor del servicio `Solicitud260910Store`.
   * Inicializa el estado con los valores predeterminados mediante la función `createInitialState`.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza la tipo Operación en el estado.
   * @param tipoOperacion - Nuevo valor para la tipo Operación.
   */
  public setTipoOperacion(tipoOperacion: string | number): void {
    this.update((state) => ({
      ...state,
      tipoOperacion
    }));
  }

  /**
   * Actualiza la observaciones en el estado.
   * @param observaciones - Nuevo valor para la observaciones.
   */
  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones
    }));
  }

  /**
   * Actualiza la RFC del responsable sanitario en el estado.
   * @param rfcSanitario - Nuevo valor para la RFC del responsable sanitario.
   */
  public setRfcSanitario(rfcSanitario: string): void {
    this.update((state) => ({
      ...state,
      rfcSanitario
    }));
  }

  /**
   * Actualiza la razón social en el estado.
   * @param razonSocial - Nuevo valor para la razón social.
   */
  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial
    }));
  }

  /**
   * Actualiza el correo electrónico en el estado.
   * @param correoElectronico - Nuevo valor para el correo electrónico.
   */
  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico
    }));
  }

  /**
   * Actualiza el código postal en el estado.
   * @param codigoPostal - Nuevo valor para el código postal.
   */
  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal
    }));
  }

  /**
   * Actualiza el estado asociado al domicilio.
   * @param estado - Nuevo identificador para el estado.
   */
  public setEstado(estado: number): void {
    this.update((state) => ({
      ...state,
      estado
    }));
  }

  /**
   * Actualiza el municipio asociado al domicilio.
   * @param municipio - Nuevo valor para el municipio.
   */
  public setMunicipio(municipio: string): void {
    this.update((state) => ({
      ...state,
      municipio
    }));
  }

  /**
   * Actualiza la localidad asociada al domicilio.
   * @param localidad - Nuevo valor para la localidad.
   */
  public setLocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      localidad
    }));
  }

  /**
   * Actualiza la colonia asociada al domicilio.
   * @param colonia - Nuevo valor para la colonia.
   */
  public setColonia(colonia: string): void {
    this.update((state) => ({
      ...state,
      colonia
    }));
  }

  /**
   * Actualiza la calle asociada al domicilio.
   * @param calle - Nuevo valor para la calle.
   */
  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle
    }));
  }

  /**
   * Actualiza el código LADA del número telefónico.
   * @param lada - Nuevo valor para el código LADA.
   */
  public setLada(lada: number): void {
    this.update((state) => ({
      ...state,
      lada
    }));
  }

  /**
   * Actualiza el número telefónico.
   * @param telefono - Nuevo valor para el número telefónico.
   */
  public setTelefono(telefono: number): void {
    this.update((state) => ({
      ...state,
      telefono
    }));
  }

  /**
   * Actualiza el indicador de aviso de funcionamiento.
   * @param avisoDeFuncionamiento - Nuevo estado para el aviso de funcionamiento.
   */
  public setAvisoDeFuncionamiento(avisoDeFuncionamiento: boolean): void {
    this.update((state) => ({
      ...state,
      avisoDeFuncionamiento
    }));
  }

  /**
   * Actualiza la licencia sanitaria en el estado.
   * @param licenciaSanitaria - Nuevo valor para la licencia sanitaria.
   */
  public setLicenciaSanitaria(licenciaSanitaria: string): void {
    this.update((state) => ({
      ...state,
      licenciaSanitaria
    }));
  }

  /**
   * Actualiza el estado del producto (fresco, congelado o vivo).
   * @param liveFreshFrozen - Nuevo estado para el producto.
   */
  public setLiveFreshFrozen(liveFreshFrozen: boolean): void {
    this.update((state) => ({
      ...state,
      liveFreshFrozen
    }));
  }

  /**
   * Actualiza el régimen fiscal asociado al trámite.
   * @param regimen - Nuevo identificador para el régimen fiscal.
   */
  public setRegimen(regimen: number): void {
    this.update((state) => ({
      ...state,
      regimen
    }));
  }

  /**
   * Actualiza la aduana asociada al trámite.
   * @param aduana - Nuevo identificador para la aduana.
   */
  public setAduana(aduana: number): void {
    this.update((state) => ({
      ...state,
      aduana
    }));
  }

  /**
   * Actualiza la clave SCIAN asociada al trámite.
   * @param claveSCIAN - Nuevo identificador para la clave SCIAN.
   */
  public setClaveSCIAN(claveSCIAN: number): void {
    this.update((state) => ({
      ...state,
      claveSCIAN
    }));
  }

  /**
   * Actualiza la descripción de la clave SCIAN asociada al trámite.
   * @param claveSCIANDesc - Nuevo identificador para la descripción de la clave SCIAN.
   */
  public setClaveSCIANDesc(claveSCIANDesc: number): void {
    this.update((state) => ({
      ...state,
      claveSCIANDesc
    }));
  }

  /**
   * Actualiza el valor relacionado con la acción "hacerlos".
   * @param hacerlos - Nuevo valor para "hacerlos" (cadena o número).
   */
  public setHacerlos(hacerlos: string | number): void {
    this.update((state) => ({
      ...state,
      hacerlos
    }));
  }

  /**
   * Actualiza el RFC asociado al trámite.
   * @param rfc - Nuevo valor para el RFC.
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc
    }));
  }

  /**
   * Actualiza la razón social legal en el estado.
   * @param legalRazonSocial - Nuevo valor para la razón social legal.
   */
  public setLegalRazonSocial(legalRazonSocial: string): void {
    this.update((state) => ({
      ...state,
      legalRazonSocial
    }));
  }

  /**
   * Actualiza el apellido paterno en el estado.
   * @param apellidoPaterno - Nuevo valor para el apellido paterno.
   */
  public setApellidoPaterno(apellidoPaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoPaterno
    }));
  }

  /**
   * Actualiza el apellido materno en el estado.
   * @param apellidoMeterno - Nuevo valor para el apellido materno.
   */
  public setApellidoMeterno(apellidoMeterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoMeterno
    }));
  }

  /**
   * Actualiza los datos de mercancías en el estado.
   * @param mercanciasDatos - Nuevo arreglo con los datos de mercancías.
   */
  public setMercanciasDatos(mercanciasDatos: Mercancia[]): void {
    this.update((state) => ({
      ...state,
      mercanciasDatos
    }));
  }

  /**
   * Actualiza los datos de SCIAN en el estado.
   * @param SCIANDatos - Nuevo arreglo con los datos de SCIAN.
   */
  public setSCIANDatos(SCIANDatos: SCIAN[]): void {
    this.update((state) => ({
      ...state,
      SCIANDatos
    }));
  }

  /**
   * Agrega una nueva mercancía al estado.
   * @param newMercancia - Objeto de mercancía que será añadido.
   */
  public addMercanciasDatos(newMercancia: Mercancia): void {
    this.update((state) => ({
      ...state,
      mercanciasDatos: [...state.mercanciasDatos, newMercancia]
    }));
  }

  /**
   * Agrega una nueva SCIAN al estado.
   * @param newSCIAN - Objeto de SCIAN que será añadido.
   */
  public addSCIANDatos(newSCIAN: SCIAN): void {
    this.update((state) => ({
      ...state,
      SCIANDatos: [...state.SCIANDatos, newSCIAN]
    }));
  }

  /**
   * Elimina una mercancía específica del estado.
   * @param mercanciaToRemove - Objeto de mercancía que será eliminado.
   */
  public removeMercanciaDatos(mercanciaToRemove: Mercancia): void {
    this.update((state) => ({
      ...state,
      mercanciasDatos: state.mercanciasDatos.filter(
        (mercancia) => mercancia.nombreProductoEspecifico !== mercanciaToRemove.nombreProductoEspecifico
      )
    }));
  }

  /**
   * Elimina una SCIAN específica del estado.
   * @param eliminarSCIAN - Objeto de SCIAN que será eliminado.
   */
  public eliminarSCAINDatos(eliminarSCIAN: SCIAN): void {
    this.update((state) => ({
      ...state,
      SCIANDatos: state.SCIANDatos.filter(
        (SCIAN) => SCIAN !== eliminarSCIAN
      )
    }));
  }

  /**
   * Actualiza la clasificación de productos en el estado.
   * @param clasificaionProductos - Nuevo valor para la clasificación de productos.
   */
  public setClasificacionProductos(clasificaionProductos: string): void {
    this.update((state) => ({
      ...state,
      clasificaionProductos
    }));
  }

  /**
   * Actualiza el identificador del producto especificado en el estado.
   * @param especificarProducto - Nuevo identificador para el producto.
   */
  public setEspecificarProducto(especificarProducto: number): void {
    this.update((state) => ({
      ...state,
      especificarProducto
    }));
  }

  /**
   * Actualiza el nombre específico del producto en el estado.
   * @param nombreProductoEspecifico - Nuevo nombre para el producto específico.
   */
  public setNombreProductoEspecifico(nombreProductoEspecifico: string): void {
    this.update((state) => ({
      ...state,
      nombreProductoEspecifico
    }));
  }

  /**
   * Actualiza la distintiva del producto en el estado.
   * @param distintiva - Nueva distintiva del producto.
   */
  public setDistintiva(distintiva: string): void {
    this.update((state) => ({
      ...state,
      distintiva
    }));
  }

  /**
   * Actualiza la cientifico del producto en el estado.
   * @param cientifico - Nueva cientifico del producto.
   */
  public setCientifico(cientifico: string): void {
    this.update((state) => ({
      ...state,
      cientifico
    }));
  }

  /**
   * Actualiza el tipo de producto en el estado.
   * @param tipoProducto - Nuevo identificador para el tipo de producto.
   */
  public setTipoProducto(tipoProducto: number): void {
    this.update((state) => ({
      ...state,
      tipoProducto
    }));
  }

  /**
   * Actualiza la forma farmacéutica en el estado.
   * @param farmaceutica - Nuevo valor para la forma farmacéutica.
   */
  public setFarmaceutica(farmaceutica: number): void {
    this.update((state) => ({
      ...state,
      farmaceutica
    }));
  }

  /**
   * Actualiza el estado físico en el estado.
   * @param fisico - Nuevo valor para el estado físico.
   */
  public setFisico(fisico: number): void {
    this.update((state) => ({
      ...state,
      fisico
    }));
  }

  /**
   * Actualiza la fracción arancelaria del producto en el estado.
   * @param fraccionArancelaria - Nuevo valor para la fracción arancelaria.
   */
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria
    }));
  }

  /**
   * Actualiza la descripción de la fracción arancelaria en el estado.
   * @param descripcionFraccionArancelaria - Nueva descripción de la fracción arancelaria.
   */
  public setDescripcionFraccionArancelaria(descripcionFraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      descripcionFraccionArancelaria
    }));
  }

  /**
   * Actualiza la cantidad UMT (Unidad de Medida de Tarifa) en el estado.
   * @param cantidadUMT - Nuevo valor para la cantidad UMT.
   */
  public setCantidadUMT(cantidadUMT: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMT
    }));
  }

  /**
   * Actualiza la unidad UMT en el estado.
   * @param umt - Nuevo valor para la unidad UMT.
   */
  public setUmt(umt: string): void {
    this.update((state) => ({
      ...state,
      umt
    }));
  }

  /**
   * Actualiza la cantidad UMC (Unidad de Medida de Comercialización) en el estado.
   * @param cantidadUMC - Nuevo valor para la cantidad UMC.
   */
  public setCantidadUMC(cantidadUMC: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMC
    }));
  }

  /**
   * Actualiza la unidad UMC en el estado.
   * @param umc - Nuevo identificador para la unidad UMC.
   */
  public setUmc(umc: number): void {
    this.update((state) => ({
      ...state,
      umc
    }));
  }

  /**
   * Actualiza la presentación farmacéutica o tipo de envase en el estado.
   * @param presentacionFarmaceutica - Nuevo valor para la presentación farmacéutica.
   */
  public setPresentacionFarmaceutica(presentacionFarmaceutica: string): void {
    this.update((state) => ({
      ...state,
      presentacionFarmaceutica
    }));
  }

  /**
   * Actualiza el registro sanitario en el estado.
   * @param registroSanitario - Nuevo valor para el registro sanitario.
   */
  public setRegistroSanitario(registroSanitario: number): void {
    this.update((state) => ({
      ...state,
      registroSanitario
    }));
  }

  /**
   * Actualiza la fecha de caducidad en el estado.
   * @param fechaCaducidad - Nuevo valor para la fecha de caducidad.
   */
  public setFechaCaducidad(fechaCaducidad: string): void {
    this.update((state) => ({
      ...state,
      fechaCaducidad
    }));
  }

  /**
   * Actualiza el tipo de persona en el estado.
   * @param tipoPersona - Nuevo valor para el tipo de persona (cadena o número).
   */
  public setTipoPersona(tipoPersona: string | number): void {
    this.update((state) => ({
      ...state,
      tipoPersona
    }));
  }

  /**
   * Actualiza el RFC modificado en el estado.
   * @param modificarRFC - Nuevo valor para el RFC modificado.
   */
  public setModificarRFC(modificarRFC: string): void {
    this.update((state) => ({
      ...state,
      modificarRFC
    }));
  }

  /**
   * Actualiza la denominación del destinatario en el estado.
   * @param denominacion - Nuevo valor para la denominación.
   */
  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion
    }));
  }

  /**
   * Actualiza el país del domicilio en el estado.
   * @param domicilioPais - Nuevo identificador para el país.
   */
  public setDomicilioPais(domicilioPais: number): void {
    this.update((state) => ({
      ...state,
      domicilioPais
    }));
  }

  /**
   * Actualiza el estado asociado al domicilio en el estado.
   * @param domicilioEstado - Nuevo identificador para el estado.
   */
  public setDomicilioEstado(domicilioEstado: number): void {
    this.update((state) => ({
      ...state,
      domicilioEstado
    }));
  }

  /**
   * Actualiza el municipio asociado al domicilio en el estado.
   * @param domicilioMunicipio - Nuevo identificador para el municipio.
   */
  public setDomicilioMunicipio(domicilioMunicipio: number): void {
    this.update((state) => ({
      ...state,
      domicilioMunicipio
    }));
  }

  /**
   * Actualiza la localidad asociada al domicilio en el estado.
   * @param domicilioLocalidad - Nuevo identificador para la localidad.
   */
  public setDomicilioLocalidad(domicilioLocalidad: number): void {
    this.update((state) => ({
      ...state,
      domicilioLocalidad
    }));
  }

  /**
   * Actualiza el código postal asociado al domicilio en el estado.
   * @param domicilioCodigo - Nuevo identificador para el código postal.
   */
  public setDomicilioCodigo(domicilioCodigo: number): void {
    this.update((state) => ({
      ...state,
      domicilioCodigo
    }));
  }

  /**
   * Actualiza la colonia asociada al domicilio en el estado.
   * @param domicilioColonia - Nuevo identificador para la colonia.
   */
  public setDomicilioColonia(domicilioColonia: number): void {
    this.update((state) => ({
      ...state,
      domicilioColonia
    }));
  }

  /**
   * Actualiza la calle asociada al domicilio en el estado.
   * @param domiciliCalle - Nuevo valor para la calle.
   */
  public setDomicilioCalle(domiciliCalle: string): void {
    this.update((state) => ({
      ...state,
      domiciliCalle
    }));
  }

  /**
   * Actualiza el número exterior del domicilio en el estado.
   * @param domiciliNumeroExterior - Nuevo valor para el número exterior.
   */
  public setDomicilioNumeroExterior(domiciliNumeroExterior: string): void {
    this.update((state) => ({
      ...state,
      domiciliNumeroExterior
    }));
  }

  /**
   * Actualiza el número interior del domicilio en el estado.
   * @param domiciliNumeroInterior - Nuevo valor para el número interior.
   */
  public setDomicilioNumeroInterior(domiciliNumeroInterior: string): void {
    this.update((state) => ({
      ...state,
      domiciliNumeroInterior
    }));
  }

  /**
   * Actualiza el código LADA del domicilio en el estado.
   * @param domiciliLada - Nuevo valor para el código LADA.
   */
  public setDomicilioLada(domiciliLada: string): void {
    this.update((state) => ({
      ...state,
      domiciliLada
    }));
  }

  /**
   * Actualiza el número telefónico del domicilio en el estado.
   * @param domiciliTelefono - Nuevo valor para el número telefónico.
   */
  public setDomicilioTelefono(domiciliTelefono: string): void {
    this.update((state) => ({
      ...state,
      domiciliTelefono
    }));
  }

  /**
   * Actualiza el correo electrónico del domicilio en el estado.
   * @param domiciliCorreoElectronioco - Nuevo valor para el correo electrónico.
   */
  public setDomicilioCorreoElectronico(domiciliCorreoElectronioco: string): void {
    this.update((state) => ({
      ...state,
      domiciliCorreoElectronioco
    }));
  }

  /**
   * Actualiza los datos de destinatarios en el estado.
   * @param destinatarioDatos - Nuevo arreglo con los datos de destinatarios.
   */
  public setDestinatarioDatos(destinatarioDatos: Destinatario[]): void {
    this.update((state) => ({
      ...state,
      destinatarioDatos
    }));
  }

  /**
   * Elimina un destinatario específico del estado.
   * @param destinatarioToRemove - Objeto del destinatario a eliminar.
   */
  public removeDestinatarioDato(destinatarioToRemove: Destinatario): void {
    this.update((state) => ({
      ...state,
      destinatarioDatos: state.destinatarioDatos.filter(
        (destinatario) => destinatario.rfc !== destinatarioToRemove.rfc
      )
    }));
  }

  /**
   * Actualiza los datos de fabricante en el estado.
   * @param fabricanteDatos - Nuevo arreglo con los datos de fabricante.
   */
  public setFabricanteDatos(fabricanteDatos: Fabricante[]): void {
    this.update((state) => ({
      ...state,
      fabricanteDatos
    }));
  }

  /**
   * Actualiza los datos de proveedor en el estado.
   * @param proveedorDatos - Nuevo arreglo con los datos de proveedor.
   */
  public setProveedorDatos(proveedorDatos: Proveedor[]): void {
    this.update((state) => ({
      ...state,
      proveedorDatos
    }));
  }

  /**
   * Actualiza los datos de facturador en el estado.
   * @param facturadorDatos - Nuevo arreglo con los datos de facturador.
   */
  public setFacturadorDatos(facturadorDatos: Facturador[]): void {
    this.update((state) => ({
      ...state,
      facturadorDatos
    }));
  }

  /**
   * Elimina un fabricante específico del estado.
   * @param fabricanteToRemove - Objeto del fabricante a eliminar.
   */
  public removeFabricanteDato(fabricanteToRemove: Fabricante): void {
    this.update((state) => ({
      ...state,
      fabricanteDatos: state.fabricanteDatos.filter(
        (fabricante) => fabricante !== fabricanteToRemove
      )
    }));
  }

  /**
   * Elimina un proveedor específico del estado.
   * @param proveedorToRemove - Objeto del proveedor a eliminar.
   */
  public removeProveedorDato(proveedorToRemove: Proveedor): void {
    this.update((state) => ({
      ...state,
      proveedorDatos: state.proveedorDatos.filter(
        (proveedor) => proveedor !== proveedorToRemove
      )
    }));
  }

  /**
   * Elimina un facturador específico del estado.
   * @param facturadorToRemove - Objeto del facturador a eliminar.
   */
  public removeFacturadorDato(facturadorToRemove: Facturador): void {
    this.update((state) => ({
      ...state,
      facturadorDatos: state.facturadorDatos.filter(
        (facturador) => facturador !== facturadorToRemove
      )
    }));
  }

  /**
   * Agrega un nuevo destinatario al estado.
   * @param newDestinatario - Objeto que representa el nuevo destinatario.
   */
  public addDestinatarioDato(newDestinatario: Destinatario): void {
    this.update((state) => ({
      ...state,
      destinatarioDatos: [...state.destinatarioDatos, newDestinatario]
    }));
  }

  /**
   * Actualiza la clave de referencia en el estado.
   * @param claveDeReferencia - Nuevo valor para la clave de referencia.
   */
  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia
    }));
  }

  /**
   * Actualiza la cadena de dependencia en el estado.
   * @param cadenaDeDependencia - Nuevo valor para la cadena de dependencia.
   */
  public setCadenaDeDependencia(cadenaDeDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDeDependencia
    }));
  }

  /**
   * Actualiza el banco asociado al trámite en el estado.
   * @param banco - Nuevo identificador para el banco.
   */
  public setBanco(banco: number): void {
    this.update((state) => ({
      ...state,
      banco
    }));
  }

  /**
   * Actualiza la llave de pago en el estado.
   * @param liaveDePago - Nuevo valor para la llave de pago.
   */
  public setLiaveDePago(liaveDePago: string): void {
    this.update((state) => ({
      ...state,
      liaveDePago
    }));
  }

  /**
   * Actualiza la fecha del pago en el estado.
   * @param fechaDePago - Nuevo valor para la fecha del pago.
   */
  public setFechaDePago(fechaDePago: string): void {
    this.update((state) => ({
      ...state,
      fechaDePago
    }));
  }

  /**
   * Actualiza el importe del pago en el estado.
   * @param importeDePago - Nuevo valor para el importe del pago.
   */
  public setImporteDePago(importeDePago: string): void {
    this.update((state) => ({
      ...state,
      importeDePago
    }));
  }

  /**
   * Actualiza el estado del manifiesto en el estado.
   * @param manifesto - Nuevo valor para el estado del manifiesto.
   */
  public setManifesto(manifesto: boolean): void {
    this.update((state) => ({
      ...state,
      manifesto
    }));
  }

  /**
   * Actualiza el folio de desistimiento en el estado.
   * @param folioDeDesistimiento - Nuevo valor para el folio de desistimiento.
   */
  public setFolioDeDesistimiento(folioDeDesistimiento: string): void {
    this.update((state) => ({
      ...state,
      folioDeDesistimiento
    }));
  }

  /**
   * Actualiza el folio original en el estado.
   * @param folioOriginal - Nuevo valor para el folio original.
   */
  public setFolioOriginal(folioOriginal: string): void {
    this.update((state) => ({
      ...state,
      folioOriginal
    }));
  }

  /**
   * Limpia todos los valores en el estado mediante la configuración `reset`.
   */
  public limpiarSeccion(): void {
    this.reset();
  }
}
