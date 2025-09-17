import { AmpliacionServiciosResponse , CatalogoResponso, InfoServicios} from '../models/nuevo-programa-industrial.model';
import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { Observable, map } from 'rxjs';
import { ComplimentosService } from '../../../shared/services/complimentos.service';
import { DatosComplimentos } from '../../../shared/models/complimentos.model';
import { HttpClient } from '@angular/common/http';
import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { PROC_80103 } from '../servers/api-route';
import { PlantasSubfabricante } from '../../../shared/models/empresas-subfabricanta.model';
import { Tramite80101Query } from '../estados/tramite80101.query';
import { Tramite80101State } from '../estados/tramite80101.store';

@Injectable({
  providedIn: 'root',
})

export class NuevoProgramaIndustrialService {

 constructor(
    private readonly http: HttpClient,
    private tramite80101Query: Tramite80101Query,
    public httpService: HttpCoreService,
    private complimentosService: ComplimentosService
  ) {
   // No se necesita lógica de inicialización adicional.
   this.setProcedure();
   this.setProcedureNo();
  }

  /**
   * Establece el procedimiento actual para la gestión de trámites industriales.
   * Asigna el identificador de procedimiento 'st_t80101' y lo configura en el servicio de cumplimientos.
   *
   * @returns {void} No retorna ningún valor.
   */
  setProcedure():void{
    const PROCEDURE='sat-t80103'
    this.complimentosService.setProcedure(PROCEDURE);
  }

  setProcedureNo(): void {
    this.complimentosService.setProcedureNo('80103');
  }

  /**
   * Obtiene los datos de ampliación de servicios desde un archivo JSON.
   * @returns {Observable<any>} - Observable con los datos obtenidos.
   */
 getDatos(): Observable<InfoServicios> {
  return this.http
    .get<AmpliacionServiciosResponse>("assets/json/80205/ampliacion-servicios.json")
    .pipe(map(res => res.data.infoServicios));
}
   
  /**
   * Obtiene la lista de selección de ingreso desde un archivo JSON.
   * @returns {Observable<any>} - Observable con los datos obtenidos.
   */
 obtenerIngresoSelectList(): Observable<Catalogo[]> {
  return this.http
    .get<CatalogoResponso>("assets/json/80205/ampliacion-IMMEX-dropdown.json")
    .pipe(map(res => res.data));
}

   /**
   * Obtiene la lista de estados.
   * @method obtenerListaEstado
   * @returns {Observable<RespuestaCatalogos>} Observable con la lista de estados.
   */
   obtenerListaEstado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/80207/estado-datos.json'
    );
  }

  /**
   * Obtiene la lista de subfabricantes disponibles.
   * @method getSubfabricantesDisponibles
   * @returns {Observable<TableData>} Observable con la lista de subfabricantes disponibles.
   */
  getSubfabricantesDisponibles(): Observable<PlantasSubfabricante[]> {
    return (
      this.http
        .get<PlantasSubfabricante[]>(
          'assets/json/80207/submanufactureras-disponibles-datos.json'
        )
      
        .pipe(map((response: PlantasSubfabricante[]) => response))
    );
  }


  /**
   * Obtiene los datos de complementos desde un archivo JSON local.
   * 
   * @returns Un observable que emite los datos de tipo `DatosComplimentos`.
   */
  obtenerComplimentos(): Observable<DatosComplimentos> {
  return this.http.get<DatosComplimentos>("assets/json/80102/datos-complimentos.json");
}

  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<Tramite80101State>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<Tramite80101State> {
    return this.tramite80101Query.allStoreData$;
  }

  /**
   * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
   * 
   * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
   * @returns Observable con la respuesta de la solicitud POST.
   */
  guardarDatosPost(body: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.httpService.post<Record<string, unknown>>(PROC_80103.GUARDAR, { body: body });
  }

}
