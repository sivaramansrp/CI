import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Tramite10302Store} from '../estados/tramite10302.store'
import { tap } from 'rxjs/operators';

/**
 * Servicio para obtener datos relacionados con importadores y exportadores.
 */
@Injectable({
  providedIn: 'root',
})

export class ExencionImpuestosService {
  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param http Servicio HTTP para realizar solicitudes.
   * @param store Store de Akita para gestionar el estado.
   */
  constructor(private http: HttpClient, private store: Tramite10302Store) {
    // El constructor se utiliza para la inyección de dependencias.
  }
/**
   * Obtiene el catálogo de aduanas por las que ingresará la mercancía.
   * @returns Observable con la respuesta del catálogo de aduanas.
   */
  getAduanaIngresara() {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/10302/aduanaIngresara.json'
    ).pipe(
      tap(response => this.store.setAduana(response.data))
    );
  }

  // /**
  //  * Obtiene el catálogo de años.
  //  * @returns Observable con la respuesta del catálogo de años.
  //  */
  // getAno() {
  //   return this.http.get<RespuestaCatalogos>('assets/json/10302/ano.json').pipe(
  //     tap(response => this.store.setAno(response.data))
  //   );
  // }

  // /**
  //  * Obtiene el catálogo de condiciones.
  //  * @returns Observable con la respuesta del catálogo de condiciones.
  //  */
  // getCondicion() {
  //   return this.http.get<RespuestaCatalogos>(
  //     'assets/json/10302/condicion.json'
  //   ).pipe(
  //     tap(response => this.store.setCondicion(response.data))
  //   );
  // }

  // /**
  //  * Obtiene el catálogo de países.
  //  * @returns Observable con la respuesta del catálogo de países.
  //  */
  // getPais() {
  //   return this.http.get<RespuestaCatalogos>('assets/json/10302/pais.json').pipe(
  //     tap(response => this.store.setPais(response.data))
  //   );
  // }

  /**
   * Obtiene el catálogo de tipos de documentos.
   * @returns Observable con la respuesta del catálogo de tipos de documentos.
   */
  getTipoDocumento() {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/10302/tipodocumento.json'
    ).pipe(
      tap(response => this.store.setTipoDocumento(response.data))
    );
  }

  getFechasSeleccionadas(){
    return this.http.get<RespuestaCatalogos>(
      'assets/json/10302/fechasSeleccionadas.json'
    ).pipe(
      tap(response => this.store.setFechasSeleccionadas(response.data))
    );
  }

  getDocumentos() {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/10302/documentos.json'
    )
    .pipe(
      tap(response => this.store.setDocumentos(response.data))
    );
  }
}
