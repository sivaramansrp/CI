import { Component, OnInit } from '@angular/core';
import { UserService } from '@ng-mf/data-access-user';
import { distinctUntilChanged } from 'rxjs';

// import { ListaPasosWizard } from '../../../../core/models/501/servicios-extraordinarios.model';
// import { PANTAPASOS } from '../../../../core/services/220471/servicios-pantallas.enum';

/**
 * Este componente se utiliza para mostrar los pasos del asistente - 220401
 * Lista de pasos
 * Índice del paso
 */ 
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html'
})

export class PantallasComponent  implements OnInit {
  /**
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  //pantallasPasos: ListaPasosWizard[] = PANTAPASOS;
  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  public loggedInUser = '';
  public loggedInUserToken = '';
  isLoggedIn$ = this.userService.isUserLoggedIn$;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        // Queue the navigation after initialNavigation blocking is completed
        setTimeout(() => {
          if (loggedIn) {
            this.loggedInUser = 'Jane Doe';
            this.loggedInUserToken = 'VUE223284284284'; //get from the session storage
          } else {
            this.loggedInUser = '';
          }
        });
      });
  }
}
