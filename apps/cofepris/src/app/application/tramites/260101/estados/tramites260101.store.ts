import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Mercancia } from '../models/mercancia.model';
import { ClavesDeLotes } from '../models/claves-de-lotes.model';

export interface Solicitud260101State {
  razonSocial: string;
  correoElectronico: string;
  codigoPostal: string;
  estado: number;
  municipio: string;
  localidad: string;
  colonia: string;
  calle: string;
  lada: number;
  telefono: number;
  avisoDeFuncionamiento: string;
  licenciaSanitaria: string;
  liveFreshFrozen: string;
  regimen: number;
  aduana: number;
  hacerlos: string | number;
  rfc: string;
  legalRazonSocial: string;
  apellidoPaterno: string;
  apellidoMeterno: string;
  mercanciasDatos: Mercancia[];
  //
  clasificaionProductos: string;
  especificarProducto: number;
  nombreProductoEspecifico: string;
  marca: string;
  tipoProducto: number;
  fraccionArancelaria: string;
  descripcionFraccionArancelaria: string;
  cantidadUMT: string;
  umt: string;
  cantidadUMC: string;
  umc: number;
  claveDeLosLotes: string;
  fechaFabricacion: string;
  fechaCaducidad: string;
  clavesDeLotes: ClavesDeLotes[];
  //
  tipoPersona: string | number;
  modificarRFC: string;
  denominacion: string;
  domicilioPais: number;
  domicilioEstado: number;
  domicilioMunicipio: number;
  domicilioLocalidad: number;
  domicilioCodigo: number;
  domicilioColonia: number;
  domiciliCalle: string;
  domiciliNumeroExterior: string;
  domiciliNumeroInterior: string;
  domiciliLada: string;
  domiciliTelefono: string;
  domiciliCorreoElectronioco: string;
  //
  claveDeReferencia: string;
  cadenaDeDependencia: string;
  banco: number;
  liaveDePago: string;
  fechaDePago: string;
  importeDePago: string;
}

export function createInitialState(): Solicitud260101State {
  return {
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
    avisoDeFuncionamiento: '',
    licenciaSanitaria: '',
    liveFreshFrozen: '',
    regimen: 0,
    aduana: 0,
    hacerlos: '',
    rfc: '',
    legalRazonSocial: '',
    apellidoPaterno: '',
    apellidoMeterno: '',
    mercanciasDatos: [],
    //
    clasificaionProductos: '',
    especificarProducto: 0,
    nombreProductoEspecifico: '',
    marca: '',
    tipoProducto: 0,
    fraccionArancelaria: '',
    descripcionFraccionArancelaria: '',
    cantidadUMT: '',
    umt: '',
    cantidadUMC: '',
    umc: 0,
    claveDeLosLotes: '',
    fechaFabricacion: '',
    fechaCaducidad: '',
    clavesDeLotes: [],
    //
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
    //
    claveDeReferencia: '',
    cadenaDeDependencia: '',
    banco: 0,
    liaveDePago: '',
    fechaDePago: '',
    importeDePago: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Solicitud260101Store', resettable: true })
export class Solicitud260101Store extends Store<Solicitud260101State> {
  constructor() {
    super(createInitialState());
  }

  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }

  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  public setEstado(estado: number): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  public setMunicipio(municipio: string): void {
    this.update((state) => ({
      ...state,
      municipio,
    }));
  }

  public setLocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

  public setColonia(colonia: string): void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  public setLada(lada: number): void {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  public setTelefono(telefono: number): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  public setAvisoDeFuncionamiento(avisoDeFuncionamiento: string): void {
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

  public setLiveFreshFrozen(liveFreshFrozen: string): void {
    this.update((state) => ({
      ...state,
      liveFreshFrozen,
    }));
  }

  public setRegimen(regimen: number): void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  public setAduana(aduana: number): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  public setHacerlos(hacerlos: string | number): void {
    this.update((state) => ({
      ...state,
      hacerlos,
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

  public setApellidoMeterno(apellidoMeterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoMeterno,
    }));
  }

  public setMercanciasDatos(mercanciasDatos: Mercancia[]): void {
    this.update((state) => ({
      ...state,
      mercanciasDatos,
    }));
  }

  public addMercanciasDatos(newMercancia: Mercancia): void {
    this.update((state) => ({
      ...state,
      mercanciasDatos: [...state.mercanciasDatos, newMercancia],
    }));
  }

  // Repeat for the remaining variables following the same pattern

  public setClasificacionProductos(clasificaionProductos: string): void {
    this.update((state) => ({
      ...state,
      clasificaionProductos,
    }));
  }

  public setEspecificarProducto(especificarProducto: number): void {
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

  public setTipoProducto(tipoProducto: number): void {
    this.update((state) => ({
      ...state,
      tipoProducto,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  public setDescripcionFraccionArancelaria(
    descripcionFraccionArancelaria: string
  ): void {
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

  public setUmt(umt: string): void {
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

  public setUmc(umc: number): void {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }

  public setClaveDeLosLotes(claveDeLosLotes: string): void {
    this.update((state) => ({
      ...state,
      claveDeLosLotes,
    }));
  }

  public setFechaFabricacion(fechaFabricacion: string): void {
    this.update((state) => ({
      ...state,
      fechaFabricacion,
    }));
  }

  public setFechaCaducidad(fechaCaducidad: string): void {
    this.update((state) => ({
      ...state,
      fechaCaducidad,
    }));
  }

  public setClavesDeLotes(clavesDeLotes: ClavesDeLotes[]): void {
    this.update((state) => ({
      ...state,
      clavesDeLotes,
    }));
  }

  public addClaveDeLote(newClaveDeLote: ClavesDeLotes): void {
    this.update((state) => {
      const isExisting = state.clavesDeLotes.some(
        (lote) => lote.lotes === newClaveDeLote.lotes
      );

      return {
        ...state,
        clavesDeLotes: isExisting
          ? state.clavesDeLotes
          : [...state.clavesDeLotes, newClaveDeLote],
      };
    });
  }

  public removeClaveDeLote(claveToRemove: { lotes: string }): void {
    this.update((state) => ({
      ...state,
      clavesDeLotes: state.clavesDeLotes.filter(
        (clave) => clave.lotes !== claveToRemove.lotes
      ),
    }));
  }

  public setTipoPersona(tipoPersona: string | number): void {
    this.update((state) => ({
      ...state,
      tipoPersona,
    }));
  }

  public setModificarRFC(modificarRFC: string): void {
    this.update((state) => ({
      ...state,
      modificarRFC,
    }));
  }

  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion,
    }));
  }

  public setDomicilioPais(domicilioPais: number): void {
    this.update((state) => ({
      ...state,
      domicilioPais,
    }));
  }

  public setDomicilioEstado(domicilioEstado: number): void {
    this.update((state) => ({
      ...state,
      domicilioEstado,
    }));
  }

  public setDomicilioMunicipio(domicilioMunicipio: number): void {
    this.update((state) => ({
      ...state,
      domicilioMunicipio,
    }));
  }

  public setDomicilioLocalidad(domicilioLocalidad: number): void {
    this.update((state) => ({
      ...state,
      domicilioLocalidad,
    }));
  }

  public setDomicilioCodigo(domicilioCodigo: number): void {
    this.update((state) => ({
      ...state,
      domicilioCodigo,
    }));
  }

  public setDomicilioColonia(domicilioColonia: number): void {
    this.update((state) => ({
      ...state,
      domicilioColonia,
    }));
  }

  public setDomicilioCalle(domiciliCalle: string): void {
    this.update((state) => ({
      ...state,
      domiciliCalle,
    }));
  }

  public setDomicilioNumeroExterior(domiciliNumeroExterior: string): void {
    this.update((state) => ({
      ...state,
      domiciliNumeroExterior,
    }));
  }

  public setDomicilioNumeroInterior(domiciliNumeroInterior: string): void {
    this.update((state) => ({
      ...state,
      domiciliNumeroInterior,
    }));
  }

  public setDomicilioLada(domiciliLada: string): void {
    this.update((state) => ({
      ...state,
      domiciliLada,
    }));
  }

  public setDomicilioTelefono(domiciliTelefono: string): void {
    this.update((state) => ({
      ...state,
      domiciliTelefono,
    }));
  }

  public setDomicilioCorreoElectronico(
    domiciliCorreoElectronioco: string
  ): void {
    this.update((state) => ({
      ...state,
      domiciliCorreoElectronioco,
    }));
  }

  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia,
    }));
  }

  public setCadenaDeDependencia(cadenaDeDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDeDependencia,
    }));
  }

  public setBanco(banco: number): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  public setLiaveDePago(liaveDePago: string): void {
    this.update((state) => ({
      ...state,
      liaveDePago,
    }));
  }

  public setFechaDePago(fechaDePago: string): void {
    this.update((state) => ({
      ...state,
      fechaDePago,
    }));
  }

  public setImporteDePago(importeDePago: string): void {
    this.update((state) => ({
      ...state,
      importeDePago,
    }));
  }

  public limpiarSeccion() {
    this.reset();
  }
}
