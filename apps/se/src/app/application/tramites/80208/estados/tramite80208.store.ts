/**
 * @module CambioModalidadStore
 * @description
 * Este servicio administra el estado de `CambioModalidadState` utilizando Akita.
 */
import { ServicioInfo, ServicioInmex } from '../modelos/cambio-de-modalidad.model';
import { Store, StoreConfig } from '@datorama/akita';
import { EmpresaNacional } from '../../../shared/models/modelo-interface.model';
import { Injectable } from '@angular/core';

/**
 * @interface CambioModalidadState
 * @description
 * Representa el estado de la modalidad de cambio.
 *
 * @property {CambioDeModalidadForm} cambioDeModalidad - Datos del formulario de cambio de modalidad.
 * @property {string} cambioModalidad - Modalidad de cambio seleccionada.
 * @property {string} serviciosImmx - Servicios IMMEX asociados.
 */
export interface CambioModalidadState {
    /** Identificador de la solicitud, puede ser nulo si aún no se ha creado. */
  idSolicitud: number | null;
  seleccionaLaModalidad: string;
  folio: number;
  ano: number;
  seleccionaModalidad: string;
  cambioDeModalidad: string;
  serviciosImmx: string;
  rfcEmpresa: string;
  numeroPrograma: string;
  tiempoPrograma: string;
  datosAutorizados: ServicioInfo[];
  datos: EmpresaNacional[];
  ServiciosDatos: ServicioInfo[];
  domiciliosSeleccionados: ServicioInfo[];
  empresasSeleccionados: EmpresaNacional[];
  servicio?: string;
  descripcionDelServicio?: string;
  tipoDeServicio?: string;
  estatus?: string;
  rfc?: string;
  denominacionSocial?: string;
  numeroIMMEX?: string;
  anoIMMEX?: string;
  servicios?: ServicioInfo[];
}

/**
 * @function createInitialState
 * @description
 * Inicializa el estado con valores predeterminados.
 * @returns {CambioModalidadState} Estado inicial.
 */
export function createInitialState(): CambioModalidadState {
  return {
    idSolicitud: 0,
    seleccionaLaModalidad: '',
    folio: 0,
    ano: 0,
    seleccionaModalidad: '',
    cambioDeModalidad: '-1',
    serviciosImmx: '-1',
    rfcEmpresa: '',
    numeroPrograma: '',
    tiempoPrograma: '',
    datosAutorizados: [],
    datos: [],
    ServiciosDatos: [],
    domiciliosSeleccionados: [],
    empresasSeleccionados: [],
    servicio: '',
    descripcionDelServicio: '',
    tipoDeServicio: '',
    estatus: '',
    rfc: '',
    denominacionSocial: '',
    numeroIMMEX: '',
    anoIMMEX: '',
    servicios: [],

  };
}

/**
 * @class CambioModalidadStore
 * @description
 * Administra el estado de la modalidad de cambio utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cambio-modalidad' })
export class CambioModalidadStore extends Store<CambioModalidadState> {
  /**
   * @constructor
   * @description
   * Constructor que inicializa el estado con valores predeterminados.
   */
  constructor() {
    super(createInitialState());
  }

  /**
* Actualiza el estado del store con los valores proporcionados.
* @param {Partial<CambioModalidadState>} valores - Valores parciales del estado a actualizar.
* @method actualizarEstado
* @description
* Actualiza el estado del store con los valores proporcionados.
* Utiliza el método `update` de Akita para fusionar los nuevos valores con el estado actual.
* @param {Partial<CambioModalidadState>} valores - Valores parciales del estado a actualizar.
* @returns {void}
* */

  public actualizarEstado(valores: Partial<CambioModalidadState>): void {
    this.update((state) => {
      const NEW_STATE = {
        ...state,
        ...valores,
      };
      return NEW_STATE;
    });
  }

      /**
   * Guarda el ID de la solicitud en el estado.
   *
   * @param idSolicitud - El ID de la solicitud que se va a guardar.
   */
  public setIdSolicitud(idSolicitud: number): void {
    this.update((state) => ({
      ...state,
      idSolicitud,
    }));
  }

        /**
   * Guarda el ID de la solicitud en el estado.
   *
   * @param idSolicitud - El ID de la solicitud que se va a guardar.
   */
  public setRfcEmpresa(rfcEmpresa: string): void {
    this.update((state) => ({
      ...state,
      rfcEmpresa,
    }));
  }

  /**
   * Establece la modalidad seleccionada en el estado.
   *
   * @param seleccionaLaModalidad - La modalidad seleccionada que se va a guardar.
   */
  public setSeleccionaLaModalidad(seleccionaLaModalidad: string): void {
    this.update((state) => ({
      ...state,
      seleccionaLaModalidad,
    }));
  }

  /**
   * Establece el folio en el estado.
   *
   * @param folio - El folio que se va a guardar.
   */
  public setFolio(folio: number): void {
    this.update((state) => ({
      ...state,
      folio,
    }));
  }

  /**
   * Establece el año en el estado.
   *
   * @param ano - El año que se va a guardar.
   */
  public setAno(ano: number): void {
    this.update((state) => ({
      ...state,
      ano,
    }));
  }

  /**
   * Establece la modalidad seleccionada en el estado.
   *
   * @param seleccionaModalidad - La modalidad seleccionada que se va a guardar.
   */
  public setSeleccionaModalidad(seleccionaModalidad: string): void {
    this.update((state) => ({
      ...state,
      seleccionaModalidad,
    }));
  }

  /**
   * Establece el cambio de modalidad en el estado.
   *
   * @param cambioDeModalidad - El cambio de modalidad que se va a guardar.
   */
  public setCambioDeModalidad(cambioDeModalidad: string): void {
    this.update((state) => ({
      ...state,
      cambioDeModalidad,
    }));
  }

  /**
   * Establece los servicios IMMX en el estado.
   *
   * @param serviciosImmx - Los servicios IMMX que se van a guardar.
   */
  public setServiciosImmx(serviciosImmx: string): void {
    this.update((state) => ({
      ...state,
      serviciosImmx,
    }));
  }

  /**
   * Establece el número de programa en el estado.
   *
   * @param numeroPrograma - El número de programa que se va a guardar.
   */
  public setNumeroPrograma(numeroPrograma: string): void {
    this.update((state) => ({
      ...state,
      numeroPrograma,
    }));
  }

  /**
   * Establece el tiempo de programa en el estado.
   *
   * @param tiempoPrograma - El tiempo de programa que se va a guardar.
   */
  public setTiempoPrograma(tiempoPrograma: string): void {
    this.update((state) => ({
      ...state,
      tiempoPrograma,
    }));
  }

  /**
   * Establece los datos de servicio INMEX en el estado.
   *
   * @param datos - Los datos de servicio INMEX que se van a guardar.
   */
  public setDatos(datos: EmpresaNacional[]): void {
    this.update((state) => ({
      ...state,
      datos,
    }));
  }

  /**
   * Establece los datos de servicios en el estado.
   *
   * @param ServiciosDatos - Los datos de servicios que se van a guardar.
   */
  public setServiciosDatos(ServiciosDatos: ServicioInfo[]): void {
    this.update((state) => ({
      ...state,
      ServiciosDatos,
      servicios: [...(state?.servicios ?? []), ...ServiciosDatos],
    }));
  }

  /**
   * Establece los domicilios seleccionados en el estado.
   *
   * @param domiciliosSeleccionados - Los domicilios seleccionados que se van a guardar.
   */
  public setDomiciliosSeleccionados(domiciliosSeleccionados: ServicioInfo[]): void {
    this.update((state) => ({
      ...state,
      domiciliosSeleccionados,
    }));
  }

    /**
   * Establece los datos autorizados en el estado.
   *
   * @param datosAutorizados - Los datos autorizados que se van a guardar.
   */

    datosAutorizados(datosAutorizados: ServicioInfo[]): void {
    this.update((state) => ({
      ...state,
      datosAutorizados,
      servicios: [...(state?.servicios ?? []), ...datosAutorizados],
    }));
  }

  /**
   * Establece y agrega servicios al estado.
   * Combina los servicios existentes con los nuevos servicios proporcionados.
   *
   * @param servicios - Array de servicios que se van a agregar al estado existente.
   */
  setServicios(servicios: ServicioInfo[]): void {
    this.update((state) => ({
      ...state,
      servicios: [...state?.servicios ?? [], ...servicios],
    }));
  }

    /**
   * Establece los domicilios seleccionados en el estado.
   *
   * @param empresasSeleccionados - Las empresas seleccionadas que se van a guardar.
   */
  public setEmpresasSeleccionados(empresasSeleccionados: EmpresaNacional[]): void {
    this.update((state) => ({
      ...state,
      empresasSeleccionados,
    }));
  }

  /**
   * Establece el servicio en el estado.
   *
   * @param servicio - El servicio que se va a guardar.
   */
  public setServicio(servicio: string): void {
    this.update((state) => ({
      ...state,
      servicio,
    }));
  }

  /**
   * Establece la descripción del servicio en el estado.
   *
   * @param descripcionDelServicio - La descripción del servicio que se va a guardar.
   */
  public setDescripcionDelServicio(descripcionDelServicio: string): void {
    this.update((state) => ({
      ...state,
      descripcionDelServicio,
    }));
  }

  /**
   * Establece el tipo de servicio en el estado.
   *
   * @param tipoDeServicio - El tipo de servicio que se va a guardar.
   */
  public setTipoDeServicio(tipoDeServicio: string): void {
    this.update((state) => ({
      ...state,
      tipoDeServicio,
    }));
  }

  /**
   * Establece el estatus en el estado.
   *
   * @param estatus - El estatus que se va a guardar.
   */
  public setEstatus(estatus: string): void {
    this.update((state) => ({
      ...state,
      estatus,
    }));
  }

  /**
   * Establece el RFC en el estado.
   *
   * @param rfc - El RFC que se va a guardar.
   */
  public setRfc(rfc: string): void {
    this.update((state) => ({
      ...state,
      rfc,
    }));
  }

  /**
   * Establece la denominación social en el estado.
   *
   * @param denominacionSocial - La denominación social que se va a guardar.
   */
  public setDenominacionSocial(denominacionSocial: string): void {
    this.update((state) => ({
      ...state,
      denominacionSocial,
    }));
  }

  /**
   * Establece el número IMMEX en el estado.
   *
   * @param numeroIMMEX - El número IMMEX que se va a guardar.
   */
  public setNumeroIMMEX(numeroIMMEX: string): void {
    this.update((state) => ({
      ...state,
      numeroIMMEX,
    }));
  }

  /**
   * Establece el año IMMEX en el estado.
   *
   * @param anoIMMEX - El año IMMEX que se va a guardar.
   */
  public setAnoIMMEX(anoIMMEX: string): void {
    this.update((state) => ({
      ...state,
      anoIMMEX,
    }));
  }

    /**
   * Limpia los datos de la solicitud
   */
  public limpiarSolicitud(): void {
    this.reset();
  }

}