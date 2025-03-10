import { Tramite110209State,Tramite110209Store} from "./../stores/tramite110209.store";
import { Injectable} from "@angular/core";
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite110209Query extends Query <Tramite110209State> {


  selectTramite110102$= this.select((state) => {
    return state;
  });


  constructor(
    protected override store: Tramite110209Store) {
    super(store);
  }
}