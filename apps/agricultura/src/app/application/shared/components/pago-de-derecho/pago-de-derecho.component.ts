import { AfterViewInit, Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, InputRadioComponent, RespuestaCatalogos, TituloComponent } from '@libs/shared/data-access-user/src';
import {FECHAPAGODATE, FECHA_DE_PAGO } from '../../constantes/pago-de-derechos.enum';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagoDeDerechos } from '../../../tramites/220201/models/220201/capturar-solicitud.model';
import { RadioOpcion } from '../../../tramites/220201/models/220201/certificado-zoosanitario.model';

@Component({
  selector: 'app-pago-de-derecho',
  standalone: true,
  imports: [
        CommonModule,
        TituloComponent,
        ReactiveFormsModule,
        InputFechaComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        FormsModule
  ],
  templateUrl: './pago-de-derecho.component.html',
  styleUrl: './pago-de-derecho.component.scss',
})
export class PagoDeDerechoComponent implements OnDestroy,OnInit,AfterViewInit {
   /**
     * Configuración predeterminada para el campo de fecha de pago.
     */
    fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  
    /**
     * Lista de opciones para el selector de justificación.
     */
    justificacionSelector: Catalogo[] = [];
  
  
    /**
     * Fecha de pago predeterminada que se puede actualizar.
     */
    fechaPagoDate: string = FECHAPAGODATE;
  
    /**
     * Lista de opciones para el selector de banco.
     */
    bancoSelector: Catalogo[] = [];
  
    /**
     * Formulario reactivo que gestiona los campos del pago de derechos.
     */
    pagoForm: FormGroup = this.fb.group({
      exentoPago: [{ value: 'si', disabled: false }, Validators.required],
      justificacion: [{ value: '', disabled: false }, Validators.required],
      claveReferencia: [{ value: '', disabled: true }],
      cadenaDependencia: [{ value: '', disabled: true }],
      banco: [{ value: '', disabled: true }],
      llavePago: [{ value: '', disabled: true }],
      importePago: [{ value: '', disabled: true }]
    });
  
    /**
     * Opciones disponibles para el campo de radio sobre la exención de pago.
     */
    radioOptions: RadioOpcion[] = [
      { label: "No", value: "no" },
      { label: "Sí", value: "si" }
    ];
  
    /**
     * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
     */
    private destroyNotifier$ = new Subject<void>();
    /**
     * @desc Objeto que contiene la información relacionada con el pago de derechos.
     * @type {PagoDeDerechos}
     * @memberof PagoDeDerechoComponent
     * @input
     * @description [Compodoc] Propiedad de entrada que recibe los datos del pago de derechos para ser utilizados en el componente.
     */
    @Input() pagoDeDerechos: PagoDeDerechos = {} as PagoDeDerechos;

    /**
     * Indica si el formulario debe mostrarse en modo solo lectura.
     *
     * @type {boolean}
     * @default false
     * @see https://compodoc.app/
     *
     * @description
     * Cuando es verdadero, el formulario se presenta únicamente para visualización,
     * deshabilitando la edición de los campos.
     */
    @Input() esFormularioSoloLectura:boolean = false;


      /**
       * @description
       * Evento emitido cuando se produce un cambio en el pago de derechos.
       * 
       * @param pagoChanged - Emite un objeto de tipo `PagoDeDerechos` con la información actualizada del pago.
       * 
       * @event
       */
      @Output() pagoChanged = new EventEmitter<PagoDeDerechos>();
    /**
     * Constructor del componente. Inyecta los servicios y realiza una carga inicial de catálogos.
     * @param fb Constructor de formularios reactivos.
     * @param httpServicios Cliente HTTP para peticiones.
     * @param certificadoZoosanitarioServices Servicio para actualizar datos de pago.
     * @param certificadoZoosanitarioQuery Fuente de datos del estado actual de certificado.
     * @param consultaQuery Fuente de datos del estado de consulta.
     */
    constructor(
      private readonly fb: FormBuilder,
      private readonly httpServicios: HttpClient,
    ) {
      this.obtenerDetallesDeListaDeOpciones();
    }
    /**
     * @inheritdoc
     * @description
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
     * 
     * @remarks
     * Este método inicializa el formulario `pagoForm` con los valores provenientes del objeto `pagoDeDerechos`.
     * Si alguna propiedad no está definida, se asigna un valor por defecto.
     * 
     * @see https://angular.io/guide/lifecycle-hooks
     * 
     * @memberof PagoDeDerechoComponent
     */
    ngOnInit(): void {
    this.pagoForm.patchValue({
        exentoPago: this.pagoDeDerechos.exentoPago || 'si',
        justificacion: this.pagoDeDerechos.justificacion || '',
        claveReferencia: this.pagoDeDerechos.claveReferencia || '', 
        cadenaDependencia: this.pagoDeDerechos.cadenaDependencia || '',
        banco: this.pagoDeDerechos.banco || '',
        llavePago: this.pagoDeDerechos.llavePago || '',
        importePago: this.pagoDeDerechos.importePago || ''
      });
    }
    /**
     * @inheritdoc
     * @description
     * Método del ciclo de vida de Angular que se ejecuta después de que la vista del componente ha sido inicializada.
     * 
     * @remarks
     * Este método habilita o deshabilita el formulario `pagoForm` dependiendo del valor de `esFormularioSoloLectura`.
     * 
     * @see https://angular.io/guide/lifecycle-hooks
     * 
     * @memberof PagoDeDerechoComponent
     */
    ngAfterViewInit(): void {
      if(this.esFormularioSoloLectura){
        this.pagoForm.disable();
      }
      else{
        this.pagoForm.enable();
      }
    }

     obtenerDetallesDeListaDeOpciones(): void {
        this.obtenerBancoSelectorList();
        this.obtenerListaDeJustificaciones();
      }
    
      /**
       * Realiza una petición para obtener el catálogo de bancos.
       */
      obtenerBancoSelectorList(): void {
        this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/banco.json')
          .pipe(takeUntil(this.destroyNotifier$))
          .subscribe((data): void => {
            const DATOS = data?.data;
            this.bancoSelector = DATOS as Catalogo[];
          });
      }
    
      /**
       * Realiza una petición para obtener el catálogo de justificaciones.
       */
      obtenerListaDeJustificaciones(): void {
        this.httpServicios.get<RespuestaCatalogos>('../../../../../assets/json/220201/Justificación.json')
          .pipe(takeUntil(this.destroyNotifier$))
          .subscribe((data): void => {
            const DATOS = data?.data;
            this.justificacionSelector = DATOS as Catalogo[];
          });
      }

  /**
   * @desc Actualiza el objeto de pago de derechos y emite el evento correspondiente.
   * @memberof PagoDeDerechoComponent
   */
  actualizarPago(): void {
    this.pagoChanged.emit(this.pagoForm?.value);
  }

   /**
   * Limpia las suscripciones para evitar fugas de memoria al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
