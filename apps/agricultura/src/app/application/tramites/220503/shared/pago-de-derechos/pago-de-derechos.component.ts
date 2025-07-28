import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, InputRadioComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PagoDeDerecho } from '../../../../shared/models/tercerosrelacionados.model';
import { PagoDeDerechoComponent } from '../../../../shared/components/pago-de-derecho/pago-de-derecho.component';
import { PagoDeDerechos } from '../../models/pago-de-derechos.model';
import { Solocitud220503Service } from '../../services/service220503.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';


/**
 * Componente para gestionar el pago de derechos.
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  standalone: true,
  imports:[CommonModule, CatalogoSelectComponent, ReactiveFormsModule, InputRadioComponent,TituloComponent ]

})
export class PagoDeDerechosComponent implements OnInit , OnDestroy{
  /**
    * Referencia al componente hijo de pago de derechos.
    * Permite acceder a los métodos y propiedades del componente PagoDeDerechoComponent.
    * 
    * @public
    * @type {PagoDeDerechoComponent}
    * @memberof PagoDeDerechosComponent
    */
   @ViewChild('pagoDerechosRef') pagoDerechos!: PagoDeDerechoComponent;
 
   /**
    * Datos del pago de derechos para el formulario.
    * Contiene toda la información relacionada con el pago incluyendo exención, banco, justificación y fecha.
    * 
    * @public
    * @type {PagoDeDerechos}
    * @memberof PagoDeDerechosComponent
    */
   pagoData: PagoDeDerechos = {} as PagoDeDerechos;
 
   /**
    * Objeto que contiene los catálogos de selección para el pago de derechos.
    * Incluye selectores para bancos y justificaciones disponibles.
    * 
    * @public
    * @type {PagoDeDerecho}
    * @memberof PagoDeDerechosComponent
    */
   pagoSelect: PagoDeDerecho = {
     bancoSelector: [],
     justificacionSelector: [],
   };
 
   /**
    * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
    * Se utiliza con el operador takeUntil para completar suscripciones al destruir el componente.
    * 
    * @private
    * @type {Subject<void>}
    * @memberof PagoDeDerechosComponent
    */
   private DESTROY_NOTIFIER$ = new Subject<void>();
 
   /**
    * Indica si el formulario debe mostrarse en modo solo lectura.
    * Cuando es verdadero, el formulario se presenta únicamente para visualización,
    * deshabilitando la edición de los campos para consulta de datos existentes.
    * 
    * @public
    * @type {boolean}
    * @default false
    * @memberof PagoDeDerechosComponent
    */
   esFormularioSoloLectura: boolean = false;
   /**
    * Constructor del componente PagoDeDerechosComponent.
    * Inicializa las dependencias necesarias para el funcionamiento del formulario de pago de derechos.
    * Configura los servicios para manejo de formularios, catálogos y consultas de estado.
    * 
    * @constructor
    * @param {FormBuilder} fb - Constructor de formularios reactivos de Angular
    * @param {ImportacionDeAcuiculturaService} importacionAcuiculturaServicio - Servicio para operaciones de importación de acuicultura
    * @param {ConsultaioQuery} consultaQuery - Query para consultas del estado de solo lectura
    * @param {ChangeDetectorRef} cdr - Referencia para detección de cambios manual
    * @memberof PagoDeDerechosComponent
    */
   constructor(
     private readonly fb: FormBuilder,
     private readonly importacionAcuiculturaServicio: Solocitud220503Service,
     private consultaQuery: ConsultaioQuery,
     private readonly cdr: ChangeDetectorRef
   ) {
    
     this.obtenerCatalogosTransporte();
     this.obtenerCatalogosjustificacionTransporte();
     this.consultaQuery.selectConsultaioState$
       .pipe(
         takeUntil(this.DESTROY_NOTIFIER$),
         map((seccionState) => {
           this.esFormularioSoloLectura = seccionState.readonly;
           this.esFormularioSoloLectura =true
           this.cdr.detectChanges();
         })
       )
       .subscribe();
   }
   ngOnInit(): void {
      this.importacionAcuiculturaServicio.getAllDatosForma().pipe(takeUntil(this.DESTROY_NOTIFIER$)).subscribe((datos) => {
       this.pagoData = datos.pagoDeDerechos || {} as PagoDeDerechos;
     })
   }
   /**
    * Método para obtener el catálogo de bancos disponibles.
    * Carga los datos del catálogo de bancos desde el servicio de importación de acuicultura.
    * Maneja la subscripción con patrón takeUntil para evitar memory leaks.
    * 
    * @public
    * @method obtenerCatalogosTransporte
    * @memberof PagoDeDerechosComponent
    * @returns {void}
    */
   public obtenerCatalogosTransporte(): void {
     this.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo('banco.json')
       .pipe(takeUntil(this.DESTROY_NOTIFIER$))
       .subscribe((data) => {
         this.pagoSelect.bancoSelector = data.data as Catalogo[];
       }, (error) => {
         console.error(error);
       });
   }
   /**
    * Método para obtener el catálogo de justificaciones disponibles.
    * Carga los datos del catálogo de justificaciones desde el servicio de importación de acuicultura.
    * Utilizado para poblar el selector de justificaciones en el formulario de pago.
    * 
    * @public
    * @method obtenerCatalogosjustificacionTransporte
    * @memberof PagoDeDerechosComponent
    * @returns {void}
    */
   public obtenerCatalogosjustificacionTransporte(): void {
     this.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo('justificacion.json')
       .pipe(takeUntil(this.DESTROY_NOTIFIER$))
       .subscribe((data) => {
         this.pagoSelect.justificacionSelector = data.data as Catalogo[];
       }, (error) => {
         console.error(error);
       });
   }
   /**
    * Método para manejar los cambios en los datos del pago de derechos.
    * Recibe los datos actualizados del formulario y los envía al servicio para su actualización.
    * Se ejecuta cuando hay cambios en el formulario de pago de derechos.
    * 
    * @public
    * @method onPagoChanged
    * @param {PagoDeDerechos} event - Datos actualizados del pago de derechos
    * @memberof PagoDeDerechosComponent
    * @returns {void}
    */
   onPagoChanged(event: PagoDeDerechos): void {
     this.importacionAcuiculturaServicio.actualizarPagoDeDerechos(event as PagoDeDerechos);
   }
 
   /**
    * Método para validar el formulario de pago de derechos.
    * Delega la validación al componente hijo PagoDeDerechoComponent.
    * Retorna el estado de validación del formulario completo.
    * 
    * @public
    * @method validarFormulario
    * @memberof PagoDeDerechosComponent
    * @returns {boolean} - True si el formulario es válido, false en caso contrario
    */
   validarFormulario(): boolean {
     return this.pagoDerechos.validarFormulario();
   }
   /**
    * Método del ciclo de vida OnDestroy de Angular.
    * Limpia las suscripciones para evitar fugas de memoria al destruir el componente.
    * Completa el subject DESTROY_NOTIFIER$ para cancelar todas las suscripciones activas.
    * 
    * @public
    * @method ngOnDestroy
    * @memberof PagoDeDerechosComponent
    * @returns {void}
    */
   ngOnDestroy(): void {
     this.DESTROY_NOTIFIER$.next();
     this.DESTROY_NOTIFIER$.complete();
   }
}
