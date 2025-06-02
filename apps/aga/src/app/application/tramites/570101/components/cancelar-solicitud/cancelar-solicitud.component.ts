import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil, tap } from 'rxjs';


import { CancelarModalidad, CancelarSolicitudForm } from '../../modelos/cancelar-solicitud.modalidad.model';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { CrossListLable, FechasService, SeccionLibQuery, SeccionLibState, SeccionLibStore, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { CancelarSolicitudQuery } from '../../estados/tramite570101.query';
import { CancelarSolicitudService } from '../../service/cancelar-solicitud.service';
import { CancelarSolicitudStore } from '../../estados/tramite570101.store';


@Component({
  selector: 'app-cancelar-solicitud',
  templateUrl: './cancelar-solicitud.component.html',
  styleUrl: './cancelar-solicitud.component.scss',
})

export class CancelarSolicitudComponent implements OnInit, OnDestroy {

  // Definimos el tipo de solicitud (Total o Parcial)
  tipoSolicitud: CancelarModalidad[] = [];

  // Etiquetas que se muestran en la interfaz de usuario
  public fechasCancelaranLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Fechas dentro de periodo',
    derecha: 'Fechas seleccionadas para cancelacion del servicio',
  };

  /**
   *Devuelve un valor booleano para determinar si el tipo de cancelación seleccionado es "2".
    Accede al valor del formulario "tipoDeCancelacion" y comprueba si coincide con "2". Si es así, retorna true; de lo contrario, retorna false.
  */
  public get esSeleccionadaTipoParcial(): boolean {
    const TIPO_SELECCION = this.formCancelorSolicitud.get('tipoDeCancelacion')?.value;
    return TIPO_SELECCION === "2" ? true : false;
  }

  // Array para almacenar el rango de días
  selectRangoDias: string[] = [];

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;


  // Variables para manejar los estados de suscripción y el formulario
  public unsubscribe$ = new Subject<void>();
  cancelarSolicitudFormState!: CancelarSolicitudForm;
  formCancelorSolicitud!: FormGroup;
  public destroyNotifier$: Subject<void> = new Subject();
  public seccion!: SeccionLibState;

  /**
   *Retorna una lista de fechas seleccionadas desde el estado actual del formulario "cancelarSolicitudFormState".
    Si no hay fechas seleccionadas (selectedFechas es undefined o null), retorna un arreglo vacío.
   */
  public get fechasSeleccionadas(): string[] {
    return this.cancelarSolicitudFormState.fechasSeleccionadas.selectedFechas ?? [];
  }

  // Inyectamos los servicios necesarios
  constructor(
    private fb: FormBuilder,
    public cancelarSolicitudStore: CancelarSolicitudStore,
    public fechaService: FechasService,
    public cancelarSolictudService: CancelarSolicitudService,
    public cancelarSolicitudQuery: CancelarSolicitudQuery,
    public validacionesService: ValidacionesFormularioService,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private consultaQuery: ConsultaioQuery,
  ) {
    // El constructor está intencionalmente vacío para la inyección de dependencias 
  }

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Llamamos a los métodos para crear el formulario y obtener el rango de fechas
    this.crearFormSolicitud();
    this.getCancelarSolicitud();
    // Obtenemos el estado de la solicitud y lo asignamos al formulario
    this.cancelarSolicitudQuery.selectCancelarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((cancelarSolicitud) => {
          this.cancelarSolicitudFormState = cancelarSolicitud;
          this.crearFormSolicitud();
        })
      ).subscribe();
    this.rango_fechas();
    this.getTipoSolicitud();

    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.formCancelorSolicitud.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        tap((_value) => {
          this.actualizarValidationInStore();

        })
      )
      .subscribe();

        this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
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
      if(!this.formCancelorSolicitud){
        this.crearFormSolicitud();
      }
      if (this.esFormularioSoloLectura) {
          this.formCancelorSolicitud.disable();
      }
    }
 

  actualizarValidationInStore(): void {
    let seccion: number | null = 0;
    const FORMAS_VALIDAS = this.seccion.formaValida;

    for (let i = 0; i < this.seccion.seccion.length; i++) {
      if (this.seccion.seccion[i] === true) {
        seccion = i;
        break;
      } else {
        seccion = null;
      }
    }

    if (seccion !== null) {
      if (this.formCancelorSolicitud.valid) {
        FORMAS_VALIDAS[seccion] = true;
        this.seccionStore.establecerFormaValida(FORMAS_VALIDAS);
      } else {
        FORMAS_VALIDAS[seccion] = false;
        this.seccionStore.establecerFormaValida(FORMAS_VALIDAS);
      }
    }
  }

  // Método para crear el formulario de la solicitud
  crearFormSolicitud(): void {
    this.formCancelorSolicitud = this.fb.group({
      folioSVEX: [
        { value: this.cancelarSolicitudFormState?.folioSVEX || '', disabled: true }
      ],
      folioVUCEM: [
        { value: this.cancelarSolicitudFormState?.folioVUCEM || '', disabled: true }
      ],
      tipoDeCancelacion: [
        { value: this.cancelarSolicitudFormState?.tipoDeCancelacion || '', disabled: false },
        [Validators.required]
      ],
      horaInicio: [
        { value: this.cancelarSolicitudFormState?.horaInicio || '', disabled: true }
      ],
      horaFin: [
        { value: this.cancelarSolicitudFormState?.horaFin || '', disabled: true }
      ],
      descripcion: [
        { value: this.cancelarSolicitudFormState?.descripcion, disabled: false },
        [Validators.required]
      ],
      fechasSeleccionadas: this.fb.group({
        selectedFechas: [
          { value: this.cancelarSolicitudFormState?.fechasSeleccionadas.selectedFechas || [], disabled: false }
        ],
      })
    });

    if (this.esSeleccionadaTipoParcial) {
      this.setSelectedFechasRequired(true);
    }
  }

  setSelectedFechasRequired(isRequired: boolean): void {
    const CONTROL = this.formCancelorSolicitud.get('fechasSeleccionadas.selectedFechas');

    if (CONTROL) {
      if (isRequired) {
        CONTROL.setValidators([Validators.required]);
      } else {
        CONTROL.clearValidators();
      }
      CONTROL.updateValueAndValidity();
    }
  }

  // Método para obtener la solicitud de cancelación desde el servicio
  getCancelarSolicitud(): void {
    this.cancelarSolictudService.getCancelarSolicitud()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        // Actualizamos los valores del formulario con los datos obtenidos
        if (this.cancelarSolicitudFormState.folioSVEX === "") {
          this.formCancelorSolicitud.patchValue(data);
          this.cancelarSolicitudFormState = data;
        }
      });
  }

  // Método para calcular el rango de fechas
  rango_fechas(): void {
    this.cancelarSolictudService.getSelectRangoDias()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        // Actualizamos los valores del formulario con los datos obtenidos
        this.selectRangoDias = data;
      });
  }

  /**
  * Método para obtener las opciones de tipo de solicitud (Total o Parcial).
  * Este método suscribe al servicio de cancelación y asigna los datos obtenidos a la variable 'tipoSolicitud'.
  */
  getTipoSolicitud(): void {
    this.cancelarSolictudService.getTipoSolicitud()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.tipoSolicitud = data;
      });
  }

  // Método para manejar el cambio del tipo de solicitud seleccionado
  tipoSolicitudSeleccion(): void {
    const TIPO_SELECCION = this.formCancelorSolicitud.get('tipoDeCancelacion')?.value;
    // Guardamos el tipo de solicitud en el estado global
    this.cancelarSolicitudStore.setTipoDeCancelacion(this.cancelarSolicitudFormState, TIPO_SELECCION);
    this.formCancelorSolicitud.get('tipoDeCancelacion')?.updateValueAndValidity();
  }

  // Método que se ejecuta cuando se seleccionan fechas
  onFechasSeleccionadasChange(selectedFechas: string[]): void {
    const FECHAS_SELECCIONDAS_GROUP = this.formCancelorSolicitud.get('fechasSeleccionadas') as FormGroup;
    const SELECTED_FECHAS_CONTROL = FECHAS_SELECCIONDAS_GROUP.get('selectedFechas');
    SELECTED_FECHAS_CONTROL?.setValue(selectedFechas);
    // Actualizamos las fechas seleccionadas en el estado global
    this.cancelarSolicitudStore.setFechasSeleccionadas(this.cancelarSolicitudFormState, selectedFechas);
    FECHAS_SELECCIONDAS_GROUP.updateValueAndValidity();
    this.actualizarValidationInStore();
  }

  // Método que se ejecuta cuando cambia la descripción
  onDescripcionChange(): void {
    const DESCRIPCION = this.formCancelorSolicitud.get('descripcion')?.value;
    // Actualizamos la descripción en el estado global
    this.cancelarSolicitudStore.setDescripcion(this.cancelarSolicitudFormState, DESCRIPCION);
    this.formCancelorSolicitud.get('descripcion')?.updateValueAndValidity();
    this.actualizarValidationInStore();
  }
  /**
   * Verifica si un campo específico en un formulario es válido.
   *
   * @param {FormGroup} form - El formulario que contiene el campo a validar.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} - Retorna `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) ?? false;
  }

  // Método que se ejecuta cuando se destruye el componente
  ngOnDestroy(): void {
    // Liberamos los recursos y notificamos a todos los observadores
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
