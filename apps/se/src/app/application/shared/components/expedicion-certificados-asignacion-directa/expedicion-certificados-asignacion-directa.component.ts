import { Catalogo, CatalogoSelectComponent, FECHA_FINAL_VIGENCIA, FECHA_FINAL_VIGENCIA_DEL_CUPO, FECHA_INICIO_VIGENCIA, FECHA_INICIO_VIGENCIA_DEL_CUPO, InputFecha, InputFechaComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ExpedicionCertificadosAsignacion120202State, Tramite120202Store } from '../../../estados/tramites/tramite120202.store';
import { ExpedirMonto, NumeroOficioAsignacionDetalleRespquesta } from '../../../tramites/120202/models/expedicion-certificados-asignacion.model';
import { CONFIGURACION_PARA_ENCABEZADO_DE_EXPEDIR_MONTO_TABLA } from '../../../tramites/120202/constantes/expedicion-certificados-asignacion-constantes.enum';
import { ExpedicionCertificadosAsignacionService } from '../../../tramites/120202/services/expedicion-certificados-asignacion/expedicion-certificados-asignacion.service';
import { Tramite120202Query } from '../../../estados/queries/tramite120202.query';

/**
 * Componente para la expedición de certificados de asignación directa.
 */
@Component({
  selector: 'app-expedicion-certificados-asignacion-directa',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    InputFechaComponent
  ],
  templateUrl: './expedicion-certificados-asignacion-directa.component.html',
  styleUrl: './expedicion-certificados-asignacion-directa.component.scss',
})
export class ExpedicionCertificadosAsignacionDirectaComponent implements OnInit, OnDestroy {
  /**
   * Formulario para la expedición de certificados de asignación.
   */
  expedicionCertificadosAsignacionForm!: FormGroup;

  /**
   * Catálogo de años de autorización.
   */
  aniosAutorizacion!: Catalogo[];

  /**
   * Mostrar detalle de la tabla.
   */
  mostrarDetalle: boolean = false;

  /**
   * Configuración para el encabezado de la tabla de expedición de monto.
   */
  configuracionParaEncabezadoDeTabla = CONFIGURACION_PARA_ENCABEZADO_DE_EXPEDIR_MONTO_TABLA;

  /**
   * Configuración de la tabla dinámica.
   */
  cuerpoTabla: ExpedirMonto[] = [];

  /**
   * Configuración de la tabla dinámica.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Fecha inicio de entrada.
   */
  fechaInicioInput: InputFecha = FECHA_INICIO_VIGENCIA;

  /**
   * Fecha final de entrada.
   */
  fechaFinVigenciaAprobadaInput: InputFecha = FECHA_FINAL_VIGENCIA;

  /**
   * Fecha de inicio de vigencia del cupo.
   */
  fechaInicioVigenciaInput: InputFecha = FECHA_INICIO_VIGENCIA_DEL_CUPO;

  /**
   * Fecha final de vigencia del cupo.
   */
  fechaFinVigenciaInput: InputFecha = FECHA_FINAL_VIGENCIA_DEL_CUPO;

  /**
   * Montos seleccionados en la tabla de expedición de monto.
   * @type {ExpedirMonto[]}
   */
  public selectedMonto: ExpedirMonto[] = [];

  /**
   * Emisor de eventos para mostrar errores.
   * @type {EventEmitter<boolean>}
   * @description Emite un valor booleano para indicar si se debe mostrar un error.
   */
  @Output() mostrarError: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Estado de la expedición de certificados de asignación.
   */
  public expedicionCertificadoAsignacionState!: ExpedicionCertificadosAsignacion120202State;

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param tramite120202Store - Store para gestionar el estado de la aplicación.
   * @param tramite120202Query - Query para consultar el estado de la aplicación.
   * @param expedicionCertificadosAsignacionService - Servicio para gestionar la expedición de certificados de asignación.
   */
  constructor(
    private fb: FormBuilder,
    private tramite120202Store: Tramite120202Store,
    private tramite120202Query: Tramite120202Query,
    private expedicionCertificadosAsignacionService: ExpedicionCertificadosAsignacionService
  ) {
    // El constructor se utiliza para la inyección de dependencias       
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.inicializaCatalogos();

    this.tramite120202Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.expedicionCertificadoAsignacionState = seccionState;
          this.cuerpoTabla = seccionState.cuerpoTabla ?? [];
          this.mostrarDetalle = seccionState.mostrarDetalle ?? false;
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearExpedicionCertificadosAsignacionForm();

    this.aniosAutorizacionSeleccion();
  }

  /**
   * Crea el formulario para la expedición de certificados de asignación.
   */
  crearExpedicionCertificadosAsignacionForm(): void {
    this.expedicionCertificadosAsignacionForm = this.fb.group({
      asignacionOficioNumeroForm: this.fb.group({
        cveAniosAutorizacion: [
          this.expedicionCertificadoAsignacionState.cveAniosAutorizacion,
          [Validators.required]
        ],
        numFolioAsignacionAux: [
          this.expedicionCertificadoAsignacionState.numFolioAsignacionAux,
          [Validators.required]
        ]
      }),
      representacionFederalForm: this.fb.group({
        estado: [
          { value: this.expedicionCertificadoAsignacionState.estado, disabled: true }
        ],
        representacionFederal: [
          { value: this.expedicionCertificadoAsignacionState.representacionFederal, disabled: true }
        ]
      }),
      controlMontosAsignacionForm: this.fb.group({
        sumaAprobada: [
          { value: this.expedicionCertificadoAsignacionState.sumaAprobada, disabled: true }
        ],
        sumaExpedida: [
          { value: this.expedicionCertificadoAsignacionState.sumaExpedida, disabled: true }
        ],
        montoDisponible: [
          { value: this.expedicionCertificadoAsignacionState.montoDisponible, disabled: true }
        ]
      }),
      asignacionDatosForm: this.fb.group({
        numOficio: [
          { value: this.expedicionCertificadoAsignacionState.numOficio, disabled: true }
        ],
        fechaInicio: [
          { value: this.expedicionCertificadoAsignacionState.fechaInicio, disabled: true }
        ],
        fechaFinVigenciaAprobada: [
          { value: this.expedicionCertificadoAsignacionState.fechaFinVigenciaAprobada, disabled: true }
        ]
      }),
      cupoDescripcionForm: this.fb.group({
        regimenAduanero: [
          { value: this.expedicionCertificadoAsignacionState.regimenAduanero, disabled: true }
        ],
        descripcionProducto: [
          { value: this.expedicionCertificadoAsignacionState.descripcionProducto, disabled: true }
        ],
        clasificaionSubproducto: [
          { value: this.expedicionCertificadoAsignacionState.clasificaionSubproducto, disabled: true }
        ],
        unidadMedidaOficialCupo: [
          { value: this.expedicionCertificadoAsignacionState.unidadMedidaOficialCupo, disabled: true }
        ],
        fechaInicioVigencia: [
          { value: this.expedicionCertificadoAsignacionState.fechaInicioVigencia, disabled: true }
        ],
        fechaFinVigencia: [
          { value: this.expedicionCertificadoAsignacionState.fechaFinVigencia, disabled: true }
        ],
        mecanismoAsignacion: [
          { value: this.expedicionCertificadoAsignacionState.mecanismoAsignacion, disabled: true }
        ],
        tratado: [
          { value: this.expedicionCertificadoAsignacionState.tratado, disabled: true }
        ],
        fraccionesArancelarias: [
          { value: this.expedicionCertificadoAsignacionState.fraccionesArancelarias, disabled: true }
        ],
        paisesCupo: [
          { value: this.expedicionCertificadoAsignacionState.paisesCupo, disabled: true }
        ],
        observaciones: [
          { value: this.expedicionCertificadoAsignacionState.observaciones, disabled: true }
        ],
        descripcionFundamento: [
          { value: this.expedicionCertificadoAsignacionState.descripcionFundamento, disabled: true }
        ]
      }),
      distribucionSaldoForm: this.fb.group({
        montoDisponibleAsignacion: [
          { value: this.expedicionCertificadoAsignacionState.montoDisponibleAsignacion, disabled: true }
        ],
        montoExpedir: [
          this.expedicionCertificadoAsignacionState.montoExpedir,
          [Validators.required]
        ],
        totalExpedir: [
          { value: this.expedicionCertificadoAsignacionState.totalExpedir, disabled: true }
        ]
      })
    });
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  inicializaCatalogos(): void {
    const ANIOS_AUTORIZACION$ = this.expedicionCertificadosAsignacionService
      .getAniosAutorizacionCatalogo()
      .pipe(
        map((resp) => {
          this.aniosAutorizacion = resp.data;
        })
      );

    merge(
      ANIOS_AUTORIZACION$
    ).pipe(
      takeUntil(this.destruirNotificador$)
    )
    .subscribe();
  }

  /**
   * Método para obtener el formulario de asignación de oficio y número.
   * @returns {FormGroup} - El formulario de asignación de oficio y número.
   */
  get asignacionOficioNumeroForm(): FormGroup {
    return this.expedicionCertificadosAsignacionForm.get('asignacionOficioNumeroForm') as FormGroup;
  }

  /**
   * Método para obtener el formulario de representación federal.
   * @returns {FormGroup} - El formulario de representación federal.
   */
  get representacionFederalForm(): FormGroup {
    return this.expedicionCertificadosAsignacionForm.get('representacionFederalForm') as FormGroup;
  }

  /**
   * Método para obtener el formulario de control de montos de asignación.
   * @returns {FormGroup} - El formulario de control de montos de asignación.
   */
  get controlMontosAsignacionForm(): FormGroup {
    return this.expedicionCertificadosAsignacionForm.get('controlMontosAsignacionForm') as FormGroup;
  }

  /**
   * Método para obtener el formulario de asignación de datos.
   * @returns {FormGroup} - El formulario de asignación de datos.
   */
  get asignacionDatosForm(): FormGroup {
    return this.expedicionCertificadosAsignacionForm.get('asignacionDatosForm') as FormGroup;
  }

  /**
   * Método para obtener el formulario de cupo y descripción.
   * @returns {FormGroup} - El formulario de cupo y descripción.
   */
  get cupoDescripcionForm(): FormGroup {
    return this.expedicionCertificadosAsignacionForm.get('cupoDescripcionForm') as FormGroup;
  }

  /**
   * Método para obtener el formulario de distribución de saldo.
   * @returns {FormGroup} - El formulario de distribución de saldo.
   */
  get distribucionSaldoForm(): FormGroup {
    return this.expedicionCertificadosAsignacionForm.get('distribucionSaldoForm') as FormGroup;
  }

  /**
   * Anteriormente se llamaba `aniosAutorizacionSeleccion`.
   * Este método se encarga de establecer el año de autorización seleccionado en el store.
   * @returns {void}
   */
  aniosAutorizacionSeleccion(): void {
    const ANIOS_AUTORIZACION = this.asignacionOficioNumeroForm.get('cveAniosAutorizacion')?.value;
    this.tramite120202Store.setAniosAutorizacion(ANIOS_AUTORIZACION);
  }

  /**
   * Método para cambiar la fecha inicio de la asignación.
   * @param nuevo_valor Nuevo valor de la fecha de inicio de la asignación.
   * @returns {void}
   */
  cambioFechaInicio(nuevo_valor: string): void {
    this.asignacionDatosForm.patchValue({
      fechaInicio: nuevo_valor,
    });
    this.tramite120202Store.setFechaInicio(nuevo_valor);
  }

  /**
   * Método para cambiar la fecha de fin de vigencia aprobada.
   * @param nuevo_valor Nuevo valor de la fecha de fin de vigencia aprobada.
   * @returns {void}
   */
  cambioFechaFinVigenciaAprobada(nuevo_valor: string): void {
    this.asignacionDatosForm.patchValue({
      fechaFinVigenciaAprobada: nuevo_valor,
    });
    this.tramite120202Store.setFechaFinVigenciaAprobada(nuevo_valor);
  }

  /**
   * Método para cambiar la fecha de inicio de vigencia del cupo.
   * @param nuevo_valor Nuevo valor de la fecha de inicio de vigencia del cupo.
   * @returns {void}
   */
  cambioFechaInicioVigencia(nuevo_valor: string): void {
    this.cupoDescripcionForm.patchValue({
      fechaInicioVigencia: nuevo_valor,
    });
    this.tramite120202Store.setFechaInicioVigencia(nuevo_valor);
  }

  /**
   * Método para cambiar la fecha de fin de vigencia del cupo.
   * @param nuevo_valor Nuevo valor de la fecha de fin de vigencia del cupo.
   * @returns {void}
   */
  cambioFechaFinVigencia(nuevo_valor: string): void {
    this.cupoDescripcionForm.patchValue({
      fechaFinVigencia: nuevo_valor,
    });
    this.tramite120202Store.setFechaFinVigencia(nuevo_valor);
  }

  /**
   * Método para establecer el valor de alternancia en la tabla de montos a expedir.
   * @param row - Fila seleccionada de la tabla de montos a expedir.
   * @description Este método se utiliza para establecer el valor de alternancia en la tabla de montos a expedir.
   */
  valorDeAlternancia(row: ExpedirMonto[]): void {
    this.selectedMonto = row;
  }

  /**
   * Método para buscar el número de oficio de asignación.
   * @returns {void}
   */
  buscar(cveAniosAutorizacion: string, numFolioAsignacionAux: string): void {
    if (cveAniosAutorizacion === '-1' || numFolioAsignacionAux.length <= 0 || numFolioAsignacionAux === null) {
      this.mostrarError.emit(true);
      return;
    } else {
      this.mostrarError.emit(false);
      this.asignacionOficioNumeroForm.reset({ cveAniosAutorizacion: '-1', numFolioAsignacionAux: '' });
      this.tramite120202Store.setAniosAutorizacion('-1');
      this.tramite120202Store.setNumFolioAsignacionAux('');

      this.expedicionCertificadosAsignacionService.getNumeroOficioAsignacionDetalle()
        .pipe((takeUntil(this.destruirNotificador$)))
        .subscribe((resp: NumeroOficioAsignacionDetalleRespquesta) => {
          const DATOS = resp.data[0];
          this.representacionFederalForm.patchValue({
            estado: DATOS.estado,
            representacionFederal: DATOS.representacionFederal
          });
          this.controlMontosAsignacionForm.patchValue({
            sumaAprobada: DATOS.sumaAprobada,
            sumaExpedida: DATOS.sumaExpedida,
            montoDisponible: DATOS.montoDisponible
          });
          this.asignacionDatosForm.patchValue({
            numOficio: DATOS.numOficio,
            fechaInicio: DATOS.fechaInicio,
            fechaFinVigenciaAprobada: DATOS.fechaFinVigenciaAprobada
          });
          this.cupoDescripcionForm.patchValue({
            regimenAduanero: DATOS.regimenAduanero,
            descripcionProducto: DATOS.descripcionProducto,
            clasificaionSubproducto: DATOS.clasificaionSubproducto,
            unidadMedidaOficialCupo: DATOS.unidadMedidaOficialCupo,
            fechaInicioVigencia: DATOS.fechaInicioVigencia,
            fechaFinVigencia: DATOS.fechaFinVigencia,
            mecanismoAsignacion: DATOS.mecanismoAsignacion,
            tratado: DATOS.tratado,
            fraccionesArancelarias: DATOS.fraccionesArancelarias,
            paisesCupo: DATOS.paisesCupo,
            observaciones: DATOS.observaciones,
            descripcionFundamento: DATOS.descripcionFundamento
          });
          this.distribucionSaldoForm.patchValue({
            montoDisponibleAsignacion: DATOS.montoDisponibleAsignacion
          });
          this.mostrarDetalle = true;
          this.tramite120202Store.setMostrarDetalle(this.mostrarDetalle);
          this.setEstablecerDatosCampo();
        });
    }
  }

  /**
   * Método para establecer los datos en el campo del formulario y en el store.
   * @returns {void}
   */
  setEstablecerDatosCampo(): void {
    this.setValoresStore(this.representacionFederalForm, 'estado', 'setEstado');
    this.setValoresStore(this.representacionFederalForm, 'representacionFederal', 'setRepresentacionFederal');

    this.setValoresStore(this.controlMontosAsignacionForm, 'sumaAprobada', 'setSumaAprobada');
    this.setValoresStore(this.controlMontosAsignacionForm, 'sumaExpedida', 'setSumaExpedida');
    this.setValoresStore(this.controlMontosAsignacionForm, 'montoDisponible', 'setMontoDisponible');

    this.setValoresStore(this.asignacionDatosForm, 'numOficio', 'setNumOficio');
    this.setValoresStore(this.asignacionDatosForm, 'fechaInicio', 'setFechaInicio');
    this.setValoresStore(this.asignacionDatosForm, 'fechaFinVigenciaAprobada', 'setFechaFinVigenciaAprobada');

    this.setValoresStore(this.cupoDescripcionForm, 'regimenAduanero', 'setRegimenAduanero');
    this.setValoresStore(this.cupoDescripcionForm, 'descripcionProducto', 'setDescripcionProducto');
    this.setValoresStore(this.cupoDescripcionForm, 'clasificaionSubproducto', 'setClasificaionSubproducto');
    this.setValoresStore(this.cupoDescripcionForm, 'unidadMedidaOficialCupo', 'setUnidadMedidaOficialCupo');
    this.setValoresStore(this.cupoDescripcionForm, 'fechaInicioVigencia', 'setFechaInicioVigencia');
    this.setValoresStore(this.cupoDescripcionForm, 'fechaFinVigencia', 'setFechaFinVigencia');
    this.setValoresStore(this.cupoDescripcionForm, 'mecanismoAsignacion', 'setMecanismoAsignacion');
    this.setValoresStore(this.cupoDescripcionForm, 'tratado', 'setTratado');
    this.setValoresStore(this.cupoDescripcionForm, 'fraccionesArancelarias', 'setFraccionesArancelarias');
    this.setValoresStore(this.cupoDescripcionForm, 'paisesCupo', 'setPaisesCupo');
    this.setValoresStore(this.cupoDescripcionForm, 'observaciones', 'setObservaciones');
    this.setValoresStore(this.cupoDescripcionForm, 'descripcionFundamento', 'setDescripcionFundamento');

    this.setValoresStore(this.distribucionSaldoForm, 'montoDisponibleAsignacion', 'setMontoDisponibleAsignacion');
  }

  /**
   * Método para agregar un nuevo monto a la tabla.
   * @param valor - El valor a agregar.
   */
  agregar(valor: string): void {
    const MONTO_EXPEDIR_VALOR = parseInt(valor, 10);
    this.cuerpoTabla = [
      ...this.cuerpoTabla,
      { montoExpedir: MONTO_EXPEDIR_VALOR }
    ];
    this.tramite120202Store.setCuerpoTabla(this.cuerpoTabla);
    this.distribucionSaldoForm.get('totalExpedir')?.setValue(valor);
    this.tramite120202Store.setTotalExpedir(MONTO_EXPEDIR_VALOR);
    
    this.distribucionSaldoForm.get('montoExpedir')?.setValue('');
    this.tramite120202Store.setMontoExpedir(null);
  }

  /**
   * Elimina el monto seleccionado de la tabla.
   * @returns {void}
   */
  eliminar(): void {
    if (this.selectedMonto.length > 0) {
      const INDICE = this.cuerpoTabla.findIndex((elemento) =>
        Object.entries(this.selectedMonto[0] || {}).every(
          ([key, value]) => elemento[key as keyof ExpedirMonto] === value
        )
      );
      if (INDICE !== -1) {
        this.cuerpoTabla.splice(INDICE, 1);
        this.tramite120202Store.setCuerpoTabla(this.cuerpoTabla);
      }
      this.selectedMonto = [];
    }
  }  

  /**
   * Método para validar el formulario.
   * @returns boolean
   */
  validarFormulario(): boolean {
    if (this.expedicionCertificadosAsignacionForm.invalid) {
      this.expedicionCertificadosAsignacionForm.markAllAsTouched();
    }
    return this.expedicionCertificadosAsignacionForm.valid;
  }

  /**
   * Establece los valores en el store de tramite120202.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite120202Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite120202Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Se ejecuta al destruir el componente.
   * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}