import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { SolicitanteComponent } from '../../components/solicitante/solicitante.component';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';
import { Subject } from 'rxjs';
import { Tramite6403Query } from '../../estados/tramite6403.query';
import { Tramite6403State } from '../../estados/tramite6403.store';
import { Tramite6403Store } from '../../estados/tramite6403.store';
import { map } from 'rxjs';
import { takeUntil,ReplaySubject } from 'rxjs';
import { RetornoDePartesService } from '../../services/retorno-de-partes.service';

/**
 * Componente para gestionar el paso uno del trámite 6403.
 * 
 * Este componente permite al usuario navegar entre las pestañas del trámite y gestionar
 * los datos del solicitante y del aviso.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, SolicitudComponent]
})
export class PasoUnoComponent implements OnInit, OnDestroy {
 /**
   * Indica si los datos de respuesta están disponibles.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
   /**
     * Estado de la consulta, utilizado para manejar el estado de la aplicación.
     */
  public consultaState!: ConsultaioState;
  /**
   * Referencia al componente `SolicitanteComponent`.
   * 
   * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente
   * del solicitante dentro de la plantilla.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Índice de la pestaña activa.
   * 
   * Esta propiedad indica la pestaña actual seleccionada en el componente.
   */
  indice: number = 1;

  /**
   * Estado actual del trámite 6403.
   * 
   * Esta propiedad almacena el estado del trámite obtenido desde el store.
   */
  public tramiteState!: Tramite6403State;

  /**
   * Indica si los datos de respuesta están disponibles.
   * 
   * Esta propiedad se utiliza para determinar si los datos de respuesta del trámite
   * están listos para ser mostrados en la interfaz de usuario.
   */
  public esDatosRespuesta: boolean = false;
  /**
   * Constructor del componente.
   * 
   * @param {Tramite6403Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite6403Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    public store: Tramite6403Store,
    public tramiteQuery: Tramite6403Query,
    private consultaQuery: ConsultaioQuery,
    private reterno : RetornoDePartesService  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Este método suscribe al estado del trámite y actualiza la propiedad `tramiteState`
   * con los datos obtenidos. También inicializa el índice de la pestaña activa.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.indice = this.tramiteState.pestanaActiva;

     this.consultaQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
    if (!this.consultaState.update) {
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
    this.reterno
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.reterno.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Cambia la pestaña activa.
   * 
   * Este método actualiza el índice de la pestaña activa y llama al método correspondiente
   * del store para actualizar el estado.
   * 
   * @param {number} i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.store.setPestanaActiva(this.indice);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Este método emite un valor al `destroyed$` y lo completa para cancelar
   * todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}