import { Component } from '@angular/core';
import { COOKIE } from '../../shared/constantes/constantes';
import { Router } from '@angular/router';

@Component({
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  indice: number = 1;

  constructor(private router: Router) {}

  seleccionaTab(i: number): void {
    this.indice = i;
  }

  validarEFirma(login: boolean) {
    if ( login ) {
      const datosUsuario = {
        id_user: 'LEQI',
        rol: 1,
        rfc: '',
        tipo_persona: 'Física',
        jwt: '',
      };

      localStorage.setItem(
        COOKIE.NOMBRE_COOKIE_ID_USUARIO,
        datosUsuario.id_user
      );
      this.router.navigateByUrl('/seleccion-tramite');
    }
  }
}
