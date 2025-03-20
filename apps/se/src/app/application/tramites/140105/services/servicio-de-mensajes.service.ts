import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DesistimientoStore } from '../estados/desistimiento-de-permiso.store';
import { Cancelacion } from '../models/cancelacion-de-solicitus.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioDeMensajesService {
  private fuenteDelMensaje = new Subject<boolean>();
  mensaje$ = this.fuenteDelMensaje.asObservable();

  private datosDePermiso = new Subject<boolean>();
  datos$ = this.datosDePermiso.asObservable();

  constructor(private readonly desistimientoStore: DesistimientoStore) {

  }
  enviarMensaje(mensaje: boolean) {
    this.fuenteDelMensaje.next(mensaje);
  }

  establecerDatosDePermiso(valor: boolean) {
    this.datosDePermiso.next(valor);
  }

  setDatos(valor: Cancelacion[]) {
    this.desistimientoStore.setDatos(valor as Cancelacion[]);
  }
}
