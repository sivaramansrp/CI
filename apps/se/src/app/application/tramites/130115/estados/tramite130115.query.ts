import { Tramite130115State,Tramite130115Store } from './tramite130115.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite130115Query extends Query<Tramite130115State> {


  constructor(
    protected override store: Tramite130115Store) {
    super(store);
  }
}