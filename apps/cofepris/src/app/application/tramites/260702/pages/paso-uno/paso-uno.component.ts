import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { Service260702Service } from '../../services/service260702.service';

/**
 * Componente que representa el paso uno del trámite.
 * Gestiona la selección de pestañas en el proceso.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent implements OnInit {
  /** Índice de la pestaña seleccionada. */
  indice: number = 1;

  /** Estado actual de la consulta obtenido desde el store. */
  public consultaState!:ConsultaioState;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
   /**
   * Constructor del componente DatosComponent.
   * Inyecta los servicios necesarios para la gestión de pantallas, obtención y actualización de datos,
   * así como la consulta del estado desde el store.
   *
   * @param {service260702Service} Service260702Service - Servicio para obtener y actualizar los datos del formulario del trámite 260702.
   * @param {ConsultaioQuery} consultaQuery - Servicio para consultar el estado actual desde el store.
   */
  constructor(
    private service260702Service: Service260702Service,
    private consultaQuery: ConsultaioQuery
  ) {
// Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }
/**
   * Método del ciclo de vida `ngOnInit`.
   * Inicializa el componente y sus dependencias.
   * Suscribe al observable del estado de consulta para obtener el estado actual desde el store.
   * Si el estado indica que hay una actualización pendiente (`update`), llama al método para guardar los datos del formulario.
   * En caso contrario, activa la bandera para mostrar los datos de respuesta.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
        this.consultaState = seccionState;
    })).subscribe();
      if(this.consultaState.update) {
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
    this.service260702Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.service260702Service.actualizarEstadoFormulario(resp);
        }
      });
  }
  /**
   * Método para seleccionar una pestaña específica.
   * Actualiza el índice de la pestaña seleccionada.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
