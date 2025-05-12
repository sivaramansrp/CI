import { Query, StoreConfig } from "@datorama/akita";
import { Solicitud230401State, Tramite230401Store } from "../tramite230401.store";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'solicitud230401', resettable: true})
export class Solicitud230401Query extends Query<Solicitud230401State> {
    
    /**Guarda el estado completo del formulario de la solicitud */
    constructor(
        protected override store: Tramite230401Store) {
            super(store);
        }

        /**
         * Selecciona el estado completo de la solicitud
         */
        selectSolicitud$ = this.select((state) => {
            return state;
        });

        /**
         * Selecciona el estado completo de pago de derechos.
         * 
         * @returns El estado de pago de derechos.
         */
    seletPagoDerechosState$ = this.select((state) => {
        return state.pagoDerechosState
    });
    }