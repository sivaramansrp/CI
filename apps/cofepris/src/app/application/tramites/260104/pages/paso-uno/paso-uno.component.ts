import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { Solocitud260104Service } from '../../services/service260104.service';

/**
 * Componente que representa el paso uno de un trámite.
 * 
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrl ./paso-uno.component.scss
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
   /**
   * El índice de la pestaña actualmente activa.
   * Valor predeterminado: 2 (lo que indica la tercera pestaña, ya que la indexación comienza desde 0).
   */
   public indice = 1;

   /**
   * Constructor del componente. Se inyectan servicios y queries necesarios para el flujo de datos.
   * @param consultaQuery Consulta a los datos del store.
   * @param solocitud31601Service Servicio para carga y actualización de datos del formulario.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solocitud260104Service: Solocitud260104Service,
  ) {}

   /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta obtenido desde el store.
   */
  public consultaState!: ConsultaioState;

    /**
   * Hook de inicialización del componente. Verifica el estado de actualización del store
   * y carga datos en caso necesario.
   */
    ngOnInit(): void {
      this.consultaQuery.selectConsultaioState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.consultaState = seccionState;
            if (this.consultaState.update) {
              this.guardarDatosFormularioDos();
              this.guardarDatosFormulario();
            } else {
              this.esDatosRespuesta = true;
            }
          })
        )
        .subscribe();
  
    }

   /**
    * Cambia el índice de la pestaña activa basado en la selección del usuario.
    * @param i El índice de la pestaña seleccionada por el usuario.
    */
   seleccionaTab(i: number): void {
     this.indice = i;
   }

   
  /**
   * Carga los datos del formulario desde un archivo JSON externo y los actualiza en el store.
   * También establece la bandera de datos cargados en verdadero.
   */
  guardarDatosFormularioDos(): void {
    this.solocitud260104Service
      .getRegistroTomaMuestrasMercanciasDataDos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud260104Service.actualizarEstadoFormularioDos(resp);
        }
      });
  }

  /**
   * Carga los datos del formulario desde un archivo JSON externo y los actualiza en el store.
   * También establece la bandera de datos cargados en verdadero.
   */
  guardarDatosFormulario(): void {
    this.solocitud260104Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud260104Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Hook de destrucción del componente. Limpia las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
