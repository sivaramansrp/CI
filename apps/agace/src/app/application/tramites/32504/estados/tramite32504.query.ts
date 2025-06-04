import { FormularioGrupo } from '../models/aviso.model';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite32504Store } from './tramite32504.store';

/**
 * @class Tramite32504Query
 * @description Consulta de estado para el trámite 32504. Permite seleccionar diferentes partes del estado relacionadas con el formulario del trámite.
 * @extends {Query<FormularioGrupo>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite32504Query extends Query<FormularioGrupo> {

  /**
   * Observable que emite los datos de la empresa.
   * @type {Observable<any>}
   */
  selectDatosEmpresa$ = this.select((state) => {
    return state.datosEmpresa;
  });

  /**
   * Observable que emite el tipo de carga seleccionado.
   * @type {Observable<any>}
   */
  setCargaTipo$ = this.select((state) => {
    return state.cargaTipo;
  })

  /**
   * Observable que emite los datos de quien recibe.
   * @type {Observable<any>}
   */
  selectDatosQuienRecibe$ = this.select((state) => {
    return state.datosQuienRecibe;
  });

  /**
   * Observable que emite los datos de la mercancía para submanufactura.
   * @type {Observable<any>}
   */
  selectDatosMercanciaSubmanufactura$ = this.select((state) => {
    return state.datosMercanciaSubmanufactura;
  });

  /**
   * Observable que emite los datos del domicilio del lugar.
   * @type {Observable<any>}
   */
  selectDatosDomicilioLugar$ = this.select((state) => {
    return state.datosDomicilioLugar;
  });

  /**
   * Observable que emite el estado completo del formulario.
   * @type {Observable<FormularioGrupo>}
   */
  selectformulario$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor de la clase Tramite32504Query.
   * @param {Tramite32504Store} store - Store que gestiona el estado del trámite 32504.
   */
  constructor(protected override store: Tramite32504Store) {
    super(store);
  }
}