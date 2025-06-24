import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { PeximService } from '../../service/pexim.service';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';

/**
 * Componente para gestionar el paso uno del trámite 130118.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent implements AfterViewInit, OnInit, OnDestroy {

  /**
   * Referencia al componente SolicitanteComponent.
   * Permite interactuar con el formulario de datos del solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Referencia al componente SolicitudComponent.
   * Permite interactuar con el formulario de solicitud principal.
   */
  @ViewChild(SolicitudComponent) solicitudComponent!: SolicitudComponent;

  /**
   * Tipo de persona seleccionada (física o moral).
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico para la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña seleccionada en la interfaz de usuario.
   */
  indice: number = 1;

  /**
   * Subject para notificar la destrucción del componente y cancelar suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la consulta obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

  /**
   * Indica si existen datos de respuesta del servidor para actualizar el formulario.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Constructor del componente.
   * Se utiliza para la inyección de dependencias.
   * @param cdr Servicio para detectar cambios manualmente.
   * @param consultaQuery Consulta para obtener el estado de la consulta.
   * @param peximService Servicio para obtener y actualizar datos del formulario.
   */
  constructor(
    private cdr: ChangeDetectorRef,
    private consultaQuery: ConsultaioQuery,
    private peximService: PeximService
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado de consulta y carga datos si es necesario.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormularios();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormularios(): void {
    this.peximService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.peximService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista ha sido inicializada.
   * Configura los datos de persona y domicilio fiscal y asigna el tipo de persona en el componente `SolicitanteComponent`.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;

    setTimeout(() => {
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
      this.cdr.detectChanges();
    }, 0);
  }

  /**
   * Cambia la pestaña seleccionada en la UI.
   * @param i Índice de la pestaña a activar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}