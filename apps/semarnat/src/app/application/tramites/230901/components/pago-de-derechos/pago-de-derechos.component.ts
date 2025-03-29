import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputFecha, REG_X } from '@libs/shared/data-access-user/src';
import { Solicitud230901State, Tramite230901Store } from '../../estados/store/tramite230901.store';
import { Subject, takeUntil } from 'rxjs';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { FECHA } from '../../enum/pago-de-derecgos-constants';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Formulario reactivo para capturar los datos del pago de derechos.
   */
  formularioPagoDerechos!: FormGroup;

  /**
   * @description
   * Estado actual de la solicitud "230901".
   * Este estado se actualiza al suscribirse al observable `selectSolicitud$`.
   */
  estadoSolicitud230901!: Solicitud230901State;

  /**
   * @description
   * Configuración de la fecha final para el campo "Fecha de Pago".
   */
  fechaFinalConfiguracion: InputFecha = FECHA;

  /**
   * @description
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  constructor(
    public servicioVidaSilvestre: AutorizacionesDeVidaSilvestreService,
    private tramite230901Store: Tramite230901Store,
    private tramite230901Query: Tramite230901Query,
    private formBuilder: FormBuilder
  ) {
    // do nothing
  }

  /**
   * @description
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa los catálogos de datos de pago de derechos, se suscribe al estado de la solicitud
   * y crea el formulario de pago.
   */
  ngOnInit(): void {
    this.servicioVidaSilvestre.inicializaPagoDeDerechosDatosCatalogos();
    this.tramite230901Query.selectSolicitud$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estado) => {
        this.estadoSolicitud230901 = estado;
      });

    this.crearFormularioPagoDerechos();
  }

  /**
   * @description
   * Crea el formulario reactivo para capturar los datos del pago de derechos.
   * Algunos campos, como `claveDeReferencia`, `cadenaDeLaDependencia` y `importeDePago`,
   * están deshabilitados porque no deben ser editados por el usuario.
   */
  crearFormularioPagoDerechos(): void {
    this.formularioPagoDerechos = this.formBuilder.group({
      claveDeReferencia: new FormControl(this.estadoSolicitud230901.claveDeReferencia, Validators.required),
      cadenaDeLaDependencia: new FormControl(this.estadoSolicitud230901.cadenaDeLaDependencia, Validators.required),
      banco: new FormControl(this.estadoSolicitud230901.bancoseleccionado, Validators.required),
      llaveDePago: new FormControl(this.estadoSolicitud230901.llaveDePago, Validators.required),
      importeDePago: new FormControl(this.estadoSolicitud230901.importeDePago, Validators.required),
      fechaDePago: new FormControl(this.estadoSolicitud230901.fechaDePago, Validators.required),
    });

    this.formularioPagoDerechos.get('claveDeReferencia')?.disable();
    this.formularioPagoDerechos.get('cadenaDeLaDependencia')?.disable();
    this.formularioPagoDerechos.get('importeDePago')?.disable();
  }

  /**
   * @description
   * Maneja la selección del banco en el formulario.
   * Actualiza el estado del almacén con el banco seleccionado.
   */
  seleccionarBanco(): void {
    this.tramite230901Store.setbancoseleccionado(
      this.formularioPagoDerechos.get('banco')?.value
    );
  }

  /**
   * @description
   * Maneja los cambios en el campo "Llave de Pago".
   * Actualiza el estado del almacén con la llave de pago proporcionada.
   */
  cambiarLlaveDePago(): void {
    this.tramite230901Store.setLlaveDePago(
      this.formularioPagoDerechos.get('llaveDePago')?.value
    );
  }

  /**
   * @description
   * Maneja los cambios en el campo "Fecha de Pago".
   * Actualiza el estado del almacén con la fecha de pago proporcionada.
   */
  cambiarFechaDePago(nuevoValor: string): void {
    this.formularioPagoDerechos.patchValue({
      fechaDePago: nuevoValor,
    });
    this.tramite230901Store.setFechaDePago(
      this.formularioPagoDerechos.get('fechaDePago')?.value
    );
  }

  /**
   * @description
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}