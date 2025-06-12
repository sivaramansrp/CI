import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import {
  Catalogo,
  CatalogosSelect,
  InputFechaComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  SolicitudPagoBancoState,
  TramitePagoBancoStore,
} from '../../estados/stores/pago-banco.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { INPUT_FECHA_CONFIG } from '../../constantes/pago-banco.enum';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { PagoBancoService } from '../../services/pago-banco.service';
import { TramitePagoBancoQuery } from '../../estados/queries/pago-banco.query';

@Component({
  selector: 'app-pago-de-derechos-banco',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    InputFechaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './pago-de-derechos-banco.component.html',
  styleUrl: './pago-de-derechos-banco.component.scss',
})
export class PagoDeDerechosBancoComponent implements OnInit, OnDestroy {
  /**
   * Formulario de la solicitud.
   */
  formSolicitud!: FormGroup;

  /**
   * Estado de la solicitud de la sección PagoBanco.
   */
  public solicitudState!: SolicitudPagoBancoState;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constante para configurar el input de fecha.
   */
  INPUT_FECHA_CONFIG = INPUT_FECHA_CONFIG;

  /** Bandera de solo lectura (puedes adaptarla si tienes lógica para esto) */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   */
  constructor(
    private fb: FormBuilder,
    private tramitePagoBancoStore: TramitePagoBancoStore,
    private tramitePagoBancoQuery: TramitePagoBancoQuery,
    @Inject(PagoBancoService)
    private servicio: PagoBancoService,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.obtenerDatosBanco();

    // Inicializa el formulario.
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe()
  }

  /**
   * Catálogo de bancos.
   */
  public bancoCatalogo: CatalogosSelect = {
    labelNombre: 'Banco',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [],
  };

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de estados.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

    /**
   * Inicializa el formulario reactivo para capturar el estado seleccionado.
   */
    inicializarFormulario(): void {
      this.tramitePagoBancoQuery.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe();

        this.configurarFormularioPagoBanco();
    }

  /**
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
   */
  ngOnInit(): void {
    this.tramitePagoBancoQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();  
      
    this.configurarFormularioPagoBanco();

    this.inicializarEstadoFormulario();
  }

  /**
   * Configura el formulario para la sección de pago de derechos en banco.
   */
  configurarFormularioPagoBanco(): void {
    this.formSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        claveDeReferencia: [this.solicitudState?.claveDeReferencia,[Validators.required, Validators.maxLength(9)]],
        cadenaDependencia: [this.solicitudState?.cadenaDependencia,[Validators.required, Validators.maxLength(14)]],
        banco: [this.solicitudState?.banco],
        llaveDePago: [this.solicitudState?.llaveDePago,[Validators.required, Validators.maxLength(30)]],
        fechaPago: [this.solicitudState?.fechaPago,[Validators.required, PagoDeDerechosBancoComponent.validarFechaNoFutura]],
        importePago: [this.solicitudState?.importePago,[Validators.required, Validators.maxLength(16),PagoDeDerechosBancoComponent.validarNumeroEntero]],
      }),
    });
  }

  /**
   * Carga datos y deshabilita el formulario si es solo lectura.
  */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.formSolicitud.disable();
    } else {
      this.formSolicitud.enable();
    }
  }

  /**
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
   */
  obtenerDatosBanco(): void {
    this.servicio
      .consultarDatosBanco()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data): void => {
        this.bancoCatalogo.catalogos = data as Catalogo[];
      });
  }

  /**
   * Actualiza el campo de fecha de pago en el formulario y en el estado global.
   *
   * @param nuevo_fechaPago Nueva fecha de pago seleccionada.
   */
  cambioFechaPago(nuevo_fechaPago: string): void {
    this.datosImportadorExportador.patchValue({
      fechaPago: nuevo_fechaPago,
    });
    this.setValoresStore(this.datosImportadorExportador, 'fechaPago', 'setFechaPago');
  }

  /**
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof TramitePagoBancoStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.tramitePagoBancoStore[metodoNombre] as (
        value: string | number | null
      ) => void
    )(VALOR);
  }

  /**
  * @method borrarDatos
  * @description
  * Método que limpia los datos del formulario relacionado con el importador/exportador.
  */
  borrarDatos(): void {
    this.datosImportadorExportador.reset();
  }

  /**
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Método para actualizar el banco seleccionado.
   * @param e {Catalogo} Banco seleccionado.
   */
  get datosImportadorExportador(): FormGroup {
    return this.formSolicitud.get('datosImportadorExportador') as FormGroup;
  }
  static validarNumeroEntero(control: AbstractControl): ValidationErrors | null {
    const VALOR = control.value;
    if (VALOR === null || VALOR === '')
      { return null;
      }
    return Number.isInteger(Number(VALOR)) ? null : { notWholeNumber: true };
  }
  static validarFechaNoFutura(control: AbstractControl): ValidationErrors | null {
    const FECHA_INGRESADA = new Date(control.value);
    const FECHA_ACTUAL = new Date();
  
    // Clear time for accurate comparison
    FECHA_INGRESADA.setHours(0, 0, 0, 0);
    FECHA_ACTUAL .setHours(0, 0, 0, 0);
  
    return FECHA_INGRESADA > FECHA_ACTUAL ? { fechaFuturaInvalida: true } : null;
  }
}
