import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 220402
 * @returns Solicitud220402
 */
export interface Solicitud220402State {
  tipoDeCertificado: string;
  seccionAduanera: string;
  puntoDestino: string;
  paisDeDestino: string;
  paisDeProcedencia: string;
  rangoDeFechas: string;
  fechaInicio: string;
  fechaFinal: string;
  fraccionArancelaria: string;
  descdelaFraccion: string;
  cantidadUMT: string;
  UMT: string;
  cantidadUMC: string;
  UMC: string;
  paisdeOrigen: string;
  entidadFederativadeOrigen: string;
  municipiodeOrigen: [];
  datosGeneralesArr1: [];
  marcasDistintivas: string;
  USO: string;
  numero: string;
  empaques: string;
  unidadDeVerificar: string;
  terceroEspecialista: string;
  entidadFederative: string;
  fitosanitario: string;
  mediodeTransporte: string;
  identificacionDelTransporte: string;
  tipoPersona: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  denominacion: string;
  pais: string;
  domicilio: string;
  lada: string;
  telefono: string;
  correoElectronico: string;
  exentoDePago: string;
  nombreImportExport: string;
  justificacion: string;
  claveDeReferencia: string;
  cadenaDependencia: string;
  banco: string;
  llaveDePago: string;
  fechaPago: string;
  importePago: string;
}

export function createInitialSolicitudState(): Solicitud220402State {
  return {
    tipoDeCertificado: '',
    seccionAduanera: '',
    puntoDestino: '',
    paisDeDestino: '',
    paisDeProcedencia: '',
    rangoDeFechas: '',
    fechaInicio: '',
    fechaFinal: '',
    fraccionArancelaria: '',
    descdelaFraccion: '',
    cantidadUMT: '',
    UMT: '',
    cantidadUMC: '',
    UMC: '',
    paisdeOrigen: '',
    entidadFederativadeOrigen: '',
    municipiodeOrigen: [],
    datosGeneralesArr1: [],
    marcasDistintivas: '',
    USO: '',
    numero: '',
    empaques: '',
    unidadDeVerificar: '',
    terceroEspecialista: '',
    entidadFederative: '',
    fitosanitario: '',
    mediodeTransporte: '',
    identificacionDelTransporte: '',
    tipoPersona: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    denominacion: '',
    pais: '',
    domicilio: '',
    lada: '',
    telefono: '',
    correoElectronico: '',
    exentoDePago: 'No',
    nombreImportExport: '',
    justificacion: '',
    claveDeReferencia: '',
    cadenaDependencia: '',
    banco: '',
    llaveDePago: '',
    fechaPago: '',
    importePago: ''
}
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud220402', resettable: true })
export class Solicitud220402Store extends Store<Solicitud220402State> {
  constructor() {
    super(createInitialSolicitudState());
  }

  public setTipoDeCertificado(tipoDeCertificado: string) {
    this.update((state) => ({
      ...state,
      tipoDeCertificado
    }));
  }

  public setPuntoDestino(puntoDestino: string) {
    this.update((state) => ({
      ...state,
      puntoDestino
    }));
  }

  public setSeccionAduanera(seccionAduanera: string) {
    this.update((state) => ({
      ...state,
      seccionAduanera
    }));
  }

  public setPaisDeDestino(paisDeDestino: string) {
    this.update((state) => ({
      ...state,
      paisDeDestino
    }));
  }

  public setPaisDeProcedencia(paisDeProcedencia: string) {
    this.update((state) => ({
      ...state,
      paisDeProcedencia
    }));
  }

  public setRangoDeFechas(rangoDeFechas: string) {
    this.update((state) => ({
      ...state,
      rangoDeFechas
    }));
  }

  public setFechaInicio(fechaInicio: string) {
    this.update((state) => ({
      ...state,
      fechaInicio
    }));
  }

  public setFechaFinal(fechaFinal: string) {
    this.update((state) => ({
      ...state,
      fechaFinal
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria
    }));
  }

  
  public setDescdelaFraccion(descdelaFraccion: string) {
    this.update((state) => ({
      ...state,
      descdelaFraccion
    }));
  }
  
  public setCantidadUMT(cantidadUMT: string) {
    this.update((state) => ({
      ...state,
      cantidadUMT
    }));
  }

  public setUMT(UMT: string) {
    this.update((state) => ({
      ...state,
      UMT
    }));
  }

  
  public setCantidadUMC(cantidadUMC: string) {
    this.update((state) => ({
      ...state,
      cantidadUMC
    }));
  }
  
  public setUMC(UMC: string) {
    this.update((state) => ({
      ...state,
      UMC
    }));
  }

  public setPaisdeOrigen(paisdeOrigen: string) {
    this.update((state) => ({
      ...state,
      paisdeOrigen
    }));
  }

  public setEntidadFederativadeOrigen(entidadFederativadeOrigen: string) {
    this.update((state) => ({
      ...state,
      entidadFederativadeOrigen
    }));
  }
  
  public setMunicipiodeOrigen(municipiodeOrigen: []) {
    this.update((state) => ({
      ...state,
      municipiodeOrigen
    }));
  }

  public setMarcasDistintivas(marcasDistintivas: string) {
    this.update((state) => ({
      ...state,
      marcasDistintivas
    }));
  }

  public setUSO(USO: string) {
    this.update((state) => ({
      ...state,
      USO
    }));
  }

  public setDatosMercancia(datosMercancia: string) {
    this.update((state) => ({
      ...state,
      datosMercancia
    }));
  }

  public setNumero(numero: string) {
    this.update((state) => ({
      ...state,
      numero
    }));
  }

  public setEmpaques(empaques: string) {
    this.update((state) => ({
      ...state,
      empaques
    }));
  }


  public setUnidadDeVerificar(unidadDeVerificar: string) {
    this.update((state) => ({
      ...state,
      unidadDeVerificar
    }));
  }

  public setTerceroEspecialista(terceroEspecialista: string) {
    this.update((state) => ({
      ...state,
      terceroEspecialista
    }));
  }

  public setEntidadFederative(entidadFederative: string) {
    this.update((state) => ({
      ...state,
      entidadFederative
    }));
  }

  public setFitosanitario(fitosanitario: string) {
    this.update((state) => ({
      ...state,
      fitosanitario
    }));
  }

  public setDatosGeneralesArr(datosGeneralesArr1: []) {
    this.update((state) => ({
      ...state,
      datosGeneralesArr1
    }));
  }

  public setMediodeTransporte(mediodeTransporte: string) {
    this.update((state) => ({
      ...state,
      mediodeTransporte
    }));
  }

  public setIdentificacionDelTransporte(identificacionDelTransporte: string) {
    this.update((state) => ({
      ...state,
      identificacionDelTransporte
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
      nombre
    }));
  }

  public setPrimerApellido(primerApellido: string) {
    this.update((state) => ({
      ...state,
      primerApellido
    }));
  }

  public setSegundoApellido(segundoApellido: string) {
    this.update((state) => ({
      ...state,
      segundoApellido
    }));
  }

  public setDenominacion(denominacion: string) {
    this.update((state) => ({
      ...state,
      denominacion
    }));
  }

  public setPais(pais: string) {
    this.update((state) => ({
      ...state,
      pais
    }));
  }

  public setDomicilio(domicilio: string) {
    this.update((state) => ({
      ...state,
      domicilio
    }));
  }

  public setLada(lada: string) {
    this.update((state) => ({
      ...state,
      lada
    }));
  }

  public setTelefono(telefono: string) {
    this.update((state) => ({
      ...state,
      telefono
    }));
  }

  public setCorreoElectronico(correoElectronico: string) {
    this.update((state) => ({
      ...state,
      correoElectronico
    }));
  }

  public setExentoDePago(exentoDePago: string) {
    this.update((state) => ({
      ...state,
      exentoDePago
    }));
  }

  public setCadenaDependencia(cadenaDependencia: string) {
    this.update((state) => ({
      ...state,
      cadenaDependencia
    }));
  }

  public setBanco(banco: string) {
    this.update((state) => ({
      ...state,
      banco
    }));
  }

  public setllaveDePago(llaveDePago: string) {
    this.update((state) => ({
      ...state,
      llaveDePago
    }));
  }

  public setFechaPago(fechaPago: string) {
    this.update((state) => ({
      ...state,
      fechaPago
    }));
  }

  public setJustificacion(justificacion: string) {
    this.update((state) => ({
      ...state,
      justificacion
    }));
  }

  public setClaveDeReferencia(claveDeReferencia: string) {
    this.update((state) => ({
      ...state,
      claveDeReferencia
    }));
  }

  public setImportePago(importePago: string) {
    this.update((state) => ({
      ...state,
      importePago
    }));
  }

}