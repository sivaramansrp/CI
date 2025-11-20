import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoutingService {
  constructor(private router: Router) {}

  navigate(url: string | any[], extras: NavigationExtras = {}): Promise<boolean> {
    const commands = Array.isArray(url) ? url : [url];
    const navigationExtras: NavigationExtras = { ...extras };

    if (!navigationExtras.relativeTo) {
      const defaultRoute = this.getDefaultRelativeRoute();
      if (defaultRoute) {
        navigationExtras.relativeTo = defaultRoute;
      }
    }

    return this.router.navigate(commands, navigationExtras);
  }

  private getDefaultRelativeRoute(): ActivatedRoute | null {
    let route: ActivatedRoute | null = this.router.routerState.root;

    while (route?.firstChild) {
      const child: ActivatedRoute = route.firstChild;

      if (child?.routeConfig?.path && child.routeConfig.path !== '') {
        return child;
      }

      route = child;
    }

    return route;
  }
}
