import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RevisionDocumentalComponent } from '../../components/revision-documental/revision-documental.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudDatosComponent } from '../../components/SolicitudDatos/SolicitudDatos.component';
import { Solocitud220503Service } from '../../services/service220503.service';
/** Componente para gestionar el primer paso del trámite */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  imports: [
    CommonModule,
    SolicitanteComponent,
    SolicitudDatosComponent,
    RevisionDocumentalComponent,
  ],
  standalone: true,
})
/** Componente para gestionar el primer paso del trámite */
export class PasoUnoComponent implements OnDestroy, OnInit {
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Realiza un seguimiento del índice de la pestaña seleccionada actualmente */
  indice: number = 1;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta.
   * Esta propiedad representa el estado de la lógica relacionada con la consulta.
   * Se espera que sea asignada antes de su uso.
   */
  public consultaState!: ConsultaioState;

  /**
   * Constructor de la clase.
   * Inyecta los servicios necesarios para manejar la lógica de solicitudes y consultas.
   *
   * @param solocitud220503Service Servicio encargado de gestionar las solicitudes.
   * @param consultaQuery Consulta que proporciona acceso al estado de la consulta.
   */
  constructor(
    private solocitud220503Service: Solocitud220503Service,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * Aquí se deben colocar las inicializaciones necesarias, como suscripciones a observables,
   * carga de datos iniciales o configuración del estado del componente.
   */

  ngOnInit(): void {
    /**
     * Se suscribe al estado de la consulta utilizando un observable.
     * Al recibir un nuevo estado, lo asigna a la propiedad `consultaState`.
     *
     * Si el estado indica que se debe actualizar (`update` es verdadero),
     * se llama al método `guardarDatosFormulario()`.
     * De lo contrario, se establece `esDatosRespuesta` como verdadero.
     */

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
    this.solocitud220503Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud220503Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Actualiza el índice de la pestaña seleccionada.
   * @param i - The index of the selected tab
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   *
   * Emite una señal a `destroyNotifier$` para cancelar suscripciones activas
   * y luego completa el observable para liberar recursos.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
