import { Query } from '@datorama/akita';
import { TramiteStore } from '../../estados/tramite.store';
import { TramiteState } from '../../estados/tramite.store';

export class TramitesQueries extends Query<TramiteState> {
  /**
   * Selecciona el número de trámite
   */
  selectIdTramite$ = this.select((state) => {
    return state.idTramite;
  });

  /**
   * Sleeciona la firma
   */
  selectedFirma$ = this.select((state) => {
    return state.firma;
  });

  constructor(protected override store: TramiteStore) {
    super(store);
  }

  /**
   * @description Función para obtener el número de trámite
   * @returns Un string que contiene el número de trámite.
   */
  getTramite(): string {
    return this.getValue()?.idTramite;
  }

  /**
   * @description Función para obtener la firma
   * @returns Un string que contiene la firma.
   */
  getFirma(): string {
    return this.getValue()?.firma;
  }
}
