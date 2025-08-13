import { Store, StoreConfig } from '@datorama/akita';
import { AgregarDatosProductorFormulario } from '../../tramites/110223/models/certificado-origen.model';
import { Injectable } from '@angular/core';

/** CONSTANTES PARA VALORES PREDEFINIDOS */
const VALOR_POR_DEFECTO = '';
const VALOR_NULO = null;

/**
 * Representa un catálogo con un identificador y una descripción.
 */
export interface Catalogo {
  id: number;
  descripcion: string;
}

/**
 * Estado inicial para la interfaz del trámite 110223.
 */
export interface Solicitud110223State {
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
  numeroDeRegistroFiscal: string;
  telefono: string;
  fax: string;
  correoElectronico: string;
  nacion: string | null;
  transporte: string | null;
  fraccionMercanciaArancelaria: string;
  nombreTecnico: string;
  valorContenidoRegional: string;
  otrasInstancias: string;
  criterioParaPreferencial: string;
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
  casillaVerificacion: boolean;
  numeroSerie: string;
  datosConfidencialesProductor: boolean;
  productorMismoExportador: boolean;
  agregarDatosProductorFormulario: AgregarDatosProductorFormulario;
  lugar: string;
  nombreRepresentanteLegalExportador: string;
  empresa: string;
  cargo: string;
}

/**
 * Crea el estado inicial para la solicitud del trámite 110223.
 * @returns Estado inicial de tipo `Solicitud110223State`.
 */
export function createInitialState(): Solicitud110223State {
  return {
    cargo: VALOR_POR_DEFECTO,
    empresa: VALOR_POR_DEFECTO,
    lugar: VALOR_POR_DEFECTO,
    nombreRepresentanteLegalExportador: VALOR_POR_DEFECTO,
    tercerOperador: false,
    tratado: VALOR_NULO,
    pais: VALOR_NULO,
    fraccionArancelaria: VALOR_POR_DEFECTO,
    numeroRegistro: VALOR_POR_DEFECTO,
    nombreComercial: VALOR_POR_DEFECTO,
    fechaInicial: VALOR_POR_DEFECTO,
    fechaFinal: VALOR_POR_DEFECTO,
    archivo: VALOR_POR_DEFECTO,
    observaciones: VALOR_POR_DEFECTO,
    presica: VALOR_POR_DEFECTO,
    presenta: VALOR_POR_DEFECTO,
    idioma: VALOR_NULO,
    entidad: VALOR_NULO,
    representacion: VALOR_NULO,
    nombre: VALOR_POR_DEFECTO,
    apellidoPrimer: VALOR_POR_DEFECTO,
    apellidoSegundo: VALOR_POR_DEFECTO,
    numeroFiscal: VALOR_POR_DEFECTO,
    razonSocial: VALOR_POR_DEFECTO,
    ciudad: VALOR_POR_DEFECTO,
    calle: VALOR_POR_DEFECTO,
    numeroLetra: VALOR_POR_DEFECTO,
    lada: VALOR_POR_DEFECTO,
    numeroDeRegistroFiscal: VALOR_POR_DEFECTO,
    telefono: VALOR_POR_DEFECTO,
    fax: VALOR_POR_DEFECTO,
    correoElectronico: VALOR_POR_DEFECTO,
    nacion: VALOR_NULO,
    transporte: VALOR_NULO,
    fraccionMercanciaArancelaria: VALOR_POR_DEFECTO,
    nombreTecnico: VALOR_POR_DEFECTO,
    valorContenidoRegional: VALOR_POR_DEFECTO,
    otrasInstancias: VALOR_POR_DEFECTO,
    criterioParaPreferencial: VALOR_POR_DEFECTO,
    marca: VALOR_POR_DEFECTO,
    cantidad: VALOR_POR_DEFECTO,
    umc: VALOR_NULO,
    valorDelaMercancia: VALOR_POR_DEFECTO,
    complementoDelaDescripcion: VALOR_POR_DEFECTO,
    masaBruta: VALOR_POR_DEFECTO,
    nombreComercialDelaMercancia: VALOR_POR_DEFECTO,
    unidadMedida: VALOR_NULO,
    tipoFactura: VALOR_NULO,
    fecha: VALOR_POR_DEFECTO,
    numeroFactura: VALOR_POR_DEFECTO,
    justificacion: VALOR_POR_DEFECTO,
    casillaVerificacion: true,
    numeroSerie: VALOR_POR_DEFECTO,
    datosConfidencialesProductor: false,
    productorMismoExportador: false,
    agregarDatosProductorFormulario: {
      numeroRegistroFiscal: '',
      fax: '',
    },
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110223', resettable: true })
export class Tramite110223Store extends Store<Solicitud110223State> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el lugar.
   * @param lugar Cadena que representa el lugar.
   */
  public setLugar(lugar: string): void {
    this.update((state) => ({
      ...state,
      lugar,
    }));
  }

  /**
   * Establece el nombre del representante legal exportador.
   * @param nombreRepresentanteLegalExportador Cadena que representa el nombre del representante legal exportador.
   */
  public setNombreRepresentanteLegalExportador(
    nombreRepresentanteLegalExportador: string
  ): void {
    this.update((state) => ({
      ...state,
      nombreRepresentanteLegalExportador,
    }));
  }

  /**
   * Establece la empresa.
   * @param empresa Cadena que representa la empresa.
   */
  public setEmpresaNombre(empresa: string): void {
    this.update((state) => ({
      ...state,
      empresa,
    }));
  }

  /**
   * Establece el cargo.
   * @param cargo Cadena que representa el cargo.
   */
  public setCargo(cargo: string): void {
    this.update((state) => ({
      ...state,
      cargo,
    }));
  }

  /**
   * Establece el estado del tercer operador.
   * @param tercerOperador Valor booleano que indica si es tercer operador.
   */
  public setTercerOperador(tercerOperador: boolean): void {
    this.update((state) => ({
      ...state,
      tercerOperador,
    }));
  }

  /**
   * Establece el catálogo de tratados.
   * @param tratado Lista de objetos de tipo `Catalogo`.
   */
  public setTratado(tratado: string | null): void {
    this.update((state) => ({
      ...state,
      tratado,
    }));
  }

  /**
   * Establece el catálogo de países.
   * @param pais Lista de objetos de tipo `Catalogo`.
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
   * Establece el valor de contenido regional.
   * @param valorContenidoRegional Cadena que representa el valor de contenido regional.
   */
  public setvalorContenidoRegional(valorContenidoRegional: string): void {
    this.update((state) => ({
      ...state,
      valorContenidoRegional,
    }));
  }

  /**
   * Establece otras instancias.
   * @param otrasInstancias Cadena que representa otras instancias.
   */
  public setotrasInstancias(otrasInstancias: string): void {
    this.update((state) => ({
      ...state,
      otrasInstancias,
    }));
  }

  /**
   * Establece el criterio para preferencial.
   * @param criterioParaPreferencial Cadena que representa el criterio para preferencial.
   */
  public setcriterioparapreferencial(criterioParaPreferencial: string): void {
    this.update((state) => ({
      ...state,
      criterioParaPreferencial,
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
  public setUMC(umc: string | null): void {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }

  /**
   * Establece el catálogo de unidades de medida.
   * @param unidadMedida Lista de objetos de tipo `Catalogo`.
   */
  public setUnidadMedida(unidadMedida: string | null): void {
    this.update((state) => ({
      ...state,
      unidadMedida,
    }));
  }

  /**
   * Establece el catálogo de tipos de factura.
   * @param tipoFactura Lista de objetos de tipo `Catalogo`.
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
   * Establece el número de serie.
   * @param numeroSerie Cadena que representa el número de serie.
   */
  public setnumeroSerie(numeroSerie: string): void {
    this.update((state) => ({
      ...state,
      numeroSerie,
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
   * @param valorDelaMercancia Cadena que representa el valor de la mercancía.
   */
  public setvalordelamercancia(valorDelaMercancia: string): void {
    this.update((state) => ({
      ...state,
      valorDelaMercancia,
    }));
  }

  /**
   * Establece el complemento de la descripción.
   * @param complementoDelaDescripcion Cadena que representa el complemento de la descripción.
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
   * Establece el catálogo de idiomas.
   * @param idioma Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setIdioma(idioma: string | null): void {
    this.update((state) => ({
      ...state,
      idioma,
    }));
  }

  /**
   * Establece el catálogo de entidades.
   * @param entidad Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setEntidad(entidad: string | null): void {
    this.update((state) => ({
      ...state,
      entidad,
    }));
  }

  /**
   * Establece el catálogo de representaciones.
   * @param representacion Lista de objetos de tipo `Catalogo` o `null`.
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
   * Establece el número de registro fiscal.
   * @param numeroDeRegistroFiscal Cadena que representa el número de registro fiscal.
   */
  public setnumeroDeRegistroFiscal(numeroDeRegistroFiscal: string): void {
    this.update((state) => ({
      ...state,
      numeroDeRegistroFiscal,
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
  public setNacion(nacion: string | null): void {
    this.update((state) => ({
      ...state,
      nacion,
    }));
  }

  /**
   * Establece el catálogo de transportes.
   * @param transporte Lista de objetos de tipo `Catalogo` o `null`.
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
  public setCheckbox(casillaVerificacion: boolean): void {
    this.update((state) => ({
      ...state,
      casillaVerificacion,
    }));
  }

  /**
   * Actualiza si los datos del productor son confidenciales.
   *
   * Este método permite establecer si los datos del productor son confidenciales.
   *
   * @param {boolean} datosConfidencialesProductor - Valor booleano que indica si los datos son confidenciales.
   */
  public setDatosConfidencialesProductor(
    datosConfidencialesProductor: boolean
  ): void {
    this.update((state) => ({
      ...state,
      datosConfidencialesProductor,
    }));
  }

  /**
   * Actualiza el número de registro fiscal del productor en el formulario de agregar datos.
   *
   * Este método permite establecer el número de registro fiscal en el formulario de agregar datos del productor.
   *
   * @param {string} numeroRegistroFiscal - El número de registro fiscal a establecer.
   */
  public setAgregarDatosProductorNumeroRegistroFiscal(
    numeroRegistroFiscal: string
  ): void {
    this.update((state) => ({
      ...state,
      agregarDatosProductorFormulario: {
        ...state.agregarDatosProductorFormulario,
        numeroRegistroFiscal,
      },
    }));
  }

  /**
   * Actualiza si el productor es el mismo que el exportador.
   *
   * Este método permite establecer si el productor es el mismo que el exportador.
   *
   * @param {boolean} productorMismoExportador - Valor booleano que indica si el productor es el mismo que el exportador.
   */
  public setProductorMismoExportador(productorMismoExportador: boolean): void {
    this.update((state) => ({
      ...state,
      productorMismoExportador,
    }));
  }
  /**
   * Actualiza el fax del productor en el formulario de agregar datos.
   *
   * Este método permite establecer el valor del fax en el formulario de agregar datos del productor.
   *
   * @param {string} fax - El número de fax a establecer.
   */
  public setAgregarDatosProductorFax(fax: string): void {
    this.update((state) => ({
      ...state,
      agregarDatosProductorFormulario: {
        ...state.agregarDatosProductorFormulario,
        fax,
      },
    }));
  }

  /**
   * Limpia los datos de la solicitud.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
