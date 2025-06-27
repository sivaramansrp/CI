import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Manifiestos,
  ManifiestosRespuesta,
} from '../../model/solicitud-permiso.model';
import {
  SolicitudPermisoState,
  Tramite260703Store,
} from '../../estados/store/tramite260703.store';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { OPCIONES_DE_BOTON_DE_RADIO_INFORMACION_CONFIDENCIAL } from '../../enum/solicitud-permiso.enum';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';

/**
 * Componente que representa la sección de manifiestos y declaraciones.
 * Permite capturar y gestionar información relacionada con los manifiestos y declaraciones del trámite.
 */
@Component({
  selector: 'app-manifiestos-y-declaraciones',
  templateUrl: './manifiestos-y-declaraciones.component.html',
  styleUrl: './manifiestos-y-declaraciones.component.scss',
})
export class ManifiestosYDeclaracionesComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para capturar los datos de manifiestos y declaraciones.
   */
  manifiestosForm!: FormGroup;

  /**
   * Lista de manifiestos obtenidos del servicio.
   */
  manifiestos!: Manifiestos[];

  /**
   * Opciones de botones de radio para seleccionar información confidencial.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO_INFORMACION_CONFIDENCIAL;

  /**
   * Estado actual de la solicitud de permiso.
   */
  solicitudPermisioState!: SolicitudPermisoState;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria.
   */
  destruirNotificador$ = new Subject<void>();

    /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
   esFormularioSoloLectura: boolean = false; 

  /**
   * Constructor del componente.
   * Inicializa los servicios necesarios para gestionar el formulario y el estado.
   * formBuilder Servicio para construir formularios reactivos.
   * tramite260703Store Servicio para gestionar el estado del trámite.
   * tramite260703Query Servicio para consultar el estado del trámite.
   * SolicitudPermisoService Servicio para obtener los manifiestos.
   */
  constructor(
    private formBuilder: FormBuilder,
    private tramite260703Store: Tramite260703Store,
    private tramite260703Query: Tramite260703Query,
    private SolicitudPermisoService: SolicitudPermisoService,
     private consultaioQuery: ConsultaioQuery
  ) {
    // Si es necesario, se puede agregar aquí la lógica del constructor.
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destruirNotificador$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
       
      })
    )
    .subscribe()
  }

  /**
   * Guarda los datos del formulario de importador/exportador.
   * Deshabilita los campos si el formulario está en modo solo lectura.
   */

  guardarDatosFormulario(): void {
    if (this.esFormularioSoloLectura) {
    this.manifiestosForm.disable();
    this.manifiestosForm.get('informacionConfidencial')?.disable();
  }else{
    this.manifiestosForm.disable();
    this.manifiestosForm.get('informacionConfidencial')?.enable();
  }
}

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Configura las suscripciones necesarias y crea el formulario inicial.
   */
  ngOnInit(): void {
    this.tramite260703Query.selectSolicitudPermiso$
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe((state) => {
        this.solicitudPermisioState = state;
      });

    this.createManifiestosForm();
     this.guardarDatosFormulario();
  }

  /**
   * Obtiene el FormArray correspondiente a 'seleccionadaManifiesto' dentro del formulario.
   * Devuelve el FormArray de 'seleccionadaManifiesto'.
   */
  get seleccionadaManifiesto(): FormArray {
    return this.manifiestosForm.get('seleccionadaManifiesto') as FormArray;
  }

  /**
   * Crea el formulario reactivo para capturar los datos de manifiestos y declaraciones.
   * Inicializa los valores del formulario con el estado actual de la solicitud.
   */
  createManifiestosForm(): void {
    this.obtenerManifiestos();
    this.manifiestosForm = this.formBuilder.group({
      seleccionadaManifiesto: this.formBuilder.array(
        this.solicitudPermisioState?.manifiestosFormState.seleccionadaManifiesto
      ),
      informacionConfidencial: [
        this.solicitudPermisioState?.manifiestosFormState.informacionConfidencial,
        Validators.required,
      ],
    });
  }

  /**
   * Obtiene la lista de manifiestos desde el servicio.
   * Actualiza la propiedad 'manifiestos' con los datos obtenidos.
   */
  obtenerManifiestos(): void {
    this.SolicitudPermisoService.getManifiestos()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (result: ManifiestosRespuesta) => {
          this.manifiestos = result?.data;
        },
      });
  }

  /**
   * Cambia el estado de la casilla de verificación según el índice.
   * event Evento que se dispara al cambiar el estado del checkbox.
   * index Índice de la casilla de verificación.
   */
  onManifiestoCheckboxCambiar(event: Event, index: number): void {
    const VALOR_ENTRADA = event.target as HTMLInputElement;
    this.seleccionadaManifiesto.controls[index].setValue(VALOR_ENTRADA.checked);
    this.setValoresStore('seleccionadaManifiesto');
  }

  /**
   * Actualiza el estado del formulario de manifiestos en el store.
   * campo Nombre del campo del formulario a actualizar.
   */
  setValoresStore(campo: string): void {
    this.tramite260703Store.actualizarEstadoFormularioManifiestos({
      [campo]: this.manifiestosForm.get(campo)?.value,
    });
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}