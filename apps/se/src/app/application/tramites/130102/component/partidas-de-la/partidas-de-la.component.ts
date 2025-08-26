/**
 * @file PartidasDeLaComponent
 * @description Componente Angular para gestionar las partidas de mercancía en un trámite específico.
 */

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertComponent, Catalogo, Pedimento, REGEX_NUMERO_DECIMAL_ENTERO, REG_X, TablaDinamicaComponent, TablaSeleccion, TituloComponent, UppercaseDirective, NotificacionesComponent } from '@libs/shared/data-access-user/src';
import { MERCANCIA_TABLA, MODIFICAR_PARTIDAS_FORM } from '../../constantes/octava-temporal.enum';
import { Solicitud130102State, Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Subject, map, takeUntil } from 'rxjs'; 
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormularioRegistroService } from '../../services/octava-temporal.service';
import { Modal } from 'bootstrap';
import { OctavaTemporal } from '../../models/octava-temporal.model';
import { TEXTOS } from '@libs/shared/data-access-user/src/tramites/constantes/octava-temporal.enum';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';


/**
 * Clase PartidasDeLaComponent
 * @description Componente Angular para gestionar las partidas de mercancía en un trámite específico.
 */
@Component({
  selector: 'app-partidas-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    UppercaseDirective,
    AlertComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    FormasDinamicasComponent,
    NotificacionesComponent // Add this import
  ],
  templateUrl: './partidas-de-la.component.html',
  styleUrl: './partidas-de-la.component.scss',
})
/**
 * * Componente para gestionar las partidas de mercancía en un trámite específico.
 */

export class PartidasDeLaComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Controla la visibilidad del modal de confirmación para eliminar.
   */
  public confirmacionAlerta: boolean = false;

  /**
   * @property {boolean} mostrarNotificacion
   * Controla la visibilidad del modal de notificación de eliminación exitosa.
   */
  public mostrarNotificacion: boolean = false;

  /**
   * @description
   * Objeto que representa una notificación para confirmación de eliminación.
   */
  public seleccionarFilaNotificacion: any = {
    tipoNotificacion: 'alert',
    categoria: 'danger',
    modo: 'action',
    titulo: '',
    mensaje: '¿Estás seguro que deseas eliminar los registros seleccionados?',
    cerrar: true,
    tiempoDeEspera: 2000,
    txtBtnAceptar: 'Aceptar',
    txtBtnCancelar: 'Cancelar',
  };

  /**
   * @property notificacionEliminacionExitosa
   * Configuración para el modal de eliminación exitosa.
   */
  public notificacionEliminacionExitosa: any = {
    tipoNotificacion: 'alert',
    categoria: 'success',
    modo: 'info',
    titulo: '',
    mensaje: 'Los registros fueron eliminados correctamente',
    cerrar: true,
    tiempoDeEspera: 3000,
    txtBtnAceptar: 'Aceptar',
    txtBtnCancelar: '',
  };

  @ViewChild('cargarArchivoModal', { static: false }) cargarArchivoModal!: ElementRef;
  @ViewChild('modalConfirmacionRef') modalConfirmacionRef!: ElementRef;
  @ViewChild('modalEditarRef') modalEditarRef!: ElementRef;

  private cargarArchivoInstance!: Modal;
  private modalEditar!: Modal;

  public archivoFormGroup: FormGroup = new FormGroup({
    archivo: new FormControl(''),
  });

  public partidasSeleccionadas: OctavaTemporal[] = [];
  public modificarPartidasFormData = MODIFICAR_PARTIDAS_FORM;
  tablaSeleccion = TablaSeleccion;
  configuracionTabla = MERCANCIA_TABLA;

  datosSocios: OctavaTemporal[] = [
    {
      cantidad: 10,
      unidadDeMedida: 'kg',
      fraccionArancelaria: '0101.21.01',
      descripción: 'Producto de ejemplo',
      colonia: 'Centro',
      precioUnitarioUSD: '15.50',
      totalUsd: 155
    },
  ];

  form!: FormGroup;
  formForTotalCount!: FormGroup;
  TEXTOS = TEXTOS;
  fraccionArancelariaTIGIE: Catalogo[] = [];
  tableBodyData: { tbodyData: string[] }[] = [];
  public solicitudState!: Solicitud130102State;
  private destroyNotifier$: Subject<void> = new Subject();
  esFormularioSoloLectura: boolean = false;
  pedimentos: Array<Pedimento> = [];
  elementoParaEliminar!: number;

  constructor(
    private fb: FormBuilder,
    private tramite130102Store: Tramite130102Store,
    private tramite130102Query: Tramite130102Query,
    private formularioRegistroService: FormularioRegistroService,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormulario();
    }
  }

  guardarDatosFormulario(): void {
    this.crearFormulario();
    if (this.esFormularioSoloLectura) {
      this.form.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.form.enable();
    } 
  }

  ngOnInit(): void {
    this.formularioRegistroService.getFraccionArancelariaTIGIE().pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.fraccionArancelariaTIGIE = data;
    });

    this.inicializarEstadoFormulario();
    this.formularioTotalCount();
    this.calculateTotals();

    const PARTIDAS_TABLA = this.solicitudState?.['partidas_tabla'];
    if ((!Array.isArray(PARTIDAS_TABLA) || PARTIDAS_TABLA.length === 0) && this.esFormularioSoloLectura) {
      this.formularioRegistroService.getPartidasFromJson().pipe(takeUntil(this.destroyNotifier$)).subscribe(partidas => {
        this.datosSocios = partidas;
        this.tramite130102Store.setPartidasTabla('partidas_tabla', this.datosSocios);
      });
    }

    this.formForTotalCount.controls['cantidadTotal'].disable();
    this.formForTotalCount.controls['valorTotalUSD'].disable();
    this.formularioRegistroService.registrarFormulario('form', this.form);
    this.formularioRegistroService.registrarFormulario('formForTotalCount', this.formForTotalCount);
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130102Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130102Store[metodoNombre] as (value: string | number) => void)(VALOR);
  }

  crearFormulario(): void {
    this.tramite130102Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {  
          this.solicitudState = seccionState;
          if (
              this.solicitudState &&
              typeof this.solicitudState === 'object' &&
              this.solicitudState !== null &&
              'partidas_tabla' in this.solicitudState
            ) {
              const PRODUCTO = this.solicitudState['partidas_tabla'] as OctavaTemporal[];
              PRODUCTO.forEach((productoItem: OctavaTemporal) => {
                const IS_ALREADY_ADDED = this.datosSocios.some(
                (item: OctavaTemporal) => item.fraccionArancelaria === productoItem.fraccionArancelaria
              );

              if (!IS_ALREADY_ADDED) {
                this.datosSocios.push(productoItem);
              }
              });
            }
        })
      )
      .subscribe();

    this.form = this.fb.group({
      cantidad: [
        this.solicitudState?.cantidadPartidas,
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(18),
          PartidasDeLaComponent.noLeadingSpacesValidator,
        ],
      ],
      fraccionArancelariaTIGIE: [this.solicitudState?.fraccionArancelariaTIGIE, [Validators.required, Validators.pattern(REG_X.REGEX_FRACCION_ARANCELARIA), PartidasDeLaComponent.noLeadingSpacesValidator]],
      fraccionArancelariaTIGIE_TIGIE: [this.solicitudState?.fraccionArancelariaTIGIE_TIGIE, [Validators.required]],
      descripcion: [this.solicitudState?.descripcionPartidas, [Validators.required, Validators.maxLength(255), PartidasDeLaComponent.noLeadingSpacesValidator,]],
      valorPartidaUSD: [
        this.solicitudState?.valorPartidaUSD,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(REGEX_NUMERO_DECIMAL_ENTERO),
          Validators.maxLength(20)
        ],
      ],
      modificarPartidaForm: this.fb.group({
        modificar_cantidad: [''],
        modificar_descripcion: [''],
        valor_partidas_usd: [''],
        fraccion_partidas: [''],
      }),
    });

    if (this.esFormularioSoloLectura) {
      this.form.disable();
    }
  }

  get modificarPartidaForm(): FormGroup {
    return this.form.get('modificarPartidaForm') as FormGroup;
  }

  ngAfterViewInit(): void {
    if (this.cargarArchivoModal) {
      this.cargarArchivoInstance = new Modal(this.cargarArchivoModal.nativeElement);
    }

    if (this.modalEditarRef) {
      this.modalEditar = new Modal(this.modalEditarRef.nativeElement);
    }
  }

  onPartidasSeleccion(lista: OctavaTemporal[]): void {
    this.partidasSeleccionadas = [...lista];
    
    if (!this.partidasSeleccionadas.length) {
      return;
    }
    
    const FILA_SELECCIONADA = this.partidasSeleccionadas[0];
    if (FILA_SELECCIONADA) {
      this.modificarPartidaForm?.patchValue({
        modificar_cantidad: FILA_SELECCIONADA.cantidad,
        modificar_descripcion: FILA_SELECCIONADA.descripción,
        valor_partidas_usd: FILA_SELECCIONADA.totalUsd,
        fraccion_partidas: FILA_SELECCIONADA.fraccionArancelaria,
      });
    }
  }

  calculateTotals(): void {
    const CANTIDAD_TOTAL = this.datosSocios.reduce(
      (sum: number, item: OctavaTemporal) => sum + Number(item.cantidad || 0), 0
    );
    const VALOR_TOTAL_USD = this.datosSocios.reduce(
      (sum: number, item: OctavaTemporal) => sum + Number(item.totalUsd || 0), 0
    );

    this.formForTotalCount.patchValue({
      cantidadTotal: CANTIDAD_TOTAL,
      valorTotalUSD: VALOR_TOTAL_USD
    });
  }

  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [this.solicitudState?.cantidadTotal, { disabled: true }],
      valorTotalUSD: [this.solicitudState?.valorTotalUSD, { disabled: true }],
    });
  }


 fraccionArancelariaTIGIESelection(): void {
    // Implement if needed
  }

  /**
   * Validates and submits the form
   */
  validarYEnviarFormulario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this.agregar();
    }
  }

  public agregar(): void {
    if (this.form.valid) {
      const VALOR_PARTIDA = Number(this.form.get('valorPartidaUSD')?.value || 0);
      const CANTIDAD = Number(this.form.get('cantidad')?.value || 0);

      const PRODUCTOS = {
        cantidad: CANTIDAD,
        unidadDeMedida: 'kg',
        fraccionArancelaria: this.form.get('fraccionArancelariaTIGIE')?.value,
        descripción: this.form.get('descripcion')?.value,
        colonia: 'Centro',
        precioUnitarioUSD: VALOR_PARTIDA.toString(),
        totalUsd: VALOR_PARTIDA * CANTIDAD
      };
      this.datosSocios = [...this.datosSocios, PRODUCTOS];
      this.tramite130102Store.setPartidasTabla('partidas_tabla', this.datosSocios);
      this.calculateTotals();
      this.form.reset();      
    }
  }

  /**
   * Opens the edit modal for the selected partida
   */
  abrirModalEditar(): void {
    if (this.partidasSeleccionadas.length > 0) {
      this.modalEditar?.show();
    }
  }

  guardarEdicion(): void {
    if (this.partidasSeleccionadas.length) {
      const INDEX = this.datosSocios.findIndex((item) => 
        item.fraccionArancelaria === this.partidasSeleccionadas[0].fraccionArancelaria &&
        item.cantidad === this.partidasSeleccionadas[0].cantidad &&
        item.descripción === this.partidasSeleccionadas[0].descripción &&
        item.totalUsd === this.partidasSeleccionadas[0].totalUsd
      );
      
      if (INDEX !== -1) {
        const VALOR_PARTIDA = Number(this.modificarPartidaForm.get('valor_partidas_usd')?.value || 0);
        const CANTIDAD = Number(this.modificarPartidaForm.get('modificar_cantidad')?.value || 0);
        
        this.datosSocios = this.datosSocios.map((item, index) => {
          if (index === INDEX) {
            return {
              ...item,
              cantidad: CANTIDAD,
              descripción: this.modificarPartidaForm.get('modificar_descripcion')?.value,
              totalUsd: VALOR_PARTIDA,
              fraccionArancelaria: this.modificarPartidaForm.get('fraccion_partidas')?.value,
              precioUnitarioUSD: CANTIDAD > 0 ? (VALOR_PARTIDA / CANTIDAD).toString() : '0'
            };
          }
          return item;
        });
        
        this.tramite130102Store.setPartidasTabla('partidas_tabla', this.datosSocios);
        this.calculateTotals();
      }
      this.modalEditar?.hide();
      this.partidasSeleccionadas = [];
    }
  }

  /**
   * Opens the file upload modal
   */
  cargarArchivo(): void {
    this.cargarArchivoInstance?.show();
  }

  /**
   * Closes the file upload modal
   */
  cerrar(): void {
    this.cargarArchivoInstance?.hide();
  }

  establecerCambioDeValor(event: { campo: string; valor: string }): void {
    this.tramite130102Store.setDynamicFieldValue(event.campo, event.valor);
  }

  eliminar(): void {
    if (this.partidasSeleccionadas.length) {
      this.confirmacionAlerta = true;
    } else {
      const MODAL = new Modal(this.modalConfirmacionRef.nativeElement);
      MODAL.show();
    }
  }

  /**
   * Method that actually performs the deletion after confirmation
   */
  private eliminarRegistrosConfirmados(): void {
    if (this.partidasSeleccionadas.length === 0) {
      return;
    }

    const PARTIDAS_A_ELIMINAR = [...this.partidasSeleccionadas];

    PARTIDAS_A_ELIMINAR.forEach((elementoAEliminar: OctavaTemporal) => {
      const INDICE = this.datosSocios.findIndex((item) =>
        item.fraccionArancelaria === elementoAEliminar.fraccionArancelaria &&
        item.cantidad === elementoAEliminar.cantidad &&
        item.descripción === elementoAEliminar.descripción &&
        item.totalUsd === elementoAEliminar.totalUsd
      );
      if (INDICE !== -1) {
        this.datosSocios.splice(INDICE, 1);
      }
    });
    
    this.datosSocios = [...this.datosSocios];
    this.tramite130102Store.setPartidasTabla('partidas_tabla', this.datosSocios);
    this.calculateTotals();
    this.partidasSeleccionadas = [];
  }

  /**
   * Handles the confirmation of deletion - SINGLE IMPLEMENTATION
   */
  confirmarEliminacionSustancias(borrar: boolean): void {
    this.confirmacionAlerta = false;
    
    if (borrar) {
      this.eliminarRegistrosConfirmados();
      this.mostrarNotificacion = true;
    }
  }

  /**
   * Closes the success notification modal
   */
  cerrarNotificacionEliminacion(_evento: boolean): void {
    this.mostrarNotificacion = false;
  }

  /**
   * Confirms pedimento deletion
   */
  eliminarPedimentoConfirmacion(borrar: boolean): void {
    this.confirmacionAlerta = false;
    if (borrar && this.pedimentos.length > 0) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  static noLeadingSpacesValidator(control: AbstractControl): ValidationErrors | null {
    const VALUE = control.value;
    if (VALUE && typeof VALUE === 'string' && VALUE.startsWith(' ')) {
      return { leadingSpaces: true };
    }
    return null;
  }

  esInvalido(campo: string): boolean {
    const CONTROL = this.form.get(campo);
    return Boolean(CONTROL && CONTROL.invalid && (CONTROL.dirty || CONTROL.touched));
  }
}