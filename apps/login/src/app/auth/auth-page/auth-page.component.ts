import * as uuid from 'uuid';
import { AMBIENTES, PerfilUsuario, Rol, TipoPersona } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioStore } from './../../estados/usuario.store';
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
      const PERFILUSUARIO: PerfilUsuario = {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombreCompleto: '',
        rfc: '',
        correoElectronico: '',
        tipoPersona: TipoPersona.FISICA
      }
      this.usuarioStore.establecerUsuario('LEQI', PERFILUSUARIO, ROLES, '');

      window.location.href = '/seleccion-tramite';
    }
  }
}
