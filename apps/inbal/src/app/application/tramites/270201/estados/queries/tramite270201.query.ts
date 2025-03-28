import {
  Tramite270201State,
  Tramite270201Store,
} from '../tramites/tramite270201.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({
  providedIn: 'root',
})
export class Tramite270201Query extends Query<Tramite270201State> {
  selectedOperacion$ = this.select((state) => state.operacion);
  selectedMovimiento$ = this.select((state) => state.operacion);
  selectedMotivo$ = this.select((state) => state.operacion);
  selectedPais$ = this.select((state) => state.operacion);
  selectedCiudad$ = this.select((state) => state.operacion);
  selectedTransporte$ = this.select((state) => state.operacion);
  selectedAduana$ = this.select((state) => state.operacion);
  selectedAutor$ = this.select((state) => state.operacion);
  selectedTitulo$ = this.select((state) => state.operacion);
  selectedTecnica$ = this.select((state) => state.operacion);
  selectedAlto$ = this.select((state) => state.operacion);
  selectedAncho$ = this.select((state) => state.operacion);
  selectedProfundidad$ = this.select((state) => state.operacion);
  selectedDiametro$ = this.select((state) => state.operacion);
  selectedVariables$ = this.select((state) => state.operacion);
  selectedAnoDeCreacion$ = this.select((state) => state.operacion);
  selectedAvaluo$ = this.select((state) => state.operacion);
  selectedMoneda$ = this.select((state) => state.operacion);
  selectedPropietario = this.select((state) => state.propietario);
  selectedFraccionArancelaria$ = this.select((state) => state.operacion);
  selectedDescripcionArancelaria$ = this.select((state) => state.operacion);

  selectDatosSolicitud$ = this.select((state) => {
    return state;
  });

  constructor(private tramiteStore: Tramite270201Store) {
    super(tramiteStore);
  }
}
