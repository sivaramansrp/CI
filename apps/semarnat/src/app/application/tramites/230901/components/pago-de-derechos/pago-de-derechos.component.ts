import { CADENA_DE_LA_DEPENDENCIA, CLAVE_DE_REFERENCIA, FECHA, IMPORT_DE_PAGO } from '../../enum/autorizaciones.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Solicitud230901State, Tramite230901Store } from '../../estados/store/tramite230901.store';
import { Subject, takeUntil } from 'rxjs';
import { AutorizacionesDeVidaSilvestreService } from '../../services/autorizaciones-de-vida-silvestre.service';
import { InputFecha} from '@libs/shared/data-access-user/src';
import { Tramite230901Query } from '../../estados/query/tramite230901.query';


/**
 * Componente que gestiona los datos relacionados con el pago de derechos en el trámite "230901".
 * Incluye la configuración de formularios, la interacción con servicios relacionados con autorizaciones
 * de vida silvestre y la gestión del estado del trámite.
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.css',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para capturar los datos del pago de derechos.
   */
  formularioPagoDerechos!: FormGroup;

  /**
   * Estado actual de la solicitud "230901".
   * Este estado se actualiza al suscribirse al observable `selectSolicitud$`.
   */
  estadoSolicitud230901!: Solicitud230901State;

  /**
   * Configuración de la fecha final para el campo "Fecha de Pago".
   */
  fechaFinalConfiguracion: InputFecha = FECHA;

  /**
   * Clave de referencia utilizada en el trámite.
   */
  claveDeReferencia: string = '0'+CLAVE_DE_REFERENCIA;

  /**
   * Cadena de la dependencia asociada al trámite.
   */
  cadenaDeLaDependencia: string = '00'+CADENA_DE_LA_DEPENDENCIA;

  /**
   * Importe de pago requerido para el trámite.
   */
  importDePago: number = IMPORT_DE_PAGO;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

   /**
   * Constructor del componente PagoDeDerechosComponent.
   * Inicializa los servicios y dependencias necesarias para gestionar el estado
   * y los datos relacionados con el pago de derechos.
   *
   * {AutorizacionesDeVidaSilvestreService} servicioVidaSilvestre - Servicio para gestionar autorizaciones de vida silvestre.
   * {Tramite230901Store} tramite230901Store - Almacén para gestionar el estado del trámite "230901".
   * {Tramite230901Query} tramite230901Query - Servicio de consulta para acceder al estado del trámite "230901".
   * {FormBuilder} formBuilder - Servicio para construir formularios reactivos.
   */
  constructor(
    public servicioVidaSilvestre: AutorizacionesDeVidaSilvestreService,
    private tramite230901Store: Tramite230901Store,
    private tramite230901Query: Tramite230901Query,
    private formBuilder: FormBuilder
  ) {
    // No se realiza ninguna acción aquí.
  }

  /**
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
   * Crea el formulario reactivo para capturar los datos del pago de derechos.
   * Algunos campos, como `claveDeReferencia`, `cadenaDeLaDependencia` y `importeDePago`,
   * están deshabilitados porque no deben ser editados por el usuario.
   */
  crearFormularioPagoDerechos(): void {
    this.formularioPagoDerechos = this.formBuilder.group({
      claveDeReferencia: new FormControl(this.claveDeReferencia),
      cadenaDeLaDependencia: new FormControl(this.cadenaDeLaDependencia),
      banco: new FormControl(this.estadoSolicitud230901.bancoseleccionado, Validators.required),
      llaveDePago: new FormControl(this.estadoSolicitud230901.llaveDePago, Validators.required),
      fechaDePago: new FormControl(this.estadoSolicitud230901.fechaDePago, Validators.required),
      importeDePago: new FormControl(this.importDePago),
    });

    this.formularioPagoDerechos.get('claveDeReferencia')?.disable();
    this.formularioPagoDerechos.get('cadenaDeLaDependencia')?.disable();
    this.formularioPagoDerechos.get('importeDePago')?.disable();
  }

  /**
   * Maneja la selección del banco en el formulario.
   * Actualiza el estado del almacén con el banco seleccionado.
   */
  seleccionarBanco(): void {
    this.tramite230901Store.setbancoseleccionado(
      this.formularioPagoDerechos.get('banco')?.value
    );
  }

  /**
   * Maneja los cambios en el campo "Llave de Pago".
   * Actualiza el estado del almacén con la llave de pago proporcionada.
   */
  cambiarLlaveDePago(): void {
    this.tramite230901Store.setLlaveDePago(
      this.formularioPagoDerechos.get('llaveDePago')?.value
    );
  }

  /**
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
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}