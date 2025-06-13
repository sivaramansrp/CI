import { Tramite5601State, Tramite5601Store } from '../estados/stores/tramite5601.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudDespachoExportacionService {

  constructor(private http: HttpClient,private tramite5601Store: Tramite5601Store) { 
    //
  }

  actualizarEstadoFormulario(DATOS: Tramite5601State): void {
    Object.entries(DATOS).forEach(([clave, valor]) => {
      this.tramite5601Store.setDynamicFieldValue(
        clave as keyof Tramite5601State,
        valor as Tramite5601State[keyof Tramite5601State]
      );
    });
  }

  obtenerDatosInicialesFormulario(): Observable<Tramite5601State> {
    return this.http.get<Tramite5601State>('assets/json/5601/inicializar-formulario.json');
  }
}
