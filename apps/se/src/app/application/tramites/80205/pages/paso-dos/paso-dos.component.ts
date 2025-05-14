import { Component } from '@angular/core';
import { TEXTOS} from '@ng-mf/data-access-user';

/**
 * Componente Angular que representa el paso dos de un trámite.
 * 
 * @selector app-paso-dos
 * @template ./paso-dos.component.html
 * 
 * @description
 * Este componente utiliza la constante `TEXTOS` para manejar textos
 * relacionados con la interfaz de usuario. Es parte del flujo de un trámite
 * específico dentro de la aplicación.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
 
})

/**
 * Componente PasoDosComponent.
 * Este componente representa el segundo paso en el flujo de trámites.
 * 
 * Propiedades:
 * - `TEXTOS`: Contiene los textos utilizados en el componente, importados desde la constante global `TEXTOS`.
 */
export class PasoDosComponent {
  TEXTOS = TEXTOS;
}
