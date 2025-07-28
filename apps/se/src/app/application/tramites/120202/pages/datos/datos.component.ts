import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { Subject, map, takeUntil } from 'rxjs';
import { ExpedicionCertificadosAsignacionDirectaComponent } from '../../../../shared/components/expedicion-certificados-asignacion-directa/expedicion-certificados-asignacion-directa.component';
import { ExpedicionCertificadosAsignacionService } from '../../services/expedicion-certificados-asignacion/expedicion-certificados-asignacion.service';
import { Tramite120202Store } from '../../../../estados/tramites/tramite120202.store';

/**
 * Componente para gestionar el paso uno del trámite.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.scss',
})
export class DatosComponent implements AfterViewInit, OnInit, OnDestroy {
  /** 
   * Referencia al componente SolicitanteComponent 
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

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
   * Referencia al componente de expedición de certificados para asignación directa.
   * @type {ExpedicionCertificadosAsignacionDirectaComponent}
   */
  @ViewChild(ExpedicionCertificadosAsignacionDirectaComponent)
  expedicionCertificadosAsignacionDirectaComponent!: ExpedicionCertificadosAsignacionDirectaComponent;

  /**
   * Evento que se emite para indicar si se debe mostrar un error directo en el formulario.
   * @type {EventEmitter<boolean>}
   * @description Este evento se utiliza para notificar al componente padre si se debe mostrar un error directo en el formulario.
   */
  @Output() mostrarErrorDirecto: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /**
   * Evento que se emite para indicar si se debe mostrar un error en el número de folio de asignación.
   * @type {EventEmitter<{mostrarError: boolean, valor: string}>}
   * @description Este evento se utiliza para notificar al componente padre si se debe mostrar un error en el número de folio de asignación.
   */
  @Output() mostrarNumFolioAsignacionErrorDirecto: EventEmitter<{
    mostrarError: boolean;
    valor: string;
  }> = new EventEmitter<{ mostrarError: boolean; valor: string }>();

  /**
   * Evento que se emite para indicar si se debe mostrar un error al agregar datos.
   * @type {EventEmitter<boolean>}
   * @description Este evento se utiliza para notificar al componente padre si se debe mostrar un error al agregar datos.
   */
  @Output() mostrarAgregarErrorDirecto: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * Se utiliza para la inyección de dependencias.
   * @param cdr - ChangeDetectorRef para detectar cambios en la vista.
   * @param consultaQuery - Consulta para obtener el estado de la consulta.
   * @param tramite120201Store - Almacén para gestionar el estado del trámite 120202.
   * @param expedicionCertificadosAsignacionService - Servicio para gestionar los cupos.
   */
  constructor(
    private cdr: ChangeDetectorRef,
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
      .pipe(
        takeUntil(this.destroyNotifier$),
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
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;

    setTimeout(() => {
      this.solicitante?.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
      this.cdr.detectChanges();
    }, 0);
  }

  /**
   * Método para guardar los datos del formulario.
   * Realiza una llamada al servicio `expedicionCertificadosAsignacionService` para obtener los datos de la persona moral.
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    this.expedicionCertificadosAsignacionService
      .getConsultaPersonaMoralDatos()
      .pipe(takeUntil(this.destroyNotifier$))
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
   * Muestra un error en el número de folio de asignación.
   * @param event - Indica si se debe mostrar un error en el número de folio de asignación.
   */
  mostrarNumFolioAsignacionErrorEvent(event: {
    mostrarError: boolean;
    valor: string;
  }): void {
    this.mostrarNumFolioAsignacionErrorDirecto.emit(event);
  }

  /**
   * Muestra un error al agregar datos.
   * @param event - Indica si se debe mostrar un error al agregar.
   */
  mostrarAgregarErrorEvento(event: boolean): void {
    this.mostrarAgregarErrorDirecto.emit(event);
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