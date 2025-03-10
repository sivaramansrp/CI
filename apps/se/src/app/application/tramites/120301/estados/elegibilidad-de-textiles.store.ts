import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';


export interface TextilesState {
  numeroFactura: string;
  cantidadTotal: string;
  unidadDeMedida: string;
  fechaInicioInput: string;
  valorDolares: string;
  taxId: string;
  razonSocial: string;
  calle: string;
  ciudad: string;
  cp: string;
  pais: string;
  flexRadioRegistro: string;
  estado: string;
  representacionFederal: string;
  fraccionArancelaria: string;
  descripcionProducto: string;
  tratado: string;
  subproducto: string;
  mecanismo: string;
  typoCategoria: string;
  typoRegimen: string;
  descripcionCategoriaTextil: string;
  PaisDestino: string;
  unidadMedidaCategoriaTextil: string;
  factorConversionCategoriaTextil: string;
  fechaInicioVigencia: string;
  fechaFinVigencia: string;
  exportadorFabricanteMismo: string;
  numeroRegistroFiscal: string;
  tipo: string;
  cantidadTotalImportador: string;
  razonSocialImportador: string;
  domicilio: string;
  ciudadImportador: string;
  cpImportador: string;
  PaisImportador: string;
}

export function createInitialState(): TextilesState {
  return {
    numeroFactura: '',
    cantidadTotal: '',
    unidadDeMedida: '',
    fechaInicioInput: '',
    valorDolares: '',
    taxId: '',
    razonSocial: '',
    calle: '',
    ciudad: '',
    cp: '',
    pais: '',
    flexRadioRegistro: '',
    estado: '',
    representacionFederal: '',
    fraccionArancelaria: '',
    descripcionProducto: '',
    tratado: '',
    subproducto: '',
    mecanismo: '',
    typoCategoria: '',
    typoRegimen: '',
    descripcionCategoriaTextil: '',
    PaisDestino: '',
    unidadMedidaCategoriaTextil: '',
    factorConversionCategoriaTextil: '',
    fechaInicioVigencia: '',
    fechaFinVigencia: '',
    exportadorFabricanteMismo: '',
    numeroRegistroFiscal: '',
    tipo: '',
    cantidadTotalImportador: '',
    razonSocialImportador: '',
    domicilio: '',
    ciudadImportador: '',
    cpImportador: '',
    PaisImportador: ''
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'seccion', resettable: true})
export class ElegibilidadDeTextilesStore extends Store<TextilesState> {
  constructor() {
    super(createInitialState());
  }

  public setNumeroFactura(numeroFactura: string) {
      this.update((state) => ({
          ...state,
          numeroFactura,
      }));
  }

  public setCantidadTotal(cantidadTotal: string) {
    this.update((state) => ({
        ...state,
        cantidadTotal,
    }));
  }

  public setUnidadDeMedida(unidadDeMedida: string) {
    this.update((state) => ({
        ...state,
        unidadDeMedida,
    }));
  }

  public setFechaInicioInput(fechaInicioInput: string) {
    this.update((state) => ({
        ...state,
        fechaInicioInput,
    }));
  }

  public setValorDolares(valorDolares: string) {
    this.update((state) => ({
        ...state,
        valorDolares,
    }));
  }

  public setTaxId(taxId: string) {
    this.update((state) => ({
        ...state,
        taxId,
    }));
  }

  public setRazonSocial(razonSocial: string) {
    this.update((state) => ({
        ...state,
        razonSocial,
    }));
  }

  public setCalle(calle: string) {
    this.update((state) => ({
        ...state,
        calle,
    }));
  }

  public setCiudad(ciudad: string) {
    this.update((state) => ({
        ...state,
        ciudad,
    }));
  }

  public setCp(cp: string) {
    this.update((state) => ({
        ...state,
        cp,
    }));
  }

  public setPais(pais: string) {
    this.update((state) => ({
        ...state,
        pais,
    }));
  }

  public setFlexRadioRegistro(flexRadioRegistro: string) {
    this.update((state) => ({
        ...state,
        flexRadioRegistro,
    }));
  }

  public setEstado(estado: string) {
    this.update((state) => ({
        ...state,
        estado,
    }));
    console.log("111111",estado)
  }

  public setRepresentacionFederal(representacionFederal: string) {
    this.update((state) => ({
        ...state,
        representacionFederal,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string) {
    this.update((state) => ({
        ...state,
        fraccionArancelaria,
    }));
  }

  public setDescripcionProducto(descripcionProducto: string) {
    this.update((state) => ({
        ...state,
        descripcionProducto,
    }));
  }

  public settratado(tratado: string) {
    this.update((state) => ({
        ...state,
        tratado,
    }));
  }

  public setSubproducto(subproducto: string) {
    this.update((state) => ({
        ...state,
        subproducto,
    }));
  }

  public setMecanismo(mecanismo: string) {
    this.update((state) => ({
        ...state,
        mecanismo,
    }));
  }

  public setTypoCategoria(typoCategoria: string) {
    this.update((state) => ({
        ...state,
        typoCategoria,
    }));
  }

  public setDescripcionCategoriaTextil(descripcionCategoriaTextil: string) {
    this.update((state) => ({
        ...state,
        descripcionCategoriaTextil,
    }));
  }

  public setPaisDestino(PaisDestino: string) {
    this.update((state) => ({
        ...state,
        PaisDestino,
    }));
  }

  public setUnidadMedidaCategoriaTextil(unidadMedidaCategoriaTextil: string) {
    this.update((state) => ({
        ...state,
        unidadMedidaCategoriaTextil,
    }));
  }

  public setFactorConversionCategoriaTextil(factorConversionCategoriaTextil: string) {
    this.update((state) => ({
        ...state,
        factorConversionCategoriaTextil,
    }));
  }

  public setFechaInicioVigencia(fechaInicioVigencia: string) {
    this.update((state) => ({
        ...state,
        fechaInicioVigencia,
    }));
  }

  public setFechaFinVigencia(fechaFinVigencia: string) {
    this.update((state) => ({
        ...state,
        fechaFinVigencia,
    }));
  }

  public setexportadorFabricanteMismo(exportadorFabricanteMismo: string) {
    this.update((state) => ({
        ...state,
        exportadorFabricanteMismo,
    }));
  }

  public setNumeroRegistroFiscal(numeroRegistroFiscal: string) {
    this.update((state) => ({
        ...state,
        numeroRegistroFiscal,
    }));
  }

  public setTipo(tipo: string) {
    this.update((state) => ({
        ...state,
        tipo,
    }));
  }

  public setCantidadTotalImportador(cantidadTotalImportador: string) {
    this.update((state) => ({
        ...state,
        cantidadTotalImportador,
    }));
  }

  public setRazonSocialImportador(razonSocialImportador: string) {
    this.update((state) => ({
        ...state,
        razonSocialImportador,
    }));
  }

  public setdomicilio(domicilio: string) {
    this.update((state) => ({
        ...state,
        domicilio,
    }));
  }

  public setCiudadImportador(ciudadImportador: string) {
    this.update((state) => ({
        ...state,
        ciudadImportador,
    }));
  }

  public setCpImportador(cpImportador: string) {
    this.update((state) => ({
        ...state,
        cpImportador,
    }));
  }

  public setPaisImportador(PaisImportador: string) {
    this.update((state) => ({
        ...state,
        PaisImportador,
    }));
  }

}
