import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'anexar-documentos',
  standalone: true,
  imports: [SelectCatalogosComponent, CommonModule],
  templateUrl: './anexar-documentos.component.html',
  styleUrl: './anexar-documentos.component.scss',
})
export class AnexarDocumentosComponent {
  tipos_documentos!: CatalogosSelect;
  documentos_cargados: Array<DocumentosCargados> = [];
  documento_seleccionado!: Catalogo;
  abrir_modal: boolean = false;
  modal: string = 'modal';
  indice_doc!: number;

  constructor(
    private sExtraordinarios: ServiciosExtraordinariosService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getTiposDocumentos();
  }

  get doc_cargados() {
    return this.documentos_cargados.length > 0 ? true : false;
  }

  get btn_desactivado() {
    return this.documento_seleccionado && this.documento_seleccionado.id !== 0
      ? false
      : true;
  }

  getTiposDocumentos() {
    this.sExtraordinarios.getCatalogo(6).subscribe((resp) => {
      if (resp.codigo === '200') {
        this.tipos_documentos = {
          labelNombre: 'Tipo de documento',
          required: true,
          primerOpcion: 'Selecciona un tipo de documento',
          catalogos: JSON.parse(resp.data),
        };
      }
    });
  }

  docSeleccionado(e: Catalogo) {
    this.documento_seleccionado = e;
  }

  cargarDoc(event: Event) {
    const archivo = event.target as HTMLInputElement;

    // Validaciones
    if (archivo.files && archivo.files.length > 0) {
      const archivo_info = archivo.files[0];

      // Validacion tipo archivo
      let ext_archivo = archivo_info.name.split('.').pop() as string;
      ext_archivo = ext_archivo.toLowerCase();

      if (ext_archivo !== this.documento_seleccionado.tipoArchivo) {
        this.toastr.error('Solo se aceptan archivos pdf');
        return;
      }

      // Validacion tamaño
      const datos: DatosArchivo = {
        tam_req: this.documento_seleccionado.archivo
          ? this.documento_seleccionado.archivo.tamanio
          : 0,
        tamanio: archivo_info.size,
        unidad: this.documento_seleccionado.archivo
          ? this.documento_seleccionado.archivo.unidad
          : '',
      };

      if (!this.validarTamanio(datos)) {
        this.toastr.error(
          'El tamaño del documento que intenta cargar excede el tamaño permitido'
        );
        return;
      }

      this.documentos_cargados.push({
        tipoDocumento: this.documento_seleccionado,
        nombre_archivo: archivo_info.name,
      });
    }
  }

  verDocumento(i: number, accion: string) {
    // v => ver
    this.abrir_modal = accion === 'v' ? true : false;
  }

  abrirModal(i: number) {
    this.modal = 'modal-open';
    this.indice_doc = i;
  }

  eliminarDocumento(i: number) {
    this.documentos_cargados.splice(i, 1);
    this.cerrarModal();
    this.toastr.success('Se ha eliminado el archivo exitosamente');
  }

  cerrarModal() {
    this.modal = 'modal';
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
