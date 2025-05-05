import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Solicitud120702State{
    [key: string]: any;
}

export function createInitialState(): Solicitud120702State {
    return {};
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'tramite120702', resettable: true })
export class Tramite120702Store extends Store<Solicitud120702State>{
    constructor(){
        super(createInitialState());
    }

    public setDynamicFieldValue(fieldName: string, value: any): void {
        this.update((state) => ({
          ...state,
          [fieldName]: value,
        }));
      }
}