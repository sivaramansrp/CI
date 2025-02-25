import { Component } from '@angular/core';
import { PerfilUsuario } from '../../core/models/usuario/perfilUsuario.model';
import { Rol } from '../../core/models/usuario/rol.model';
import { Router } from '@angular/router';
import { TipoPersona } from '../../core/enums/tipoPersona.enum';
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
  ) {}

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

      this.router.navigateByUrl('/seleccion-tramite');
    }
  }
}
