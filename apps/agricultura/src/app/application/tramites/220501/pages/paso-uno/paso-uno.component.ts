import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormularioDinamico, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { SagarpaService } from '../../services/sagarpa/sagarpa.service';
import { Solicitud220501Store } from '../../estados/tramites220501.store';


/**
 * Componente para gestionar el paso uno del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone: false,
})
export class PasoUnoComponent implements OnInit, AfterViewInit {
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
   * Indica si el formulario está deshabilitado.
   */
  formularioDeshabilitado: boolean = false;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * Se utiliza para la inyección de dependencias.
   * 
   * @param cdr Servicio para detectar cambios manualmente.
   */
  constructor(
    private cdr: ChangeDetectorRef,
    private consultaQuery: ConsultaioQuery,
    private solicitud220501Store: Solicitud220501Store,
    private sagarpaService: SagarpaService,
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

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
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.sagarpaService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solicitud220501Store.setSagarpaState(resp);
          this.sagarpaService.actualizarEstadoFormulario(resp);
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
   * Método para seleccionar una pestaña.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

}