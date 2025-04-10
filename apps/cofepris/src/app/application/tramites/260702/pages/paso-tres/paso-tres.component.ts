import { Catalogo } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';

/**
 * Componente que representa el paso tres del trámite.
 * Gestiona la anexión de documentos requeridos.
 */
@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  /** Catálogo de documentos disponibles para anexar. */
  catalogoDocumentos: Catalogo[] = [];

  // Aquí se pueden agregar métodos y propiedades adicionales con sus respectivos comentarios.
}
