import { AcuseState, AcuseStore } from '../../../../../../apps/aga/src/app/application/estados/acuse.store';
import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class AcuseQueries extends Query<AcuseState> {
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

  constructor(protected override store: AcuseStore) {
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
