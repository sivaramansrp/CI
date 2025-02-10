import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '@ng-mf/data-access-user';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'ng-mf-root',
  template: `
    <h2 class="dashboard-nav">Admin Dashboard</h2>
    <div *ngIf="isLoggedIn$ | async; else signIn">
      You are authenticated so you can see this content.
      <br />
      <table>
        <tr>
          <td><a routerLink="/501">501</a></td>
          <td><a routerLink="/220401/pago">220401</a></td>
          <td><a routerLink="/5701">5701</a></td>
        </tr>
      </table>
      <router-outlet></router-outlet>
    </div>
    <ng-template #signIn><router-outlet></router-outlet></ng-template>
  `,
})
export class AppComponent implements OnInit {
  isLoggedIn$ = this.userService.isUserLoggedIn$;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        // Queue the navigation after initialNavigation blocking is completed
        setTimeout(() => {
          if (!loggedIn) {
            this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl('501');
          }
        });
      });
  }
}
