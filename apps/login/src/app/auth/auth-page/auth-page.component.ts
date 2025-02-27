import { Component } from '@angular/core';
import { PerfilUsuario } from '@ng-mf/data-access-user';
import { Rol } from  '@ng-mf/data-access-user';
import { Router } from '@angular/router'; 
import { TipoPersona } from '@ng-mf/data-access-user';
import { UsuarioStore } from './../../estados/usuario.store';

@Component({
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  indice: number = 1;

  constructor(
    private router: Router,
    private usuarioStore: UsuarioStore,
  ) {

  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }

  validarEFirma(login: boolean) {
    if ( login ) {
      const roles: Rol[] = [{idRol: 1, codigoRol:'', nombre:'', descripcion:''}];
      const perfilUsuario: PerfilUsuario = {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombreCompleto: '',
        rfc: '',
        correoElectronico: '',
        tipoPersona: TipoPersona.FISICA
      }
      this.usuarioStore.establecerUsuario('LEQI', perfilUsuario, roles, '');

      this.router.navigateByUrl('/aga/pago/seleccion-tramite');
    }
  }

  miFuncion(){
    console.log("Este es un mensaje");
  }
}
