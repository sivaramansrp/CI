import { Tramite110102State,Tramite110102Store } from "../store/tramite110102.store";
import { Injectable} from "@angular/core";
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite110102Query extends Query <Tramite110102State> {


  selectTramite110102$= this.select((state) => {
    return state;
  });


  constructor(
    protected override store: Tramite110102Store) {
    super(store);
  }
}