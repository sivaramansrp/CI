import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Cancelacion, PermisosDatos } from '../models/cancelacion-de-solicitus.model';
import { DesistimientoStore } from '../estados/desistimiento-de-permiso.store';


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

  actualizarDatosForma(valor: Cancelacion[]) {
    this.desistimientoStore.actualizarDatosForma(valor as Cancelacion[]);
  }

  public obtenerDatos(): Observable<PermisosDatos> {
    return this.desistimientoStore._select(state => state); // Devuelve el estado completo
  }
}
