import * as uuid from 'uuid';
import { AMBIENTES, PerfilUsuario } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { Rol } from '@ng-mf/data-access-user';
import { Router } from '@angular/router'; 
import { TipoPersona } from '@ng-mf/data-access-user';
import { UsuarioStore } from '@libs/shared/data-access-user/src/core/estados/usuario.store';

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
      const PERFIL_USUARIO: PerfilUsuario = {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombreCompleto: '',
        rfc: 'SAAA980822LP1',
        correoElectronico: '',
        tipoPersona: TipoPersona.FISICA
      }
      this.usuarioStore.establecerUsuario('LEQI', PERFIL_USUARIO, ROLES, '');

      window.location.href = '/bandeja-de-tareas-pendientes';
    }
  }
}
