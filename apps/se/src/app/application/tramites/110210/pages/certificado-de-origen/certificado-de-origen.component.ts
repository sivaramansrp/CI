import { Component, Input } from '@angular/core';
import { CertificadoOrigenResponse } from '../../models/certificados-disponsible.model';

/**
 * @descripcion
 * El componente `CertificadoDeOrigenComponent` es responsable de renderizar la interfaz de usuario
 * y manejar la lógica para la página "Duplicado de Certificado" en la aplicación.
 *
 * @selector app-certificado-de-origen
 * @templateUrl ./certificado-de-origen.component.html
 */
@Component({
  selector: 'app-certificado-de-origen',
  templateUrl: './certificado-de-origen.component.html',
  standalone: false, // Indica que este componente no es independiente.
})
export class CertificadoDeOrigenComponent {
  /**
   * Datos del certificado de origen.
   * @type {CertificadoOrigenResponse | null}
   */
  @Input() certificadoDatos: CertificadoOrigenResponse | null = null;
}