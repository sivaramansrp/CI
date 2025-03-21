import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private firmarSubject = new BehaviorSubject<boolean>(true);
  firmarFuncionario = this.firmarSubject.asObservable();

  setFirmar(valor: boolean) {
    this.firmarSubject.next(valor);
  }
}
