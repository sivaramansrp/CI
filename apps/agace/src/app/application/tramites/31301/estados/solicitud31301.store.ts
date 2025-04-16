import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

export interface Solicitud31301State {
  polizaDeFianzaActual: number;
  numeroFolio: string;
  rfcInstitucion: string;
  fechaExpedicion: string;
  fechaInicioVigenciaNo: string;
  fechaFinVigenciaNo: string;
  fechaInicioVigencia: string;
  fechaFinVigencia: string;
  importeTotal: string;
  //
  razonSocialAnterior: string;
  razonSocialActual: string;
  //
  rfc: string;
  curp: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export function createInitialSolicitudState(): Solicitud31301State {
  return {
    polizaDeFianzaActual: 1,
    numeroFolio: '',
    rfcInstitucion: '',
    fechaExpedicion: '',
    fechaInicioVigenciaNo: '',
    fechaFinVigenciaNo: '',
    fechaInicioVigencia: '',
    fechaFinVigencia: '',
    importeTotal: '',
    //
    razonSocialAnterior: '',
    razonSocialActual: '',
    //
    rfc: '',
    curp: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud31301', resettable: true })
export class Solicitud31301Store extends Store<Solicitud31301State> {
  constructor() {
    super(createInitialSolicitudState());
  }

  actualizarPolizaDeFianzaActual(polizaDeFianzaActual: number): void {
    this.update((state) => ({
      ...state,
      polizaDeFianzaActual,
    }));
  }

  actualizarNumeroFolio(numeroFolio: string): void {
    this.update((state) => ({
      ...state,
      numeroFolio,
    }));
  }

  actualizarRfcInstitucion(rfcInstitucion: string): void {
    this.update((state) => ({
      ...state,
      rfcInstitucion,
    }));
  }

  actualizarFechaExpedicion(fechaExpedicion: string): void {
    this.update((state) => ({
      ...state,
      fechaExpedicion,
    }));
  }

  actualizarFechaInicioVigenciaNo(fechaInicioVigenciaNo: string): void {
    this.update((state) => ({
      ...state,
      fechaInicioVigenciaNo,
    }));
  }

  actualizarFechaFinVigenciaNo(fechaFinVigenciaNo: string): void {
    this.update((state) => ({
      ...state,
      fechaFinVigenciaNo,
    }));
  }

  actualizarFechaInicioVigencia(fechaInicioVigencia: string): void {
    this.update((state) => ({
      ...state,
      fechaInicioVigencia,
    }));
  }

  actualizarFechaFinVigencia(fechaFinVigencia: string): void {
    this.update((state) => ({
      ...state,
      fechaFinVigencia,
    }));
  }

  actualizarImporteTotal(importeTotal: string): void {
    this.update((state) => ({
      ...state,
      importeTotal,
    }));
  }

  actualizarRazonSocialAnterior(razonSocialAnterior: string): void {
    this.update((state) => ({
      ...state,
      razonSocialAnterior,
    }));
  }

  actualizarRazonSocialActual(razonSocialActual: string): void {
    this.update((state) => ({
      ...state,
      razonSocialActual,
    }));
  }

  actualizarRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  actualizarCurp(curp: string): void {
    this.update((state) => ({
      ...state,
      curp,
    }));
  }

  actualizarNombre(nombre: string): void {
    this.update((state) => ({
      ...state,
      nombre,
    }));
  }

  actualizarApellidoPaterno(apellidoPaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoPaterno,
    }));
  }

  actualizarApellidoMaterno(apellidoMaterno: string): void {
    this.update((state) => ({
      ...state,
      apellidoMaterno,
    }));
  }

  /**
   * Restablece el estado de la tienda a su estado inicial.
   */
  resetStore(): void {
    this.reset();
  }
}
