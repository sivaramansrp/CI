import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState} from '@ng-mf/data-access-user';
import {Subject, map,takeUntil } from 'rxjs';
import { ModificacionPermisoLabService } from '../../services/modificacion-permiso-lab.service';
/**
 * Componente que representa el paso uno del formulario.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent implements OnInit {
  /**
  * showPreFillingOptions
  * Indica si se deben mostrar las opciones de prellenado.
  */
  showPreFillingOptions: boolean = false;

  /**
 * Índice de la pestaña actualmente seleccionada.
 * Inicializado a 1 por defecto.
 */
  indice = 1;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado actual de la consulta obtenido del store. */
  public consultaState!: ConsultaioState;


  /**
   * Método para seleccionar una pestaña específica.
   *
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Constructor del componente.
   * @param consultaQuery Servicio para consultar el estado de la consulta.
   * @param modificacionPermisoLabService Servicio para manejar la modificación del permiso de laboratorio.
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private modificacionPermisoLabService: ModificacionPermisoLabService
  ) {

  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al estado de la consulta y actualiza la propiedad consultaState.
   * Si el estado indica que hay una actualización, guarda los datos del formulario y de pago de derechos.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          // Actualiza el estado de la consulta con el valor recibido del store
          this.consultaState = seccionState;
        })
      )
      .subscribe();

    // Si el estado indica que hay una actualización, guarda los datos del formulario y de pago de derechos
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
      this.guardarDatosFormularioPagoDerechos();
    } 
  }
 

  /**
   * Método para guardar los datos iniciales del formulario.
   * Obtiene los datos iniciales del formulario desde el servicio y actualiza el estado del formulario.
   */
  guardarDatosFormulario(): void {
    this.modificacionPermisoLabService
      .obtenerDatosInicialesFormulario()
      .pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.modificacionPermisoLabService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Método para guardar los datos del formulario de pago de derechos.
   * Obtiene los valores del formulario de pago de derechos desde el servicio y actualiza el estado correspondiente.
   */
  guardarDatosFormularioPagoDerechos(): void {
    this.modificacionPermisoLabService
      .obtenerValoresFormularioPagoDerechos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.modificacionPermisoLabService.actualizarValoresFormularioPagoDerechos(resp);
        }
      });
  }

 
}
