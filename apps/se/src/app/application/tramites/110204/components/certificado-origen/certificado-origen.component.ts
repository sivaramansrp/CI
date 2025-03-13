import { Catalogo, CatalogoSelectComponent, InputFecha, InputFechaComponent, SeccionLibQuery, SeccionLibState, SeccionLibStore, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, delay, map, takeUntil, tap } from 'rxjs';
import { CONFIGURACION_MERCANCIA } from '../../constantes/modificacion.enum';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { Mercancia } from '../../models/plantas-consulta.model';
import { ToastrService } from 'ngx-toastr';
import { Tramite110204Query } from '../../estados/tramite110204.query';
import { Tramite110204Store } from '../../estados/tramite110204.store';

export const FECHA_INICIO = {
  labelNombre: 'Fecha inicio',
  required: true,
  habilitado: true,
};

export const FECHA_FINAL = {
  labelNombre: 'Fecha fin',
  required: true,
  habilitado: true,
};

@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CommonModule,
    TablaDinamicaComponent,
    InputFechaComponent,
  ],
  providers: [ToastrService],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
})
export class CertificadoOrigenComponent implements OnInit, OnDestroy {
  formCertificado!: FormGroup;
  public fechaInicioInput: InputFecha = FECHA_INICIO;
  public fechaFinalInput: InputFecha = FECHA_FINAL;

  /**
   * Lista de catálogos que representan los estados.
   * @type {Observable<Catalogo[]>}
   */
  estados$!: Observable<Catalogo[]>;

  /**
   * Estado seleccionado.
   * @type {Catalogo}
   */

  /**
   * @observable
   * @name pais$
   * @type {Observable<Catalogo[]>}
   * @description
   * Observable que emite una lista de objetos de tipo Catalogo,
   * representando los países y bloques disponibles.
   */
  pais$!: Observable<Catalogo[]>;

  estado!: Catalogo;
  paisBloque!: Catalogo;
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de las columnas de la tabla que muestra la bitácora.
   * @type {ConfiguracionColumna<Mercancia>[]}
   */
  configuracionTabla: ConfiguracionColumna<Mercancia>[] =
    CONFIGURACION_MERCANCIA;

  /**
   * Datos de la bitácora obtenidos desde el servicio.
   * @type {Mercancia[]}
   */
  datos: Mercancia[] = [];


  /**
   * Datos de ejemplo basados en la interfaz Mercancia.
   * @type {Observable<Mercancia[]>}
   */
  datos1$: Observable<Mercancia[]>;

  /**
     * Selección de la tabla inicializada como indefinida.
     * @type {TablaSeleccion}
     */
  seleccionTabla = TablaSeleccion.UNDEFINED;
  private seccion!: SeccionLibState;

  constructor(
    private fb: FormBuilder,
    private store: Tramite110204Store,
    public tramiteQuery: Tramite110204Query,
    public certificadoService: CertificadosOrigenGridService,
    private toastr: ToastrService,
    private seccionQuery: SeccionLibQuery, private seccionStore: SeccionLibStore
  ) {

    this.formCertificado = this.fb.group({
      entidadFederativa: ['', [Validators.required, Validators.min(0)]],
      bloque: ['', [Validators.required, Validators.min(0)]],
      tercerOperador: ['', [Validators.requiredTrue]],
      fracciónArancelariaForm: ['', [Validators.required]],
      registroProductoForm: ['', [Validators.required]],
      nombreComercialForm: ['', [Validators.required]],
    });

    this.tramiteQuery.formCertificado$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe(estado => {
      if (estado) {
        this.formCertificado.patchValue(estado);
      }
    });
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();


    this.estados$ = this.tramiteQuery.selectAltaPlanta$;
    this.pais$ = this.tramiteQuery.selectPaisBloque$;
    this.datos1$ = this.tramiteQuery.selectBuscarMercancia$;
  }
  esFormValido(): boolean {
    // eslint-disable-next-line guard-for-in
    for (const NOMBRE_DEL_CONTROL in this.formCertificado.controls) {
      const CONTROL = this.formCertificado.get(NOMBRE_DEL_CONTROL);
      if (CONTROL && CONTROL.enabled && CONTROL.invalid) {
        return false;
      }
    }
    return true;
  }
  ngOnInit(): void {
    this.cargarEstados();
    this.cargarBloque();
    this.validarFormulario();
    this.formCertificado.valueChanges.subscribe(value => {
      this.store.setFormCertificado(value);
    });
  
  }
  /**
   * Establece el estado en el almacén (store) con el valor proporcionado.
   *
   * @param {Catalogo} estado - El estado que se desea establecer en el almacén. Este parámetro debe ser de tipo `Catalogo`.
   *
   * @returns {void} - No devuelve ningún valor.
   */
  cargarEstados(): void {
    this.certificadoService
      .obtenerListaEstado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setaltaPlanta(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }

  validarFormulario(): void {
    this.formCertificado.statusChanges
    .pipe(
      takeUntil(this.destroyNotifier$),
      delay(10),
      tap((_value) => {
        const SECCION: number = 1;
        const FORMAS_VALIDADAS = this.seccion.formaValida;
        const ES_VALIDO_EL_FORM = this.esFormValido();
        
        if (this.formCertificado.valid || (ES_VALIDO_EL_FORM)) {
          FORMAS_VALIDADAS[SECCION] = true;
          this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
        } else {
          FORMAS_VALIDADAS[SECCION] = false;
          this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
        }
      })
    )
    .subscribe();
  }
  cargarBloque(): void {
    this.certificadoService
      .obtenerPaísBloque()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (data: Catalogo[]) => {
          this.store.setBloque(data);
        },
        (error) => {
          console.error('Error al cargar los estados:', error);
        }
      );
  }
  tipoEstadoSeleccion(estado: Catalogo): void {
    this.store.setEstado(estado);
  }
  tipoSeleccion(estado: Catalogo): void {
    this.store.setBloque([estado]);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Getter para obtener el control del formulario de la entidad federativa.
   * @returns {FormControl} El control para la entidad federativa.
   */
  get formularioControl(): FormControl {
    return this.formCertificado.get('') as FormControl;
  }

  buscarrMercancia(): void {
    const ENTIDAD = this.formCertificado?.value;

    if (ENTIDAD && ENTIDAD !== '-1') {
      this.certificadoService
        .obtenerMercancia()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe(
          (data: Mercancia[]) => {
            this.store.setbuscarMercancia(data);
          },
          () => {
            this.toastr.error('Error al buscar Mercancia');
          }
        );
    } else {
      // Maneja el caso donde la selección de la entidad no es válida.
      this.toastr.error('Seleccione una entidad federativa válida.');
    }
  }

  public cambioFechaInicio(nuevo_valor: string): void {
    this.formCertificado.get('fechaInicio')?.setValue(nuevo_valor);
    this.formCertificado.get('fechaInicio')?.markAsUntouched();
  }

  public cambioFechaFinal(nuevo_valor: string): void {
    this.formCertificado.get('fechaFinal')?.setValue(nuevo_valor);
    this.formCertificado.get('fechaFinal')?.markAsUntouched();
  }
}
