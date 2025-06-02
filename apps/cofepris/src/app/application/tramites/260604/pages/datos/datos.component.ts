import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ConsultaioQuery, ConsultaioState, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { DatosServiceService } from '../../../../shared/services/datos-service.service'

import { map, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!: ConsultaioState;

  /**
  * Esta variable se utiliza para almacenar el índice del subtítulo.
export class DatosPageComponent {
 /**
 * Esta variable se utiliza para almacenar el índice del subtítulo.
 */
  indice: number = 1;
  /**
   * Este método se utiliza para establecer el índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  constructor(
    public datosservice: DatosServiceService,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  ngOnInit(): void {
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
    this.datosservice
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.datosservice.actualizarEstadoFormulario(resp);
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

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
