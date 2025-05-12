import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite260911State } from '../store/tramite260911.store';
import { Tramite260911Store } from '../store/tramite260911.store';

/**
 * Servicio de consulta para el estado de Tramite260911.
 * Proporciona selectores para acceder a las propiedades del estado de manera reactiva.
 */
@Injectable({ providedIn: 'root' })
export class Tramite260911Query extends Query<Tramite260911State> {
  /**
   * Selector para el estado de `btonDeRadio`.
   */
  btonDeRadio$ = this.select((state) => state.btonDeRadio);

  /**
   * Selector para el estado de `justificacion`.
   */
  justificacion$ = this.select((state) => state.justificacion);

  /**
   * Selector para el estado de `rfcDel`.
   */
  rfcDel$ = this.select((state) => state.rfcDel);

  /**
   * Selector para el estado de `denominacion`.
   */
  denominacion$ = this.select((state) => state.denominacion);

  /**
   * Selector para el estado de `correo`.
   */
  correo$ = this.select((state) => state.correo);

  /**
   * Selector para el estado de `codigoPostal`.
   */
  codigoPostal$ = this.select((state) => state.codigoPostal);

  /**
   * Selector para el estado de `estado`.
   */
  estado$ = this.select((state) => state.estado);

  /**
   * Selector para el estado de `municipioOAlcaldia`.
   */
  municipioOAlcaldia$ = this.select((state) => state.municipioOAlcaldia);

  /**
   * Selector para el estado de `localidad`.
   */
  localidad$ = this.select((state) => state.localidad);

  /**
   * Selector para el estado de `colonias`.
   */
  colonias$ = this.select((state) => state.colonias);

  /**
   * Selector para el estado de `calle`.
   */
  calle$ = this.select((state) => state.calle);

  /**
   * Selector para el estado de `lada`.
   */
  lada$ = this.select((state) => state.lada);

  /**
   * Selector para el estado de `telefono`.
   */
  telefono$ = this.select((state) => state.telefono);

  /**
   * Selector para el estado de `avisoCheckbox`.
   */
  avisoCheckbox$ = this.select((state) => state.avisoCheckbox);

  /**
   * Selector para el estado de `regimen`.
   */
  regimen$ = this.select((state) => state.regimen);

  /**
   * Selector para el estado de `aduanasEntradas`.
   */
  aduanasEntradas$ = this.select((state) => state.aduanasEntradas);

  /**
   * Selector para el estado de `aifaCheckbox`.
   */
  aifaCheckbox$ = this.select((state) => state.aifaCheckbox);

  /**
   * Selector para el estado de `manifests`.
   */
  manifests$ = this.select((state) => state.manifests);

  /**
   * Selector para el estado de `acuerdoPublico`.
   */
  acuerdoPublico$ = this.select((state) => state.acuerdoPublico);

  /**
   * Selector para el estado de `rfc`.
   */
  rfc$ = this.select((state) => state.rfc);

  /**
   * Selector para obtener todo el estado de Tramite260911.
   */
  selectTramite260911$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor del servicio de consulta.
   * @param tramiteStore Instancia del store de Tramite260911.
   */
  constructor(protected override store: Tramite260911Store) {
    super(store);
  }
}