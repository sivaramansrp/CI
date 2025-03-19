import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { ListaDeFechas } from '../models/registro-muestras-mercancias.model';
import { MuestrasMercanciasStore } from '../models/registro-muestras-mercancias.model';
import { RegistroMuestras } from '../models/registro-muestras-mercancias.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { TableData } from '@libs/shared/data-access-user/src';

/**
 * Función que crea el estado inicial de la tienda de muestras de mercancías.
 * Inicializa todas las propiedades del estado con valores vacíos.
 */
export function crearEstadoInicial(): MuestrasMercanciasStore {
  return {
    validezDeLaAutorizacion: {} as ListaDeFechas,
    renovacionesDeRegistro: {} as RegistroMuestras,
    pagoDeDerechos: {} as TableData,
    importadorExportadorPrevio: {} as CatalogosSelect,
    fraccionArancelariaAga: {} as CatalogosSelect,
    nico: {} as CatalogosSelect,
    ideGenerica: {} as CatalogosSelect,
    tomaMuestraDespacho: {} as CatalogosSelect
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'RenovacionesMuestrasMercanciasStore', resettable: true })
/**
 * Clase que administra el estado de las renovaciones de muestras de mercancías.
 * Utiliza Akita Store para la gestión de estados de la aplicación.
 */
export class RenovacionesMuestrasMercanciasStore extends Store<MuestrasMercanciasStore> {
  /**
   * Constructor de la tienda que inicializa el estado con valores predeterminados.
   */
  constructor() {
    super(crearEstadoInicial());
  }

  /**
   * Actualiza la validez de la autorización con una nueva lista de fechas.
   * @param listaDeFechas - Nueva lista de fechas de validez de la autorización.
   */
  actualizarFechas(listaDeFechas: ListaDeFechas): void {
    this.update((state) => ({
      ...state,
      validezDeLaAutorizacion: listaDeFechas,
    }));
  }

  /**
   * Agrega un nuevo pago de tarifas al estado.
   * @param lineaCaptura - Línea de captura del pago.
   * @param valorPago - Valor del pago.
   */
  agregarPagoDeTarifas(lineaCaptura: string, valorPago: string): void {
    this.update((state) => ({
      ...state,
      pagoDeDerechos: {
        ...state.pagoDeDerechos,
        tableBody: [
          ...state.pagoDeDerechos.tableBody, 
          { tbodyData: [lineaCaptura, valorPago] }
        ]
      }
    }));
  }
  
  /**
   * Actualiza los datos de pago de derechos en el estado.
   * @param pagoDeDerechos - Nuevos datos de pago de derechos.
   */
  actualizarPagoDeTarifas(pagoDeDerechos: TableData): void {
    this.update((state) => ({
      ...state,
      pagoDeDerechos: pagoDeDerechos,
    }));
  }

  /**
   * Actualiza los datos de registro de muestras en el estado.
   * @param nuevoRegistro - Nuevo registro de muestras.
   */
  actualizarRegistro(nuevoRegistro: RegistroMuestras): void {
    this.update((state) => ({
      ...state,
      renovacionesDeRegistro: nuevoRegistro,
    }));
  }

  /**
   * Actualiza los datos del importador/exportador previo.
   * @param datos - Nuevos datos del catálogo de importadores/exportadores previos.
   */
  actualizarImportadorExportador(datos: CatalogosSelect): void {
    this.update((state) => ({
      ...state,
      importadorExportadorPrevio: datos,
    }));
  }

  /**
   * Actualiza los datos de la fracción arancelaria de la AGA.
   * @param datos - Nuevos datos del catálogo de fracciones arancelarias de la AGA.
   */
  actualizacionFraccionTarifaAga(datos: CatalogosSelect): void {
    this.update((state) => ({
      ...state,
      fraccionArancelariaAga: datos,
    }));
  }

  /**
   * Actualiza los datos del NICO (Número de Identificación Comercial).
   * @param datos - Nuevos datos del catálogo de NICO.
   */
  actualizarDatosUnicos(datos: CatalogosSelect): void {
    this.update((state) => ({
      ...state,
      nico: datos,
    }));
  }

  /**
   * Actualiza los datos de la IDE genérica.
   * @param datos - Nuevos datos del catálogo de IDE genérica.
   */
  actualizacionDeIdeGenerica(datos: CatalogosSelect): void {
    this.update((state) => ({
      ...state,
      ideGenerica: datos,
    }));
  }

  /**
   * Actualiza los datos relacionados con la toma de muestras durante el despacho.
   * @param datos - Nuevos datos del catálogo de toma de muestras en despacho.
   */
  actualizarTakeSampleOffice(datos: CatalogosSelect): void {
    this.update((state) => ({
      ...state,
      tomaMuestraDespacho: datos,
    }));
  }

  /**
   * Restablece el estado de la tienda a su estado inicial.
   */
  resetStore(): void {
    this.reset();
  }
}
