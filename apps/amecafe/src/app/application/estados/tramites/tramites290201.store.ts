import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 290201
 * @returns Solicitud290201
 */
export interface Solicitud290201State {
  [x: string]: any;
  formasdelcafe: string;
  tipos: string;
  calidad: string;
  procesos: string;
  certifications: string;
  adunadesalida: string;
  paisdestino: string;
  entidaddeprocedencia: string;
  ciclocafetalero: string;
  envasadoen: string;
  utilizoCafeComo: string;
  cantidadutilizada: string;
  numerodepedimento: string;
  paisdeimportacion: [];
  fraccionarancelaria: [];
  cantidad: string;
  unidaddemedida: string;
  precioapplicable: string;
  dolar: string;
  lote: string;
  otrasmarcas: string;
  elcafe: string;
  fechaexportacion: string;
  paisdetransbordo: string;
  mediodetransporte: string;
  Identificadordel: string;
  observaciones: string;
  tipoPersona: string;
  denominacion: string;
  domicilio: string;
  pais: string;
  codigopostal: string;
  telefono: string;
  correoelectronico: string;
}
export function createInitialSolicitudState(): Solicitud290201State {
    return {
      formasdelcafe: '',
  tipos: '',
  calidad: '',
  procesos: '',
  certifications: '',
  adunadesalida: '',
  paisdestino:'',
  entidaddeprocedencia: '',
  ciclocafetalero: '',
  envasadoen: '',
  utilizoCafeComo: '',
  cantidadutilizada: '',
  numerodepedimento: '',
  paisdeimportacion: [],
  fraccionarancelaria: [],
  cantidad: '',
  unidaddemedida: '',
  precioapplicable: '',
  dolar: '',
  lote: '',
  otrasmarcas: '',
  elcafe: '',
  fechaexportacion: '',
  paisdetransbordo: '',
  mediodetransporte: '',
  Identificadordel: '',
  observaciones:'',
  tipoPersona: '',
  denominacion: '',
  domicilio: '',
  pais: '',
  codigopostal: '',
  telefono: '',
  correoelectronico: '',

    }
}
@Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'solicitud290201', resettable: true })
  export class Solicitud290201Store extends Store<Solicitud290201State> {
    constructor() {
      super(createInitialSolicitudState());
    }
  
    public setFormasDelCafe(formasdelcafe: string): void {
      this.update((state) => ({
        ...state,
        formasdelcafe
      }));
    }
    public setTipos(tipos: string): void {
      this.update((state) => ({
        ...state,
        tipos
      }));
    }
    public setCalidad(calidad: string): void {
      this.update((state) => ({
        ...state,
        calidad
      }));
    }
    public setProcesos(procesos: string): void {
      this.update((state) => ({
        ...state,
        procesos
      }));
    }
    public setCertifications(certifications: string): void {
      this.update((state) => ({
        ...state,
        certifications
      }));
    }
    public setAdunadesalida(adunadesalida: string): void {
      this.update((state) => ({
        ...state,
        adunadesalida
      }));
    }
    public setPaisdestino(paisdestino: string): void {
      this.update((state) => ({
        ...state,
        paisdestino
      }));
    }
    public setEntidaddeprocedencia(entidaddeprocedencia: string): void {
      this.update((state) => ({
        ...state,
        entidaddeprocedencia
      }));
    }
    public setCiclocafetalero(ciclocafetalero: string): void {
      this.update((state) => ({
        ...state,
        ciclocafetalero
      }));
    }
    public setEnvasadoen(envasadoen: string): void {
      this.update((state) => ({
        ...state,
        envasadoen
      }));
    }
    public setUtilizoCafeComo(utilizoCafeComo: string): void {
      this.update((state) => ({
        ...state,
        utilizoCafeComo
      }));
    }
    public setCantidadutilizada(cantidadutilizada: string): void {
      this.update((state) => ({
        ...state,
        cantidadutilizada
      }));
    }
    public setNumerodepedimento(numerodepedimento: string): void {
      this.update((state) => ({
        ...state,
        numerodepedimento
      }));
    }
    public setPaisdeimportacion(paisdeimportacion: []): void {
      this.update((state) => ({
        ...state,
        paisdeimportacion
      }));
    }
    public setFraccionarancelaria(fraccionarancelaria: []): void {
      this.update((state) => ({
        ...state,
        fraccionarancelaria
      }));
    }
    public setCantidad(cantidad: string): void {
      this.update((state) => ({
        ...state,
        cantidad
      }));
    }
    public setUnidaddemedida(unidaddemedida: string): void {
      this.update((state) => ({
        ...state,
        unidaddemedida
      }));
    }
    public setPrecioapplicable(precioapplicable: string): void {
      this.update((state) => ({
        ...state,
        precioapplicable
      }));
    }
    public setDolar(dolar: string): void {
      this.update((state) => ({
        ...state,
        dolar
      }));
    }
    public setLote(lote: string): void {
      this.update((state) => ({
        ...state,
        lote
      }));
    }
    public setOtrasmarcas(otrasmarcas: string): void {
      this.update((state) => ({
        ...state,
        otrasmarcas
      }));
    }
    public setElcafe(elcafe: string): void {
      this.update((state) => ({
        ...state,
        elcafe
      }));
    }
    public setFechaexportacion(fechaexportacion: string): void {
      this.update((state) => ({
        ...state,
        fechaexportacion
      }));
    }
    public setPaisdetransbordo(paisdetransbordo: string): void {
      this.update((state) => ({
        ...state,
        paisdetransbordo
      }));
    }
    public setMediodetransporte(mediodetransporte: string): void {
      this.update((state) => ({
        ...state,
        mediodetransporte
      }));
    }
    public setIdentificadordel(Identificadordel: string): void {
      this.update((state) => ({
        ...state,
        Identificadordel
      }));
    }
    public setObservaciones(observaciones: string): void {
      this.update((state) => ({
        ...state,
        observaciones
      }));
    }
    public setTipoPersona(tipoPersona: string): void {
      this.update((state) => ({
        ...state,
        tipoPersona
      }));
    }
    public setDenominacion(denominacion: string): void {
      this.update((state) => ({
        ...state,
        denominacion
      }));
    }
    public setDomicilio(domicilio: string): void {
      this.update((state) => ({
        ...state,
        domicilio
      }));
    }
    public setPais(pais: string): void {
      this.update((state) => ({
        ...state,
        pais
      }));
    }
    public setCodigopostal(codigopostal: string): void {
      this.update((state) => ({
        ...state,
        codigopostal
      }));
    }
    public setTelefono(telefono: string): void {
      this.update((state) => ({
        ...state,
        telefono
      }));
    }
    public setCorreoelectronico(correoelectronico: string): void {
      this.update((state) => ({
        ...state,
        correoelectronico
      }));
    }

}