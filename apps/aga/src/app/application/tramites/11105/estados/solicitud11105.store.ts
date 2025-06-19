import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Representa el estado de la solicitud 11105.
 */
export interface Solicitud11105State {

  /**
   * Código de la aduana relacionada con la solicitud.
   */
  aduana: string;
  nombre: string;
  tipoMercancia: string;
  usoEspecifico?: string;
  condicion?: string;
  marca?: string;
  ano?: string;
  modelo?: string;
  serie?: string;
  manifesto?: string;
  calle?: string;
  numeroExterior?: string;
  numeroInterior?: string;
  telefono?: string;
  correoElectronico?: string;
  pais?: string;
  codigoPostal?: string;
  estado?: string;
  colonia?: string;
  opcion:boolean;
  folioOriginal?: string;
  justificacionDelDesistimiento?: string;
}

/**
 * Crea el estado inicial para la solicitud 11105.
 *
 * @returns {Solicitud11105State} El estado inicial con los valores predeterminados:
 * - `radioParcial`: Indica si la opción parcial está seleccionada (por defecto `false`).
 * - `contenedores`: Cadena vacía para los contenedores.
 * - `aduana`: Cadena vacía para la aduana.
 * - `observaciones`: Cadena vacía para las observaciones.
 */
export function createInitialState(): Solicitud11105State {
  return {
    aduana: '',
    nombre: '',
    tipoMercancia: '',
    usoEspecifico: '',
    condicion: '',
    marca: '',
    ano: '',
    modelo: '',
    serie: '',
    manifesto: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    telefono: '',
    correoElectronico: '',
    pais: '',
    codigoPostal: '',
    estado: '',
    colonia: '',
    opcion: false,
    folioOriginal: '',
    justificacionDelDesistimiento: '',
  };
}

/**
 * Store que gestiona el estado de la solicitud 11105.
 */
/**
 * Clase `Solicitud11105Store` que extiende de `Store<Solicitud11105State>`.
 * 
 * Esta clase representa una tienda de estado para manejar la información
 * relacionada con la solicitud 11105. Proporciona métodos para actualizar
 * diferentes propiedades del estado y para restablecer el estado a su
 * configuración inicial.
 * 
 * @remarks
 * - La clase utiliza decoradores de Angular como `@Injectable` para
 *   inyección de dependencias y `@StoreConfig` para configurar la tienda.
 * - Los métodos de esta clase permiten modificar propiedades específicas
 *   del estado de manera controlada.
 * 
 * @example
 * ```typescript
 * const store = new Solicitud11105Store();
 * store.setRadioParcial(true);
 * store.setContenedores('ABC123');
 * store.limpiarSolicitud();
 * ```
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitud11105', resettable: true })
export class Solicitud11105Store extends Store<Solicitud11105State> {
  /**
   * Constructor de la clase.
   * Inicializa el estado inicial llamando al método `createInitialState`.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el valor de la propiedad "aduana" en el estado.
   *
   * @param aduana - El valor de la aduana que se desea establecer.
   */
  public setAduana(aduana: string): void {
    this.update((state) => ({ ...state, aduana }));
  }

  public setNombre(nombre: string): void {
    this.update((state) => ({ ...state, nombre }));
  }

  public setTipoMercancia(tipoMercancia: string): void {
    this.update((state) => ({ ...state, tipoMercancia }));
  }

  public setUsoEspecifico(usoEspecifico: string): void {
    this.update((state) => ({ ...state, usoEspecifico }));
  }

  public setCondicion(condicion: string): void {
    this.update((state) => ({ ...state, condicion }));
  }

  public setMarca(marca: string): void {
    this.update((state) => ({ ...state, marca }));
  }

  public setAno(ano: string): void {
    this.update((state) => ({ ...state, ano }));
  }

  public setModelo(modelo: string): void {
    this.update((state) => ({ ...state, modelo }));
  }

  public setSerie(serie: string): void {
    this.update((state) => ({ ...state, serie }));
  }

  public setManifesto(manifesto: string): void {
    this.update((state) => ({ ...state, manifesto }));
  }

  public setCalle(calle: string): void {
    this.update((state) => ({ ...state, calle }));
  }

  public setNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({ ...state, numeroExterior }));
  }

  public setNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({ ...state, numeroInterior }));
  }

  public setTelefono(telefono: string): void {
    this.update((state) => ({ ...state, telefono }));
  }

  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({ ...state, correoElectronico }));
  }

  public setPais(pais: string): void {
    this.update((state) => ({ ...state, pais }));
  }

  public setCodigoPostal(codigoPostal: string): void {
  this.update((state) => ({ ...state, codigoPostal }));
  }

  public setEstado(estado: string): void {
    this.update((state) => ({ ...state, estado }));
  }

  public setColonia(colonia: string): void {
    this.update((state) => ({ ...state, colonia }));
  }

  public setFolioOriginal(folioOriginal: string): void {
  this.update((state) => ({ ...state, folioOriginal }));
  }

  public setJustificacionDelDesistimiento(justificacionDelDesistimiento: string): void {
  this.update((state) => ({ ...state, justificacionDelDesistimiento }));
  }

  public setOpcion(opcion: boolean): void {
    this.update((state) => ({ ...state, opcion }));
  }

  /**
   * Limpia la solicitud actual restableciendo su estado.
   * Este método llama a la función `reset` para reiniciar los valores
   * de la solicitud a su estado inicial.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
