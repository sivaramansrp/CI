import { Component, QueryList, ViewChildren } from '@angular/core';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { PermisoSanitarioProductosService } from '../../services/permiso-sanitario-productos.service';

/**
 * Componente que representa el paso uno del trámite 260104.
 * Este componente gestiona la interacción con las pestañas y los componentes de datos de la solicitud.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * Lista de instancias del componente `DatosDeLaSolicitudComponent` presentes en la vista.
   * Se utiliza para interactuar con múltiples componentes de datos de la solicitud.
   */
  @ViewChildren(DatosDeLaSolicitudComponent)
  datosSolicitudComponents!: QueryList<DatosDeLaSolicitudComponent>;

  /**
   * Constructor del componente.
   * @param service - Servicio para gestionar los datos de permisos sanitarios.
   */
  constructor(public service: PermisoSanitarioProductosService) {
    // Constructor vacío, no requiere inicialización adicional.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta después de que la vista ha sido inicializada.
   * Establece las instancias de `DatosDeLaSolicitudComponent` en el servicio.
   */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.service.setDatosSolicitudComponents(this.datosSolicitudComponents.toArray());
    });
  }

  /**
   * El índice de la pestaña actualmente activa.
   * Valor predeterminado: 1 (lo que indica la segunda pestaña, ya que la indexación comienza desde 0).
   */
  public indice = 1;

  /**
   * Cambia el índice de la pestaña activa basado en la selección del usuario.
   * @param i - El índice de la pestaña seleccionada por el usuario.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
