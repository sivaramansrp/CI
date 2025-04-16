import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private nacionalDataSubject = new BehaviorSubject<any[]>([]);
  nacionalData$ = this.nacionalDataSubject.asObservable();

  constructor() {
    this.loadStoredData();
  }

  addData(nuevoMiembro: Record<string, unknown>): void {
    const CURRENT_DATA = this.nacionalDataSubject.value;
    CURRENT_DATA.push(nuevoMiembro);
    this.nacionalDataSubject.next(CURRENT_DATA);
    sessionStorage.setItem('nacionalData', JSON.stringify(CURRENT_DATA));
  }
  private loadStoredData(): void {
    const STORED_DATA = sessionStorage.getItem('nacionalData');
    if (STORED_DATA) {
      this.nacionalDataSubject.next(JSON.parse(STORED_DATA));
    }
  }
}
