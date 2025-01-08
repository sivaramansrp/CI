import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardService {
  private indice = new BehaviorSubject<number>(1);

  actualIndice = this.indice.asObservable();

  cambio_indice(indice: number) {
    this.indice.next(indice);
  }
}
