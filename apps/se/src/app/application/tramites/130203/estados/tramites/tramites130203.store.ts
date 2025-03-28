import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Tramite130203State {
  producto: string;
  descripcion: string;
  fraccion: string;
  cantidad: string;
  valorPartidaUSD: number;
  unidadMedida: string;
  solicitud: string;
  defaultSelect: string;
  defaultProducto: string;
  regimen: string;
  clasificacion: string;
  filaSeleccionada: null;
  cantidadPartidasDeLaMercancia: string;
  valorPartidaUSDPartidasDeLaMercancia: number;
  descripcionPartidasDeLaMercancia: string;
  valorFacturaUSD: string;
  bloque: string;
  usoEspecifico: string;
  justificacionImportacionExportacion: string;
  observaciones: string;
  entidad: string;
  representacion: string;
  mostrarTabla: boolean;
  nombreExportador: string;
  direccionExportador: string;
  nombreImportador: string;
  direccionImportador: string;
  numeroEnLetraDeLosLotes: string;
  numeroEnLetraDeLosLotesEnIngles: string;
  numeroDeFactura: string;
  cantidadEnQuilates: string;
  valorDeLosDiamantes: string;

  state: string;
  mixed: boolean;
  paisOrigen: number | null;
  especifique: number;
  numero: string;
  tipoEmpresa: string;
  lineaCheckbox: boolean;
  nombre: string;
}

export function createInitialState(): Tramite130203State {
  return {
    filaSeleccionada: null,
    mostrarTabla: false,
    solicitud: '',
    fraccion: '',
    defaultSelect: 'Inicial',
    producto: '',
    descripcion: '',
    cantidad: '',
    valorPartidaUSD: 0,
    unidadMedida: '',
    defaultProducto: 'Nuevo',
    regimen: '',
    clasificacion: '',
    cantidadPartidasDeLaMercancia: '',
    valorPartidaUSDPartidasDeLaMercancia: 0,
    descripcionPartidasDeLaMercancia: '',
    valorFacturaUSD: '',
    bloque: '',
    usoEspecifico: '',
    justificacionImportacionExportacion: '',
    observaciones: '',
    entidad: '',
    representacion: '',
    nombreExportador: '',
    direccionExportador: '',
    nombreImportador: '',
    direccionImportador: '',
    numeroEnLetraDeLosLotes: '',
    numeroEnLetraDeLosLotesEnIngles: '',
    numeroDeFactura: '',
    cantidadEnQuilates: '',
    valorDeLosDiamantes: '',

    numero: '',
    state: '',
    mixed: false,
    paisOrigen: null,
    especifique: 0,
    tipoEmpresa: '',
    lineaCheckbox: false,
    nombre: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130203' })
export class Tramite130203Store extends Store<Tramite130203State> {
  constructor() {
    super(createInitialState());
  }

  public setFraccion(fraccion: string): void {
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }

  public updateSolicitud(solicitud: string): void {
    this.update((state) => ({
      ...state,
      solicitud,
    }));
  }

  public updateDefaultSelect(defaultSelect: string): void {
    this.update((state) => ({
      ...state,
      defaultSelect,
    }));
  }
  public updateState(updates: Partial<Tramite130203State>): void {
    this.update(updates);
  }

  public setProducto(producto: string): void {
    this.update({ producto });
  }

  public setDescripcion(descripcion: string): void {
    this.update({ descripcion });
  }

  public setCantidad(cantidad: string): void {
    this.update({ cantidad });
  }

  public setValorPartidaUSD(valorPartidaUSD: number): void {
    this.update({ valorPartidaUSD });
  }

  public setUnidadMedida(unidadMedida: string): void {
    this.update({ unidadMedida });
  }
  public updateDefaultProducto(defaultProducto: string): void {
    this.update({ defaultProducto });
  }
  public setregimen(regimen: string): void {
    this.update({ regimen });
  }
  public setclasificacion(clasificacion: string): void {
    this.update({ clasificacion });
  }
  public setMostrarTabla(mostrar: boolean): void {
    this.update({ mostrarTabla: mostrar });
  }
  public setValorFacturaUSD(valorFacturaUSD: string): void {
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }
  public setDescripcionPartidasDeLaMercancia(
    descripcionPartidasDeLaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      descripcionPartidasDeLaMercancia,
    }));
  }

  public setCantidadPartidasDeLaMercancia(
    cantidadPartidasDeLaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      cantidadPartidasDeLaMercancia,
    }));
  }
  public setvalorPartidaUSD(valorPartidaUSD: number): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSD,
    }));
  }
  public setValorPartidaUSDPartidasDeLaMercancia(
    valorPartidaUSDPartidasDeLaMercancia: number
  ): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSDPartidasDeLaMercancia,
    }));
  }
  public setBloque(bloque: string): void {
    this.update({ bloque });
  }
  public setUsoEspecifico(usoEspecifico: string): void {
    this.update({ usoEspecifico });
  }
  public setJustificacionImportacionExportacion(
    justificacionImportacionExportacion: string
  ): void {
    this.update({ justificacionImportacionExportacion });
  }
  public setObservaciones(observaciones: string): void {
    this.update({ observaciones });
  }
  public setEntidad(entidad: string): void {
    this.update({ entidad });
  }
  public setRepresentacion(representacion: string): void {
    this.update({ representacion });
  }
  public storeTableValues(fila: null): void {
    this.update({
      filaSeleccionada: fila,
    });
  }
  public setNombreExportador(nombreExportador: string): void {
    this.update((state) => ({
      ...state,
      nombreExportador,
    }));
  }

  public setDireccionExportador(direccionExportador: string): void {
    this.update((state) => ({
      ...state,
      direccionExportador,
    }));
  }

  public setNombreImportador(nombreImportador: string): void {
    this.update((state) => ({
      ...state,
      nombreImportador,
    }));
  }

  public setDireccionImportador(direccionImportador: string): void {
    this.update((state) => ({
      ...state,
      direccionImportador,
    }));
  }

  public setNumeroEnLetraDeLosLotes(numeroEnLetraDeLosLotes: string): void {
    this.update((state) => ({
      ...state,
      numeroEnLetraDeLosLotes,
    }));
  }

  public setNumeroEnLetraDeLosLotesEnIngles(
    numeroEnLetraDeLosLotesEnIngles: string
  ): void {
    this.update((state) => ({
      ...state,
      numeroEnLetraDeLosLotesEnIngles,
    }));
  }

  public setNumeroDeFactura(numeroDeFactura: string): void {
    this.update((state) => ({
      ...state,
      numeroDeFactura,
    }));
  }

  public setCantidadEnQuilates(cantidadEnQuilates: string): void {
    this.update((state) => ({
      ...state,
      cantidadEnQuilates,
    }));
  }

  public setValorDeLosDiamantes(valorDeLosDiamantes: string): void {
    this.update((state) => ({
      ...state,
      valorDeLosDiamantes,
    }));
  }

  public setEspecifique(especifique: number): void {
    this.update({ especifique });
  }

  public setNumero(numero: string): void {
    this.update({ numero });
  }

  public setTipoEmpresa(tipoEmpresa: string): void {
    this.update({ tipoEmpresa });
  }

  public setLineaCheckbox(lineaCheckbox: boolean): void {
    this.update({ lineaCheckbox });
  }

  public setPaisOrigen(paisOrigen: number | null): void {
    this.update({ paisOrigen });
  }
  public setNombre(nombre: string): void {
    this.update({ nombre });
  }
}
