import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Solicitud40302State {
  cveFolioCaat: string;
  descTipoCaat: string;
  descTipoAgente: string;
  directorGeneralNombre: string;
  primerApellido: string;
  segundoApellido: string;
}

export function createInitialState(): Solicitud40302State {
  return {
    cveFolioCaat: '',
    descTipoCaat: '',
    descTipoAgente: '',
    directorGeneralNombre: '',
    primerApellido: '',
    segundoApellido: '',
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'solicitud40302', resettable: true })
export class Solicitud40302Store extends Store<Solicitud40302State> {
  constructor() {
    super(createInitialState());
  }

  public setDirectorGeneralNombre(directorGeneralNombre: string): void {
    this.update((state) => ({
      ...state,
      directorGeneralNombre,
    }));
  }

  public setPrimerApellido(primerApellido: string): void {
    this.update((state) => ({
      ...state,
      primerApellido,
    }));
  }

  public setSegundoApellido(segundoApellido: string): void {
    this.update((state) => ({
      ...state,
      segundoApellido,
    }));
  }

  resetStore(): void {
    this.reset();
  }
}
