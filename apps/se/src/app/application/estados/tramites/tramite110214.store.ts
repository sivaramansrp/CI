import { AgregarDatosProductorFormulario, FormularioMercancia, GrupoTratado, SeleccionadasTabla } from '../../tramites/110214/models/validar-inicialmente-certificado.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { GrupoDeDirecciones } from '../../tramites/110214/models/validar-inicialmente-certificado.model';
import { GrupoReceptor } from '../../tramites/110214/models/validar-inicialmente-certificado.model';
import { GrupoRepresentativo } from '../../tramites/110214/models/validar-inicialmente-certificado.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

export interface Tramite110214State {
  pasoActivo: number;
  pestanaActiva: number;
  asignarProductor: SeleccionadasTabla[] | null;
  productorMismoExportador: boolean;
  agregarDatosProductorFormulario: AgregarDatosProductorFormulario;
  datosConfidencialesProductor: boolean;
  grupoRepresentativo: GrupoRepresentativo;
  grupoDeDirecciones: GrupoDeDirecciones;
  tercerOperador: boolean;
  blnPeriodo: string;
  grupoReceptor: GrupoReceptor;
  representacionFederal: Catalogo | null;
  observaciones: string;
  entidadFederativa: Catalogo | null;
  idioma: Catalogo | null;
  formularioMercancia: FormularioMercancia;
  grupoTratado: GrupoTratado;
}
export function createInitialState(): Tramite110214State {
  return {
    pasoActivo: 1,
    pestanaActiva: 1,
    asignarProductor: null,
    productorMismoExportador: false,
    agregarDatosProductorFormulario: {
      numeroRegistroFiscal: ''
    },
    datosConfidencialesProductor: false,
    grupoRepresentativo: {
      lugar: '',
      nombreExportador: '',
      empresa: '',
      cargo: '',
      telefono: '',
      correoElectronico: '',
    },
    grupoDeDirecciones: {
      ciudad: '',
      calle: '',
      numeroLetra: '',
      telefono: '',
      correoElectronico: '',
    },
    tercerOperador: false,
    blnPeriodo: '1',
    grupoReceptor: {
      nombre: '',
      apellidoPrimer: '',
      apellidoSegundo: '',
      numeroFiscal: '',
      razonSocial: '',
    },
    representacionFederal: null,
    observaciones: '',
    entidadFederativa: null,
    idioma: null,
    formularioMercancia: {
      fraccionMercanciaArancelaria: '',
      nombreComercialDelaMercancia: '',
      nombreTecnico: '',
      nombreEnIngles: '',
      criterioTratoPreferencial: '',
      valorContenidoRegional: '',
      otrasInstancias: '',
      cantidad: '',
      pais: '',
      valorDelaMercancia: '',
      complementoDelaDescripcion: '',
      numeroSerie: '',
      fecha: '',
      numeroFactura: '',
      tipoFactura: '',
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
  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110214', resettable: true })
export class Tramite110214Store extends Store<Tramite110214State> {

  constructor() {
    super(createInitialState());
  }
  public setPasoActivo(pasoActivo: number): void {
    this.update((state) => ({
      ...state,
      pasoActivo,
    }));
  }
  public setPestanaActiva(pestanaActiva: number): void {
    this.update((state) => ({
      ...state,
      pestanaActiva,
    }));
  }
  public setAsignarProductor(asignarProductor: SeleccionadasTabla[]): void {
    this.update((state) => ({
      ...state,
      asignarProductor,
    }));
  }
  public setProductorMismoExportador(productorMismoExportador: boolean): void {
    this.update((state) => ({
      ...state,
      productorMismoExportador,
    }));
  }
  public setAgregarDatosProductorNumeroRegistroFiscal(numeroRegistroFiscal: string): void {
    this.update((state) => ({
      ...state,
      agregarDatosProductorFormulario: { ...state.agregarDatosProductorFormulario, numeroRegistroFiscal },
    }));
  }
  public setDatosConfidencialesProductor(datosConfidencialesProductor: boolean): void {
    this.update((state) => ({
      ...state,
      datosConfidencialesProductor,
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
  public setGrupoRepresentativoTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, telefono },
    }));
  }
  public setGrupoRepresentativoCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      grupoRepresentativo: { ...state.grupoRepresentativo, correoElectronico },
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
  public setGrupoDeDireccionesTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, telefono },
    }));
  }
  public setGrupoDeDireccionesCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      grupoDeDirecciones: { ...state.grupoDeDirecciones, correoElectronico },
    }));
  }
  public setTercerOperador(tercerOperador: boolean): void {
    this.update((state) => ({
      ...state,
      tercerOperador,
    }));
  }
  public setPeriodo(blnPeriodo: string): void {
    this.update((state) => ({
      ...state,
      blnPeriodo,
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
  public setRepresentacionFederal(representacionFederal: Catalogo): void {
    this.update((state) => ({
      ...state,
      representacionFederal,
    }));
  }
  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }
  public setEntidadFederativa(entidadFederativa: Catalogo): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }
  public setIdioma(idioma: Catalogo): void {
    this.update((state) => ({
      ...state,
      idioma,
    }));
  }
  public setFraccionMercanciaArancelaria(fraccionMercanciaArancelaria: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, fraccionMercanciaArancelaria },
    }));
  }
  public setNombreComercialDelaMercancia(nombreComercialDelaMercancia: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, nombreComercialDelaMercancia },
    }));
  }
  public setNombreTecnico(nombreTecnico: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, nombreTecnico },
    }));
  }
  public setNombreEnIngles(nombreEnIngles: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, nombreEnIngles },
    }));
  }
  public setCriterioTratoPreferencial(criterioTratoPreferencial: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, criterioTratoPreferencial },
    }));
  }
  public setValorContenidoRegional(valorContenidoRegional: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, valorContenidoRegional },
    }));
  }
  public setOtrasInstancias(otrasInstancias: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, otrasInstancias },
    }));
  }
  public setCantidad(cantidad: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, cantidad },
    }));
  }
  public setPais(pais: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, pais },
    }));
  }
  public setValorDelaMercancia(valorDelaMercancia: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, valorDelaMercancia },
    }));
  }
  public setComplementoDelaDescripcion(complementoDelaDescripcion: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, complementoDelaDescripcion },
    }));
  }
  public setNumeroFactura(numeroFactura: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, numeroFactura },
    }));
  }
  public setTipoFactura(tipoFactura: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, tipoFactura },
    }));
  }
  public setFecha(fecha: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, fecha },
    }));
  }
  public setNumeroSerie(numeroSerie: string): void {
    this.update((state) => ({
      ...state,
      formularioMercancia: { ...state.formularioMercancia, numeroSerie },
    }));
  }
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
}