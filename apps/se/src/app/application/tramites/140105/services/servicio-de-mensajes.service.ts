import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioDeMensajesService {

  constructor() { }
  private fuenteDelMensaje = new Subject<boolean>();
  mensaje$ = this.fuenteDelMensaje.asObservable();

  private datosDePermiso = new Subject<boolean>();
  datos$ = this.datosDePermiso.asObservable();


  enviarMensaje(mensaje: boolean) {
    this.fuenteDelMensaje.next(mensaje);
  }

  establecerDatosDePermiso(valor: boolean) {
    this.datosDePermiso.next(valor);
  }
}
