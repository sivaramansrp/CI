import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
}
/**
 * Estado inicial para la interfaz del trámite 110221.
 */
export interface Solicitud110221State {
  tercerOperador: boolean;
  tratado: Catalogo[] | null;
  pais: Catalogo[] | null;
  fraccionArancelaria: string;
  numeroRegistro: string;
  nombreComercial: string;
  fechaInicial: string;
  fechaFinal: string;
  archivo: string;
  observaciones: string;
  presica: string;
  presenta: string;
  idioma: Catalogo[] | null;
  entidad: Catalogo[] | null;
  representacion: Catalogo[] | null;
  nombre: string;
  apellidoPrimer: string;
  apellidoSegundo: string;
  numeroFiscal: string;
  razonSocial: string;
  ciudad: string;
  calle: string;
  numeroLetra: string;
  lada: string;
  telefono: string;
  fax: string;
  correoElectronico: string;
  nacion: Catalogo[] | null;
  transporte: Catalogo[] | null;
  fraccionMercanciaArancelaria: string;
  nombreTecnico: string;
  nombreEnIngles: string;
  criterioParaConferir: string;
  marca: string;
  cantidad: string;
  umc: Catalogo[] | null;
  valorDelaMercancia: string;
  complementoDelaDescripcion: string;
  masaBruta: string;
  nombreComercialDelaMercancia: string;
  unidadMedida: Catalogo[] | null;
  tipoFactura: Catalogo[] | null;
  fecha: string;
  numeroFactura: string;
  justificacion: string;
  casillaVerificacion: string;
}
/**
 * Crea el estado inicial para la solicitud del trámite 110221.
 * @returns Estado inicial de tipo `Solicitud110221State`.
 */
export function createInitialState(): Solicitud110221State {
  return {
    tercerOperador: false,
    tratado: null,
    pais: null,
    fraccionArancelaria: '',
    numeroRegistro: '',
    nombreComercial: '',
    fechaInicial: '',
    fechaFinal: '',
    archivo: '',
    observaciones: '',
    presica: '',
    presenta: '',
    idioma: null,
    entidad: null,
    representacion: null,
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
    nacion: null,
    transporte: null,
    fraccionMercanciaArancelaria: '',
    nombreTecnico: '',
    nombreEnIngles: '',
    criterioParaConferir: '',
    marca: '',
    cantidad: '',
    umc: null,
    valorDelaMercancia: '',
    complementoDelaDescripcion: '',
    masaBruta: '',
    nombreComercialDelaMercancia: '',
    unidadMedida: null,
    tipoFactura: null,
    fecha: '',
    numeroFactura: '',
    justificacion: '',
    casillaVerificacion: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110221', resettable: true })
export class Tramite110221Store extends Store<Solicitud110221State> {
  constructor() {
    super(createInitialState());
  }
  public setTercerOperador(tercerOperador: boolean) {
    this.update((state) => ({
      ...state,
      tercerOperador,
    }));
  }
  /**
   * Establece el catálogo de tratados.
   * @param tratado Lista de objetos de tipo `Catalogo`.
   */
  public setTratado(tratado: Catalogo[]) {
    this.update((state) => ({
      ...state,
      tratado,
    }));
  }
  /**
   * Establece el catálogo de países.
   * @param pais Lista de objetos de tipo `Catalogo`.
   */
  public setPais(pais: Catalogo[]) {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }
  /**
   * Establece la fracción arancelaria.
   * @param fraccionArancelaria Cadena que representa la fracción arancelaria.
   */
  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }
  /**
   * Establece la fracción arancelaria de la mercancía.
   * @param fraccionMercanciaArancelaria Cadena que representa la fracción arancelaria de la mercancía.
   */
  public setfraccionMercanArancelaria(fraccionMercanciaArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionMercanciaArancelaria,
    }));
  }
  /**
   * Establece el nombre técnico de la mercancía.
   * @param nombreTecnico Cadena que representa el nombre técnico.
   */
  public setnombretecnico(nombreTecnico: string) {
    this.update((state) => ({
      ...state,
      nombreTecnico,
    }));
  }
  /**
   * Establece el nombre en inglés de la mercancía.
   * @param nombreEnIngles Cadena que representa el nombre en inglés.
   */
  public setnomreeningles(nombreEnIngles: string) {
    this.update((state) => ({
      ...state,
      nombreEnIngles,
    }));
  }
  /**
   * Establece el criterio para conferir origen.
   * @param criterioParaConferir Cadena que representa el criterio para conferir origen.
   */
  public setcriterioparaconferir(criterioParaConferir: string) {
    this.update((state) => ({
      ...state,
      criterioParaConferir,
    }));
  }
  /**
   * Establece la marca de la mercancía.
   * @param marca Cadena que representa la marca.
   */
  public setmarca(marca: string) {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }
  /**
   * Establece la cantidad de la mercancía.
   * @param cantidad Cadena que representa la cantidad.
   */
  public setcantidad(cantidad: string) {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  }
  /**
   * Establece el catálogo de unidades de medida comercial (UMC).
   * @param umc Lista de objetos de tipo `Catalogo`.
   */
  public setUMC(umc: Catalogo[]) {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }
  /**
   * Establece el catálogo de unidades de medida.
   * @param unidadMedida Lista de objetos de tipo `Catalogo`.
   */
  public setUnidadMedida(unidadMedida: Catalogo[]) {
    this.update((state) => ({
      ...state,
      unidadMedida,
    }));
  }
  /**
   * Establece el catálogo de tipos de factura.
   * @param tipoFactura Lista de objetos de tipo `Catalogo`.
   */
  public setTipoFactura(tipoFactura: Catalogo[]) {
    this.update((state) => ({
      ...state,
      tipoFactura,
    }));
  }
  /**
   * Establece la fecha de la factura.
   * @param fecha Cadena que representa la fecha.
   */
  public setFecha(fecha: string) {
    this.update((state) => ({
      ...state,
      fecha,
    }));
  }
  /**
   * Establece el número de factura.
   * @param numeroFactura Cadena que representa el número de factura.
   */
  public setNFactura(numeroFactura: string) {
    this.update((state) => ({
      ...state,
      numeroFactura,
    }));
  }
  /**
   * Establece la justificación.
   * @param justificacion Cadena que representa la justificación.
   */
  public setJustificacion(justificacion: string) {
    this.update((state) => ({
      ...state,
      justificacion,
    }));
  }
  /**
   * Establece el catálogo de transporte.
   * @param valorDelaMercancia Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setvalordelamercancia(valorDelaMercancia: string) {
    this.update((state) => ({
      ...state,
      valorDelaMercancia,
    }));
  }
  /**
   * Establece el valor de la casilla de verificación.
   * @param complementoDelaDescripcion Cadena que representa el valor de la casilla.
   */
  public setcomplementodeladescripcion(complementoDelaDescripcion: string) {
    this.update((state) => ({
      ...state,
      complementoDelaDescripcion,
    }));
  }
  /**
   * Establece el valor de la masa bruta de la mercancía.
   * @param masaBruta Cadena que representa la masa bruta.
   */
  public setmasabruta(masaBruta: string) {
    this.update((state) => ({
      ...state,
      masaBruta,
    }));
  }
  /**
   * Establece el nombre comercial de la mercancía.
   * @param nombreComercialDelaMercancia Cadena que representa el nombre comercial de la mercancía.
   */
  public setnombrecomercialdelamercancia(nombreComercialDelaMercancia: string) {
    this.update((state) => ({
      ...state,
      nombreComercialDelaMercancia,
    }));
  }
  /**
   * Establece el número de registro.
   * @param numeroRegistro Cadena que representa el número de registro.
   */
  public setNumRegistro(numeroRegistro: string) {
    this.update((state) => ({
      ...state,
      numeroRegistro,
    }));
  }
  /**
   * Establece el nombre comercial.
   * @param nombreComercial Cadena que representa el nombre comercial.
   */
  public setNomComercial(nombreComercial: string) {
    this.update((state) => ({
      ...state,
      nombreComercial,
    }));
  }
  /**
   * Establece la fecha de inicio del bloque.
   * @param fechaInicial Cadena que representa la fecha de inicio del bloque.
   */
  public setFechInicioB(fechaInicial: string) {
    this.update((state) => ({
      ...state,
      fechaInicial,
    }));
  }
  /**
   * Establece la fecha de fin del bloque.
   * @param fechaFinal Cadena que representa la fecha de fin del bloque.
   */
  public setFechFinB(fechaFinal: string) {
    this.update((state) => ({
      ...state,
      fechaFinal,
    }));
  }
  /**
   * Establece el archivo adjunto.
   * @param archivo Cadena que representa el archivo adjunto.
   */
  public setArchivo(archivo: string) {
    this.update((state) => ({
      ...state,
      archivo,
    }));
  }
  /**
   * Establece las observaciones.
   * @param observaciones Cadena que representa las observaciones.
   */
  public setObservaciones(observaciones: string) {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }
  /**
   * Establece el valor de presica.
   * @param presica Cadena que representa el valor de presica.
   */
  public setPresica(presica: string) {
    this.update((state) => ({
      ...state,
      presica,
    }));
  }
  /**
   * Establece el valor de presenta.
   * @param presenta Cadena que representa el valor de presenta.
   */
  public setPresenta(presenta: string) {
    this.update((state) => ({
      ...state,
      presenta,
    }));
  }
  /**
   * Establece el catálogo de idiomas.
   * @param idioma Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setIdioma(idioma: Catalogo[] | null) {
    this.update((state) => ({
      ...state,
      idioma,
    }));
  }
  /**
   * Establece el catálogo de entidades.
   * @param entidad Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setEntidad(entidad: Catalogo[] | null) {
    this.update((state) => ({
      ...state,
      entidad,
    }));
  }
  /**
   * Establece el catálogo de representaciones.
   * @param representacion Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setRepresentacion(representacion: Catalogo[] | null) {
    this.update((state) => ({
      ...state,
      representacion,
    }));
  }
  /**
   * Establece el nombre del solicitante.
   * @param nombre Cadena que representa el nombre del solicitante.
   */
  public setNombre(nombre: string) {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }
  /**
   * Establece el primer apellido del solicitante.
   * @param apellidoPrimer Cadena que representa el primer apellido del solicitante.
   */
  public setApellidoPrimer(apellidoPrimer: string) {
    this.update((state) => ({
      ...state,
      apellidoPrimer,
    }));
  }
  /**
   * Establece el segundo apellido del solicitante.
   * @param apellidoSegundo Cadena que representa el segundo apellido del solicitante.
   */
  public setApellidoSegundo(apellidoSegundo: string) {
    this.update((state) => ({
      ...state,
      apellidoSegundo,
    }));
  }
  /**
   * Establece el número fiscal del solicitante.
   * @param numeroFiscal Cadena que representa el número fiscal del solicitante.
   */
  public setNumeroFiscal(numeroFiscal: string) {
    this.update((state) => ({
      ...state,
      numeroFiscal,
    }));
  }
  /**
   * Establece la razón social.
   * @param razonSocial Cadena que representa la razón social.
   */
  public setRazonSocial(razonSocial: string) {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }
  /**
   * Establece la ciudad del solicitante.
   * @param ciudad Cadena que representa la ciudad del solicitante.
   */
  public setCiudad(ciudad: string) {
    this.update((state) => ({
      ...state,
      ciudad,
    }));
  }
  /**
   * Establece la calle del solicitante.
   * @param calle Cadena que representa la calle del solicitante.
   */
  public setCalle(calle: string) {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }
  /**
   * Establece el número o letra de la dirección del solicitante.
   * @param numeroLetra Cadena que representa el número o letra de la dirección.
   */
  public setNumeroLetra(numeroLetra: string) {
    this.update((state) => ({
      ...state,
      numeroLetra,
    }));
  }
  /**
   * Establece la lada del número telefónico.
   * @param lada Cadena que representa la lada.
   */
  public setLada(lada: string) {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }
  /**
   * Establece el número telefónico.
   * @param telefono Cadena que representa el número telefónico.
   */
  public setTelefono(telefono: string) {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }
  /**
   * Establece el número de fax.
   * @param fax Cadena que representa el número de fax.
   */
  public setFax(fax: string) {
    this.update((state) => ({
      ...state,
      fax,
    }));
  }
  /**
   * Establece el correo electrónico.
   * @param correoElectronico Cadena que representa el correo electrónico.
   */
  public setCorreoElectronico(correoElectronico: string) {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }
  /**
   * Establece el catálogo de naciones.
   * @param nacion Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setNacion(nacion: Catalogo[] | null) {
    this.update((state) => ({
      ...state,
      nacion,
    }));
  }
  /**
   * Establece el catálogo de transportes.
   * @param transporte Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setTransporte(transporte: Catalogo[] | null) {
    this.update((state) => ({
      ...state,
      transporte,
    }));
  }
  /**
   * Establece el valor de la casilla de verificación.
   * @param casillaVerificacion Cadena que representa el valor de la casilla.
   */
  public setCheckbox(casillaVerificacion: string) {
    this.update((state) => ({
      ...state,
      casillaVerificacion,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
