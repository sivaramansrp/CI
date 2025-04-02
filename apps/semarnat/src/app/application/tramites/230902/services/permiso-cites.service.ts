  import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
import { ConfiguracionItem } from '../enum/mercancia.enum';
  
  @Injectable({
    providedIn: 'root'
  })
  
  export class PermisoCitesService {
  
    tiposDeMovimiento: Catalogo[] = [];
    tiposDeRegimen: Catalogo[] = [];
    fraccionArancelaria: Catalogo[] = [];
    clasificacionTaxonomica: Catalogo[] = [];
    nombreCientifico: Catalogo[] = [];
    nombreComun: Catalogo[] = [];
    unidadMedida: Catalogo[] = [];
    paisOrigen: Catalogo[] = [];
    paisProcedencia: Catalogo[] = [];
    entidadFederativa: Catalogo[] = [];
    banco: Catalogo[] = [];
  
  
    /**
     * Constructor del servicio.
     * 
     * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
     */
    constructor(private http: HttpClient) {
      // No se necesita lógica de inicialización adicional.
    }
    private jsonUrl = 'assets/json/230902/tablaDatos.json';
    public inicializaDatosSolicitudDatosCatalogos(): void {
      this.obtenerRespuestaPorUrl(this, 'tiposDeMovimiento', '/230902/tiposDeMovimiento.json');
      this.obtenerRespuestaPorUrl(this, 'tiposDeRegimen', '/230902/tiposDeRegimen.json');
     
    }
  
    // public inicializeMercanciaModalDatosCatalogos(): void {
   
    // }
   
    public inicializaTercerosDatosCatalogos():void {
      this.obtenerRespuestaPorUrl(this, 'entidadFederativa', '/230902/entidadFederativa.json');
    }
   
    public inicializaPagoDeDerechosDatosCatalogos():void {
      this.obtenerRespuestaPorUrl(this, 'banco', '/230902/banco.json');
    }
  
    // this.obtenerRespuestaPorUrl(this, 'banco', '/230902/banco.json');
    public inicializaMercanciaDatosCatalogos():void {
      this.obtenerRespuestaPorUrl(this, 'fraccionArancelaria', '/230902/fraccionArancelaria.json');
      this.obtenerRespuestaPorUrl(this, 'clasificacionTaxonomica', '/230902/clasificacionTaxonomica.json');
      this.obtenerRespuestaPorUrl(this, 'nombreCientifico', '/230902/nombreCientifico.json');
      this.obtenerRespuestaPorUrl(this, 'nombreComun', '/230902/nombreComun.json');
      this.obtenerRespuestaPorUrl(this, 'unidadMedida', '/230902/unidadMedida.json');
      this.obtenerRespuestaPorUrl(this, 'paisOrigen', '/230902/paisOrigen.json');
      this.obtenerRespuestaPorUrl(this, 'paisProcedencia', '/230902/paisProcedencia.json');
    }
  
    getDatosSolicitud(): Observable<any> {
      return this.http.get('230902/mercancia.json');
    }
    /**
       * Obtiene una respuesta desde una URL y asigna los datos a una variable.
       *
       * @param {string} variable - El nombre de la variable donde se almacenarán los datos de la respuesta.
       * @param {string} url - La URL desde la cual se obtendrá la respuesta.
       * @param {Object} self - El objeto que contiene la variable donde se almacenarán los datos de la respuesta.
       * @returns {void}
       * @author Muneez
       * @remarks
       * Si la variable y la URL son válidas, se realiza una solicitud HTTP GET a la URL especificada.
       * Si la respuesta tiene un código 200 y contiene datos, estos se asignan a la variable especificada.
       * Si la variable o la URL no son válidas, se asigna un arreglo vacío a la variable.
       */
    obtenerRespuestaPorUrl(self: any, variable: string, url: string): void {
      if (self && variable && url) {
        this.http.get<RespuestaCatalogos>(`assets/json${url}`).subscribe((resp): void => {
          self[variable] = resp?.code === 200 && resp.data ? resp.data : [];
        });
      }
    }
    
    loadTablaDatos(): Observable<ConfiguracionItem[]> {
      return this.http.get<ConfiguracionItem[]>(this.jsonUrl);
    }
  
  }