import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { FormularioDatos, Plantas } from '../modelos/registro-solicitud-immex.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para manejar las renovaciones de muestras de mercancías.
 * 
 * @remarks
 * Este servicio proporciona métodos para interactuar con la API relacionada con las renovaciones de muestras de mercancías.
 */
@Injectable({
  providedIn: 'root',
})
export class registroSolicitudImmexService {

  estados:Catalogo[]= [];
  plantas: Plantas[]=[];

  public obtenerFormularioDatos(): Observable<FormularioDatos> {
    return this.http.get<FormularioDatos>('assets/json/80210/formularioDatos.json')
  }

  public obtenerEstados(): void {
    this.obtenerRespuestaPorUrl(this, 'estados', '/80210/estados.json');
  }

  public obtenerPlantasDatos(): void {
    this.obtenerRespuestaPorUrl(this,'plantas','/80210/plantasDatos.json')
  }

  /**
   * Constructor del servicio registroSolicitudImmexService.
   * 
   * @param httpClient - Cliente HTTP inyectado para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {
       // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

  obtenerRespuestaPorUrl(
    self: registroSolicitudImmexService,
    variable: keyof registroSolicitudImmexService,
    url: string
  ): void {
    if (self && variable && url) {
      this.http.get<RespuestaCatalogos>(`assets/json${url}`).subscribe((resp): void => {
        (self[variable] as Catalogo[]) = resp?.code === 200 && resp.data ? resp.data : [];
      });
    }
  }

}
