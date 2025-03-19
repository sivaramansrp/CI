import { Tramite130119State,Tramite130119Store} from "../store/tramite130119.store";
import { Injectable} from "@angular/core";
import { Query } from '@datorama/akita';


@Injectable({ providedIn: 'root' })
export class Tramite130119Query extends Query <Tramite130119State> {


  selectTramite130119$= this.select((state) => {
    return state;
  });


  constructor(
    protected override store: Tramite130119Store) {
    super(store);
  }
}