import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FiltrarArchivosDigitalizacionService } from '../services/filtrarArchivosDigitalizacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-digitalizar-documentos',
  templateUrl: './registro-digitalizar-documentos.component.html',
  styleUrls: ['./registro-digitalizar-documentos.component.css']
})
export class RegistroDigitalizarDocumentosComponent implements OnInit {
  tipoDocumentosForm: FormGroup;
  documentos: any[] = [];
  doctosEspecificos: any[] = [];
  mensajeError: string = '';
  showAlerts: boolean = false;

  constructor(
    private fb: FormBuilder,
    private filtrarArchivosService: FiltrarArchivosDigitalizacionService,
    private router: Router
  ) {
    this.tipoDocumentosForm = this.fb.group({
      solicitud: this.fb.group({
        idSolicitud: [''],
        esNuevo: ['']
      }),
      tipoDocumento: ['', Validators.required],
      elementoWizard: this.fb.group({
        anteriorTmp: ['']
      })
    });
  }

  ngOnInit(): void {
    this.cargarDocumentos();
    this.obtenerValoresSesion();
  }

  /**
   * Carga los documentos disponibles desde el servicio
   */
  cargarDocumentos(): void {
    this.filtrarArchivosService.obtenerDocumentosEspecificos().subscribe(
      (respuesta) => {
        this.documentos = respuesta;
      },
      (error) => {
        this.mensajeError = 'Error al cargar los documentos específicos.';
        this.showAlerts = true;
      }
    );
  }

  /**
   * Obtiene los valores de sesión necesarios
   */
  obtenerValoresSesion(): void {
    // Implementar lógica para obtener 'idTramite' si es necesario
    // Por ejemplo, desde un servicio de sesión
  }

  /**
   * Agrega un documento específico a la lista
   */
  addDoctoEspecifico(): void {
    const tipoDocId = this.tipoDocumentosForm.get('tipoDocumento')?.value;
    const documentoSeleccionado = this.documentos.find(doc => doc.id === tipoDocId);
    if (documentoSeleccionado) {
      this.doctosEspecificos.push(documentoSeleccionado);
    } else {
      this.mensajeError = 'Tipo de documento no válido.';
      this.showAlerts = true;
    }
  }

  /**
   * Elimina un documento específico de la lista
   * @param doctoId Identificador del documento a eliminar
   */
  eliminarDocto(doctoId: number): void {
    this.doctosEspecificos = this.doctosEspecificos.filter(docto => docto.id !== doctoId);
  }

  /**
   * Elimina los documentos seleccionados
   */
  eliminarSeleccionados(): void {
    // Implementar lógica para eliminar documentos seleccionados
    // Por ejemplo, verificar checkboxes seleccionados y eliminar
    this.doctosEspecificos = this.doctosEspecificos.filter(docto => !docto.seleccionado);
  }

  /**
   * Guarda los tipos de documentos seleccionados
   */
  guardarTipoDoctos(): void {
    if (this.tipoDocumentosForm.invalid) {
      this.mensajeError = 'Por favor, complete el formulario correctamente.';
      this.showAlerts = true;
      return;
    }

    const formValue = this.tipoDocumentosForm.value;
    formValue.doctosEspecificos = this.doctosEspecificos;

    this.filtrarArchivosService.guardarTipoDoctos(formValue).subscribe(
      () => {
        this.router.navigate(['/ruta-siguiente']);
      },
      (error) => {
        this.mensajeError = 'Error al guardar los tipos de documentos.';
        this.showAlerts = true;
      }
    );
  }

  /**
   * Navega a la página anterior
   */
  anterior(): void {
    this.router.navigate(['/ruta-anterior']);
  }

  /**
   * Cierra el mensaje de alerta
   */
  cerrarAlerta(): void {
    this.showAlerts = false;
    this.mensajeError = '';
  }
}