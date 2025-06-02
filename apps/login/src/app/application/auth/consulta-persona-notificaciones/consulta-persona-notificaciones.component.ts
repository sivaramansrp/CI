import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroStates, RegistroStore } from '../../../estados/registro.store';
import { Subject, catchError, map, of, takeUntil } from 'rxjs';
import { BusquedaRFCQuery } from '../../../queries/registro.query';
import { CommonModule } from '@angular/common';
import { ConsultaRegistro } from '../../core/models/consulta-registro.model';
import { Router } from '@angular/router';
import { UsuariosService } from '../../core/service/usuarios.service';

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
  * Indica si los datos han sido confirmados para el registro.
  */
  public registrarDatos: boolean = false;

  /**
   * Modelo que contiene los datos del notificador consultado.
   */
  public modelNotificador!: ConsultaRegistro;

  /**
   * Constructor. Inyecta dependencias necesarias para el funcionamiento del componente.
   * @param fb FormBuilder para construir el formulario reactivo.
   * @param registroQuery Query para obtener el estado de la solicitud.
   * @param tramiteService Servicio para consultar datos por RFC o CURP.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(
    private fb: FormBuilder,
    private registroStore: RegistroStates,
    private registroQuery: BusquedaRFCQuery,
    private usuarioService: UsuariosService,
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
        map((seccionState) => {
          this.registroState = seccionState;
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
    this.consultaDatos(this.registroState.rfc);
    this.crearFormRequerimiento();
  }

  /**
   * Consulta los datos de la persona por RFC y actualiza el formulario.
   * @param rfc RFC de la persona a consultar.
   */
  consultaDatos(rfc: string) {
    this.usuarioService.consultaDatosPorRFCoCURP(rfc)
      .pipe(
        map((data) => {
          this.modelNotificador = data;
          this.registroStore.setModeloNotificador(this.modelNotificador);
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
   * Cancela la operación y navega a la pantalla de registro de notificaciones.
   */
  cancelarDatos() {
    this.registroStore.setValorRegistro(this.registrarDatos = false);
    this.router.navigate(['login/registro-notificaciones']);
  }
  /**
   * Método para confirmar datos y enviar datos a tabla 
   */
  confirmarDatos() {
    this.registrarDatos = true;
    this.registroStore.setValorRegistro(this.registrarDatos);
    this.router.navigate(['login/registro-notificaciones']);
  }
}