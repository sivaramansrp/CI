import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TablaScianConfig } from '../models/datos-solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class ScianDataService {
  private scianDataSubject = new BehaviorSubject<TablaScianConfig[]>([]);
  public scianData$ = this.scianDataSubject.asObservable();

  updateScianData(data: TablaScianConfig[]): void {
    this.scianDataSubject.next(data);
  }
}