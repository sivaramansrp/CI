import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { EmpresasListaResquesta, ModificacionResquesta } from '../../models/prosec.model';
import { MercanciasResquesta, PlantasTabla, ProductorIndirectoResquesta, SectorTabla } from '../../../../shared/models/complementaria.model';
import { BitacoraResquesta } from '../../../../shared/models/bitacora.model';

/**
 * Servicio para obtener los datos de la aplicación PROSEC.
 * @class ProsecService
 */
@Injectable({
  providedIn: 'root'
})
export class ProsecService {

  private isBajaSubject = new BehaviorSubject<boolean>(true);

  isBaja$ = this.isBajaSubject.asObservable();

  /**
   * Constructor del servicio.
   * @param http - Servicio HTTP para realizar peticiones.
   */
  constructor(
    private http: HttpClient
  ) { }

  /**
   * Establece el valor de si es baja o no.
   * @param value - Valor booleano que indica si es baja o no.
   */
  setIsBaja(value: boolean) {
    this.isBajaSubject.next(value);
  }

  /**
   * Obtiene los datos del documentos seleccionados.
   * @returns Observable con los datos del documentos seleccionados.
   */
  obtenerDocumentosSeleccionados(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/90304/documentos-seleccionados.json');
  }

  /**
   * Obtiene los datos de las plantas.
   * @returns Observable con los datos de las plantas.
   */
  obtenerPlantasDatos(): Observable<PlantasTabla[]> {
    return this.http.get<PlantasTabla[]>('assets/json/90304/plantas.json');
  }

  /**
   * Obtiene los datos de los sectores.
   * @returns Observable con los datos de los sectores.
   */
  obtenerSectorDatos(): Observable<SectorTabla[]> {
    return this.http.get<SectorTabla[]>('assets/json/90304/sector.json');
  }

  /**
   * Obtiene los datos de las mercancías a producir.
   * @returns Observable con los datos de las mercancías a producir.
   */
  obtenerMercanciasProducir(): Observable<MercanciasResquesta> {
    return this.http.get<MercanciasResquesta>('assets/json/90304/mercancias-producir.json');
  }

  /**
   * Obtiene los datos de los productores indirectos.
   * @returns Observable con los datos de los productores indirectos.
   */
  obtenerProductoIndirectoDatos(): Observable<ProductorIndirectoResquesta> {
    return this.http.get<ProductorIndirectoResquesta>('assets/json/90304/productor-indirecto.json');
  }

  /**
   * Obtiene los datos de la bitácora.
   * @returns Observable con los datos de la bitácora.
   */
  obtenerBitacoraDatos(): Observable<BitacoraResquesta> {
    return this.http.get<BitacoraResquesta>('assets/json/90304/bitacora.json');
  }

  /**
   * Obtiene los datos de modificación.
   * @returns Observable con los datos de modificación.
   */
  obtenerModificacionDatos(): Observable<ModificacionResquesta> {
    return this.http.get<ModificacionResquesta>('assets/json/90304/modificacion.json');
  }

  /**
   * Obtiene la lista de empresas.
   * @returns Observable con los datos de la lista de empresas.
   */
  obtenerEmpresasListaDatos(): Observable<EmpresasListaResquesta> {
    return this.http.get<EmpresasListaResquesta>('assets/json/90304/empresas-lista.json');
  }
}