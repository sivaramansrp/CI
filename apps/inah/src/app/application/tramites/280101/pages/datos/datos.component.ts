import { Component, OnInit, ViewChild } from '@angular/core';
import { PermisoDeExportacionService } from '../../services/permiso-de-exportacion.service';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente DatosComponent.
 * 
 * Este componente es responsable de manejar la lógica y la interacción de la vista
 * asociada al archivo `datos.component.html`. Permite la selección de pestañas y 
 * la interacción con el componente hijo `SolicitanteComponent`.
 */
@Component({
  selector: 'app-datos', // Selector del componente
  templateUrl: './datos.component.html', // Ruta del archivo HTML asociado al componente
  styleUrl:'./datos.component.scss',
})
export class DatosComponent implements OnInit {
  /**
   * Índice del subtítulo actual.
   * 
   * Esta variable se utiliza para almacenar el índice de la pestaña seleccionada.
   * Por defecto, se inicializa con el valor 1.
   */
  indice: number = 1;

  /**
   * Referencia al componente hijo SolicitanteComponent.
   * 
   * Utiliza el decorador `@ViewChild` para obtener acceso al componente hijo
   * SolicitanteComponent, lo que permite interactuar con él desde este componente.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Constructor del componente.
   * 
   * @param service - Servicio de PermisoDeExportacionService que se utiliza para
   * compartir datos y lógica entre diferentes componentes.
   */
  constructor(public service: PermisoDeExportacionService) {}

  /**
   * Método de inicialización del componente.
   * 
   * Este método se ejecuta al inicializar el componente. Si el servicio contiene
   * un índice predefinido, selecciona automáticamente la pestaña correspondiente.
   */
  ngOnInit(): void {
    if (this.service.indice) {
      this.seleccionaTab(this.service.indice);
    }
  }

  /**
   * Método para seleccionar una pestaña específica.
   * 
   * Este método actualiza el índice de la pestaña seleccionada, permitiendo
   * cambiar entre diferentes vistas o secciones de la interfaz.
   * 
   * @param i - Índice de la pestaña que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.service.indice = i;
  }

  /**
   * Método para determinar si una pestaña está deshabilitada.
   * 
   * Este método verifica si una pestaña específica debe estar deshabilitada
   * según su índice.
   * 
   * @param tabIndex - Índice de la pestaña que se desea verificar.
   * @returns `true` si la pestaña está deshabilitada, `false` en caso contrario.
   */
  isTabDisabled(tabIndex: number): boolean {

    return tabIndex === 5 || tabIndex === 6;
  }
}
