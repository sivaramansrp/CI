import { Store, StoreConfig } from '@datorama/akita';
import { DatosGenerales } from '../../models/pantallas-captura.model';
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
  datosGeneralesArr: DatosGenerales[];
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
    datosGeneralesArr: [],
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

  public setTipoDeCertificado(tipoDeCertificado: string): void {
    this.update((state) => ({
      ...state,
      tipoDeCertificado
    }));
  }

  public setPuntoDestino(puntoDestino: string): void {
    this.update((state) => ({
      ...state,
      puntoDestino
    }));
  }

  public setSeccionAduanera(seccionAduanera: string): void {
    this.update((state) => ({
      ...state,
      seccionAduanera
    }));
  }

  public setPaisDeDestino(paisDeDestino: string): void {
    this.update((state) => ({
      ...state,
      paisDeDestino
    }));
  }

  public setPaisDeProcedencia(paisDeProcedencia: string): void {
    this.update((state) => ({
      ...state,
      paisDeProcedencia
    }));
  }

  public setRangoDeFechas(rangoDeFechas: string): void {
    this.update((state) => ({
      ...state,
      rangoDeFechas
    }));
  }

  public setFechaInicio(fechaInicio: string): void {
    this.update((state) => ({
      ...state,
      fechaInicio
    }));
  }

  public setFechaFinal(fechaFinal: string): void {
    this.update((state) => ({
      ...state,
      fechaFinal
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria
    }));
  }


  public setDescdelaFraccion(descdelaFraccion: string): void {
    this.update((state) => ({
      ...state,
      descdelaFraccion
    }));
  }

  public setCantidadUMT(cantidadUMT: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMT
    }));
  }

  public setUMT(UMT: string): void {
    this.update((state) => ({
      ...state,
      UMT
    }));
  }


  public setCantidadUMC(cantidadUMC: string): void {
    this.update((state) => ({
      ...state,
      cantidadUMC
    }));
  }

  public setUMC(UMC: string): void {
    this.update((state) => ({
      ...state,
      UMC
    }));
  }

  public setPaisdeOrigen(paisdeOrigen: string): void {
    this.update((state) => ({
      ...state,
      paisdeOrigen
    }));
  }

  public setEntidadFederativadeOrigen(entidadFederativadeOrigen: string): void {
    this.update((state) => ({
      ...state,
      entidadFederativadeOrigen
    }));
  }

  public setMunicipiodeOrigen(municipiodeOrigen: []): void {
    this.update((state) => ({
      ...state,
      municipiodeOrigen
    }));
  }

  public setMarcasDistintivas(marcasDistintivas: string): void {
    this.update((state) => ({
      ...state,
      marcasDistintivas
    }));
  }

  public setUSO(USO: string): void {
    this.update((state) => ({
      ...state,
      USO
    }));
  }

  public setDatosMercancia(datosMercancia: string): void {
    this.update((state) => ({
      ...state,
      datosMercancia
    }));
  }

  public setNumero(numero: string): void {
    this.update((state) => ({
      ...state,
      numero
    }));
  }

  public setEmpaques(empaques: string): void {
    this.update((state) => ({
      ...state,
      empaques
    }));
  }


  public setUnidadDeVerificar(unidadDeVerificar: string): void {
    this.update((state) => ({
      ...state,
      unidadDeVerificar
    }));
  }

  public setTerceroEspecialista(terceroEspecialista: string): void {
    this.update((state) => ({
      ...state,
      terceroEspecialista
    }));
  }

  public setEntidadFederative(entidadFederative: string): void {
    this.update((state) => ({
      ...state,
      entidadFederative
    }));
  }

  public setFitosanitario(fitosanitario: string): void {
    this.update((state) => ({
      ...state,
      fitosanitario
    }));
  }

  public setDatosGeneralesArr(datosGeneralesArr: DatosGenerales[]): void {
    this.update((state) => ({
      ...state,
      datosGeneralesArr
    }));
  }

  public setMediodeTransporte(mediodeTransporte: string): void {
    this.update((state) => ({
      ...state,
      mediodeTransporte
    }));
  }

  public setIdentificacionDelTransporte(identificacionDelTransporte: string): void {
    this.update((state) => ({
      ...state,
      identificacionDelTransporte
    }));
  }

  public setTipoPersona(tipoPersona: string): void {
    this.update((state) => ({
      ...state,
      tipoPersona,
    }));
  }

  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre
    }));
  }

  public setPrimerApellido(primerApellido: string): void {
    this.update((state) => ({
      ...state,
      primerApellido
    }));
  }

  public setSegundoApellido(segundoApellido: string): void {
    this.update((state) => ({
      ...state,
      segundoApellido
    }));
  }

  public setDenominacion(denominacion: string): void {
    this.update((state) => ({
      ...state,
      denominacion
    }));
  }

  public setPais(pais: string): void {
    this.update((state) => ({
      ...state,
      pais
    }));
  }

  public setDomicilio(domicilio: string): void {
    this.update((state) => ({
      ...state,
      domicilio
    }));
  }

  public setLada(lada: string): void {
    this.update((state) => ({
      ...state,
      lada
    }));
  }

  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono
    }));
  }

  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico
    }));
  }

  public setExentoDePago(exentoDePago: string): void {
    this.update((state) => ({
      ...state,
      exentoDePago
    }));
  }

  public setCadenaDependencia(cadenaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDependencia
    }));
  }

  public setBanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco
    }));
  }

  public setllaveDePago(llaveDePago: string): void {
    this.update((state) => ({
      ...state,
      llaveDePago
    }));
  }

  public setFechaPago(fechaPago: string): void {
    this.update((state) => ({
      ...state,
      fechaPago
    }));
  }

  public setJustificacion(justificacion: string): void {
    this.update((state) => ({
      ...state,
      justificacion
    }));
  }

  public setClaveDeReferencia(claveDeReferencia: string): void {
    this.update((state) => ({
      ...state,
      claveDeReferencia
    }));
  }

  public setImportePago(importePago: string): void {
    this.update((state) => ({
      ...state,
      importePago
    }));
  }

}