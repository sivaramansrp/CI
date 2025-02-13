import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatosForma, ListaDeDatosFinal, Movilizacion, PagoForm } from '../../models/220202/fitosanitario.model';

/**
 * @fileoverview Servicio para gestionar los datos del formulario fitosanitario de agricultura.
 * Este servicio utiliza un BehaviorSubject para almacenar y actualizar los datos del formulario,
 * permitiendo que los componentes se suscriban a los cambios y accedan a la información.
 * @module FitosanitarioAgriculturaService
 */

/**
 * @class FitosanitarioAgriculturaService
 * @description Servicio para la gestión de datos del formulario fitosanitario de agricultura.
 */
@Injectable({
  providedIn: 'root'
})
export class FitosanitarioAgriculturaService {

  /**
   * @property {BehaviorSubject<ListaDeDatosFinal>} datosFitosanitarios - BehaviorSubject que almacena los datos del formulario.
   * @private
   */
  private readonly datosFitosanitarios = new BehaviorSubject<ListaDeDatosFinal>({
    Datos: [],
    Movilizacion: [],
    Pago: []
  });

  /**
   * @method establecerDatosSolicitante
   * @description Establece los datos del solicitante (movilización).
   * @param {Movilizacion} datosMovilizacion - Datos de movilización a guardar.
   */
  establecerDatosSolicitante(datosMovilizacion: Movilizacion): void {
    const datosActuales = this.datosFitosanitarios.value;
    datosActuales.Movilizacion.push(datosMovilizacion);
    this.datosFitosanitarios.next(datosActuales);
  }

  /**
   * @method establecerDatosPago
   * @description Establece los datos de pago.
   * @param {PagoForm} datosPago - Datos de pago a guardar.
   */
  establecerDatosPago(datosPago: PagoForm): void {
    const datosActuales = this.datosFitosanitarios.value;
    datosActuales.Pago.push(datosPago);
    this.datosFitosanitarios.next(datosActuales);
  }

  /**
   * @method establecerDatosGenerales
   * @description Establece los datos generales.
   * @param {DatosForma} datosForma - Datos generales a guardar.
   */
  establecerDatosGenerales(datosForma: DatosForma): void {
    const datosActuales = this.datosFitosanitarios.value;
    datosActuales.Datos.push(datosForma);
    this.datosFitosanitarios.next(datosActuales);
  }

  /**
   * @method obtenerListaDatos
   * @description Obtiene un Observable con la lista de datos del formulario.
   * @returns {Observable<ListaDeDatosFinal>} - Observable con los datos del formulario.
   */
  obtenerListaDatos(): Observable<ListaDeDatosFinal> {
    return this.datosFitosanitarios.asObservable();
  }
}