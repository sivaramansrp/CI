import { Catalogo } from '@libs/shared/data-access-user/src'; // Importa la interfaz `Catalogo` para definir la estructura de los datos.
import { HttpClient } from '@angular/common/http'; // Importa el cliente HTTP para realizar solicitudes HTTP.
import { Injectable } from '@angular/core'; // Importa el decorador Injectable para inyección de dependencias.
import { Observable } from 'rxjs/internal/Observable'; // Importa la clase Observable para manejar flujos de datos asíncronos.



/**
 * Servicio para gestionar las operaciones relacionadas con el permiso de exportación.
 * 
 * Este servicio proporciona métodos para interactuar con recursos externos y manejar
 * datos relacionados con el flujo del trámite de exportación.
 * 
 * @providedIn 'any' - Define que el servicio puede ser proporcionado en cualquier módulo.
 */
@Injectable({
  providedIn: 'any',
})
export class PermisoDeExportacionService {
  /**
   * Índice utilizado para rastrear el paso actual en el flujo del trámite.
   * 
   * Este índice se actualiza dinámicamente para reflejar el progreso del usuario
   * en el proceso del trámite.
   */
  indice!: number;

  /**
   * Constructor del servicio.
   * 
   * @param http Cliente HTTP utilizado para realizar solicitudes a recursos externos.
   * Este cliente se inyecta automáticamente mediante el mecanismo de inyección de dependencias de Angular.
   */
  constructor(private http: HttpClient) {
    
  }

  /**
   * Obtiene el catálogo de aduanas desde un archivo JSON local.
   * 
   * Este método realiza una solicitud HTTP GET para recuperar los datos del catálogo
   * de aduanas desde un archivo JSON almacenado localmente.
   * 
   * @returns Un Observable que emite los datos del catálogo de aduanas en formato `Catalogo`.
   */
  getAduana(): Observable<Catalogo> {
    return this.http.get<Catalogo>('assets/json/120204/entidad-federativa.json');
  }
}