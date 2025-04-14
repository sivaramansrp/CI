import { CADENA_PAGO_DEPENDENCIA, CLAVE_DE_REFERENCIA, FECHA, IMP_PAGO } from "../../enum/autorizaciones.enum";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Solicitud230901State, Tramite230901Store } from "../../estados/store/tramite230901.store";
import { Subject, takeUntil } from "rxjs";
import { AutorizacionesDeVidaSilvestreService } from "../../services/autorizaciones-de-vida-silvestre.service";
import { InputFecha } from "@libs/shared/data-access-user/src";
import { Tramite230901Query } from "../../estados/query/tramite230901.query";

/**
 * Componente que gestiona los datos relacionados con el pago de derechos en el trámite "230901".
 * Incluye la configuración de formularios, la interacción con servicios relacionados con autorizaciones
 * de vida silvestre y la gestión del estado del trámite.
 */
@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss',
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
  configuracionFechaFinal: InputFecha = FECHA;

  /**
   * Clave de referencia utilizada en el trámite.
   */
  referenciaClave: string = '0' + CLAVE_DE_REFERENCIA;

  /**
   * Cadena de la dependencia asociada al trámite.
   */
  dependenciaCadenaPago: string = '00' + CADENA_PAGO_DEPENDENCIA;

  /**
   * Importe de pago requerido para el trámite.
   */
  impPago: number = IMP_PAGO;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  /**
   * Constructor del componente PagoDeDerechosComponent.
   * Inicializa los servicios y dependencias necesarias para gestionar el estado
   * y los datos relacionados con el pago de derechos.
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
      .subscribe((estado: Solicitud230901State) => {
        this.estadoSolicitud230901 = estado;
      });

    this.crearformularioPagoDerechos();
  }

  /**
   * Crea el formulario reactivo para capturar los datos del pago de derechos.
   * Algunos campos, como `claveDeReferencia`, `cadenaPagoDependencia` y `impPago`,
   * están deshabilitados porque no deben ser editados por el usuario.
   */
  crearformularioPagoDerechos(): void {

    this.formularioPagoDerechos = this.formBuilder.group({
      claveDeReferencia: new FormControl(this.referenciaClave),
      cadenaPagoDependencia: new FormControl(this.dependenciaCadenaPago),
      banco: new FormControl(this.estadoSolicitud230901.bancoseleccionado, Validators.required),
      llaveDePago: new FormControl(this.estadoSolicitud230901.llaveDePago, Validators.required),
      fecPago: new FormControl(this.estadoSolicitud230901.fecPago, Validators.required),
      impPago: new FormControl(this.impPago),
    });

    this.formularioPagoDerechos.get('claveDeReferencia')?.disable();
    this.formularioPagoDerechos.get('cadenaPagoDependencia')?.disable();
    this.formularioPagoDerechos.get('impPago')?.disable();
  }

  /**
   * Maneja la selección del banco en el formulario.
   * Actualiza el estado del almacén con el banco seleccionado.
   */
  manejarSeleccionBanco(): void {
    this.tramite230901Store.setbancoseleccionado(
      this.formularioPagoDerechos.get('banco')?.value
    );
  }

  /**
   * Maneja los cambios en el campo "Llave de Pago".
   * Actualiza el estado del almacén con la llave de pago proporcionada.
   */
  manejarCambioLlavePago(): void {
    const CAPITALIZED_VALUE = this.formularioPagoDerechos.get('llaveDePago')?.value.toUpperCase();
    this.formularioPagoDerechos.get('llaveDePago')?.setValue(CAPITALIZED_VALUE);
    this.tramite230901Store.setLlaveDePago(
      CAPITALIZED_VALUE
    );
  }

  /**
   * Maneja los cambios en el campo "Fecha de Pago".
   * Actualiza el estado del almacén con la fecha de pago proporcionada.  
   */
  cambioFechaFinal(nuevo_valor: string): void {
    this.formularioPagoDerechos.patchValue({
      fecPago: nuevo_valor,
    });
    this.tramite230901Store.setfecPago(nuevo_valor);
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