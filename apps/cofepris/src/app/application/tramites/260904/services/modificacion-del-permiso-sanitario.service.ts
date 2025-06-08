import { Tramite260904State, Tramite260904Store } from '../estados/tramite260904.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModificacionDelPermisoSanitarioService {
  constructor(private http: HttpClient, private tramite260904store: Tramite260904Store) {
    //constructor
  }

  public getData(): Observable<Tramite260904State> {
    return this.http.get<Tramite260904State>('assets/json/260904/datos.json');
  }

 public actualizarEstadoFormulario(resp: Tramite260904State): void {
  for (const CAMPO of Object.keys(resp) as (keyof Tramite260904State)[]) {
    if (Object.prototype.hasOwnProperty.call(resp, CAMPO) && resp[CAMPO] !== null) {
      this.tramite260904store.setTramite260904State({ [CAMPO]: resp[CAMPO] });
    }
  }
 }
}
