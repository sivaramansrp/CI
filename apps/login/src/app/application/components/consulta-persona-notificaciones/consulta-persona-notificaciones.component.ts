import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroStates, RegistroStore } from '../../../estados/registro.store';
import { Subject, catchError, map, of, takeUntil } from 'rxjs';
import { BusquedaRFCQuery } from '../../../queries/registro.query';
import { CommonModule } from '@angular/common';
import { ConsultaRegistro } from '../../core/models/consuta-registro.model';
import { Router } from '@angular/router';
import { TramiteService } from '../../core/service/tramite.service';

/**
 * Componente para consultar los datos de una persona y mostrar notificaciones relacionadas.
 * Permite buscar información por RFC, visualizar los datos y confirmar la información consultada.
 */
@Component({
  selector: 'app-consulta-persona-notificaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './consulta-persona-notificaciones.component.html',
  styleUrl: './consulta-persona-notificaciones.component.scss',
})
export class ConsultaPersonaNotificacionesComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para la consulta de persona.
   */
  formConsulta!: FormGroup;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud de registro.
   */
  public registroState!: RegistroStore;

  /**
   * Indica si la tabla de datos debe visualizarse.
   */
  visualizarTabla: boolean = false;

  /**
   * Lista de personas consultadas para notificaciones.
   */
  personasNotificaciones: ConsultaRegistro[] = [];

  /**
   * Indica si la persona está seleccionada para alguna acción.
   */
  seleccionado?: boolean;

  /**
   * Constructor. Inyecta dependencias necesarias para el funcionamiento del componente.
   * @param fb FormBuilder para construir el formulario reactivo.
   * @param registroStates Estado global de registros.
   * @param registroQuery Query para obtener el estado de la solicitud.
   * @param tramiteService Servicio para consultar datos por RFC o CURP.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(
    private fb: FormBuilder,
    private registroStates: RegistroStates,
    private registroQuery: BusquedaRFCQuery,
    private tramiteService: TramiteService,
    private router: Router
  ) {
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Suscribe al estado de la solicitud y consulta los datos iniciales.
   */
  ngOnInit(): void {
    this.registroQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.registroState = seccionState;
        })
      )
      .subscribe();
    this.consultaDatos(this.registroState.rfc);
    this.crearFormRequerimiento();
    this.personasNotificaciones = this.registroState.personasNotificaciones;
  }

  /**
   * Consulta los datos de la persona por RFC y actualiza el formulario.
   * @param rfc RFC de la persona a consultar.
   */
  consultaDatos(rfc: string) {
    this.tramiteService.consultaDatosPorRFCoCURP(rfc)
      .pipe(
        map((data) => {
          this.formConsulta.get('nombre')?.setValue(data.nombre);
          this.formConsulta.get('apellidoPaterno')?.setValue(data.apellidoPaterno);
          this.formConsulta.get('apellidoMaterno')?.setValue(data.apellidoMaterno);
          this.formConsulta.get('rfc')?.setValue(data.rfc);
        }),
        catchError((_error) => {
          console.error('Error al consultar datos del trámite', _error);
          return of(null);
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
  }

  /**
   * Se ejecuta al destruir el componente, limpiando las suscripciones.
   */
  ngOnDestroy() {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Inicializa el formulario reactivo para la consulta de persona.
   */
  crearFormRequerimiento() {
    this.formConsulta = this.fb.group({
      nombre: [{ value: '', disabled: true }],
      apellidoPaterno: [{ value: '', disabled: true }],
      apellidoMaterno: [{ value: '', disabled: true }],
      rfc: [{ value: '', disabled: true }]
    });
  }

  /**
   * Confirma los datos consultados y muestra la tabla de información.
   * Agrega la persona consultada a la lista de notificaciones y actualiza el estado global.
   */
  confirmarDatos() {
    if (this.personasNotificaciones.length === 0) {
      this.personasNotificaciones = [];
    }
    const NUEVA_PERSONA = {
      ...this.formConsulta.value,
      seleccionado: false
    };
    this.personasNotificaciones.push({ ...NUEVA_PERSONA });
    this.visualizarTabla = true;
    this.registroStates.setListaNotificadores(this.personasNotificaciones);
  }

  /**
   * Navega a la pantalla de firma electrónica.
   */
  enviarFirma() {
    this.router.navigate(['funcionario/firma-electronica']);
  }

  /**
   * Elimina de la lista las personas seleccionadas.
   * Actualiza el estado global de notificaciones.
   */
  eliminarSeleccionados() {
    this.personasNotificaciones = this.personasNotificaciones.filter(p => !p['seleccionado']);
    this.registroStates.setListaNotificadores(this.personasNotificaciones);
  }

  /**
   * Cancela la operación y navega a la pantalla de registro de notificaciones.
   */
  cancelarDatos() {
    this.router.navigate(['funcionario/registro-notificaciones']);
  }
}