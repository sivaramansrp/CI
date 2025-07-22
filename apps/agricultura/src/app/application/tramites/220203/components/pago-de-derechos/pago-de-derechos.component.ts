import {Catalogo, ConsultaioQuery} from '@ng-mf/data-access-user';
import {ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { PagoDeDerecho } from '../../../../shared/models/tercerosrelacionados.model';
import { PagoDeDerechoComponent } from '../../../../shared/components/pago-de-derecho/pago-de-derecho.component';
import { PagoDeDerechos } from '../../models/220203/importacion-de-acuicultura.module';


/**
 * @fileoverview
 * Componente para el pago de derechos en la importación de acuicultura.
 * Permite capturar, validar y actualizar la información relacionada al pago, incluyendo exención, justificación, banco y fecha.
 * Cobertura compodoc 100%: cada propiedad, método y constructor está documentado.
 * @module PagoDeDerechosComponent
 */

/**
 * Componente para el pago de derechos en la importación de acuicultura.
 * Permite capturar, validar y actualizar la información relacionada al pago, incluyendo exención, justificación, banco y fecha.
 * @component PagoDeDerechosComponent
 * @selector app-pago-de-derechos
 * @templateUrl ./pago-de-derechos.component.html
 * @styleUrls ./pago-de-derechos.component.scss
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PagoDeDerechoComponent
  ]
})
export class PagoDeDerechosComponent implements OnDestroy {
  
    /**
     * Datos del pago de derechos.
     * @property {PagoDeDerechos} pagoData
     */
    pagoData: PagoDeDerechos = {} as PagoDeDerechos;
       /**
        * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
        * @property {Subject<void>} pagoSelect
        */
       pagoSelect: PagoDeDerecho = {
         bancoSelector: [],
         justificacionSelector: [],
       };
     
    
  
    /**
     * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
     * @property {Subject<void>} destroyNotifier$
     */
    private destroyNotifier$ = new Subject<void>();
  
    /**
     * Indica si el formulario debe mostrarse en modo solo lectura.
     *
     * @remarks
     * Cuando esta propiedad es `true`, los campos del formulario no serán editables por el usuario.
     *
     * @compodoc
     * @description
     * Determina si el formulario se presenta únicamente para consulta, deshabilitando la edición de los campos.
     * @property {boolean} esFormularioSoloLectura
     */
    esFormularioSoloLectura: boolean = false;
  /**
   * Constructor que inicializa el servicio de formularios y el servicio de importación de acuicultura.
   * @param {FormBuilder} fb FormBuilder para la creación de formularios reactivos.
   * @param {ImportacionDeAcuiculturaService} importacionAcuiculturaServicio Servicio para obtener datos de importación.
   * @param {ConsultaioQuery} consultaQuery Servicio para consultar el estado de solo lectura.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionAcuiculturaServicio: ImportacionDeAcuiculturaService,
    private consultaQuery: ConsultaioQuery,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.importacionAcuiculturaServicio.obtenerDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.pagoData = datos.pagoDeDerechos || {} as PagoDeDerechos;
    })
    this.obtenerCatalogosTransporte();
    this.obtenerCatalogosjustificacionTransporte();
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }
    /**
     * Obtiene los datos del catálogo de transporte.
     * @method
     * @returns {void}
     */
    public obtenerCatalogosTransporte(): void {
      this.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo('banco.json')
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((data) => {
          this.pagoSelect.bancoSelector = data.data as Catalogo[];
        }, (error) => {
          console.error(error);
        });
    }
      /**
     * Obtiene los datos del catálogo de transporte.
     * @method
     * @returns {void}
     */
    public obtenerCatalogosjustificacionTransporte(): void {
      this.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo('justificacion.json')
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((data) => {
          this.pagoSelect.justificacionSelector = data.data as Catalogo[];
        }, (error) => {
          console.error(error);
        });
    }
    /**
     * Envía los valores actuales del formulario al store compartido.
     * @method onPagoChanged
     * @param {PagoDeDerechos} event - Datos actualizados del pago de derechos.
     */
    onPagoChanged(event: PagoDeDerechos): void {
      this.importacionAcuiculturaServicio.actualizarPagoDeDerechos(event as PagoDeDerechos);
    }
    
  /**
   * Limpia las suscripciones para evitar fugas de memoria al destruir el componente.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  }