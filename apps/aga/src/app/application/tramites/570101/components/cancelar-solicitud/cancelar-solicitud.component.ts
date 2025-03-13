import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';


import { CancelarModalidad, CancelarSolicitudForm } from '../../modelos/cancelar-solicitud.modalidad.model';
import { CrossListLable, FechasService, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
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
  tipoSolicitud: CancelarModalidad[] = [
    {
      id: 1,
      descripcion: "Total"
    },
    {
      id: 2,
      descripcion: "Parcial"
    }
  ];

  // Etiquetas que se muestran en la interfaz de usuario
  public fechasCancelaranLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Fechas dentro de periodo',
    derecha: 'Fechas seleccionadas para cancelacion del servicio',
  };

  // Bandera para saber si el tipo de cancelación es parcial
  esSeleccionadaTipoParcial!: boolean;
  
  // Array para almacenar el rango de días
  selectRangoDias: string[] = [];
  
  // Variables para manejar los estados de suscripción y el formulario
  public unsubscribe$ = new Subject<void>();
  cancelarSolicitudFormState!: CancelarSolicitudForm;
  formCancelorSolicitud!: FormGroup;
  public destroyNotifier$: Subject<void> = new Subject();

  // Inyectamos los servicios necesarios
  constructor(
    private fb: FormBuilder,
    public cancelarSolicitudStore: CancelarSolicitudStore,
    public fechaService: FechasService,
    public cancelarSolictudService: CancelarSolicitudService,
    public cancelarSolicitudQuery: CancelarSolicitudQuery,
    public validacionesService: ValidacionesFormularioService
  ) {
    // El constructor está intencionalmente vacío para la inyección de dependencias 
  }

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Obtenemos el estado de la solicitud y lo asignamos al formulario
    this.cancelarSolicitudQuery.selectCancelarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((cancelarSolicitud) => {
          this.cancelarSolicitudFormState = cancelarSolicitud;
        })
      ).subscribe();

    // Llamamos a los métodos para crear el formulario y obtener el rango de fechas
    this.crearFormSolicitud();
    this.rango_fechas();
    this.getCancelarSolicitud();
  }

  // Método para crear el formulario de la solicitud
  crearFormSolicitud(): void {
    this.formCancelorSolicitud = this.fb.group({
      folioSVEX: [
        this.cancelarSolicitudFormState?.folioSVEX,
      ],
      folioVUCEM: [
        this.cancelarSolicitudFormState?.folioVUCEM,
      ],
      tipoDeCancelacion: [
        this.cancelarSolicitudFormState?.tipoDeCancelacion,
        [Validators.required],
      ],
      horaInicio: [
        this.cancelarSolicitudFormState?.horaIncio,
      ],
      horaFin: [
        this.cancelarSolicitudFormState?.horaFin,
      ],
      descripcion: [
        this.cancelarSolicitudFormState?.descripcion,
        [Validators.required],
      ],
      fechasSeleccionadas: this.fb.group({
        selectedFechas: [
          this.cancelarSolicitudFormState?.fechasSeleccionadas?.selectedFechas,
        ]
      })
    });
  }

  // Método para obtener la solicitud de cancelación desde el servicio
  getCancelarSolicitud(): void {
    this.cancelarSolictudService.getCancelarSolicitud()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        // Actualizamos los valores del formulario con los datos obtenidos
        this.formCancelorSolicitud.patchValue(data);
      });
  }

  // Método para calcular el rango de fechas
  rango_fechas(): void {
    const FECHA_INICIO = "01-03-2025"; // 1 de marzo de 2025
    const FECHA_FINAL = "05-03-2025"; // 5 de marzo de 2025
  
    // Obtenemos los días entre las fechas y los asignamos al array selectRangoDias
    this.selectRangoDias = this.fechaService.obtenerDiasEntreFechas(
      FECHA_INICIO,
      FECHA_FINAL
    );
  }
  

  // Método para manejar el cambio del tipo de solicitud seleccionado
  tipoSolicitudSeleccion():void {
    const TIPO_SELECCION = this.formCancelorSolicitud.get('tipoDeCancelacion')?.value;
    this.esSeleccionadaTipoParcial = TIPO_SELECCION === "2" ? true : false;
    // Guardamos el tipo de solicitud en el estado global
    this.cancelarSolicitudStore.setTipoSolicitudSeleccion(TIPO_SELECCION);
  }

  // Método que se ejecuta cuando se seleccionan fechas
  onFechasSeleccionadasChange(selectedFechas: string[]):void{
    const FECHAS_SELECCIONDAS_GROUP = this.formCancelorSolicitud.get('fechasSeleccionadas') as FormGroup;
    const SELECTED_FECHAS_CONTROL = FECHAS_SELECCIONDAS_GROUP.get('selectedFechas');
    SELECTED_FECHAS_CONTROL?.setValue(selectedFechas);
    // Actualizamos las fechas seleccionadas en el estado global
    this.cancelarSolicitudStore.setFechasSeleccionadas(SELECTED_FECHAS_CONTROL?.value)
  }

  // Método que se ejecuta cuando cambia la descripción
  onDescripcionChange():void {
    const DESCRIPCION = this.formCancelorSolicitud.get('descripcion')?.value;
    // Actualizamos la descripción en el estado global
    this.cancelarSolicitudStore.setDescripcion(DESCRIPCION);
  }

  // Método que se ejecuta cuando se destruye el componente
  ngOnDestroy(): void {
    // Liberamos los recursos y notificamos a todos los observadores
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
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
}
