import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CancelacionesQuery } from '../../estados/cancelaciones.query';
import { CancelacionesStore } from '../../estados/cancelaciones.store';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TituloComponent } from '@libs/shared/data-access-user/src';

/**
 * @description
 * Componente para manejar la entidad externa en el trámite 140201.
 * Este componente maneja el formulario y la lógica para la entidad externa.
 * 
 * @example
 * <app-entidad-externa></app-entidad-externa>
 */
@Component({
  selector: 'app-entidad-externa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './entidad-externa.component.html',
  styleUrl: './entidad-externa.component.scss',
})
export class EntidadExternaComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la entidad externa.
   */
  entidadForm!: FormGroup;

  /**
   * @ignore
   */
  private destroy$ = new Subject<void>();

  /**
   * Observable para la entidad externa.
   */
  entidadExterna$ = this.cancelacionesQuery.entidadExterna$;

  /**
   * Observable para el nombre del solicitante IPC.
   */
  nombreSolicitanteIPC$ = this.cancelacionesQuery.nombreSolicitanteIPC$;

  /**
   * Observable para el cargo del solicitante IPC.
   */
  cargoSolicitanteIPC$ = this.cancelacionesQuery.cargoSolicitanteIPC$;

  /**
   * Observable para el folio del oficio de solicitud IPC.
   */
  folioOficioSolicitudIPC$ = this.cancelacionesQuery.folioOficioSolicitudIPC$;

  /**
   * Observable para el correo del solicitante IPC.
   */
  correoSolicitanteIPC$ = this.cancelacionesQuery.correoSolicitanteIPC$;
  /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando es `true`, los campos del formulario no se pueden editar.
 */
  esFormularioSoloLectura: boolean = false;

  /**
     * Suscripción a los cambios en el formulario react
     */
  private subscription: Subscription = new Subscription();

  /**
   * @ignore
   */
  constructor(private fb: FormBuilder,
    private cancelacionesStore: CancelacionesStore,
    private cancelacionesQuery: CancelacionesQuery,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
  }

  /**
   * Inicializa el componente.
   * Configura el formulario y actualiza el estado con los datos observables.
   */
  ngOnInit(): void {
    this.entidadForm = this.fb.group({
      entidadExterna: ['', [Validators.required, Validators.maxLength(255)]],
      nombreSolicitanteIPC: ['', [Validators.required, Validators.maxLength(255)]],
      cargoSolicitanteIPC: ['', [Validators.maxLength(255)]],
      folioOficioSolicitudIPC: ['', [Validators.required, Validators.maxLength(30)]],
      fechaSolicitudIPC: [{ value: '', disabled: true }, [Validators.maxLength(20)]],
      correoSolicitanteIPC: ['', [Validators.maxLength(255)]]
    });
    this.inicializarEstadoFormulario();
  }

  /**
  * Evalúa si se debe inicializar o cargar datos en el formulario.  
  * Además, obtiene la información del catálogo de mercancía.
  */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.estadoActualizacion();
    }
  }

  /**
 * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
 * Luego reinicializa el formulario con los valores actualizados desde el store.
 */
  guardarDatosFormulario(): void {
    this.estadoActualizacion();
    if (this.entidadForm && this.esFormularioSoloLectura) {
      this.entidadForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.entidadForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Actualiza el estado del formulario con los datos observables.
   */
  estadoActualizacion(): void {
    this.entidadExterna$.pipe(takeUntil(this.destroy$)).subscribe((entidadExterna) => {
      if (entidadExterna) {
        this.entidadForm?.get('entidadExterna')?.setValue(entidadExterna);
      }
    });

    this.nombreSolicitanteIPC$.pipe(takeUntil(this.destroy$)).subscribe((nombreSolicitanteIPC) => {
      if (nombreSolicitanteIPC) {
        this.entidadForm?.get('nombreSolicitanteIPC')?.setValue(nombreSolicitanteIPC);
      }
    });

    this.cargoSolicitanteIPC$.pipe(takeUntil(this.destroy$)).subscribe((cargoSolicitanteIPC) => {
      if (cargoSolicitanteIPC) {
        this.entidadForm?.get('cargoSolicitanteIPC')?.setValue(cargoSolicitanteIPC);
      }
    });

    this.folioOficioSolicitudIPC$.pipe(takeUntil(this.destroy$)).subscribe((folioOficioSolicitudIPC) => {
      if (folioOficioSolicitudIPC) {
        this.entidadForm?.get('folioOficioSolicitudIPC')?.setValue(folioOficioSolicitudIPC);
      }
    });

    this.correoSolicitanteIPC$.pipe(takeUntil(this.destroy$)).subscribe((correoSolicitanteIPC) => {
      if (correoSolicitanteIPC) {
        this.entidadForm?.get('correoSolicitanteIPC')?.setValue(correoSolicitanteIPC);
      }
    });
  }

  /**
   * Actualiza la entidad externa en el almacén.
   */
  updateEntidadExterna(): void {
    const ENTIDADEXTERNA = this.entidadForm.get('entidadExterna')?.value;
    this.cancelacionesStore.setEntidadExterna(ENTIDADEXTERNA);
  }

  /**
   * Actualiza el nombre del solicitante IPC en el almacén.
   */
  updateNombreSolicitanteIPC(): void {
    const NOMBRESOLICITANTEIPC = this.entidadForm.get('nombreSolicitanteIPC')?.value;
    this.cancelacionesStore.setNombreSolicitanteIPC(NOMBRESOLICITANTEIPC);
  }

  /**
   * Actualiza el cargo del solicitante IPC en el almacén.
   */
  updateCargoSolicitanteIPC(): void {
    const CARGOSOLICITANTEIPC = this.entidadForm.get('cargoSolicitanteIPC')?.value;
    this.cancelacionesStore.setCargoSolicitanteIPC(CARGOSOLICITANTEIPC);
  }

  /**
   * Actualiza el folio del oficio de solicitud IPC en el almacén.
   */
  updateFolioOficioSolicitudIPC(): void {
    const FOLIOOFICIOSOLICITUDIPC = this.entidadForm.get('folioOficioSolicitudIPC')?.value;
    this.cancelacionesStore.setFolioOficioSolicitudIPC(FOLIOOFICIOSOLICITUDIPC);
  }

  /**
   * Actualiza el correo del solicitante IPC en el almacén.
   */
  updateCorreoSolicitanteIPC(): void {
    const CORREOSOLICITANTEIPC = this.entidadForm.get('correoSolicitanteIPC')?.value;
    this.cancelacionesStore.setCorreoSolicitanteIPC(CORREOSOLICITANTEIPC);
  }

  /**
   * Destruye las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
  }
}