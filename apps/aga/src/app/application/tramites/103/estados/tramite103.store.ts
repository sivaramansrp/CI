import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que representa un catálogo genérico.
 */
export interface Catalogo {
  /**
   * Identificador único del catálogo.
   */
  id: number;

  /**
   * Descripción del catálogo.
   */
  descripcion: string;
}

/**
 * Interfaz que representa el estado inicial de la solicitud 103.
 */
export interface Solicitud103State {
  manifesto: string;
  organismoPublico: string;
  aduana: Catalogo[] | null;
  destinoMercancia: Catalogo[] | null;
  showTabla: boolean;
  tipoDeMercancia: string;
  usoEspecifico: string;
  unidadMedida: string;
  vehiculo: string;
  condicionMercancia: string;
  ano: Catalogo[] | null;
  cantidad: string;
  marca: string;
  modelo: string;
  serie: string;
  datosDelMercancia: [];
  nombre: string;
  calle: string;
  numeroExterior: number;
  numeroInterior: number;
  telefono: number;
  correoElectronico: string;
  pais: Catalogo[] | null;
  codigoPostal: number;
  estado: number;
  colonia: number;
  opcion: string;
  valorSeleccionado: string | null;
}

/**
 * Crea el estado inicial para la solicitud 103.
 * @returns {Solicitud103State} Estado inicial.
 */
export function createInitialState(): Solicitud103State {
  return {
    manifesto: '',
    organismoPublico: '',
    aduana: null,
    destinoMercancia: null,
    showTabla: true,
    tipoDeMercancia: '',
    usoEspecifico: '',
    unidadMedida: '',
    vehiculo: '',
    condicionMercancia: '',
    ano: null,
    cantidad: '',
    marca: '',
    modelo: '',
    serie: '',
    datosDelMercancia: [],
    nombre: '',
    calle: '',
    numeroExterior: 0,
    numeroInterior: 0,
    telefono: 0,
    correoElectronico: '',
    pais: null,
    codigoPostal: 0,
    estado: 0,
    colonia: 0,
    opcion: '',
    valorSeleccionado: null
  };
}

/**
 * Store para manejar el estado de la solicitud 103.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite103', resettable: true })
export class Tramite103Store extends Store<Solicitud103State> {
  /**
   * Constructor del store. Inicializa el estado.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Establece el manifiesto.
   * @param manifesto Texto del manifiesto.
   */
  public setManifesto(manifesto: string): void {
    this.update((state) => ({ ...state, manifesto }));
  }

  /**
   * Establece el organismo público.
   * @param organismoPublico Nombre del organismo.
   */
  public setOrganismoPublico(organismoPublico: string): void {
    this.update((state) => ({ ...state, organismoPublico }));
  }

  /**
   * Establece la lista de aduanas.
   * @param aduana Lista de aduanas.
   */
  public setAduana(aduana: Catalogo[]): void {
    this.update((state) => ({ ...state, aduana }));
  }

  /**
   * Establece los destinos de mercancía.
   * @param destinoMercancia Lista de destinos.
   */
  public setDestinoMercancia(destinoMercancia: Catalogo[]): void {
    this.update((state) => ({ ...state, destinoMercancia }));
  }

  /**
   * Establece el tipo de mercancía.
   * @param tipoDeMercancia Tipo.
   */
  public setTipoDeMercancia(tipoDeMercancia: string): void {
    this.update((state) => ({ ...state, tipoDeMercancia }));
  }

  /**
   * Establece el uso específico de la mercancía.
   * @param usoEspecifico Uso específico.
   */
  public setUsoEspecifico(usoEspecifico: string): void {
    this.update((state) => ({ ...state, usoEspecifico }));
  }

  /**
   * Establece la unidad de medida.
   * @param unidadMedida Unidad.
   */
  public setUnidadMedida(unidadMedida: string): void {
    this.update((state) => ({ ...state, unidadMedida }));
  }

  /**
   * Establece el vehículo.
   * @param vehiculo Vehículo.
   */
  public setVehiculo(vehiculo: string): void {
    this.update((state) => ({ ...state, vehiculo }));
  }

  /**
   * Establece la condición de la mercancía.
   * @param condicionMercancia Condición.
   */
  public setCondicionMercancia(condicionMercancia: string): void {
    this.update((state) => ({ ...state, condicionMercancia }));
  }

  /**
   * Establece los años disponibles.
   * @param ano Años.
   */
  public setAno(ano: Catalogo[]): void {
    this.update((state) => ({ ...state, ano }));
  }

  /**
   * Establece la cantidad.
   * @param cantidad Cantidad.
   */
  public setCantidad(cantidad: string): void {
    this.update((state) => ({ ...state, cantidad }));
  }

  /**
   * Establece la marca.
   * @param marca Marca.
   */
  public setMarca(marca: string): void {
    this.update((state) => ({ ...state, marca }));
  }

  /**
   * Establece el modelo.
   * @param modelo Modelo.
   */
  public setModelo(modelo: string): void {
    this.update((state) => ({ ...state, modelo }));
  }

  /**
   * Establece la serie.
   * @param serie Serie.
   */
  public setSerie(serie: string): void {
    this.update((state) => ({ ...state, serie }));
  }

  /**
   * Establece los datos del contenedor.
   * @param datosDelMercancia Datos.
   */
  public setDelMercancia(datosDelMercancia: []): void {
    this.update((state) => ({ ...state, datosDelMercancia }));
  }

  /**
   * Establece el nombre.
   * @param nombre Nombre.
   */
  public setNombre(nombre: string): void {
    this.update((state) => ({ ...state, nombre }));
  }

  /**
   * Establece la calle.
   * @param calle Calle.
   */
  public setCalle(calle: string): void {
    this.update((state) => ({ ...state, calle }));
  }

  /**
   * Establece el número exterior.
   * @param numeroExterior Número exterior.
   */
  public setNumeroExterior(numeroExterior: number): void {
    this.update((state) => ({ ...state, numeroExterior }));
  }

  /**
   * Establece el número interior.
   * @param numeroInterior Número interior.
   */
  public setNumeroInterior(numeroInterior: number): void {
    this.update((state) => ({ ...state, numeroInterior }));
  }

  /**
   * Establece el teléfono.
   * @param telefono Teléfono.
   */
  public setTelefono(telefono: number): void {
    this.update((state) => ({ ...state, telefono }));
  }

  /**
   * Establece el correo electrónico.
   * @param correoElectronico Correo.
   */
  public setCorreoElectronico(correoElectronico: string): void {
    this.update((state) => ({ ...state, correoElectronico }));
  }

  /**
   * Establece el país.
   * @param pais País.
   */
  public setPais(pais: Catalogo[]): void {
    this.update((state) => ({ ...state, pais }));
  }

  /**
   * Establece el código postal.
   * @param codigoPostal Código.
   */
  public setCodigoPostal(codigoPostal: number): void {
    this.update((state) => ({ ...state, codigoPostal }));
  }

  /**
   * Establece el estado.
   * @param estado Estado.
   */
  public setEstado(estado: number): void {
    this.update((state) => ({ ...state, estado }));
  }

  /**
   * Establece la colonia.
   * @param colonia Colonia.
   */
  public setColonia(colonia: number): void {
    this.update((state) => ({ ...state, colonia }));
  }

  /**
   * Establece la opción.
   * @param opcion Opción.
   */
  public setOpcion(opcion: string): void {
    this.update((state) => ({ ...state, opcion }));
  }

  /**
   * Establece el valor seleccionado.
   * @param valorSeleccionado Valor.
   */
  public setValorSeleccionado(valorSeleccionado: string | null): void {
    this.update((state) => ({ ...state, valorSeleccionado }));
  }

  /**
   * Limpia todos los datos del estado.
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}
