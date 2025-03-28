import { AgregarDatosProductorFormulario, GrupoDeDomicilio, GrupoOperador, GrupoTratado } from '../../tramites/110217/models/certificado-origen.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { GrupoDeDirecciones } from '../../tramites/110217/models/certificado-origen.model';
import { GrupoDeTransporte } from '../../tramites/110217/models/certificado-origen.model';
import { GrupoReceptor } from '../../tramites/110217/models/certificado-origen.model';
import { GrupoRepresentativo } from '../../tramites/110217/models/certificado-origen.model';
export interface Tramite110217State {
 
 
  observaciones: string;
  idioma: Catalogo | null;
  entidadFederativa: Catalogo | null;
  representacionFederal: Catalogo | null;
  datosConfidencialesProductor: boolean;
  productorMismoExportador: boolean
  agregarDatosProductorFormulario: AgregarDatosProductorFormulario;
  grupoReceptor: GrupoReceptor;
  grupoDeDirecciones: GrupoDeDirecciones;
  grupoRepresentativo: GrupoRepresentativo
  grupoDeTransporte: GrupoDeTransporte,
  grupoOperador: GrupoOperador;
  tercerOperador: boolean;
  grupoDeDomicilio:GrupoDeDomicilio;
  grupoTratado: GrupoTratado;

  //merciana
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
  fraccionMercanciaArancelaria: string;
  nombreTecnico: string;
  nombreEnIngles: string;
  criterioParaConferir: string;
  otrasInstancias: string;

}
  
export function createInitialState(): Tramite110217State {
  return {
    observaciones: '',
    idioma: null,
    entidadFederativa: null,
    representacionFederal: null,
    datosConfidencialesProductor: true,
    productorMismoExportador: true,
    agregarDatosProductorFormulario: {
      numeroRegistroFiscal: '',
      fax: ''
    },
    grupoReceptor: {
      nombre: '',
      apellidoPrimer: '',
      apellidoSegundo: '',
      numeroFiscal: '',
      razonSocial: '',
    },
    grupoDeDirecciones: {
      ciudad: '',
      calle: '',
      numeroLetra: '',
      lada: '',
      telefono: '',
      fax: '',
      correoElectronico: '',
    },
    grupoRepresentativo: {
      lugar: '',
      nombreExportador: '',
      empresa: '',
      cargo: '',
      lada: '',
      telefono: '',
      fax: '',
      correoElectronico: '',
    },
    grupoDeTransporte: {
      puertoEmbarque: '',
      puertoDesembarque: '',
      puertoTransito: '',
      nombreEmbarcacion: '',
      numeroVuelo: '',
    },
    tercerOperador:false,
    grupoOperador:{
      nombre: '',
      apellidoPrimer: '',
      apellidoSegundo: '',
      numeroFiscal: '',
      razonSocial: '',
    },

    grupoDeDomicilio: {
      ciudad: '',
      calle: '',
      numeroLetra: '',
      lada: '',
      telefono: '',
      fax: '',
      correoElectronico: '',
    },
    grupoTratado: {
      tratado: '',
      pais: '',
      fraccionArancelaria: '',
      numeroRegistro: '',
      nombreComercial: '',
      fechaFinalInput: '',
      fechaInicialInput: '',
    },

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
    fraccionMercanciaArancelaria: '',
    nombreTecnico: '',
    nombreEnIngles: '',
    criterioParaConferir: '',
    otrasInstancias: ''

  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite5701', resettable: true })
export class Tramite110217Store extends Store<Tramite110217State> {
  constructor() {
    super(createInitialState());
  }

  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }
  public setIdioma(idioma: Catalogo): void {
    this.update((state) => ({
      ...state,
      idioma,
    }));
  }
  public setEntidadFederativa(entidadFederativa: Catalogo): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }
  public setRepresentacionFederal(representacionFederal: Catalogo): void {
    this.update((state) => ({
      ...state,
      representacionFederal,
    }));
  }
  public setDatosConfidencialesProductor(datosConfidencialesProductor: boolean): void {
    this.update((state) => ({
      ...state,
      datosConfidencialesProductor,
    }));
  }
  public setProductorMismoExportador(productorMismoExportador: boolean): void {
    this.update((state) => ({
      ...state,
      productorMismoExportador,
    }));
  }
  public setAgregarDatosProductorFax(fax: string): void {
    this.update((state) => ({
      ...state,
      agregarDatosProductorFormulario: { ...state.agregarDatosProductorFormulario, fax },
    }));
  }
  public setAgregarDatosProductorNumeroRegistroFiscal(numeroRegistroFiscal: string): void {
    this.update((state) => ({
      ...state,
      agregarDatosProductorFormulario: { ...state.agregarDatosProductorFormulario, numeroRegistroFiscal },
    }));
  }
  public setGrupoReceptorNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      grupoReceptor: { ...state.grupoReceptor, nombre },
    }));
  }
  public setGrupoReceptorApellidoPrimer(apellidoPrimer: string): void {
    this.update((state) => ({
      ...state,
      grupoReceptor: { ...state.grupoReceptor, apellidoPrimer },
    }));
  }
  public setGrupoReceptorApellidoSegundo(apellidoSegundo: string): void {
    this.update((state) => ({
      ...state,
      grupoReceptor: { ...state.grupoReceptor, apellidoSegundo },
    }));
  }
  public setGrupoReceptorNumeroFiscal(numeroFiscal: string): void {
    this.update((state) => ({
      ...state,
      grupoReceptor: { ...state.grupoReceptor, numeroFiscal },
    }));
  }
  public setGrupoReceptorRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      grupoReceptor: { ...state.grupoReceptor, razonSocial },
    }));
  }
  public setGrupoDeDireccionesCiudad(ciudad: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, ciudad },
    }));
  }
  public setGrupoDeDireccionesCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, calle },
    }));
  }
  public setGrupoDeDireccionesNumeroLetra(numeroLetra: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, numeroLetra },
    }));
  }
  public setGrupoDeDireccionesLada(lada: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, lada },
    }));
  }
  public setGrupoDeDireccionesTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, telefono },
    }));
  }
  public setGrupoDeDireccionesFax(fax: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, fax },
    }));
  }
  public setGrupoDeDireccionesCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, correoElectronico },
    }));
  }
  public setGrupoRepresentativoLugar(lugar: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, lugar },
    }));
  }
  public setGrupoRepresentativoNombreExportador(nombreExportador: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, nombreExportador },
    }));
  }
  public setGrupoRepresentativoEmpresa(empresa: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, empresa },
    }));
  }
  public setGrupoRepresentativoCargo(cargo: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, cargo },
    }));
  }
  public setGrupoRepresentativoLada(lada: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, lada },
    }));
  }
  public setGrupoRepresentativoTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, telefono },
    }));
  }
  public setGrupoRepresentativoFax(fax: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, fax },
    }));
  }
  public setGrupoRepresentativoCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, correoElectronico },
    }));
  }
  public setgrupoDeTransportePuertoEmbarque(puertoEmbarque: string): void {
    this.update((state) => ({
      ...state,
      grupoDeTransporte: { ...state.grupoDeTransporte, puertoEmbarque },
    }));
  }
  public setgrupoDeTransportePuertoDesembarque(puertoDesembarque: string): void {
    this.update((state) => ({
      ...state,
      grupoDeTransporte: { ...state.grupoDeTransporte, puertoDesembarque },
    }));
  }
  public setgrupoDeTransportePuertoTransito(puertoTransito: string): void {
    this.update((state) => ({
      ...state,
      grupoDeTransporte: { ...state.grupoDeTransporte, puertoTransito },
    }));
  }
  public setgrupoDeTransporteNombreEmbarcacion(nombreEmbarcacion: string): void {
    this.update((state) => ({
      ...state,
      grupoDeTransporte: { ...state.grupoDeTransporte, nombreEmbarcacion },
    }));
  }
  public setgrupoDeTransporteNumeroVuelo(numeroVuelo: string): void {
    this.update((state) => ({
      ...state,
      grupoDeTransporte: { ...state.grupoDeTransporte, numeroVuelo },
    }));
  }
  public setTercerOperador(tercerOperador: boolean): void {
    this.update((state) => ({
      ...state,
      tercerOperador,
    }));
  }

  public setGrupoOperadorNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      grupoOperador: { ...state.grupoOperador, nombre },
    }));
  }
  public setGrupoOperadorApellidoPrimer(apellidoPrimer: string): void {
    this.update((state) => ({
      ...state,
      grupoOperador: { ...state.grupoOperador, apellidoPrimer },
    }));
  }
  public setGrupoOperadorSegundo(apellidoSegundo: string): void {
    this.update((state) => ({
      ...state,
      grupoOperador: { ...state.grupoOperador, apellidoSegundo },
    }));
  }
  public setGrupoOperadorNumeroFiscal(numeroFiscal: string): void {
    this.update((state) => ({
      ...state,
      grupoOperador: { ...state.grupoOperador, numeroFiscal },
    }));
  }
  public setGrupoOperadorRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      grupoOperador: { ...state.grupoOperador, razonSocial },
    }));
  }
   
  public setGrupoDeDomicilioCiudad(ciudad: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, ciudad },
    }));
  }
  public setGrupoDeDomicilioCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, calle },
    }));
  }
  public setGrupoDeDomicilioNumeroLetra(numeroLetra: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, numeroLetra },
    }));
  }
  public setGrupoDeDomicilioLada(lada: string): void {  
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, lada },
    }));
  }
  public setGrupoDeDomicilioTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, telefono },
    }));
  }     
  public setGrupoDeDomicilioFax(fax: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, fax },
    }));
  }
  public setGrupoDeDomicilioCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio: { ...state.grupoDeDomicilio, correoElectronico },
    }));
  }
  public setGrupoDeDomicilio(grupoDeDomicilio: GrupoDeDomicilio): void {
    this.update((state) => ({
      ...state,
      grupoDeDomicilio,
    }));  
  }
  
// grupoTratado
  public setGrupoTratadoTratado(tratado: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, tratado },
    }));
  }
  public setGrupoTratadoPais(pais: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, pais },
    }));
  }
  public setGrupoTratado(grupoTratado: GrupoTratado): void {
    this.update((state) => ({
      ...state,
      grupoTratado,
    }));  
  }
  public setGrupoTratadoFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, fraccionArancelaria },
    }));
  }
  public setGrupoTratadoNumeroRegistro(numeroRegistro: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, numeroRegistro },
    }));
  }
  public setGrupoTratadoNombreComercial(nombreComercial: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, nombreComercial },
    }));
  }
  public setGrupoTratadoFechaFinalInput(fechaFinalInput: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, fechaFinalInput },
    }));
  }
  public setGrupoTratadoFechaInicialInput(fechaInicialInput: string): void {
    this.update((state) => ({
      ...state,
      grupoTratado: { ...state.grupoTratado, fechaInicialInput },
    }));
  }

  //new form mercancia
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
   * Establece la casilla de verificación.
   * @param casillaVerificacion Cadena que representa la casilla de verificación.
   */
  public setCasillaVerificacion(casillaVerificacion: string) {
    this.update((state) => ({
      ...state,
      casillaVerificacion,
    }));
  }
  /**
   * Establece la fracción arancelaria de la mercancía.
   * @param fraccionMercanciaArancelaria Cadena que representa la fracción arancelaria.
   */
  public setFraccionMercanciaArancelaria(fraccionMercanciaArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionMercanciaArancelaria,
    }));
  }
/**
   * Establece la fracción arancelaria de la mercancía.
   * @param nombreComercialDelaMercancia Cadena que representa la fracción arancelaria.
   */
  public setNombreComercialDelaMercancia(nombreComercialDelaMercancia:string) {
    this.update((state) => ({
      ...state,
      nombreComercialDelaMercancia,
    }));
  }
  /**
   * Establece el valor de la mercancía.
   * @param valorDelaMercancia Cadena que representa el valor de la mercancía.
   */
  public setValorDelaMercancia(valorDelaMercancia: string) {
    this.update((state) => ({
      ...state,
      valorDelaMercancia,
    }));
  }
  /**
   * Establece el complemento de la descripción.
   * @param complementoDelaDescripcion Cadena que representa el complemento de la descripción.
   */
  public setComplementoDelaDescripcion(complementoDelaDescripcion: string) {
    this.update((state) => ({
      ...state,
      complementoDelaDescripcion,
    }));
  }
  
  setNombreTecnico(nombreTecnico: string) {
    this.update((state) => ({
      ...state,
      nombreTecnico,
    }));
  }
 
  setNombreEnIngles(nombreEnIngles: string) {
    this.update((state) => ({
      ...state,
      nombreEnIngles,
    }));
  }
  setCriterioParaConferir(criterioParaConferir: string) {
    this.update((state) => ({
      ...state,
      criterioParaConferir,
    }));
  }
  
  setOtrasInstancias(otrasInstancias: string) { 
    this.update((state) => ({
      ...state,
      otrasInstancias,
    }));
  }

}
