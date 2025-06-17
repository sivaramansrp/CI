import {
  Catalogo,
  CatalogoSelectComponent,
  InputFechaComponent,
  TableComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  INPUT_FECHA_FIN,
  INPUT_FECHA_INICIO,
} from '../../constantes/expedicion-certificados-frontera.enum';
import {
  MontoExpedirTablaDatos,
  TablaDatos,
} from '../../models/expedicion-certificados-frontera.models';
import { Solicitud120702State, Tramite120702Store } from '../../estados/tramite120702.store';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DescripcionCupoComponent } from '../descripcion-cupo/descripcion-cupo.component';
import { ExpedicionCertificadosFronteraService } from '../../services/expedicion-certificados-frontera.service';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { Tramite120702Query } from '../../estados/tramite120702.query';

/**
 * Componente responsable de la sección de asignación de expedición de certificados.
 * 
 * Maneja el formulario de datos de oficio y monto, y realiza operaciones sobre la tabla
 * de montos a expedir. Se comunica con el store del trámite 120702 y un servicio de datos estáticos.
 */
@Component({
  selector: 'app-expedicion-asignacion',
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    DescripcionCupoComponent,
    InputFechaComponent,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TableComponent,
  ],
  templateUrl: './expedicion-asignacion.component.html',
  styleUrl: './expedicion-asignacion.component.scss',
})
export class ExpedicionAsignacionComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo que contiene los campos del formulario de asignación.
   */
  public asignacionForm!: FormGroup;

  /**
   * Subject utilizado para destruir suscripciones al destruir el componente.
   */
  private destroy$ = new Subject<void>();

  /**
   * Valor por defecto del monto disponible.
   */
  private defaultMontoDisponible = 370; 

  /**
   * Texto para la etiqueta del campo fecha de inicio.
   */
  public fechaIncicioAsignacion = INPUT_FECHA_INICIO;

  /**
   * Texto para la etiqueta del campo fecha fin.
   */
  public fechaFinAsignacion = INPUT_FECHA_FIN;

  /**
   * Datos de catálogo para el año del oficio.
   */
  public anoOficioDatos: Catalogo[] = [];

  /**
   * Nombres de las columnas para la tabla de montos.
   */
  public montoTablaDatos: string[] = [];

  /**
   * Filas de datos para la tabla de montos a expedir.
   */
  public montoTablaFilaDatos: TablaDatos[] = [];

 /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false;

   /** Estado de la solicitud tipo 40302. 
 *  Contiene información y progreso de la solicitud. */
  public solicitudState!: Solicitud120702State;
  
  /**
   * Constructor del componente.
   * @param fb Constructor de formularios.
   * @param tramite120702Store Store de estado del trámite.
   * @param tramite120702Query Query para observar el estado del trámite.
   * @param expedicionCertificadosFronteraService Servicio para obtener datos estáticos de apoyo.
   */
  constructor(
    private fb: FormBuilder,
    private tramite120702Store : Tramite120702Store,
    private tramite120702Query: Tramite120702Query,
    private expedicionCertificadosFronteraService: ExpedicionCertificadosFronteraService,
    private consultaioQuery: ConsultaioQuery
  ) {}

  /**
   * Inicializa el componente y configura el formulario y los datos requeridos.
   */
  ngOnInit(): void {
      // this.consultaioQuery.selectConsultaioState$
      // .pipe(
      //   takeUntil(this.destroy$),
      //   map((seccionState) => {
      //     this.esFormularioSoloLectura = seccionState.readonly;
      //     if(!this.asignacionForm) {
      //       this.establecerAsignacionFormGroup();
      //     }
      //     this.inicializarEstadoFormulario();
      //   })
      // )
      // .subscribe();

    this.consultaioQuery.selectConsultaioState$
    .pipe(takeUntil(this.destroy$))
    .subscribe((seccionState) => {
      this.esFormularioSoloLectura = seccionState.readonly;
      if(!this.asignacionForm) {
        this.establecerAsignacionFormGroup();
      }
      this.inicializarEstadoFormulario();
    });

    if (this.montoTablaFilaDatos.length === 0) {
      const OBRA_DE_ARTE_ROW: TablaDatos = {
      tbodyData: ["10"],
    };
    this.montoTablaFilaDatos.push(OBRA_DE_ARTE_ROW);
  }

    this.expedicionCertificadosFronteraService
      .getAnoOficioDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.anoOficioDatos = data;
      });

    this.expedicionCertificadosFronteraService
      .getMontoExpedirTabla()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: MontoExpedirTablaDatos) => {
        this.montoTablaDatos = data.columns;
      });

    // this.establecerAsignacionFormGroup();

    // this.inicializarEstadoFormulario();
  }

 /**
   * Determina si se debe cargar un formulario nuevo o uno existente.  
   * Ejecuta la lógica correspondiente según el estado del componente.
   */
  inicializarEstadoFormulario(): void {
    if (!this.asignacionForm) {return}
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
       this.asignacionForm.enable();
       this.asignacionForm.get('estado')?.disable();
       this.asignacionForm.get('representacionFederal')?.disable();
       this.asignacionForm.get('montoAsignado')?.disable();
       this.asignacionForm.get('montoExpedido')?.disable();
       this.asignacionForm.get('montoDisponible')?.disable();
       this.asignacionForm.get('datosNumeroOficio')?.disable();
       this.asignacionForm.get('fechaInicioVigencia')?.disable();
       this.asignacionForm.get('fechaFinVigencia')?.disable();
       this.asignacionForm.get('montoADisponible')?.disable();
       this.asignacionForm.get('totalAExpedir')?.disable();
    }
  }

   /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    if (!this.asignacionForm) {return}
    this.establecerAsignacionFormGroup();
    if (this.esFormularioSoloLectura) {
      this.asignacionForm.disable();
      if (this.montoTablaFilaDatos.length === 0) {
      const OBRA_DE_ARTE_ROW: TablaDatos = {
      tbodyData: ["10"],
    };
    this.montoTablaFilaDatos.push(OBRA_DE_ARTE_ROW);
  }
    } else if (!this.esFormularioSoloLectura) {
      this.asignacionForm.enable();
    } 
  }

  /**
   * Establece la estructura inicial del formulario reactivo de asignación.
   */
  establecerAsignacionFormGroup(): void {
      /** Suscribe al estado de solicitud 40302 y lo asigna a `solicitudState`.  
    * Usa `takeUntil` para limpiar la suscripción al destruir el componente. */
    this.tramite120702Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud120702State;
        })
      )
      .subscribe();

    this.asignacionForm = this.fb.group({
      anoDelOficio: ['', [Validators.required]],
      numeroOficio: ['', [Validators.required]],
      estado: [{ value: 'CHIHUAHUA', disabled: true }],
      representacionFederal: [{ value: 'CIUDAD JUAREZ', disabled: true }],
      montoAsignado: [{ value: '500', disabled: true }],
      montoExpedido: [{ value: '130', disabled: true }],
      montoDisponible: [{ value: this.defaultMontoDisponible, disabled: true }],
      datosNumeroOficio: [{ value: '2', disabled: true }],
      fechaInicioVigencia: [{ value: '15/11/2024', disabled: true }],
      fechaFinVigencia: [{ value: '15/11/2025', disabled: true }],
      montoADisponible: [{ value: this.defaultMontoDisponible, disabled: true }],
      montoAExpedir: ['', [Validators.required]],
      totalAExpedir: [{ value: '', disabled: true }],
    });

    this.asignacionForm.patchValue({
      anoDelOficio:this.solicitudState.anoDelOficio,
      numeroOficio:this.solicitudState.numeroOficio,
      montoAExpedir:this.solicitudState.montoAExpedir,
      fechaInicioVigencia:this.solicitudState.fechaInicioVigencia,
      fechaFinVigencia:this.solicitudState.fechaFinVigencia,
    })
  }

  /**
   * Actualiza un valor del formulario en el store mediante un método dinámico.
   * @param form Formulario de donde se toma el valor.
   * @param campo Nombre del campo a obtener.
   * @param metodoNombre Nombre del método en el store que será invocado.
   */
  public setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite120702Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite120702Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Cambia el valor de la fecha de inicio en el formulario y actualiza el store.
   * @param nuevo_valor Nuevo valor de la fecha de inicio.
   */
  cambioFechaInicio(nuevo_valor: string): void {
    this.asignacionForm.patchValue({
      fechaInicioVigencia: nuevo_valor,
    });
    this.tramite120702Store.setFechaInicio(nuevo_valor);
  }

  /**
   * Cambia el valor de la fecha de fin en el formulario y actualiza el store.
   * @param nuevo_valor Nuevo valor de la fecha de fin.
   */
  cambioFechaFin(nuevo_valor: string): void {
    this.asignacionForm.patchValue({
      fechaFinVigencia: nuevo_valor,
    });
    this.tramite120702Store.setFechaFin(nuevo_valor);
  }

  /**
   * Procesa el valor del campo montoAExpedir y actualiza la tabla y valores dependientes.
   */
  public enviarMontoFormulario(): void {
    const MONTO_A_EXPEDIR = this.asignacionForm.get('montoAExpedir')?.value || 0;

    const MONTO_DISPONIBLE = this.asignacionForm.get('montoADisponible')?.value || this.defaultMontoDisponible;
    const UPDATED_MONTO_DISPONIBLE = MONTO_DISPONIBLE - MONTO_A_EXPEDIR;

    this.asignacionForm.get('montoADisponible')?.setValue(
      UPDATED_MONTO_DISPONIBLE >= 0 ? UPDATED_MONTO_DISPONIBLE : 0
    );

    const MONTO_A_EXPEDIR_FILA = {
      tbodyData: [MONTO_A_EXPEDIR],
    };
    this.montoTablaFilaDatos.push(MONTO_A_EXPEDIR_FILA);
    this.montoTablaFilaDatos = JSON.parse(JSON.stringify(this.montoTablaFilaDatos));

    const TOTAL_A_EXPEDIR = this.asignacionForm.get('totalAExpedir')?.value || 0;
    this.asignacionForm.get('totalAExpedir')?.setValue(TOTAL_A_EXPEDIR + MONTO_A_EXPEDIR);

    this.asignacionForm.get('montoAExpedir')?.setValue('');
    this.asignacionForm.get('montoAExpedir')?.markAsUntouched();
  }

  /**
   * Método del ciclo de vida Angular que se ejecuta al destruir el componente.
   * Libera las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
