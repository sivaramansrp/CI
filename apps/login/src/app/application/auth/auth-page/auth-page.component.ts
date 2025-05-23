/**
 * AuthPageComponent
 * 
 * Componente encargado de la autenticación de usuarios y la selección de pestañas en la página de login.
 * 
 * - Determina el ambiente de ejecución (localhost o desarrollo).
 * - Permite seleccionar la pestaña activa.
 * - Simula la validación de eFirma y establece un usuario de prueba en el store.
 * 
 * @author
 */

import * as uuid from 'uuid';
import { AMBIENTES, PerfilUsuario } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { Rol } from '@ng-mf/data-access-user';
import { TipoPersona } from '@ng-mf/data-access-user';
import { UsuarioStore } from '@libs/shared/data-access-user/src/core/estados/usuario.store';

@Component({
    selector: 'auth-page',
    templateUrl: './auth-page.component.html',
    styleUrl: './auth-page.component.scss',
    host: { 'hostID': uuid.v4().toString() }
})
export class AuthPageComponent implements OnInit {
    /**
     * Índice de la pestaña seleccionada.
     */
    indice: number = 1;

    /**
     * Ruta del ambiente actual (localhost o desarrollo).
     */
    public ruta: string = '';

    /**
     * Constructor.
     * @param usuarioStore Servicio para gestionar el estado del usuario autenticado.
     */
    constructor(
        private usuarioStore: UsuarioStore,
    ) {}

    /**
     * Inicializa el componente y determina el ambiente de ejecución.
     */
    ngOnInit(): void {
        if (window.location.host.indexOf('localhost') !== -1) {
            this.ruta = AMBIENTES.LOCALHOST;
        } else {
            this.ruta = AMBIENTES.DESARROLLO
        }
    }

    /**
     * Selecciona la pestaña activa.
     * @param i Índice de la pestaña a seleccionar.
     */
    seleccionaTab(i: number): void {
        this.indice = i;
    }

    /**
     * Simula la validación de eFirma.
     * Si el login es exitoso, establece un usuario de prueba y redirige a la selección de trámite.
     * @param login Indica si el login fue exitoso.
     */
    validarEFirma(login: boolean) {
        if (login) {
            const ROLES: Rol[] = [{ idRol: 1, codigoRol: '', nombre: '', descripcion: '' }];
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