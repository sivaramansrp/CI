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
  tratado: string | null;
  pais: string | null;
  fraccionArancelaria: string;
  numeroRegistro: string;
  nombreComercial: string;
  fechaInicial: string;
  fechaFinal: string;
  archivo: string;
  observaciones: string;
  presica: string;
  presenta: string;
  idioma: string | null;
  entidad: string | null;
  representacion: string | null;
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
  nacion: string | null;
  transporte: string | null;
  fraccionMercanciaArancelaria: string;
  nombreTecnico: string;
  nombreEnIngles: string;
  criterioParaConferir: string;
  marca: string;
  cantidad: string;
  umc: string | null;
  valorDelaMercancia: string;
  complementoDelaDescripcion: string;
  masaBruta: string;
  nombreComercialDelaMercancia: string;
  unidadMedida: string | null;
  tipoFactura: string | null;
  fecha: string;
  numeroFactura: string;
  justificacion: string;
  casillaVerificacion: string;
  formulario: {
    datosConfidencialesProductor: '';
    productorMismoExportador: '';
  };
  agregarDatosProductorFormulario: { [key: string]: unknown };
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
    formulario: {
      datosConfidencialesProductor: '',
      productorMismoExportador: '',
    },
    agregarDatosProductorFormulario: {},
  };
}

/**
 * Store para manejar el estado del trámite 110221.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110221', resettable: true })
export class Tramite110221Store extends Store<Solicitud110221State> {
  /**
   * Constructor del store.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el valor de tercer operador.
   * @param tercerOperador Valor booleano para tercer operador.
   */
  public setTercerOperador(tercerOperador: boolean): void {
    this.update((state) => ({
      ...state,
      tercerOperador,
    }));
  }

  /**
   * Establece el tratado seleccionado.
   * @param tratado Tratado seleccionado o nulo.
   */
  public setTratado(tratado: string | null): void {
    this.update((state) => ({
      ...state,
      tratado,
    }));
  }

  /**
   * Establece el país seleccionado.
   * @param pais País seleccionado o nulo.
   */
  public setPais(pais: string | null): void {
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
  public setfraccionMercanArancelaria(
    fraccionMercanciaArancelaria: string
  ): void {
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
   * Establece la unidad de medida comercial (UMC).
   * @param umc UMC seleccionada o nula.
   */
  public setUMC(umc: string | null): void {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }

  /**
   * Establece la unidad de medida.
   * @param unidadMedida Unidad de medida seleccionada o nula.
   */
  public setUnidadMedida(unidadMedida: string | null): void {
    this.update((state) => ({
      ...state,
      unidadMedida,
    }));
  }

  /**
   * Establece el tipo de factura.
   * @param tipoFactura Tipo de factura seleccionado o nulo.
   */
  public setTipoFactura(tipoFactura: string | null): void {
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
   * Establece el valor de la mercancía.
   * @param valorDelaMercancia Valor de la mercancía.
   */
  public setvalordelamercancia(valorDelaMercancia: string): void {
    this.update((state) => ({
      ...state,
      valorDelaMercancia,
    }));
  }

  /**
   * Establece el complemento de la descripción.
   * @param complementoDelaDescripcion Complemento de la descripción.
   */
  public setcomplementodeladescripcion(
    complementoDelaDescripcion: string
  ): void {
    this.update((state) => ({
      ...state,
      complementoDelaDescripcion,
    }));
  }

  /**
   * Establece la masa bruta de la mercancía.
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
  public setnombrecomercialdelamercancia(
    nombreComercialDelaMercancia: string
  ): void {
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
   * Establece el idioma seleccionado.
   * @param idioma Idioma seleccionado o nulo.
   */
  public setIdioma(idioma: string | null): void {
    this.update((state) => ({
      ...state,
      idioma,
    }));
  }

  /**
   * Establece la entidad seleccionada.
   * @param entidad Entidad seleccionada o nula.
   */
  public setEntidad(entidad: string | null): void {
    this.update((state) => ({
      ...state,
      entidad,
    }));
  }

  /**
   * Establece la representación seleccionada.
   * @param representacion Representación seleccionada o nula.
   */
  public setRepresentacion(representacion: string | null): void {
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
  public setNumeroLetra(numeroLetra: string): void {
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
   * Establece la nación seleccionada.
   * @param nacion Nación seleccionada o nula.
   */
  public setNacion(nacion: string | null): void {
    this.update((state) => ({
      ...state,
      nacion,
    }));
  }

  /**
   * Establece el transporte seleccionado.
   * @param transporte Transporte seleccionado o nulo.
   */
  public setTransporte(transporte: string | null): void {
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
   * Limpia los datos de la solicitud.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }

  /**
   * @descripcion
   * Actualiza los datos del formulario de productor.
   * @param values - Valores a actualizar en el formulario.
   */
  setAgregarFormDatosProductor(values: { [key: string]: unknown }): void {
    this.update((state) => ({
      agregarDatosProductorFormulario: {
        ...state.agregarDatosProductorFormulario,
        ...values,
      },
    }));
  }
  /**
   * @descripcion
   * Actualiza los datos del formulario histórico.
   * @param values - Valores a actualizar en el formulario.
   */
  setFormHistorico(values: { [key: string]: unknown }): void {
    this.update((state) => ({
      formulario: {
        ...state.formulario,
        ...values,
      },
    }));
  }
}
