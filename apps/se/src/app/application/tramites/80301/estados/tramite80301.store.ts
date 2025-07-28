import { Catalogo } from '@libs/shared/data-access-user/src';
import { DatosSolicitante } from '../../80301/models/datos-tramite.model';
import { Injectable } from '@angular/core';
import { Store, } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Interface que representa los datos generales de una modificación del programa IMMEX.
 */
export interface DatosModificacion {
  /** Registro Federal de Contribuyentes del solicitante */
  rfc: string;

  /** Representación federal del solicitante (por ejemplo, nombre de la delegación o dependencia) */
  federal: string;

  /** Tipo de trámite o modificación (por ejemplo: alta, baja, cambio) */
  tipo: string;

  /** Programa IMMEX relacionado con la solicitud */
  programa: string;
}

/**
 * Interface que encapsula el estado completo de la solicitud 80301.
 */
export interface Solicitud80301StateObj {
  /** Objeto que contiene los datos generales de la modificación */
  datosModificacion: Solicitud80301State;
}

  
/**
 * Representa el estado de la solicitud 80301.
 */
export interface Solicitud80301State {

  /**
   * Menú desplegable seleccionado.
   */
  menuDesplegable:string;

  /**
   * Datos del solicitante.
   */
  datosSolicitante: DatosSolicitante;

  /**
   * Información relacionada con la modificación.
   */
  datosModificacion: DatosModificacion ;

  /**
   * Lista de datos del contenedor.
   */
  datosDelContenedor: [];

  /**
   * Tipo de búsqueda seleccionada.
   */
  tipoBusqueda: string;

  /**
   * Aduana seleccionada.
   */
  aduana: string;

  /**
   * Fecha de ingreso.
   */
  fechaIngreso: string;

  /**
   * Iniciales del contenedor.
   */
  inicialesContenedor: string;

  /**
   * Número del contenedor.
   */
  numeroContenedor: string;

  /**
   * Dígito de control del contenedor.
   */
  digitoDeControl: string;

  /**
   * Contenedores asociados.
   */
  contenedores: string;

  /**
   * Menú desplegable de aduanas.
   */
  aduanaMenuDesplegable: string;

  /**
   * Estado de las casillas de verificación individuales.
   */
  casillaDeVerificacionindividual: boolean[];

  /**
   * Número del manifiesto.
   */
  numeroManifiesta: number;

  /**
   * Fecha de ingreso del manifiesto.
   */
  fechaDeIngreso: string;

  /**
   * Archivo seleccionado.
   */
  archivoSeleccionado: string;

 /** linea
 * @type {string}
 */
  linea: string;

  /**
* linea checkbox
* @type {string}
*/
  lineaCheckbox: string;

  monto: string;
}

/**
 * Crea y retorna el objeto de estado inicial para la funcionalidad Solicitud80301.
 *
 * @returns {Solicitud80301State} El estado inicial por defecto, incluyendo valores predeterminados para
 *   selecciones de menú, datos del solicitante, datos de modificación, datos del contenedor, tipos de búsqueda,
 *   información de aduana, detalles del contenedor, casillas de verificación, número de manifiesto,
 *   fechas de ingreso, archivos seleccionados, información de línea y monto.
 */
export function createInitialState(): Solicitud80301State {
  return {
    menuDesplegable: '',
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
      programa: ""
    },   
    datosDelContenedor: [],
    tipoBusqueda: '',
    aduana: '',
    inicialesContenedor: '',
    numeroContenedor: '',
    digitoDeControl: '',
    contenedores: '',
    fechaIngreso: '',
    aduanaMenuDesplegable: '',
    casillaDeVerificacionindividual: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    numeroManifiesta: 0,
    fechaDeIngreso: '',
    archivoSeleccionado: '',
    linea: '',
    lineaCheckbox: '',
    monto: '',

  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite80301', resettable: true })
export class Tramite80301Store extends Store<Solicitud80301State> {
  constructor() {
    super(createInitialState());
  }
    /**
   * Actualiza el tipo de documento seleccionado.
   * 
   * @param {string} tipoDocumento - El tipo de documento seleccionado.
   */
  public setTipoDocumento(tipoDocumento: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      tipoDocumento,
    }));
  }
  
  /**
   * Guarda el rango de fechas en el estado.
   *
   * @param rangoFechas - El valor booleano que indica si es un rango de fechas o no.
   */
  public setFechasSeleccionadas(fechasSeleccionadas: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      fechasSeleccionadas,
    }));
  }
  /**
   * Actualiza el país en el estado.
   * @param {string} pais - País del domicilio.
   */
  public setPais(pais: Catalogo[]): void {
    this.update((state) => ({ ...state, pais }));
  }

    /**
     * Actualiza el estado de la tienda con el arreglo proporcionado de `Catalogo` como la nueva `condicion`.
     *
     * @param condicion - Un arreglo de objetos `Catalogo` para establecer como la condición actual en el estado.
     */
    public setCondicion(condicion: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      condicion,
    }));
  }

  
  /**
   * Actualiza el año en el estado.
   * @param {string} ano - Año relacionado.
   */
  public setAno(ano: string): void {
    this.update((state) => ({ ...state, ano }));
  }
  /**
   * Establece el RFC en el estado de la tienda.
   *
   * @param rfc - El RFC que se desea asignar.
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc
    }));
  }

  /**
   * Establece el valor federal en el estado de la tienda.
   *
   * @param federal - El valor federal que se desea asignar.
   */
  public setFederal(federal: string): void {
    this.update((state) => ({
      ...state,
      federal
    }));
  }

  /**
   * Establece el tipo en el estado de la tienda.
   *
   * @param tipo - El tipo que se desea asignar.
   */
  public setTipo(tipo: string): void {
    this.update((state) => ({
      ...state,
      tipo
    }));
  }

  /**
   * Establece el programa en el estado de la tienda.
   *
   * @param programa - El programa que se desea asignar.
   */
  public setPrograma(programa: string): void {
    this.update((state) => ({
      ...state,
      programa
    }));
  }


  /**
   * Guarda el tipo de solicitud en el estado.
   *
   * @param casillaDeVerificacionindividual - El tipo de solicitud que se va a guardar.
   */
  public setCasillaDeVerificacionindividual(casillaDeVerificacionindividual: []): void {
    this.update((state) => ({
      ...state,
      casillaDeVerificacionindividual,
    }));
  }

  /**
   * Establece el número de manifiesta en el estado de la tienda.
   *
   * @param numeroManifiesta - El número de manifiesta que se desea asignar.
   */
  public setNumeroManifiesta(numeroManifiesta: number): void {
    this.update((state) => ({
      ...state,
      numeroManifiesta,
    }));
  }


  /**
   * Establece la fecha de ingreso en el estado de la tienda.
   *
   * @param fechaDeIngreso - La nueva fecha de ingreso que se debe establecer en el estado.
   *                          Debe ser una cadena en formato válido.
   */
  public setFechaDeIngreso(fechaDeIngreso: string): void {
    this.update((state) => ({
      ...state,
      fechaDeIngreso,
    }));
  }


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
  
  /**
   * Establece los datos del contenedor en el estado de la tienda.
   *
   * @param datosDelContenedor - Un arreglo que contiene los datos del contenedor a establecer.
   * 
   * @remarks
   * Este método actualiza el estado de la tienda con los datos proporcionados para el contenedor.
   */
  public setDelContenedor(datosDelContenedor: []): void {
    this.update((state) => ({
      ...state,
      datosDelContenedor
    }));
  }

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

  /**
   * Establece el valor de la propiedad "aduana" en el estado.
   *
   * @param aduana - El nuevo valor para la propiedad "aduana".
   */
  public setAduana(aduana: string): void {
    this.update((state) => ({
      ...state,
      aduana
    }));
  }

    /**
     * Actualiza el estado de la tienda con una nueva lista de documentos.
     *
     * @param documentos - Un arreglo de objetos `Catalogo` para establecer como los documentos actuales en el estado.
     */
    public setDocumentos(documentos: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      documentos,
    }));
  }
  
  public setFechaIngreso(fechaIngreso: string): void {
    this.update((state) => ({
      ...state,
      fechaIngreso
    }));
  }

  
  /**
   * Establece las iniciales del contenedor en el estado de la tienda.
   *
   * @param inicialesContenedor - Las iniciales del contenedor que se deben establecer.
   */
  public setInicialesContenedor(inicialesContenedor: string): void {
    this.update((state) => ({
      ...state,
      inicialesContenedor
    }));
  }


  /**
   * Establece el número de contenedor en el estado de la tienda.
   *
   * @param numeroContenedor - El número de contenedor que se va a asignar.
   * @returns void
   */
  public setNumeroContenedor(numeroContenedor: string): void {
    this.update((state) => ({
      ...state,
      numeroContenedor
    }));
  }

  
  /**
   * Establece el valor del dígito de control en el estado de la tienda.
   *
   * @param digitoDeControl - El nuevo valor del dígito de control que se debe establecer.
   */
  public setDigitoDeControl(digitoDeControl: string): void {
    this.update((state) => ({
      ...state,
      digitoDeControl
    }));
  }


  /**
   * Establece el valor de los contenedores en el estado de la tienda.
   *
   * @param contenedores - Una cadena que representa los contenedores a establecer en el estado.
   */
  public setContenedores(contenedores: string): void {
    this.update((state) => ({
      ...state,
      contenedores
    }));
  }


  /**
   * Establece el archivo seleccionado en el estado de la tienda.
   *
   * @param archivoSeleccionado - El nombre o identificador del archivo que se seleccionará.
   */
  public setArchivoSeleccionado(archivoSeleccionado: string): void {
    this.update((state) => ({
      ...state,
      archivoSeleccionado
    }));
  }

  /**
   * Establece el valor de la propiedad `linea` en el estado actual.
   *
   * @param linea - El nuevo valor para la propiedad `linea`.
   */
  public setLinea(linea: string): void {
    this.update((state) => ({
      ...state,
      linea,
    }));
  }


  /**
   * Establece el valor de la propiedad `lineaCheckbox` en el estado.
   *
   * @param lineaCheckbox - El nuevo valor para la propiedad `lineaCheckbox`.
   */
  public setLineaCheckbox(lineaCheckbox: string): void {
    this.update((state) => ({
      ...state,
      lineaCheckbox,
    }));
  }

  /**
   * Establece el valor de "monto" en el estado.
   *
   * @param monto - El nuevo valor de "monto" que se asignará al estado.
   */
  public setMonto(monto: string): void {
    this.update((state) => ({
      ...state,
      monto,
    }));
  }

  /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud(): void {
    this.reset();
  }
}