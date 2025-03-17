import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente para el paso tres del proceso.
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss']
})
export class PasoTresComponent{
   /**
   * componente doc
   * @constructor
   * @param {Router} router - Servicio de Angular para la navegación entre rutas.
   */
   constructor(private router: Router) {
    // Constructor del componente
  }

  /**
   * Obtiene la firma y navega a la página de acuse.
   * @param ev - Evento que contiene la firma.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']);
    }
  }
}