import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';
import { tableData } from '../../tramites/260212/models/permiso-maquila.models';

export interface TercerosRelacionadas260212State {
    Fabricante : tableData[],
    Destinatario : tableData[],
    Proveedor : tableData[],
    Facturador : tableData[]
}

export function createInitialState(): TercerosRelacionadas260212State {
    return {
        Fabricante : [],
        Destinatario : [],
        Proveedor : [],
        Facturador : []
    };
}

@Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'tramite260212', resettable: true })
  export class Tramite260212Store extends Store<TercerosRelacionadas260212State> {
    constructor() {
      super(createInitialState());
    }

    public setFabricante(fabricante: tableData[]) {
        this.update((state) => ({
          ...state,
          fabricante,
        }));
    }

    public setDestinatario(destinatario: tableData[]) {
        this.update((state) => ({
          ...state,
          destinatario,
        }));
    }

    public setProveedor(proveedor: tableData[]) {
        this.update((state) => ({
          ...state,
          proveedor,
        }));
    }

    public setFacturador(facturador: tableData[]) {
        this.update((state) => ({
          ...state,
          facturador,
        }));
    }

}
