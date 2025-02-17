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
    <h2 class="dashboard-nav"> Welcome VUCME3.0</h2>
    <table border="1" cellpadding="5" cellspacing="5">
    <tbody>
        <tr>
          <td width="30"><a routerLink="aga/pago/seleccion-tramite">Procedure</a></td>
        </tr>
        </tbody>
      </table>
      <router-outlet></router-outlet>
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
            //this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl('aga');
          }
        });
      });
  }
}
