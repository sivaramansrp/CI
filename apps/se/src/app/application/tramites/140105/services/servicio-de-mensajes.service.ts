import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioDeMensajesService {

  constructor() { }
  private fuenteDelMensaje = new Subject<boolean>();
  mensaje$ = this.fuenteDelMensaje.asObservable();

  enviarMensaje(mensaje: boolean) {
    this.fuenteDelMensaje.next(mensaje);
  }
}
