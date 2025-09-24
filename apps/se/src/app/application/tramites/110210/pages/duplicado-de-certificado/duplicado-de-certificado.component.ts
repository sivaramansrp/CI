import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { BuscarCertificadoDeOrigenComponent } from '../../components/buscar-certificado-de-origen/buscar-certificado-de-origen.component';

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
  /**
   * @property {BuscarCertificadoDeOrigenComponent} buscarCertificado
   * @description
   * Referencia al componente hijo `BuscarCertificadoDeOrigenComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario de búsqueda de certificado.
   */
  @ViewChild('buscarCertificado') buscarCertificado!: BuscarCertificadoDeOrigenComponent;


  /**
   * @method validarFormulario
   * @description
   * Valida el formulario de búsqueda de certificado en el componente hijo.
   * Si el componente hijo no existe, retorna `false`.
   * Si el formulario del componente hijo es inválido, retorna `false`.
   * Si el componente existe y su formulario es válido, retorna `true`.
   * 
   * @returns {boolean} `true` si el formulario es válido, `false` en caso contrario.
   */
  public validarFormulario(): boolean {
    let isValid = true;

    if (this.buscarCertificado) {
      if (!this.buscarCertificado.validarFormulario()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    return isValid;
  }
}