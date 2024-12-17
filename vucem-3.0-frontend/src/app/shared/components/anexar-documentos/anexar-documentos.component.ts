import { Component, Input } from '@angular/core';
import { SelectCatalogosComponent } from '../select-catalogos/select-catalogos.component';
import { CatalogosSelect, DocumentosCargados } from '../../../core/models/shared/components.model';
import { ServiciosExtraordinariosService } from '../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { Catalogo } from '../../../core/models/5701/catalogos.model';

@Component({
  selector: 'anexar-documentos',
  standalone: true,
  imports: [SelectCatalogosComponent],
  templateUrl: './anexar-documentos.component.html',
  styleUrl: './anexar-documentos.component.scss',
})
export class AnexarDocumentosComponent {
  tipos_documentos!: CatalogosSelect;
  documentos_cargados: Array<DocumentosCargados> = [];
  documento_seleccionado!: Catalogo;

  constructor(private sExtraordinarios: ServiciosExtraordinariosService) {}


  ngOnInit() {
    this.getTiposDocumentos();
  }

  get docCargados() {
    return this.documentos_cargados.length > 0 ? true : false;
  }


  getTiposDocumentos() {
    this.sExtraordinarios
      .getCatalogos('cat-tipo-documento.json')
      .subscribe((resp) => {
        if (resp.code === 200) {
          const documentos = resp.data;
          this.tipos_documentos = {
            labelNombre: 'Tipo de documento',
            required: true,
            primerOpcion: 'Selecciona un tipo de documento',
            catalogos: documentos
          }
          // this.tiposDocumentos = resp.data
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
      this.documentos_cargados.push({
        tipo_documento: this.documento_seleccionado,
        nombre_archivo: archivo_info.name
      })





      // const documento_info = this.lista_documentos.find((el) => el.id === idDoc);
      // const tamanio = documentoInfo?.tamanio
      //   ? documentoInfo?.tamanio * 1000000
      //   : 0;

      //   console.log(tamanio);


      // if (tamanio < archivo.size) {
      //   console.log(
      //     'El archivo es muy grande, intente con otro de menor tamaño'
      //   );
      //   return;
      // } else {
      //   console.log('Sube el archivo');
      //   documentoInfo?.documentos.push({ id: 2, nombre: archivo.name });
      // }

      // console.log(documentoInfo);

      // Validacion tamaño
    }


  }

  verDocumento(i: number) {


  }

  eliminarDocumento(i: number) {
    this.documentos_cargados.splice(i, 1);
  }
}
