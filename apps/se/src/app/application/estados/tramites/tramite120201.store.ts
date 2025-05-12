import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { InstrumentoCupoTPLForm } from '../../tramites/120201/models/cupos.model';

/**
 * Creacion del estado inicial para la interfaz de tramite 120201
 * @returns Cupos120201
 */
export interface Cupos120201State {
  /**
   * Clave del tratado
   * @type {string}
   */
  cveTratado: string;

  /**
   * Clave del régimen de clasificación
   * @type {string}
   */
  cveRegimenClasificacion: string;

  /**
   * Clave del país de destino
   * @type {string}
   */
  cvePaisDestino: string;

  /**
   * Clave de la fracción arancelaria
   * @type {string}
   */
  fraccionArancelaria: string;

  /**
   * Descripción del producto
   * @type {string}
   */
  productoDescripcion: string;

  /**
   * Descripción de la categoría textil
   * @type {string}
   */
  categoriaTextilDescripcion: string;

  /**
   * Clave del país de destino
   * @type {string}
   */
  paisDestino: string;

  /**
   * Clave del subproducto
   * @type {string}
   */
  subproductoClasificacion: string;

  /**
   * Mecanismo de asignación
   * @type {string}
   */
  asignacionMecanismo: string;

  /**
   * Categoría textil
   * @type {string}
   */
  categoriaTextil: string;

  /**
   * Unidad
   * @type {string}
   */
  unidad: string;

  /**
   * Factor de conversión
   * @type {number | null}
   */
  conversionFactor: number | null;

  /**
   * Fecha de inicio
   * @type {string}
   */
  fechaInicio: string;

  /**
   * Fecha final
   * @type {string}
   */
  fechaFinal: string;

  /**
   * Clave del estado
   * @type {string}
   */
  cveEstado: string;

  /**
   * Clave de la representación federal
   * @type {string}
   */
  cveRepresentacionFederal: string;


  /**
   * Descripción del bien final
   * @type {string}
   */
  bienFinalDescripcion: string;

  /**
   * Mostrar detalles del cupo
   * @type {boolean}
   */
  mostrarDetallesCupo: boolean;

  /**
   * Cuerpo de la tabla de datos
   * @type {InstrumentoCupoTPLForm[]}
   */
  cuerpoTablaDatos: InstrumentoCupoTPLForm[];
}

/**
 * Crea el estado inicial del trámite 120201.
 * @returns Estado inicial de tipo `Cupos120201State`.
 */
export function createInitialState(): Cupos120201State {
  return {
    cveTratado: '',
    cveRegimenClasificacion: '',
    cvePaisDestino: '',
    fraccionArancelaria: '',

    productoDescripcion: '',
    categoriaTextilDescripcion: '',
    paisDestino: '',
    subproductoClasificacion: '',
    asignacionMecanismo: '',
    categoriaTextil: '',
    unidad: '',
    conversionFactor: null,
    fechaInicio: '',
    fechaFinal: '',

    cveEstado: '',
    cveRepresentacionFederal: '',

    bienFinalDescripcion: '',

    mostrarDetallesCupo: false,
    cuerpoTablaDatos: []
  };
}

/**
 * Servicio de estado global para gestionar el trámite 130118 con Akita.
 */
@Injectable({
  providedIn: 'root',
})

/**
 * Configuración de la tienda Akita para el trámite 120201 con opción de reinicio.
 */
@StoreConfig({ name: 'tramite120201', resettable: true })
export class Tramite120201Store extends Store<Cupos120201State> {
  /**
   * Constructor que inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza el tratado.
   * @param cveTratado - Nuevo tratado.
   */
  public setTratado(cveTratado: string): void {
    this.update((state) => ({
      ...state,
      cveTratado,
    }));
  }

  /**
   * Actualiza el régimen de clasificación.
   * @param cveRegimenClasificacion - Nuevo régimen de clasificación.
   */
  public setRegimenClasificacion(cveRegimenClasificacion: string): void {
    this.update((state) => ({
      ...state,
      cveRegimenClasificacion,
    }));
  }

  /**
   * Actualiza el país destino.
   * @param cvePaisDestino - Nuevo país destino.
   */
  public setCvePaisDestino(cvePaisDestino: string): void {
    this.update((state) => ({
      ...state,
      cvePaisDestino,
    }));
  }

  /**
   * Actualiza la fracción arancelaria.
   * @param fraccionArancelaria - Nueva fracción arancelaria.
   */
  public setFraccionArancelaria(fraccionArancelaria: string): void {
    this.update((state) => ({
      ...state,
      fraccionArancelaria,
    }));
  }

  /**
   * Actualiza la descripción del producto.
   * @param productoDescripcion - Nueva descripción del producto.
   */
  public setProductoDescripcion(productoDescripcion: string): void {
    this.update((state) => ({
      ...state,
      productoDescripcion,
    }));
  }  

  /**
   * Actualiza la descripción de la categoría textil.
   * @param categoriaTextilDescripcion - Nueva descripción de la categoría textil.
   */
  public setCategoriaTextilDescripcion(categoriaTextilDescripcion: string): void {
    this.update((state) => ({
      ...state,
      categoriaTextilDescripcion,
    }));
  }

  /**
   * Actualiza el país destino.
   * @param paisDestino - Nuevo país destino.
   */
  public setPaisDestino(paisDestino: string): void {
    this.update((state) => ({
      ...state,
      paisDestino,
    }));
  }

  /**
   * Actualiza la clasificación del subproducto.
   * @param subproductoClasificacion - Nueva clasificación del subproducto.
   */
  public setSubproductoClasificacion(subproductoClasificacion: string): void {  
    this.update((state) => ({
      ...state,
      subproductoClasificacion,
    }));
  }

  /**
   * Actualiza el mecanismo de asignación.
   * @param asignacionMecanismo - Nuevo mecanismo de asignación.
   */
  public setAsignacionMecanismo(asignacionMecanismo: string): void {
    this.update((state) => ({
      ...state,
      asignacionMecanismo,
    }));
  }

  /**
   * Actualiza la categoría textil.
   * @param categoriaTextil - Nueva categoría textil.
   */
  public setCategoriaTextil(categoriaTextil: string): void {
    this.update((state) => ({
      ...state,
      categoriaTextil,
    }));
  }

  /**
   * Actualiza la unidad.
   * @param unidad - Nueva unidad.
   */
  public setUnidad(unidad: string): void {
    this.update((state) => ({
      ...state,
      unidad,
    }));
  }

  /**
   * Actualiza el factor de conversión.
   * @param conversionFactor - Nuevo factor de conversión.
   */
  public setConversionFactor(conversionFactor: number | null): void {
    this.update((state) => ({
      ...state,
      conversionFactor,
    }));
  }

  /**
   * Actualiza la fecha de inicio.
   * @param fechaInicio - Nueva fecha de inicio.
   */
  public setFechaInicio(fechaInicio: string): void {
    this.update((state) => ({
      ...state,
      fechaInicio,
    }));
  }

  /**
   * Actualiza la fecha final.
   * @param fechaFinal - Nueva fecha final.
   */
  public setFechaFinal(fechaFinal: string): void {
    this.update((state) => ({
      ...state,
      fechaFinal,
    }));
  }

  /**
   * Actualiza el estado.
   * @param cveEstado - Nuevo estado.
   */
  public setEstado(cveEstado: string): void {
    this.update((state) => ({
      ...state,
      cveEstado,
    }));
  }

  /**
   * Actualiza la representación federal.
   * @param cveRepresentacionFederal - Nueva representación federal.
   */
  public setRepresentacionFederal(cveRepresentacionFederal: string): void {
    this.update((state) => ({
      ...state,
      cveRepresentacionFederal,
    }));
  }

  /**
   * Actualiza la descripción del bien final.
   * @param bienFinalDescripcion - Nueva descripción del bien final.
   */
  public setBienFinalDescripcion(bienFinalDescripcion: string): void {
    this.update((state) => ({
      ...state,
      bienFinalDescripcion,
    }));
  }

  /**
   * Actualiza la visibilidad de los detalles del cupo.
   * @param mostrarDetallesCupo - Nueva visibilidad de los detalles del cupo.
   */
  public setMostrarDetallesCupo(mostrarDetallesCupo: boolean): void {
    this.update((state) => ({
      ...state,
      mostrarDetallesCupo,
    }));
  }

  /**
   * Actualiza el cuerpo de la tabla de datos.
   * @param cuerpoTablaDatos - Nuevo cuerpo de la tabla de datos.
   */
  public setCuerpoTablaDatos(cuerpoTablaDatos: InstrumentoCupoTPLForm[]): void {
    this.update((state) => ({
      ...state,
      cuerpoTablaDatos,
    }));
  }
}