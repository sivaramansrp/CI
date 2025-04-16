import { Store, StoreConfig } from '@datorama/akita';

import {
  DatosDelEstablecimientoFormState,
  DomicilioDelEstablecimientoFormState,
  ManiFiestosFormState,
  PreOperativeFormState,
  RepresentanteLegalFormState,
} from '../../model/solicitud-permiso.model';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns SolicitudPermisoState
 */

export interface SolicitudPermisoState {
  /**
   * La clave de referencia asociada con la solicitud.
   */
  claveDeReferencia?: string;
  /**
   * La cadena de pago proporcionada por la dependencia.
   */
  cadenaPagoDependencia?: string;
  /**
   * La clave del banco utilizada para el pago.
   */
  bancoClave?: string;
  /**
   * La llave de pago única asociada con la transacción.
   */
  llaveDePago?: string;
  /**
   * La fecha en que se realizó el pago.
   */
  fecPago?: string;
  /**
   * El importe del pago realizado.
   */
  impPago?: string;

  preOperativFormState: PreOperativeFormState;
  datosDelEstablecimientoFormState: DatosDelEstablecimientoFormState;
  manifiestosFormState: ManiFiestosFormState;
  representanteLegalFormState: RepresentanteLegalFormState;
  domicilloDelEstablecimientoFormState: DomicilioDelEstablecimientoFormState;
}

export function createInitialState(): SolicitudPermisoState {
  return {
    claveDeReferencia: '',
    cadenaPagoDependencia: '',
    bancoClave: '',
    llaveDePago: '',
    fecPago: '',
    impPago: '',
    preOperativFormState: {
      ideGenerica1: '',
      observaciones: '',
    },
    datosDelEstablecimientoFormState: {
      razonSocial: '',
      correoElectronico: '',
    },
    manifiestosFormState: {
      seleccionadaManifiesto: [false],
      informacionConfidencial: '',
    },
    representanteLegalFormState: {
      rfc: '',
      nombreOrazonsocial: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
    },
    domicilloDelEstablecimientoFormState: {
      codigoPostal: '',
      estado: '',
      descripcionMunicipio: '',
      informacionExtra: '',
      descripcionColonia: '',
      calle: '',
      lada: '',
      telefono: '',
      funcionamiento:'',
      licencia:'',
      regimen:'',
      aduana:''
    },
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'solicitudpermisoprocedure', resettable: true })
export class Tramite260703Store extends Store<SolicitudPermisoState> {
  /**
   * Constructor de la clase Tramite260703Store.
   * Inicializa el estado del store con el estado inicial definido.
   */
  constructor() {
    super(createInitialState());
  }

  actualizarEstadoFormularioPreOperativo(
    valores: Partial<SolicitudPermisoState['preOperativFormState']>
  ): void {
    this.update((state) => ({
      ...state,
      preOperativFormState: {
        ...state.preOperativFormState,
        ...valores,
      },
    }));
  }

  actualizarDatosDelFormularioDelEstablecimiento(
    valores: Partial<SolicitudPermisoState['datosDelEstablecimientoFormState']>
  ): void {
    this.update((state) => ({
      ...state,
      datosDelEstablecimientoFormState: {
        ...state.datosDelEstablecimientoFormState,
        ...valores,
      },
    }));
  }

  updateDomicilioDelEstablecimientoFormStatae(
    valores: Partial<
      SolicitudPermisoState['domicilloDelEstablecimientoFormState']
    >
  ): void {
    this.update((state) => ({
      ...state,
      domicilloDelEstablecimientoFormState: {
        ...state.domicilloDelEstablecimientoFormState,
        ...valores,
      },
    }));
  }

  updateManifiestosFormState(
    valores: Partial<SolicitudPermisoState['manifiestosFormState']>
  ): void {
    this.update((state) => ({
      ...state,
      manifiestosFormState: {
        ...state.manifiestosFormState,
        ...valores,
      },
    }));
  }

  updateRepresentanteLegalFormState(
    valores: Partial<SolicitudPermisoState['representanteLegalFormState']>
  ): void {
    this.update((state) => ({
      ...state,
      representanteLegalFormState: {
        ...state.representanteLegalFormState,
        ...valores,
      },
    }));
  }

  /**
   * Actualiza el estado del store con los valores proporcionados.
   * valores Un objeto parcial de SolicitudPermisoState con los valores a actualizar.
   */
  public actualizarEstado(valores: Partial<SolicitudPermisoState>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
}
