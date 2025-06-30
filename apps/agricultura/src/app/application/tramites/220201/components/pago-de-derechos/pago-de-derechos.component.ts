import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CertificadoZoosanitarioServiceService } from '../../services/220201/certificado-zoosanitario.service';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { PagoDeDerechoComponent } from '../../../../shared/components/pago-de-derecho/pago-de-derecho.component';
import { PagoDeDerechos } from '../../models/220201/capturar-solicitud.model';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';

/**
 * @fileoverview Componente para la gestión del formulario de pago de derechos.
 * Este componente maneja la lógica y la presentación del formulario de pago de derechos,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module PagoDeDerechosComponent
 */

/**
 * Componente para el formulario de pago de derechos.
 * @class PagoDeDerechosComponent
 * @implements {OnInit, OnDestroy}
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
export class PagoDeDerechosComponent implements OnInit, OnDestroy {

  /**
   * Datos del pago de derechos.
   * @property {PagoDeDerechos} pagoData
   */
  pagoData: PagoDeDerechos = {} as PagoDeDerechos;

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
   * Constructor del componente. Inyecta los servicios y realiza una carga inicial de catálogos.
   * @method constructor
   * @param certificadoZoosanitarioServices Servicio para actualizar datos de pago.
   * @param certificadoZoosanitarioQuery Fuente de datos del estado actual de certificado.
   * @param consultaioQuery Fuente de datos del estado de consulta.
   * @param cdr ChangeDetectorRef para detectar cambios en el ciclo de vida.
   */
  constructor(
    private readonly certificadoZoosanitarioServices: CertificadoZoosanitarioServiceService,
    private readonly certificadoZoosanitarioQuery: ZoosanitarioQuery,
    private readonly consultaioQuery: ConsultaioQuery,
    private readonly cdr: ChangeDetectorRef
  ) {}

  /**
   * Ciclo de vida de Angular que se ejecuta al iniciar el componente.
   * Suscribe al estado del formulario para rellenar datos y verificar validez.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.certificadoZoosanitarioQuery.seleccionarPagoDerechos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datosDeLaSolicitud) => {
        if (datosDeLaSolicitud) {
          this.pagoData = datosDeLaSolicitud;
        }
      });
    this.consultaioQuery.selectConsultaioState$
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
   * Envía los valores actuales del formulario al store compartido.
   * @method onPagoChanged
   * @param {PagoDeDerechos} event - Datos actualizados del pago de derechos.
   */
  onPagoChanged(event: PagoDeDerechos): void {
    this.certificadoZoosanitarioServices.updatePagoDeDerechos(event as PagoDeDerechos);
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