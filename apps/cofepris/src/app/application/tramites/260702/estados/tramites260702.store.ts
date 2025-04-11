import { FilaData, FilaData2, ListaClave } from '../models/fila-modal';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define el estado inicial de la solicitud 260702.
 * Contiene todas las propiedades necesarias para gestionar los datos del trámite.
 */
export interface Solicitud260702State {
  clavedereferencia: string;
  cadenadeladependencia: string;
  banco: string;
  llavedepago: string;
  fechadepago: string;
  importedepago: string;
  tipoPersona: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  pais: string;
  domicilio: string;
  numeroExterior: string;
  numeroInterior: string;
  correoElectronico: string;
  justification: string;
  denominacion: string;
  codigopostal: string;
  estado: string;
  municipoyalcaldia: string;
  localidad: string;
  colonia: string;
  calle: string;
  lada: number;
  telefono: string;
  avisoDeFuncionamiento: boolean;
  licenciaSanitaria: string;
  regimenalque: string;
  aduana: string;
  rfc: string;
  legalRazonSocial: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  mercanciasDatos: FilaData2[];
  configuracionColumnasoli: FilaData[];
  listaClave: ListaClave[];
  claveDeLosLotes: string;
  fechaDeFabricacion: string;
  fechaDeCaducidad: string;
  descripcionFraccionArancelaria: string;
  cantidadUMT: string;
  umt: string;
  cantidadUMC: string;
  umc: string;
  tipoProducto: string;
  clasificaionProductos: string;
  especificarProducto: string;
  nombreProductoEspecifico: string;
  marca: string;
  fraccionArancelaria: string;
}

/**
 * Función para crear el estado inicial de la solicitud 260702.
 * Retorna un objeto con valores predeterminados para todas las propiedades.
 */
export function createInitialSolicitudState(): Solicitud260702State {
  return {
    clavedereferencia: '',
    cadenadeladependencia: '',
    banco: '',
    llavedepago: '',
    fechadepago: '',
    importedepago: '',
    tipoPersona: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    denominacion: '',
    pais: '',
    domicilio: '',
    estado: '',
    codigopostal: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    lada: 0,
    telefono: '',
    correoElectronico: '',
    justification: '',
    municipoyalcaldia: '',
    localidad: '',
    colonia: '',
    avisoDeFuncionamiento: false,
    licenciaSanitaria: '',
    regimenalque: '',
    aduana: '',
    rfc: '',
    legalRazonSocial: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    mercanciasDatos: [],
    configuracionColumnasoli: [],
    listaClave: [],
    claveDeLosLotes: '',
    fechaDeFabricacion: '',
    fechaDeCaducidad: '',
    descripcionFraccionArancelaria: '',
    cantidadUMT: '',
    umt: '',
    cantidadUMC: '',
    umc: '',
    tipoProducto: '',
    clasificaionProductos: '',
    especificarProducto: '',
    nombreProductoEspecifico: '',
    marca: '',
    fraccionArancelaria: '',
  };
}

/**
 * Servicio que gestiona el estado de la solicitud 260702.
 * Utiliza Akita para manejar el estado de manera reactiva.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Solicitud260702State', resettable: true })
export class Solicitud260702Store extends Store<Solicitud260702State> {
  constructor() {
    super(createInitialSolicitudState());
  }

  /**
   * Método para actualizar la clave de referencia en el estado.
   * @param clavedereferencia Clave de referencia a establecer.
   */
  public setClaveDeReferencia(clavedereferencia: string) {
    this.update((state) => ({
      ...state,
      clavedereferencia,
    }));
  }

  /**
   * Método para actualizar la cadena de la dependencia en el estado.
   * @param cadenadeladependencia Cadena de la dependencia a establecer.
   */
  public setCadenaDelaDependencia(cadenadeladependencia: string) {
    this.update((state) => ({
      ...state,
      cadenadeladependencia,
    }));
  }

  /**
   * Método para actualizar el banco en el estado.
   * @param banco Banco a establecer.
   */
  public setBanco(banco: string) {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * Método para actualizar la llave de pago en el estado.
   * @param llavedepago Llave de pago a establecer.
   */
  public setLlavedoPago(llavedepago: string) {
    this.update((state) => ({
      ...state,
      llavedepago,
    }));
  }

  /**
   * Método para actualizar la fecha de pago en el estado.
   * @param fechadepago Fecha de pago a establecer.
   */
  public setFechadePago(fechadepago: string) {
    this.update((state) => ({
      ...state,
      fechadepago,
    }));
  }

  /**
   * Método para actualizar el importe de pago en el estado.
   * @param importedepago Importe de pago a establecer.
   */
  public setImportedePago(importedepago: string) {
    this.update((state) => ({
      ...state,
      importedepago,
    }));
  }

  /**
   * Método para actualizar el tipo de persona en el estado.
   * @param tipoPersona Tipo de persona a establecer.
   */
  public setTipoPersona(tipoPersona: string) {
    this.update((state) => ({
      ...state,
      tipoPersona,
    }));
  }

  /**
   * Método para actualizar el nombre en el estado.
   * @param nombre Nombre a establecer.
   */
  public setNombre(nombre: string) {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  /**
   * Método para actualizar el primer apellido en el estado.
   * @param primerApellido Primer apellido a establecer.
   */
  public setPrimerApellido(primerApellido: string) {
    this.update((state) => ({
      ...state,
      primerApellido,
    }));
  }

  /**
   * Método para actualizar el segundo apellido en el estado.
   * @param segundoApellido Segundo apellido a establecer.
   */
  public setSegundoApellido(segundoApellido: string) {
    this.update((state) => ({
      ...state,
      segundoApellido,
    }));
  }

  /**
   * Método para actualizar la denominación en el estado.
   * @param denominacion Denominación a establecer.
   */
  public setDenominacion(denominacion: string) {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }

  /**
   * Método para actualizar el correo electrónico en el estado.
   * @param correoElectronico Correo electrónico a establecer.
   */
  public setCorreoElectronico(correoElectronico: string) {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  /**
   * Método para actualizar el país en el estado.
   * @param pais País a establecer.
   */
  public setPais(pais: string) {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  /**
   * Método para actualizar el domicilio en el estado.
   * @param domicilio Domicilio a establecer.
   */
  public setDomicilio(domicilio: string) {
    this.update((state) => ({
      ...state,
      domicilio,
    }));
  }

  /**
   * Método para actualizar el estado en el estado.
   * @param estado Estado a establecer.
   */
  public setEstado(estado: string) {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Método para actualizar el código postal en el estado.
   * @param codigopostal Código postal a establecer.
   */
  public setCodigoPostal(codigopostal: string) {
    this.update((state) => ({
      ...state,
      codigopostal,
    }));
  }

  /**
   * Método para actualizar la calle en el estado.
   * @param calle Calle a establecer.
   */
  public setCalle(calle: string) {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
   * Método para actualizar el número exterior en el estado.
   * @param numeroExterior Número exterior a establecer.
   */
  public setNumeroExterior(numeroExterior: string) {
    this.update((state) => ({
      ...state,
      numeroExterior,
    }));
  }

  /**
   * Método para actualizar el número interior en el estado.
   * @param numeroInterior Número interior a establecer.
   */
  public setNumeroInterior(numeroInterior: string) {
    this.update((state) => ({
      ...state,
      numeroInterior,
    }));
  }

  /**
   * Método para actualizar la lada en el estado.
   * @param lada Lada a establecer.
   */
  public setLada(lada: number) {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  /**
   * Método para actualizar el teléfono en el estado.
   * @param telefono Teléfono a establecer.
   */
  public setTelefono(telefono: string) {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  /**
   * Método para actualizar la justificación en el estado.
   * @param justification Justificación a establecer.
   */
  public setJustification(justification: string) {
    this.update((state) => ({
      ...state,
      justification,
    }));
  }

  /**
   * Método para actualizar el municipio o alcaldía en el estado.
   * @param municipoyalcaldia Municipio o alcaldía a establecer.
   */
  public setMunicipoyalcaldia(municipoyalcaldia: string) {
    this.update((state) => ({
      ...state,
      municipoyalcaldia,
    }));
  }

  /**
   * Método para actualizar la localidad en el estado.
   * @param localidad Localidad a establecer.
   */
  public setLocalidad(localidad: string) {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

  /**
   * Método para actualizar la colonia en el estado.
   * @param colonia Colonia a establecer.
   */
  public setColonia(colonia: string) {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  /**
   * Método para actualizar el aviso de funcionamiento en el estado.
   * @param avisoDeFuncionamiento Aviso de funcionamiento a establecer.
   */
  public setAvisoDeFuncionamiento(avisoDeFuncionamiento: boolean) {
    this.update((state) => ({
      ...state,
      avisoDeFuncionamiento,
    }));
  }

  /**
   * Método para actualizar la licencia sanitaria en el estado.
   * @param licenciaSanitaria Licencia sanitaria a establecer.
   */
  public setLicenciaSanitaria(licenciaSanitaria: string): void {
    this.update((state) => ({
      ...state,
      licenciaSanitaria,
    }));
  }

  /**
   * Método para actualizar el régimen al que se destinarán las mercancías en el estado.
   * @param regimenalque Régimen a establecer.
   */
  public setRegimenalque(regimenalque: string): void {
    this.update((state) => ({
      ...state,
      regimenalque,
    }));
  }

  /**
   * Método para actualizar la aduana en el estado.
   * @param aduana Aduana a establecer.
   */
  public setAduana(aduana: string): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  /**
   * Método para actualizar el RFC en el estado.
   * @param rfc RFC a establecer.
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Método para actualizar la razón social legal en el estado.
   * @param legalRazonSocial Razón social legal a establecer.
   */
  public setLegalRazonSocial(legalRazonSocial: string): void {
    this.update((state) => ({
      ...state,
      legalRazonSocial,
    }));
  }

  /**
   * Método para actualizar el apellido paterno en el estado.
   * @param apellidoPaterno Apellido paterno a establecer.
   */
  public setApellidoPaterno(apellidoPaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoPaterno,
    }));
  }

  /**
   * Método para actualizar el apellido materno en el estado.
   * @param apellidoMaterno Apellido materno a establecer.
   */
  public setApellidoMaterno(apellidoMaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoMaterno,
    }));
  }

  /**
   * Método para actualizar los datos de mercancías en el estado.
   * @param mercanciasDatos Datos de mercancías a establecer.
   */
  public setMercanciasDatos(mercanciasDatos: FilaData2[]): void {
    this.update((state) => ({
      ...state,
      mercanciasDatos,
    }));
  }

  /**
   * Método para actualizar la configuración de columnas en el estado.
   * @param configuracionColumnasoli Configuración de columnas a establecer.
   */
  public setConfiguracionColumnasoli(configuracionColumnasoli: FilaData[]): void {
    this.update((state) => ({
      ...state,
      configuracionColumnasoli,
    }));
  }

  /**
   * Método para actualizar la lista de claves en el estado.
   * @param listaClave Lista de claves a establecer.
   */
  public setListaClave(listaClave: ListaClave[]): void {
    this.update((state) => ({
      ...state,
      listaClave,
    }));
  }

  /**
   * Método para actualizar la clave de los lotes en el estado.
   * @param claveDeLosLotes Clave de los lotes a establecer.
   */
  public setClaveDeLosLotes(claveDeLosLotes: string): void {
    this.update((state) => ({
      ...state,
      claveDeLosLotes,
    }));
  }

  /**
   * Método para actualizar la fecha de fabricación en el estado.
   * @param fechaDeFabricacion Fecha de fabricación a establecer.
   */
  public setFechaDeFabricacion(fechaDeFabricacion: string): void {
    this.update((state) => ({
      ...state,
      fechaDeFabricacion,
    }));
  }

  /**
   * Método para actualizar la fecha de caducidad en el estado.
   * @param fechaDeCaducidad Fecha de caducidad a establecer.
   */
  public setFechaDeCaducidad(fechaDeCaducidad: string): void {
    this.update((state) => ({
      ...state,
      fechaDeCaducidad,
    }));
  }

  /**
   * Método para actualizar la descripción de la fracción arancelaria en el estado.
   * @param descripcionFraccionArancelaria Descripción de la fracción arancelaria a establecer.
   */
  public setDescripcionFraccionArancelaria(descripcionFraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      descripcionFraccionArancelaria,
    }));
  }

  /**
   * Método para actualizar la cantidad UMT en el estado.
   * @param cantidadUMT Cantidad UMT a establecer.
   */
  public setCantidadUMT(cantidadUMT: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMT,
    }));
  }

  /**
   * Método para actualizar la unidad de medida de tarifa (UMT) en el estado.
   * @param umt Unidad de medida de tarifa a establecer.
   */
  public setUMT(umt: string): void {
    this.update((state) => ({
      ...state,
      umt,
    }));
  }

  /**
   * Método para actualizar la cantidad UMC en el estado.
   * @param cantidadUMC Cantidad UMC a establecer.
   */
  public setCantidadUMC(cantidadUMC: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMC,
    }));
  }

  /**
   * Método para actualizar la unidad de medida de comercialización (UMC) en el estado.
   * @param umc Unidad de medida de comercialización a establecer.
   */
  public setUMC(umc: string): void {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }

  /**
   * Método para actualizar el tipo de producto en el estado.
   * @param tipoProducto Tipo de producto a establecer.
   */
  public setTipoProducto(tipoProducto: string): void {
    this.update((state) => ({
      ...state,
      tipoProducto,
    }));
  }

  /**
   * Método para actualizar la clasificación de productos en el estado.
   * @param clasificaionProductos Clasificación de productos a establecer.
   */
  public setClasificaionProductos(clasificaionProductos: string): void {
    this.update((state) => ({
      ...state,
      clasificaionProductos,
    }));
  }

  /**
   * Método para actualizar el producto especificado en el estado.
   * @param especificarProducto Producto especificado a establecer.
   */
  public setEspecificarProducto(especificarProducto: string): void {
    this.update((state) => ({
      ...state,
      especificarProducto,
    }));
  }

  /**
   * Método para actualizar el nombre específico del producto en el estado.
   * @param nombreProductoEspecifico Nombre específico del producto a establecer.
   */
  public setNombreProductoEspecifico(nombreProductoEspecifico: string): void {
    this.update((state) => ({
      ...state,
      nombreProductoEspecifico,
    }));
  }

  /**
   * Método para actualizar la marca en el estado.
   * @param marca Marca a establecer.
   */
  public setMarca(marca: string): void {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }

  /**
   * Método para actualizar la fracción arancelaria en el estado.
   * @param fraccionArancelaria Fracción arancelaria a establecer.
   */
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }
}
