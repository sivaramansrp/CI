import { HttpClient } from '@angular/common/http';

import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, InputFecha, InputFechaComponent, InputRadioComponent, RespuestaCatalogos, TituloComponent } from '@ng-mf/data-access-user';

import { FECHAPAGODATE,FECHA_DE_PAGO } from '../../constantes/certificado-zoosanitario.enum';

import { RadioOpcion } from '../../models/220201/certificado-zoosanitario.model';

import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';

import {Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';

/**
 * @fileoverview Componente para la gestión del formulario de pago de derechos.
 * Este componente maneja la lógica y la presentación del formulario de pago de derechos,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module PagoDeDerechosComponent
 */

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputFechaComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    FormsModule
  ]
})
export class PagoDeDerechosComponent implements OnInit, AfterViewInit, OnDestroy {

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
    private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService,
    private readonly certificadoZoosanitarioQuery: ZoosanitarioQuery,
    private consultaQuery: ConsultaioQuery
  ) {
    this.obtenerDetallesDeListaDeOpciones();
  }

  /**
   * Ciclo de vida de Angular que se ejecuta al iniciar el componente.
   * Suscribe al estado del formulario para rellenar datos y verificar validez.
   */
  ngOnInit(): void {
    this.certificadoZoosanitarioQuery.seleccionarPagoDerechos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datosDeLaSolicitud) => {
        if (datosDeLaSolicitud) {
          this.pagoForm.patchValue(datosDeLaSolicitud);
        }
      });

    this.pagoForm.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(() => {
        const FORMA_VALIDA_ACTUALIZADA = {
          pagoDeformaValida: this.pagoForm.valid
        };
        this.certificadoZoosanitarioServices.actualizarFormaValida(FORMA_VALIDA_ACTUALIZADA);
      });
  }

  /**
   * Ciclo de vida que se ejecuta después de renderizar la vista.
   * Activa el modo solo lectura si el estado lo requiere.
   */
  ngAfterViewInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          if (this.esFormularioSoloLectura) {
            this.pagoForm.disable();
          }
        })
      ).subscribe();
  }

  /**
   * Cambia el valor de la fecha de pago dentro del formulario.
   * @param nuevoValor Nueva fecha seleccionada por el usuario.
   */
  cambioFechaFinal(nuevoValor: string): void {
    this.pagoForm.patchValue({ fechaPago: nuevoValor });
    this.fechaPagoDate = nuevoValor;
  }

  /**
   * Método que agrupa la carga de catálogos: bancos y justificaciones.
   */
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
   * Envía los valores actuales del formulario al store compartido.
   */
  setValoresStore(): void {
    const VALOR = this.pagoForm.value;
    this.certificadoZoosanitarioServices.updatePagoDeDerechos(VALOR);
  }

  /**
   * Limpia las suscripciones para evitar fugas de memoria al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
