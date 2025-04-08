import { Tramite300105State,Tramite300105Store } from "./tramite300105.store";
import { Injectable} from "@angular/core";
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite300105Query extends Query <Tramite300105State> {


  selectTramite300105$= this.select((state) => {
    return state;
  });


  constructor(
    protected override store: Tramite300105Store) {
    super(store);
  }
}