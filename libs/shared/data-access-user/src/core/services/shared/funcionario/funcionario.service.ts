import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private tabIndexSource = new BehaviorSubject<boolean>(true);
  tabIndex$ = this.tabIndexSource.asObservable();

  setTabIndex(index: boolean) {
    this.tabIndexSource.next(index);
  }
}
