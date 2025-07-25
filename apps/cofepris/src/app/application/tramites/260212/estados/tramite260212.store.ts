import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Catalogo, CatalogoResponse } from '@libs/shared/data-access-user/src';

/**
 * Estado de la tienda para el trámite 260212.
 */
export interface Tramite260212State {
  /**
   * Estado actual del trámite.
   */
  estado: string ;
  /**
   * Clave seleccionada.
   */
  selectedClave: CatalogoResponse | null,
  /**
   * Descripción seleccionada.
   */
  selectedDescripcion: CatalogoResponse | null,
  /**
   * Clasificación especificada seleccionada.
   */
  selecteDespecificarClasificacion:Catalogo |null
  /**
   * Banco seleccionado.
   */
  banco:string,
  /**
   * RFC del responsable sanitario.
   */
  rfcDelResponsableSanitario:string,
  /**
   * Denominación o razón social.
   */
  denominacionRazonSocial:string,
  /**
   * Correo electrónico.
   */
  correoElectronico:string,
  /**
   * Municipio.
   */
  municipio:string,
  /**
   * Localidad.
   */
  localidad:string,
  /**
   * Colonia.
   */
  colonia:string,
  /**
   * Calle.
   */
  calle:string,
  /**
   * Lada telefónica.
   */
  lada:string,
  /**
   * Teléfono.
   */
  teléfono:string,
  /**
   * Código postal.
   */
  codigoPostal:string,
  /**
   * Régimen.
   */
  regimen:string,
  /**
   * Entradas.
   */
  entradas:string,
  /**
   * Clave de referencia.
   */
  ClaveDeReferncia:string,
  /**
   * Cadena de la dependencia.
   */
  CadenaDeLaDependencia:string,
  /**
   * Llave de pago.
   */
  llaveDePago:string,
  /**
   * Fecha de pago.
   */
  setFechaDePago:string,
  /**
   * Importe de pago.
   */
  importeDePago:string,
   losDatos: string;
  rfc: string;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
      avisoclave: string;
      noLicenciaSanitaria: string;
}

/**
 * Crea el estado inicial para el trámite 260212.
 * @returns Estado inicial de Tramite260212State
 */
export function createInitialState(): Tramite260212State {
  return {
    // selectedClave: '',
    estado: '',
    selectedClave: null,
    selectedDescripcion: null,
    selecteDespecificarClasificacion:null,
    banco:'',
    rfcDelResponsableSanitario:'',
    denominacionRazonSocial:'',
    correoElectronico:'',
    municipio:'',
    localidad:'',
    colonia:'',
    calle:'',
    lada:'',
    teléfono:'',
    codigoPostal:'',
    regimen:'',
    entradas:'',
    ClaveDeReferncia:'',
    CadenaDeLaDependencia:'',
    llaveDePago:'',
    setFechaDePago:'',
    importeDePago:'',
       losDatos: '',
      rfc: '',
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
          avisoclave: '',
      noLicenciaSanitaria: '',
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'permisoMaquilaState', resettable: true })
/**
 * Tienda Akita para manejar el estado del trámite 260212.
 */
export class Tramite260212Store extends Store<Tramite260212State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el estado seleccionado.
   * @param estado Estado a establecer
   */
  public setSelectedEstado(estado: string): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Establece la clave seleccionada.
   * @param selectedClave Clave seleccionada
   */
  public setClave(selectedClave: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedClave,
    }));
  }

  /**
   * Establece la descripción seleccionada.
   * @param selectedDescripcion Descripción seleccionada
   */
  public setDescripcion(selectedDescripcion: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedDescripcion,
    }));
  }

  /**
   * Establece la clasificación especificada seleccionada.
   * @param selecteDespecificarClasificacion Clasificación seleccionada
   */
  public setDespecificarClasificacion(selecteDespecificarClasificacion: CatalogoResponse): void {
    this.update((state) => ({
      ...state,
      selecteDespecificarClasificacion,
    }));
  }

  /**
   * Establece el banco.
   * @param banco Banco a establecer
   */
  public setBanco(banco: string): void {
    this.update((state) => ({
      ...state,
      banco,
    }));
  }

  /**
   * Establece el RFC del responsable sanitario.
   * @param rfcDelResponsableSanitario RFC a establecer
   */
  public setRfcDelResponsableSanitario(rfcDelResponsableSanitario: string):void {
    this.update((state) => ({
      ...state,
      rfcDelResponsableSanitario,
    }));
  }

  /**
   * Establece la denominación o razón social.
   * @param denominacionRazonSocial Denominación a establecer
   */
  public setDenominacionRazonSocial(denominacionRazonSocial: string):void {
    this.update((state) => ({
      ...state,
      denominacionRazonSocial,
    }));
  }

  /**
   * Establece el correo electrónico.
   * @param correoElectronico Correo a establecer
   */
  public setCorreoElectronico(correoElectronico: string):void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  /**
   * Establece el municipio.
   * @param municipio Municipio a establecer
   */
  public setMunicipio(municipio: string):void {
    this.update((state) => ({
      ...state,
      municipio,
    }));
  }

  /**
   * Establece la localidad.
   * @param localidad Localidad a establecer
   */
  public setLocalidad(localidad: string):void {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

  /**
   * Establece la colonia.
   * @param colonia Colonia a establecer
   */
  public setColonia(colonia: string):void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  /**
   * Establece la calle.
   * @param calle Calle a establecer
   */
  public setCalle(calle: string):void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
   * Establece la lada telefónica.
   * @param lada Lada a establecer
   */
  public setLada(lada: string):void {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  /**
   * Establece el teléfono.
   * @param teléfono Teléfono a establecer
   */
  public setTelefono(teléfono: string):void {
    this.update((state) => ({
      ...state,
      teléfono,
    }));
  }

  /**
   * Establece el código postal.
   * @param codigoPostal Código postal a establecer
   */
  public setCodigoPostal(codigoPostal: string):void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  /**
   * Establece el régimen.
   * @param regimen Régimen a establecer
   */
  public setRegimen(regimen: string):void {
    this.update((state) => ({
      ...state,
      regimen,
    }));
  }

  /**
   * Establece las entradas.
   * @param entradas Entradas a establecer
   */
  public setEntradas(entradas: string):void {
    this.update((state) => ({
      ...state,
      entradas,
    }));
  }
  /**
   * Establece la clave de referencia.
   * @param ClaveDeReferncia Clave de referencia a establecer
   */
  public setClaveDeReferncia(ClaveDeReferncia: string):void {
    this.update((state) => ({
      ...state,
      ClaveDeReferncia,
    }));
  }
  /**
   * Establece la cadena de la dependencia.
   * @param CadenaDeLaDependencia Cadena a establecer
   */
  public setCadenaDeLaDependencia(CadenaDeLaDependencia: string):void {
    this.update((state) => ({
      ...state,
      CadenaDeLaDependencia,
    }));
  }

  /**
   * Establece la llave de pago.
   * @param llaveDePago Llave de pago a establecer
   */
  public setLlaveDePago(llaveDePago: string):void {
    this.update((state) => ({
      ...state,
      llaveDePago,
    }));
  }
  /**
   * Establece la fecha de pago.
   * @param setFechaDePago Fecha de pago a establecer
   */
  public setFechaDePago(setFechaDePago: string):void {
    this.update((state) => ({
      ...state,
      setFechaDePago,
    }));
  }
  /**
   * Establece el importe de pago.
   * @param importeDePago Importe de pago a establecer
   */
  public setImporteDePago(importeDePago: string):void {
    this.update((state) => ({
      ...state,
      importeDePago,
    }));
  }
 /**
 * Establece los datos generales del formulario.
 * Se actualiza el campo 'losDatos' en el store.
 * Útil para datos agrupados del tercero.
 */
public setLosDatos(losDatos: string): void {
  this.update((state) => ({
    ...state,
    losDatos,
  }));
}

/**
 * Establece el RFC del tercero.
 * Se actualiza el campo 'rfc' en el store.
 * Necesario para identificación fiscal.
 */
public setRfc(rfc: string): void {
  this.update((state) => ({
    ...state,
    rfc,
  }));
}

/**
 * Establece el nombre del tercero.
 * Se actualiza el campo 'nombre' en el store.
 * Aplica a personas físicas o morales.
 */
public setNombre(nombre: string): void {
  this.update((state) => ({
    ...state,
    nombre,
  }));
}

/**
 * Establece el primer apellido del tercero.
 * Se actualiza el campo 'primerApellido' en el store.
 * Solo aplica para personas físicas.
 */
public setPrimerApellido(primerApellido: string): void {
  this.update((state) => ({
    ...state,
    primerApellido,
  }));
}

/**
 * Establece el segundo apellido del tercero.
 * Se actualiza el campo 'segundoApellido' en el store.
 * Solo aplica para personas físicas.
 */
public setSegundoApellido(segundoApellido: string): void {
  this.update((state) => ({
    ...state,
    segundoApellido,
  }));
}

/**
 * Establece la clave del aviso sanitario.
 * Se actualiza el campo 'avisoclave' en el store.
 * Utilizado en trámites sanitarios.
 */
public setAvisoclave(avisoclave: string): void {
  this.update(state => ({ ...state, avisoclave }));
}

/**
 * Establece el número de licencia sanitaria.
 * Se actualiza el campo 'noLicenciaSanitaria' en el store.
 * Aplica para fabricantes o proveedores con regulación sanitaria.
 */
public setNoLicenciaSanitaria(noLicenciaSanitaria: string): void {
  this.update(state => ({ ...state, noLicenciaSanitaria }));
}

}
