import { AgregarDatosProductorFormulario, GrupoOperador } from '../../tramites/110217/models/certificado-origen.model';
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
    }
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
   




}
