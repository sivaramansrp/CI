import { Query } from '@datorama/akita';
import { UsuarioState } from '../../estados/usuario.store';
import { UsuarioStore } from '../../estados/usuario.store';

export class SessionQuery extends Query<UsuarioState> {

    /**
     * Selecciona el perfil completo del usuario
     */
    selectPerfilUsuario$ = this.select(state => {
        return state.perfilUsuario;
    });

    /**
     * Selecciona lo roles asignados a un usuario
     */
    selectRolesUsuario$ = this.select(state => {
        return state.roles;
    });

    /**
     * Selecciona el estatdo completo del usuario
     */
    selectUsuarioState$ = this.select(state => {
        return state;
    })

    constructor(
        protected override store: UsuarioStore
    ) {
        super(store);
    }

    /**
     * @description Función para obtener el nombre completo del usuario
     * @returns Un string que contiene el nombre completo.
     */
    getUserName(): string {
        return this.getValue()?.perfilUsuario.nombreCompleto;
    }
}
