import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  EXENTO_DE_RADIO_BOTONS,
  FormularioDatos,
} from '../../enum/sanidad.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Solicitud221603State,
  Tramite221603Store,
} from '../../estados/tramite221603.store';
import { Subject, takeUntil } from 'rxjs';
import { SanidadService } from '../../service/sanidad.service';
import { Tramite221603Query } from '../../estados/tramite221603.query';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
})
/**
 * Componente que gestiona la sección de pago de derechos en el trámite 221603.
 * Permite capturar y gestionar los datos relacionados con el pago de derechos, como clave, dependencia, banco,
 * llave, fecha e importe. También incluye la funcionalidad para manejar exenciones de pago.
 */
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud 221603, que contiene los valores actuales de la solicitud.
   */
  solicitudState!: Solicitud221603State;

  /**
   * Formulario reactivo que gestiona los datos relacionados con el pago de derechos.
   */
  pagoDerechosForm!: FormGroup;

  /**
   * Datos del formulario relacionados con la solicitud.
   */
  formularioDatos!: FormularioDatos;

  /**
   * Opciones para el botón de radio que gestiona la exención de pago.
   */
  exentoDeBotonDeRadio = EXENTO_DE_RADIO_BOTONS;

  /**
   * Indica si el campo de justificación debe estar deshabilitado.
   */
  disableJustificacion!: boolean;

  /**
   * Indica si el campo de banco debe estar deshabilitado.
   */
  disableBanco!: boolean;

  /**
   * Subject utilizado para gestionar la destrucción del componente y evitar memory leaks.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente. Inicializa las dependencias necesarias y prepara el formulario reactivo.
   *
   * formBuilder - FormBuilder utilizado para crear el formulario reactivo.
   * tramite221603Store - Store que gestiona los valores persistentes del trámite 221603.
   * tramite221603Query - Query que se utiliza para obtener el estado actual de la solicitud 221603.
   * sanidadService - Servicio que gestiona las operaciones relacionadas con la sanidad.
   */
  constructor(
    private formBuilder: FormBuilder,
    private tramite221603Store: Tramite221603Store,
    private tramite221603Query: Tramite221603Query,
    public sanidadService: SanidadService
  ) {}

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   * Inicializa el formulario reactivo con los valores actuales de la solicitud y configura los catálogos necesarios.
   */
  ngOnInit(): void {
    this.tramite221603Query.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state: Solicitud221603State) => {
        this.solicitudState = state;
      });

    this.sanidadService.inicializaPagoDeDerechosDatosCatalogos();
    this.inicializarFormulario();

    this.disableJustificacion = this.solicitudState.exento === '1' ? false : true;
    this.disableBanco = this.solicitudState.exento === '1' ? true : false;

    this.sanidadService.obtenerFormularioDatos().subscribe((formularioDatos: FormularioDatos) => {
      this.formularioDatos = formularioDatos;
      this.actualizarControlesDelFormulario();
      if (this.solicitudState.exento === '1') {
        this.limpiarFormularioYDeshabilitarControles();
      }
    });
  }

  /**
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   * Configura los campos relacionados con el pago de derechos, como clave, dependencia, banco, llave, fecha e importe.
   */
  private inicializarFormulario(): void {
    this.pagoDerechosForm = this.formBuilder.group({
      exentoDePago: [this.solicitudState.exento, Validators.required],
      justificacion: [this.solicitudState.justificacion, Validators.required],
      clave: [this.solicitudState.clave, Validators.required],
      dependencia: [this.solicitudState.dependencia, Validators.required],
      banco: [this.solicitudState.banco, Validators.required],
      llave: [this.solicitudState.llave, Validators.required],
      fecha: [this.solicitudState.fecha, Validators.required],
      importe: [this.solicitudState.importe, [Validators.required, Validators.min(1)]],
    });
  }

  /**
   * Actualiza los valores de los controles del formulario con los datos del formulario.
   * También deshabilita ciertos campos como clave, dependencia e importe.
   */
  actualizarControlesDelFormulario(): void {
    this.pagoDerechosForm.get('clave')?.disable();
    this.pagoDerechosForm.get('dependencia')?.disable();
    this.pagoDerechosForm.get('importe')?.disable();
    this.pagoDerechosForm.get('clave')?.setValue(this.formularioDatos?.clave);
    this.pagoDerechosForm.get('dependencia')?.setValue(this.formularioDatos?.dependencia);
    this.pagoDerechosForm.get('importe')?.setValue(this.formularioDatos?.importe);
  }

  /**
   * Actualiza el estado del formulario y el store cuando se cambia la exención de pago.
   * También limpia y deshabilita ciertos controles del formulario si es necesario.
   *
   * $event - Valor seleccionado en el botón de radio de exención de pago.
   */
  actualizarExento($event: string | number): void {
    this.disableJustificacion = false;
    this.pagoDerechosForm.get('exentoDePago')?.setValue($event);
    this.setValoresStore('exentoDePago', 'setExentoDePago');
    this.limpiarFormularioYDeshabilitarControles();
  }

  /**
   * Limpia los valores de ciertos campos del formulario y los deshabilita.
   * Esto se utiliza cuando la exención de pago está activa.
   */
  limpiarFormularioYDeshabilitarControles(): void {
    this.pagoDerechosForm.get('clave')?.setValue('');
    this.pagoDerechosForm.get('clave')?.disable();
    this.pagoDerechosForm.get('dependencia')?.setValue('');
    this.pagoDerechosForm.get('dependencia')?.disable();
    this.pagoDerechosForm.get('banco')?.setValue(0);
    this.disableBanco = true;
    this.pagoDerechosForm.get('llave')?.setValue('');
    this.pagoDerechosForm.get('llave')?.disable();
    this.pagoDerechosForm.get('fecha')?.setValue('');
    this.pagoDerechosForm.get('fecha')?.disable();
    this.pagoDerechosForm.get('importe')?.setValue('');
    this.pagoDerechosForm.get('importe')?.disable();
  }

  /**
   * Método que actualiza el store con los valores del formulario.
   *
   * campo - El campo que debe actualizarse en el store.
   * metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(campo: string, metodoNombre: keyof Tramite221603Store): void {
    const VALOR = this.pagoDerechosForm.get(campo)?.value;
    (this.tramite221603Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Libera los recursos y completa la notificación de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}