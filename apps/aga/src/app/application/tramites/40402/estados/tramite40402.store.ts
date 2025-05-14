import { Injectable } from '@angular/core';
import { PersonaFisicaExtranjeraForm } from '../models/transportacion-maritima.model';
import { PersonaMoralExtranjeraForm } from '../models/transportacion-maritima.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Modelo de estado para el trámite 40402.
 */
export interface Tramitenacionales40402State {
  /**
   * Lista que indica el estado de cada sección del formulario (true si está activa, false si no).
   */
  seccion: boolean[];

  /**
   * Lista que indica si cada sección del formulario es válida (true si es válida, false si no).
   */
  formaValida: boolean[];


    /**
     * Número de seguro social de la persona física extranjera.
     * @type {string}
     */
    seguroNumero?: string;

    /**
     * Nombre de la persona física extranjera.
     * @type {string}
     */
    nombrePFE?: string;

    /**
     * Apellido paterno de la persona física extranjera.
     * @type {string}
     */
    apellidoPaternoPFE?: string;

    /**
     * Apellido materno de la persona física extranjera.
     * @type {string}
     */
    apellidoMaternoPFE?: string;

    /**
     * Correo electrónico de la persona física extranjera.
     * @type {string}
     */
    correoPFE?: string;

    /**
     * País de la persona física extranjera.
     * @type {string}
     */
    paisPFE?: string;

    /**
     * Código postal de la persona física extranjera.
     * @type {string}
     */
    codigoPostalPFE?: string;

    /**
     * Ciudad de la persona física extranjera.
     * @type {string}
     */
    ciudadPFE?: string;

    /**
     * Estado de la persona física extranjera.
     * @type {string}
     */
    estadoPFE?: string;

    /**
     * Calle de la persona física extranjera.
     * @type {string}
     */
    callePFE?: string;

    /**
     * Número exterior de la persona física extranjera.
     * @type {string}
     */
    numeroExteriorPFE?: string;

    /**
     * Número interior de la persona física extranjera.
     * @type {string}
     */
    numeroInteriorPFE?: string;


      /**
       * Tabla de personas físicas extranjeras.
       * @type {PersonaFisicaExtranjeraForm[]}
       */
      personaFisicaExtranjeraTabla?: PersonaFisicaExtranjeraForm[];
  
      /**
       * Tabla de personas morales extranjeras.
       * @type {PersonaMoralExtranjeraForm[]}
       */
      personaMoralExtranjeraTabla?: PersonaMoralExtranjeraForm[];
          /**
     * Denominación de la persona moral extranjera.
     * @type {string}
     */
    denominacionPME?: string;

    /**
     * Correo electrónico de la persona moral extranjera.
     * @type {string}
     */
    correoPME?: string;

    /**
     * País de la persona moral extranjera.
     * @type {number | string}
     */
    paisPME?: number | string;

    /**
     * Código postal de la persona moral extranjera.
     * @type {string}
     */
    codigoPostalPME?: string;

    /**
     * Ciudad de la persona moral extranjera.
     * @type {string}
     */
    ciudadPME?: string;

    /**
     * Estado de la persona moral extranjera.
     * @type {string}
     */
    estadoPME?: string;

    /**
     * Calle de la persona moral extranjera.
     * @type {string}
     */
    callePME?: string;

    /**
     * Número exterior de la persona moral extranjera.
     * @type {string}
     */
    numeroExteriorPME?: string;

    /**
     * Número interior de la persona moral extranjera.
     * @type {string}
     */
    numeroInteriorPME?: string;

    /**
     * Nombre del director general de la persona moral extranjera.
     * @type {string}
     */
    nombreDG?: string;

    /**
     * Apellido paterno del director general de la persona moral extranjera.
     * @type {string}
     */
    apellidoPaternoDG?: string;

    /**
     * Apellido materno del director general de la persona moral extranjera.
     * @type {string}
     */
    apellidoMaternoDG?: string;

}

/**
 * Función para crear el estado inicial del trámite 40402.
 * @returns El estado inicial del trámite.
 */
export function createTramiteState(): Tramitenacionales40402State {
  return {
    seccion: [],
    formaValida: [],

    seguroNumero: '',
    nombrePFE: '',
    apellidoPaternoPFE: '',
    apellidoMaternoPFE: '',
    correoPFE: '',
    paisPFE: '',
    codigoPostalPFE: '',
    ciudadPFE: '',
    estadoPFE: '',
    callePFE: '',
    numeroExteriorPFE: '',
    numeroInteriorPFE: '',

    personaFisicaExtranjeraTabla: [],
    personaMoralExtranjeraTabla: [],

    denominacionPME: '',
    correoPME: '',
    paisPME: '',
    codigoPostalPME: '',
    ciudadPME: '',
    estadoPME: '',
    callePME: '',
    numeroExteriorPME: '',
    numeroInteriorPME: '',
    nombreDG: '',
    apellidoPaternoDG: '',
    apellidoMaternoDG: '',

  };
}

/**
 * Almacén de estado para gestionar los datos relacionados con el trámite 40402.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite40402', resettable: true })
export class Tramite40402Store extends Store<Tramitenacionales40402State> {
  /**
   * Constructor del almacén.
   * Inicializa el estado con los valores predeterminados.
   */
  constructor() {
    super(createTramiteState());
  }

  /**
   * Actualiza el estado de las secciones del formulario.
   * @param seccion - Lista que indica el estado de cada sección (true si está activa, false si no).
   */
  public establecerSeccion(seccion: boolean[]): void {
    this.update((state) => ({
      ...state,
      seccion,
    }));
  }

  /**
   * Actualiza el estado de validación de las secciones del formulario.
   * @param formaValida - Lista que indica si cada sección del formulario es válida (true si es válida, false si no).
   */
  public establecerFormaValida(formaValida: boolean[]): void {
    this.update((state) => ({
      ...state,
      formaValida,
    }));
  }


    /**
     * Establece el número de seguro social de la persona física extranjera en el estado.
     * @param seguroNumero - Número de seguro social de la persona física extranjera.
     * @description Establece el número de seguro social de la persona física extranjera en el estado.
     */
    public setSeguroNumero(seguroNumero: string): void {
        this.update((state) => ({
            ...state,
            seguroNumero,
        }));
    }

    /**
     * Establece el nombre de la persona física extranjera en el estado.
     * @param nombrePFE - Nombre de la persona física extranjera.
     * @description Establece el nombre de la persona física extranjera en el estado.
     */
    public setNombrePFE(nombrePFE: string): void {
        this.update((state) => ({
            ...state,
            nombrePFE,
        }));
    }

    /**
     * Establece el apellido paterno de la persona física extranjera en el estado.
     * @param apellidoPaternoPFE - Apellido paterno de la persona física extranjera.
     * @description Establece el apellido paterno de la persona física extranjera en el estado.
     */
    public setApellidoPaternoPFE(apellidoPaternoPFE: string): void {
        this.update((state) => ({
            ...state,
            apellidoPaternoPFE,
        }));
    }

    /**
     * Establece el apellido materno de la persona física extranjera en el estado.
     * @param apellidoMaternoPFE - Apellido materno de la persona física extranjera.
     * @description Establece el apellido materno de la persona física extranjera en el estado.
     */
    public setApellidoMaternoPFE(apellidoMaternoPFE: string): void {
        this.update((state) => ({
            ...state,
            apellidoMaternoPFE,
        }));
    }

    /**
     * Establece el correo electrónico de la persona física extranjera en el estado.
     * @param correoPFE - Correo electrónico de la persona física extranjera.
     * @description Establece el correo electrónico de la persona física extranjera en el estado.
     */
    public setCorreoPFE(correoPFE: string): void {
        this.update((state) => ({
            ...state,
            correoPFE,
        }));
    }

    /**
     * Establece el país de la persona física extranjera en el estado.
     * @param paisPFE - País de la persona física extranjera.
     * @description Establece el país de la persona física extranjera en el estado.
     */
    public setPaisPFE(paisPFE: string): void {
        this.update((state) => ({
            ...state,
            paisPFE,
        }));
    }

    /**
     * Establece el código postal de la persona física extranjera en el estado.
     * @param codigoPostalPFE - Código postal de la persona física extranjera.
     * @description Establece el código postal de la persona física extranjera en el estado.
     */
    public setCodigoPostalPFE(codigoPostalPFE: string): void {
        this.update((state) => ({
            ...state,
            codigoPostalPFE,
        }));
    }

    /**
     * Establece la ciudad de la persona física extranjera en el estado.
     * @param ciudadPFE - Ciudad de la persona física extranjera.
     * @description Establece la ciudad de la persona física extranjera en el estado.
     */
    public setCiudadPFE(ciudadPFE: string): void {
        this.update((state) => ({
            ...state,
            ciudadPFE,
        }));
    }

    /**
     * Establece el estado de la persona física extranjera en el estado.
     * @param estadoPFE - Estado de la persona física extranjera.
     * @description Establece el estado de la persona física extranjera en el estado.
     */
    public setEstadoPFE(estadoPFE: string): void {
        this.update((state) => ({
            ...state,
            estadoPFE,
        }));
    }

    /**
     * Establece la calle de la persona física extranjera en el estado.
     * @param callePFE - Calle de la persona física extranjera.
     * @description Establece la calle de la persona física extranjera en el estado.
     */
    public setCallePFE(callePFE: string): void {
        this.update((state) => ({
            ...state,
            callePFE,
        }));
    }

    /**
     * Establece el número exterior de la persona física extranjera en el estado.
     * @param numeroExteriorPFE - Número exterior de la persona física extranjera.
     * @description Establece el número exterior de la persona física extranjera en el estado.
     */
    public setNumeroExteriorPFE(numeroExteriorPFE: string): void {
        this.update((state) => ({
            ...state,
            numeroExteriorPFE,
        }));
    }

    /**
     * Establece el número interior de la persona física extranjera en el estado.
     * @param numeroInteriorPFE - Número interior de la persona física extranjera.
     * @description Establece el número interior de la persona física extranjera en el estado.
     */
    public setNumeroInteriorPFE(numeroInteriorPFE: string): void {
        this.update((state) => ({
            ...state,
            numeroInteriorPFE,
        }));
    }

    /**
     * Establece la tabla de persona física extranjera en el estado.
     * @param personaFisicaExtranjeraTabla - Tabla de persona física extranjera.
     * @description Establece la tabla de persona física extranjera en el estado.
     */
    public setPersonaFisicaExtranjeraTabla(personaFisicaExtranjeraTabla: PersonaFisicaExtranjeraForm[]): void {
        this.update((state) => ({
            ...state,
            personaFisicaExtranjeraTabla,
        }));
    }

      /**
       * Establece la tabla de persona moral extranjera en el estado.
       * @param personaMoralExtranjeraTabla - Tabla de persona moral extranjera.
       * @description Establece la tabla de persona moral extranjera en el estado.
       */
      public setPersonaMoralExtranjeraTabla(personaMoralExtranjeraTabla: PersonaMoralExtranjeraForm[]): void {
          this.update((state) => ({
              ...state,
              personaMoralExtranjeraTabla,
          }));
      }
 
    /**
     * Establece la denominación de la persona moral extranjera en el estado.
     * @param denominacionPME - Denominación de la persona moral extranjera.
     * @description Establece la denominación de la persona moral extranjera en el estado.
     */
    public setDenominacionPME(denominacionPME: string): void {
      this.update((state) => ({
          ...state,
          denominacionPME,
      }));
  }

  /**
   * Establece el correo electrónico de la persona moral extranjera en el estado.
   * @param correoPME - Correo electrónico de la persona moral extranjera.
   * @description Establece el correo electrónico de la persona moral extranjera en el estado.
   */
  public setCorreoPME(correoPME: string): void {
      this.update((state) => ({
          ...state,
          correoPME,
      }));
  }

  /**
   * Establece el país de la persona moral extranjera en el estado.
   * @param paisPME - País de la persona moral extranjera.
   * @description Establece el país de la persona moral extranjera en el estado.
   */
  public setPaisPME(paisPME: number | string): void {
      this.update((state) => ({
          ...state,
          paisPME,
      }));
  }

  /**
   * Establece el código postal de la persona moral extranjera en el estado.
   * @param codigoPostalPME - Código postal de la persona moral extranjera.
   * @description Establece el código postal de la persona moral extranjera en el estado.
   */
  public setCodigoPostalPME(codigoPostalPME: string): void {
      this.update((state) => ({
          ...state,
          codigoPostalPME,
      }));
  }

  /**
   * Establece la ciudad de la persona moral extranjera en el estado.
   * @param ciudadPME - Ciudad de la persona moral extranjera.
   * @description Establece la ciudad de la persona moral extranjera en el estado.
   */
  public setCiudadPME(ciudadPME: string): void {
      this.update((state) => ({
          ...state,
          ciudadPME,
      }));
  }

  /**
   * Establece el estado de la persona moral extranjera en el estado.
   * @param estadoPME - Estado de la persona moral extranjera.
   * @description Establece el estado de la persona moral extranjera en el estado.
   */
  public setEstadoPME(estadoPME: string): void {
      this.update((state) => ({
          ...state,
          estadoPME,
      }));
  }

  /**
   * Establece la calle de la persona moral extranjera en el estado.
   * @param callePME - Calle de la persona moral extranjera.
   * @description Establece la calle de la persona moral extranjera en el estado.
   */
  public setCallePME(callePME: string): void {
      this.update((state) => ({
          ...state,
          callePME,
      }));
  }

  /**
   * Establece el número exterior de la persona moral extranjera en el estado.
   * @param numeroExteriorPME - Número exterior de la persona moral extranjera.
   * @description Establece el número exterior de la persona moral extranjera en el estado.
   */
  public setNumeroExteriorPME(numeroExteriorPME: string): void {
      this.update((state) => ({
          ...state,
          numeroExteriorPME,
      }));
  }

  /**
   * Establece el número interior de la persona moral extranjera en el estado.
   * @param numeroInteriorPME - Número interior de la persona moral extranjera.
   * @description Establece el número interior de la persona moral extranjera en el estado.
   */
  public setNumeroInteriorPME(numeroInteriorPME: string): void {
      this.update((state) => ({
          ...state,
          numeroInteriorPME,
      }));
  }

  /**
   * Establece el nombre del director general de la persona moral extranjera en el estado.
   * @param nombreDG - Nombre del director general de la persona moral extranjera.
   * @description Establece el nombre del director general de la persona moral extranjera en el estado.
   */
  public setNombreDG(nombreDG: string): void {
      this.update((state) => ({
          ...state,
          nombreDG,
      }));
  }

  /**
   * Establece el apellido paterno del director general de la persona moral extranjera en el estado.
   * @param apellidoPaternoDG - Apellido paterno del director general de la persona moral extranjera.
   * @description Establece el apellido paterno del director general de la persona moral extranjera en el estado.
   */
  public setApellidoPaternoDG(apellidoPaternoDG: string): void {
      this.update((state) => ({
          ...state,
          apellidoPaternoDG,
      }));
  }

  /**
   * Establece el apellido materno del director general de la persona moral extranjera en el estado.
   * @param apellidoMaternoDG - Apellido materno del director general de la persona moral extranjera.
   * @description Establece el apellido materno del director general de la persona moral extranjera en el estado.
   */
  public setApellidoMaternoDG(apellidoMaternoDG: string): void {
      this.update((state) => ({
          ...state,
          apellidoMaternoDG,
      }));
  }     
}