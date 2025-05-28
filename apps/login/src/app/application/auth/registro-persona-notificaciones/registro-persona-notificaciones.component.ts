import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroStates, RegistroStore } from '../../../estados/registro.store';
import { Subject, map, takeUntil } from 'rxjs';
import { BusquedaRFCQuery } from '../../../queries/registro.query';
import { CommonModule } from '@angular/common';
import { ConsultaRegistro } from '../../core/models/consuta-registro.model';
import { Router } from '@angular/router';

/**
 * Componente para el registro de personas que recibirán notificaciones.
 * Permite capturar el RFC y navegar a la consulta de notificador.
 */
@Component({
  selector: 'app-registro-persona-notificaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registro-persona-notificaciones.component.html',
  styleUrl: './registro-persona-notificaciones.component.scss',
})
export class RegistroPersonaNotificacionesComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para capturar el RFC de la persona a notificar.
   */
  public FormNotificaciones!: FormGroup;

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
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * 
   * @param fb FormBuilder para la creación de formularios reactivos.
   * @param registroStore Servicio para manipular el estado de registro.
   * @param registroQuery Query para consultar el estado de registro.
   * @param router Servicio de enrutamiento de Angular.
   */
  constructor(
    private fb: FormBuilder,
    private registroStore: RegistroStates,
    private registroQuery: BusquedaRFCQuery,
    private router: Router
  ) { }

  /**
   * Inicializa el componente, crea el formulario y suscribe a los cambios del estado de registro.
   */
  ngOnInit(): void {
    this.crearFormConsulta()
    this.registroQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.registroState = seccionState;
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
    this.confirmarDatos();
  }

  /**
  * Se ejecuta al destruir el componente, limpiando las suscripciones.
  */
  ngOnDestroy() {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Confirma y actualiza los datos de las personas notificadoras en el estado.
   * Si no existen personas, inicializa la lista y actualiza la visualización de la tabla.
   */
  confirmarDatos() {
    this.personasNotificaciones = this.registroState.personasNotificaciones;
    if (this.registroState.regustrarDatos) {
      if (this.personasNotificaciones.length === 0) {
        this.personasNotificaciones = [];
        this.registroStore.setValorVisualizarTabla(this.visualizarTabla = true);
      }
      this.visualizarTabla = this.registroState.visualizarTabla;
      this.personasNotificaciones.push(this.registroState.personaNotifcador);
      this.registroStore.setListaNotificadores(this.personasNotificaciones);
    }
  }

  /**
   * Crea el formulario reactivo para capturar el RFC.
   */
  crearFormConsulta() {
    this.FormNotificaciones = this.fb.group({
      rfc: ['']
    });
  }

  /**
   * Navega a la pantalla para agregar una persona para oír/recibir notificaciones.
   */
  AgregarPersonas() {
    this.router.navigate(['login/consulta-registro-notificador']);
  }

  /**
   * Actualiza el store con el valor de un campo del formulario.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo a actualizar.
   * @param metodoNombre Nombre del método del store a invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof RegistroStates): void {
    const VALOR = form.get(campo)?.value;
    (this.registroStore[metodoNombre] as (value: string) => void)(VALOR);
  }

  /**
   * Elimina las personas seleccionadas de la lista de notificaciones y actualiza el store.
   */
  eliminarSeleccionados() {
    this.personasNotificaciones = this.personasNotificaciones.filter(p => !p['seleccionado']);
    this.registroStore.setListaNotificadores(this.personasNotificaciones);
  }

  /**
   * Navega a la pantalla de firma electrónica.
   */
  enviarFirma() {
    this.router.navigate(['login/firma-electronica']);
  }
}