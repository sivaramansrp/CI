import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalFuncionesComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-registrar-opinion',
  standalone: true,
  imports: [CommonModule, ModalFuncionesComponent],
  templateUrl: './registrar-opinion.component.html',
  styleUrl: './registrar-opinion.component.scss',
})
export class RegistrarOpinionComponent {
  /**
   * Representa la fecha de la solicitud.
   */
  fechaSolicitud: string = '2023-10-01';
  /**
   * Controla la visibilidad del modal.
   */
  abrirModal = false;
  /**
   * Almacena los archivos seleccionados por el usuario.
   * Inicialmente es un arreglo vacío.
   */
  archivos: File[] = [];
  /**
   * Contiene las instrucciones o requisitos para los archivos que se pueden cargar.
   */
  descripcionModal: string = `
  <ul>
    <li>Debe ser formato PDF sin formularios ni código embebido.</li>
    <li>Máximo 10 MB.</li>
    <li>No debe contener páginas en blanco.</li>
    <li>Imágenes en escala de grises a 300 dpi.</li>
  </ul>
`;
/**
 * Agrega un archivo al arreglo archivos.
 * Cierra el modal al finalizar.
 * @param archivo 
 */
  agregarArchivo(archivo: File) {
    this.archivos.push(archivo);
    this.abrirModal = false;
  }
  /**
   * Cambia el estado de abrirModal a true para mostrar el modal.
   */
  mostrarModalDocumentos() {
    this.abrirModal = true;
  }
}
