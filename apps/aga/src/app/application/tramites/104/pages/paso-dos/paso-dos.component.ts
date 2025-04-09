import { Catalogo } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
/**
 * **Componente Paso Tres**  
 * 
 * Representa el tercer paso dentro de un flujo de pasos en la aplicación.  
 * Este componente maneja la lógica y la interfaz de usuario para la tercera sección del proceso.
 */
@Component({
  selector: 'app-paso-dos', // Nombre del selector que se usará en el HTML para invocar este componente.
  templateUrl: './paso-dos.component.html', // Ruta del archivo de la plantilla HTML asociada.
})

export class PasoDosComponent {
  /**
   * **Catálogo de documentos**  
   * 
   * Contiene una lista de documentos disponibles en el sistema.  
   * Se llena con los valores obtenidos desde una fuente de datos externa.
   */
  catalogoDocumentos: Catalogo[] = [];


}
