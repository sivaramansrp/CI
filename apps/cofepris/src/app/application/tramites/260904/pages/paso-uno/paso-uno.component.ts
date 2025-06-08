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

  esDatosRespuesta: boolean = false;

  destroyNotifier$: Subject<void> = new Subject<void>();

   consultaioState!: ConsultaioState;

   constructor(
    private consultaQuery: ConsultaioQuery,
    private modificacionDelPermisoSanitarioService: ModificacionDelPermisoSanitarioService
  ) {}

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaioState = seccionState;
        })
      )
      .subscribe();
    if (true) {
      // this.consultaioState.update
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
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
