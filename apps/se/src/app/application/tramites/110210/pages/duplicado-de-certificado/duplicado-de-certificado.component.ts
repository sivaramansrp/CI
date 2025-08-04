import { Component, EventEmitter, Output } from '@angular/core';

/**
 * @descripcion
 * El componente `DuplicadoDeCertificadoComponent` es responsable de renderizar la interfaz de usuario
 * y manejar la lógica para la página "Duplicado de Certificado" en la aplicación.
 *
 * @selector app-duplicado-de-certificado
 * @templateUrl ./duplicado-de-certificado.component.html
 */
@Component({
  selector: 'app-duplicado-de-certificado',
  templateUrl: './duplicado-de-certificado.component.html',
  standalone: false, // Indica que este componente no es independiente.
})
export class DuplicadoDeCertificadoComponent {
  @Output() rowClicked = new EventEmitter<void>();
}