import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interface que representa el estado de la solicitud para el trámite 90201.
 * Este estado contiene la información relacionada con los datos de la solicitud.
 * @interface Terceros260211State
 */
export interface Terceros260211State {
  tercerosNacionalidad: string;
  tipoPersona: string;
  rfc: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  curp: string;
  denominacionRazonSocial: string;
  pais: string;
  estadoLocalidad: string;
  municipioAlcaldia: string;
  localidad: string;
  codigoPostaloEquivalente: string;
  colonia: string;
  extranjeroEstado: string;
  extranjeroCodigo: string;
  extranjeroColonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  lada: string;
  telefono: string;
  correoElectronico: string;
  coloniaoEquivalente: string;
  coloniaoEquivalenteLabel: string;
  codigoPostaloEquivalentes: string;
  estado: string;
  entidadFederativa: string;
    
    }
/**
 * Función para crear el estado inicial de la solicitud.
 * @returns {Terceros260211State} El estado inicial con valores vacíos para cada propiedad.
 */
export function createInitialState(): Terceros260211State {
  return {
     tercerosNacionalidad: '',
    tipoPersona: '',
    rfc: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    curp: '',
    denominacionRazonSocial: '',
    pais: '',
    estadoLocalidad: '',
    municipioAlcaldia: '',
    localidad: '',
    codigoPostaloEquivalente: '',
    colonia: '',
    extranjeroEstado: '',
    extranjeroCodigo: '',
    extranjeroColonia: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    lada: '',
    telefono: '',
    correoElectronico: '',
    coloniaoEquivalente: '',
    coloniaoEquivalenteLabel: '',
    codigoPostaloEquivalentes: '',
    estado: '',
    entidadFederativa: ''
    };
}

/**
 * Store para la gestión del estado de la solicitud del trámite 221601.
 * Utiliza Akita para la gestión de estado y permite actualizar los valores relacionados con el trámite.
 * @class Terceros260211Store
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Terceros260211Store', resettable: true })
export class Terceros260211Store extends Store<Terceros260211State> {
  /**
   * Constructor del store que inicializa el estado con el estado inicial creado.
   */
  constructor() {
    super(createInitialState());

  }
  public setEstado(estado: string): void {
  this.update(state => ({
    ...state,
    estado,
  }));
}

public setEntidadFederativa(entidadFederativa: string): void {
  this.update(state => ({
    ...state,
    entidadFederativa,
  }));
}

  public setTercerosNacionalidad(tercerosNacionalidad: string): void {
  this.update(state => ({
    ...state,
    tercerosNacionalidad,
  }));
}

public setTipoPersona(tipoPersona: string): void {
  this.update(state => ({
    ...state,
    tipoPersona,
  }));
}

public setRfc(rfc: string): void {
  this.update(state => ({
    ...state,
    rfc,
  }));
}

public setNombre(nombre: string): void {
  this.update(state => ({
    ...state,
    nombre,
  }));
}

public setPrimerApellido(primerApellido: string): void {
  this.update(state => ({
    ...state,
    primerApellido,
  }));
}

public setSegundoApellido(segundoApellido: string): void {
  this.update(state => ({
    ...state,
    segundoApellido,
  }));
}

public setCurp(curp: string): void {
  this.update(state => ({
    ...state,
    curp,
  }));
}

public setDenominacionRazonSocial(denominacionRazonSocial: string): void {
  this.update(state => ({
    ...state,
    denominacionRazonSocial,
  }));
}

public setPais(pais: string): void {
  this.update(state => ({
    ...state,
    pais,
  }));
}

public setEstadoLocalidad(estadoLocalidad: string): void {
  this.update(state => ({
    ...state,
    estadoLocalidad,
  }));
}

public setMunicipioAlcaldia(municipioAlcaldia: string): void {
  this.update(state => ({
    ...state,
    municipioAlcaldia,
  }));
}

public setLocalidad(localidad: string): void {
  this.update(state => ({
    ...state,
    localidad,
  }));
}

public setCodigoPostaloEquivalente(codigoPostaloEquivalente: string): void {
  this.update(state => ({
    ...state,
    codigoPostaloEquivalente,
  }));
}

public setColonia(colonia: string): void {
  this.update(state => ({
    ...state,
    colonia,
  }));
}

public setExtranjeroEstado(extranjeroEstado: string): void {
  this.update(state => ({
    ...state,
    extranjeroEstado,
  }));
}

public setExtranjeroCodigo(extranjeroCodigo: string): void {
  this.update(state => ({
    ...state,
    extranjeroCodigo,
  }));
}

public setExtranjeroColonia(extranjeroColonia: string): void {
  this.update(state => ({
    ...state,
    extranjeroColonia,
  }));
}

public setCalle(calle: string): void {
  this.update(state => ({
    ...state,
    calle,
  }));
}

public setNumeroExterior(numeroExterior: string): void {
  this.update(state => ({
    ...state,
    numeroExterior,
  }));
}

public setNumeroInterior(numeroInterior: string): void {
  this.update(state => ({
    ...state,
    numeroInterior,
  }));
}

public setLada(lada: string): void {
  this.update(state => ({
    ...state,
    lada,
  }));
}

public setTelefono(telefono: string): void {
  this.update(state => ({
    ...state,
    telefono,
  }));
}

public setCorreoElectronico(correoElectronico: string): void {
  this.update(state => ({
    ...state,
    correoElectronico,
  }));
}

public setColoniaoEquivalente(coloniaoEquivalente: string): void {
  this.update(state => ({
    ...state,
    coloniaoEquivalente,
  }));
}

public setColoniaoEquivalenteLabel(coloniaoEquivalenteLabel: string): void {
  this.update(state => ({
    ...state,
    coloniaoEquivalenteLabel,
  }));
}

public setCodigoPostaloEquivalentes(codigoPostaloEquivalentes: string): void {
  this.update(state => ({
    ...state,
    codigoPostaloEquivalentes,
  }));
}

}