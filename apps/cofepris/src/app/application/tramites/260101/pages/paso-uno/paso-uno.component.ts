import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ModificarDestinatarioComponent } from '../../components/modificar-destinatario/modificar-destinatario.component';
import { ModificarMercanciasComponent } from '../../components/modificar-mercancias/modificar-mercancias.component';
import { PagoDerechosComponent } from '../../components/pago-derechos/pago-derechos.component';
import { Service260101Service } from '../../services/service260101.service';
import { SolicitudDatosComponent } from '../../components/solicitud-datos/solicitud-datos.component';
import { TercerosRelacionadosComponent } from '../../components/terceros-relacionados/terceros-relacionados.component';

/**
 * El componente PasoUnoComponent se encarga de gestionar la lógica para el primer paso (Paso Uno) de un proceso.
 * Permite al usuario seleccionar una pestaña y mantiene el índice de la pestaña activa.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone:true,
  imports:[
      SolicitudDatosComponent,
      ModificarMercanciasComponent,
      PagoDerechosComponent,
      TercerosRelacionadosComponent,
      ModificarDestinatarioComponent,
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      SolicitanteComponent,
    ]
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * El índice de la pestaña actualmente activa.
   * Valor predeterminado: 2 (lo que indica la tercera pestaña, ya que la indexación comienza desde 0).
   */
  public indice = 1;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Estado actual de la consulta obtenido desde el store. */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

 /**
 * Constructor del componente `PasoUnoComponent`.
 * 
 * Inyecta los servicios necesarios para:
 * - Consultar el estado actual del formulario desde el store (`consultaQuery`).
 * - Obtener y actualizar los datos del formulario del trámite 260101 (`service260101Service`).
 * 
 * @param consultaQuery Servicio que proporciona acceso al estado de la consulta.
 * @param service260101Service Servicio encargado de manejar los datos del formulario 260101.
 */
constructor(
  private consultaQuery: ConsultaioQuery,
  private service260101Service: Service260101Service
) {
  // Constructor del componente PasoUnoComponent.
  // Inyecta los servicios necesarios para la consulta del estado desde el store y la obtención de datos del formulario.
}

  /**
   * Método del ciclo de vida `ngOnInit`.
   * Inicializa el componente y sus dependencias.
   * Suscribe al observable del estado de consulta para obtener el estado actual desde el store.
   * Si el estado indica que hay una actualización pendiente (`update`), llama al método para guardar los datos del formulario.
   * En caso contrario, activa la bandera para mostrar los datos de respuesta.
   */
  ngOnInit(): void {
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
    this.service260101Service
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.service260101Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Cambia el índice de la pestaña activa basado en la selección del usuario.
   * @param i El índice de la pestaña seleccionada por el usuario.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método del ciclo de vida `ngOnDestroy`.
   * Se ejecuta cuando el componente es destruido.
   * Notifica a los observables suscritos que deben finalizar y libera los recursos asociados.
   *
   * @example
   * // Angular llama automáticamente a este método al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
