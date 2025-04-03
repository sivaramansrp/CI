import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';


import { Solicitud40302State, Solicitud40302Store } from '../estados/tramite40302.store';
import {Solicitud40302Query} from '../estados/tramite40302.query';

@Injectable({ providedIn: 'root' })
export class DatosDelTramiteService {
  constructor(
    private solicitudStore: Solicitud40302Store,
    private solicitudQuery: Solicitud40302Query
  ) {
    //lógica del constructor aquí
  }

  setInitialValues(): void {
    this.solicitudStore.update({
      cveFolioCaat: '3L6V',
      descTipoCaat: 'Naviero',
      descTipoAgente: 'Agente Naviero',
      directorGeneralNombre: 'HAZEL',
      primerApellido: 'NAVA',
      segundoApellido: 'AVILA',
    });
  }

  getSolicitudState(): Observable<Solicitud40302State> {
    return this.solicitudQuery.select();
  }
}