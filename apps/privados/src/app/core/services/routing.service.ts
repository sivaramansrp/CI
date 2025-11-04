import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoutingService {
  constructor(private router: Router) {}

  navigate(url: string | any[], extras: object = {}): Promise<boolean> {
    return this.router.navigate(Array.isArray(url) ? url : [url], extras);
  }
}
