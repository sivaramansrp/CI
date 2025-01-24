import { Store, StoreConfig } from '@datorama/akita';
import { PerfilUsuario } from '../core/models/usuario/perfilUsuario.model';
import { Rol } from '../core/models/usuario/rol.model';

/**
 * Estado para la información de usuario obtenida del inicio de sesión
 */
export interface UsuarioState {
    logueado: boolean;
    token: string;
    perfilUsuario: PerfilUsuario;
    roles: Rol[];
}

/**
 * Creación del estado inicial para el usuario
 * @returns UsuarioState
 */
export function createInitialState(): UsuarioState {
  return {
    logueado: false,
    token: '',
    perfilUsuario: null,
    roles: [],
  };
}

@StoreConfig({ name: 'usuario', resettable: true, })
export class UsuarioStore extends Store<UsuarioState> {
  constructor() {
    super(createInitialState());
  }

  /**
   * Guarda la información del usuario registrado en la sesión dentro del state
   * 
   * @param logueado 
   * @param token 
   * @param nombre
   */
  public setUser(perfilUsuario: PerfilUsuario, roles: Rol[]) {
    this.update(state => ({
      ...state,
      logueado: true,
      perfilUsuario,
      roles,
    }));
  }

  /**
   * Limpia los datos del usuario al cerrar sesión
   */
  public limpiarUsuario() {
    this.reset();
  }
}