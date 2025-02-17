import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DigitalizaDocumentosService } from './digitalizaDocumentos.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  formularioSolicitud: FormGroup;

  constructor(
    private fb: FormBuilder,
    private digitalizaDocumentosService: DigitalizaDocumentosService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.inicializarValidacion();
  }

  private inicializarFormulario(): void {
    this.formularioSolicitud = this.fb.group({
      solicitud: this.fb.group({
        idSolicitud: ['']
        // Agregar otros controles de formulario según sea necesario
      })
      // Agregar otros grupos de formulario si hay propiedades anidadas
    });
  }

  private inicializarValidacion(): void {
    // Implementar validaciones basadas en fieldMetadata si es necesario
    // Por ejemplo:
    // this.formularioSolicitud.get('solicitud.idSolicitud').setValidators([Validators.required]);
  }

  enviarFormulario(): void {
    if (this.formularioSolicitud.valid) {
      this.digitalizaDocumentosService.enviarSolicitud(this.formularioSolicitud.value)
        .subscribe(
          respuesta => {
            // Manejar la respuesta exitosa
            console.log('Formulario enviado exitosamente:', respuesta);
          },
          error => {
            // Manejar el error
            this.manejarErrores(error);
          }
        );
    } else {
      this.marcarFormComoTocado(this.formularioSolicitud);
      this.manejarErroresDeFormulario();
    }
  }

  private marcarFormComoTocado(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(campo => {
      const control = formGroup.get(campo);
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.marcarFormComoTocado(control);
      }
    });
  }

  private manejarErrores(error: any): void {
    // Implementar manejo de errores similar al invalidHandler de jQuery
    // Por ejemplo, resaltar pestañas con errores
    console.error('Error al enviar el formulario:', error);
    // Aquí puedes agregar lógica para resaltar las pestañas correspondientes
  }

  private manejarErroresDeFormulario(): void {
    // Implementar lógica para manejar formularios inválidos
    // Similar a la función invalidHandler en el JSP
    console.warn('El formulario contiene errores. Por favor, revisa los campos marcados.');
    // Aquí puedes agregar lógica para resaltar las pestañas correspondientes
  }

}