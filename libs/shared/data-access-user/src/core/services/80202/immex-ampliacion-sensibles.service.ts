import { Injectable } from '@angular/core';
import { ImmexAmpliacionSensiblesStore } from '../../../../../../../apps/se/src/app/application/store/80202/immex-ampliacion-sensibles.store';
import { Anexo } from '../../models/80202/immex-ampliacion-sensibles.model';

/**
 * Service for managing IMMEX Ampliacion Sensibles data
 * @class ImmexAmpliacionSensiblesService
 * @description Handles the business logic for IMMEX Ampliacion Sensibles operations
 */
@Injectable({
  providedIn: 'root',
})
export class ImmexAmpliacionSensiblesService {
  constructor(
    private immexAmpliacionSensiblesStore: ImmexAmpliacionSensiblesStore
  ) {}

  /**
   * Updates the Anexo data in the store
   * @param {Anexo} anexo - The Anexo object containing the updated data
   * @returns {void}
   */
  updateAnexo(anexo: Anexo): void {
    this.immexAmpliacionSensiblesStore.actualizarAnexo(anexo);
  }

  /**
   * Retrieves the current Anexo data from the store
   * @returns {Observable<Anexo>} An observable of the Anexo data
   */
  getAnexo() {
    return this.immexAmpliacionSensiblesStore._select((state) => state.anexo);
  }
}
