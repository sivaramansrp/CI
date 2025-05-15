import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente PasoDocComponent.
 * Este componente maneja la lógica relacionada con el paso de documentos en el flujo de trámites.
 * 
 * @example
 * <app-paso-doc></app-paso-doc>
 * 
 * @description
 * Este componente incluye funcionalidades para manejar la firma de documentos y la navegación
 * a la página de acuse en caso de que la firma sea válida.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
  /**
   * Constructor del componente.
   * 
   * @param {Router} router - Servicio de enrutamiento para manejar la navegación entre páginas.
   */
  constructor(private router: Router) {}

  /**
   * Obtiene la firma y navega a la página de acuse si la firma es válida.
   * 
   * @param {string} ev - La firma obtenida como cadena de texto.
   * 
   * @description
   * Este método verifica si la firma proporcionada es válida y, en caso afirmativo,
   * redirige al usuario a la página de acuse correspondiente.
   * 
   * @example
   * this.obtieneFirma('firma123');
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']);
    }
  }
}
