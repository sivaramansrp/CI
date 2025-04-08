import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


export interface Solicitud260702State {
    clavedereferencia: string,
    cadenadeladependencia: string,
    banco: string,
    llavedepago: string,
    fechadepago: string,
    importedepago: string,
    tipoPersona: string;
    nombre: string,
    primerApellido: string,
    segundoApellido: string,
    denominacion: string,
    pais: string,
    domicilio: string,
    estado: string,
    codigopostal: string,
    calle: string,
    numeroExterior: string,
    numeroInterior: string,
    lada: number,
    telefono: string,
    correoElectronico: string,
}
export function createInitialSolicitudState(): Solicitud260702State {
    return {
   
   clavedereferencia:'',
   cadenadeladependencia: '',
   banco: '',
   llavedepago: '',
   fechadepago: '',
   importedepago: '',
   tipoPersona: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    denominacion:'',
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

    }
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
          clavedereferencia
        }));
      }
      public setCadenaDelaDependencia(cadenadeladependencia: string) {
        this.update((state) => ({
          ...state,
          cadenadeladependencia
        }));
      }
      public setBanco(banco: string) {
        this.update((state) => ({
          ...state,
          banco
        }));
      }
      public setLlavedoPago(llavedepago: string) {
        this.update((state) => ({
          ...state,
          llavedepago
        }));
      }
      public setFechadePago(fechadepago: string) {
        this.update((state) => ({
          ...state,
          fechadepago
        }));
      }
      public setImportedePago(importedepago: string) {
        this.update((state) => ({
          ...state,
          importedepago
        }));
      }
      public setTipoPersona(tipoPersona: string) {
        this.update((state) => ({
          ...state,
          tipoPersona
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
      public setEstado(estado: string) {
        this.update((state) => ({
          ...state,
          estado
        }));
      }
      public setCodigoPostal(codigopostal: string) {
        this.update((state) => ({
          ...state,
          codigopostal
        }));
      }
      public setCalle(calle: string) {
        this.update((state) => ({
          ...state,
          calle
        }));
      }
      public setNumeroExterior(numeroExterior: string) {
        this.update((state) => ({
          ...state,
          numeroExterior
        }));
      }
      public setNumeroInterior(numeroInterior: string) {
        this.update((state) => ({
          ...state,
          numeroInterior
        }));
      }
      public setLada(lada: number) {
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




    



   
   
    

}