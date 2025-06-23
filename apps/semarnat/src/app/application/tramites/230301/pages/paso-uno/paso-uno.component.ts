import { AVISO, ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { DesistimientoSolicitudService } from '../../services/desistimiento-solicitud.service';
import { Solicitud230301Store } from '../../estados/tramites/tramites230301.store';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit , OnDestroy{

  /**
   * @property {number} indice - Índice actual del paso.
   */
  indice: number = 1;
  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = AVISO.Aviso;
  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject utilizado para notificar la destrucción del componente y evitar fugas de memoria.
   * @type {Subject<void>}
   */
  public formularioDeshabilitado: boolean = false;

  /**
   * Subject para notificar la destrucción del componente y evitar fugas de memoria.
   * @type {Subject<void>}
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente `PasoUnoComponent`.
   * @param {Solicitud230301Store} tramite230301Store - Almacén para gestionar el estado de la solicitud.
   * @param {ConsultaioQuery} consultaQuery - Consulta para obtener el estado de la consulta.
   * @param {DesistimientoSolicitudService} desistimientoSolicitudService - Servicio para manejar solicitudes de desistimiento.
   * @description
   * Este constructor inicializa el componente y se suscribe al estado de la consulta para obtener
   * información sobre el procedimiento actual. Si el estado de la consulta indica que se debe actualizar,
   * se llama al método `guardarDatosFormulario` para cargar los datos desde un archivo JSON.
   * @returns {void}
   */
   constructor(private tramite230301Store:Solicitud230301Store,
    private consultaQuery: ConsultaioQuery,
    private desistimientoSolicitudService: DesistimientoSolicitudService) {
       this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaState = seccionState;
      this.formularioDeshabilitado = seccionState.readonly;
    })).subscribe();
   }


   ngOnInit(): void {
      if (this.consultaState && this.consultaState.procedureId === '230301' &&
      this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
   }

  /**
   * @method seleccionaTab
   * @description Selecciona una pestaña específica estableciendo el índice correspondiente.
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
 * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
 * Luego reinicializa el formulario con los valores actualizados desde el store.
 */
  guardarDatosFormulario(): void {
    this.desistimientoSolicitudService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)).subscribe((resp) => {
          if (resp) {
            this.esDatosRespuesta = true;
            this.desistimientoSolicitudService.actualizarEstadoFormulario(resp);
          }
        });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Emite un valor en `destroyNotifier$` y completa el observable para limpiar las suscripciones activas.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
