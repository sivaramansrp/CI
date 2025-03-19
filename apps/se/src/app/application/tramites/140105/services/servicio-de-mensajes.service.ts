import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioDeMensajesService {

  constructor() { }
  private messageSource = new Subject<boolean>();
  message$ = this.messageSource.asObservable();

  sendMessage(message: boolean) {
    this.messageSource.next(message);
  }
}
