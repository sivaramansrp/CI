import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SanidadService {

  banco: Catalogo[] = [];
  justificacionCatalogo: Catalogo[] = [];

  constructor(private http: HttpClient) { }

  /**
   * Inicializa los datos de los catálogos relacionados con el pago de derechos.
   */
  public inicializaPagoDeDerechosDatosCatalogos(): void {
    this.obtenerRespuestaPorUrl(this, 'banco', '/221603/banco.json');
    this.obtenerRespuestaPorUrl(this,'justificacionCatalogo', '/221603/justificacion.json');
  }

  obtenerRespuestaPorUrl(
    self: SanidadService,
    variable: keyof SanidadService,
    url: string
  ): void {
    if (self && variable && url) {
      this.http.get<RespuestaCatalogos>(`assets/json${url}`).subscribe((resp): void => {
        (self[variable] as Catalogo[]) = resp?.code === 200 && resp.data ? resp.data : [];
      });
    }
  }
}
