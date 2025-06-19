import { Catalogo, CatalogoResponse } from '@libs/shared/data-access-user/src';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaDatos } from '@libs/shared/data-access-user/src/core/models/260906/detos.model';

/**
 * Interfaz que define el estado de la tienda Sanitario260906.
 */
export interface Solicitud260906State {
  /** Referencia única asociada a la solicitud */
  referencia: string;
  /** Cadena de dependencia asociada */
  cadenaDependencia: string;
  /** Nombre del banco */
  banco: string;
  /** llave identificadora */
  llave: string;
  /** Tipo de operación de fetch */
  tipoFetch: string;
  /** Importe asociado */
  importe: string;
  /** Estado seleccionado */
  selectedEstado: CatalogoResponse | null;
  /** Clave seleccionada */
  setClave: CatalogoResponse | null;
  /** Descripción seleccionada */
  setDescripcion: CatalogoResponse | null;
  /** Clasificación específica seleccionada */
  setDespecificarClasificacion: Catalogo | null;
  /** Lista de fabricantes */
  Fabricante: TablaDatos[];
  /** Lista de destinatarios */
  Destinatario: TablaDatos[];
  /** Lista de proveedores */
  Proveedor: TablaDatos[];
  /** Lista de facturadores */
  Facturador: TablaDatos[];
  
  tercerosNacionalidad: string;
  tipoPersona: string;
  rfc: string;
  curp: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  denominacionRazonSocial: string;
  pais: string;
  estadoLocalidad: string;
  municipioAlcaldia: string;
  localidad: string;
  entidadFederativa: string;
  codigoPostaloEquivalente: string;
  colonia: string;
  coloniaoEquivalente: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  lada: string;
  telefono: string;
  correoElectronico: string;
  extranjeroCodigo: string;
  extranjeroEstado: string;
  extranjeroColonia: string;
  estado: string;
}

/**
 * Función que crea el estado inicial de la tienda.
 * @returns El estado inicial de la tienda.
 */
export function createInitialState(): Solicitud260906State {
  return {
    referencia: '',
    cadenaDependencia: '',
    banco: '',
    llave: '',
    tipoFetch: '',
    importe: '',
    selectedEstado: null,
    setClave: null,
    setDescripcion: null,
    setDespecificarClasificacion: null,
    Fabricante: [],
    Destinatario: [],
    Proveedor: [],
    Facturador: [],
    
    tercerosNacionalidad: '',
    tipoPersona: '',
    rfc: '',
    curp: '',
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    denominacionRazonSocial: '',
    pais: '',
    estadoLocalidad: '',
    municipioAlcaldia: '',
    localidad: '',
    entidadFederativa: '',
    codigoPostaloEquivalente: '',
    colonia: '',
    coloniaoEquivalente: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    lada: '',
    telefono: '',
    correoElectronico: '',
    extranjeroCodigo: '',
    extranjeroEstado: '',
    extranjeroColonia: '',
    estado: ''
  };
}

/**
 * Tienda que gestiona el estado de Sanitario260906.
 */
@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'sanitario260906Store',
  resettable: true
})
export class Sanitario260906Store extends Store<Solicitud260906State> {
  /**
   * Constructor que inicializa la tienda con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el campo `referencia` en el estado.
   * @param referencia Nueva referencia.
   */
  public setreferencia(referencia: string): void {
    this.update((state) => ({
      ...state,
      referencia
    }));
  }

  /**
   * Actualiza el campo `cadenaDependencia` en el estado.
   * @param cadenaDependencia Nueva cadena de dependencia.
   */
  public setcadenaDependencia(cadenaDependencia: string): void {
    this.update((state) => ({
      ...state,
      cadenaDependencia
    }));
  }

  /**
   * Actualiza el campo `banco` en el estado.
   * @param banco Nuevo nombre del banco.
   */
  public setbanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco
    }));
  }

  /**
   * Actualiza el campo `llave` en el estado.
   * @param llave Nueva llave identificadora.
   */
  public setLlave(llave: string): void {
    this.update((state) => ({
      ...state,
      llave
    }));
  }

  /**
   * Actualiza el campo `tipoFetch` en el estado.
   * @param tipoFetch Nuevo tipo de fetch.
   */
  public settipoFetch(tipoFetch: string): void {
    this.update((state) => ({
      ...state,
      tipoFetch
    }));
  }

  /**
   * Actualiza el campo `importe` en el estado.
   * @param importe Nuevo importe.
   */
  public setimporte(importe: string): void {
    this.update((state) => ({
      ...state,
      importe
    }));
  }

  /**
   * Actualiza el campo `selectedEstado` en el estado.
   * @param selectedEstado Nuevo estado seleccionado.
   */
  public setSelectedEstado(selectedEstado: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedEstado
    }));
  }

  /**
   * Actualiza el campo `setClave` en el estado.
   * @param selectedClave Nueva clave seleccionada.
   */
  public setClave(selectedClave: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      setClave: selectedClave
    }));
  }

  /**
   * Actualiza el campo `setDescripcion` en el estado.
   * @param selectedDescripcion Nueva descripción seleccionada.
   */
  public setDescripcion(selectedDescripcion: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      setDescripcion: selectedDescripcion
    }));
  }

  /**
   * Actualiza el campo `setDespecificarClasificacion` en el estado.
   * @param selectedDespecificarClasificacion Nueva clasificación específica seleccionada.
   */
  public setDespecificarClasificacion(selectedDespecificarClasificacion: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      setDespecificarClasificacion: selectedDespecificarClasificacion
    }));
  }

  /**
   * Actualiza el campo `Fabricante` en el estado.
   * @param fabricante Nueva lista de fabricantes.
   */
  public setFabricante(fabricante: TablaDatos[]): void {
    this.update((state) => ({
      ...state,
      Fabricante: fabricante
    }));
  }

  /**
   * Actualiza el campo `Destinatario` en el estado.
   * @param destinatario Nueva lista de destinatarios.
   */
  public setDestinatario(destinatario: TablaDatos[]): void {
    this.update((state) => ({
      ...state,
      Destinatario: destinatario
    }));
  }

  /**
   * Actualiza el campo `Proveedor` en el estado.
   * @param proveedor Nueva lista de proveedores.
   */
  public setProveedor(proveedor: TablaDatos[]): void {
    this.update((state) => ({
      ...state,
      Proveedor: proveedor
    }));
  }

  /**
   * Actualiza el campo `Facturador` en el estado.
   * @param facturador Nueva lista de facturadores.
   */
  public setFacturador(facturador: TablaDatos[]): void {
    this.update((state) => ({
      ...state,
      Facturador: facturador
    }));
  }

  /**
   * Actualiza el campo `tercerosNacionalidad` en el estado.
   * @param tercerosNacionalidad Nueva nacionalidad de terceros.
   */
  public setTercerosNacionalidad(tercerosNacionalidad: string): void {
    this.update((state) => ({
      ...state,
      tercerosNacionalidad
    }));
  }

  /**
   * Actualiza el campo `tipoPersona` en el estado.
   * @param tipoPersona Nuevo tipo de persona.
   */
  public setTipoPersona(tipoPersona: string): void {
    this.update((state) => ({
      ...state,
      tipoPersona
    }));
  }

  /**
   * Actualiza el campo `rfc` en el estado.
   * @param rfc Nuevo RFC.
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc
    }));
  }

  /**
   * Actualiza el campo `curp` en el estado.
   * @param curp Nueva CURP.
   */
  public setCurp(curp: string): void {
    this.update((state) => ({
      ...state,
      curp
    }));
  }

  /**
   * Actualiza el campo `nombre` en el estado.
   * @param nombre Nuevo nombre.
   */
  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre
    }));
  }

  /**
   * Actualiza el campo `primerApellido` en el estado.
   * @param primerApellido Nuevo primer apellido.
   */
  public setPrimerApellido(primerApellido: string): void {
    this.update((state) => ({
      ...state,
      primerApellido
    }));
  }

  /**
   * Actualiza el campo `segundoApellido` en el estado.
   * @param segundoApellido Nuevo segundo apellido.
   */
  public setSegundoApellido(segundoApellido: string): void {
    this.update((state) => ({
      ...state,
      segundoApellido
    }));
  }

  /**
   * Actualiza el campo `denominacionRazonSocial` en el estado.
   * @param denominacionRazonSocial Nueva denominación o razón social.
   */
  public setDenominacionRazonSocial(denominacionRazonSocial: string): void {
    this.update((state) => ({
      ...state,
      denominacionRazonSocial
    }));
  }

  /**
   * Actualiza el campo `pais` en el estado.
   * @param pais Nuevo país.
   */
  public setPais(pais: string): void {
    this.update((state) => ({
      ...state,
      pais
    }));
  }

  /**
   * Actualiza el campo `estadoLocalidad` en el estado.
   * @param estadoLocalidad Nuevo estado o localidad.
   */
  public setEstadoLocalidad(estadoLocalidad: string): void {
    this.update((state) => ({
      ...state,
      estadoLocalidad
    }));
  }

  /**
   * Actualiza el campo `municipioAlcaldia` en el estado.
   * @param municipioAlcaldia Nuevo municipio o alcaldía.
   */
  public setMunicipioAlcaldia(municipioAlcaldia: string): void {
    this.update((state) => ({
      ...state,
      municipioAlcaldia
    }));
  }

  /**
   * Actualiza el campo `localidad` en el estado.
   * @param localidad Nueva localidad.
   */
  public setLocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      localidad
    }));
  }

  /**
   * Actualiza el campo `entidadFederativa` en el estado.
   * @param entidadFederativa Nueva entidad federativa.
   */
  public setEntidadFederativa(entidadFederativa: string): void {
    this.update((state) => ({
      ...state,
      entidadFederativa
    }));
  }

  /**
   * Actualiza el campo `codigoPostaloEquivalente` en el estado.
   * @param codigoPostaloEquivalente Nuevo código postal o equivalente.
   */
  public setCodigoPostaloEquivalente(codigoPostaloEquivalente: string): void {
    this.update((state) => ({
      ...state,
      codigoPostaloEquivalente
    }));
  }

  /**
   * Actualiza el campo `colonia` en el estado.
   * @param colonia Nueva colonia.
   */
  public setColonia(colonia: string): void {
    this.update((state) => ({
      ...state,
      colonia
    }));
  }

  /**
   * Actualiza el campo `coloniaoEquivalente` en el estado.
   * @param coloniaoEquivalente Nueva colonia o equivalente.
   */
  public setColoniaoEquivalente(coloniaoEquivalente: string): void {
    this.update((state) => ({
      ...state,
      coloniaoEquivalente
    }));
  }

  /**
   * Actualiza el campo `calle` en el estado.
   * @param calle Nueva calle.
   */
  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle
    }));
  }

  /**
   * Actualiza el campo `numeroExterior` en el estado.
   * @param numeroExterior Nuevo número exterior.
   */
  public setNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
      ...state,
      numeroExterior
    }));
  }

  /**
   * Actualiza el campo `numeroInterior` en el estado.
   * @param numeroInterior Nuevo número interior.
   */
  public setNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
      ...state,
      numeroInterior
    }));
  }

  /**
   * Actualiza el campo `lada` en el estado.
   * @param lada Nueva lada telefónica.
   */
  public setLada(lada: string): void {
    this.update((state) => ({
      ...state,
      lada
    }));
  }

  /**
   * Actualiza el campo `telefono` en el estado.
   * @param telefono Nuevo teléfono.
   */
  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono
    }));
  }

  /**
   * Actualiza el campo `correoElectronico` en el estado.
   * @param correoElectronico Nuevo correo electrónico.
   */
  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico
    }));
  }

  /**
   * Actualiza el campo `extranjeroCodigo` en el estado.
   * @param extranjeroCodigo Nuevo código para extranjero.
   */
  public setExtranjeroCodigo(extranjeroCodigo: string): void {
    this.update((state) => ({
      ...state,
      extranjeroCodigo
    }));
  }

  /**
   * Actualiza el campo `extranjeroEstado` en el estado.
   * @param extranjeroEstado Nuevo estado para extranjero.
   */
  public setExtranjeroEstado(extranjeroEstado: string): void {
    this.update((state) => ({
      ...state,
      extranjeroEstado
    }));
  }

  /**
   * Actualiza el campo `extranjeroColonia` en el estado.
   * @param extranjeroColonia Nueva colonia para extranjero.
   */
  public setExtranjeroColonia(extranjeroColonia: string): void {
    this.update((state) => ({
      ...state,
      extranjeroColonia
    }));
  }

  /**
   * Actualiza el campo `estado` en el estado.
   * @param estado Nuevo estado.
   */
  public setEstado(estado: string): void {
    this.update((state) => ({
      ...state,
      estado
    }));
  }
}
