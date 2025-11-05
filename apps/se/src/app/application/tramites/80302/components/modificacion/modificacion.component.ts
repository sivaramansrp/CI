import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DatosDelModificacion } from '../../estados/models/datos-tramite.model';
import { DatosModificacion } from '../../../../shared/models/modificacion.model';
import { EliminacionModificacionComponent } from '../../../../shared/components/modificacion/modificacion.component';
import { SolicitudService } from '../../service/solicitud.service';

@Component({
  selector: 'app-modificacion',
  standalone: true,
  imports: [
    CommonModule,
    EliminacionModificacionComponent
  ],
  templateUrl: './modificacion.component.html',
  styleUrl: './modificacion.component.scss',
})
export class ModificacionComponent implements OnInit, OnDestroy {
  /**
   * Constructor del componente ModificacionComponent.
   * @param solicitudService Servicio para manejar solicitudes relacionadas con el trámite.
   * @param consultaioQuery Estado de la consulta.
   */
  constructor(
    private solicitudService: SolicitudService,
    private consultaioQuery: ConsultaioQuery
  ) {}

  /**
   * Observable para notificar la destrucción del componente.
   * Se utiliza para cancelar suscripciones activas y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();  

  /**
   * Define los datos que se mostrarán en la tabla dinámica.
   */
  datosTabla: DatosDelModificacion[] = [];

  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  soloLectura: boolean = false;

  /**
   * @property {DatosModificacion} datosModificacion
   * @description Datos relacionados con la modificación del trámite.
  */
  datosModificacion!: DatosModificacion;

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura el formulario, carga los datos de modificación y los datos de la tabla.
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaDatos = seccionState;
        this.soloLectura = this.consultaDatos.readonly;
      })
    )
    .subscribe();

    this.loadDatosModificacion();
    this.loadDatosTablaData();
  }

  /**
   * Carga los datos de modificación desde el servicio.
   * Actualiza el estado del trámite y los valores del formulario.
   */
  loadDatosModificacion(): void {
    this.solicitudService.getDatosModificacion()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((datos) => {
      this.datosModificacion = datos;
    });
  }

  /**
   * Cargar datos de la tabla.
   *
   * Este método obtiene los datos de la tabla desde el servicio `datosTramiteService`
   * y los almacena en la propiedad `datosTabla`. Utiliza `takeUntil` para cancelar la suscripción
   * cuando el componente se destruye, evitando fugas de memoria.
   *
   * @example
   * // Llamar al método para cargar los datos de la tabla
   * this.loadDatosTablaData();
   */
  loadDatosTablaData(): void {
    this.solicitudService.getDatosTableData()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((data) => {
      this.datosTabla = data;
    });
  }

  /**
   * Alterna el estado de un registro en la tabla entre 'Baja' y 'Activada'.
   *
   * @param row - El registro de la tabla que se desea modificar. Debe contener un identificador único (`id`).
   *
   * @remarks
   * Este método busca el índice del registro en la tabla `datosTabla` utilizando el identificador (`id`) del registro proporcionado.
   * Luego, cambia el valor de la propiedad `desEstatus` del registro encontrado:
   * - Si el estado actual es 'Baja', se cambia a 'Activada'.
   * - Si el estado actual es diferente de 'Baja', se cambia a 'Baja'.
   *
   * @example
   * ```typescript
   * const registro = { id: 1, desEstatus: 'Baja' };
   * this.valorDeAlternancia(registro);
   * // Ahora, registro.desEstatus será 'Activada'.
   * ```
   */
  valorDeAlternancia(event: {
    row: unknown;
    column: string;
  }):void { 
    const ROW = event.row as DatosDelModificacion;
    const INDEX = this.datosTabla.findIndex((x) => x.id === ROW.id);
    this.datosTabla[INDEX].desEstatus = this.datosTabla[INDEX].desEstatus === 'Baja' ? 'Activada' : 'Baja';
  }  

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }
}