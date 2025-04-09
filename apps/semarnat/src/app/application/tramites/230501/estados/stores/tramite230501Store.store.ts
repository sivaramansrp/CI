import { ComposicionMaterial, DatosSolicitudFormType, PagoDerechosState, TablaNumeroCasType } from '../../models/materiales-peligrosos.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';


/**
 * @interface Tramite230501State
 * @description Define el estado para el trámite 230501, incluyendo datos de tablas, formularios y configuraciones.
 */
export interface Tramite230501State {
    pagoDerechosState: PagoDerechosState;
    datosSolicitudFormType: DatosSolicitudFormType;
    opcionesColapsableState: boolean;
    numeroCasTablaDatos: TablaNumeroCasType[];
    composicionTablaDatos: ComposicionMaterial[];
}

/**
 * @function createInitialState
 * @description Crea y devuelve el estado inicial para el trámite 230501.
 * @returns {Tramite230501State} El estado inicial del trámite.
 */
export function createInitialState(): Tramite230501State {
  return {
    opcionesColapsableState: false,
    datosSolicitudFormType: {
      tratadoRotterdam: false,
      listadoNacional: false,
      fraccionArancelaria: '',
      descripcionFraccion: '',
      convenioMinamata: false,
      numeroCas: '',
      descripcionNoArancelaria: '',
      nombreQuimico: '',
      nombreComun: '',
      nombreComercial: '',
      estadoFisico: '',
      cantidad: null,
      cantidadLetra: '',
      unidadMedida: '',
      licenciaSanitaria: '',
      usoEspecifico: '',
      fechaExportacion: '',
      modoCantidad: false
    },
    numeroCasTablaDatos: [],
    composicionTablaDatos: [],
    pagoDerechosState: {
      clave: '',
      dependencia: '',
      banco: '',
      llavePago: '',
      fecha: '',
      importePago: ''
    }
}
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Tramite230501', resettable: true })
export class Tramite230501Store extends Store<Tramite230501State> {
  constructor() {
    super(createInitialState());
  }
  /**
   * Establece una propiedad del estado de pago de derechos.
   *
   * @param property - El nombre de la propiedad del estado de pago de derechos que se va a actualizar.
   * @param value - El nuevo valor para la propiedad especificada.
   * @returns void
   */
  public setPagoDerechosStateProperty(property: string, value: string): void {
    this.update((state) => ({
      ...state,
      pagoDerechosState: {
        ...state.pagoDerechosState,
        [property]: value,
      },
    }));
  }

  /**
   * Actualiza las propiedades del formulario de datos de solicitud.
   *
   * @param value - Un objeto parcial que contiene las propiedades a actualizar en datosSolicitudFormType.
   * @returns void
   */
  public setDatosSolicitudFormType(value: DatosSolicitudFormType): void {
    this.update((state) => ({
      ...state,
      datosSolicitudFormType: {
        ...state.datosSolicitudFormType,
        ...value,
      },
    }));
  }

  /**
   * Establece un valor para una propiedad específica del formulario de datos de solicitud.
   *
   * @param property - El nombre de la propiedad que se actualizará en el formulario de datos de solicitud.
   * @param valueStr - El valor en formato de cadena que se asignará a la propiedad.
   * @param valorBooleano - (Opcional) Un valor booleano que se puede asignar a la propiedad si no se proporciona `valueStr`.
   * @param valorNombre - (Opcional) Un valor numérico que se puede asignar a la propiedad si no se proporciona `valueStr` ni `valorBooleano`.
   *
   * @remarks
   * La prioridad para asignar el valor a la propiedad es la siguiente:
   * 1. `valueStr` si está definido.
   * 2. `valorNombre` si `valueStr` no está definido.
   * 3. `valorBooleano` si ninguno de los anteriores está definido.
   *
   * Actualiza el estado del formulario de datos de solicitud con el nuevo valor para la propiedad especificada.
   */
  public setDatosSolicitudFormTypeProperty(property: string, valueStr: string, valorBooleano?: boolean, valorNombre?: number): void {
  const ACTIVA_VALOR = (valueStr) ? valueStr : (valorNombre) ? valorNombre : valorBooleano;
    this.update((state) => ({
      ...state,
      datosSolicitudFormType: {
        ...state.datosSolicitudFormType,
        [property]: ACTIVA_VALOR,
      },
    }));
  }
}
