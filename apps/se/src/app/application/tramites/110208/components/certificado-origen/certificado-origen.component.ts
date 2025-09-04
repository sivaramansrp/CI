import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, ConsultaioState, InputFecha, ModeloDeFormaDinamica, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FECHA_FINAL_110208, FECHA_INICIO_110208, MERCANCIA_MODAL_FORMA } from '@libs/shared/data-access-user/src/tramites/constantes/110208/certificado.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NICO_TABLA, NicoInfo } from '@libs/shared/data-access-user/src/core/models/110208/certificado.model';
import { Solicitud110208State, Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CargaDeMercanciasComponent } from '../cargaDeMercancias/cargaDeMercancias.component';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { InputFechaComponent } from '@libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import Modal from 'bootstrap/js/dist/modal';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';

/**
 * Componente que gestiona el formulario y la lógica del certificado de origen.
 */
@Component({
  selector: 'app-certificado-origen',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputFechaComponent,
    TablaDinamicaComponent,
    CargaDeMercanciasComponent,
    FormasDinamicasComponent
  ],
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.css',
})
export class CertificadoOrigenComponent implements OnInit, OnDestroy {
  /**
   * Indica si se debe mostrar el tercer operador.
   */
  mostrarTercerOperador: boolean = false;
  /**
   * Determina si el formulario debe estar en modo solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Formulario reactivo para gestionar los datos del certificado.
   */
  formCertificado!: FormGroup;

  /**
   * Configuración de las columnas de la tabla NICO.
   */
  nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;

  /**
   * Datos cargados para la tabla NICO.
   */
  nicoTablaDatos: NicoInfo[] = [];

  /**
   * Estado de la solicitud obtenido desde el store.
   */
  public solicitudState!: Solicitud110208State;

  /**
   * Notificador para destruir observables activos y evitar pérdidas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Lista de catálogos de estados.
   */
  estado: Catalogo[] = [];

  /**
   * Lista de catálogos de países.
   */
  public pais: Catalogo[] = [];

  /**
   * Configuración de la fecha de inicio.
   */
  public fechaInicioInput: InputFecha = FECHA_INICIO_110208;

  /**
   * Configuración de la fecha final.
   */
  public fechaFinalInput: InputFecha = FECHA_FINAL_110208;

  /**
   * Referencia al elemento modal en el template
   */
  @ViewChild('modal', { static: false }) modal!: ElementRef;
  /** Almacena el estado actual de la consulta relacionada con el trámite.  
 *  Contiene información necesaria para mostrar o procesar datos en el componente. */
   public consultaState!:ConsultaioState;
  /**
   * Instancia del modal de Bootstrap
   */
  public modalInstance!: Modal;

  /**
 * Formulario reactivo para gestionar los datos del modal de mercancía.
 */
  public modalForma: FormGroup = new FormGroup({});

  /**
 * Datos de configuración para los campos del formulario modal de mercancía.
 */
  public modalFormData = MERCANCIA_MODAL_FORMA;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param service Servicio para validar inicialmente los datos.
   * @param tramite110208Store Store para gestionar el estado del trámite.
   * @param tramite110208Query Query para obtener datos del estado del trámite.
   */
  constructor(
    private readonly fb: FormBuilder,
    private service: ValidarInicalmenteService,
    private tramite110208Store: Tramite110208Store,
    private tramite110208Query: Tramite110208Query,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();       
          this.consultaState = seccionState;
            if (this.consultaState.update) {
            this.obtenerTablaDatosCertificado();
             }
        })
      )
      .subscribe();
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.obtenerEstadoList();
    this.obtenerPaisList();
    this.obtenerUMCList();
    this.obtenerTipoDeFacturaList();
    if (this.esFormularioSoloLectura) {
      this.obtenerTablaDatosCertificado();
    }
  }

  /**
   * Inicializa el formulario con datos del store y aplica validaciones.
   * También aplica configuración de solo lectura si es necesario.
   * @method inicializarEstadoFormulario
   */
  inicializarEstadoFormulario(): void {
    this.tramite110208Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.formCertificado = this.fb.group({
      entidadFederativa: [this.solicitudState?.entidadFederativa, Validators.required],
      bloque: [this.solicitudState?.bloque, Validators.required],
      fraccionArancelariaForm: [this.solicitudState?.fraccionArancelariaForm],
      registroProductoForm: [this.solicitudState?.registroProductoForm],
      nombreComercialForm: [this.solicitudState?.nombreComercialForm],
      fechaInicio: [this.solicitudState?.fechaInicio],
      fechaFinal: [this.solicitudState?.fechaFinal],
      tercerOperador: [this.solicitudState?.tercerOperador]
    });
    if (this.esFormularioSoloLectura) {
      Object.keys(this.formCertificado.controls).forEach((key) => {
        this.formCertificado.get(key)?.disable();
      });      
    }

    if (this.solicitudState?.fechaInicio) {
      this.formCertificado.get('fechaInicio')?.setValue(this.solicitudState?.fechaInicio);
    }

    if (this.solicitudState?.fechaFinal) {
      this.formCertificado.get('fechaFinal')?.setValue(this.solicitudState?.fechaFinal);
    }
  }

  /**
   * Obtiene la lista de estados desde un archivo JSON.
   */
  obtenerEstadoList(): void {
    this.service.obtenerEstadoList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.estado = DATOS;
      });
  }

  /**
   * Obtiene la lista de estados desde un archivo JSON.
   */
  obtenerPaisList(): void {
    this.service.obtenerPaisList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.pais = DATOS;
      });
  }

  /**
   * Obtiene la lista de estados desde un archivo JSON.
   */
  obtenerUMCList(): void {
    this.service.obtenerUMCList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const UMC_FIELD = this.modalFormData.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'umc'
        ) as ModeloDeFormaDinamica;
        if (UMC_FIELD) {
          UMC_FIELD.opciones = data.data.map(
            (item: { id: number; descripcion: string }) => ({
              descripcion: item.descripcion,
              id: item.id,
            })
          );
        }
      });
  }

  /**
   * Obtiene la lista de estados desde un archivo JSON.
   */
  obtenerTipoDeFacturaList(): void {
    this.service.obtenerTipoDeFacturaList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const TIPO_DE_FACTURA_FIELD = this.modalFormData.find(
          (datos: ModeloDeFormaDinamica) => datos.campo === 'tipoDeFactura'
        ) as ModeloDeFormaDinamica;
        if (TIPO_DE_FACTURA_FIELD) {
          TIPO_DE_FACTURA_FIELD.opciones = data.data.map(
            (item: { id: number; descripcion: string }) => ({
              descripcion: item.descripcion,
              id: item.id,
            })
          );
        }
      });
  }
  

  /**
   * Obtiene los datos de la tabla NICO desde el servicio.
   */
  obtenerTablaDatosCertificado(): void {
    this.service.obtenerTablaDatosCertificado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.nicoTablaDatos = DATOS;
      });
  }

  /**
   * Cambia el valor de la fecha final en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha final.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Método del store que se debe invocar.
   */
  public cambioFechaFinal(
    nuevo_valor: string,
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store
  ): void {
    this.formCertificado.get('fechaFinal')?.setValue(nuevo_valor);
    this.formCertificado.get('fechaFinal')?.markAsUntouched();
    const VALOR = form.get(campo)?.value;
    (this.tramite110208Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Cambia el valor de la fecha de inicio en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha de inicio.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Método del store que se debe invocar.
   */
  public cambioFechaInicio(
    nuevo_valor: string,
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store
  ): void {
    this.formCertificado.get('fechaInicio')?.setValue(nuevo_valor);
    this.formCertificado.get('fechaInicio')?.markAsUntouched();
    const VALOR = form.get(campo)?.value;
    (this.tramite110208Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Muestra el tercer operador y actualiza el store.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Método del store que se debe invocar.
   */
  tercerOperador(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store
  ): void {
    if (campo === 'bloque' && form.get('bloque')?.value === '2') {
      this.mostrarTercerOperador = true;
    } else {
      this.mostrarTercerOperador = false;
    }
    const VALOR = form.get(campo)?.value;
    (this.tramite110208Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Establece valores en el store desde el formulario.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo en el formulario.
   * @param metodoNombre Método del store que se debe invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite110208Store
  ): void {
    const VALOR = form.get(campo)?.value;
    if (VALOR && VALOR!== null) {
    (this.tramite110208Store[metodoNombre] as (value: unknown) => void)(VALOR);
    }
  }

  /**
   * Busca y carga las mercancías en la tabla si el campo "bloque" del formulario tiene valor.
   */
  public buscarMercancias(): void {
    if (this.formCertificado.get('bloque')?.value) {
      this.obtenerTablaDatosCertificado(); 
    } else {
      this.formCertificado.get('bloque')?.markAsTouched();
    }
  }

  /**
 * Muestra el modal de detalle cuando se hace clic en una fila de la tabla NICO.
 * @param fila - Fila seleccionada de la tabla NICO.
 */
  public emitirFilaClic(fila: NicoInfo): void {
    if (fila) {
      if (this.modal) {
        this.modalInstance = new Modal(this.modal.nativeElement);
        this.modalInstance.show();
        this.modalForma.patchValue({
          fraccionArancelaria: fila.fraccion_arancelaria,
          nombreComercial: fila.nombre_comercial,
          nombreTecnio: fila.nombre_tecnico,
          nombreEnIngles: fila.nombre_comercial,
          criterioPara: 'B',
        })
      }
    }
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Libera recursos y evita pérdidas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}