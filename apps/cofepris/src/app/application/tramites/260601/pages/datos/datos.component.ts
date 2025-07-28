import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
  FormularioDinamico,
  SolicitanteComponent,
  TIPO_PERSONA,
} from '@ng-mf/data-access-user';
import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  PERSONA_MORAL_NACIONAL,
} from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { Subject, map, takeUntil } from 'rxjs';
import { AvisoSanitarioState } from '../../../../estados/tramites/tramite260601.store';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Service260601Service } from '../../services/service260601.service';
import { TercerosRelacionadosComponent } from '../../components/terceros-relacionados/terceros-relacionados.component';

/**
 * Componente para gestionar el paso uno del trámite.
 */
@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolicitanteComponent,
    TercerosRelacionadosComponent,
    DatosDeLaSolicitudComponent
  ],
  templateUrl: './datos.component.html',
  styles: ``,
})
export class DatosComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
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

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado actual de la consulta obtenido desde el store. */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * Constructor del componente.
   * Se utiliza para la inyección de dependencias.
   *
   * @param cdr Servicio para detectar cambios manualmente.
   * @param consultaQuery Servicio para consultar el estado de la consulta.
   * @param service260601Service Servicio para gestionar la lógica del trámite 260601.
   */
  constructor(
    private cdr: ChangeDetectorRef,
    private consultaQuery: ConsultaioQuery,
    private service260601Service: Service260601Service
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  /**
   * Método del ciclo de vida `ngOnInit`.
   * Inicializa el componente y sus dependencias.
   * Suscribe al observable del estado de consulta para obtener el estado actual desde el store.
   * Si el estado indica que hay una actualización pendiente (`update`), llama al método para guardar los datos del formulario.
   * En caso contrario, activa la bandera para mostrar los datos de respuesta.
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
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.service260601Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp: AvisoSanitarioState) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.service260601Service.actualizarEstadoFormulario(resp);
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
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Selecciona la pestaña especificada.
   *
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  /**
   * Método del ciclo de vida `ngOnDestroy`.
   * Se ejecuta cuando el componente es destruido.
   * Notifica a los observables suscritos que deben finalizar y libera los recursos asociados.
   *
   * @example
   * // Angular llama automáticamente a este método al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
