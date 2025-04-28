import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoricoColumnas, MercanciaTabla } from '../../models/peru-certificado.module';
import { Subject ,map,takeUntil} from 'rxjs';
import { CertificadoDeService } from '../../services/certificado-de.service';
import { FormBuilder } from '@angular/forms';
import { Tramite110222Query } from '../../estados/tramite110222.query';
import { Tramite110222Store } from '../../estados/tramite110222.store';

@Component({
  selector: 'app-historico-de-productores',
  templateUrl: './historico-de-productores.component.html',
  styleUrl: './historico-de-productores.component.scss',
})

export class HistoricoDeProductoresComponent implements OnInit, OnDestroy {

    /**
     * Lista de productores disponibles para el exportador.
     */
    productoresExportador: HistoricoColumnas[] = [];
    mercancia: MercanciaTabla[] = [];
  
    /**
     * Notificador para destruir las suscripciones y evitar fugas de memoria.
     */
    destroyNotifier$: Subject<void> = new Subject();
  
    /**
     * Estado actual del trámite.
     */
    public tramiteState!:{ [key: string]: string | number | boolean | object | undefined };
    public agregarDatosProductor!: { [key: string]: string | number | boolean | object | undefined };

    /**
     * Constructor del componente.
     * 
     * @param {FormBuilder} fb - Constructor para crear formularios reactivos.
     * @param {certificadoDeService} certificadoDeService - Servicio para obtener datos relacionados con los productores.
     * @param {Tramite110222Store} store - Store para gestionar el estado del trámite.
     * @param {Tramite110222Query} tramiteQuery - Query para obtener el estado del trámite.
    */
    constructor(
      public fb: FormBuilder,
      private certificadoDeService: CertificadoDeService,
      public store: Tramite110222Store,
      public tramiteQuery: Tramite110222Query,
    ) { }
  
    /**
     * Método que se ejecuta al inicializar el componente.
     * 
     * Carga los datos iniciales, configura los formularios y suscribe al estado del trámite.
     */
    ngOnInit(): void {
      this.cargarProductorPorExportador();
      this.cargarMercancia();
      this.tramiteQuery.formulario$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.tramiteState = seccionState;            
          })
        )
        .subscribe();
        this.tramiteQuery.agregarDatosProductorFormulario$.pipe(
          takeUntil(this.destroyNotifier$),map((seccionState) => {
            this.agregarDatosProductor = seccionState;
          })
        ).subscribe();
    }

    /**
     * Carga la lista de productores disponibles para el exportador desde el servicio.
     */
    cargarProductorPorExportador(): void {
      this.certificadoDeService.obtenerProductorPorExportador()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe(respuesta => {
          this.productoresExportador = respuesta.datos;
        });
    }

    
    /**
     * Carga la lista de productores disponibles para el exportador desde el servicio.
     */
    cargarMercancia(): void {
      this.certificadoDeService.obtenerMercancia()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe(respuesta => {
          this.mercancia = respuesta.datos;
        });
    }
  
    /**
     * Establece valores en el estado del store para un formulario histórico.
     * 
     * @param event - Objeto que contiene los datos necesarios para actualizar el store.
     * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en este método).
     * @param event.campo - Nombre del campo que se actualizará en el store.
     * @param event.valor - Valor que se asignará al campo en el store.
     * @param event.storeStateName - Nombre del estado del store (no utilizado en este método).
     * 
     * @returns void
     */
    setValoresStore(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }) :void{
      const { campo: CAMPO, valor: VALOR } = event;
      this.store.setFormHistorico({ [CAMPO]: VALOR });
    }

    /**
     * Establece valores en el store para agregar datos del formulario del productor.
     * 
     * @param event - Objeto que contiene los datos necesarios para actualizar el store.
     * @param event.formGroupName - Nombre del grupo de formulario (no utilizado en este método).
     * @param event.campo - Nombre del campo que se actualizará en el store.
     * @param event.valor - Valor que se asignará al campo en el store.
     * @param event.storeStateName - Nombre del estado del store (no utilizado en este método).
     * 
     * @returns void
     * 
     * @command Actualiza el estado del store con los valores proporcionados.
     */
    setValoresStoreAgregarForm(event: { formGroupName: string, campo: string, valor: undefined, storeStateName: string }) :void{
      const { campo: CAMPO, valor: VALOR } = event; 
      this.store.setAgregarFormDatosProductor({ [CAMPO]: VALOR });
    }
  
    /**
     * Método que se ejecuta al destruir el componente.
     * 
     * Libera los recursos y cancela las suscripciones activas.
     */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}
