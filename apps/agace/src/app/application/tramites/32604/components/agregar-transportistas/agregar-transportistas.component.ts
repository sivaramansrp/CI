import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, Notificacion, NotificacionesComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud32604State, Solicitud32604Store } from '../../estados/solicitud32604.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';
import { TransportistasTable } from '../../models/empresas-comercializadoras.model';

/**
 * Decorador que define el componente 'AgregarTransportistasComponent'.
 * Incluye configuración de selector, template, estilos y módulos importados.
 */
@Component({
  selector: 'app-agregar-transportistas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, NotificacionesComponent],
  templateUrl: './agregar-transportistas.component.html',
  styleUrl: './agregar-transportistas.component.scss',
})
/**
 * Decorador que define el componente 'AgregarTransportistasComponent'.
 * Incluye configuración de selector, template, estilos y módulos importados.
 */
export class AgregarTransportistasComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para capturar datos del transportista */
  transportistaCertificacionForm!: FormGroup;

  /** Sujeto utilizado para cancelar suscripciones y evitar fugas de memoria */
  private destroy$: Subject<void> = new Subject<void>();

  /** Estado actual de la solicitud obtenido desde el store */
  solicitud32604State: Solicitud32604State = {} as Solicitud32604State;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /** Evento que emite los datos del transportista seleccionado al componente padre */
  @Output() seccionTransportistasLista = new EventEmitter<TransportistasTable>();

  /**
   * Representa una confirmar instancia de notificación asociada con el componente.
   * Esta propiedad se utiliza para gestionar y almacenar datos de notificaciones.
   */
  public confirmarNotificacion!: Notificacion;

  /**
   * Constructor del componente. Se inyectan los servicios necesarios para formularios y gestión de estado.
   */
  constructor(
    private fb: FormBuilder,
    public empresasComercializadorasService: EmpresasComercializadorasService,
    public solicitud32604Store: Solicitud32604Store,
    public solicitud32604Query: Solicitud32604Query,
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
  }

  /**
   * Ciclo de vida ngOnInit: inicializa el formulario y se suscribe al estado de la solicitud.
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
      this.transportistaCertificacionForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.transportistaCertificacionForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

   /**
   * Inicializa el formulario `agregarEnlaceOperativoForm` con los valores actuales
   * del estado `solicitud32604State`.
   *
   * Algunos campos están deshabilitados porque no deben ser editables por el usuario.
   * Aplica validaciones como `required`, `email`, y un patrón para el teléfono.
   *
   * Además, se suscribe a los cambios del estado de la solicitud (`selectSolicitud$`)
   * y actualiza los valores del formulario mediante `patchValue`.
   *
   * @returns {void}
   */
  inicializarFormulario(): void {
    this.transportistaCertificacionForm = this.fb.group({
      transportistaRFC: [
        this.solicitud32604State.transportistaRFC,
        [Validators.required, Validators.maxLength(13)]
      ],
      transportistaRFCModifTrans: [ 
        this.solicitud32604State.transportistaRFCModifTrans, 
        [Validators.maxLength(13)]
      ],
      transportistaRazonSocial: [
        this.solicitud32604State.transportistaRazonSocial,
        [Validators.maxLength(254)]
      ],
      transportistaDomicilio: [
        this.solicitud32604State.transportistaDomicilio,
        [Validators.maxLength(300)],
      ],
      transportistaCaat: [
        this.solicitud32604State.transportistaCaat,
        [Validators.maxLength(254)],
      ],
      transportistaIdDomicilio: [
        this.solicitud32604State.transportistaIdDomicilio,
      ],
      transportistaIdRFC: [this.solicitud32604State.transportistaIdRFC],
      transportistaIdRazonSocial: [
        this.solicitud32604State.transportistaIdRazonSocial,
      ],
      transportistaIdCaat: [this.solicitud32604State.transportistaIdCaat],
    });

    /** Se suscribe al estado de la solicitud para mantener sincronizado el formulario */
    this.solicitud32604Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32604State) => {
          this.solicitud32604State = respuesta;
          this.transportistaCertificacionForm.patchValue({
            transportistaRFC: respuesta.transportistaRFC,
            transportistaRFCModifTrans: respuesta.transportistaRFCModifTrans,
            transportistaRazonSocial: respuesta.transportistaRazonSocial,
            transportistaDomicilio: respuesta.transportistaDomicilio,
            transportistaCaat: respuesta.transportistaCaat,
          });
        })
      )
      .subscribe();
  }

  /**
   * Actualiza el RFC del transportista en el store.
   */
  actualizarTransportistaRFC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarTransportistaRFC(VALOR);
  }

  /**
   * Actualiza el RFC modificado del transportista en el store.
   */
  actualizarTransportistaRFCModifTrans(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarTransportistaRFCModifTrans(VALOR);
  }

  /**
   * Actualiza la razón social del transportista en el store.
   */
  actualizarTransportistaRazonSocial(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarTransportistaRazonSocial(VALOR);
  }

  /**
   * Actualiza el domicilio del transportista en el store.
   */
  actualizarTransportistaDomicilio(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarTransportistaDomicilio(VALOR);
  }

  /**
   * Actualiza el CAAT del transportista en el store.
   */
  actualizarTransportistaCaat(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarTransportistaCaat(VALOR);
  }

  /**
   * Verifica si un control del formulario es inválido y ha sido tocado.
   * @param id ID del control del formulario
   * @returns booleano que indica si el campo es inválido
   */
  noEsValido(id: string): boolean | undefined {
    const CONTROL = this.transportistaCertificacionForm.get(id);
    return CONTROL?.invalid && CONTROL?.touched;
  }

  /**
   * Ejecuta la búsqueda del transportista si el RFC ha sido ingresado.
   */
  selectBuscarTransportista(): void {
    if (this.transportistaCertificacionForm.get('transportistaRFC')?.value) {
      this.conseguirTransportistasLista();
    }
  }

  /**
   * Llama al servicio para obtener la lista de transportistas y actualiza el store.
   */
  conseguirTransportistasLista(): void {
    this.empresasComercializadorasService
      .conseguirTransportistasLista()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: TransportistasTable[]) => {
          this.solicitud32604Store.actualizarTransportistaRFCModifTrans(
            respuesta[0].transportistaRFCModifTrans
          );
          this.solicitud32604Store.actualizarTransportistaRazonSocial(
            respuesta[0].transportistaRazonSocial
          );
          this.solicitud32604Store.actualizarTransportistaDomicilio(
            respuesta[0].transportistaDomicilio
          );
          this.solicitud32604Store.actualizarTransportistaCaat(
            respuesta[0].transportistaCaat
          );
        },
      });
  }

  /**
   * Prepara un objeto con los datos del transportista y lo emite al componente padre.
   */
  aceptarTransportista(): void {
    const OBJETO_JSON: TransportistasTable = {
      transportistaRFCModifTrans: this.transportistaCertificacionForm.get('transportistaRFCModifTrans')
        ?.value,
      transportistaRazonSocial: this.transportistaCertificacionForm.get(
        'transportistaRazonSocial'
      )?.value,
      transportistaDomicilio: this.transportistaCertificacionForm.get(
        'transportistaDomicilio'
      )?.value,
      transportistaCaat: this.transportistaCertificacionForm.get('transportistaCaat')?.value,
    };
    this.seccionTransportistasLista.emit(OBJETO_JSON);
  }

  /**
   * Limpia los datos de la transportistaCertificacionForm.
   */
  public limpiar(): void {
    this.transportistaCertificacionForm.reset();
  }

  /**
   * Ciclo de vida ngOnDestroy: finaliza el observable para prevenir fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
