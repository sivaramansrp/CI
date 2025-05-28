import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';

/**
 * Componente para el paso uno del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements AfterViewInit, OnDestroy {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   * @type {SolicitanteComponent}
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Estado actual de la consulta para el componente.
   * 
   * Esta propiedad almacena la información relacionada con el estado de la consulta
   * en el flujo del trámite. Utiliza el tipo `ConsultaioState` para definir la estructura
   * de los datos gestionados.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente PasoUno.
   * 
   * @param consultaQuery Servicio para consultar el estado de la consulta.
   * @param serviciosPermisoSanitarioService Servicio para gestionar los permisos sanitarios.
   * 
   * Al inicializar, se suscribe al observable del estado de la consulta y actualiza la propiedad `consultaState`.
   * Si el estado indica que se debe actualizar (`update`), guarda los datos del formulario.
   * En caso contrario, establece la bandera `esDatosRespuesta` en verdadero.
   */
  constructor(private consultaQuery: ConsultaioQuery, private serviciosPermisoSanitarioService: ServiciosPermisoSanitarioService) {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
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
    this.serviciosPermisoSanitarioService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.serviciosPermisoSanitarioService.actualizarEstadoTramite260215(resp);
        }
      });
  }



  /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
  ngAfterViewInit(): void {
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Índice del tab seleccionado.
   */
  indice: number = 1;

  /**
   * Método para seleccionar un tab.
   * @param i Índice del tab.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

/**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
