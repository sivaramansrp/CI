import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosPorGarantia } from '../../models/solicitud.model';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { Solicitud31101State } from '../../estados/solicitud31101.store';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
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
  configuracionFechaDeExpedicion: InputFecha = {
    labelNombre: 'Fecha de expedición',
    required: true,
    habilitado: true,
  };

  /** Configuración para el campo de fecha de inicio de vigencia */
  configuracionFechaInicioVigencia: InputFecha = {
    labelNombre: 'Fecha de inicio de vigencia',
    required: true,
    habilitado: true,
  };

  /** Configuración para el campo de fecha de inicio de vigencia */
  configuracionFechaFinVigencia: InputFecha = {
    labelNombre: 'Fecha de fin de vigencia',
    required: true,
    habilitado: true,
  };

  /** Subject usado para destruir suscripciones al finalizar el componente */
  private destroy$: Subject<void> = new Subject<void>();

  /** Estado actual de la solicitud almacenado en el store */
  solicitud31101State: Solicitud31101State = {} as Solicitud31101State;

  /**
   * Constructor que inyecta servicios y realiza la carga inicial de datos.
   *
   * @param fb FormBuilder para crear formularios reactivos
   * @param solicitudService Servicio para acceder a datos del backend
   * @param solicitud31101Store Store para actualizar el estado de la solicitud
   * @param solicitud31101Query Query para observar el estado de la solicitud
   */
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud31101Store: Solicitud31101Store,
    public solicitud31101Query: Solicitud31101Query
  ) {
    this.conseguirNombreInstitucionCatalogo();
    this.conseguirDatosPorGarantia();
  }

  /**
   * Hook de inicialización del componente. Configura el formulario
   * y se suscribe al estado para sincronizar los datos mostrados.
   */
  ngOnInit(): void {
    this.polizaDeFianzaForm = this.fb.group({
      polizaDeFianzaActual: [this.solicitud31101State.polizaDeFianzaActual],
      numeroFolio: [
        { value: this.solicitud31101State.numeroFolio, disabled: true },
        [Validators.maxLength(250)],
      ],
      rfcInstitucion: [
        { value: this.solicitud31101State.rfcInstitucion, disabled: true },
        [Validators.maxLength(250)],
      ],
      fechaExpedicion: [
        { value: this.solicitud31101State.fechaExpedicion, disabled: true },
        [Validators.maxLength(10)],
      ],
      fechaInicioVigenciaNo: [
        {
          value: this.solicitud31101State.fechaInicioVigenciaNo,
          disabled: true,
        },
        [Validators.maxLength(10)],
      ],
      fechaFinVigenciaNo: [
        { value: this.solicitud31101State.fechaFinVigenciaNo, disabled: false },
        [Validators.maxLength(10)],
      ],
      fechaInicioVigencia: [
        { value: this.solicitud31101State.fechaInicioVigencia, disabled: false },
        [Validators.maxLength(10)],
      ],
      fechaFinVigencia: [
        { value: this.solicitud31101State.fechaFinVigencia, disabled: false },
        [Validators.maxLength(10)],
      ],
      importeTotal: [
        { value: this.solicitud31101State.importeTotal, disabled: true },
        [Validators.maxLength(20)],
      ],
    });

    // Suscripción al estado global para actualizar el formulario con nuevos valores
    this.solicitud31101Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud31101State) => {
          this.solicitud31101State = respuesta;
          this.polizaDeFianzaForm.patchValue({
            polizaDeFianzaActual: this.solicitud31101State.polizaDeFianzaActual,
            numeroFolio: this.solicitud31101State.numeroFolio,
            rfcInstitucion: this.solicitud31101State.rfcInstitucion,
            fechaExpedicion: this.solicitud31101State.fechaExpedicion,
            fechaInicioVigenciaNo:
              this.solicitud31101State.fechaInicioVigenciaNo,
            fechaFinVigenciaNo: this.solicitud31101State.fechaFinVigenciaNo,
            fechaInicioVigencia: this.solicitud31101State.fechaFinVigenciaNo,
            fechaFinVigencia: this.solicitud31101State.fechaFinVigencia,
            importeTotal: this.solicitud31101State.importeTotal,
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
    this.solicitud31101Store.actualizarPolizaDeFianzaActual(evento.id);
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
          this.solicitud31101Store.actualizarPolizaDeFianzaActual(
            respuesta.polizaDeFianzaActual
          );
          this.solicitud31101Store.actualizarNumeroFolio(respuesta.numeroFolio);
          this.solicitud31101Store.actualizarRfcInstitucion(
            respuesta.rfcInstitucion
          );
          this.solicitud31101Store.actualizarFechaExpedicion(
            respuesta.fechaExpedicion
          );
          this.solicitud31101Store.actualizarFechaInicioVigenciaNo(
            respuesta.fechaInicioVigenciaNo
          );
          this.solicitud31101Store.actualizarFechaFinVigenciaNo(
            respuesta.fechaFinVigenciaNo
          );
          this.solicitud31101Store.actualizarFechaInicioVigencia(
            respuesta.fechaInicioVigencia
          );
          this.solicitud31101Store.actualizarFechaFinVigencia(
            respuesta.fechaFinVigencia
          );
          this.solicitud31101Store.actualizarImporteTotal(
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
