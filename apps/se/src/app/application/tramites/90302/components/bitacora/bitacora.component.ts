import { OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { CONFIGURACION_BITCORA, CONFIGURACION_MERCANCIAS_A_PRODUCIR, CONFIGURACION_PLANTAS, CONFIGURACION_PRODUCTOR_INDIRECTO,CONFIGURACION_SECTOR } from "../../constantes/modificacion.constants";
import { Component,Input } from '@angular/core';
import { ConfiguracionColumna } from '../../models/configuracion-columna.model';
import { Bitacora,MercanciasAProducir, Plantas,ProductorIndirecto,Sector} from "../../models/datos-info.model";
import { Subject } from 'rxjs';


@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.scss',
})
export class BitacoraComponent implements OnInit, OnDestroy {
 
  
@Input() esDeSolicitante: boolean = false; 
  

  configuracionTablaBitacora: ConfiguracionColumna<Bitacora>[] = CONFIGURACION_BITCORA;

  configuracionTablaMercancias: ConfiguracionColumna<MercanciasAProducir>[] = CONFIGURACION_MERCANCIAS_A_PRODUCIR;

  configuracionTablaPlantas: ConfiguracionColumna<Plantas>[] = CONFIGURACION_PLANTAS;
  configuracionTablaProductor: ConfiguracionColumna<ProductorIndirecto>[] = CONFIGURACION_PRODUCTOR_INDIRECTO;
  configuracionTablaSector: ConfiguracionColumna<Sector>[] = CONFIGURACION_SECTOR;

  

  datosBitacora: Bitacora[] = [];
  datosMercancias: MercanciasAProducir[] = [];
  datosPlantas: Plantas[] = [];
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
  getBitacoraProsec(): void {
    this.ampliacionServiciosService.getBitacoraProsec()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.datosBitacora = RESPONSE;
      }
    });
  }
  getMercanciasProsec(): void {
    this.ampliacionServiciosService.getMercanciasProsec()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.datosMercancias = RESPONSE;
      }
    });
  }
  getPlantasProsec(): void {
    this.ampliacionServiciosService.getPlantasProsec()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.datosPlantas = RESPONSE;
      }
    });
  }
  getProductorProsec(): void {
    this.ampliacionServiciosService.getProductorIndirectoProsec()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        this.datosProductor = RESPONSE;
      }
    });
  }
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