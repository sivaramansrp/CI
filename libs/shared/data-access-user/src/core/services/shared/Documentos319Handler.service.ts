import {
  AcuseComponent,
  BodyTablaAcuse,
} from '@libs/shared/data-access-user/src';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { DocumentHandler } from '@libs/shared/data-access-user/src/core/handlers/Document.handler';
import { DocumentosT319Service } from './documentT319.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Documentos319HandlerService implements DocumentHandler {
  private procedures = [319];

  constructor(private documentService: DocumentosT319Service) {}

  /**
   * Revisa si el handler soporta el procedimiento dado.
   * @param procedure prócedimiento a revisar
   * @returns si el procedimiento es soportado
   */
  supports(procedure: number): boolean {
    return this.procedures.includes(procedure);
  }

  /**
   *
   * @param procedure procedimiento a manejar
   * @param idSolicitud identificador de la solicitud
   * @returns Observable con los datos para la tabla de acuse
   */
  handle(procedure: number, idSolicitud: number): Observable<BodyTablaAcuse[]> {
    return this.documentService
      .guardarDocumento(idSolicitud.toString(), procedure, true)
      .pipe(
        switchMap(() =>
          this.documentService.vistaPreviaDocumento(
            idSolicitud.toString(),
            procedure,
            true
          )
        ),
        map((resp) => {
          if (resp?.datos) {
            return [
              {
                id: 1,
                documento: resp.datos.nombre_archivo,
                urlPdf: AcuseComponent.crearUrlPdf(resp.datos.contenido),
                idDocumento: '1',
              } as BodyTablaAcuse,
            ];
          }
          return [];
        }),
        catchError(() => of([]))
      );
  }
}
