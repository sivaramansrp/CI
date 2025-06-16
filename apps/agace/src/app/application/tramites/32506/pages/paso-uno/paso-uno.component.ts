import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AvisoComponent } from '../../components/aviso/aviso.component';
import { AvisoDestruccionService } from '../../services/aviso-destruccion.service';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { ConsultaioState } from '@libs/shared/data-access-user/src';
import { SolicitanteComponent } from '../../components/solicitante/solicitante.component';
import { Subject } from 'rxjs';
import { Tramite32506Aviso } from '../../models/aviso-destruccion.model';
import { Tramite32506Query } from '../../estados/tramite32506.query';
import { Tramite32506State } from '../../estados/tramite32506.store';
import { Tramite32506Store } from '../../estados/tramite32506.store';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para gestionar el paso uno del trámite 32506.
 *
 * Este componente permite al usuario navegar entre las pestañas del trámite y gestionar
 * los datos del solicitante y del aviso.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, AvisoComponent],
})
export class PasoUnoComponent implements OnInit, OnDestroy {
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
   * Estado actual del trámite 32506.
   *
   * Esta propiedad almacena el estado del trámite obtenido desde el store.
   */
  public tramiteState!: Tramite32506State;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   *
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Estado de la consulta que se obtiene del store. */
  public consultaState!: ConsultaioState;

  /**
   * Constructor del componente.
   *
   * @param {Tramite32506Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite32506Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    public store: Tramite32506Store,
    public tramiteQuery: Tramite32506Query,
    public avisoDestruccionService: AvisoDestruccionService,
    private consultaQuery: ConsultaioQuery,
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   *
   * Este método suscribe al estado del trámite y actualiza la propiedad `tramiteState`
   * con los datos obtenidos. También inicializa el índice de la pestaña activa.
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
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.indice = this.tramiteState.pestanaActiva;
  }

  /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
    guardarDatosFormulario(): void {
      this.avisoDestruccionService
        .guardarDatosFormulario()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((resp: Tramite32506Aviso) => {
          if (resp) {
            this.esDatosRespuesta = true;
            this.avisoDestruccionService.actualizarEstadoFormulario(resp);
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
   * Este método emite un valor al `destroyNotifier$` y lo completa para cancelar
   * todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
