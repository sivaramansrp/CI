import { DatosDeLaMercanciaState, DatosDeLaMercanciaStore } from "../store/datos-de-la-mercancia.store";
import { Injectable} from "@angular/core";
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class DatosDeLaMercanciaQuery extends Query <DatosDeLaMercanciaState> {


  selectCveRegistroProductor$= this.select((state) => {
    return state.cveRegistroProductor;
  });


  constructor(
    protected override store: DatosDeLaMercanciaStore) {
    super(store);
  }
}