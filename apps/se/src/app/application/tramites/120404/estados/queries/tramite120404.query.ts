import { Tramite120404State,Tramite120404Store } from "../store/tramite120404.store";
import { Injectable} from "@angular/core";
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite120404Query extends Query <Tramite120404State> {


  selectTramite120404$= this.select((state) => {
    return state;
  });


  constructor(
    protected override store: Tramite120404Store) {
    super(store);
  }
}