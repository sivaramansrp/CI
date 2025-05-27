import { AVISO, ConsultaioQuery, ConsultaioState, SolicitanteComponent, TIPO_PERSONA} from '@ng-mf/data-access-user';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { map, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

import { DatosPasos} from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS_REGISTRO } from '@ng-mf/data-access-user';
import { PermisoCitesService } from '../../services/permiso-cites.service';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que representa la acción de un botón.
 * @interface
 * @compodoc
 */
interface AccionBoton {
  /**
   * La acción que se va a realizar.
   * {string}
   */
  accion: string;
  /**
   * El valor asociado a la acción.
   * {number}
   */
  valor: number;
}

/**
 * Componente que representa los pasos de datos en un proceso de múltiples pasos.
 * @compodoc
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Lista de pasos en el asistente.
   * {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS_REGISTRO;

  /**
   * Referencia al componente WizardComponent.
   * {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Variable utilizada para almacenar la lista de pasos.
   * {ListaPasosWizard[]}
   */
  pantallasPasos: ListaPasosWizard[] = PASOS_REGISTRO;

  /**
   * Variable utilizada para almacenar el índice del paso actual.
   * {number}
   */
  indice: number = 1;

  /**
   * Mensaje de alerta utilizado en el componente.
   * Puede ser asignado a cualquiera de las claves definidas en TEXTOS.
   * {string}
   */
  public alert_message: string = AVISO.Aviso;

  /**
   * Referencia al componente SolicitanteComponent.
   * {SolicitanteComponent}
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Indica si los datos de respuesta están disponibles.
   * {boolean}
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Notificador para destruir las suscripciones.
   * Se utiliza para cancelar suscripciones activas al destruir el componente.
   * {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la consulta actual.
   * {ConsultaioState}
   */
  public consultaState!: ConsultaioState;

  /**
   * Constructor del componente.
   * Inicializa los servicios y dependencias necesarias para la gestión de datos y formularios.
   * permisoCitesService Servicio de permisos CITES.
   * consultaQuery Consulta de IO.
   */
  constructor(
    private permisoCitesService: PermisoCitesService,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * Datos para los pasos en el asistente.
   * {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Método del ciclo de vida OnInit.
   * Inicializa el estado de la consulta y determina si se deben cargar los datos del formulario.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Guarda los datos del formulario y actualiza el estado del formulario.
   */
  guardarDatosFormulario(): void {
    this.permisoCitesService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.permisoCitesService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Actualiza el valor del índice según el evento del botón de acción.
   * e El evento del botón de acción que contiene la acción y el valor.
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Método del ciclo de vida AfterViewInit.
   * Llama al método para obtener el tipo de persona del solicitante.
   */
  ngAfterViewInit(): void {
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Método del ciclo de vida OnDestroy.
   * Limpia las suscripciones cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}