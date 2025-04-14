import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PartidasDeLaMercanciaModelo } from '../../../../shared/models/partidas-de-la-mercancia.model';

/**
 * @interface Tramite130203State
 * @description Define la estructura del estado para el trámite 130203.
 */
export interface Tramite130203State {
  /** Nombre del producto. */
  producto: string;

  /** Descripción del producto. */
  descripcion: string;

  /** Fracción arancelaria del producto. */
  fraccion: string;

  /** Cantidad del producto. */
  cantidad: string;

  /** Valor de la partida en dólares estadounidenses. */
  valorPartidaUSD: number;

  /** Unidad de medida del producto. */
  unidadMedida: string;

  /** Información de la solicitud. */
  solicitud: string;

  /** Valor predeterminado del campo de selección. */
  defaultSelect: string;

  /** Producto predeterminado. */
  defaultProducto: string;

  /** Régimen relacionado con el trámite. */
  regimen: string;

  /** Clasificación del producto. */
  clasificacion: string;

  /** Fila seleccionada en la tabla de partidas de la mercancía. */
  filaSeleccionada: PartidasDeLaMercanciaModelo[];

  /** Cantidad de partidas de la mercancía. */
  cantidadPartidasDeLaMercancia: string;

  /** Valor de la partida en dólares estadounidenses para las partidas de la mercancía. */
  valorPartidaUSDPartidasDeLaMercancia: number;

  /** Descripción de las partidas de la mercancía. */
  descripcionPartidasDeLaMercancia: string;

  /** Valor de la factura en dólares estadounidenses. */
  valorFacturaUSD: string;

  /** Bloque relacionado con el trámite. */
  bloque: string;

  /** Uso específico del producto. */
  usoEspecifico: string;

  /** Justificación para la importación o exportación. */
  justificacionImportacionExportacion: string;

  /** Observaciones adicionales. */
  observaciones: string;

  /** Entidad relacionada con el trámite. */
  entidad: string;

  /** Representación relacionada con el trámite. */
  representacion: string;

  /** Indica si se debe mostrar la tabla. */
  mostrarTabla: boolean;

  /** Nombre del exportador. */
  nombreExportador: string;

  /** Dirección del exportador. */
  direccionExportador: string;

  /** Nombre del importador. */
  nombreImportador: string;

  /** Dirección del importador. */
  direccionImportador: string;

  /** Número en letra de los lotes. */
  numeroEnLetraDeLosLotes: string;

  /** Número en letra de los lotes en inglés. */
  numeroEnLetraDeLosLotesEnIngles: string;

  /** Número de la factura. */
  numeroDeFactura: string;

  /** Cantidad en quilates. */
  cantidadEnQuilates: string;

  /** Valor de los diamantes. */
  valorDeLosDiamantes: string;

  /** Estado relacionado con el trámite. */
  state: string;

  /** Indica si el producto es mixto. */
  mixed: boolean;

  /** País de origen del producto. */
  paisOrigen: number | null;

  /** Valor adicional para especificar detalles. */
  especifique: number;

  /** Número relacionado con el trámite. */
  numero: string;

  /** Tipo de empresa relacionada con el trámite. */
  tipoEmpresa: string;

  /** Valor del checkbox de línea. */
  lineaCheckbox: boolean;

  /** Nombre relacionado con el trámite. */
  nombre: string;
}

/**
 * @function createInitialState
 * @description Crea el estado inicial para el trámite 130203.
 * @returns {Tramite130203State} Estado inicial con valores predeterminados.
 */
export function createInitialState(): Tramite130203State {
  return {
    filaSeleccionada: [],
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

/**
 * @class Tramite130203Store
 * @description Clase que extiende la funcionalidad de Akita Store para gestionar el estado del trámite 130203.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130203' })
export class Tramite130203Store extends Store<Tramite130203State> {
  /**
   * @constructor
   * @description Inicializa el store con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * @method setFraccion
   * @description Actualiza el valor de la fracción arancelaria.
   * @param {string} fraccion - Nueva fracción arancelaria.
   */
  public setFraccion(fraccion: string): void {
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }

  /**
   * @method updateSolicitud
   * @description Actualiza la información de la solicitud.
   * @param {string} solicitud - Nueva solicitud.
   */
  public updateSolicitud(solicitud: string): void {
    this.update((state) => ({
      ...state,
      solicitud,
    }));
  }

  /**
   * @method updateDefaultSelect
   * @description Actualiza el valor predeterminado del campo de selección.
   * @param {string} defaultSelect - Nuevo valor predeterminado.
   */
  public updateDefaultSelect(defaultSelect: string): void {
    this.update((state) => ({
      ...state,
      defaultSelect,
    }));
  }

  /**
   * @method updateState
   * @description Actualiza múltiples propiedades del estado.
   * @param {Partial<Tramite130203State>} updates - Propiedades a actualizar.
   */
  public updateState(updates: Partial<Tramite130203State>): void {
    this.update(updates);
  }

  /**
   * @method setProducto
   * @description Actualiza el valor del producto.
   * @param {string} producto - Nuevo producto.
   */
  public setProducto(producto: string): void {
    this.update({ producto });
  }

  /**
   * @method setDescripcion
   * @description Actualiza la descripción del producto.
   * @param {string} descripcion - Nueva descripción.
   */
  public setDescripcion(descripcion: string): void {
    this.update({ descripcion });
  }

  /**
   * @method setCantidad
   * @description Actualiza la cantidad del producto.
   * @param {string} cantidad - Nueva cantidad.
   */
  public setCantidad(cantidad: string): void {
    this.update({ cantidad });
  }

  /**
   * @method setValorPartidaUSD
   * @description Actualiza el valor de la partida en dólares estadounidenses.
   * @param {number} valorPartidaUSD - Nuevo valor de la partida.
   */
  public setValorPartidaUSD(valorPartidaUSD: number): void {
    this.update({ valorPartidaUSD });
  }

  /**
   * @method setUnidadMedida
   * @description Actualiza la unidad de medida del producto.
   * @param {string} unidadMedida - Nueva unidad de medida.
   */
  public setUnidadMedida(unidadMedida: string): void {
    this.update({ unidadMedida });
  }

  /**
   * @method updateDefaultProducto
   * @description Actualiza el valor predeterminado del producto.
   * @param {string} defaultProducto - Nuevo valor predeterminado.
   */
  public updateDefaultProducto(defaultProducto: string): void {
    this.update({ defaultProducto });
  }

  /**
   * @method setregimen
   * @description Actualiza el régimen relacionado con el trámite.
   * @param {string} regimen - Nuevo régimen.
   */
  public setregimen(regimen: string): void {
    this.update({ regimen });
  }

  /**
   * @method setclasificacion
   * @description Actualiza la clasificación del producto.
   * @param {string} clasificacion - Nueva clasificación.
   */
  public setclasificacion(clasificacion: string): void {
    this.update({ clasificacion });
  }

  /**
   * @method setMostrarTabla
   * @description Actualiza el estado de visibilidad de la tabla.
   * @param {boolean} mostrar - Nuevo estado de visibilidad.
   */
  public setMostrarTabla(mostrar: boolean): void {
    this.update({ mostrarTabla: mostrar });
  }

  /**
   * @method setValorFacturaUSD
   * @description Actualiza el valor de la factura en dólares estadounidenses.
   * @param {string} valorFacturaUSD - Nuevo valor de la factura.
   */
  public setValorFacturaUSD(valorFacturaUSD: string): void {
    this.update((state) => ({
      ...state,
      valorFacturaUSD,
    }));
  }

  /**
   * @method setDescripcionPartidasDeLaMercancia
   * @description Actualiza la descripción de las partidas de la mercancía.
   * @param {string} descripcionPartidasDeLaMercancia - Nueva descripción de las partidas.
   */
  public setDescripcionPartidasDeLaMercancia(
    descripcionPartidasDeLaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      descripcionPartidasDeLaMercancia,
    }));
  }

  /**
   * @method setCantidadPartidasDeLaMercancia
   * @description Actualiza la cantidad de partidas de la mercancía.
   * @param {string} cantidadPartidasDeLaMercancia - Nueva cantidad de partidas.
   */
  public setCantidadPartidasDeLaMercancia(
    cantidadPartidasDeLaMercancia: string
  ): void {
    this.update((state) => ({
      ...state,
      cantidadPartidasDeLaMercancia,
    }));
  }

  /**
   * @method setvalorPartidaUSD
   * @description Actualiza el valor de la partida en dólares estadounidenses.
   * @param {number} valorPartidaUSD - Nuevo valor de la partida.
   */
  public setvalorPartidaUSD(valorPartidaUSD: number): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSD,
    }));
  }

  /**
   * @method setValorPartidaUSDPartidasDeLaMercancia
   * @description Actualiza el valor de la partida en dólares estadounidenses para las partidas de la mercancía.
   * @param {number} valorPartidaUSDPartidasDeLaMercancia - Nuevo valor de la partida.
   */
  public setValorPartidaUSDPartidasDeLaMercancia(
    valorPartidaUSDPartidasDeLaMercancia: number
  ): void {
    this.update((state) => ({
      ...state,
      valorPartidaUSDPartidasDeLaMercancia,
    }));
  }

  /**
   * @method setBloque
   * @description Actualiza el bloque relacionado con el trámite.
   * @param {string} bloque - Nuevo bloque.
   */
  public setBloque(bloque: string): void {
    this.update({ bloque });
  }

  /**
   * @method setUsoEspecifico
   * @description Actualiza el uso específico del producto.
   * @param {string} usoEspecifico - Nuevo uso específico.
   */
  public setUsoEspecifico(usoEspecifico: string): void {
    this.update({ usoEspecifico });
  }

  /**
   * @method setJustificacionImportacionExportacion
   * @description Actualiza la justificación para la importación o exportación.
   * @param {string} justificacionImportacionExportacion - Nueva justificación.
   */
  public setJustificacionImportacionExportacion(
    justificacionImportacionExportacion: string
  ): void {
    this.update({ justificacionImportacionExportacion });
  }

  /**
   * @method setObservaciones
   * @description Actualiza las observaciones adicionales.
   * @param {string} observaciones - Nuevas observaciones.
   */
  public setObservaciones(observaciones: string): void {
    this.update({ observaciones });
  }

  /**
   * @method setEntidad
   * @description Actualiza la entidad relacionada con el trámite.
   * @param {string} entidad - Nueva entidad.
   */
  public setEntidad(entidad: string): void {
    this.update({ entidad });
  }

  /**
   * @method setRepresentacion
   * @description Actualiza la representación relacionada con el trámite.
   * @param {string} representacion - Nueva representación.
   */
  public setRepresentacion(representacion: string): void {
    this.update({ representacion });
  }

  /**
   * @method storeTableValues
   * @description Almacena los valores de la fila seleccionada en la tabla.
   * @param {null} fila - Fila seleccionada.
   */
      public storeTableValues(fila: PartidasDeLaMercanciaModelo[]): void {
        this.update({
          filaSeleccionada: fila,
        });
      }

  /**
   * @method setNombreExportador
   * @description Actualiza el nombre del exportador.
   * @param {string} nombreExportador - Nuevo nombre del exportador.
   */
  public setNombreExportador(nombreExportador: string): void {
    this.update((state) => ({
      ...state,
      nombreExportador,
    }));
  }

  /**
   * @method setDireccionExportador
   * @description Actualiza la dirección del exportador.
   * @param {string} direccionExportador - Nueva dirección del exportador.
   */
  public setDireccionExportador(direccionExportador: string): void {
    this.update((state) => ({
      ...state,
      direccionExportador,
    }));
  }

  /**
   * @method setNombreImportador
   * @description Actualiza el nombre del importador.
   * @param {string} nombreImportador - Nuevo nombre del importador.
   */
  public setNombreImportador(nombreImportador: string): void {
    this.update((state) => ({
      ...state,
      nombreImportador,
    }));
  }

  /**
   * @method setDireccionImportador
   * @description Actualiza la dirección del importador.
   * @param {string} direccionImportador - Nueva dirección del importador.
   */
  public setDireccionImportador(direccionImportador: string): void {
    this.update((state) => ({
      ...state,
      direccionImportador,
    }));
  }

  /**
   * @method setNumeroEnLetraDeLosLotes
   * @description Actualiza el número en letra de los lotes.
   * @param {string} numeroEnLetraDeLosLotes - Nuevo número en letra.
   */
  public setNumeroEnLetraDeLosLotes(numeroEnLetraDeLosLotes: string): void {
    this.update((state) => ({
      ...state,
      numeroEnLetraDeLosLotes,
    }));
  }

  /**
   * @method setNumeroEnLetraDeLosLotesEnIngles
   * @description Actualiza el número en letra de los lotes en inglés.
   * @param {string} numeroEnLetraDeLosLotesEnIngles - Nuevo número en letra en inglés.
   */
  public setNumeroEnLetraDeLosLotesEnIngles(
    numeroEnLetraDeLosLotesEnIngles: string
  ): void {
    this.update((state) => ({
      ...state,
      numeroEnLetraDeLosLotesEnIngles,
    }));
  }

  /**
   * @method setNumeroDeFactura
   * @description Actualiza el número de la factura.
   * @param {string} numeroDeFactura - Nuevo número de factura.
   */
  public setNumeroDeFactura(numeroDeFactura: string): void {
    this.update((state) => ({
      ...state,
      numeroDeFactura,
    }));
  }

  /**
   * @method setCantidadEnQuilates
   * @description Actualiza la cantidad en quilates.
   * @param {string} cantidadEnQuilates - Nueva cantidad en quilates.
   */
  public setCantidadEnQuilates(cantidadEnQuilates: string): void {
    this.update((state) => ({
      ...state,
      cantidadEnQuilates,
    }));
  }

  /**
   * @method setValorDeLosDiamantes
   * @description Actualiza el valor de los diamantes.
   * @param {string} valorDeLosDiamantes - Nuevo valor de los diamantes.
   */
  public setValorDeLosDiamantes(valorDeLosDiamantes: string): void {
    this.update((state) => ({
      ...state,
      valorDeLosDiamantes,
    }));
  }

  /**
   * @method setEspecifique
   * @description Actualiza el valor adicional para especificar detalles.
   * @param {number} especifique - Nuevo valor adicional.
   */
  public setEspecifique(especifique: number): void {
    this.update({ especifique });
  }

  /**
   * @method setNumero
   * @description Actualiza el número relacionado con el trámite.
   * @param {string} numero - Nuevo número.
   */
  public setNumero(numero: string): void {
    this.update({ numero });
  }

  /**
   * @method setTipoEmpresa
   * @description Actualiza el tipo de empresa relacionada con el trámite.
   * @param {string} tipoEmpresa - Nuevo tipo de empresa.
   */
  public setTipoEmpresa(tipoEmpresa: string): void {
    this.update({ tipoEmpresa });
  }

  /**
   * @method setLineaCheckbox
   * @description Actualiza el valor del checkbox de línea.
   * @param {boolean} lineaCheckbox - Nuevo valor del checkbox.
   */
  public setLineaCheckbox(lineaCheckbox: boolean): void {
    this.update({ lineaCheckbox });
  }

  /**
   * @method setPaisOrigen
   * @description Actualiza el país de origen del producto.
   * @param {number | null} paisOrigen - Nuevo país de origen.
   */
  public setPaisOrigen(paisOrigen: number | null): void {
    this.update({ paisOrigen });
  }

  /**
   * @method setNombre
   * @description Actualiza el nombre relacionado con el trámite.
   * @param {string} nombre - Nuevo nombre.
   */
  public setNombre(nombre: string): void {
    this.update({ nombre });
  }
}
