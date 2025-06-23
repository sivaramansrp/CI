import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 32502
 * @returns Solicitud32502
 */
export interface Solicitud32502State {
  adace: string;
  razonSocial: string;
  rfc: string;
  rfcExtranjero: string;
  cveFraccionArancelaria: string;
  reglaFraccion: string;
  nico: string;
  valorUSD: string;
  marca: string;
  peso: string;
  fechaInicio: string;
  numeroSerie: string;
  descripcionMercancia: string;
  informacionExtra: string;
  entidadFederativa: string;
  delegacionMunicipio: string;
  colonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  patenteAutorizacion: string;
  rfcAgenteAduanal: string;
  numeroPedimento: string;
  claveAduana: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  tipoDocumento: string;
  dropdown: string;
  commonCheckbox: boolean;
  individualCheckbox: boolean [];
}

/**
 * Crea el estado inicial para la solicitud 32502.
 *
 * @returns {Solicitud32502State} Objeto con todos los campos inicializados.
 */
export function createInitialState(): Solicitud32502State {
  return {
    adace: '',
    razonSocial: '',
    rfc: '',
    rfcExtranjero: '',
    cveFraccionArancelaria: '',
    reglaFraccion: '',
    nico: '',
    valorUSD: '',
    marca: '',
    peso: '',
    fechaInicio: '',
    numeroSerie: '',
    descripcionMercancia: '',
    informacionExtra: '',
    entidadFederativa: '',
    delegacionMunicipio: '',
    colonia: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    codigoPostal: '',
    patenteAutorizacion: '',
    rfcAgenteAduanal: '',
    numeroPedimento: '',
    claveAduana: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    tipoDocumento: '',
    dropdown: '',
    commonCheckbox: false,
    individualCheckbox: [false, false, false, false, false, false],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite32502', resettable: true })
/**
 * Clase encargada de manejar y actualizar el estado de la solicitud 32502.
 */
export class Tramite32502Store extends Store<Solicitud32502State> {
   /**
   * Método reservado (aún no implementado).
   * @param _arg0 - argumento no utilizado
   */
  setFraccionRegla(_arg0: string): void {
    throw new Error('Método no implementado en ' + this.constructor.name);
  }
  /**
   * Constructor: inicializa el estado con valores por defecto.
   */
  constructor() {
    super(createInitialState());
  }

   /**
   * Establece el valor de la fracción arancelaria.
   * @param fraccionArancelaria - Clave de la fracción arancelaria
   */
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * Establece el valor del RFC.
   * @param rfc - Registro Federal de Contribuyentes
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Establece la razón social.
   * @param razonSocial - Nombre legal de la empresa
   */
  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }

  /**
   * Establece la clave ADACE.
   * @param adace - Clave de la ADACE
   */
  public setAdace(adace: string): void {
    this.update((state) => ({
      ...state,
      adace,
    }));
  }

  /**
   * Establece el RFC extranjero.
   * @param rfcExtranjero - RFC si es persona/empresa extranjera
   */
  public setRfcExtranjero(rfcExtranjero: string): void {
    this.update((state) => ({
      ...state,
      rfcExtranjero,
    }));
  }

  /**
   * Establece la clave de fracción arancelaria.
   * @param cveFraccionArancelaria - Clave de la fracción
   */
  public setCveFraccionArancelaria(cveFraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      cveFraccionArancelaria,
    }));
  }

  /**
   * Establece la regla asociada a la fracción.
   * @param reglaFraccion - Regla de fracción
   */
  public setReglaFraccion(reglaFraccion: string): void {
    this.update((state) => ({
      ...state,
      reglaFraccion,
    }));
  }

  /**
   * Establece el número NICO.
   * @param nico - Número de Identificación Comercial
   */
  public setNico(nico: string): void {
    this.update((state) => ({
      ...state,
      nico,
    }));
  }

  /**
   * Establece el valor en USD.
   * @param valorUSD - Valor en dólares estadounidenses
   */
  public setValorUSD(valorUSD: string): void {
    this.update((state) => ({
      ...state,
      valorUSD,
    }));
  }

  /**
   * Establece la marca de la mercancía.
   * @param marca - Marca del producto
   */
  public setMarca(marca: string): void {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }

  /**
   * Establece el peso de la mercancía.
   * @param peso - Peso en kilogramos o unidad correspondiente
   */
  public setPeso(peso: string): void {
    this.update((state) => ({
      ...state,
      peso,
    }));
  }

  /**
   * Establece la fecha de inicio.
   * @param fechaInicio - Fecha de inicio del trámite
   */
  public setFechaInicio(fechaInicio: string): void {
    this.update((state) => ({
      ...state,
      fechaInicio,
    }));
  }

  /**
   * Establece el número de serie del producto.
   * @param numeroSerie - Número de serie
   */
  public setNumeroSerie(numeroSerie: string): void {
    this.update((state) => ({
      ...state,
      numeroSerie,
    }));
  }

  /**
   * Establece la descripción de la mercancía.
   * @param descripcionMercancia - Detalle descriptivo
   */
  public setDescripcionMercancia(descripcionMercancia: string): void {
    this.update((state) => ({
      ...state,
      descripcionMercancia,
    }));
  }

  /**
   * Establece información adicional.
   * @param informacionExtra - Comentarios o datos extra
   */
  public setInformacionExtra(informacionExtra: string): void {
    this.update((state) => ({
      ...state,
      informacionExtra,
    }));
  }

  /**
   * Establece la entidad federativa.
   * @param entidadFederativa - Estado de la república
   */
  public setEntidadFederativa(entidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  /**
   * Establece el municipio o delegación.
   * @param delegacionMunicipio - Delegación o municipio
   */
  public setDelegacionMunicipio(delegacionMunicipio: string): void {
    this.update((state) => ({
      ...state,
      delegacionMunicipio,
    }));
  }

  /**
   * Establece la colonia.
   * @param colonia - Nombre de la colonia
   */
  public setColonia(colonia: string): void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  /**
   * Establece el nombre de la calle.
   * @param calle - Calle de la dirección
   */
  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
   * Establece el número exterior del domicilio.
   * @param numeroExterior - Número exterior
   */
  public setNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
      ...state,
      numeroExterior,
    }));
  }

  /**
   * Establece el número interior del domicilio.
   * @param numeroInterior - Número interior
   */
  public setNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
      ...state,
      numeroInterior,
    }));
  }

  /**
   * Establece el código postal.
   * @param codigoPostal - Código postal correspondiente
   */
  public setCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  /**
   * Establece la patente de autorización aduanal.
   * @param patenteAutorizacion - Número de patente del agente aduanal
   */
  public setPatenteAutorizacion(patenteAutorizacion: string): void {
    this.update((state) => ({
      ...state,
      patenteAutorizacion,
    }));
  }

  /**
   * Establece el RFC del agente aduanal.
   * @param rfcAgenteAduanal - RFC del agente aduanal
   */
  public setRfcAgenteAduanal(rfcAgenteAduanal: string): void {
    this.update((state) => ({
      ...state,
      rfcAgenteAduanal,
    }));
  }

  /**
   * Establece el número de pedimento.
   * @param numeroPedimento - Número de pedimento aduanal
   */
  public setNumeroPedimento(numeroPedimento: string): void {
    this.update((state) => ({
      ...state,
      numeroPedimento,
    }));
  }

  /**
   * Establece la clave de la aduana.
   * @param claveAduana - Clave identificadora de la aduana
   */
  public setClaveAduana(claveAduana: string): void {
    this.update((state) => ({
      ...state,
      claveAduana,
    }));
  }

  /**
   * Establece el nombre del representante o solicitante.
   * @param nombre - Nombre de la persona
   */
  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  /**
   * Establece el primer apellido del solicitante.
   * @param primerApellido - Primer apellido
   */
  public setPrimerApellido(primerApellido: string): void {
    this.update((state) => ({
      ...state,
      primerApellido,
    }));
  }

  /**
   * Establece el segundo apellido del solicitante.
   * @param segundoApellido - Segundo apellido
   */
  public setSegundoApellido(segundoApellido: string): void {
    this.update((state) => ({
      ...state,
      segundoApellido,
    }));
  }

  /**
   * Establece el tipo de documento presentado.
   * @param tipoDocumento - Tipo de documento (ej. INE, pasaporte)
   */
  public setTipoDocumento(tipoDocumento: string): void {
    this.update((state) => ({
      ...state,
      tipoDocumento,
    }));
  }

  /**
   * Establece el valor del dropdown.
   * @param dropdown - Valor seleccionado en el dropdown
   */
  public setDropdown(dropdown: string): void {
    this.update((state) => ({
      ...state,
      dropdown,
    }));
  }

  /**
   * Establece el valor del checkbox común.
   * @param commonCheckbox - Valor booleano del checkbox general
   */
  public setCommonCheckbox(commonCheckbox: boolean): void {
    this.update((state) => ({
      ...state,
      commonCheckbox,
    }));
  }

  /**
   * Establece los valores de los checkboxes individuales.
   * @param individualCheckbox - Arreglo de booleanos representando cada checkbox
   */
  public setIndividualCheckbox(individualCheckbox: boolean[]): void {
    this.update((state) => ({
      ...state,
      individualCheckbox,
    }));
  }
}