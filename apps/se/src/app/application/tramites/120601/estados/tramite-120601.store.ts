import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Interfaz que define la estructura del estado para el trámite 120601.
 */
export interface Tramites120601State {
  /** Datos generales de los socios */
  datosGeneralesSocios: {
    /** Nacionalidad del socio */
    nacionalidad: string;
    /** Tipo de persona del socio */
    persona: string;
    /** Cadena de dependencia o RFC del socio */
    cadenaDependencia: string;
  },
  /** Datos de la solicitud */
  datosDeLaSolicitud: {
    /** Tipo de empresa seleccionada */
    tipoDeEmpresa: string;
    /** Clave de la actividad económica */
    actividadEconomicaClave: string;
  },
  /** Datos de la representación federal */
  representacionFederal: {
    /** Estado seleccionado */
    estado: string;
    /** Representación seleccionada */
    representacion: string;
  }
}

/**
 * Crea el estado inicial para el store de Tramites120601.
 * Este estado contiene los datos generales de los socios,
 * los datos de la solicitud y la representación federal.
 * @returns Tramites120601State Estado inicial del trámite.
 */
export function createInitialState(): Tramites120601State {
  return {
    datosGeneralesSocios: {
      nacionalidad: 'No',
      persona: 'No',
      cadenaDependencia: ''
    },
    datosDeLaSolicitud: {
      tipoDeEmpresa: '',           
      actividadEconomicaClave: ''
    },
    representacionFederal: {
      estado: '',
      representacion: '',
    }
  };  
}

/**
 * Store para manejar el estado del trámite 120601.
 * Este store utiliza Akita para gestionar el estado de la aplicación.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramites120601', resettable: true })
export class Tramite120601Store extends Store<Tramites120601State> {
  /**
   * Constructor que inicializa el store con el estado inicial.
   */
  constructor() {
    super(createInitialState());
  }

  /**
   * Actualiza la cadena de dependencia en los datos generales de socios.
   * @param cadenaDependencia Nueva cadena de dependencia o RFC.
   */
  public setCadenaDependencia(cadenaDependencia: string) {
    this.update((state) => ({
      ...state,
      datosGeneralesSocios: {
        ...state.datosGeneralesSocios,
        cadenaDependencia,
      }
    }));
  }

  /**
   * Actualiza la nacionalidad en los datos generales de socios.
   * @param nacionalidad Nueva nacionalidad.
   */
  public setNacionalidad(nacionalidad: string) {
    this.update((state) => ({
      ...state,
      datosGeneralesSocios: {
        ...state.datosGeneralesSocios,
        nacionalidad,
      }
    }));
  }

  /**
   * Actualiza el tipo de persona en los datos generales de socios.
   * @param persona Nuevo tipo de persona.
   */
  public setPersona(persona: string) {
    this.update((state) => ({
      ...state,
      datosGeneralesSocios: {
        ...state.datosGeneralesSocios,
        persona,
      }
    }));
  }

  /**
   * Actualiza el tipo de empresa en los datos de la solicitud.
   * @param tipoDeEmpresa Nuevo tipo de empresa.
   */
  public setTipoDeEmpresa(tipoDeEmpresa: string) {
    this.update((state) => ({
      ...state,
      datosDeLaSolicitud: {
        ...state.datosDeLaSolicitud,
        tipoDeEmpresa,
      }
    }));
  }

  /**
   * Actualiza la clave de actividad económica en los datos de la solicitud.
   * @param actividadEconomicaClave Nueva clave de actividad económica.
   */
  public setActividadEconomicaClave(actividadEconomicaClave: string) {
    this.update((state) => ({
      ...state,
      datosDeLaSolicitud: {
        ...state.datosDeLaSolicitud,
        actividadEconomicaClave,
      }
    }));
  }

  /**
   * Actualiza el estado en la representación federal.
   * @param estado Nuevo estado seleccionado.
   */
  public setEstado(estado: string) {
    this.update((state) => ({
      ...state,
      representacionFederal: {
        ...state.representacionFederal,
        estado
      }
    }));
  }

  /**
   * Actualiza la representación en la representación federal.
   * @param representacion Nueva representación seleccionada.
   */
  public setRepresentacion(representacion: string) {
    this.update((state)=> ({
      ...state,
      representacionFederal: {
        ...state.representacionFederal,
        representacion
      }
    }))
  }

}