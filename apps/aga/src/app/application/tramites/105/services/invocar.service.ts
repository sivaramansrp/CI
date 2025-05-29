import { Solicitud105State, Tramite105Store} from '../../105/estados/tramite105.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
/**
 * Servicio para obtener datos relacionados con importadores y exportadores.
 */
@Injectable({
  providedIn: 'root',
})
export class InvoCarService {
  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param http Servicio HTTP para realizar solicitudes.
   * @param store Store de Akita para gestionar el estado.
   */
  constructor(private http: HttpClient, private store: Tramite105Store) {
    // El constructor se utiliza para la inyección de dependencias.
  }


  /**
   * Obtiene el catálogo de países.
   * @returns Observable con la respuesta del catálogo de países.
   */
  getPais():Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/pais.json').pipe(
    );
  }
  /**
   * Obtiene el catálogo de entidades federativas.
   * @returns Observable con la respuesta del catálogo de entidades federativas.
   */
  getEntidadFederativa(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/entidadfederativa.json').pipe(
    );
  }

  /**
   * Obtiene el catálogo de colonias.
   * @returns Observable con la respuesta del catálogo de colonias.
   */
  getColonia(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/colonia.json').pipe(
    );
  }

  /**
   * Obtiene las fechas seleccionadas.
   * @returns Observable con la respuesta de las fechas seleccionadas.
   */
  getFechasSeleccionadas(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/fechasSeleccionadas.json').pipe(
    );
  }

  /**
   * Obtiene las opciones de fracción arancelaria.
   * @returns Observable con la respuesta de las opciones de fracción arancelaria.
   */
  getFraccionArancelariaOptions(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/fracciónarancelaria-options.json').pipe(
    );
  }

  /**
   * Obtiene el catálogo de municipios o delegaciones.
   * @returns Observable con la respuesta del catálogo de municipios o delegaciones.
   */
  getMunicipioDelegacion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/municipiodelegacion.json').pipe(
    );
  }

  /**
   * Obtiene el catálogo de aduanas.
   * @returns Observable con la respuesta del catálogo de aduanas.
   */
  getAduana(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/105/aduana.json').pipe(
    );
  }

  actualizarEstadoFormulario(datos:Solicitud105State): void {
    console.log('Actualizando estado del formulario con los siguientes datos:', datos);
  this.store.setImportacion(datos.importacion);
  this.store.setExportacion(datos.exportacion);
  this.store.setDepositoFiscalGas(datos.depositoFiscalGas);
  this.store.setDepositoFiscalVehiculos(datos.depositoFiscalVehiculos);
  this.store.setDistribucionGas(datos.distribucionGas);
  this.store.setServiciosTerceros(datos.serviciosTerceros);
  this.store.setIndustriaAutomotriz(datos.industriaAutomotriz);
  this.store.setDomicilio(datos.domicilio);
  this.store.setUbicacion(datos.ubicacion);
  this.store.setPais(datos.pais ?? '');
  this.store.setCodigoPostal(datos.codigoPostal);
  this.store.setEntidadFederativa(datos.entidadFederativa ?? '');
  this.store.setMunicipioDelegacion(datos.municipioDelegacion ?? '');
  this.store.setlocalidad(datos.localidad);
  this.store.setColonia(datos.colonia ?? '');
  this.store.setEntidadFederativaDos(datos.entidadFederativaDos);
  this.store.setCalle(datos.calle);
  this.store.setNumeroExterior(datos.numeroExterior);
  this.store.setNumeroInterior(datos.numeroInterior);
  this.store.setUbicacionDescripcion(datos.ubicacionDescripcion);
  this.store.setAduana(datos.aduana ?? '');
  this.store.setFraccionarancelaria(datos.fraccionarancelaria ?? '');
  this.store.setProcedimientoCargaDescarga(datos.procedimientoCargaDescarga);
  this.store.setSistemasMedicionUbicacion(datos.sistemasMedicionUbicacion);
  this.store.setMotivoNoDespachoAduana(datos.motivoNoDespachoAduana);
  this.store.setOperaciones(datos.operaciones ?? '');
}

getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud105State> {
    return this.http.get<Solicitud105State>('assets/json/105/registro_toma_muestras_mercancias.json');
  }

}
