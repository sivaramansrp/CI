import { Catalogo,ConsultaioQuery,TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { Observable,Subject,map} from 'rxjs';
import { AlertComponent } from '@ng-mf/data-access-user';
import { AsignacionDirectaCupoPersonasFisicasPrimeraVezService } from '../../services/asignacion-directa-cupo-personas-fisicas-primera-vez.service';
import { CONFIGURACION_CUPOS_DISPONIBLES_TABLA } from '../../constants/asignacion-directa-cupo.enums';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '../../models/configuracio-columna.model';
import { DescripcionDelCupoComponent } from '../descripcion-del-cupo/descripcion-del-cupo.component';
import { NgIf } from '@angular/common';
import { SeleccionDelCupoTabla } from '../../models/asignacion-directa-cupo.model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { Tramite120401Query } from '../../estados/queries/tramite120401.query';
import { Tramite120401Store } from '../../estados/tramites/tramite120401.store';
import { takeUntil } from 'rxjs';

/**
 * Componente para la selección del cupo en el sistema.
 * Permite seleccionar régimen aduanero, tratado comercial, producto y subproducto.
 */
@Component({
  selector: 'app-seleccion-del-cupo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    NgIf,
    TablaDinamicaComponent,
    AlertComponent,
    DescripcionDelCupoComponent,
  ],
  templateUrl: './seleccion-del-cupo.component.html',
  styleUrls: ['./seleccion-del-cupo.component.scss'],
})

/**
 * Componente para la selección del cupo en el sistema.
 * Permite seleccionar régimen aduanero, tratado comercial, producto y subproducto.
 */
export class SeleccionDelCupoComponent implements OnInit, OnDestroy {
  /**
   * Indica si se debe mostrar la descripción del cupo.
   * Esta propiedad controla la visibilidad de la sección
   * que muestra información adicional sobre el cupo seleccionado.
   */
  mostrarDescripcionDelCupo = false;
  /**
   * Representa la fila seleccionada en la tabla de selección del cupo.
   * Puede ser un objeto de tipo `SeleccionDelCupoTabla` o `null` si no hay ninguna fila seleccionada.
   */
  filaSeleccionada: SeleccionDelCupoTabla | null = null;
  /**
   * Indica si la descripción del elemento es visible o no.
   *
   * @type {boolean}
   * @default false
   */
  DescipcionDelVisible = false;

  /**
   * Configuración para la tabla que muestra los cupos disponibles.
   * Esta propiedad es un arreglo de configuraciones de columnas, donde cada columna
   * está definida por la interfaz `ConfiguracionColumna` y adaptada al modelo de datos
   * `SeleccionDelCupoTabla`.
   *
   * La configuración se inicializa con los ajustes predefinidos de
   * `CONFIGURACION_CUPOS_DISPONIBLES_TABLA`.
   */
  configuracionTabla: ConfiguracionColumna<SeleccionDelCupoTabla>[] =
    CONFIGURACION_CUPOS_DISPONIBLES_TABLA;

  /**
   * Arreglo que contiene los datos de la tabla de selección del cupo.
   * Cada elemento del arreglo es de tipo `SeleccionDelCupoTabla`.
   */
  datos: SeleccionDelCupoTabla[] = [];
  /**
   * Formulario reactivo para la selección del cupo.
   */
  seleccionForm!: FormGroup;

  /**
   * Lista de opciones para el campo de régimen aduanero.
   */
  regimen: Catalogo[] = [];

  /**
   * Lista de opciones para el campo de tratado o bloque comercial.
   */
  tratado: Catalogo[] = [];

  /**
   * Lista de opciones para el campo de nombre de producto.
   */
  producto: Catalogo[] = [];

  /**
   * Lista de opciones para el campo de nombre de subproducto.
   */
  subproducto: Catalogo[] = [];

  /**
   * Datos de la selección del cupo obtenidos desde el servicio.
   */
  seleccionDelCupo: Catalogo[] = [];

  /**
   * Observable para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

     /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @property {Observable<Catalogo | null>} regimen$
   * Observable que emite el valor actual del régimen seleccionado en el estado.
   */
  regimen$: Observable<Catalogo | null> = this.tramite120401Query.regimen$;

  /**
   * @property {Observable<Catalogo | null>} tratado$
   * Observable que emite el valor actual del tratado seleccionado en el estado.
   */
  tratado$: Observable<Catalogo | null> = this.tramite120401Query.tratado$;

  /**
   * @property {Observable<Catalogo | null>} producto$
   * Observable que emite el valor actual del producto seleccionado en el estado.
   */
  producto$: Observable<Catalogo | null> = this.tramite120401Query.producto$;

  /**
   * @property {Observable<Catalogo | null>} subproducto$
   * Observable que emite el valor actual del subproducto seleccionado en el estado.
   */
  subproducto$: Observable<Catalogo | null> =
    this.tramite120401Query.subproducto$;

  /**
   * Constructor del componente.
   * @param fb - Servicio de FormBuilder para manejar formularios reactivos.
   * @param service - Servicio para obtener la selección del cupo desde el backend.
   */
  constructor(
    private fb: FormBuilder,
    private service: AsignacionDirectaCupoPersonasFisicasPrimeraVezService,
    private tramite120401Store: Tramite120401Store,
    private tramite120401Query: Tramite120401Query,
    private consultaQuery: ConsultaioQuery,
  ) {
    this.service.obtenerRespuestaPorUrl('datos', '/120401/asignacion.json');
    this.tramite120401Query.tramiteState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        this.datos = state.datos;
      });
  }

  /**
   * Método de ciclo de vida de Angular: Se ejecuta cuando el componente es inicializado.
   * Inicializa el formulario y carga los datos de la selección del cupo.
   */
  ngOnInit(): void {
    this.initializeForm();
    this.loadSeleccionDelCupo();
    this.loadRegimen();
    this.loadTratado();
    this.loadProducto();

    this.tramite120401Query.tramiteState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state) => {
        if (state) {
          this.seleccionForm.patchValue({
            regimen: state.regimen,
            tratado: state.tratado,
            producto: state.producto,
            subproducto: state.subproducto,
          });
        }
      });

      
            this.consultaQuery.selectConsultaioState$
            .pipe(
              takeUntil(this.destroyed$),
              map((seccionState) => {
                this.esFormularioSoloLectura = seccionState.readonly;
                this.inicializarEstadoFormulario();
              })
            )
            .subscribe();
  }

   
        /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
     inicializarEstadoFormulario(): void {
      if(!this.seleccionForm){
        this.initializeForm();
      }
      if (this.esFormularioSoloLectura) {
          this.seleccionForm.disable();
      }
    }

  /**
   * Método de ciclo de vida de Angular: Se ejecuta cuando el componente es destruido.
   * Libera recursos y evita fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Inicializa el formulario de selección del cupo con validaciones requeridas.
   */
  private initializeForm(): void {
    this.seleccionForm = this.fb.group({
      regimen: ['', Validators.required],
      tratado: ['', Validators.required],
      producto: ['', Validators.required],
      subproducto: ['', Validators.required],
    });
  }

  /**
   * Maneja el cambio en el campo de régimen aduanero.
   * @param event - Evento de cambio.
   */
  loadRegimen(): void {
    this.service
      .getRegimen()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.regimen = data;
      });
  }

  /**
   * Maneja el cambio en el campo de tratado o bloque comercial.
   * @param event - Evento de cambio.
   */
  loadTratado(): void {
    this.service
      .getTratado()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.tratado = data;
      });
  }

  /**
   * Maneja el cambio en el campo de nombre del producto.
   * @param event - Evento de cambio.
   */
  loadProducto(): void {
    this.service
      .getProducto()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.producto = data;
        this.subproducto = data;
      });
  }

  /**
   * Maneja el cambio en el campo de nombre del subproducto.
   * @param event - Evento de cambio.
   */

  /**
   * Carga los datos de la selección del cupo desde el servicio.
   * Los datos obtenidos se asignan a la variable `seleccionDelCupo`.
   */
  loadSeleccionDelCupo(): void {
    this.service
      .getSeleccionDelCupo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.seleccionDelCupo = data;
      });
  }

  /**
   * Obtiene el valor seleccionado del campo de régimen aduanero y lo establece en el store.
   */
  getRegimen(): void {
    const SELECTED_REGIMEN = this.seleccionForm.get('regimen')?.value;
    this.tramite120401Store.setRegimen(SELECTED_REGIMEN);
  }

  /**
   * Obtiene el valor seleccionado del campo de tratado comercial y lo establece en el store.
   */
  getTratado(): void {
    const SELECTED_TRATADO = this.seleccionForm.get('tratado')?.value;
    this.tramite120401Store.setTratado(SELECTED_TRATADO);
  }

  /**
   * Obtiene el valor seleccionado del campo de producto y lo establece en el store.
   */
  obtenerValorProducto(): void {
    const SELECTED_PRODUCTO = this.seleccionForm.get('producto')?.value;
    this.tramite120401Store.setProducto(SELECTED_PRODUCTO);
  }

  /**
   * Obtiene el valor seleccionado del campo de subproducto y lo establece en el store.
   */
  getSubproducto(): void {
    const SELECTED_SUBPRODUCTO = this.seleccionForm.get('subproducto')?.value;
    this.tramite120401Store.setSubproducto(SELECTED_SUBPRODUCTO);
  }

  /**
   * Maneja la selección de una fila en la tabla de selección del cupo.
   *
   * @param fila - Objeto de tipo `SeleccionDelCupoTabla` que representa la fila seleccionada.
   *
   * Este método actualiza la propiedad `filaSeleccionada` con la fila proporcionada
   * y alterna el estado de visibilidad de la descripción del cupo mediante la propiedad
   * `mostrarDescripcionDelCupo`.
   */
  listaDeFilaSeleccionada(fila: SeleccionDelCupoTabla): void {
    this.filaSeleccionada = fila;
    this.mostrarDescripcionDelCupo = !this.mostrarDescripcionDelCupo;
  }
}
