import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaDatos } from '../models/flora-fauna.models';

import { catalogoResponse } from '@libs/shared/data-access-user/src';

export interface Tramite250101State {
  tipoAduana: catalogoResponse | null;
  tipoInspectoria: catalogoResponse | null;
  tipoMunicipio: catalogoResponse | null;
  destinatarioDenominacion: string;
  destinatarioPais: catalogoResponse | null;
  destinatarioEstado: catalogoResponse | null;
  destinatarioCodigoPostal: string;
  destinatarioDomicilio: string;
  agenteAduanalNombre: string;
  agenteAduanalPrimerApellido: string;
  agenteAduanalSegundoApellido: string;
  agenteAduanalPatente: string;
  destinatarioRowData: TablaDatos[];
  agenteAduanalRowData: TablaDatos[]; 
  clave: string; 
  dependencia: string;
  banco: string; 
  llave: string;
  fecha: string;
  importe: string;
  revisados:string;
  medio: string;
  identificacion:string;
  economico: string;
  placa:string;
  numero: string;
  fechas:string;
  requisito:string;
  descripcion: string;
  fraccion: string;
  arancelaria: string;
  cantidad: string;
  medida: string;
  genero: string;
  especie: string;
  comun:string;
  origen: string;
  procedencia: string;
  
}

export function createInitialState(): Tramite250101State {
  return {
    tipoAduana: null,
    tipoInspectoria: null,
    tipoMunicipio: null,
    destinatarioDenominacion: '',
    destinatarioPais: null,
    destinatarioEstado: null,
    destinatarioCodigoPostal: '',
    destinatarioDomicilio: '',
    agenteAduanalNombre: '',
    agenteAduanalPrimerApellido: '',
    agenteAduanalSegundoApellido: '',
    agenteAduanalPatente: '',
    destinatarioRowData: [],
    agenteAduanalRowData: [],
    clave: '',
    dependencia: '',
    banco: '',
    llave: '',
    fecha: '',
    importe: '',
    revisados: '',
    medio: '',
    identificacion:'',
    economico: '',
    placa:'',
    numero: '',
    fechas:'',
    requisito:'',
    descripcion: '',
    fraccion:'',
    arancelaria:'',
    cantidad: '',
    medida: '',
    genero:'',
    especie: '',
    comun:'',
    origen:'',
    procedencia: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'floraFaunaState', resettable: true })
export class Tramite250101Store extends Store<Tramite250101State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el tipo de aduana en el estado.
   * @param tipoAduana Catálogo de aduana
   */
  public establecerTipoAduana(tipoAduana: catalogoResponse): void {
    this.update((state) => ({ ...state, tipoAduana }));
  }

  /**
   * Actualiza el tipo de inspectoria en el estado.
   * @param tipoInspectoria Catálogo de inspectoria
   */
  public establecerTipoInspectoria(tipoInspectoria: catalogoResponse): void {
    this.update((state) => ({ ...state, tipoInspectoria }));
  }

  /**
   * Actualiza el tipo de municipio en el estado.
   * @param tipoMunicipio Catálogo de municipio
   */
  public establecerTipoMunicipio(tipoMunicipio: catalogoResponse): void {
    this.update((state) => ({ ...state, tipoMunicipio }));
  }

  /**
   * Actualiza la denominación del destinatario.
   * @param destinatarioDenominacion Nombre o razón social del destinatario
   */
  public establecerDestinatarioDenominacion(destinatarioDenominacion: string): void {
    this.update((state) => ({ ...state, destinatarioDenominacion }));
  }

  /**
   * Establece el país del destinatario.
   * @param destinatarioPais Catálogo del país
   */
  public establecerDestinatarioPais(destinatarioPais: catalogoResponse): void {
    this.update((state) => ({ ...state, destinatarioPais }));
  }

  /**
   * Establece el estado del destinatario.
   * @param destinatarioEstado Catálogo del estado
   */
  public establecerDestinatarioEstado(destinatarioEstado: catalogoResponse): void {
    this.update((state) => ({ ...state, destinatarioEstado }));
  }

  /**
   * Establece el código postal del destinatario.
   * @param destinatarioCodigoPostal Código postal
   */
  public establecerDestinatarioCodigoPostal(destinatarioCodigoPostal: string): void {
    this.update((state) => ({ ...state, destinatarioCodigoPostal }));
  }

  /**
   * Establece el domicilio del destinatario.
   * @param destinatarioDomicilio Dirección
   */
  public establecerDestinatarioDomicilio(destinatarioDomicilio: string): void {
    this.update((state) => ({ ...state, destinatarioDomicilio }));
  }

  /**
   * Establece el nombre del agente aduanal.
   * @param agenteAduanalNombre Nombre del agente
   */
  public establecerAgenteAduanalNombre(agenteAduanalNombre: string): void {
    this.update((state) => ({ ...state, agenteAduanalNombre }));
  }

  /**
   * Establece el primer apellido del agente aduanal.
   * @param agenteAduanalPrimerApellido Apellido paterno
   */
  public establecerAgenteAduanalPrimerApellido(agenteAduanalPrimerApellido: string): void {
    this.update((state) => ({ ...state, agenteAduanalPrimerApellido }));
  }

  /**
   * Establece el segundo apellido del agente aduanal.
   * @param agenteAduanalSegundoApellido Apellido materno
   */
  public establecerAgenteAduanalSegundoApellido(agenteAduanalSegundoApellido: string): void {
    this.update((state) => ({ ...state, agenteAduanalSegundoApellido }));
  }

  /**
   * Establece la patente del agente aduanal.
   * @param agenteAduanalPatente Número de patente
   */
  public establecerAgenteAduanalPatente(agenteAduanalPatente: string): void {
    this.update((state) => ({ ...state, agenteAduanalPatente }));
  }

  /**
   * Establece la lista de destinatarios.
   * @param destinaraioRowData Datos tabulares
   */
  public establecerDestinatario(destinaraioRowData: TablaDatos[]): void {
    this.update((state) => ({ ...state, destinaraioRowData }));
  }

  /**
   * Establece la lista de agentes aduanales.
   * @param agenteAduanalRowData Datos tabulares
   */
  public establecerAgenteAduanal(agenteAduanalRowData: TablaDatos[]): void {
    this.update((state) => ({ ...state, agenteAduanalRowData }));
  }

  
  /**
   * Actualiza el estado con la clave proporcionada.
   * @param {string} clave La clave a establecer.
   */
  public setClave(clave: string): void {
    this.update((state) => ({
      ...state,
      clave,
    }));
  }

  /**
   * Actualiza el estado con la dependencia proporcionada.
   * @param {string} dependencia La dependencia a establecer.
   */
  public setDependencia(dependencia: string): void {
    this.update((state) => ({
      ...state,
      dependencia,
    }));
  }

  /**
   * Actualiza el estado con el banco proporcionado.
   * @param {string} banco El banco a establecer.
   */
  public setBanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * Actualiza el estado con la llave proporcionada.
   * @param {string} llave La llave a establecer.
   */
  public setLlave(llave: string): void {
    this.update((state) => ({
      ...state,
      llave,
    }));
  }

  /**
   * Actualiza el estado con la fecha proporcionada.
   * @param {string} fecha La fecha a establecer.
   */
  public setFecha(fecha: string): void {
    this.update((state) => ({
      ...state,
      fecha,
    }));
  }

  /**
   * Actualiza el estado con el importe proporcionado.
   * @param {string} importe El importe a establecer.
   */
  public setImporte(importe: string): void {
    this.update((state) => ({
      ...state,
      importe,
    }));
  }
  /**
 * Actualiza el estado con el valor de 'revisados' proporcionado.
 * @param {string} revisados - El valor de revisados a establecer.
 */
public setRevisados(revisados: string): void {
  this.update((state) => ({
    ...state,
    revisados,
  }));
}

/**
 * Establece el medio en el estado.
 * @param {string} medio - El medio a establecer.
 */
public setMedio(medio: string): void {
  this.update((state) => ({
    ...state,
    medio,
  }));
}

/**
 * Establece la identificación en el estado.
 * @param {string} identificacion - La identificación a establecer.
 */
public setIdentificacion(identificacion: string): void {
  this.update((state) => ({
    ...state,
    identificacion,
  }));
}

/**
 * Establece el valor económico en el estado.
 * @param {string} economico - El valor económico a establecer.
 */
public setEconomico(economico: string): void {
  this.update((state) => ({
    ...state,
    economico,
  }));
}

/**
 * Establece la placa en el estado.
 * @param {string} placa - La placa a establecer.
 */
public setPlaca(placa: string): void {
  this.update((state) => ({
    ...state,
    placa,
  }));
}

/**
 * Establece el número en el estado.
 * @param {string} numero - El número a establecer.
 */
public setNumero(numero: string): void {
  this.update((state) => ({
    ...state,
    numero,
  }));
}

/**
 * Establece las fechas en el estado.
 * @param {string} fechas - Las fechas a establecer.
 */
public setFechas(fechas: string): void {
  this.update((state) => ({
    ...state,
    fechas,
  }));
}

/**
 * Establece el requisito en el estado.
 * @param {string} requisito - El requisito a establecer.
 */
public setRequisito(requisito: string): void {
  this.update((state) => ({
    ...state,
    requisito,
  }));
}

/**
 * Establece la fracción arancelaria en el estado.
 * @param {string} arancelaria - La fracción arancelaria a establecer.
 */
public setArancelaria(arancelaria: string): void {
  this.update((state) => ({
    ...state,
    arancelaria,
  }));
}

/**
 * Establece la cantidad en el estado.
 * @param {string} cantidad - La cantidad a establecer.
 */
public setCantidad(cantidad: string): void {
  this.update((state) => ({
    ...state,
    cantidad,
  }));
}

/**
 * Establece la medida en el estado.
 * @param {string} medida - La medida a establecer.
 */
public setMedida(medida: string): void {
  this.update((state) => ({
    ...state,
    medida,
  }));
}

/**
 * Establece el género en el estado.
 * @param {string} genero - El género a establecer.
 */
public setGenero(genero: string): void {
  this.update((state) => ({
    ...state,
    genero,
  }));
}

/**
 * Establece la especie en el estado.
 * @param {string} especie - La especie a establecer.
 */
public setEspecie(especie: string): void {
  this.update((state) => ({
    ...state,
    especie,
  }));
}

/**
 * Establece el nombre común en el estado.
 * @param {string} comun - El nombre común a establecer.
 */
public setComun(comun: string): void {
  this.update((state) => ({
    ...state,
    comun,
  }));
}

/**
 * Establece el origen en el estado.
 * @param {string} origen - El origen a establecer.
 */
public setOrigen(origen: string): void {
  this.update((state) => ({
    ...state,
    origen,
  }));
}

/**
 * Establece la procedencia en el estado.
 * @param {string} procedencia - La procedencia a establecer.
 */
public setProcedencia(procedencia: string): void {
  this.update((state) => ({
    ...state,
    procedencia,
  }));
}

/**
 * Establece la descripción en el estado.
 * @param {string} descripcion - La descripción a establecer.
 */
public setDescripcion(descripcion: string): void {
  this.update((state) => ({
    ...state,
    descripcion,
  }));
}

/**
 * Establece la fracción en el estado.
 * @param {string} fraccion - La fracción a establecer.
 */
public setFraccion(fraccion: string): void {
  this.update((state) => ({
    ...state,
    fraccion,
  }));
}

/**
 * Restaura el estado inicial del store.
 */
public resetStore(): void {
  this.reset();
}


}
