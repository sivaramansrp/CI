import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { DatosPorGarantia } from '../../models/solicitud.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud31301Query } from '../../estados/solicitud31301.query';
import { Solicitud31301State } from '../../estados/solicitud31301.store';
import { Solicitud31301Store } from '../../estados/solicitud31301.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente encargado de mostrar y gestionar los datos relacionados
 * con la garantía de una póliza de fianza. Incluye la visualización de
 * fechas, importes y catálogo de instituciones.
 */
@Component({
  selector: 'app-datos-por-garantia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
  ],
  providers: [SolicitudService],
  templateUrl: './datos-por-garantia.component.html',
  styleUrl: './datos-por-garantia.component.scss',
})
/**
 * Componente encargado de mostrar y gestionar los datos relacionados
 * con la garantía de una póliza de fianza. Incluye la visualización de
 * fechas, importes y catálogo de instituciones.
 */
export class DatosPorGarantiaComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para mostrar los datos de la póliza de fianza */
  polizaDeFianzaForm!: FormGroup;

  /** Catálogo de instituciones para selección de nombre */
  nombreInstitucionCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /** Configuración para el campo de fecha de fin de vigencia */
  configuracionFechaFinVigencia: InputFecha = {
    labelNombre: 'Fecha fin de la ampliacion',
    required: true,
    habilitado: false,
  };

  /** Configuración para el campo de fecha de inicio de vigencia */
  configuracionFechaInicioVigencia: InputFecha = {
    labelNombre: 'Fecha inicio de la ampliación',
    required: true,
    habilitado: false,
  };

  /** Subject usado para destruir suscripciones al finalizar el componente */
  private destroy$: Subject<void> = new Subject<void>();

  /** Estado actual de la solicitud almacenado en el store */
  solicitud31301State: Solicitud31301State = {} as Solicitud31301State;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor que inyecta servicios y realiza la carga inicial de datos.
   *
   * @param fb FormBuilder para crear formularios reactivos
   * @param solicitudService Servicio para acceder a datos del backend
   * @param solicitud31301Store Store para actualizar el estado de la solicitud
   * @param solicitud31301Query Query para observar el estado de la solicitud
   */
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud31301Store: Solicitud31301Store,
    public solicitud31301Query: Solicitud31301Query,
    public consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.conseguirNombreInstitucionCatalogo();
    this.conseguirDatosPorGarantia();
  }

  /**
   * Hook de inicialización del componente. Configura el formulario
   * y se suscribe al estado para sincronizar los datos mostrados.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.polizaDeFianzaForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.polizaDeFianzaForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Inicializa el formulario reactivo con los valores de razón social anteriores y actuales.
   *
   * Los campos del formulario están deshabilitados y tienen una validación de longitud máxima de 250 caracteres.
   */
  inicializarFormulario(): void {
    this.polizaDeFianzaForm = this.fb.group({
      polizaDeFianzaActual: [this.solicitud31301State.polizaDeFianzaActual],
      numeroFolio: [
        { value: this.solicitud31301State.numeroFolio, disabled: true },
        [Validators.maxLength(250)],
      ],
      rfcInstitucion: [
        { value: this.solicitud31301State.rfcInstitucion, disabled: true },
        [Validators.maxLength(250)],
      ],
      fechaExpedicion: [
        { value: this.solicitud31301State.fechaExpedicion, disabled: true },
        [Validators.maxLength(10)],
      ],
      fechaInicioVigenciaNo: [
        {
          value: this.solicitud31301State.fechaInicioVigenciaNo,
          disabled: true,
        },
        [Validators.maxLength(10)],
      ],
      fechaFinVigenciaNo: [
        { value: this.solicitud31301State.fechaFinVigenciaNo, disabled: true },
        [Validators.maxLength(10)],
      ],
      fechaInicioVigencia: [
        { value: this.solicitud31301State.fechaInicioVigencia, disabled: true },
        [Validators.maxLength(10)],
      ],
      fechaFinVigencia: [
        { value: this.solicitud31301State.fechaFinVigencia, disabled: true },
        [Validators.maxLength(10)],
      ],
      importeTotal: [
        { value: this.solicitud31301State.importeTotal, disabled: true },
        [Validators.maxLength(20)],
      ],
    });

    // Suscripción al estado global para actualizar el formulario con nuevos valores
    this.solicitud31301Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud31301State) => {
          this.solicitud31301State = respuesta;
          this.polizaDeFianzaForm.patchValue({
            polizaDeFianzaActual: this.solicitud31301State.polizaDeFianzaActual,
            numeroFolio: this.solicitud31301State.numeroFolio,
            rfcInstitucion: this.solicitud31301State.rfcInstitucion,
            fechaExpedicion: this.solicitud31301State.fechaExpedicion,
            fechaInicioVigenciaNo:
              this.solicitud31301State.fechaInicioVigenciaNo,
            fechaFinVigenciaNo: this.solicitud31301State.fechaFinVigenciaNo,
            fechaInicioVigencia: this.solicitud31301State.fechaFinVigenciaNo,
            fechaFinVigencia: this.solicitud31301State.fechaFinVigencia,
            importeTotal: this.solicitud31301State.importeTotal,
          });
        })
      )
      .subscribe();
  }

  /**
   * Método que se ejecuta al seleccionar una institución del catálogo.
   * Actualiza el valor de la póliza de fianza actual en el store.
   *
   * @param evento Elemento seleccionado del catálogo
   */
  seleccionaNombreInstitucion(evento: Catalogo): void {
    this.solicitud31301Store.actualizarPolizaDeFianzaActual(evento.id);
  }

  /**
   * Consulta al servicio los datos del catálogo de instituciones
   * y los almacena para ser mostrados en el componente.
   */
  conseguirNombreInstitucionCatalogo(): void {
    this.solicitudService
      .conseguirNombreInstitucionCatalogo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.nombreInstitucionCatalogo = respuesta;
        },
      });
  }

  /**
   * Obtiene los datos por garantía desde el backend y actualiza
   * el estado global con la información correspondiente.
   */
  conseguirDatosPorGarantia(): void {
    this.solicitudService
      .conseguirDatosPorGarantia()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: DatosPorGarantia) => {
          this.solicitud31301Store.actualizarPolizaDeFianzaActual(
            respuesta.polizaDeFianzaActual
          );
          this.solicitud31301Store.actualizarNumeroFolio(respuesta.numeroFolio);
          this.solicitud31301Store.actualizarRfcInstitucion(
            respuesta.rfcInstitucion
          );
          this.solicitud31301Store.actualizarFechaExpedicion(
            respuesta.fechaExpedicion
          );
          this.solicitud31301Store.actualizarFechaInicioVigenciaNo(
            respuesta.fechaInicioVigenciaNo
          );
          this.solicitud31301Store.actualizarFechaFinVigenciaNo(
            respuesta.fechaFinVigenciaNo
          );
          this.solicitud31301Store.actualizarFechaInicioVigencia(
            respuesta.fechaInicioVigencia
          );
          this.solicitud31301Store.actualizarFechaFinVigencia(
            respuesta.fechaFinVigencia
          );
          this.solicitud31301Store.actualizarImporteTotal(
            respuesta.importeTotal
          );
        },
      });
  }

  /**
   * Hook que se ejecuta al destruir el componente.
   * Se usa para liberar recursos y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
