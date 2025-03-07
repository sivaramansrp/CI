import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chofer40101Store } from 'apps/aga/src/app/application/estados/tramites/chofer40101.store';

@Injectable({
  providedIn: 'root',
})
export class Chofer40101Service {
  private choferesListSubject = new BehaviorSubject<any[]>([]);
  choferesList$ = this.choferesListSubject.asObservable();

  constructor(private chofer40101Store: Chofer40101Store) {
    const storedData = localStorage.getItem('choferesList');
    if (storedData) {
      this.choferesListSubject.next(JSON.parse(storedData));
    }
  }

  addChofer(nuevoMiembro: any, isExtranjero: boolean = false) {
    if (!nuevoMiembro) return;
  
    console.log('Adding Chofer:', nuevoMiembro);
  
    let storedData = localStorage.getItem(isExtranjero ? 'choferesextranjeroList' : 'choferesList');
    let choferArray: any[] = storedData ? JSON.parse(storedData) : [];
    choferArray.push(nuevoMiembro);
  
    // Update localStorage
    localStorage.setItem(isExtranjero ? 'choferesextranjeroList' : 'choferesList', JSON.stringify(choferArray));
  
    // Update Akita store
    if (isExtranjero) {
      this.chofer40101Store.update((state) => ({
        ...state,
        choferesextranjero: choferArray,
      }));
    } else {
      this.chofer40101Store.update((state) => ({
        ...state,
        choferes: choferArray,
      }));
    }
  
    console.log('Updated Akita Store:', choferArray);
    this.choferesListSubject.next(choferArray);
  }
  
}
