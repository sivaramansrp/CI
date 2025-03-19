import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private firmarSubject = new BehaviorSubject<boolean>(false);
  firmarFuncionario$ = this.firmarSubject.asObservable();

  private tabIndexSource = new BehaviorSubject<number>(1);
  tabIndex$ = this.tabIndexSource.asObservable();
  
  constructor() { }
  
  setFirmar(valor: boolean) {
    this.firmarSubject.next(valor);
  }

  setTabIndex(index: number) {
    this.tabIndexSource.next(index);
  }
}
