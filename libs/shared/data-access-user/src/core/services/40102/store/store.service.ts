import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private nacionalDataSubject = new BehaviorSubject<any[]>([]);
  nacionalData$ = this.nacionalDataSubject.asObservable();

  constructor() {
    this.loadStoredData();
  }

  addData(nuevoMiembro: any) {
    let currentData = this.nacionalDataSubject.value;
    currentData.push(nuevoMiembro);
    this.nacionalDataSubject.next(currentData);
    sessionStorage.setItem('nacionalData', JSON.stringify(currentData));
  }
  private loadStoredData() {
    const storedData = sessionStorage.getItem('nacionalData');
    if (storedData) {
      this.nacionalDataSubject.next(JSON.parse(storedData));
    }
  }
}
