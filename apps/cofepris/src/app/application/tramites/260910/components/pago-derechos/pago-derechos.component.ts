import { Catalogo, CatalogosSelect, InputFecha } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, REGEX_LLAVE_PAGO, REGEX_SOLO_NUMEROS, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud260910State, Solicitud260910Store } from '../../estados/tramites260910.store';
import { Subject, map, takeUntil } from 'rxjs';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';

/**
 * Componente para gestionar el registro del pago de derechos.
 * 
 * Este componente maneja el formulario y la lógica relacionada con el pago de derechos.
 */
@Component({
  selector: 'app-pago-derechos',
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss',
})
export class PagoDerechosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para los datos del pago de derechos.
   */
  pagoDeDerechosForm!: FormGroup;

  /**
   * Catálogo de bancos para seleccionar en el formulario.
   */
  bancoCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Configuración para el campo de fecha de pago.
   */
  fechaPago: InputFecha = {
    labelNombre: 'Fecha de pago:',
    required: false,
    habilitado: true,
  };

  /**
   * Estado actual de la solicitud 260910.
   */
  solicitud260910State: Solicitud260910State = {} as Solicitud260910State;

  /**
   * Controlador para manejar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta (lectura/edición).
   */
  public consultaState!: ConsultaioState;

  /**
   * Indica si el formulario es de solo lectura.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * 
   * @param fb Constructor de formularios reactivos
   * @param solicitudDatosService Servicio para datos de solicitud
   * @param solicitud260910Store Almacén para estado de solicitud
   * @param solicitud260910Query Consulta para estado de solicitud
   * @param consultaQuery Consulta para estado de consulta
   * @param validacionesService Servicio para validar formularios.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260910Store: Solicitud260910Store,
    public solicitud260910Query: Solicitud260910Query,
    private consultaQuery: ConsultaioQuery,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.obtenerPagoDerechos();
  }

  /**
   * Inicialización del componente.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    this.configurarSuscripcionEstadoConsulta();
  }

  /**
   * Inicializa el formulario reactivo para el pago de derechos.
   */
  private inicializarFormulario(): void {
    this.pagoDeDerechosForm = this.fb.group({
      /** Clave de referencia del pago */
      claveDeReferencia: [this.solicitud260910State.claveDeReferencia, [Validators.maxLength(9)]],
      /** Cadena de dependencia asociada al pago */
      cadenaDeDependencia: [this.solicitud260910State.cadenaDeDependencia, [Validators.maxLength(14)]],
      /** Banco seleccionado para el pago */
      banco: [this.solicitud260910State.banco],
      /** Llave de pago proporcionada por el sistema */
      liaveDePago: [this.solicitud260910State.liaveDePago, [Validators.maxLength(30), Validators.pattern(REGEX_LLAVE_PAGO)]],
      /** Fecha en la que se realizó el pago */
      fechaDePago: [this.solicitud260910State.fechaDePago],
      /** Importe total del pago realizado */
      importeDePago: [this.solicitud260910State.importeDePago, [Validators.maxLength(16), Validators.pattern(REGEX_SOLO_NUMEROS)]],
    });

    this.solicitud260910Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260910State) => {
          this.solicitud260910State = respuesta;
          this.pagoDeDerechosForm.patchValue({
            claveDeReferencia: this.solicitud260910State.claveDeReferencia,
            cadenaDeDependencia: this.solicitud260910State.cadenaDeDependencia,
            banco: this.solicitud260910State.banco,
            liaveDePago: this.solicitud260910State.liaveDePago,
            fechaDePago: this.solicitud260910State.fechaDePago,
            importeDePago: this.solicitud260910State.importeDePago,
          });
        })
      )
      .subscribe();
  }

  /**
   * Configura la suscripción al estado de consulta.
   * Controla el modo de solo lectura para el formulario.
   */
  private configurarSuscripcionEstadoConsulta(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
          this.esFormularioSoloLectura = seccionState?.readonly;
          this.actualizarEstadoFormularios();
        })
      )
      .subscribe();
  }

  /**
   * Obtiene el catálogo de pagos de derechos.
   */
  obtenerPagoDerechos(): void {
    this.solicitudDatosService
      .obtenerPagoDerechos().pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.bancoCatalogo = respuesta;
        },
      });
  }

  /**
   * Actualiza la clave de referencia del pago en el almacén de estado.
   * @param evento Evento de entrada que contiene el valor
   */
  setClaveDeReferencia(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setClaveDeReferencia(VALOR);
  }

  /**
   * Actualiza la cadena de dependencia en el almacén de estado.
   * @param evento Evento de entrada que contiene el valor
   */
  setCadenaDeDependencia(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setCadenaDeDependencia(VALOR);
  }

  /**
   * Actualiza el banco seleccionado en el almacén de estado.
   * @param evento Catálogo con el banco seleccionado
   */
  setBanco(evento: Catalogo): void {
    this.solicitud260910Store.setBanco(evento.id);
  }

  /**
   * Actualiza la llave de pago en el almacén de estado.
   * 
   * @param evento Evento de entrada que contiene el valor
   */
  setLiaveDePago(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setLiaveDePago(VALOR);
  }

  /**
   * Actualiza la fecha de pago en el almacén de estado.
   * 
   * @param evento Cadena con la fecha seleccionada
   */
  seleccionarFechaInicio(evento: string): void {
    this.solicitud260910Store.setFechaDePago(evento);
  }

  /**
   * Actualiza el importe del pago en el almacén de estado.
   * 
   * @param evento Evento de entrada que contiene el valor
   */
  setImporteDePago(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setImporteDePago(VALOR);
  }

  /**
   * Actualiza el estado de habilitación de los formularios.
   */
  private actualizarEstadoFormularios(): void {
    if (this.esFormularioSoloLectura) {
      this.pagoDeDerechosForm.disable();
    } else {
      this.pagoDeDerechosForm.enable();
    }
  }

  /**
     * Método para validar el formulario.
     * @param form Formulario a validar.
     * @param field Campo a validar.
     * @returns {boolean} Regresa un booleano si el campo es válido o no.
     */
    esValido(form: FormGroup, field: string): boolean {
      return this.validacionesService.isValid(form, field) === true;
    }

  /**
   * Destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}