import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

/**
 * Componente PasoUnoComponent.
 * 
 * Este componente representa el primer paso de un flujo de trámites.
 * Contiene la lógica para manejar la selección de pestañas.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Índice de la pestaña seleccionada actualmente.
   * Valor inicial: 1.
   */
  indice: number = 1;
 
  /**
   * Indica si los datos de respuesta están disponibles.
   * Valor inicial: false.
   */

  public esDatosRespuesta: boolean = false;

  /**
   * Estado de la consulta actual.
   * Este estado se obtiene a través de ConsultaioQuery.
   */

  public consultaState!: ConsultaioState;

  /**
   * Subject para notificar la destrucción del componente.
   * Se utiliza para limpiar suscripciones y evitar fugas de memoria.
   */

  public destroyNotifier$: Subject<void> = new Subject();


  /**
   * Cambia el índice de la pestaña seleccionada.
   * 
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  constructor(
    private consultaQuery: ConsultaioQuery,
    private ampliacionServiciosService: AmpliacionServiciosService
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }
  
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado de consulta y actualiza el estado del componente según sea necesario.
   */

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.subscribe((seccionState) => {
      this.consultaState = seccionState;
      if (this.consultaState.update) {
        this.guardarDatosFormulario();
      } else {
        this.esDatosRespuesta = true;
      }
    });
  }
  /**
   * Guarda los datos del formulario utilizando el servicio de ampliación de servicios.
   */
  guardarDatosFormulario(): void {
    this.ampliacionServiciosService
    .getServiciosData().pipe(
      takeUntil(this.destroyNotifier$)
    )
    .subscribe((resp) => {
      if(resp) {
       this.esDatosRespuesta = true;
       this.ampliacionServiciosService.actualizarEstadoFormulario(resp);
     
      }
    });
}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
ngOnDestroy(): void {
  this.destroyNotifier$.next();
  this.destroyNotifier$.complete();
}
}
