import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Estado que representa los datos del trámite 5601, incluyendo información sobre certificaciones,
 * operaciones aduaneras, mercancía, logística y ubicación.
 */
export interface Tramite5601State {
  // formularioCertificacion
  /** Indica si la empresa tiene una certificación */
  tieneCertificacion: boolean;

  /** Nombre de la certificación que posee la empresa */
  certificacionEmpresa: string;

  /** Otra certificación que la empresa pueda tener */
  otraCertificacion: string;

  // formulario
  /** Código de la aduana asociada al trámite */
  aduana: string;

  /** Sección aduanera que se aplica para este trámite */
  seccionAduanera: string;

  /** Tipo de operación que se está llevando a cabo (importación, exportación, etc.) */
  tipoOperacion: string;

  /** Fecha en la que se realizó la operación o se espera que ocurra */
  fechaOperacion: string;

  /** Motivo por el cual se está realizando el despacho a domicilio */
  motivoDespachoDomicilio: string;

  /** Observaciones adicionales relacionadas con el trámite */
  observaciones: string;

  // formularioMercancia
  /** Especificaciones detalladas de la mercancía (por ejemplo, dimensiones, características, etc.) */
  especificacionesMercancia: string;

  /** Descripción general de la mercancía que se está despachando */
  descripcionMercancia: string;

  /** Tipo de moneda utilizada en la transacción (por ejemplo, USD, EUR) */
  tipoMoneda: string;

  /** Valor total de la mercancía en la transacción */
  valorMercancia: string;

  // formularioLogistica
  /** Esquemas de control y seguridad aplicados a la mercancía */
  esquemasControlSeguridad: string;

  /** Distancia y tiempos estimados de la ruta logística para el despacho */
  distanciaRutaTiempos: string;

  // formularioUbicacionMercancia
  /** Dirección donde se encuentra la mercancía o donde se realizará la entrega */
  direccion: string;

  /** Número de teléfono para contactar en caso de necesidades logísticas o emergencias */
  telefono: string;

  /** Distancia entre la ubicación de la mercancía y la aduana */
  distanciaAduana: string;

  /** Referencias adicionales para localizar la mercancía o dirección */
  referencias: string;
}



/**
 * Función para crear el estado inicial del trámite 5601.
 * Inicializa todos los campos del estado con valores predeterminados.
 */
export function createInitialState(): Tramite5601State {
  return {
    // formularioCertificacion
    /** Indica si la empresa tiene una certificación */
    tieneCertificacion: false,
    /** Nombre de la certificación que posee la empresa */
    certificacionEmpresa: '',
    /** Otra certificación que la empresa pueda tener */
    otraCertificacion: '',

    // formulario
    /** Código de la aduana asociada al trámite */
    aduana: '',
    /** Sección aduanera que se aplica para este trámite */
    seccionAduanera: '',
    /** Tipo de operación que se está llevando a cabo (importación, exportación, etc.) */
    tipoOperacion: '',
    /** Fecha en la que se realizó la operación o se espera que ocurra */
    fechaOperacion: '',
    /** Motivo por el cual se está realizando el despacho a domicilio */
    motivoDespachoDomicilio: '',
    /** Observaciones adicionales relacionadas con el trámite */
    observaciones: '',

    // formularioMercancia
    /** Especificaciones detalladas de la mercancía (por ejemplo, dimensiones, características, etc.) */
    especificacionesMercancia: '',
    /** Descripción general de la mercancía que se está despachando */
    descripcionMercancia: '',
    /** Tipo de moneda utilizada en la transacción (por ejemplo, USD, EUR) */
    tipoMoneda: '',
    /** Valor total de la mercancía en la transacción */
    valorMercancia: '',

    // formularioLogistica
    /** Esquemas de control y seguridad aplicados a la mercancía */
    esquemasControlSeguridad: '',
    /** Distancia y tiempos estimados de la ruta logística para el despacho */
    distanciaRutaTiempos: '',

    // formularioUbicacionMercancia
    /** Dirección donde se encuentra la mercancía o donde se realizará la entrega */
    direccion: '',
    /** Número de teléfono para contactar en caso de necesidades logísticas o emergencias */
    telefono: '',
    /** Distancia entre la ubicación de la mercancía y la aduana */
    distanciaAduana: '',
    /** Referencias adicionales para localizar la mercancía o dirección */
    referencias: ''
  };
}

/**
 * Servicio que gestiona el estado del trámite 5601. 
 * Se configura para estar disponible en toda la aplicación y 
 * ser reiniciable cuando sea necesario.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite5601', resettable: true })
export class Tramite5601Store extends Store<Tramite5601State> {
  /**
 * Constructor que inicializa el estado de la clase usando el estado por defecto
 * proporcionado por `createInitialState()`.
 */
  constructor() {
    super(createInitialState());
  }

  /** Actualiza el estado indicando si la empresa tiene certificación */
  public setTieneCertificacion(tieneCertificacion: boolean): void {
    this.update((state) => ({
      ...state,
      tieneCertificacion,
    }));
  }

  /** Actualiza el estado con el nombre de la certificación de la empresa */
  public setCertificacionEmpresa(certificacionEmpresa: string): void {
    this.update((state) => ({
      ...state,
      certificacionEmpresa,
    }));
  }

  /** Actualiza el estado con otra certificación que la empresa pueda tener */
  public setOtraCertificacion(otraCertificacion: string): void {
    this.update((state) => ({
      ...state,
      otraCertificacion,
    }));
  }

  /** Actualiza el estado con el código de la aduana asociada al trámite */
  public setAduana(aduana: string): void {
    this.update((state) => ({
      ...state,
      aduana,
    }));
  }

  /** Actualiza el estado con la sección aduanera aplicada al trámite */
  public setSeccionAduanera(seccionAduanera: string): void {
    this.update((state) => ({
      ...state,
      seccionAduanera,
    }));
  }

  /** Actualiza el estado con el tipo de operación (importación, exportación, etc.) */
  public setTipoOperacion(tipoOperacion: string): void {
    this.update((state) => ({
      ...state,
      tipoOperacion,
    }));
  }

  /** Actualiza el estado con la fecha de la operación */
  public setFechaOperacion(fechaOperacion: string): void {
    this.update((state) => ({
      ...state,
      fechaOperacion,
    }));
  }

  /** Actualiza el estado con el motivo del despacho a domicilio */
  public setMotivoDespachoDomicilio(motivoDespachoDomicilio: string): void {
    this.update((state) => ({
      ...state,
      motivoDespachoDomicilio,
    }));
  }

  /** Actualiza el estado con observaciones adicionales relacionadas con el trámite */
  public setObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      observaciones,
    }));
  }

  /** Actualiza el estado con las especificaciones detalladas de la mercancía */
  public setEspecificacionesMercancia(especificacionesMercancia: string): void {
    this.update((state) => ({
      ...state,
      especificacionesMercancia,
    }));
  }

  /** Actualiza el estado con la descripción general de la mercancía */
  public setDescripcionMercancia(descripcionMercancia: string): void {
    this.update((state) => ({
      ...state,
      descripcionMercancia,
    }));
  }

  /** Actualiza el estado con el tipo de moneda utilizada en la transacción */
  public setTipoMoneda(tipoMoneda: string): void {
    this.update((state) => ({
      ...state,
      tipoMoneda,
    }));
  }

  /** Actualiza el estado con el valor total de la mercancía */
  public setValorMercancia(valorMercancia: string): void {
    this.update((state) => ({
      ...state,
      valorMercancia,
    }));
  }

  /** Actualiza el estado con los esquemas de control y seguridad aplicados */
  public setEsquemasControlSeguridad(esquemasControlSeguridad: string): void {
    this.update((state) => ({
      ...state,
      esquemasControlSeguridad,
    }));
  }

  /** Actualiza el estado con la distancia y tiempos estimados de la ruta logística */
  public setDistanciaRutaTiempos(distanciaRutaTiempos: string): void {
    this.update((state) => ({
      ...state,
      distanciaRutaTiempos,
    }));
  }

  /** Actualiza el estado con la dirección de la mercancía */
  public setDireccion(direccion: string): void {
    this.update((state) => ({
      ...state,
      direccion,
    }));
  }

  /** Actualiza el estado con el número de teléfono de contacto */
  public setTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      telefono,
    }));
  }

  /** Actualiza el estado con la distancia entre la ubicación de la mercancía y la aduana */
  public setDistanciaAduana(distanciaAduana: string): void {
    this.update((state) => ({
      ...state,
      distanciaAduana,
    }));
  }

  /** Actualiza el estado con referencias adicionales para localizar la mercancía */
  public setReferencias(referencias: string): void {
    this.update((state) => ({
      ...state,
      referencias,
    }));
  }

}