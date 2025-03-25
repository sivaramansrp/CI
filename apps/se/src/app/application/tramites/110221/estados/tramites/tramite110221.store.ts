import {
    Personas,
    ResponsablesDespacho,
  } from '@ng-mf/data-access-user';
  
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
   * Creacion del estado inicial para la interfaz de tramite 110221
   * @returns Solicitud110221
   */
  export interface Solicitud110221State {
    idSolicitud: string;
    tipoSolicitud: string;
    rfcImportExport: string;
    nombreImportExport: string;
    nroRegistro: string;
    programaFomento: string;
    immex: string;
    immexValue: string;
    industriaAutomotriz: string;
    tipoEmpresaCertificada: string;
    idSocioComercial: string;
    socioComercial: boolean;
    opEconomicoAut: boolean;
    revisionOrigen: boolean;
    fechaInicio: string;
    horaInicio: string;
    fechaFinal: string;
    horaFinal: string;
    fechasSeleccionadas: string[];
    despacho: string;
    rfcAutorizacion: string;
    ddexAutorizacion: string;
    idAduana: string;
    descripcionAduana: string;
    idSeccionAduanera: string;
    seccionAduanera: string;
    nombreRecinto: string;
    tipoDespacho: string;
    tipoOperacion: string;
    patente: string;
    relacionSociedad: boolean;
    encargoConferido: boolean;
    domicilio: string;
    paisOrigen: number;
    paisProcedencia: number;
    descripcion: string;
    idPedimento: number;
    patentePedimento: number;
    pedimento: string;
    aduana: number;
    tipoPedimento: string;
    numero: number;
    comprobanteValor: string;
    pedimentoValidado: boolean;
    personasResponsablesDespacho: ResponsablesDespacho[];  
    montoPagar: string;
    lineaCaptura: string;
    montoModal: string;  
    tercerosRelacionados: Personas[];

    
    //110221
    tercerOperador: boolean;
      tratado: Catalogo[] | null;
      pais: Catalogo[] | null;
      fraccionArancelaria: string;
      numeroRegistro: string;
      nombreComercial: string;
      fechaInicioB: string;
      fechFinB: string;
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
      fraccionMercanArancelaria: string;
      nombretecnico: string;
      nombreEnIngles: string;
      criterioparaconferir: string;
      marca: string;
      cantidad: string;
      umc: Catalogo[] | null;
      valordelamercancia: string;
      complementodeladescripcion: string;
      masabruta: string;
      nombrecomercialdelamercancia: string;
      unidadMedida: Catalogo[] | null;
      tipoFactura: Catalogo[] | null;
      fecha: string;
      nFactura: string;
      justificacion: string;
      casillaVerificacion: string;
  }
  
  export function createInitialState(): Solicitud110221State {
    return {
      idSolicitud: '',
      tipoSolicitud: '',
      rfcImportExport: '',
      nombreImportExport: '',
      nroRegistro: '',
      programaFomento: '',
      immex: '',
      immexValue: '',
      industriaAutomotriz: '',
      tipoEmpresaCertificada: '',
      idSocioComercial: '',
      socioComercial: false,
      opEconomicoAut: false,
      revisionOrigen: false,
      fechaInicio: '',
      horaInicio: '',
      fechaFinal: '',
      horaFinal: '',
      fechasSeleccionadas: [],
      despacho: '',
      rfcAutorizacion: '',
      ddexAutorizacion: '',
      idAduana: '',
      descripcionAduana: '',
      idSeccionAduanera: '',
      seccionAduanera: '',
      nombreRecinto: '',
      tipoDespacho: '',
      tipoOperacion: '',
      patente: '',
      relacionSociedad: false,
      encargoConferido: false,
      domicilio: '',
      paisOrigen: 0,
      paisProcedencia: 0,
      descripcion: '',
      idPedimento: 0,
      patentePedimento: 0,
      pedimento: '',
      aduana: 0,
      tipoPedimento: '',
      numero: 0,
      comprobanteValor: '',
      pedimentoValidado: false,
      personasResponsablesDespacho: [],
      montoPagar: '',
      lineaCaptura: '',
      montoModal: '',
      tercerosRelacionados: [],

      //110221
      tercerOperador: false,
      tratado: null,
      pais: null,
      fraccionArancelaria: '',
      numeroRegistro: '',
      nombreComercial: '',
      fechaInicioB: '',
      fechFinB: '',
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
      fraccionMercanArancelaria: '',
      nombretecnico: '',
      nombreEnIngles: '',
      criterioparaconferir: '',
      marca: '',
      cantidad: '',
      umc: null,
      valordelamercancia: '',
      complementodeladescripcion: '',
      masabruta: '',
      nombrecomercialdelamercancia: '',
      unidadMedida: null,
      tipoFactura: null,
      fecha: '',
      nFactura: '',
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
  
    /**
     * Guarda el tipo de solicitud en el estado.
     *
     * @param tipoSolicitud - El tipo de solicitud que se va a guardar.
     */
    public setTipoSolicitud(tipoSolicitud: string) {
      this.update((state) => ({
        ...state,
        tipoSolicitud,
      }));
    }
  
    public setRfcImportExport(rfcImportExport: string) {
      this.update((state) => ({
        ...state,
        rfcImportExport,
      }));
    }
  
    public setNombreImportExport(nombreImportExport: string) {
      this.update((state) => ({
        ...state,
        nombreImportExport,
      }));
    }
  
    public setNroRegistro(nroRegistro: string) {
      this.update((state) => ({
        ...state,
        nroRegistro,
      }));
    }
  
    public setProgramaFomento(programaFomento: string) {
      this.update((state) => ({
        ...state,
        programaFomento,
      }));
    }
  
    public setImmex(immex: string) {
      this.update((state) => ({
        ...state,
        immex,
      }));
    }
  
    public setImmexValue(immexValue: string) {
      this.update((state) => ({
        ...state,
        immexValue,
      }));
    }
  
    public setIndustriaAutomotriz(industriaAutomotriz: string) {
      this.update((state) => ({
        ...state,
        industriaAutomotriz,
      }));
    }
  
    public setTipoEmpresaCertificada(tipoEmpresaCertificada: string) {
      this.update((state) => ({
        ...state,
        tipoEmpresaCertificada,
      }));
    }
  
    public setIdSocioComercial(idSocioComercial: string) {
      this.update((state) => ({
        ...state,
        idSocioComercial,
      }));
    }
  
    public setSocioComercial(socioComercial: boolean) {
      this.update((state) => ({
        ...state,
        socioComercial,
      }));
    }
  
    public setOpEconomicoAut(opEconomicoAut: boolean) {
      this.update((state) => ({
        ...state,
        opEconomicoAut,
      }));
    }
  
    public setRevisionOrigen(revisionOrigen: boolean) {
      this.update((state) => ({
        ...state,
        revisionOrigen,
      }));
    }
  
    public setFechaInicio(fechaInicio: string) {
      this.update((state) => ({
        ...state,
        fechaInicio,
      }));
    }
  
    public setHoraInicio(horaInicio: string) {
      this.update((state) => ({
        ...state,
        horaInicio,
      }));
    }
  
    public setFechaFinal(fechaFinal: string) {
      this.update((state) => ({
        ...state,
        fechaFinal,
      }));
    }
  
    public setHoraFinal(horaFinal: string) {
      this.update((state) => ({
        ...state,
        horaFinal,
      }));
    }
  
    public setFechasSeleccionadas(fechasSeleccionadas: string[]) {
      this.update((state) => ({
        ...state,
        fechasSeleccionadas,
      }));
    }
  
    public setDespacho(despacho: string) {
      this.update((state) => ({
        ...state,
        despacho,
      }));
    }
  
    public setRfcAutorizacion(rfcAutorizacion: string) {
      this.update((state) => ({
        ...state,
        rfcAutorizacion,
      }));
    }
  
    public setDdexAutorizacion(ddexAutorizacion: string) {
      this.update((state) => ({
        ...state,
        ddexAutorizacion,
      }));
    }
  
    public setIdAduana(idAduana: string) {
      this.update((state) => ({
        ...state,
        idAduana,
      }));
    }
  
    public setDescripcionAduana(descripcionAduana: string) {
      this.update((state) => ({
        ...state,
        descripcionAduana,
      }));
    }
  
    public setIdSeccionAduanera(idSeccionAduanera: string) {
      this.update((state) => ({
        ...state,
        idSeccionAduanera,
      }));
    }
  
    public setSeccionAduanera(seccionAduanera: string) {
      this.update((state) => ({
        ...state,
        seccionAduanera,
      }));
    }
  
    public setNombreRecinto(nombreRecinto: string) {
      this.update((state) => ({
        ...state,
        nombreRecinto,
      }));
    }
  
    public setTipoDespacho(tipoDespacho: string) {
      this.update((state) => ({
        ...state,
        tipoDespacho,
      }));
    }
  
    public setTipoOperacion(tipoOperacion: string) {
      this.update((state) => ({
        ...state,
        tipoOperacion,
      }));
    }
  
    public setPatente(patente: string) {
      this.update((state) => ({
        ...state,
        patente,
      }));
    }
  
    public setRelacionSociedad(relacionSociedad: boolean) {
      this.update((state) => ({
        ...state,
        relacionSociedad,
      }));
    }
  
    public setEncargoConferido(encargoConferido: boolean) {
      this.update((state) => ({
        ...state,
        encargoConferido,
      }));
    }
  
    public setDomicilio(domicilio: string) {
      this.update((state) => ({
        ...state,
        domicilio,
      }));
    }
  
    public setPaisOrigen(paisOrigen: number) {
      this.update((state) => ({
        ...state,
        paisOrigen,
      }));
    }
  
    public setPaisProcedencia(paisProcedencia: number) {
      this.update((state) => ({
        ...state,
        paisProcedencia,
      }));
    }
  
    public setDescripcion(descripcion: string) {
      this.update((state) => ({
        ...state,
        descripcion,
      }));
    }
  
    public setidPedimento(idPedimento: number) {
      this.update((state) => ({
        ...state,
        idPedimento,
      }));
    }
  
    public setPatentePedimento(patentePedimento: number) {
      this.update((state) => ({
        ...state,
        patentePedimento,
      }));
    }
  
    public setPedimento(pedimento: string) {
      this.update((state) => ({
        ...state,
        pedimento,
      }));
    }
  
    public setAduana(aduana: number) {
      this.update((state) => ({
        ...state,
        aduana,
      }));
    }
  
    public setTipoPedimento(tipoPedimento: string) {
      this.update((state) => ({
        ...state,
        tipoPedimento,
      }));
    }
  
    public setNumero(numero: number) {
      this.update((state) => ({
        ...state,
        numero,
      }));
    }
  
    public setComprobanteValor(comprobanteValor: string) {
      this.update((state) => ({
        ...state,
        comprobanteValor,
      }));
    }
  
    public setPedimentoValidado(pedimentoValidado: boolean) {
      this.update((state) => ({
        ...state,
        pedimentoValidado,
      }));
    }
  
    public setPersonasResponsablesDespacho(
      personasResponsablesDespacho: ResponsablesDespacho[]
    ) {
      this.update((state) => ({
        ...state,
        personasResponsablesDespacho,
      }));
    }

  
    public setMontoPagar(montoPagar: string) {
      this.update((state) => ({
        ...state,
        montoPagar,
      }));
    }
  
    public setLineaCaptura(lineaCaptura: string) {
      this.update((state) => ({
        ...state,
        lineaCaptura,
      }));
    }
  
    public setMonto(montoModal: string) {
      this.update((state) => ({
        ...state,
        montoModal,
      }));
    }
  
    public setTercerosRelacionados(tercerosRelacionados: Personas[]) {
      this.update((state) => ({
        ...state,
        tercerosRelacionados,
      }));
    }

    //110221
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
   * @param fraccionMercanArancelaria Cadena que representa la fracción arancelaria de la mercancía.
   */
  public setfraccionMercanArancelaria(fraccionMercanArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionMercanArancelaria,
    }));
  }
 /**
   * Establece el nombre técnico de la mercancía.
   * @param nombretecnico Cadena que representa el nombre técnico.
   */
  public setnombretecnico(nombretecnico: string) {
    this.update((state) => ({
      ...state,
      nombretecnico,
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
   * @param criterioparaconferir Cadena que representa el criterio para conferir origen.
   */
  public setcriterioparaconferir(criterioparaconferir: string) {
    this.update((state) => ({
      ...state,
      criterioparaconferir,
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
   * @param nFactura Cadena que representa el número de factura.
   */
  public setNFactura(nFactura: string) {
    this.update((state) => ({
      ...state,
      nFactura,
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
   * @param valordelamercancia Lista de objetos de tipo `Catalogo` o `null`.
   */
  public setvalordelamercancia(valordelamercancia: string) {
    this.update((state) => ({
      ...state,
      valordelamercancia,
    }));
  }
 /**
   * Establece el valor de la casilla de verificación.
   * @param complementodeladescripcion Cadena que representa el valor de la casilla.
   */
  public setcomplementodeladescripcion(complementodeladescripcion: string) {
    this.update((state) => ({
      ...state,
      complementodeladescripcion,
    }));
  }
/**
 * Establece el valor de la masa bruta de la mercancía.
 * @param masabruta Cadena que representa la masa bruta.
 */
  public setmasabruta(masabruta: string) {
    this.update((state) => ({
      ...state,
      masabruta,
    }));
  }
/**
 * Establece el nombre comercial de la mercancía.
 * @param nombrecomercialdelamercancia Cadena que representa el nombre comercial de la mercancía.
 */
  public setnombrecomercialdelamercancia(nombrecomercialdelamercancia: string) {
    this.update((state) => ({
      ...state,
      nombrecomercialdelamercancia,
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
 * @param fechaInicioB Cadena que representa la fecha de inicio del bloque.
 */
  public setFechInicioB(fechaInicioB: string) {
    this.update((state) => ({
      ...state,
      fechaInicioB,
    }));
  }
/**
 * Establece la fecha de fin del bloque.
 * @param fechFinB Cadena que representa la fecha de fin del bloque.
 */
  public setFechFinB(fechFinB: string) {
    this.update((state) => ({
      ...state,
      fechFinB,
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
  