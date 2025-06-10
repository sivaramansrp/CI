import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { Solocitud130301Service } from '../../services/service130301.service';

/**
 * Componente para gestionar el paso uno del trámite.
 * Este componente permite al usuario seleccionar una pestaña y gestionar información del solicitante.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements AfterViewInit,OnInit,OnDestroy {

    /**
   * Constructor del componente. Se inyectan servicios y queries necesarios para el flujo de datos.
   * @param consultaQuery Consulta a los datos del store.
   * @param solocitud130301Service Servicio para carga y actualización de datos del formulario.
   */
    constructor(
      private consultaQuery: ConsultaioQuery,
      private solocitud130301Service: Solocitud130301Service,
    ) {}
  
  /**
   * Índice para manejar la pestaña seleccionada.
   * Este valor determina cuál pestaña está activa en la interfaz de usuario.
   * 
   * @type {number}
   */
  public indice: number = 1;

  /**
 * Indica si ya se cargaron los datos de respuesta para mostrar en el formulario.
 */
  public esDatosRespuesta: boolean = false;

  /**
   * Observable para gestionar la destrucción del componente y evitar fugas de memoria.
   */
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
            this.guardarDatosFormulario();
          } else {
            this.esDatosRespuesta = true;
          }
        })
      )
      .subscribe();

  }

  /**
   * Decorador `ViewChild` para acceder a la instancia del componente `SolicitanteComponent`.
   * Este componente se utiliza para gestionar información relacionada con el solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista ha sido inicializada.
   * En este método se llama al componente `SolicitanteComponent` para establecer el tipo de persona.
   */
  ngAfterViewInit(): void {
    // Llama al método para obtener el tipo de persona (en este caso, una persona moral nacional)
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Permite que el usuario seleccione una pestaña cambiando el valor de `indice`.
   * 
   * @param {number} indice El índice de la pestaña seleccionada.
   */
  seleccionaTab(indice: number): void {
    // Establece el índice de la pestaña seleccionada
    this.indice = indice;
  }

  /**
   * Carga los datos del formulario desde un archivo JSON externo y los actualiza en el store.
   * También establece la bandera de datos cargados en verdadero.
   */
  guardarDatosFormulario(): void {
    this.solocitud130301Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud130301Service.actualizarEstadoFormulario(resp);
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