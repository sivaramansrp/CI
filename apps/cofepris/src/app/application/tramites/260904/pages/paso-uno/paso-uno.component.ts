import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
} from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { ModificacionDelPermisoSanitarioService } from '../../services/modificacion-del-permiso-sanitario.service';

/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * El índice de la pestaña actualmente seleccionada.
   */
  indice: number = 1;

  /**
   * Indica si los datos de respuesta están disponibles.
   */
  esDatosRespuesta: boolean = false;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject<void>();

  /**
   * Estado actual de la consulta.
   */
  consultaioState!: ConsultaioState;

  /**
   * Constructor del componente.
   * consultaQuery Servicio para consultar el estado de la consulta.
   * modificacionDelPermisoSanitarioService Servicio para manejar la modificación del permiso sanitario.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private modificacionDelPermisoSanitarioService: ModificacionDelPermisoSanitarioService
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al observable del estado de consulta y actualiza la propiedad `consultaioState`.
   * Dependiendo del valor de `consultaioState.update`, guarda los datos del formulario o marca que los datos son de respuesta.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaioState = seccionState;
        })
      )
      .subscribe();
    if (this.consultaioState.update) {
      
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Guarda los datos del formulario en el estado de la consulta.
   * Este método se invoca cuando se detecta que el estado requiere actualización.
   */
  guardarDatosFormulario(): void {
    this.modificacionDelPermisoSanitarioService
      .getData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.modificacionDelPermisoSanitarioService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Selecciona una pestaña estableciendo su índice.
   * i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Libera los recursos y evita fugas de memoria completando el notificador.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
