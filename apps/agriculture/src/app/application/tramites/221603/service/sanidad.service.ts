import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Destinatario, Exportador, FormularioDatos, Mercancia } from '../enum/sanidad.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SanidadService {

  regimen: Catalogo[] = [];
  mercancia: Mercancia[] = [];
  exportador: Exportador[] = [];
  destinatario: Destinatario[] = [];
  banco: Catalogo[] = [];
  justificacionCatalogo: Catalogo[] = [];

  constructor(private http: HttpClient) { }

  public inicializaCatalogosRegimen(): void {
    this.obtenerRespuestaPorUrl(this, 'regimen', '/221603/regimen.json');
  }

  public inicializaDatosMercancia(): void {
    this.obtenerRespuestaPorUrl(this, 'mercancia', '/221603/mercancia.json');
  }

  public inicializaDatosExportador(): void {
    this.obtenerRespuestaPorUrl(this, 'exportador', '/221603/exportador.json');
  }

  public inicializaDatosDestinatario(): void {
    this.obtenerRespuestaPorUrl(this, 'destinatario', '/221603/destinatario.json');
  }

  public getFormularioDatos():Observable<FormularioDatos>{
    return this.http.get<FormularioDatos>('assets/json/221603/formularioDatos.json');
  }

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
