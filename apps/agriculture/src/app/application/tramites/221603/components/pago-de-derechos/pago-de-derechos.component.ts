import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Solicitud221603State,
  Tramite221603Store,
} from '../../estados/tramite221603.store';
import { Subject, map, takeUntil } from 'rxjs';
import { EXENTO_DE_RADIO_BOTONS } from '../../enum/sanidad.enum';
import { SanidadService } from '../../service/sanidad.service';
import { Tramite221603Query } from '../../estados/tramite221603.query';
import realizar from '@libs/shared/theme/assets/json/221603/realizar.json';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrls: ['./pago-de-derechos.component.scss'],
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud 221603, que contiene los valores actuales de la solicitud.
   */
  solicitudState!: Solicitud221603State;

  /**
   * Formulario reactivo que gestiona los datos relacionados con el pago de derechos, como clave, dependencia, banco,
   * llave, fecha e importe.
   */
  pagoDerechosForm!: FormGroup;

  exentoDeBotonDeRadio = EXENTO_DE_RADIO_BOTONS;
  isExentoSelected = true;

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
   */
  constructor(
    private formBuilder: FormBuilder,
    private tramite221603Store: Tramite221603Store,
    private tramite221603Query: Tramite221603Query,
    public sanidadService: SanidadService
  ) {
    // Constructor que inyecta las dependencias necesarias
  }

  /**
   * Método que se ejecuta cuando el componente es inicializado.
   *
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
    this.sanidadService.inicializaPagoDeDerechosDatosCatalogos();
    this.inicializarFormulario();
  }

  /**
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   *
   * Configura el formulario para gestionar los campos relacionados con el pago de derechos, como clave,
   * dependencia, banco, llave, fecha e importe. También asigna valores predeterminados a algunos campos.
   */
  private inicializarFormulario(): void {
    this.tramite221603Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud221603State;
        })
      )
      .subscribe();

    this.pagoDerechosForm = this.formBuilder.group({
      exentoDePago: [this.solicitudState.exento, Validators.required],
      justificacion: [this.solicitudState.justificacion, Validators.required],
      clave: [this.solicitudState.clave, Validators.required],
      dependencia: [this.solicitudState.dependencia, Validators.required],
      banco: [this.solicitudState.banco, Validators.required],
      llave: [this.solicitudState.llave, Validators.required],
      fecha: [this.solicitudState.fecha, Validators.required],
      importe: [
        this.solicitudState.importe,
        [Validators.required, Validators.min(1)],
      ],
    });
    if (this.pagoDerechosForm.get('exentoDePago')?.value === '1') {
      this.isExentoSelected = false;
    }
    this.pagoDerechosForm.get('clave')?.disable();
    this.pagoDerechosForm.get('dependencia')?.disable();
    this.pagoDerechosForm.get('importe')?.disable();
    this.pagoDerechosForm.get('clave')?.setValue(realizar.formData.clave);
    this.pagoDerechosForm
      .get('dependencia')
      ?.setValue(realizar.formData.dependencia);
    this.pagoDerechosForm.get('importe')?.setValue(realizar.formData.importe);
  }

  updateExento(): void {
    this.isExentoSelected = false;
    this.setValoresStore(
      this.pagoDerechosForm,
      'exentoDePago',
      'setExentoDePago'
    );
  }

  /**
   * Método que actualiza el store con los valores del formulario.
   *
   * @param form - Formulario reactivo con los datos actuales.
   * @param campo - El campo que debe actualizarse en el store.
   * @param metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite221603Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite221603Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   *
   * Libera los recursos y completa la notificación de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
