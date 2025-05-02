import { Injectable } from '@angular/core';
import { Store, } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { DatosModificacion, DatosSolicitante } from '../models/datos-tramite.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { DomicilioInfo } from '../../80308/models/plantas-consulta.model';

/**
 * Creacion del estado inicial para la interfaz de tramite 80316
 * @returns Solicitud80316
 */

/**
 * Representa el estado de la solicitud 80316.
 */
export interface Solicitud80316State {
  
  // /**
  //  * Menú desplegable seleccionado.
  //  */
  // menuDesplegable: string;

  /**
   * Datos del solicitante.
   */
  datosSolicitante: DatosSolicitante;

  /**
   * Información relacionada con la modificación.
   */
  datosModificacion: DatosModificacion;

  actividadProductiva: Catalogo[] | null;

  altaPlanta: Catalogo[];
  estado: Catalogo;
  formaValida: { [key: string]: boolean };
  domicilios: DomicilioInfo[];
  buscarDomicilios: DomicilioInfo[];

//   /**
//    * Lista de datos del contenedor.
//    */
//   datosDelContenedor: [];

//   /**
//    * Tipo de búsqueda seleccionada.
//    */
//   tipoBusqueda: string;

//   /**
//    * Aduana seleccionada.
//    */
//   aduana: string;

//   /**
//    * Fecha de ingreso.
//    */
//   fechaIngreso: string;

//   /**
//    * Iniciales del contenedor.
//    */
//   inicialesContenedor: string;

//   /**
//    * Número del contenedor.
//    */
//   numeroContenedor: string;

//   /**
//    * Dígito de control del contenedor.
//    */
//   digitoDeControl: string;

//   /**
//    * Contenedores asociados.
//    */
//   contenedores: string;

//   /**
//    * Menú desplegable de aduanas.
//    */
//   aduanaMenuDesplegable: string;

//   /**
//    * Estado de las casillas de verificación individuales.
//    */
//   casillaDeVerificacionindividual: boolean[];

//   /**
//    * Número del manifiesto.
//    */
//   numeroManifiesta: number;

//   /**
//    * Fecha de ingreso del manifiesto.
//    */
//   fechaDeIngreso: string;

//   /**
//    * Archivo seleccionado.
//    */
//   archivoSeleccionado: string;

//  /** linea
//  * @type {string}
//  */
//   linea: string;

//   /**
// * linea checkbox
// * @type {string}
// */
//   lineaCheckbox: string;

//   monto: string;

}

export function createInitialState(): Solicitud80316State {
  return {
    // menuDesplegable: '',
    actividadProductiva: null,
    datosSolicitante: {
      rfc: "",
      denominacion: "",
      actividadEconomica: "",
      correoElectronico: ""
    },
    datosModificacion: {
      rfc: "",
      federal: "",
      tipo: "",
      programa: "",
      actividadActual: "",
      actividadProductiva: null,
    },   

    altaPlanta: [],
  estado: {
    id: -1,
    descripcion: '',
  },
  formaValida: {
    entidadFederativa: false
  },
  domicilios:[],
  buscarDomicilios: []
    // datosDelContenedor: [],
    // tipoBusqueda: '',
    // aduana: '',
    // inicialesContenedor: '',
    // numeroContenedor: '',
    // digitoDeControl: '',
    // contenedores: '',
    // fechaIngreso: '',
    // aduanaMenuDesplegable: '',
    // casillaDeVerificacionindividual: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    // numeroManifiesta: 0,
    // fechaDeIngreso: '',
    // archivoSeleccionado: '',
    // linea: '',
    // lineaCheckbox: '',
    // monto: '',

  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite80316', resettable: true })
export class Tramite80316Store extends Store<Solicitud80316State> {
  constructor() {
    super(createInitialState());
  }


  public setActividadProductiva(actividadProductiva: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      actividadProductiva,
    }));
  }

  /**
   * Establece el estado en el almacén.
   * 
   * @param {Catalogo} estado - El estado que se va a establecer en el almacén.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setEstado(estado: Catalogo): void {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  /**
   * Establece el alta de plantas en el almacén.
   * 
   * @param {Catalogo[]} altaPlanta - Un array de objetos `Catalogo` que representa las plantas a dar de alta.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setaltaPlanta(altaPlanta: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      altaPlanta,
    }));
  }

  /**
   * Establece el estado de validación del formulario en el almacén.
   * 
   * @param {Object} formaValida - Un objeto donde las claves son los nombres de los campos del formulario y los valores son booleanos que indican si el campo es válido o no.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setFormValida(formaValida: { [key: string]: boolean }) :void {
    this.update(state => {
      const IS_VALID = {...state.formaValida, ...formaValida}
      return {
        ...state,
        formaValida: IS_VALID
      }
    })
  }

  /**
   * Establece la lista de domicilios en el almacén.
   * 
   * @param {DomicilioInfo[]} domicilios - Un array de objetos `DomicilioInfo` que representa la lista de domicilios.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setDomicilios(domicilios: DomicilioInfo[]): void {
    this.update((state) => ({
      ...state,
      domicilios,
    }));
  }

  /**
   * Elimina un domicilio de la lista de domicilios en el almacén.
   * 
   * @param {DomicilioInfo} eliminarDomicilios - El objeto `DomicilioInfo` que representa el domicilio a eliminar.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  eliminarDomicilios(eliminarDomicilios: DomicilioInfo): void {
    this.update(state => {
      const DOMICILIOS = [...state.domicilios].filter(ele => ele.id !== eliminarDomicilios.id);
      return {
        ...state,
        domicilios: DOMICILIOS
      }
    })
  }

  /**
   * Agrega un domicilio a la lista de domicilios en el almacén.
   * 
   * @param {DomicilioInfo} domicilios - El objeto `DomicilioInfo` que representa el domicilio a agregar.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  aggregarDomicilios(domicilios: DomicilioInfo): void {
    this.update(state => {
      const DOMICILIOS = [...state.domicilios , domicilios];
      return {
        ...state,
        domicilios: DOMICILIOS
      }
    })
  }

  /**
   * Establece los domicilios que se van a buscar en el almacén.
   * 
   * @param {DomicilioInfo[]} buscarDomicilios - Un array de objetos `DomicilioInfo` que representa la lista de domicilios que se van a buscar.
   * 
   * @returns {void} - No devuelve ningún valor.
   */
  setbuscarDomicilios(buscarDomicilios: DomicilioInfo[]): void {
    this.update((state) => ({
      ...state,
      buscarDomicilios,
    }));
  }
  
  // /**
  //  * Guarda el tipo de solicitud en el estado.
  //  *
  //  * @param casillaDeVerificacionindividual - El tipo de solicitud que se va a guardar.
  //  */
  // public setCasillaDeVerificacionindividual(casillaDeVerificacionindividual: []): void {
  //   this.update((state) => ({
  //     ...state,
  //     casillaDeVerificacionindividual,
  //   }));
  // }

  // /**
  //  * Establece el número de manifiesta en el estado de la tienda.
  //  *
  //  * @param numeroManifiesta - El número de manifiesta que se desea asignar.
  //  */
  // public setNumeroManifiesta(numeroManifiesta: number): void {
  //   this.update((state) => ({
  //     ...state,
  //     numeroManifiesta,
  //   }));
  // }

  // /**
  //  * Establece el valor del menú desplegable en el estado de la tienda.
  //  *
  //  * @param menuDesplegable - El nuevo valor para el menú desplegable.
  //  */
  // public setMenuDesplegable(menuDesplegable: string): void {
  //   this.update((state) => ({
  //     ...state,
  //     menuDesplegable,
  //   }));
  // }

  // /**
  //  * Establece el valor del menú desplegable de aduana en el estado de la tienda.
  //  *
  //  * @param aduanaMenuDesplegable - El nuevo valor para el menú desplegable de aduana.
  //  *                                Este valor se actualizará en el estado de la tienda.
  //  */
  // public setAduanaMenuDesplegable(aduanaMenuDesplegable: string): void {
  //   this.update((state) => ({
  //     ...state,
  //     aduanaMenuDesplegable,
  //   }));
  // }

  // /**
  //  * Establece la fecha de ingreso en el estado de la tienda.
  //  *
  //  * @param fechaDeIngreso - La nueva fecha de ingreso que se debe establecer en el estado.
  //  *                          Debe ser una cadena en formato válido.
  //  */
  // public setFechaDeIngreso(fechaDeIngreso: string): void {
  //   this.update((state) => ({
  //     ...state,
  //     fechaDeIngreso,
  //   }));
  // }


  /**
   * Establece los datos del solicitante en el estado de la tienda.
   *
   * @param datosSolicitante - Objeto que contiene la información del solicitante.
   */
  public setDatosSolicitante(datosSolicitante: DatosSolicitante): void {
    this.update((state) => ({
      ...state,
      datosSolicitante
    }));
  }

  /**
   * Establece los datos de modificación en el estado de la tienda.
   *
   * @param datosModificacion - Objeto que contiene los datos de modificación que se deben actualizar en el estado.
   */
  public setDatosModificacion(datosModificacion: DatosModificacion): void {
    this.update((state) => ({
      ...state,
      datosModificacion
    }));
  }
  
  // /**
  //  * Establece los datos del contenedor en el estado de la tienda.
  //  *
  //  * @param datosDelContenedor - Un arreglo que contiene los datos del contenedor a establecer.
  //  * 
  //  * @remarks
  //  * Este método actualiza el estado de la tienda con los datos proporcionados para el contenedor.
  //  */
  // public setDelContenedor(datosDelContenedor: []): void {
  //   this.update((state) => ({
  //     ...state,
  //     datosDelContenedor
  //   }));
  // }

  /**
   * Establece el tipo de búsqueda en el estado de la tienda.
   *
   * @param tipoBusqueda - El tipo de búsqueda que se desea establecer.
   */
  public setTipoBusqueda(tipoBusqueda: string): void {
    this.update((state) => ({
      ...state,
      tipoBusqueda
    }));
  }

  // public setActividadProductiva(actividadProductiva: Catalogo): void {
  //   this.update((state) => ({
  //     ...state,
  //     actividadProductiva
  //   }));
  // }

  
  // public setFechaIngreso(fechaIngreso: string): void {
  //   this.update((state) => ({
  //     ...state,
  //     fechaIngreso
  //   }));
  // }

  
  // /**
  //  * Establece las iniciales del contenedor en el estado de la tienda.
  //  *
  //  * @param inicialesContenedor - Las iniciales del contenedor que se deben establecer.
  //  */
  // public setInicialesContenedor(inicialesContenedor: string): void {
  //   this.update((state) => ({
  //     ...state,
  //     inicialesContenedor
  //   }));
  // }


  // /**
  //  * Establece el número de contenedor en el estado de la tienda.
  //  *
  //  * @param numeroContenedor - El número de contenedor que se va a asignar.
  //  * @returns void
  //  */
  // public setNumeroContenedor(numeroContenedor: string): void {
  //   this.update((state) => ({
  //     ...state,
  //     numeroContenedor
  //   }));
  // }

  
  // /**
  //  * Establece el valor del dígito de control en el estado de la tienda.
  //  *
  //  * @param digitoDeControl - El nuevo valor del dígito de control que se debe establecer.
  //  */
  // public setDigitoDeControl(digitoDeControl: string): void {
  //   this.update((state) => ({
  //     ...state,
  //     digitoDeControl
  //   }));
  // }


  // /**
  //  * Establece el valor de los contenedores en el estado de la tienda.
  //  *
  //  * @param contenedores - Una cadena que representa los contenedores a establecer en el estado.
  //  */
  // public setContenedores(contenedores: string): void {
  //   this.update((state) => ({
  //     ...state,
  //     contenedores
  //   }));
  // }


  // /**
  //  * Establece el archivo seleccionado en el estado de la tienda.
  //  *
  //  * @param archivoSeleccionado - El nombre o identificador del archivo que se seleccionará.
  //  */
  // public setArchivoSeleccionado(archivoSeleccionado: string): void {
  //   this.update((state) => ({
  //     ...state,
  //     archivoSeleccionado
  //   }));
  // }

  // /**
  //  * Establece el valor de la propiedad `linea` en el estado actual.
  //  *
  //  * @param linea - El nuevo valor para la propiedad `linea`.
  //  */
  // public setLinea(linea: string): void {
  //   this.update((state) => ({
  //     ...state,
  //     linea,
  //   }));
  // }


  // /**
  //  * Establece el valor de la propiedad `lineaCheckbox` en el estado.
  //  *
  //  * @param lineaCheckbox - El nuevo valor para la propiedad `lineaCheckbox`.
  //  */
  // public setLineaCheckbox(lineaCheckbox: string): void {
  //   this.update((state) => ({
  //     ...state,
  //     lineaCheckbox,
  //   }));
  // }

  // /**
  //  * Establece el valor de "monto" en el estado.
  //  *
  //  * @param monto - El nuevo valor de "monto" que se asignará al estado.
  //  */
  // public setMonto(monto: string): void {
  //   this.update((state) => ({
  //     ...state,
  //     monto,
  //   }));
  // }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}