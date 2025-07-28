import { AlertComponent } from "@ng-mf/data-access-user";
import { AnexarDocumentosComponent } from "@ng-mf/data-access-user";
import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../constants/permiso-importacion-modification.enum';
import { TituloComponent } from "@ng-mf/data-access-user";

 /**
 * @Component
 * Componente para el paso dos del trámite.
 *
 * Este componente muestra los requisitos y permite anexar documentos necesarios para continuar con el trámite.
 * Utiliza componentes auxiliares para mostrar alertas, títulos y el formulario de anexar documentos.
 *
 * @selector app-paso-dos
 * @template ./paso-dos.component.html
 * @estilo ./paso-dos.component.scss
 * @standalone
 * @importa CommonModule, TituloComponent, AlertComponent, AnexarDocumentosComponent
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
  standalone: true,
  imports: [CommonModule, TituloComponent, AlertComponent, AnexarDocumentosComponent],
})

/**
 * Componente principal para el paso dos del trámite de Permiso de Importación.
 *
 * Muestra los textos de requisitos y el formulario para anexar documentos.
 *
 * @export
 * @class PasoDosComponent
 */
export class PasoDosComponent {
  /**
   * Objeto con los textos de los requisitos.
   * @property {object} TEXTOS_REQUISITOS
   */
  TEXTOS = TEXTOS_REQUISITOS;
}