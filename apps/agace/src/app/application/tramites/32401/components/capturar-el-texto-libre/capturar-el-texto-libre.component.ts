import { AlertComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TEXTOS } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente que captura el texto libre
 * Utiliza varias dependencias para la funcionalidad y visualización.
 */
@Component({
  selector: 'app-capturar-el-texto-libre',
  standalone: true,
  imports: [TituloComponent, CommonModule, FormsModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './capturar-el-texto-libre.component.html',
  styleUrl: './capturar-el-texto-libre.component.css',
})
/**
 * Componente que captura el texto libre
 * Utiliza varias dependencias para la funcionalidad y visualización.
 */
export class CapturarElTextoLibreComponent {
  /** Variable que contiene textos compartidos */
  TEXTOS = TEXTOS;

  /** Clase CSS utilizada para mostrar una alerta informativa */
  infoAlert = 'alert-info';

  /** 
   * Constructor de la clase 
   * Aquí se puede agregar lógica adicional si es necesario.
   */
  constructor(public router: Router) {
    // Constructor vacío, se puede agregar lógica adicional si es necesario.
  }

  /**
   * Método para guardar y firmar
   * Navega a la ruta de la página para firmar el manifiesto aéreo
   */
  guardarYFirmar(): void {
    this.router.navigate(['/agace/manifiesto-aereo/firmar']);
  }
}
