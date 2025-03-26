
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
export interface Tramite110217State {
 
   observaciones: string;
  idioma: Catalogo;
  entidadFederativa: Catalogo;
  representacionFederal: Catalogo;
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
  nombreExportador: string;
  lugar: string;
  empresa: string;
  cargo: String;
  puertoEmbarque: string;
  puertoDesembarque: string;
  puertoTransito: string;
  nombreEmbarcacion: string;
  numeroVuelo: string;
  
  
 
  
}

export function createInitialState(): Tramite110217State {
  return {
    observaciones: '',
    idioma: {} as Catalogo,
    entidadFederativa: {} as Catalogo,
    representacionFederal: {} as Catalogo,
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
    lugar:'',
    nombreExportador:'',
    empresa:'',
    cargo:'',
    puertoEmbarque:'',
    puertoDesembarque:'',
    puertoTransito:'',
    nombreEmbarcacion:'',
    numeroVuelo: '',
  
  

    
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
   * Establece el lugar.
   * @param lugar Cadena que representa el lugar.
   */
  public setLugar(lugar: string) {  
    this.update((state) => ({
      ...state,
      lugar,
    }));
  }
  /**
   * Establece el nombre del exportador.
   * @param nombreExportador Cadena que representa el nombre del exportador.
   */
  public setNombreExportador(nombreExportador: string) {
    this.update((state) => ({
      ...state,
      nombreExportador,
    }));
  }
  /**
   * Establece la empresa.
   * @param empresa Cadena que representa la empresa.
   */
  public setEmpresa(empresa: string) {
    this.update((state) => ({
      ...state,
      empresa,
    }));
  }
  /**
   * Establece el cargo.
   * @param cargo Cadena que representa el cargo.
   */
  public setCargo(cargo: string) {
    this.update((state) => ({
      ...state,
      cargo,
    }));
  }
  /**
   * Establece el puerto de embarque.
   * @param puertoEmbarque Cadena que representa el puerto de embarque.
   */
  public setPuertoEmbarque(puertoEmbarque: string) {  
    this.update((state) => ({
      ...state,
      puertoEmbarque,
    }));
  }

  /**
   * Establece el puerto de desembarque.
   * @param puertoDesembarque Cadena que representa el puerto de desembarque.
   */
  public setPuertoDesembarque(puertoDesembarque: string) {  
    this.update((state) => ({
      ...state,
      puertoDesembarque,
    }));
  }

  /**
   * Establece el puerto de tránsito.
   * @param puertoTransito Cadena que representa el puerto de tránsito.
   */
  public setPuertoTransito(puertoTransito: string) {
    this.update((state) => ({
      ...state,
      puertoTransito,
    }));
  }
  /**
   * Establece el nombre de la embarcación.
   * @param nombreEmbarcacion Cadena que representa el nombre de la embarcación.
   */
  public setNombreEmbarcacion(nombreEmbarcacion: string) {
    this.update((state) => ({
      ...state,
      nombreEmbarcacion,
    }));
  }
  /**
   * Establece el número de vuelo.
   * @param numeroVuelo Cadena que representa el número de vuelo.
   */
  public setNumeroVuelo(numeroVuelo: string) {  
    this.update((state) => ({
      ...state,
      numeroVuelo,
    }));
  }

}
