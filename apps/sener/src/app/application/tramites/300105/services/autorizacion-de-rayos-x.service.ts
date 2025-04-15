import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AutorizacionDeRayosXService {

  /**
   * Catálogo de fracciones arancelarias.
   */
  fraccionArancelaria: Catalogo[] = [];

  /**
   * Catálogo de descripciones de fracciones arancelarias.
   */
  fraccionArancelariaDescripcion: Catalogo[] = [];

  unidadMedidaVoltaje: Catalogo[] = [];

  unidadMedidaCorriente: Catalogo[] = [];

  pais: Catalogo[] = [];
  tipoMercancia: Catalogo[] = [];

  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    // No se necesita lógica de inicialización adicional.
  }

  getBancoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/300105/banco-options.json');
  }

  getTipoOperacion(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/300105/tipo-operacion.json');
  }

  getFinalidad(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/300105/finalidad.json');
  }

  /**
 * Inicializa los datos de los catálogos relacionados con mercancías.
 */
  public inicializaMercanciaDatosCatalogos(): void {
    this.obtenerRespuestaPorUrl(this, 'fraccionArancelaria', '/300105/fraccion-arancelaria.json');
    this.obtenerRespuestaPorUrl(this, 'fraccionArancelariaDescripcion', '/300105/fraccion-arancelaria-descripcion.json');
    this.obtenerRespuestaPorUrl(this, 'unidadMedidaVoltaje', '/300105/unidad-medida-voltaje.json');
    this.obtenerRespuestaPorUrl(this, 'unidadMedidaCorriente', '/300105/unidad-medida-corriente.json');
    this.obtenerRespuestaPorUrl(this, 'pais', '/300105/pais.json');
    this.obtenerRespuestaPorUrl(this, 'tipoMercancia', '/300105/tipo-mercancia.json');
  }

  /**
 * Si la variable y la URL son válidas, se realiza una solicitud HTTP GET a la URL especificada.
 * Si la respuesta tiene un código 200 y contiene datos, estos se asignan a la variable especificada.
 * Si la variable o la URL no son válidas, se asigna un arreglo vacío a la variable.
 */
  obtenerRespuestaPorUrl(
    self: AutorizacionDeRayosXService,
    variable: keyof AutorizacionDeRayosXService,
    url: string
  ): void {
    if (self && variable && url) {
      this.http.get<RespuestaCatalogos>(`assets/json${url}`).subscribe((resp): void => {
        (self[variable] as Catalogo[]) = resp?.code === 200 && resp.data ? resp.data : [];
      });
    }
  }

}