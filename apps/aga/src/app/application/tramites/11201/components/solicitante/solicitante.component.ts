import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { Solicitud11201State } from '../../../../core/estados/tramites/tramite11201.store';
import { Tramite11201Query } from '../../../../core/queries/tramite11201.query';
import { Tramite11201Store } from '../../../../core/estados/tramites/tramite11201.store';

/**
 * Componente para gestionar el formulario del solicitante.
 */

@Component({
  selector: 'app-solicitante',
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss',
  standalone: true,
  imports: [TituloComponent, FormsModule, ReactiveFormsModule]
})
export class SolicitanteComponent implements OnInit, OnDestroy {
  /**
   * Constructor para inyectar las dependencias necesarias.
   * @param fb - Servicio FormBuilder para crear formularios reactivos.
   */
  constructor(public fb: FormBuilder,
    public tramite11201Store: Tramite11201Store,
    private datosTramiteService: DatosTramiteService,
    private tramite11201Query: Tramite11201Query,
    private consultaioQuery: ConsultaioQuery
  ) {

  }

  /**
   * Grupo de formulario para el formulario de solicitud.
   */
  solicitudForm!: FormGroup;
  /**
  * @property {Subject<void>} destroyNotifier$
  * @description Subject utilizado para notificar y completar las suscripciones activas al destruir el componente, evitando fugas de memoria.
  */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {Solicitud11201State} derechoState
   * @description Estado actual del trámite 11201, que contiene los datos del solicitante y otros detalles relevantes.
   */
  public derechoState: Solicitud11201State = {} as Solicitud11201State;

  /**
   * @property {EventEmitter<string>} continuarEvento
   * @description Evento que se emite para indicar que se debe continuar al siguiente paso en el proceso.
   */
  @Output() continuarEvento = new EventEmitter<string>();

  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el solicitante y el trámite.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Datos simulados que representan a un solicitante con varios atributos.
   *
   * @property {string} rfc - El RFC (Registro Federal de Contribuyentes) del solicitante.
   * @property {string} denominacion - El nombre o denominación del negocio del solicitante.
   * @property {string} actividadEconomica - La actividad económica o sector empresarial del solicitante.
   * @property {string} correoElectronico - La dirección de correo electrónico del solicitante.
   */

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario `solicitudForm` con los campos necesarios.
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramite11201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.derechoState = seccionState;
        })
      )
      .subscribe();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
        })
      )
      .subscribe()
    this.loadDatosSolicitante();
    this.solicitudForm = this.fb.group({
      folioDelTramite: [this.consultaDatos?.consultaioSolicitante?.folioDelTramite],
      fechaDeInicio: [this.consultaDatos?.consultaioSolicitante?.fechaDeInicio],
      estadoDelTramite: [this.consultaDatos?.consultaioSolicitante?.estadoDelTramite],
      rfc: [''],
      denominacion: [''],
      actividadEconomica: [''],
      correoElectronico: [''],
    });

  }

  /**
   * Establece los valores del formulario `solicitudForm` utilizando datos simulados.
   *
   * Este método llena los siguientes campos en el formulario:
   * - rfc: El RFC (Registro Federal de Contribuyentes).
   * - denominacion: La denominación o razón social.
   * - actividadEconomica: La actividad económica.
   * - correoElectronico: La dirección de correo electrónico.
   *
   * @remarks
   * Este método asume que `mockData` contiene los campos necesarios
   * y que `solicitudForm` está correctamente inicializado.
   */
  setFormValues(): void {
    this.solicitudForm.get('rfc')?.setValue(this.derechoState.datosSolicitante.rfc);
    this.solicitudForm.get('denominacion')?.setValue(this.derechoState.datosSolicitante.denominacion);
    this.solicitudForm
      .get('actividadEconomica')
      ?.setValue(this.derechoState.datosSolicitante.actividadEconomica);
    this.solicitudForm
      .get('correoElectronico')
      ?.setValue(this.derechoState.datosSolicitante.correoElectronico);
  }

  /**
   * Cargar datos del solicitante.
   * 
   * Este método obtiene los datos del solicitante desde el servicio `datosTramiteService`
   * y los almacena en el store `tramite11201Store`. Luego, establece los valores del formulario.
   * 
   * @example
   * // Llamar al método para cargar los datos del solicitante
   * this.loadDatosSolicitante();
   */

  loadDatosSolicitante(): void {
    this.datosTramiteService.getDatosSolicitante().pipe(
      takeUntil(this.destroyNotifier$)).subscribe((datos) => {
        (this.tramite11201Store.setDatosSolicitante as (valor: unknown) => void)(datos);
        this.setFormValues();
      });
  }
  /**
     * Método para emitir un evento de continuar.
     * 
     * Este método emite un evento `continuarEvento` con una cadena vacía como valor.
     * Se utiliza para indicar que se debe continuar al siguiente paso en el proceso.
     * 
     * @example
     * // Llamar al método para emitir el evento de continuar
     * this.continuar();
     */
  continuar(): void {
    this.continuarEvento.emit('');
  }
  /**
     * Método para limpiar los recursos al destruir el componente.
     * 
     * Este método emite un valor `next` y completa el `destroyNotifier$` para limpiar
     * los recursos y evitar fugas de memoria cuando el componente se destruye.
     * 
     * @example
     * // Llamar al método automáticamente al destruir el componente
     * this.ngOnDestroy();
     */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
