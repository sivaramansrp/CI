// taglibs.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaglibsService {
  private rutaContexto: string;
  private lenguaje: string;

  constructor() {
    // Inicializar rutaContexto usando la ruta actual del navegador
    this.rutaContexto = window.location.pathname;

    // Obtener el lenguaje del navegador, por defecto a 'es' (español) si no está disponible
    this.lenguaje = navigator.language || 'es';
  }

  /**
   * Obtiene la ruta de contexto de la aplicación.
   * @returns {string} La ruta de contexto.
   */
  obtenerRutaContexto(): string {
    return this.rutaContexto;
  }

  /**
   * Obtiene el lenguaje actual de la aplicación.
   * @returns {string} El código de lenguaje (e.g., 'es', 'en').
   */
  obtenerLenguaje(): string {
    return this.lenguaje;
  }
}