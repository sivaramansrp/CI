import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Catalogo {
  id: number;
  descripcion: string;
}
/**
 * Creacion del estado inicial para la interfaz de tramite 110201
 * @returns Solicitud110201
 */
export interface Solicitud110201State {
  tratado: Catalogo[] | null;
  pais: Catalogo[] | null;
  fraccionArancelaria: string;
  numRegistro: string;
  nomComercial: string;
  fechInicioB: string;
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
  nomreeningles: string;
  criterioparaconferir: string;
  marca: string;
  cantidad: string;
  umc: string;
  valordelamercancia: string;
  complementodeladescripcion: string;
  masabruta: string;
  nombrecomercialdelamercancia: string;
}

export function createInitialState(): Solicitud110201State {
  return {
    tratado: null,
    pais: null,
    fraccionArancelaria: '',
    numRegistro: '',
    nomComercial: '',
    fechInicioB: '',
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
    fraccionMercanArancelaria:'',
    nombretecnico:'',
    nomreeningles:'',
    criterioparaconferir:'',
    marca:'',
    cantidad:'',
    umc:'',
    valordelamercancia:'',
    complementodeladescripcion:'',
    masabruta:'',
    nombrecomercialdelamercancia:'',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110201', resettable: true })
export class Tramite110201Store extends Store<Solicitud110201State> {
  constructor() {
    super(createInitialState());
  }
  public setTratado(tratado: Catalogo[] ) {
    this.update((state) => ({
      ...state,
      tratado,
    }));
  }

  public setPais(pais: Catalogo[]) {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  } 

  public setfraccionMercanArancelaria(fraccionMercanArancelaria: string) {
    this.update((state) => ({
      ...state,
      fraccionMercanArancelaria,
    }));
  }

  public setnombretecnico(nombretecnico: string) {
    this.update((state) => ({
      ...state,
      nombretecnico,
    }));
  }

  public setnomreeningles(nomreeningles: string) {
    this.update((state) => ({
      ...state,
      nomreeningles,
    }));
  }

  public setcriterioparaconferir(criterioparaconferir: string) {
    this.update((state) => ({
      ...state,
      criterioparaconferir,
    }));
  } 

  public setmarca(marca: string) {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }

  public setcantidad(cantidad: string) {
    this.update((state) => ({
      ...state,
      cantidad,
    }));
  } 

  public setumc(umc: string) {
    this.update((state) => ({
      ...state,
      umc,
    }));
  }

  public setvalordelamercancia(valordelamercancia: string) {
    this.update((state) => ({
      ...state,
      valordelamercancia,
    }));
  } 

  public setcomplementodeladescripcion(complementodeladescripcion: string) {
    this.update((state) => ({
      ...state,
      complementodeladescripcion,
    }));
  } 

  public setmasabruta(masabruta: string) {
    this.update((state) => ({
      ...state,
      masabruta,
    }));
  } 

  public setnombrecomercialdelamercancia(nombrecomercialdelamercancia: string) {
    this.update((state) => ({
      ...state,
      nombrecomercialdelamercancia,
    }));
  } 

  public setNumRegistro(numRegistro: string) {
    this.update((state) => ({
      ...state,
      numRegistro,
    }));
  }

  public setNomComercial(nomComercial: string) {
    this.update((state) => ({
      ...state,
      nomComercial,
    }));
  }

  public setFechInicioB(fechInicioB: string) {
    this.update((state) => ({
      ...state,
      fechInicioB,
    }));
  }

  public setFechFinB(fechFinB: string) {
    this.update((state) => ({
      ...state,
      fechFinB,
    }));
  }

  public setArchivo(archivo: string) {
    this.update((state) => ({
      ...state,
      archivo,
    }));
  }

  public setObservaciones(observaciones: string) {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

  public setPresica(presica: string) {
    this.update((state) => ({
      ...state,
      presica,
    }));
  }

  public setPresenta(presenta: string) {
    this.update((state) => ({
      ...state,
      presenta,
    }));
  }

  public setIdioma(idioma: Catalogo[] | null) {
    this.update((state) => ({
      ...state,
      idioma,
    }));
  }

  public setEntidad(entidad: Catalogo[] | null) {
    this.update((state) => ({
      ...state,
      entidad,
    }));
  }

  public setRepresentacion(representacion: Catalogo[] | null) {
    this.update((state) => ({
      ...state,
      representacion,
    }));
  }

  public setNombre(nombre: string) {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  public setApellidoPrimer(apellidoPrimer: string) {
    this.update((state) => ({
      ...state,
      apellidoPrimer,
    }));
  }

  public setApellidoSegundo(apellidoSegundo: string) {
    this.update((state) => ({
      ...state,
      apellidoSegundo,
    }));
  }

  public setNumeroFiscal(numeroFiscal: string) {
    this.update((state) => ({
      ...state,
      numeroFiscal,
    }));
  }

  public setRazonSocial(razonSocial: string) {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }

  public setCiudad(ciudad: string) {
    this.update((state) => ({
      ...state,
      ciudad,
    }));
  }

  public setCalle(calle: string) {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  public setNumeroLetra(numeroLetra: string) {
    this.update((state) => ({
      ...state,
      numeroLetra,
    }));
  }

  public setLada(lada: string) {
    this.update((state) => ({
      ...state,
      lada,
    }));
  }

  public setTelefono(telefono: string) {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  public setFax(fax: string) {
    this.update((state) => ({
      ...state,
      fax,
    }));
  }

  public setCorreoElectronico(correoElectronico: string) {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  public setNacion(nacion: Catalogo[] | null) {
    this.update((state) => ({
      ...state,
      nacion,
    }));
  }

  public setTransporte(transporte: Catalogo[] | null) {
    this.update((state) => ({
      ...state,
      transporte,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud() {
    this.reset();
  }
}
