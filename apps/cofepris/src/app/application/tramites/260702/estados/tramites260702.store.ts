import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { FilaData, FilaData2, ListaClave } from '../models/fila-modal';

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
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Solicitud260702State', resettable: true })
export class Solicitud260702Store extends Store<Solicitud260702State> {
  constructor() {
    super(createInitialSolicitudState());
  }
  public setClaveDeReferencia(clavedereferencia: string) {
    this.update((state) => ({
      ...state,
      clavedereferencia,
    }));
  }
  public setCadenaDelaDependencia(cadenadeladependencia: string) {
    this.update((state) => ({
      ...state,
      cadenadeladependencia,
    }));
  }
  public setBanco(banco: string) {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }
  public setLlavedoPago(llavedepago: string) {
    this.update((state) => ({
      ...state,
      llavedepago,
    }));
  }
  public setFechadePago(fechadepago: string) {
    this.update((state) => ({
      ...state,
      fechadepago,
    }));
  }
  public setImportedePago(importedepago: string) {
    this.update((state) => ({
      ...state,
      importedepago,
    }));
  }
  public setTipoPersona(tipoPersona: string) {
    this.update((state) => ({
      ...state,
      tipoPersona,
    }));
  }
  public setNombre(nombre: string) {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }
  public setPrimerApellido(primerApellido: string) {
    this.update((state) => ({
      ...state,
      primerApellido,
    }));
  }
  public setSegundoApellido(segundoApellido: string) {
    this.update((state) => ({
      ...state,
      segundoApellido,
    }));
  }
  public setDenominacion(denominacion: string) {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }
  public setCorreoElectronico(correoElectronico: string) {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  public setPais(pais: string) {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }
  public setDomicilio(domicilio: string) {
    this.update((state) => ({
      ...state,
      domicilio,
    }));
  }
  public setEstado(estado: string) {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }
  public setCodigoPostal(codigopostal: string) {
    this.update((state) => ({
      ...state,
      codigopostal,
    }));
  }
  public setCalle(calle: string) {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }
  public setNumeroExterior(numeroExterior: string) {
    this.update((state) => ({
      ...state,
      numeroExterior,
    }));
  }
  public setNumeroInterior(numeroInterior: string) {
    this.update((state) => ({
      ...state,
      numeroInterior,
    }));
  }
  public setLada(lada: number) {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }
  public setTelefono(telefono: string) {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }
  public setJustification(justification: string) {
    this.update((state) => ({
      ...state,
      justification,
    }));
  }
  public setMunicipoyalcaldia(municipoyalcaldia: string) {
    this.update((state) => ({
      ...state,
      municipoyalcaldia,
    }));
  }
  public setLocalidad(localidad: string) {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }
  public setColonia(colonia: string) {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }
  public setAvisoDeFuncionamiento(avisoDeFuncionamiento: boolean) {
    this.update((state) => ({
      ...state,
      avisoDeFuncionamiento,
    }));
  }
  public setLicenciaSanitaria(licenciaSanitaria: string): void {
    this.update((state) => ({
      ...state,
      licenciaSanitaria,
    }));
  }
  public setRegimenalque(regimenalque: string): void {
    this.update((state) => ({
      ...state,
      regimenalque,
    }));
  }
  public setAduana(aduana: string): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }
 
  public setLegalRazonSocial(legalRazonSocial: string): void {
    this.update((state) => ({
      ...state,
      legalRazonSocial,
    }));
  }
  public setApellidoPaterno(apellidoPaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoPaterno,
    }));
  }
  public setApellidoMaterno(apellidoMaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoMaterno,
    }));
  }
  public setMercanciasDatos(mercanciasDatos: FilaData2[]): void {
    this.update((state) => ({
      ...state,
      mercanciasDatos,
    }));
  }
  public setConfiguracionColumnasoli(configuracionColumnasoli: FilaData[]
  ): void {
    this.update((state) => ({
      ...state,
      configuracionColumnasoli,
    }));
  }
  public setListaClave(listaClave: ListaClave[]): void {
    this.update((state) => ({
      ...state,
      listaClave,
    }));
  }

  public setClaveDeLosLotes(claveDeLosLotes: string): void {
    this.update((state) => ({
      ...state,
      claveDeLosLotes,
    }));
  }
  public setFechaDeFabricacion(fechaDeFabricacion: string): void {
    this.update((state) => ({
      ...state,
      fechaDeFabricacion,
    }));
  }
  public setFechaDeCaducidad(fechaDeCaducidad: string): void {
    this.update((state) => ({
      ...state,
      fechaDeCaducidad,
    }));
  }
  public setDescripcionFraccionArancelaria(descripcionFraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      descripcionFraccionArancelaria,
    }));
  }
  public setCantidadUMT(cantidadUMT: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMT,
    }));
  }
  public setUMT(umt: string): void {
    this.update((state) => ({
      ...state,
      umt,
    }));
  }
  public setCantidadUMC(cantidadUMC: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMC,
    }));
  }
  public setUMC(umc: string): void {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }
  public setTipoProducto(tipoProducto: string): void {
    this.update((state) => ({
      ...state,
      tipoProducto,
    }));
  }
  public setClasificaionProductos(clasificaionProductos: string): void {
    this.update((state) => ({
      ...state,
      clasificaionProductos,
    }));
  }
  public setEspecificarProducto(especificarProducto: string): void {
    this.update((state) => ({
      ...state,
      especificarProducto,
    }));
  }
  public setNombreProductoEspecifico(nombreProductoEspecifico: string): void {
    this.update((state) => ({
      ...state,
      nombreProductoEspecifico,
    }));
  }
  public setMarca(marca: string): void {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }






 
}
