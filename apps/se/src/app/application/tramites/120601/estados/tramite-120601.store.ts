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
    /** Nombre del socio */
    nombre?: string;
    /** Primer apellido del socio */
    apellidoPaterno?: string;
    /** Código postal del socio */
    codigoPostal?: string;
    /** estado del socio */
    estado?: string;
    /** correo del socio */
    correoElectronico?: string;
    /** tax del socio */
    taxId?: string;
    /** Denominación del socio */
    denominacion?: string;
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
      nacionalidad: 'Yes',
      persona: 'Yes',
      cadenaDependencia: '',
      nombre: '',
      apellidoPaterno: '',
      codigoPostal: '',
      estado: '',
      correoElectronico: '',
      taxId: '',
      denominacion: ''
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
  public setCadenaDependencia(cadenaDependencia: string):void {
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
  public setNacionalidad(nacionalidad: string):void {
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
  public setPersona(persona: string):void {
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
  public setTipoDeEmpresa(tipoDeEmpresa: string):void {
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
  public setActividadEconomicaClave(actividadEconomicaClave: string):void {
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
  public setEstado(estado: string):void {
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
  public setRepresentacion(representacion: string):void {
    this.update((state)=> ({
      ...state,
      representacionFederal: {
        ...state.representacionFederal,
        representacion
      }
    }))
  }

   /**
   * Actualiza el estado con los nuevos datos proporcionados.
   * Utiliza el método update del store para modificar el estado actual.
   */
  public establecerDatos(datos: Partial<Tramites120601State>): void {
    this.update((state) => ({
      ...state,
      datosGeneralesSocios:{
        ...state.datosGeneralesSocios,
        ...datos,
      },
    }));
  }

}