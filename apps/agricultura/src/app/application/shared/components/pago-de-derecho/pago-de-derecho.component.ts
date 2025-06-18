import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, InputRadioComponent, RespuestaCatalogos, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {FECHAPAGODATE, FECHA_DE_PAGO } from '../../constantes/pago-de-derechos.enum';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
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
export class PagoDeDerechoComponent implements OnDestroy,OnInit {
   /**
     * Configuración predeterminada para el campo de fecha de pago.
     */
    fechaInicioInput: InputFecha = FECHA_DE_PAGO;
  
    /**
     * Lista de opciones para el selector de justificación.
     */
    justificacionSelector: Catalogo[] = [];
  
    /**
     * Bandera para determinar si el formulario está en modo solo lectura.
     */
    esFormularioSoloLectura: boolean = false;
  
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
    ngOnInit(): void {
this.pagoForm.patchValue({
        exentoPago: this.pagoDeDerechos.exentoPago,
        justificacion: this.pagoDeDerechos.justificacion,
        claveReferencia: this.pagoDeDerechos.claveReferencia, 
        cadenaDependencia: this.pagoDeDerechos.cadenaDependencia,
        banco: this.pagoDeDerechos.banco,
        llavePago: this.pagoDeDerechos.llavePago,
        importePago: this.pagoDeDerechos.importePago
      });
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
   * Limpia las suscripciones para evitar fugas de memoria al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
