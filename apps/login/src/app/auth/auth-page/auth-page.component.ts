import * as uuid from 'uuid';
<<<<<<< HEAD
import { AMBIENTES, PerfilUsuario, Rol, TipoPersona } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
=======
import { AMBIENTES, PerfilUsuario } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { Rol } from '@ng-mf/data-access-user';
import { Router } from '@angular/router'; 
import { TipoPersona } from '@ng-mf/data-access-user';
import { UsuarioStore } from '@libs/shared/data-access-user/src/core/estados/usuario.store';
>>>>>>> 90365bb06c2a2d1d070315fa6782bbf485ab80d9

@Component({
  selector : 'auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
  host: { 'hostID': uuid.v4().toString() }
})
export class AuthPageComponent implements OnInit {
  indice: number = 1;
  public ruta: string = '';
  
  constructor(
    private router: Router,
    private usuarioStore: UsuarioStore,
  ) {

  }

  ngOnInit(): void {
    if (window.location.host.indexOf('localhost') !== -1) {
      this.ruta = AMBIENTES.LOCALHOST;
    } else {
      this.ruta = AMBIENTES.DESARROLLO
    }
  }

  seleccionaTab(i: number): void {
    this.indice = i;

  }

  validarEFirma(login: boolean) {
    if ( login ) {
      const ROLES: Rol[] = [{idRol: 1, codigoRol:'', nombre:'', descripcion:''}];
<<<<<<< HEAD
      const PERFILUSUARIO: PerfilUsuario = {
=======
      const PERFIL_USUARIO: PerfilUsuario = {
>>>>>>> 90365bb06c2a2d1d070315fa6782bbf485ab80d9
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombreCompleto: '',
        rfc: 'SAAA980822LP1',
        correoElectronico: '',
        tipoPersona: TipoPersona.FISICA
      }
<<<<<<< HEAD
      this.usuarioStore.establecerUsuario('LEQI', PERFILUSUARIO, ROLES, '');
=======
      this.usuarioStore.establecerUsuario('LEQI', PERFIL_USUARIO, ROLES, '');
>>>>>>> 90365bb06c2a2d1d070315fa6782bbf485ab80d9

      window.location.href = '/seleccion-tramite';
    }
  }
}
