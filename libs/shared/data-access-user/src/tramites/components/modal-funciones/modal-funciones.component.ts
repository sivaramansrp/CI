import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-modal-funciones',
  standalone: true,
  imports: [CommonModule,
    ModalModule
  ],
  templateUrl: './modal-funciones.component.html',
  styleUrl: './modal-funciones.component.scss',
})
export class ModalFuncionesComponent implements OnChanges {
  /**
   * Titulo del modal
   */
  @Input() titulo: string = 'Anexar nuevo documento';
  /**
   * Descripcion del modal
   */
  @Input() descripcion: string = '';
/**
 * es un decorador de entrada (@Input) que define el tamaño máximo permitido para un archivo que se puede cargar en el modal. Su valor predeterminado es 10, lo que significa que, por defecto, el tamaño máximo permitido es de 10 MB.
 */
  @Input() maxSizeMB: number = 10;
  /**
   * Tipo de archivo aceptado
   */
  @Input() aceptado: string = 'application/pdf';
  /**
   * se enecarga de abrir el modal
   */
  @Input() abrirModal: boolean = false;
/**
 * declara una propiedad de salida (@Output) llamada archivoSeleccionado que utiliza un EventEmitter para emitir eventos con un valor de tipo File.
 */
  @Output() archivoSeleccionado = new EventEmitter<File>();
  /**
   * se encarga de cerrar el modal
   */
  @Output() cerrar = new EventEmitter<void>();

  public mostrarModal: boolean = false;
  @ViewChild('modal', { static: false }) modal?: ModalDirective;

  archivo?: File;
  /** 
   * se encarga de manejar el evento cuando un archivo es seleccionado en un campo de entrada (<input type="file">). Su propósito principal es validar el archivo seleccionado y almacenarlo si cumple con los criterios definidos.
   * @param event 
   * @returns 
   */
  onArchivoChange(event: Event) {
    const INPUT = event.target as HTMLInputElement;
    const ARCHIVO = INPUT.files?.[0];
    if (ARCHIVO) {
      if (ARCHIVO.type !== this.aceptado) {
        // eslint-disable-next-line no-alert
        alert('Tipo de archivo no permitido');
        return;
      }
      if (ARCHIVO.size > this.maxSizeMB * 1024 * 1024) {
        // eslint-disable-next-line no-alert
        alert(`Archivo excede el tamaño máximo de ${this.maxSizeMB} MB`);
        return;
      }
      this.archivo = ARCHIVO;
    }
  }
/**
 *  Callback que se ejecuta cuando el componente recibe cambios en sus entradas.
 *  Si la propiedad abrirModal cambia a true, se muestra el modal.
 * @param changes 
 */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['abrirModal'] && changes['abrirModal'].currentValue) {
      if (this.abrirModal) {
        this.mostrarModal = true;
      }
    }
  }
  /**
   * Callback que se ejecuta cuando el modal se oculta. Cambia el estado de mostrarModal a false.
   */
  onHidden(): void {
    this.mostrarModal = false;
  }
  /**
   * Emite el archivo seleccionado si es válido, a través del archivoSeleccionado.
   */
  anexar() {
    if (this.archivo) {
      this.archivoSeleccionado.emit(this.archivo);
    }
  }
}
