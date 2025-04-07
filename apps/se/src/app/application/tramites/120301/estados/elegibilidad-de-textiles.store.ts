import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
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
  cantidadFacturas: string;
  exportadorFabricanteMismo: string;
  numeroRegistroFiscal: string;
  tipo: string;
  cantidadTotalImportador: string;
  razonSocialImportador: string;
  domicilio: string;
  ciudadImportador: string;
  cpImportador: string;
  PaisImportador: string;
  formaValida: Catalogo[];
  metrosCuadradosEquivalentes:number;
  cantidadFacturasTotal:number;
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
    cantidadFacturas: '',
    exportadorFabricanteMismo: '',
    numeroRegistroFiscal: '',
    tipo: '',
    cantidadTotalImportador: '',
    razonSocialImportador: '',
    domicilio: '',
    ciudadImportador: '',
    cpImportador: '',
    PaisImportador: '',
    formaValida: [],
    metrosCuadradosEquivalentes:53,
    cantidadFacturasTotal:5
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'seccion', resettable: true})
export class ElegibilidadDeTextilesStore extends Store<TextilesState> {
  constructor() {
    super(createInitialState());
  }

  public setNumeroFactura(numeroFactura: string): void {
      this.update((state) => ({
          ...state,
          numeroFactura,
      }));
  }

  public setCantidadTotal(cantidadTotal: string): void {
    this.update((state) => ({
        ...state,
        cantidadTotal,
    }));
  }

  public setUnidadDeMedida(unidadDeMedida: string): void {
    this.update((state) => ({
        ...state,
        unidadDeMedida,
    }));
  }

  public setFechaInicioInput(fechaInicioInput: string): void {
    this.update((state) => ({
        ...state,
        fechaInicioInput,
    }));
  }

  public setValorDolares(valorDolares: string): void {
    this.update((state) => ({
        ...state,
        valorDolares,
    }));
  }

  public setTaxId(taxId: string): void {
    this.update((state) => ({
        ...state,
        taxId,
    }));
  }

  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
        ...state,
        razonSocial,
    }));
  }

  public setCalle(calle: string): void {
    this.update((state) => ({
        ...state,
        calle,
    }));
  }

  public setCiudad(ciudad: string): void {
    this.update((state) => ({
        ...state,
        ciudad,
    }));
  }

  public setCp(cp: string): void {
    this.update((state) => ({
        ...state,
        cp,
    }));
  }

  public setPais(pais: string): void {
    this.update((state) => ({
        ...state,
        pais,
    }));
  }

  public setFlexRadioRegistro(flexRadioRegistro: string): void {
    this.update((state) => ({
        ...state,
        flexRadioRegistro,
    }));
  }

  public setEstado(estado: string): void {
    this.update((state) => ({
        ...state,
        estado,
    }));
  }

  public setRepresentacionFederal(representacionFederal: string): void {
    this.update((state) => ({
        ...state,
        representacionFederal,
    }));
  }

  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
        ...state,
        fraccionArancelaria,
    }));
  }

  public setDescripcionProducto(descripcionProducto: string): void {
    this.update((state) => ({
        ...state,
        descripcionProducto,
    }));
  }

  public setTratado(tratado: string): void {
    this.update((state) => ({
        ...state,
        tratado,
    }));
  }

  public setSubproducto(subproducto: string): void {
    this.update((state) => ({
        ...state,
        subproducto,
    }));
  }

  public setMecanismo(mecanismo: string): void {
    this.update((state) => ({
        ...state,
        mecanismo,
    }));
  }

  public setTypoCategoria(typoCategoria: string): void {
    this.update((state) => ({
        ...state,
        typoCategoria,
    }));
  }

  public setTypoRegimen(typoRegimen: string): void {
    this.update((state) => ({
        ...state,
        typoRegimen,
    }));
  }

  public setDescripcionCategoriaTextil(descripcionCategoriaTextil: string): void {
    this.update((state) => ({
        ...state,
        descripcionCategoriaTextil,
    }));
  }

  public setPaisDestino(PaisDestino: string): void {
    this.update((state) => ({
        ...state,
        PaisDestino,
    }));
  }

  public setUnidadMedidaCategoriaTextil(unidadMedidaCategoriaTextil: string): void {
    this.update((state) => ({
        ...state,
        unidadMedidaCategoriaTextil,
    }));
  }

  public setFactorConversionCategoriaTextil(factorConversionCategoriaTextil: string): void {
    this.update((state) => ({
        ...state,
        factorConversionCategoriaTextil,
    }));
  }

  public setFechaInicioVigencia(fechaInicioVigencia: string): void {
    this.update((state) => ({
        ...state,
        fechaInicioVigencia,
    }));
  }

  public setFechaFinVigencia(fechaFinVigencia: string): void {
    this.update((state) => ({
        ...state,
        fechaFinVigencia,
    }));
  }

  public setCantidadFacturas(cantidadFacturas: string): void {
    this.update((state) => ({
        ...state,
        cantidadFacturas,
    }));
  }

  public setExportadorFabricanteMismo(exportadorFabricanteMismo: string): void {
    this.update((state) => ({
        ...state,
        exportadorFabricanteMismo,
    }));
  }

  public setNumeroRegistroFiscal(numeroRegistroFiscal: string): void {
    this.update((state) => ({
        ...state,
        numeroRegistroFiscal,
    }));
  }

  public setTipo(tipo: string): void {
    this.update((state) => ({
        ...state,
        tipo,
    }));
  }

  public setCantidadTotalImportador(cantidadTotalImportador: string): void {
    this.update((state) => ({
        ...state,
        cantidadTotalImportador,
    }));
  }

  public setRazonSocialImportador(razonSocialImportador: string): void {
    this.update((state) => ({
        ...state,
        razonSocialImportador,
    }));
  }

  public setDomicilio(domicilio: string): void {
    this.update((state) => ({
        ...state,
        domicilio,
    }));
  }

  public setCiudadImportador(ciudadImportador: string): void {
    this.update((state) => ({
        ...state,
        ciudadImportador,
    }));
  }

  public setCpImportador(cpImportador: string): void {
    this.update((state) => ({
        ...state,
        cpImportador,
    }));
  }

  public setPaisImportador(PaisImportador: string): void {
    this.update((state) => ({
        ...state,
        PaisImportador,
    }));
  }

  public setFormaValida(formaValida: Catalogo[]): void {
    this.update((state) => ({
        ...state,
        formaValida,
    }));
  }

  public setMetrosCuadradosEquivalentes(metrosCuadradosEquivalentes: number): void {
    this.update((state) => ({
        ...state,
        metrosCuadradosEquivalentes,
    }));
  }
  public setCantidadFacturasTotal(cantidadFacturasTotal: number): void {
    this.update((state) => ({
        ...state,
        cantidadFacturasTotal,
    }));
  }
  

}
