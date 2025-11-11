import { BodyTablaAcuse } from '../models/shared/catalogos.model';
import { Observable } from 'rxjs';

/**
 * Interface para manejar documentos en función del procedimiento.
 */
export interface DocumentHandler {
  /**
   * Indica si el handler atiende el procedimiento especificado.
   * @param procedure - Código del procedimiento.
   * @returns true si el handler soporta el procedimiento, false en caso contrario.
   */
  supports(procedure: number): boolean;

  /**
   * Ejecuta la generación/descarga y devuelve las filas para la tabla de acuse.
   * idSolicitud viene como string (tal como usa el código actual).
   * @param procedure - Código del procedimiento.
   * @param idSolicitud - Identificador de la solicitud.
   */
  handle(procedure: number, idSolicitud: number): Observable<BodyTablaAcuse[]>;
}
