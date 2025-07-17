import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../constants/datos-comunes.enum';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente que gestiona el formulario relacionado con la certificación CTPAT.
 * Utiliza radio buttons para capturar respuestas de sí/no relacionadas con la solicitud.
 */
@Component({
  selector: 'app-c-tpat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputRadioComponent],
  providers: [SolicitudService,BsModalService],
  templateUrl: './c-tpat.component.html',
  styleUrl: './c-tpat.component.scss',
})
/**
 * Componente que gestiona el formulario relacionado con la certificación CTPAT.
 * Utiliza radio buttons para capturar respuestas de sí/no relacionadas con la solicitud.
 */
export class CTPATComponent implements OnInit, OnDestroy {
  /** Formulario reactivo que contiene los campos de CTPAT identificados por sus IDs numéricos */
  ctpatForm!: FormGroup;

  /** Subject utilizado para cancelar las suscripciones activas al destruir el componente */
  public destroy$: Subject<void> = new Subject<void>();


  /** Estado actual de la solicitud obtenido desde el store */
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
  /**
   * Referencia al modal de Bootstrap para mostrar mensajes informativos.
   */
  modalRef?: BsModalRef;
    /**
   * Referencia al template del modal de mensaje.
   */
  @ViewChild('template') template!: TemplateRef<void>;

  /**
   * Opciones disponibles para los botones de radio (Sí/No).
   * Utiliza las constantes definidas en `OPCIONES_DE_BOTON_DE_RADIO`.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

    /**
   * Estado actual de la solicitud del trámite 32605.
   * Contiene toda la información del estado de la aplicación.
   */
  solicitudState!: Solicitud32605State;

  /**
   * Constructor del componente. Inyecta dependencias necesarias y carga las opciones del radio button.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query,
    public consultaioQuery: ConsultaioQuery,
    @Inject(BsModalService)
    private modalService: BsModalService,
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
   * Inicializa el componente, crea el formulario y suscribe a los cambios en el estado de la solicitud.
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
      this.ctpatForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.ctpatForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Inicializa el formulario `ctpatForm` con los valores actuales del estado `solicitud32605State`.
   *
   * Este método crea un formulario reactivo usando `FormBuilder`, asignando los valores
   * de los campos `'2089'`, `'2090'` y `'2091'`. Además, se suscribe al observable
   * `selectSolicitud$` para escuchar actualizaciones del estado y aplicar los valores
   * actualizados al formulario.
   *
   * También gestiona la destrucción de la suscripción usando `takeUntil` con `destroy$`.
   */
  inicializarFormulario(): void {
    this.obtenerEstadoSolicitud();
    this.ctpatForm = this.fb.group({
     autorizacionCBP:[this.solicitudState?.autorizacionCBP, Validators.required],
     instalacionesCertificadasCBP:[this.solicitudState?.instalacionesCertificadasCBP, Validators.required],
     suspensionCancelacionCBP:[this.solicitudState?.suspensionCancelacionCBP, Validators.required],
    });

   
  }

   /**
   * Obtiene el estado actual de la solicitud desde el store.
   * Se suscribe a los cambios del estado y actualiza la tabla de datos.
   * Mantiene sincronizada la información entre el store y el componente.
   */
  obtenerEstadoSolicitud(): void {
    this.solicitud32605Query.selectSolicitud$?.pipe(takeUntil(this.destroy$))
      .subscribe((data: Solicitud32605State) => {
        this.solicitudState = data;
      });
  }
  
  /**
   * Cancela todas las suscripciones activas al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
