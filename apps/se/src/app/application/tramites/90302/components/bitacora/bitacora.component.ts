import { Bitacora,MercanciasAProducir, Plantas,ProductorIndirecto,Sector} from "../../models/datos-info.model";
import { CONFIGURACION_BITCORA, CONFIGURACION_MERCANCIAS_A_PRODUCIR, CONFIGURACION_PLANTAS, CONFIGURACION_PRODUCTOR_INDIRECTO,CONFIGURACION_SECTOR } from "../../constantes/modificacion.constants";
import { Component,Input } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { ConfiguracionColumna } from '../../models/configuracion-columna.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.scss',
})
export class BitacoraComponent implements OnInit, OnDestroy {
  
/**
 * @property {boolean} esDeSolicitante
 * @description Indica si el componente pertenece al solicitante. 
 * Este valor se recibe como entrada desde el componente padre.
 * @memberof BitacoraComponent
 */
@Input() esDeSolicitante: boolean = false;
  

  /**
   * @variable configuracionTablaBitacora
   * @type {ConfiguracionColumna<Bitacora>[]}
   * @description Configuración de la tabla para la bitácora. Define las columnas y su configuración
   * utilizando la constante `CONFIGURACION_BITCORA`.
   *
   * @see CONFIGURACION_BITCORA
   */
  configuracionTablaBitacora: ConfiguracionColumna<Bitacora>[] =
    CONFIGURACION_BITCORA;

  /**
   * Configuración de la tabla para mercancías a producir.
   * @variable configuracionTablaMercancias
   * @type {ConfiguracionColumna<MercanciasAProducir>[]}
   * @description Define la configuración de las columnas de la tabla para las mercancías a producir,
   * utilizando la constante `CONFIGURACION_MERCANCIAS_A_PRODUCIR`.
   *
   * @see CONFIGURACION_MERCANCIAS_A_PRODUCIR
   */
  configuracionTablaMercancias: ConfiguracionColumna<MercanciasAProducir>[] =
    CONFIGURACION_MERCANCIAS_A_PRODUCIR;

  /**
   * @description Configuración de la tabla para mostrar las plantas.
   * Esta propiedad utiliza una configuración predefinida que se encuentra en `CONFIGURACION_PLANTAS`.
   * 
   * @type {ConfiguracionColumna<Plantas>[]} 
   * @see CONFIGURACION_PLANTAS
   */
  configuracionTablaPlantas: ConfiguracionColumna<Plantas>[] = CONFIGURACION_PLANTAS;

  /**
   * @description Configuración de la tabla para mostrar los productores indirectos.
   * Esta propiedad utiliza una configuración predefinida que se encuentra en `CONFIGURACION_PRODUCTOR_INDIRECTO`.
   * 
   * @type {ConfiguracionColumna<ProductorIndirecto>[]} 
   * @see CONFIGURACION_PRODUCTOR_INDIRECTO
   */
  configuracionTablaProductor: ConfiguracionColumna<ProductorIndirecto>[] = CONFIGURACION_PRODUCTOR_INDIRECTO;
  
  /**
   * @var configuracionTablaSector
   * @type {ConfiguracionColumna<Sector>[]}
   * @description Configuración de la tabla para el sector. Utiliza la constante `CONFIGURACION_SECTOR` 
   * para definir las columnas y su configuración.
   * 
   * @see CONFIGURACION_SECTOR
   */
  configuracionTablaSector: ConfiguracionColumna<Sector>[] = CONFIGURACION_SECTOR;


  /**
   * @property {Bitacora[]} datosBitacora
   * @description Arreglo que almacena los datos de la bitácora.
   * @memberof BitacoraComponent
   */
  datosBitacora: Bitacora[] = [];

  /**
   * @property {MercanciasAProducir[]} datosMercancias
   * @description Arreglo que almacena los datos de las mercancías a producir.
   * @memberof BitacoraComponent
   */
  datosMercancias: MercanciasAProducir[] = [];

  /**
   * @property {Plantas[]} datosPlantas
   * @description Arreglo que almacena los datos de las plantas.
   * @memberof BitacoraComponent
   */
  datosPlantas: Plantas[] = [];

  /**
   * @property {ProductorIndirecto[]} datosProductor
   *
   * Arreglo que almacena información sobre los productores indirectos.
   * Este arreglo se utiliza para gestionar y mostrar los datos relacionados
   * con los productores indirectos en el componente de bitácora.
   */
  datosProductor: ProductorIndirecto[] = [];
  datosSector: Sector[] = [];


  /**
   * Notificador para gestionar la destrucción o desuscripción de observables.
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios.
   * @param {AmpliacionServiciosService} ampliacionServiciosService - Servicio para obtener datos de ampliación de servicios.
   * @param {HttpClient} httpServicios - Servicio HTTP para realizar peticiones.
   */
  constructor(
    private ampliacionServiciosService: AmpliacionServiciosService,
  ) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Método de inicialización del componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.getBitacoraProsec();
    this.getMercanciasProsec();
    this.getPlantasProsec();
    this.getProductorProsec();
    this.getSectoresProsec();
  }

  /**
   * @method getBitacoraProsec
   * @description Obtiene la bitácora de PROSEC desde el servicio `ampliacionServiciosService`
   * y actualiza la propiedad `datosBitacora` con los datos recibidos si la respuesta es exitosa.
   * @returns {void}
   * @example
   * // Llamar al método para obtener la bitácora de PROSEC
   * this.getBitacoraProsec();
   * @remarks
   * Este método utiliza `takeUntil` para manejar la suscripción y asegurarse de que se limpie
   * cuando el componente sea destruido. La respuesta se valida verificando que el código sea 200.
   */
  getBitacoraProsec(): void {
    this.ampliacionServiciosService
      .getBitacoraProsec()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.datosBitacora = RESPONSE;
        }
      });
  }

  /**
   * @method getMercanciasProsec
   * @description Obtiene la lista de mercancías PROSEC desde el servicio de ampliación de servicios.
   * Suscribe a los datos recibidos y los asigna a la propiedad `datosMercancias` si la respuesta es exitosa.
   *
   * @returns {void} Este método no retorna ningún valor.
   *
   * @example
   * // Uso del método
   * this.getMercanciasProsec();
   *
   * @memberof BitacoraComponent
   */
  getMercanciasProsec(): void {
    this.ampliacionServiciosService
      .getMercanciasProsec()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.datosMercancias = RESPONSE;
        }
      });
  }

  /**
   * @description Obtiene la lista de plantas Prosec desde el servicio `ampliacionServiciosService`.
   * La respuesta se suscribe y, si el código de respuesta es 200, los datos se asignan a `datosPlantas`.
   *
   * @method getPlantasProsec
   * @returns {void} Este método no devuelve ningún valor.
   *
   * @example
   * // Ejemplo de uso:
   * this.getPlantasProsec();
   *
   * @memberof BitacoraComponent
   */
  getPlantasProsec(): void {
    this.ampliacionServiciosService
      .getPlantasProsec()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.datosPlantas = RESPONSE;
        }
      });
  }

  /**
   * @method getProductorProsec
   * @description Obtiene los datos del productor indirecto PROSEC desde el servicio de ampliación de servicios.
   * Suscribe a la respuesta del servicio y asigna los datos obtenidos a la propiedad `datosProductor` si el código de respuesta es 200.
   * @returns {void}
   * @memberof BitacoraComponent
   */
  getProductorProsec(): void {
    this.ampliacionServiciosService
      .getProductorIndirectoProsec()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.datosProductor = RESPONSE;
        }
      });
  }

  /**
   * @method getSectoresProsec
   * @description Obtiene los sectores PROSEC desde el servicio `ampliacionServiciosService` y los asigna a la propiedad `datosSector1`.
   * @returns {void}
   * @example
   * // Ejemplo de uso:
   * this.getSectoresProsec();
   *
   * @remarks
   * Este método utiliza un observable para suscribirse a los datos proporcionados por el servicio.
   * La suscripción se gestiona con `takeUntil` para evitar fugas de memoria al destruir el componente.
   *
   * @property {any[]} datosSector1 - Propiedad donde se almacenan los datos obtenidos del servicio.
   *
   * @throws {Error} Si el código de respuesta no es 200, no se realiza ninguna acción.
   */
  getSectoresProsec(): void {
    this.ampliacionServiciosService.getSectoresProsec()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.datosSector = RESPONSE;
      }
    });
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
