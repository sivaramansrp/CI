import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
import { CATALOGOS_ID, KB, MB, UNIDADES } from '../../constantes/constantes';
import {
  Login,
  TokenResponse,
} from '../../../core/models/shared/inicio-sesion.model';
import { InicioSesionService } from '../../../core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '../../../core/services/shared/subir-documento/subir-documento.service';
import { SubirArchivoBody } from '../../../core/models/shared/subir-archivos.model';

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
  datosLogin: Login = {
    user: 'user1@example.com',
    password: 'clave1',
  };

  token!: string;
  base64File: string = '';


  constructor(
    private sExtraordinarios: ServiciosExtraordinariosService,
    private toastr: ToastrService,
    private renderer: Renderer2,
    private inicioSesionService: InicioSesionService,
    private subirDocumentoService: SubirDocumentoService
  ) {}

  ngOnInit() {
    this.obtenerToken(this.datosLogin);
    this.getTiposDocumentos();
  }

  /**
   *
   */
  get docCargados() {
    return this.documentosCargados.length > 0 ? true : false;
  }

  /**
   * Getter que determina si el botón debe estar desactivado.
   * @returns {boolean} `false` si no existe un documento seleccionado, de lo contrario retorna un true
   */
  get btnDesactivado(): boolean {    
    return this.documentoSeleccionado && this.documentoSeleccionado.id !== 0
      ? false
      : true;
  }

  obtenerToken(body: Login) {
    this.inicioSesionService.obtenerToken(body).subscribe({
      next: (resp): void => {
        this.token = resp.jwt;
      },
      error: (error): void => {
        console.log(error);
      },
    });
  }

  /**
   * Hace la petición para obtener los tipos de documentos.
   * @param {none} Sin tiene parametros.
   * @returns { none } No retorna resultado alguno.
   */
  getTiposDocumentos(): void {
    this.sExtraordinarios
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.tiposDocumentos = {
              labelNombre: 'Tipo de documento',
              required: true,
              primerOpcion: 'Selecciona un tipo de documento',
              catalogos: resp,
            };
          }
        },
        error: (error): void => {
          console.log(error);
        },
      });
  }

  /**
   * Recibe el valor de la selecion del documento elegido en el select, y se asigna a la varible documentoSleccionado.
   * @param { catalogo } Recibe el catalogo que se selecciono en el select.
   * @returns { none } No regresa valor alguno.
   */
  docSeleccionado(e: Catalogo) {
    console.log(e);
    
    this.documentoSeleccionado = e;
  }

  async cargarDoc(event: Event) {
    const archivo = event.target as HTMLInputElement;
    const informacionArchivo = (archivo.files as FileList)[0]

    console.log(informacionArchivo);


    // Validaciones
    if (informacionArchivo) {
      // const informacionArchivo = archivo.files[0]
        // Validacion tipo archivo
      let extArchivo = informacionArchivo.name.split('.').pop() as string;
      extArchivo = extArchivo.toLowerCase();

      // if (extArchivo !== this.documentoSeleccionado.tipoArchivo) {
      //   this.toastr.error('Solo se aceptan archivos pdf');
      //   return;
      // }

      // Validacion tamaño
      const datos: DatosArchivo = {
        tamanioRequerido: this.documentoSeleccionado.archivo
          ? this.documentoSeleccionado.archivo.tamanio
          : 0,
        tamanio: informacionArchivo.size,
        unidad: this.documentoSeleccionado.archivo
          ? this.documentoSeleccionado.archivo.unidad
          : '',
      };

      // if (!this.validarTamanio(datos)) {
      //   this.toastr.error(
      //     'El tamaño del documento que intenta cargar excede el tamaño permitido'
      //   );
      //   return;
      // }

      // Agregar documento

      console.log(informacionArchivo);

      // this.base64File = await (await this.convertFileToBase64(informacionArchivo)).split(',')[1];

      // console.log(this.base64File);




      this.subirDocumentoService
        .subirDocumento(this.token, informacionArchivo)
        .subscribe({
          next: (resp): void => {
            alert('Documento subido');
          },
          error: (error): void => {
            console.log(error);
          },
        });

      this.documentosCargados.push({
        tipoDocumento: this.documentoSeleccionado,
        nombreArchivo: informacionArchivo.name,
      });
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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

  /**
   * Método para cerrar el modal
   * @returns No regresa valor alguno
   */
  cerrarModal(): void {
    if (this.modalElement) {
      const modal = new bootstrap.Modal(this.modalElement.nativeElement);
      modal.hide();
    }
  }

  /**
   * Valida si el tamaño del archivo requerido, cumple con los requerimientos
   * @param datos objeto con los datos del archivo: Tamaño maximo permitido, tamaño del archivo a subir y unidad (MB o KB)
   * @returns
   */
  validarTamanio(datos: DatosArchivo): boolean {
    let size: number = 0;
    let validacion: boolean = false;
    switch (datos.unidad) {
      case KB:
        size = datos.tamanioRequerido * UNIDADES.KB;
        validacion = datos.tamanio <= size ? true : false;
        break;

      case MB:
        size = datos.tamanioRequerido * UNIDADES.MB;
        validacion = datos.tamanio <= size ? true : false;
        break;
      case '':
        validacion = false;
        break;
    }
    return validacion;
  }
}
