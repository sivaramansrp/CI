/**
 * Componente que representa el primer paso del proceso de modificación de permiso de salida del territorio.
 * Este componente gestiona la configuración de trámites asociados, el formulario de pago de derechos y la navegación entre pestañas.
 */
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Decorador que define el componente Angular para el primer paso del proceso.
 * Incluye el selector del componente y la ruta de su plantilla HTML.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
/**
 * Clase que representa el componente Angular para el primer paso del proceso.
 * Implementa las interfaces OnInit y OnDestroy para gestionar el ciclo de vida del componente.
 */
export class PasoUnoComponent implements OnDestroy {
  /**
   * Índice de la pestaña seleccionada.
   */
  indice: number = 1;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones.
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * Param formBuilder Constructor para formularios reactivos.
   * Param solicitudPermisoService Servicio para manejar datos relacionados con la solicitud de permiso.
   * Param tramite261401Store Store para gestionar el estado del trámite.
   * Param tramite261401Query Query para obtener datos del estado del trámite.
   */
  constructor() {
    // Constructor
  }



  /**
   * Cambia la pestaña seleccionada y, si es la pestaña de pago, inicializa el formulario de pago.
   * Param i Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }



  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa el Subject para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}