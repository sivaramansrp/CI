import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { ExpedicionCertificadosAsignacionService } from '../../services/expedicion-certificados-asignacion/expedicion-certificados-asignacion.service';
import { FormularioDinamico } from '@ng-mf/data-access-user';
import { Tramite120202Store } from '../../../../estados/tramites/tramite120202.store';

/**
 * Componente para gestionar el paso uno del trámite.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss'
})
export class DatosComponent implements OnInit, OnDestroy {
  /** 
   * Configuración del formulario para la persona moral 
   */
  persona: FormularioDinamico[] = [];

  /** 
   * Configuración del formulario para el domicilio fiscal 
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Estado de la consulta, utilizado para manejar el estado del formulario.
   */
  public consultaState!: ConsultaioState;

  /** 
   * Datos de respuesta del servidor utilizados para actualizar el formulario.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Evento que se emite para indicar si se debe mostrar un error directo en el formulario.
   * @type {EventEmitter<boolean>}
   * @description Este evento se utiliza para notificar al componente padre si se debe mostrar un error directo en el formulario.
   */
  @Output() mostrarErrorDirecto: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * Se utiliza para la inyección de dependencias.
   * @param consultaQuery - Consulta para obtener el estado de la consulta.
   * @param tramite120201Store - Almacén para gestionar el estado del trámite 120202.
   * @param expedicionCertificadosAsignacionService - Servicio para gestionar los cupos.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private tramite120202Store: Tramite120202Store,
    private expedicionCertificadosAsignacionService: ExpedicionCertificadosAsignacionService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado de la consulta y actualiza el estado del componente.
   * @return {void}
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();

    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Método para guardar los datos del formulario.
   * Realiza una llamada al servicio `expedicionCertificadosAsignacionService` para obtener los datos de la persona moral.
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    this.expedicionCertificadosAsignacionService
      .getConsultaPersonaMoralDatos().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.tramite120202Store.setConsultaPersonaFisicaState(resp);
        }
      });
  }

  /**
   * Muestra un error directo en el formulario.
   * @param event - Indica si se debe mostrar un error directo.
   */
  mostrarErrorEvent(event: boolean): void {
    this.mostrarErrorDirecto.emit(event);
  }

  /**
   * Selecciona la pestaña especificada.
   * 
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Se utiliza para limpiar los recursos y evitar fugas de memoria.
   * @return {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}