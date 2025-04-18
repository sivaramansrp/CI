import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

export interface Solicitud31301State {
  tipoDeEndoso: string;
  tipoDeGarantia: number;
  modalidadDeLaGarantia: number;
  tipoSector: string;
  concepto: number;
  '3500': number;
  '3501': number;
  '3502': number;
  datosGeneralesRFC: string;
  '3503': number;
  '3504': number;
  '3505': number;
  '3506': number;
  '3507': number;
  '3508': number;
  '3509': number;
  '3511': number;
  '3512': number;
  '3513': number;
  textoGenerico1: string;
  textoGenerico2: string;
  '3514': number;
  '3515': number;
  '3516': number;
  textoGenerico3: string;
  '3517': number;
  '3518': number;
  '3519': number;
  '3520': number;
  tipoInversion: number;
  cantidadInversion: string;
  descInversion: string;
  '3521': number;
  '3522': number;
  claveEnumeracionD0: string;
  claveEnumeracionD1: string;
  claveEnumeracionD2: string;
  claveEnumeracionD3: string;
  claveEnumeracionH: string;
  textoGenerico4: string;
  textoGenerico5: string;
  '3523': number;
  '3528': number;
  '3529': number;
  textoGenerico6: string;
  textoGenerico7: string;
  '3530': number;
  '3531': number;
  textoGenerico9: string;
  textoGenerico10: number;
  textoGenerico11: number;
  textoGenerico12: number;
  textoGenerico13: number;
  textoGenerico14: number;
  textoGenerico15: number;
  textoGenerico16: number;
  textoGenerico17: number;
  textoGenerico18: number;
  textoGenerico19: number;
  textoGenerico20: number;
  textoGenerico21: number;
  textoGenerico22: number;
  textoGenerico23: number;
  textoGenerico24: number;
  alerta1: boolean;
  alerta2: boolean;
  //
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
    tipoDeEndoso: '',
    tipoDeGarantia: 0,
    modalidadDeLaGarantia: 0,
    tipoSector: '',
    concepto: 0,
    '3500': 0,
    '3501': 0,
    '3502': 0,
    datosGeneralesRFC: '',
    '3503': 0,
    '3504': 0,
    '3505': 0,
    '3506': 0,
    '3507': 0,
    '3508': 0,
    '3509': 0,
    '3511': 0,
    '3512': 0,
    '3513': 0,
    textoGenerico1: '',
    textoGenerico2: '',
    '3514': 0,
    '3515': 0,
    '3516': 0,
    textoGenerico3: '',
    '3517': 0,
    '3518': 0,
    '3519': 0,
    '3520': 0,
    tipoInversion: 0,
    cantidadInversion: '',
    descInversion: '',
    '3521': 0,
    '3522': 0,
    claveEnumeracionD0: '',
    claveEnumeracionD1: '',
    claveEnumeracionD2: '',
    claveEnumeracionD3: '',
    claveEnumeracionH: '',
    textoGenerico4: '',
    textoGenerico5: '',
    '3523': 0,
    '3528': 0,
    '3529': 0,
    textoGenerico6: '',
    textoGenerico7: '',
    '3530': 0,
    '3531': 0,
    textoGenerico9: '',
    textoGenerico10: 0,
    textoGenerico11: 0,
    textoGenerico12: 0,
    textoGenerico13: 0,
    textoGenerico14: 0,
    textoGenerico15: 0,
    textoGenerico16: 0,
    textoGenerico17: 0,
    textoGenerico18: 0,
    textoGenerico19: 0,
    textoGenerico20: 0,
    textoGenerico21: 0,
    textoGenerico22: 0,
    textoGenerico23: 0,
    textoGenerico24: 0,
    alerta1: false,
    alerta2: false,
    //
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

  actualizarTipoDeEndoso(tipoDeEndoso: string): void {
    this.update((state) => ({ ...state, tipoDeEndoso }));
  }

  actualizarTipoDeGarantia(tipoDeGarantia: number): void {
    this.update((state) => ({ ...state, tipoDeGarantia }));
  }

  actualizarModalidadDeLaGarantia(modalidadDeLaGarantia: number): void {
    this.update((state) => ({ ...state, modalidadDeLaGarantia }));
  }

  actualizarTipoSector(tipoSector: string): void {
    this.update((state) => ({ ...state, tipoSector }));
  }

  actualizarConcepto(concepto: number): void {
    this.update((state) => ({ ...state, concepto }));
  }

  actualizar3500(valor: number): void {
    this.update((state) => ({ ...state, '3500': valor }));
  }

  actualizar3501(valor: number): void {
    this.update((state) => ({ ...state, '3501': valor }));
  }

  actualizar3502(valor: number): void {
    this.update((state) => ({ ...state, '3502': valor }));
  }

  actualizarDatosGeneralesRFC(datosGeneralesRFC: string): void {
    this.update((state) => ({ ...state, datosGeneralesRFC }));
  }

  actualizar3503(valor: number): void {
    this.update((state) => ({ ...state, '3503': valor }));
  }

  actualizar3504(valor: number): void {
    this.update((state) => ({ ...state, '3504': valor }));
  }

  actualizar3505(valor: number): void {
    this.update((state) => ({ ...state, '3505': valor }));
  }

  actualizar3506(valor: number): void {
    this.update((state) => ({ ...state, '3506': valor }));
  }

  actualizar3507(valor: number): void {
    this.update((state) => ({ ...state, '3507': valor }));
  }

  actualizar3508(valor: number): void {
    this.update((state) => ({ ...state, '3508': valor }));
  }

  actualizar3509(valor: number): void {
    this.update((state) => ({ ...state, '3509': valor }));
  }

  actualizar3511(valor: number): void {
    this.update((state) => ({ ...state, '3511': valor }));
  }

  actualizar3512(valor: number): void {
    this.update((state) => ({ ...state, '3512': valor }));
  }

  actualizar3513(valor: number): void {
    this.update((state) => ({ ...state, '3513': valor }));
  }

  actualizarTextoGenerico1(valor: string): void {
    this.update((state) => ({ ...state, textoGenerico1: valor }));
  }

  actualizarTextoGenerico2(valor: string): void {
    this.update((state) => ({ ...state, textoGenerico2: valor }));
  }

  actualizar3514(valor: number): void {
    this.update((state) => ({ ...state, '3514': valor }));
  }

  actualizar3515(valor: number): void {
    this.update((state) => ({ ...state, '3515': valor }));
  }

  actualizar3516(valor: number): void {
    this.update((state) => ({ ...state, '3516': valor }));
  }

  actualizarTextoGenerico3(valor: string): void {
    this.update((state) => ({ ...state, textoGenerico3: valor }));
  }

  actualizar3517(valor: number): void {
    this.update((state) => ({ ...state, '3517': valor }));
  }

  actualizar3518(valor: number): void {
    this.update((state) => ({ ...state, '3518': valor }));
  }

  actualizar3519(valor: number): void {
    this.update((state) => ({ ...state, '3519': valor }));
  }

  actualizar3520(valor: number): void {
    this.update((state) => ({ ...state, '3520': valor }));
  }

  actualizarTipoInversion(valor: number): void {
    this.update((state) => ({ ...state, tipoInversion: valor }));
  }

  actualizarCantidadInversion(valor: string): void {
    this.update((state) => ({ ...state, cantidadInversion: valor }));
  }

  actualizarDescInversion(valor: string): void {
    this.update((state) => ({ ...state, descInversion: valor }));
  }

  actualizar3521(valor: number): void {
    this.update((state) => ({ ...state, '3521': valor }));
  }

  actualizar3522(valor: number): void {
    this.update((state) => ({ ...state, '3522': valor }));
  }

  actualizarClaveEnumeracionD0(valor: string): void {
    this.update((state) => ({ ...state, claveEnumeracionD0: valor }));
  }

  actualizarClaveEnumeracionD1(valor: string): void {
    this.update((state) => ({ ...state, claveEnumeracionD1: valor }));
  }

  actualizarClaveEnumeracionD2(valor: string): void {
    this.update((state) => ({ ...state, claveEnumeracionD2: valor }));
  }

  actualizarClaveEnumeracionD3(valor: string): void {
    this.update((state) => ({ ...state, claveEnumeracionD3: valor }));
  }

  actualizarClaveEnumeracionH(valor: string): void {
    this.update((state) => ({ ...state, claveEnumeracionH: valor }));
  }

  actualizarTextoGenerico4(valor: string): void {
    this.update((state) => ({ ...state, textoGenerico4: valor }));
  }

  actualizarTextoGenerico5(valor: string): void {
    this.update((state) => ({ ...state, textoGenerico5: valor }));
  }

  actualizar3523(valor: number): void {
    this.update((state) => ({ ...state, '3523': valor }));
  }

  actualizar3528(valor: number): void {
    this.update((state) => ({ ...state, '3528': valor }));
  }

  actualizar3529(valor: number): void {
    this.update((state) => ({ ...state, '3529': valor }));
  }

  actualizarTextoGenerico6(valor: string): void {
    this.update((state) => ({ ...state, textoGenerico6: valor }));
  }

  actualizarTextoGenerico7(valor: string): void {
    this.update((state) => ({ ...state, textoGenerico7: valor }));
  }

  actualizar3530(valor: number): void {
    this.update((state) => ({ ...state, '3530': valor }));
  }

  actualizar3531(valor: number): void {
    this.update((state) => ({ ...state, '3531': valor }));
  }

  actualizarTextoGenerico9(valor: string): void {
    this.update((state) => ({ ...state, textoGenerico9: valor }));
  }

  actualizarTextoGenerico10(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico10: valor }));
  }

  actualizarTextoGenerico11(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico11: valor }));
  }

  actualizarTextoGenerico12(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico12: valor }));
  }

  actualizarTextoGenerico13(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico13: valor }));
  }

  actualizarTextoGenerico14(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico14: valor }));
  }

  actualizarTextoGenerico15(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico15: valor }));
  }

  actualizarTextoGenerico16(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico16: valor }));
  }

  actualizarTextoGenerico17(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico17: valor }));
  }

  actualizarTextoGenerico18(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico18: valor }));
  }

  actualizarTextoGenerico19(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico19: valor }));
  }

  actualizarTextoGenerico20(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico20: valor }));
  }

  actualizarTextoGenerico21(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico21: valor }));
  }

  actualizarTextoGenerico22(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico22: valor }));
  }

  actualizarTextoGenerico23(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico23: valor }));
  }

  actualizarTextoGenerico24(valor: number): void {
    this.update((state) => ({ ...state, textoGenerico24: valor }));
  }

  actualizarAlerta1(valor: boolean): void {
    this.update((state) => ({ ...state, alerta1: valor }));
  }

  actualizarAlerta2(valor: boolean): void {
    this.update((state) => ({ ...state, alerta2: valor }));
  }

  //
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
