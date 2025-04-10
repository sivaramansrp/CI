import { Tramite260912Store, Tramites260912State } from './tramite-260912.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * @description
 * Clase que extiende de Akita Query para gestionar las consultas al estado de Tramite260912.
 * Proporciona selectores para acceder a los atributos del estado de manera reactiva.
 */
@Injectable({ providedIn: 'root' })
export class Tramite260912Query extends Query<Tramites260912State> {
  
  /** Selector para el valor del botón de radio */
  btonDeRadio$ = this.select((state) => state.btonDeRadio);

  /** Selector para la justificación */
  justificacion$ = this.select((state) => state.justificacion);

  /** Selector para el RFC del solicitante */
  rfcDel$ = this.select((state) => state.rfcDel);

  /** Selector para la denominación */
  denominacion$ = this.select((state) => state.denominacion);

  /** Selector para el correo electrónico */
  correo$ = this.select((state) => state.correo);

  /** Selector para el código postal */
  codigoPostal$ = this.select((state) => state.codigoPostal);

  /** Selector para el estado */
  estado$ = this.select((state) => state.estado);

  /** Selector para el municipio o alcaldía */
  municipioOAlcaldia$ = this.select((state) => state.municipioOAlcaldia);

  /** Selector para la localidad */
  localidad$ = this.select((state) => state.localidad);

  /** Selector para las colonias */
  colonias$ = this.select((state) => state.colonias);

  /** Selector para la calle */
  calle$ = this.select((state) => state.calle);

  /** Selector para la lada */
  lada$ = this.select((state) => state.lada);

  /** Selector para el teléfono */
  telefono$ = this.select((state) => state.telefono);

  /** Selector para el checkbox de aviso */
  avisoCheckbox$ = this.select((state) => state.avisoCheckbox);

  /** Selector para el régimen */
  regimen$ = this.select((state) => state.regimen);

  /** Selector para las aduanas de entrada */
  aduanasEntradas$ = this.select((state) => state.aduanasEntradas);

  /** Selector para el checkbox de AIFA */
  aifaCheckbox$ = this.select((state) => state.aifaCheckbox);

  /** Selector para los manifiestos */
  manifests$ = this.select((state) => state.manifests);

  /** Selector para el acuerdo público */
  acuerdoPublico$ = this.select((state) => state.acuerdoPublico);

  /** Selector para el RFC */
  rfc$ = this.select((state) => state.rfc);

  /**
   * Selector para obtener todo el estado de Tramite260912.
   * @returns El estado completo.
   */
  selectTramite260912$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor de la clase Tramite260912Query.
   * @param store Instancia del store de Tramite260912.
   */
  constructor(protected override store: Tramite260912Store) {
    super(store);
  }
}