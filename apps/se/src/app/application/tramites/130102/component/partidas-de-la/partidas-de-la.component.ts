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
import { AlertComponent, Catalogo, Pedimento, REGEX_NUMERO_DECIMAL_ENTERO, REG_X, TablaDinamicaComponent, TablaSeleccion, TituloComponent, UppercaseDirective } from '@libs/shared/data-access-user/src';
import { MERCANCIA_TABLA, MODIFICAR_PARTIDAS_FORM } from '../../constantes/octava-temporal.enum';
import{ Notificacion, NotificacionesComponent } from '@libs/shared/data-access-user/src';

import { Solicitud130102State, Tramite130102Store } from '../../estados/tramites/tramite130102.store';
import { Subject, map, takeUntil } from 'rxjs'; 
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormularioRegistroService } from '../../services/octava-temporal.service';
import { Modal } from 'bootstrap';
import { TEXTOS } from '@libs/shared/data-access-user/src/tramites/constantes/octava-temporal.enum';
import { Tramite130102Query } from '../../estados/queries/tramite130102.query';
import { CatOctavaTemporalService } from '../../services/cat-octava-temporal.service';
import { Tigies } from '../../models/response/catalogos-response.model';
import { PartidaMercancia } from '../../models/request/regla-octava-request.model';


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
  public seleccionarFilaNotificacion: Notificacion = {
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
  public notificacionEliminacionExitosa: Notificacion = {
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

  public partidasSeleccionadas: PartidaMercancia[] = [];
  public modificarPartidasFormData = MODIFICAR_PARTIDAS_FORM;
  tablaSeleccion = TablaSeleccion;
  configuracionTabla = MERCANCIA_TABLA;

  datosSocios: PartidaMercancia[] = [
    
  ];

  form!: FormGroup;
  formForTotalCount!: FormGroup;
  TEXTOS = TEXTOS;
  fraccionArancelariaTigieData: Tigies[] = [];
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
    private consultaioQuery: ConsultaioQuery,
    private catOctavaTemporalService: CatOctavaTemporalService
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


    this.inicializarEstadoFormulario();
    this.formularioTotalCount();
    this.calculateTotals();

    const PARTIDAS_TABLA = this.solicitudState?.['partidas_tabla'];
    if ((!Array.isArray(PARTIDAS_TABLA) || PARTIDAS_TABLA.length === 0) && this.esFormularioSoloLectura) {

    }

    this.formForTotalCount.controls['cantidadTotal'].disable();
    this.formForTotalCount.controls['valorTotalUSD'].disable();
    this.formularioRegistroService.registrarFormulario('formForTotalCount', this.formForTotalCount);
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130102Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130102Store[metodoNombre] as (value: string | number) => void)(VALOR);
  }

  crearFormulario(): void {
    this.tramite130102Query.selectSeccionState$
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
              const PRODUCTO = this.solicitudState['partidas_tabla'] as PartidaMercancia[];
              PRODUCTO.forEach((productoItem: PartidaMercancia) => {
                const IS_ALREADY_ADDED = this.datosSocios.some(
                (item: PartidaMercancia) => item.cve_fraccion === productoItem.cve_fraccion
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

  onPartidasSeleccion(lista: PartidaMercancia[]): void {
    this.partidasSeleccionadas = [...lista];
    
    if (!this.partidasSeleccionadas.length) {
      return;
    }
    
    const FILA_SELECCIONADA = this.partidasSeleccionadas[0];
    if (FILA_SELECCIONADA) {
      this.modificarPartidaForm?.patchValue({
        modificar_cantidad: FILA_SELECCIONADA.cantidad,
        modificar_descripcion: FILA_SELECCIONADA.descripcion,
        valor_partidas_usd: FILA_SELECCIONADA.importe_partida_total_usd,
        fraccion_partidas: FILA_SELECCIONADA.cve_fraccion,
      });
    }
  }

  calculateTotals(): void {
    const CANTIDAD_TOTAL = this.datosSocios.reduce(
      (sum: number, item: PartidaMercancia) => sum + Number(item.cantidad || 0), 0
    );
    const VALOR_TOTAL_USD = this.datosSocios.reduce(
      (sum: number, item: PartidaMercancia) => sum + Number(item.importe_partida_total_usd || 0), 0
    );

    this.formForTotalCount.patchValue({
      cantidadTotal: CANTIDAD_TOTAL,
      valorTotalUSD: VALOR_TOTAL_USD
    });
    this.tramite130102Store.setcantidadTotal( CANTIDAD_TOTAL);
    this.tramite130102Store.setvalorTotalUSD( VALOR_TOTAL_USD + "");
  }

  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [this.solicitudState?.cantidadTotal, { disabled: true }],
      valorTotalUSD: [this.solicitudState?.valorTotalUSD, { disabled: true }],
    });
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
      const FRACCION_ARANCELARIA = this.form.get('fraccionArancelariaTIGIE_TIGIE')?.value;
      const DESCRIPCION = this.form.get('descripcion')?.value;
      const ITEM_EXISTS = this.datosSocios.some(item => 
        item.cve_fraccion === FRACCION_ARANCELARIA &&
        item.descripcion === DESCRIPCION
      );

      if (ITEM_EXISTS) {
       return;
      }

      const NUEVO_PRODUCTO: PartidaMercancia = {
        cantidad: CANTIDAD,
        descripcion: DESCRIPCION,
        valor_autorizado: VALOR_PARTIDA,
        cve_fraccion: FRACCION_ARANCELARIA,
        importe_Unitario: VALOR_PARTIDA / CANTIDAD,
        importe_partida_total_usd: VALOR_PARTIDA,
      };
      this.datosSocios = [...this.datosSocios, NUEVO_PRODUCTO];
      this.tramite130102Store.setPartidasTabla('partidas_tabla', this.datosSocios);
      this.calculateTotals();
      this.form.reset();
      } else {
      
      this.form.markAllAsTouched();
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
  /**
   *  Método que se ejecuta al perder el foco del campo de fracción arancelaria TIGIE.
   *  Obtiene los datos relacionados con la fracción arancelaria TIGIE y los asigna al formulario.
   */

  onBlurFraccionArancelaria(): void {
    const CVE_FRACCION = this.form.get('fraccionArancelariaTIGIE')?.value;
    if (CVE_FRACCION) {
      this.catOctavaTemporalService.getTigieFraccion(CVE_FRACCION).subscribe((data) => {
        if (data && data.datos && data.datos.length > 0) {
          this.fraccionArancelariaTigieData = data.datos;

        }
      });
    }
  }


  guardarEdicion(): void {
    if (this.partidasSeleccionadas.length) {
      const INDEX = this.datosSocios.findIndex((item) => 
        item.cve_fraccion === this.partidasSeleccionadas[0].cve_fraccion &&
        item.cantidad === this.partidasSeleccionadas[0].cantidad &&
        item.descripcion === this.partidasSeleccionadas[0].descripcion &&
        item.importe_partida_total_usd === this.partidasSeleccionadas[0].importe_partida_total_usd
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

    PARTIDAS_A_ELIMINAR.forEach((elementoAEliminar: PartidaMercancia) => {
      const INDICE = this.datosSocios.findIndex((item) =>
        item.cve_fraccion === elementoAEliminar.cve_fraccion &&
        item.cantidad === elementoAEliminar.cantidad &&
        item.descripcion === elementoAEliminar.descripcion &&
        item.importe_partida_total_usd === elementoAEliminar.importe_partida_total_usd
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

  // Add this method to check if the entire form is valid
  get isFormValid(): boolean {
    return this.form.valid;
  }
}