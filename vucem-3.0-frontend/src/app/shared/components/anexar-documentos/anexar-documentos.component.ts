import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { SelectCatalogosComponent } from '../select-catalogos/select-catalogos.component';
import {
  CatalogosSelect,
  DocumentosCargados,
} from '../../../core/models/shared/components.model';
import { ServiciosExtraordinariosService } from '../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { Catalogo } from '../../../core/models/5701/catalogos.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DatosArchivo } from '../../../core/models/shared/components.model';

declare const bootstrap: any; // Importación para manejar Bootstrap en TS
@Component({
  selector: 'anexar-documentos',
  standalone: true,
  imports: [SelectCatalogosComponent, CommonModule],
  templateUrl: './anexar-documentos.component.html',
  styleUrl: './anexar-documentos.component.scss',
})
export class AnexarDocumentosComponent {
  tiposDocumentos!: CatalogosSelect;
  documentosCargados: Array<DocumentosCargados> = [];
  documentoSeleccionado!: Catalogo;
  mostrarModal: boolean = false;
  modal: string = 'modal';
  indiceDocumento!: number;

  @ViewChild('modalConfirmacion') modalElement!: ElementRef;

  constructor(
    private sExtraordinarios: ServiciosExtraordinariosService,
    private toastr: ToastrService,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.getTiposDocumentos();
  }


  get docCargados() {
    return this.documentosCargados.length > 0 ? true : false;
  }

  get btnDesactivado() {
    return this.documentoSeleccionado && this.documentoSeleccionado.id !== 0
      ? false
      : true;
  }

  getTiposDocumentos() {
    this.sExtraordinarios.getCatalogo(6).subscribe((resp) => {
      if (resp.codigo === '200') {
        this.tiposDocumentos = {
          labelNombre: 'Tipo de documento',
          required: true,
          primerOpcion: 'Selecciona un tipo de documento',
          catalogos: JSON.parse(resp.data),
        };
      }
    });
  }

  docSeleccionado(e: Catalogo) {
    this.documentoSeleccionado = e;
  }

  cargarDoc(event: Event) {
    const archivo = event.target as HTMLInputElement;

    // Validaciones
    if (archivo.files && archivo.files.length > 0) {
      const archivo_info = archivo.files[0];

      // Validacion tipo archivo
      let ext_archivo = archivo_info.name.split('.').pop() as string;
      ext_archivo = ext_archivo.toLowerCase();

      if (ext_archivo !== this.documentoSeleccionado.tipoArchivo) {
        this.toastr.error('Solo se aceptan archivos pdf');
        return;
      }

      // Validacion tamaño
      const datos: DatosArchivo = {
        tam_req: this.documentoSeleccionado.archivo
          ? this.documentoSeleccionado.archivo.tamanio
          : 0,
        tamanio: archivo_info.size,
        unidad: this.documentoSeleccionado.archivo
          ? this.documentoSeleccionado.archivo.unidad
          : '',
      };

      if (!this.validarTamanio(datos)) {
        this.toastr.error(
          'El tamaño del documento que intenta cargar excede el tamaño permitido'
        );
        return;
      }

      this.documentosCargados.push({
        tipoDocumento: this.documentoSeleccionado,
        nombre_archivo: archivo_info.name,
      });
    }
  }

  verDocumento(i: number, accion: string) {
    // v => ver
    this.mostrarModal = accion === 'v' ? true : false;
  }

  abrirModal(i: number) {
    this.modal = 'show';
    this.indiceDocumento = i;
  }

  eliminarDocumento(i: number) {
    this.documentosCargados.splice(i, 1);
    this.cerrarModal();
    this.toastr.success('Se ha eliminado el archivo exitosamente');
  }

  cerrarModal() {
    if (this.modalElement) {
      const modal = new bootstrap.Modal(this.modalElement.nativeElement);
      modal.hide();
    }
  }

  validarTamanio(datos: DatosArchivo): boolean {
    let size: number = 0;
    let validacion: boolean = false;
    switch (datos.unidad) {
      case 'KB':
        size = datos.tam_req * 1024;
        validacion = datos.tamanio <= size ? true : false;
        break;

      case 'MB':
        size = datos.tam_req * 1024 * 1024;
        validacion = datos.tamanio <= size ? true : false;
        break;
      case '':
        validacion = false;
        break;
    }
    return validacion;
  }
}
