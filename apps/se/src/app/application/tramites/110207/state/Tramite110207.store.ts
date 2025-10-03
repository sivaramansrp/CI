import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
 /** Identificador único del catálogo. */
 id: number;
 /** Descripción del catálogo. */
 descripcion: string;
}
/**
 * Estado inicial para la interfaz del trámite 110207.
 */
export interface Solicitud110207State {
  /** ID de la solicitud */
  idSolicitud: number | null;
  /** Lista de tratados disponibles. */
  tratado: Catalogo[]
  /** Lista de países disponibles. */
  pais: Catalogo[]
  /** Fracción arancelaria seleccionada. */
  fraccionArancelaria: string;
  /** Número de registro del producto. */
  numeroRegistro: string;
  /** Nombre comercial del producto. */
  nombreComercial: string;
  /** Fecha inicial del trámite. */
  fechaInicial: string;
  /** Fecha final del trámite. */
  fechaFinal: string;
  /** Archivo adjunto al trámite. */
  archivo: string;
  /** Observaciones adicionales del trámite. */
  observaciones: string;
  /** Valor de presica. */
  presica: string;
  /** Valor de presenta. */
  presenta: string;
  /** Lista de idiomas disponibles. */
  idioma: Catalogo[]
  /** Lista de entidades disponibles. */
  entidad: Catalogo[] 
  /** Lista de representaciones disponibles. */
  representacion: Catalogo[] 
  /** Nombre del solicitante. */
  nombre: string;
  /** Primer apellido del solicitante. */
  apellidoPrimer: string;
  /** Segundo apellido del solicitante. */
  apellidoSegundo: string;
  /** Número fiscal del solicitante. */
  numeroFiscal: string;
  /** Razón social del solicitante. */
  razonSocial: string;
  /** Ciudad del solicitante. */
  ciudad: string;
  /** Calle del solicitante. */
  calle: string;
  /** Número o letra de la dirección del solicitante. */
  numeroLetra: string;
  /** Lada del número telefónico. */
  lada: string;
  /** Número telefónico del solicitante. */
  telefono: string;
  /** Número de fax del solicitante. */
  fax: string;
  /** Correo electrónico del solicitante. */
  correoElectronico: string;
  /** Lista de naciones disponibles. */
  nacion: Catalogo[]
  /** Lista de transportes disponibles. */
  transporte: Catalogo[] 
  /** Fracción arancelaria de la mercancía. */
  fraccionMercanciaArancelaria: string;
  /** Nombre técnico de la mercancía. */
  nombreTecnico: string;
  /** Nombre en inglés de la mercancía. */
  nombreEnIngles: string;
  /** Criterio para conferir origen. */
  criterioParaConferir: string;
  /** Marca de la mercancía. */
  marca: string;
  /** Cantidad de la mercancía. */
  cantidad: string;
  /** Lista de unidades de medida comercial (UMC). */
  umc: Catalogo[] 
  /** Valor de la mercancía. */
  valorDelaMercancia: string;
  /** Complemento de la descripción de la mercancía. */
  complementoDelaDescripcion: string;
  /** Masa bruta de la mercancía. */
  masaBruta: string;
  /** Nombre comercial de la mercancía. */
  nombreComercialDelaMercancia: string;
  /** Lista de unidades de medida disponibles. */
  unidadMedida: Catalogo[] 
  /** Lista de tipos de factura disponibles. */
  tipoFactura: Catalogo[] 
  /** Fecha de la factura. */
  fecha: string;
  /** Número de la factura. */
  numeroFactura: string;
  /** Justificación del trámite. */
  justificacion: string;
  /** Valor de la casilla de verificación. */
  casillaVerificacion: string;
  /** Indica si la casilla está marcada. */
  siCasilla: boolean;
  /** Ruta completa del trámite. */
  rutaCompleta: string;
  /** Puerto de embarque. */
  puertoEmbarque: string;
  /** Puerto de desembarque. */
  puertoDesembarque: string;
}
/**
 * Crea el estado inicial para la solicitud del trámite 110207.
 * @returns Estado inicial de tipo `Solicitud110207State`.
 */
export function createInitialState(): Solicitud110207State {
  return {
    idSolicitud: 0,
    tratado: [],
    pais: [],
    fraccionArancelaria: '',
    numeroRegistro: '',
    nombreComercial: '',
    fechaInicial: '',
    fechaFinal: '',
    archivo: '',
    observaciones: '',
    presica: '',
    presenta: '',
    idioma: [],
    entidad: [],
    representacion: [],
    nombre: '',
    apellidoPrimer: '',
    apellidoSegundo: '',
    numeroFiscal: '',
    razonSocial: '',
    ciudad: '',
    calle: '',
    numeroLetra: '',
    lada: '',
    telefono: '',
    fax: '',
    correoElectronico: '',
    nacion: [],
    transporte: [],
    fraccionMercanciaArancelaria: '',
    nombreTecnico: '',
    nombreEnIngles: '',
    criterioParaConferir: '',
    marca: '',
    cantidad: '',
    umc: [],
    valorDelaMercancia: '',
    complementoDelaDescripcion: '',
    masaBruta: '',
    nombreComercialDelaMercancia: '',
    unidadMedida: [],
    tipoFactura: [],
    fecha: '',
    numeroFactura: '',
    justificacion: '',
    casillaVerificacion: '',
    siCasilla: false,
    rutaCompleta: '',
    puertoEmbarque: '',
    puertoDesembarque: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110207', resettable: true })
export class Tramite110207Store extends Store<Solicitud110207State> {
  constructor() {
    super(createInitialState());
  }

    /**
   * Guarda el ID de la solicitud en el estado.
   *
   * @param idSolicitud - El ID de la solicitud que se va a guardar.
   */
  public setIdSolicitud(idSolicitud: number): void {
    this.update((state) => ({
      ...state,
      idSolicitud,
    }));
  }
  
  /**
   * Establece el valor de la casilla de verificación.
   * @param siCasilla Indica si la casilla está marcada.
   */
  setEstablecerSiCasilla(siCasilla: boolean): void {
    this.update((state) => ({
      ...state,
      siCasilla,
    }));
  }
  /**
   * Establece el catálogo de tratados.
   * @param tratado Lista de objetos de tipo `Catalogo`.
   */
  public setTratado(tratado: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      tratado,
    }));
  }
  /**
   * Establece el catálogo de países.
   * @param pais Lista de objetos de tipo `Catalogo`.
   */
  public setPais(pais: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }
  /**
   * Establece la fracción arancelaria.
   * @param fraccionArancelaria Cadena que representa la fracción arancelaria.
   */
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }
  /**
   * Establece la fracción arancelaria de la mercancía.
   * @param fraccionMercanciaArancelaria Cadena que representa la fracción arancelaria de la mercancía.
   */
  public setfraccionMercanArancelaria(fraccionMercanciaArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionMercanciaArancelaria,
    }));
  }
  /**
   * Establece el nombre técnico de la mercancía.
   * @param nombreTecnico Cadena que representa el nombre técnico.
   */
  public setnombretecnico(nombreTecnico: string): void {
    this.update((state) => ({
      ...state,
      nombreTecnico,
    }));
  }
  /**
   * Establece el nombre en inglés de la mercancía.
   * @param nombreEnIngles Cadena que representa el nombre en inglés.
   */
  public setnomreeningles(nombreEnIngles: string): void {
    this.update((state) => ({
      ...state,
      nombreEnIngles,
    }));
  }
  /**
   * Establece el criterio para conferir origen.
   * @param criterioParaConferir Cadena que representa el criterio para conferir origen.
   */
  public setcriterioparaconferir(criterioParaConferir: string): void {
    this.update((state) => ({
      ...state,
      criterioParaConferir,
    }));
  }
  /**
   * Establece la marca de la mercancía.
   * @param marca Cadena que representa la marca.
   */
  public setmarca(marca: string): void {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }
  /**
   * Establece la cantidad de la mercancía.
   * @param cantidad Cadena que representa la cantidad.
   */
  public setcantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }
  /**
   * Establece el catálogo de unidades de medida comercial (UMC).
   * @param umc Lista de objetos de tipo `Catalogo`.
   */
  public setUMC(umc: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }
  /**
   * Establece el catálogo de unidades de medida.
   * @param unidadMedida Lista de objetos de tipo `Catalogo`.
   */
  public setUnidadMedida(unidadMedida: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      unidadMedida,
    }));
  }
  /**
   * Establece el catálogo de tipos de factura.
   * @param tipoFactura Lista de objetos de tipo `Catalogo`.
   */
  public setTipoFactura(tipoFactura: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      tipoFactura,
    }));
  }
  /**
   * Establece la fecha de la factura.
   * @param fecha Cadena que representa la fecha.
   */
  public setFecha(fecha: string): void {
    this.update((state) => ({
      ...state,
      fecha,
    }));
  }
  /**
   * Establece el número de factura.
   * @param numeroFactura Cadena que representa el número de factura.
   */
  public setNFactura(numeroFactura: string): void {
    this.update((state) => ({
      ...state,
      numeroFactura,
    }));
  }
  /**
   * Establece la justificación.
   * @param justificacion Cadena que representa la justificación.
   */
  public setJustificacion(justificacion: string): void {
    this.update((state) => ({
      ...state,
      justificacion,
    }));
  }
  /**
   * Establece el catálogo de transporte.
   * @param valorDelaMercancia Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setvalordelamercancia(valorDelaMercancia: string): void {
    this.update((state) => ({
      ...state,
      valorDelaMercancia,
    }));
  }
  /**
   * Establece el valor de la casilla de verificación.
   * @param complementoDelaDescripcion Cadena que representa el valor de la casilla.
   */
  public setcomplementodeladescripcion(complementoDelaDescripcion: string): void {
    this.update((state) => ({
      ...state,
      complementoDelaDescripcion,
    }));
  }
  /**
   * Establece el valor de la masa bruta de la mercancía.
   * @param masaBruta Cadena que representa la masa bruta.
   */
  public setmasabruta(masaBruta: string): void {
    this.update((state) => ({
      ...state,
      masaBruta,
    }));
  }
  /**
   * Establece el nombre comercial de la mercancía.
   * @param nombreComercialDelaMercancia Cadena que representa el nombre comercial de la mercancía.
   */
  public setnombrecomercialdelamercancia(nombreComercialDelaMercancia: string): void {
    this.update((state) => ({
      ...state,
      nombreComercialDelaMercancia,
    }));
  }
  /**
   * Establece el número de registro.
   * @param numeroRegistro Cadena que representa el número de registro.
   */
  public setNumRegistro(numeroRegistro: string): void {
    this.update((state) => ({
      ...state,
      numeroRegistro,
    }));
  }
  /**
   * Establece el nombre comercial.
   * @param nombreComercial Cadena que representa el nombre comercial.
   */
  public setNomComercial(nombreComercial: string): void {
    this.update((state) => ({
      ...state,
      nombreComercial,
    }));
  }
  /**
   * Establece la fecha de inicio del bloque.
   * @param fechaInicial Cadena que representa la fecha de inicio del bloque.
   */
  public setFechInicioB(fechaInicial: string): void {
    this.update((state) => ({
      ...state,
      fechaInicial,
    }));
  }
  /**
   * Establece la fecha de fin del bloque.
   * @param fechaFinal Cadena que representa la fecha de fin del bloque.
   */
  public setFechFinB(fechaFinal: string): void {
    this.update((state) => ({
      ...state,
      fechaFinal,
    }));
  }
  /**
   * Establece el archivo adjunto.
   * @param archivo Cadena que representa el archivo adjunto.
   */
  public setArchivo(archivo: string): void {
    this.update((state) => ({
      ...state,
      archivo,
    }));
  }
  /**
   * Establece las observaciones.
   * @param observaciones Cadena que representa las observaciones.
   */
  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }
  /**
   * Establece el valor de presica.
   * @param presica Cadena que representa el valor de presica.
   */
  public setPresica(presica: string): void {
    this.update((state) => ({
      ...state,
      presica,
    }));
  }
  /**
   * Establece el valor de presenta.
   * @param presenta Cadena que representa el valor de presenta.
   */
  public setPresenta(presenta: string): void {
    this.update((state) => ({
      ...state,
      presenta,
    }));
  }
  /**
   * Establece el catálogo de idiomas.
   * @param idioma Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setIdioma(idioma: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      idioma,
    }));
  }
  /**
   * Establece el catálogo de entidades.
   * @param entidad Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setEntidad(entidad: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      entidad,
    }));
  }
  /**
   * Establece el catálogo de representaciones.
   * @param representacion Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setRepresentacion(representacion: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      representacion,
    }));
  }
  /**
   * Establece el nombre del solicitante.
   * @param nombre Cadena que representa el nombre del solicitante.
   */
  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }
  /**
   * Establece el primer apellido del solicitante.
   * @param apellidoPrimer Cadena que representa el primer apellido del solicitante.
   */
  public setApellidoPrimer(apellidoPrimer: string): void {
    this.update((state) => ({
      ...state,
      apellidoPrimer,
    }));
  }
  /**
   * Establece el segundo apellido del solicitante.
   * @param apellidoSegundo Cadena que representa el segundo apellido del solicitante.
   */
  public setApellidoSegundo(apellidoSegundo: string): void {
    this.update((state) => ({
      ...state,
      apellidoSegundo,
    }));
  }
  /**
   * Establece el número fiscal del solicitante.
   * @param numeroFiscal Cadena que representa el número fiscal del solicitante.
   */
  public setNumeroFiscal(numeroFiscal: string): void {
    this.update((state) => ({
      ...state,
      numeroFiscal,
    }));
  }
  /**
   * Establece la razón social.
   * @param razonSocial Cadena que representa la razón social.
   */
  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }
  /**
   * Establece la ciudad del solicitante.
   * @param ciudad Cadena que representa la ciudad del solicitante.
   */
  public setCiudad(ciudad: string): void {
    this.update((state) => ({
      ...state,
      ciudad,
    }));
  }
  /**
   * Establece la calle del solicitante.
   * @param calle Cadena que representa la calle del solicitante.
   */
  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }
  /**
   * Establece el número o letra de la dirección del solicitante.
   * @param numeroLetra Cadena que representa el número o letra de la dirección.
   */
  public setNumeroLetra(numeroLetra: string):void {
    this.update((state) => ({
      ...state,
      numeroLetra,
    }));
  }
  /**
   * Establece la lada del número telefónico.
   * @param lada Cadena que representa la lada.
   */
  public setLada(lada: string): void {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }
  /**
   * Establece el número telefónico.
   * @param telefono Cadena que representa el número telefónico.
   */
  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }
  /**
   * Establece el número de fax.
   * @param fax Cadena que representa el número de fax.
   */
  public setFax(fax: string): void {
    this.update((state) => ({
      ...state,
      fax,
    }));
  }
  /**
   * Establece el correo electrónico.
   * @param correoElectronico Cadena que representa el correo electrónico.
   */
  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }
  /**
   * Establece el catálogo de naciones.
   * @param nacion Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setNacion(nacion: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      nacion,
    }));
  }
  /**
   * Establece el catálogo de transportes.
   * @param transporte Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setTransporte(transporte: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      transporte,
    }));
  }
  /**
   * Establece el valor de la casilla de verificación.
   * @param casillaVerificacion Cadena que representa el valor de la casilla.
   */
  public setCheckbox(casillaVerificacion: string): void {
    this.update((state) => ({
      ...state,
      casillaVerificacion,
    }));
  }
  /**
   * Establece la ruta completa del trámite.
   * @param rutaCompleta Cadena que representa la ruta completa.
   */
  public setRutaCompleta(rutaCompleta: string): void {
    this.update((_state) => ({
      ...this.getValue(),
      rutaCompleta,
    }));
  }
  /**
  * Establece el puerto de embarque.
  * @param puertoEmbarque Cadena que representa el puerto de embarque.
  */
  public setPuertoEmbarque(puertoEmbarque: string): void {
    this.update((state) => ({
      ...state,
      puertoEmbarque,
    }));
  }
  /**
     * Establece el puerto de desembarque.
     * @param puertoDesembarque Cadena que representa el puerto de desembarque.
     */
  public setPuertoDesembarque(puertoDesembarque: string):void {
    this.update((state) => ({
      ...state,
      puertoDesembarque,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud():void {
    this.reset();
  }
}
