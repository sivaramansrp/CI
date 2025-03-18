import { TercerosRelacionadas260212State, Tramite260212Store } from "../tramites/tramite260212.store";
import { Injectable} from "@angular/core";
import { Query } from "@datorama/akita";

@Injectable({providedIn:'root'})
export class Tramite260212Query extends Query<TercerosRelacionadas260212State>{
    selectTereceros$ = this.select((state) => {
        return state;
    });

    constructor(
    protected override store: Tramite260212Store){
        super(store);
    }
}