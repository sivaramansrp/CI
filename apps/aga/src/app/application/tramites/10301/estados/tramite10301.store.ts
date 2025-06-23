import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Catalogo {
  id: number;
  descripcion: string;
}
/**
 * Creacion del estado inicial para la interfaz de tramite 10301
 * @returns Solicitud10301
 */
export interface Solicitud10301State {
  manifesto: string;
  idSolicitud: string;
  tipoSolicitud: string;
  aduana: Catalogo[] | null;
  ano: Catalogo[] | null;
  pais: Catalogo[] | null;
  condicion: Catalogo[] | null;
  tipoDocumento: Catalogo[] | null;
  fechasSeleccionadas: Catalogo[] | null;
  finesElegidos: string[];
  elegidosSeleccionados: string[];
  selectRangoDias: string[];
  fechasDatos: string[];
  fecha: string | null;
  fechaSeleccionada: string | null;
  showTabla: boolean;
  isPopupOpen: boolean;
  isPopupClose: boolean;
  valorSeleccionado: string | null;
  nombre: string;
  tipoMercancia: string;
  usoEspecifico: string;
  marca: string;
  modelo: string;
  serie: string;
  calle: string;
  numeroExterior: number;
  numeroInterior: number;
  telefono: number;
  correoElectronico: string;
  codigoPostal: number;
  estado: number;
  colonia: number;
  opcion: string;
  documentos: Catalogo[] | null;
  tableCheck: string;
  donacion: string;
  persona: string;
  otro: string;
}

export function createInitialState(): Solicitud10301State {
  return {
    manifesto: '',
    idSolicitud: '',
    tipoSolicitud: '',
    aduana: null,
    ano: null,
    condicion: null,
    pais: null,
    tipoDocumento: null,
    fechasSeleccionadas: null,
    finesElegidos: [],
    elegidosSeleccionados: [],
    selectRangoDias: [],
    fechasDatos: [],
    fecha: null,
    fechaSeleccionada: null,
    showTabla: true,
    isPopupOpen: false,
    isPopupClose: true,
    valorSeleccionado: null,
    documentos: null,

    nombre: '',
    tipoMercancia: '',
    usoEspecifico: '',
    marca: '',
    modelo: '',
    serie: '',
    calle: '',
    numeroExterior: 0,
    numeroInterior: 0,
    telefono: 0,
    correoElectronico: '',
    codigoPostal: 0,
    estado: 0,
    colonia: 0,
    opcion: '',
    tableCheck: '',
    donacion: '',
    persona: '',
    otro: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite10301', resettable: true })
export class Tramite10301Store extends Store<Solicitud10301State> {
  constructor() {
    super(createInitialState());
  }

  public setTableCheck(tableCheck: string): void {
    this.update((state) => ({
      ...state,
      tableCheck,
    }));
  }

  public setDonacion(donacion: string): void {
    this.update((state) => ({
      ...state,
      donacion,
    }));
  }

  public setPersona(persona: string): void {
    this.update((state) => ({
      ...state,
      persona,
    }));
  }

  public setOtro(otro: string): void {
    this.update((state) => ({
      ...state,
      otro,
    }));
  }

  public setManifesto(manifesto: string): void {
    this.update((state) => ({
      ...state,
      manifesto,
    }));
  }

  public setAduana(aduana: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  public setDocumentos(documentos: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      documentos,
    }));
  }

  public setNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  public setAno(ano: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      ano,
    }));
  }

  public setCondicion(condicion: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      condicion,
    }));
  }

  public setPais(pais: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  public setTipoDocumento(tipoDocumento: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      tipoDocumento,
    }));
  }

  public setFechasSeleccionadas(fechasSeleccionadas: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      fechasSeleccionadas,
    }));
  }

  public setFinesElegidos(finesElegidos: string[]): void {
    this.update((state) => ({
      ...state,
      finesElegidos,
    }));
  }

  public setElegidosSeleccionados(elegidosSeleccionados: string[]): void {
    this.update((state) => ({
      ...state,
      elegidosSeleccionados,
    }));
  }

  public setSelectRangoDias(selectRangoDias: string[]): void {
    this.update((state) => ({
      ...state,
      selectRangoDias,
    }));
  }

  public setFechasDatos(fechasDatos: string[]): void {
    this.update((state) => ({
      ...state,
      fechasDatos,
    }));
  }

  public setFecha(fecha: string): void {
    this.update((state) => ({
      ...state,
      fecha,
    }));
  }

  public setFechaSeleccionada(fechaSeleccionada: string): void {
    this.update((state) => ({
      ...state,
      fechaSeleccionada,
    }));
  }

  public setShowTabla(showTabla: boolean): void {
    this.update((state) => ({
      ...state,
      showTabla,
    }));
  }

  public setIsPopupOpen(isPopupOpen: boolean): void {
    this.update((state) => ({
      ...state,
      isPopupOpen,
    }));
  }

  public setIsPopupClose(isPopupClose: boolean): void {
    this.update((state) => ({
      ...state,
      isPopupClose,
    }));
  }

  public setValorSeleccionado(valorSeleccionado: string): void {
    this.update((state) => ({
      ...state,
      valorSeleccionado,
    }));
  }

  public setTipoMercancia(tipoMercancia: string): void {
    this.update((state) => ({
      ...state,
      tipoMercancia,
    }));
  }

  public setUsoEspecifico(usoEspecifico: string): void {
    this.update((state) => ({
      ...state,
      usoEspecifico,
    }));
  }

  public setMarca(marca: string): void {
    this.update((state) => ({
      ...state,
      marca,
    }));
  }

  public setModelo(modelo: string): void {
    this.update((state) => ({
      ...state,
      modelo,
    }));
  }

  public setSerie(serie: string): void {
    this.update((state) => ({
      ...state,
      serie,
    }));
  }

  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  public setNumeroExterior(numeroExterior: number): void {
    this.update((state) => ({
      ...state,
      numeroExterior,
    }));
  }

  public setNumeroInterior(numeroInterior: number): void {
    this.update((state) => ({
      ...state,
      numeroInterior,
    }));
  }

  public setTelefono(telefono: number): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({
      ...state,
      correoElectronico,
    }));
  }

  public setCodigoPostal(codigoPostal: number): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }

  public setEstado(estado: number): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  public setColonia(colonia: number): void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  public setOpcion(opcion: string): void {
    this.update((state) => ({
      ...state,
      opcion,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud(): void{
    this.reset();
  }
}
