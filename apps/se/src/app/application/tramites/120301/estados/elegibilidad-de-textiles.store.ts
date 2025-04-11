import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';

/**
 * Representa el estado de la sección de elegibilidad de textiles.
 */
export interface TextilesState {
  /** Número de factura asociado al trámite. */
  numeroFactura: string;
  /** Cantidad total de textiles. */
  cantidadTotal: string;
  /** Unidad de medida utilizada. */
  unidadDeMedida: string;
  /** Fecha de inicio del trámite. */
  fechaInicioInput: string;
  /** Valor en dólares de los textiles. */
  valorDolares: string;
  /** Identificación fiscal del exportador. */
  taxId: string;
  /** Razón social del exportador. */
  razonSocial: string;
  /** Calle del domicilio del exportador. */
  calle: string;
  /** Ciudad del domicilio del exportador. */
  ciudad: string;
  /** Código postal del domicilio del exportador. */
  cp: string;
  /** País del exportador. */
  pais: string;
  /** Registro seleccionado en el formulario. */
  flexRadioRegistro: string;
  /** Estado del trámite. */
  estado: string;
  /** Representación federal asociada. */
  representacionFederal: string;
  /** Fracción arancelaria de los textiles. */
  fraccionArancelaria: string;
  /** Descripción del producto textil. */
  descripcionProducto: string;
  /** Tratado comercial aplicable. */
  tratado: string;
  /** Subproducto relacionado. */
  subproducto: string;
  /** Mecanismo de operación. */
  mecanismo: string;
  /** Tipo de categoría del textil. */
  typoCategoria: string;
  /** Tipo de régimen aplicable. */
  typoRegimen: string;
  /** Descripción de la categoría textil. */
  descripcionCategoriaTextil: string;
  /** País de destino de los textiles. */
  PaisDestino: string;
  /** Unidad de medida de la categoría textil. */
  unidadMedidaCategoriaTextil: string;
  /** Factor de conversión de la categoría textil. */
  factorConversionCategoriaTextil: string;
  /** Fecha de inicio de vigencia. */
  fechaInicioVigencia: string;
  /** Fecha de fin de vigencia. */
  fechaFinVigencia: string;
  /** Cantidad de facturas asociadas. */
  cantidadFacturas: string;
  /** Indica si el exportador y fabricante son el mismo. */
  exportadorFabricanteMismo: string;
  /** Número de registro fiscal del exportador. */
  numeroRegistroFiscal: string;
  /** Tipo de trámite. */
  tipo: string;
  /** Cantidad total del importador. */
  cantidadTotalImportador: string;
  /** Razón social del importador. */
  razonSocialImportador: string;
  /** Domicilio del importador. */
  domicilio: string;
  /** Ciudad del importador. */
  ciudadImportador: string;
  /** Código postal del importador. */
  cpImportador: string;
  /** País del importador. */
  PaisImportador: string;
  /** Lista de formas válidas de operación. */
  formaValida: Catalogo[];
  /** Metros cuadrados equivalentes de los textiles. */
  metrosCuadradosEquivalentes: number;
  /** Cantidad total de facturas. */
  cantidadFacturasTotal: number;
}

/**
 * Crea el estado inicial para la sección de elegibilidad de textiles.
 * 
 * @returns El estado inicial de tipo `TextilesState`.
 */
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
    metrosCuadradosEquivalentes: 53,
    cantidadFacturasTotal: 5
  };
}

/**
 * @description
 * Store para gestionar el estado de la sección de elegibilidad de textiles.
 * Proporciona métodos para actualizar propiedades específicas del estado.
 * 
 * @extends Store<TextilesState>
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'seccion', resettable: true })
export class ElegibilidadDeTextilesStore extends Store<TextilesState> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el número de factura en el estado.
   * @param numeroFactura El nuevo número de factura.
   */
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
  
  // Similar TSDoc comments can be added for other setter methods.

}
