import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { TablaDatos } from '../../models/aviso-siglos.models';

import { CatalogoResponse } from '@libs/shared/data-access-user/src';

/**
 * Interfaz que define el estado del trámite 270201.
 * Este estado contiene información sobre varios catálogos y detalles de la obra de arte.
 * 
 * @interface Tramite270201State
 */
export interface Tramite270201State {
  /**
   * Representa la operación seleccionada del catálogo.
   * Puede ser nulo si no se ha seleccionado una operación.
   * 
   * @property {CatalogoResponse | null} operacion
   */
  operacion: CatalogoResponse | null;

  /**
   * Representa el movimiento seleccionado del catálogo.
   * Puede ser nulo si no se ha seleccionado un movimiento.
   * 
   * @property {CatalogoResponse | null} movimiento
   */
  movimiento: CatalogoResponse | null;

  /**
   * Representa el motivo seleccionado del catálogo.
   * Puede ser nulo si no se ha seleccionado un motivo.
   * 
   * @property {CatalogoResponse | null} motivo
   */
  motivo: CatalogoResponse | null;

  /**
   * Representa el país seleccionado del catálogo.
   * Puede ser nulo si no se ha seleccionado un país.
   * 
   * @property {CatalogoResponse | null} pais
   */
  pais: CatalogoResponse | null;

  /**
   * Representa la ciudad donde se realiza el trámite.
   * 
   * @property {string} ciudad
   */
  ciudad: string;

  /**
   * Representa el medio de transporte seleccionado del catálogo.
   * Puede ser nulo si no se ha seleccionado un medio de transporte.
   * 
   * @property {CatalogoResponse | null} transporte
   */
  transporte: CatalogoResponse | null;

  /**
   * Representa la aduana seleccionada del catálogo.
   * Puede ser nulo si no se ha seleccionado una aduana.
   * 
   * @property {CatalogoResponse | null} aduana
   */
  aduana: CatalogoResponse | null;

  /**
   * Representa el autor de la obra de arte.
   * 
   * @property {string} autor
   */
  autor: string;

  /**
   * Representa el título de la obra de arte.
   * 
   * @property {string} titulo
   */
  titulo: string;

  /**
   * Representa la técnica utilizada en la obra de arte.
   * 
   * @property {string} tecnica
   */
  tecnica: string;

  /**
   * Representa el alto de la obra de arte.
   * 
   * @property {string} alto
   */
  alto: string;

  /**
   * Representa el ancho de la obra de arte.
   * 
   * @property {string} ancho
   */
  ancho: string;

  /**
   * Representa la profundidad de la obra de arte.
   * 
   * @property {string} profundidad
   */
  profundidad: string;

  /**
   * Representa el diámetro de la obra de arte.
   * 
   * @property {string} diametro
   */
  diametro: string;

  /**
   * Representa variables adicionales de la obra de arte.
   * 
   * @property {string} variables
   */
  variables: string;

  /**
   * Representa el año de creación de la obra de arte.
   * 
   * @property {string} anoDeCreacion
   */
  anoDeCreacion: string;

  /**
   * Representa el avalúo de la obra de arte.
   * 
   * @property {string} avaluo
   */
  avaluo: string;

  /**
   * Representa la moneda seleccionada del catálogo para el avalúo.
   * Puede ser nulo si no se ha seleccionado una moneda.
   * 
   * @property {CatalogoResponse | null} moneda
   */
  moneda: CatalogoResponse | null;

  /**
   * Representa el propietario de la obra de arte.
   * 
   * @property {string} propietario
   */
  propietario: string;

  /**
   * Representa la fracción arancelaria seleccionada del catálogo.
   * Puede ser nulo si no se ha seleccionado una fracción arancelaria.
   * 
   * @property {CatalogoResponse | null} fraccionArancelaria
   */
  fraccionArancelaria: CatalogoResponse | null;

  /**
   * Representa la descripción de la fracción arancelaria.
   * 
   * @property {string} descripcionArancelaria
   */
  descripcionArancelaria: string;

  /**
   * Arreglo que contiene los datos de las obras de arte.
   * Cada obra de arte está representada por un objeto del tipo TablaDatos.
   * 
   * @property {TablaDatos[]} ObraDeArte
   */
  ObraDeArte: TablaDatos[];
}

/**
 * Función que crea el estado inicial para el trámite 270201.
 * Esta función devuelve un objeto que representa el estado inicial con todos sus campos configurados con valores predeterminados.
 * 
 * @returns {Tramite270201State}
 */
export function createInitialState(): Tramite270201State {
  return {
    /**
     * Operación seleccionada del catálogo. Inicialmente es nulo.
     */
    operacion: null,

    /**
     * Movimiento seleccionado del catálogo. Inicialmente es nulo.
     */
    movimiento: null,

    /**
     * Motivo seleccionado del catálogo. Inicialmente es nulo.
     */
    motivo: null,

    /**
     * País seleccionado del catálogo. Inicialmente es nulo.
     */
    pais: null,

    /**
     * Ciudad donde se realiza el trámite. Inicialmente está vacío.
     */
    ciudad: '',

    /**
     * Medio de transporte seleccionado del catálogo. Inicialmente es nulo.
     */
    transporte: null,

    /**
     * Aduana seleccionada del catálogo. Inicialmente es nula.
     */
    aduana: null,

    /**
     * Autor de la obra de arte. Inicialmente está vacío.
     */
    autor: '',

    /**
     * Título de la obra de arte. Inicialmente está vacío.
     */
    titulo: '',

    /**
     * Técnica utilizada en la obra de arte. Inicialmente está vacío.
     */
    tecnica: '',

    /**
     * Alto de la obra de arte. Inicialmente está vacío.
     */
    alto: '',

    /**
     * Ancho de la obra de arte. Inicialmente está vacío.
     */
    ancho: '',

    /**
     * Profundidad de la obra de arte. Inicialmente está vacío.
     */
    profundidad: '',

    /**
     * Diámetro de la obra de arte. Inicialmente está vacío.
     */
    diametro: '',

    /**
     * Variables adicionales de la obra de arte. Inicialmente está vacío.
     */
    variables: '',

    /**
     * Año de creación de la obra de arte. Inicialmente está vacío.
     */
    anoDeCreacion: '',

    /**
     * Avalúo de la obra de arte. Inicialmente está vacío.
     */
    avaluo: '',

    /**
     * Moneda seleccionada del catálogo para el avalúo. Inicialmente es nula.
     */
    moneda: null,

    /**
     * Propietario de la obra de arte. Inicialmente está vacío.
     */
    propietario: '',

    /**
     * Fracción arancelaria seleccionada del catálogo. Inicialmente es nula.
     */
    fraccionArancelaria: null,

    /**
     * Descripción de la fracción arancelaria. Inicialmente está vacío.
     */
    descripcionArancelaria: '',

    /**
     * Arreglo que contiene los datos de las obras de arte. Inicialmente está vacío.
     */
    ObraDeArte: [],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'avisoSiglosState', resettable: true })
export class Tramite270201Store extends Store<Tramite270201State> {
  constructor() {
    super(createInitialState());
  }

  /**
 * @method setOperacion
 * @description
 * Actualiza el estado con la operación seleccionada.
 * @param {CatalogoResponse} selectedOperacion - La operación seleccionada.
 */
public setOperacion(selectedOperacion: CatalogoResponse): void {
  this.update((state) => ({
    ...state,
    selectedOperacion,
  }));
}

/**
 * @method setMovimiento
 * @description
 * Actualiza el estado con el movimiento seleccionado.
 * @param {CatalogoResponse} selectedMovimiento - El movimiento seleccionado.
 */
public setMovimiento(selectedMovimiento: CatalogoResponse): void {
  this.update((state) => ({
    ...state,
    selectedMovimiento,
  }));
}

/**
 * @method setMotivo
 * @description
 * Actualiza el estado con el motivo seleccionado.
 * @param {CatalogoResponse} selectedMotivo - El motivo seleccionado.
 */
public setMotivo(selectedMotivo: CatalogoResponse): void {
  this.update((state) => ({
    ...state,
    selectedMotivo,
  }));
}

/**
 * @method setPais
 * @description
 * Actualiza el estado con el país seleccionado.
 * @param {CatalogoResponse} selectedPais - El país seleccionado.
 */
public setPais(selectedPais: CatalogoResponse): void {
  this.update((state) => ({
    ...state,
    selectedPais,
  }));
}

/**
 * @method setCiudad
 * @description
 * Actualiza el estado con la ciudad seleccionada.
 * @param {string} selectedCiudad - La ciudad seleccionada.
 */
public setCiudad(selectedCiudad: string): void {
  this.update((state) => ({
    ...state,
    selectedCiudad,
  }));
}

/**
 * @method setTransporte
 * @description
 * Actualiza el estado con el medio de transporte seleccionado.
 * @param {CatalogoResponse} selectedTransporte - El transporte seleccionado.
 */
public setTransporte(selectedTransporte: CatalogoResponse): void {
  this.update((state) => ({
    ...state,
    selectedTransporte,
  }));
}

/**
 * @method setAduana
 * @description
 * Actualiza el estado con la aduana seleccionada.
 * @param {CatalogoResponse} selectedAduana - La aduana seleccionada.
 */
public setAduana(selectedAduana: CatalogoResponse): void {
  this.update((state) => ({
    ...state,
    selectedAduana,
  }));
}

/**
 * @method setAutor
 * @description
 * Actualiza el estado con el autor de la obra de arte seleccionado.
 * @param {string} selectedAutor - El nombre del autor seleccionado.
 */
public setAutor(selectedAutor: string): void {
  this.update((state) => ({
    ...state,
    selectedAutor,
  }));
}

/**
 * @method setTitulo
 * @description
 * Actualiza el estado con el título de la obra de arte seleccionado.
 * @param {string} selectedTitulo - El título seleccionado.
 */
public setTitulo(selectedTitulo: string): void {
  this.update((state) => ({
    ...state,
    selectedTitulo,
  }));
}

/**
 * @method setTecnica
 * @description
 * Actualiza el estado con la técnica utilizada en la obra de arte seleccionada.
 * @param {string} selectedTecnica - La técnica seleccionada.
 */
public setTecnica(selectedTecnica: string): void {
  this.update((state) => ({
    ...state,
    selectedTecnica,
  }));
}

  /**
 * @method setAlto
 * @description
 * Actualiza el estado con el alto de la obra de arte seleccionada.
 * @param {string} selectedAlto - El alto en centímetros.
 */
public setAlto(selectedAlto: string): void {
  this.update((state) => ({
    ...state,
    selectedAlto,
  }));
}

/**
 * @method setAncho
 * @description
 * Actualiza el estado con el ancho de la obra de arte seleccionada.
 * @param {string} selectedAncho - El ancho en centímetros.
 */
public setAncho(selectedAncho: string): void {
  this.update((state) => ({
    ...state,
    selectedAncho,
  }));
}

/**
 * @method setProfundidad
 * @description
 * Actualiza el estado con la profundidad de la obra de arte seleccionada.
 * @param {string} selectedProfundidad - La profundidad en centímetros.
 */
public setProfundidad(selectedProfundidad: string): void {
  this.update((state) => ({
    ...state,
    selectedProfundidad,
  }));
}

/**
 * @method setDiametro
 * @description
 * Actualiza el estado con el diámetro de la obra de arte seleccionada.
 * @param {string} selectedDiametro - El diámetro en centímetros.
 */
public setDiametro(selectedDiametro: string): void {
  this.update((state) => ({
    ...state,
    selectedDiametro,
  }));
}

/**
 * @method setVariables
 * @description
 * Actualiza el estado con las variables adicionales de la obra de arte seleccionada.
 * @param {string} selectedVariables - Las variables adicionales.
 */
public setVariables(selectedVariables: string): void {
  this.update((state) => ({
    ...state,
    selectedVariables,
  }));
}

  /**
 * @method setAnoDeCreacion
 * @description
 * Actualiza el estado con el año de creación de la obra de arte seleccionada.
 * @param {string} selectedAnoDeCreacion - El año de creación de la obra.
 */
public setAnoDeCreacion(selectedAnoDeCreacion: string): void {
  this.update((state) => ({
    ...state,
    selectedAnoDeCreacion,
  }));
}

/**
 * @method setAvaluo
 * @description
 * Actualiza el estado con el avalúo de la obra de arte seleccionada.
 * @param {string} selectedAvaluo - El valor estimado de la obra.
 */
public setAvaluo(selectedAvaluo: string): void {
  this.update((state) => ({
    ...state,
    selectedAvaluo,
  }));
}

/**
 * @method setMoneda
 * @description
 * Actualiza el estado con la moneda asociada al avalúo de la obra de arte seleccionada.
 * @param {CatalogoResponse} selectedMoneda - La moneda seleccionada.
 */
public setMoneda(selectedMoneda: CatalogoResponse): void {
  this.update((state) => ({
    ...state,
    selectedMoneda,
  }));
}

/**
 * @method setPropietario
 * @description
 * Actualiza el estado con el propietario de la obra de arte seleccionada.
 * @param {string} selectedPropietario - El nombre del propietario.
 */
public setPropietario(selectedPropietario: string): void {
  this.update((state) => ({
    ...state,
    selectedPropietario,
  }));
}

/**
 * @method setFraccionArancelaria
 * @description
 * Actualiza el estado con la fracción arancelaria asociada.
 * @param {CatalogoResponse} selectedFraccionArancelaria - La fracción arancelaria seleccionada.
 */
public setFraccionArancelaria(
  selectedFraccionArancelaria: CatalogoResponse
): void {
  this.update((state) => ({
    ...state,
    selectedFraccionArancelaria,
  }));
}

/**
 * @method setDescripcionArancelaria
 * @description
 * Actualiza el estado con la descripción arancelaria de los bienes relacionados.
 * @param {string} selectedDescripcionArancelaria - La descripción arancelaria.
 */
public setDescripcionArancelaria(
  selectedDescripcionArancelaria: string
): void {
  this.update((state) => ({
    ...state,
    selectedDescripcionArancelaria,
  }));
}

/**
 * @method setObraDeArte
 * @description
 * Actualiza el estado con los datos de la obra de arte seleccionada.
 * @param {TableData[]} obraDeArte - Lista de obras de arte.
 */
public setObraDeArte(obraDeArte: TablaDatos[]): void {
  this.update((state) => ({
    ...state,
    ObraDeArte: obraDeArte,
  }));
}

}
