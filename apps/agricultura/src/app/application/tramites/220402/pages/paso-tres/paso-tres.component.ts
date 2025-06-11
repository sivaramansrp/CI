import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente para mostrar el subtítulo del asistente.
 * @component PasoTresComponent
 * @selector app-paso-tres
 * @templateUrl ./paso-tres.component.html
 * @styleUrls ./paso-tres.component.scss --220201
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss']
})
export class PasoTresComponent {
  /**
   * @constructor
   * @description
   * Constructor que inyecta `Router` para la navegación.
   *
   * @param {Router} router - Servicio de Angular para manejar la navegación.
   * @access public
   */
  constructor(private router: Router) {
    // Constructor
  }

  obtieneFirma(ev: string): void {
    const FIRMA = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']);
    }
  }

}