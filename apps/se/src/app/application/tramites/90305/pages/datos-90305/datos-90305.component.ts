/**
 * compo doc
 * @component Datos90305Component
 * @description
 * Componente que gestiona la información del solicitante en el trámite 90305.
 * Permite seleccionar el tipo de persona y cambiar entre diferentes pestañas de datos.
 * Gestiona el estado de consulta y la carga de datos del formulario.
 */

import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { SolicitanteComponent, TIPO_PERSONA, ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { ProsecModificacionServiceTsService } from '../../services/prosec-modificacion.service';
// Importa tus servicios reales si los tienes, por ejemplo:
// import { Pantallas90305Service } from '../../services/pantallas90305.service';
// import { Solicitud90305Service } from '../../services/solicitud90305.service';

/**
 * compo doc
 * @selector app-datos-90305
 */
@Component({
  selector: 'app-datos-90305',
  templateUrl: './datos-90305.component.html',
})
export class Datos90305Component implements OnInit, AfterViewInit, OnDestroy {
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
   * Índice actual del subtítulo seleccionado en la interfaz.
   */
  indice: number = 1;

  // Descomenta y ajusta si tienes servicios específicos
  constructor(
    // public pantallasSvc: Pantallas90305Service,
    private solicitud90305Service: ProsecModificacionServiceTsService,
    private consultaQuery: ConsultaioQuery
  ) {}


  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();

    if (this.consultaState?.update) {
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
    // Descomenta y ajusta si tienes un servicio real
    this.solicitud90305Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solicitud90305Service.actualizarEstadoFormulario(resp);
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
   * Método para actualizar el índice del subtítulo seleccionado.
   * 
   * @param i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
