import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { ConstanciaTramiteConfiguracion } from '@libs/shared/data-access-user/src/core/models/shared/acuse-y-resoluciones-folio-tramite.model';
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
  /** Año de la constancia. */
  anoDeLaConstancia: string;
  /**Número de la constancia*/
  numeroDeLaConstancia: string;
  /**DATOS Tabla Constancia Del Registro*/
  datosTablaConstanciaDelRegistro: ConstanciaTramiteConfiguracion[];
  /**Guardar Bandera*/
  guardarBandera: boolean;
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
    cantidadFacturasTotal: 5,
    numeroDeLaConstancia: '',
    anoDeLaConstancia: '',
    datosTablaConstanciaDelRegistro: [],
    guardarBandera: false,
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

  //create a function to set entire state
  /**
   * Actualiza el estado completo con un nuevo estado.
   * @param newState El nuevo estado a establecer.
   */
  public setTextilesState(newState: TextilesState): void {
    this.update(newState);
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

  /**
   * Actualiza la cantidad total de textiles en el estado.
   * @param cantidadTotal La nueva cantidad total.
   */
  public setCantidadTotal(cantidadTotal: string): void {
    this.update((state) => ({
      ...state,
      cantidadTotal,
    }));
  }

  /**
   * Actualiza la unidad de medida utilizada en el estado.
   * @param unidadDeMedida La nueva unidad de medida.
   */
  public setUnidadDeMedida(unidadDeMedida: string): void {
    this.update((state) => ({
      ...state,
      unidadDeMedida,
    }));
  }

  /**
   * Actualiza la fecha de inicio del trámite en el estado.
   * @param fechaInicioInput La nueva fecha de inicio.
   */
  public setFechaInicioInput(fechaInicioInput: string): void {
    this.update((state) => ({
      ...state,
      fechaInicioInput,
    }));
  }

  /**
   * Actualiza el valor en dólares de los textiles en el estado.
   * @param valorDolares El nuevo valor en dólares.
   */
  public setValorDolares(valorDolares: string): void {
    this.update((state) => ({
      ...state,
      valorDolares,
    }));
  }

  /**
   * Actualiza el Tax ID del exportador en el estado.
   * @param taxId El nuevo Tax ID.
   */
  public setTaxId(taxId: string): void {
    this.update((state) => ({
      ...state,
      taxId,
    }));
  }

  /**
   * Actualiza la razón social del exportador en el estado.
   * @param razonSocial La nueva razón social.
   */
  public setRazonSocial(razonSocial: string): void {
    this.update((state) => ({
      ...state,
      razonSocial,
    }));
  }

  /**
   * Actualiza la calle del domicilio del exportador en el estado.
   * @param calle La nueva calle.
   */
  public setCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      calle,
    }));
  }

  /**
   * Actualiza la ciudad del domicilio del exportador en el estado.
   * @param ciudad La nueva ciudad.
   */
  public setCiudad(ciudad: string): void {
    this.update((state) => ({
      ...state,
      ciudad,
    }));
  }

  /**
   * Actualiza el código postal del domicilio del exportador en el estado.
   * @param cp El nuevo código postal.
   */
  public setCp(cp: string): void {
    this.update((state) => ({
      ...state,
      cp,
    }));
  }

  /**
   * Actualiza el país del exportador en el estado.
   * @param pais El nuevo país.
   */
  public setPais(pais: string): void {
    this.update((state) => ({
      ...state,
      pais,
    }));
  }

  /**
   * Actualiza el registro seleccionado en el formulario en el estado.
   * @param flexRadioRegistro El nuevo valor del registro seleccionado.
   */
  public setFlexRadioRegistro(flexRadioRegistro: string): void {
    this.update((state) => ({
      ...state,
      flexRadioRegistro,
    }));
  }

  /**
   * Actualiza el estado del trámite en el estado.
   * @param estado El nuevo estado.
   */
  public setEstado(estado: string): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Actualiza la representación federal asociada en el estado.
   * @param representacionFederal La nueva representación federal.
   */
  public setRepresentacionFederal(representacionFederal: string): void {
    this.update((state) => ({
      ...state,
      representacionFederal,
    }));
  }

  /**
   * Actualiza la fracción arancelaria de los textiles en el estado.
   * @param fraccionArancelaria La nueva fracción arancelaria.
   */
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * Actualiza la descripción del producto textil en el estado.
   * @param descripcionProducto La nueva descripción del producto.
   */
  public setDescripcionProducto(descripcionProducto: string): void {
    this.update((state) => ({
      ...state,
      descripcionProducto,
    }));
  }

  /**
   * Actualiza el tratado comercial aplicable en el estado.
   * @param tratado El nuevo tratado comercial.
   */
  public setTratado(tratado: string): void {
    this.update((state) => ({
      ...state,
      tratado,
    }));
  }

  /**
   * Actualiza el subproducto relacionado en el estado.
   * @param subproducto El nuevo subproducto.
   */
  public setSubproducto(subproducto: string): void {
    this.update((state) => ({
      ...state,
      subproducto,
    }));
  }

  /**
   * Actualiza el mecanismo de operación en el estado.
   * @param mecanismo El nuevo mecanismo.
   */
  public setMecanismo(mecanismo: string): void {
    this.update((state) => ({
      ...state,
      mecanismo,
    }));
  }

  /**
   * Actualiza el tipo de categoría del textil en el estado.
   * @param typoCategoria El nuevo tipo de categoría.
   */
  public setTypoCategoria(typoCategoria: string): void {
    this.update((state) => ({
      ...state,
      typoCategoria,
    }));
  }

  /**
   * Actualiza el tipo de régimen aplicable en el estado.
   * @param typoRegimen El nuevo tipo de régimen.
   */
  public setTypoRegimen(typoRegimen: string): void {
    this.update((state) => ({
      ...state,
      typoRegimen,
    }));
  }

  /**
   * Actualiza la descripción de la categoría textil en el estado.
   * @param descripcionCategoriaTextil La nueva descripción de la categoría.
   */
  public setDescripcionCategoriaTextil(
    descripcionCategoriaTextil: string
  ): void {
    this.update((state) => ({
      ...state,
      descripcionCategoriaTextil,
    }));
  }

  /**
   * Actualiza el país de destino de los textiles en el estado.
   * @param PaisDestino El nuevo país de destino.
   */
  public setPaisDestino(PaisDestino: string): void {
    this.update((state) => ({
      ...state,
      PaisDestino,
    }));
  }

  /**
   * Actualiza la unidad de medida de la categoría textil en el estado.
   * @param unidadMedidaCategoriaTextil La nueva unidad de medida.
   */
  public setUnidadMedidaCategoriaTextil(
    unidadMedidaCategoriaTextil: string
  ): void {
    this.update((state) => ({
      ...state,
      unidadMedidaCategoriaTextil,
    }));
  }

  /**
   * Actualiza el factor de conversión de la categoría textil en el estado.
   * @param factorConversionCategoriaTextil El nuevo factor de conversión.
   */
  public setFactorConversionCategoriaTextil(
    factorConversionCategoriaTextil: string
  ): void {
    this.update((state) => ({
      ...state,
      factorConversionCategoriaTextil,
    }));
  }

  /**
   * Actualiza la fecha de inicio de vigencia en el estado.
   * @param fechaInicioVigencia La nueva fecha de inicio de vigencia.
   */
  public setFechaInicioVigencia(fechaInicioVigencia: string): void {
    this.update((state) => ({
      ...state,
      fechaInicioVigencia,
    }));
  }

  /**
   * Actualiza la fecha de fin de vigencia en el estado.
   * @param fechaFinVigencia La nueva fecha de fin de vigencia.
   */
  public setFechaFinVigencia(fechaFinVigencia: string): void {
    this.update((state) => ({
      ...state,
      fechaFinVigencia,
    }));
  }

  /**
   * Actualiza la cantidad de facturas asociadas en el estado.
   * @param cantidadFacturas La nueva cantidad de facturas.
   */
  public setCantidadFacturas(cantidadFacturas: string): void {
    this.update((state) => ({
      ...state,
      cantidadFacturas,
    }));
  }

  /**
   * Actualiza el valor que indica si el exportador y fabricante son el mismo en el estado.
   * @param exportadorFabricanteMismo El nuevo valor.
   */
  public setExportadorFabricanteMismo(exportadorFabricanteMismo: string): void {
    this.update((state) => ({
      ...state,
      exportadorFabricanteMismo,
    }));
  }

  /**
   * Actualiza el número de registro fiscal del exportador en el estado.
   * @param numeroRegistroFiscal El nuevo número de registro fiscal.
   */
  public setNumeroRegistroFiscal(numeroRegistroFiscal: string): void {
    this.update((state) => ({
      ...state,
      numeroRegistroFiscal,
    }));
  }

  /**
   * Actualiza el tipo de trámite en el estado.
   * @param tipo El nuevo tipo de trámite.
   */
  public setTipo(tipo: string): void {
    this.update((state) => ({
      ...state,
      tipo,
    }));
  }

  /**
   * Actualiza la cantidad total del importador en el estado.
   * @param cantidadTotalImportador La nueva cantidad total del importador.
   */
  public setCantidadTotalImportador(cantidadTotalImportador: string): void {
    this.update((state) => ({
      ...state,
      cantidadTotalImportador,
    }));
  }

  /**
   * Actualiza la razón social del importador en el estado.
   * @param razonSocialImportador La nueva razón social del importador.
   */
  public setRazonSocialImportador(razonSocialImportador: string): void {
    this.update((state) => ({
      ...state,
      razonSocialImportador,
    }));
  }

  /**
   * Actualiza el domicilio del importador en el estado.
   * @param domicilio El nuevo domicilio.
   */
  public setDomicilio(domicilio: string): void {
    this.update((state) => ({
      ...state,
      domicilio,
    }));
  }

  /**
   * Actualiza la ciudad del importador en el estado.
   * @param ciudadImportador La nueva ciudad del importador.
   */
  public setCiudadImportador(ciudadImportador: string): void {
    this.update((state) => ({
      ...state,
      ciudadImportador,
    }));
  }

  /**
   * Actualiza el código postal del importador en el estado.
   * @param cpImportador El nuevo código postal del importador.
   */
  public setCpImportador(cpImportador: string): void {
    this.update((state) => ({
      ...state,
      cpImportador,
    }));
  }

  /**
   * Actualiza el país del importador en el estado.
   * @param PaisImportador El nuevo país del importador.
   */
  public setPaisImportador(PaisImportador: string): void {
    this.update((state) => ({
      ...state,
      PaisImportador,
    }));
  }

  /**
   * Actualiza la lista de formas válidas de operación en el estado.
   * @param formaValida La nueva lista de formas válidas.
   */
  public setFormaValida(formaValida: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      formaValida,
    }));
  }

  /**
   * Actualiza los metros cuadrados equivalentes de los textiles en el estado.
   * @param metrosCuadradosEquivalentes El nuevo valor de metros cuadrados equivalentes.
   */
  public setMetrosCuadradosEquivalentes(
    metrosCuadradosEquivalentes: number
  ): void {
    this.update((state) => ({
      ...state,
      metrosCuadradosEquivalentes,
    }));
  }

  /**
   * Actualiza la cantidad total de facturas en el estado.
   * @param cantidadFacturasTotal La nueva cantidad total de facturas.
   */
  public setCantidadFacturasTotal(cantidadFacturasTotal: number): void {
    this.update((state) => ({
      ...state,
      cantidadFacturasTotal,
    }));
  }

  /**
   * Actualiza los datos de la tabla de constancia del registro en el estado.
   * @param datosTablaConstanciaDelRegistro Los nuevos datos de la tabla.
   */
  public setdatosTablaConstanciaDelRegistro(
    datosTablaConstanciaDelRegistro: Array<ConstanciaTramiteConfiguracion>
  ): void {
    this.update((state) => ({
      ...state,
      datosTablaConstanciaDelRegistro,
    }));
  }

  /**
   * Actualiza la bandera de guardado en el estado.
   * @param guardarBandera El nuevo valor de la bandera de guardado.
   */
  public setguardarBandera(guardarBandera: boolean): void {
    this.update((state) => ({
      ...state,
      guardarBandera,
    }));
  }

  // Similar TSDoc comments can be added for other setter methods.
}
