import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PieWizardCapturaService } from './pieWizardCaptura.service';

@Component({
  selector: 'app-pie-wizard-captura',
  templateUrl: './pie-wizard-captura.component.html',
  styleUrls: ['./pie-wizard-captura.component.css']
})
export class PieWizardCapturaComponent implements OnInit {
  formularioSolicitud: FormGroup;
  actionBean: any = {
    requiereGuardadoParcial: false
  };
  errorCampos: string = '';

  constructor(
    private fb: FormBuilder,
    private pieWizardService: PieWizardCapturaService
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarDatos();
  }

  inicializarFormulario(): void {
    this.formularioSolicitud = this.fb.group({
      solicitud: this.fb.group({
        idSolicitud: ['', Validators.required]
        // Añadir más controles según se requiera
      })
      // Añadir más grupos de formularios si es necesario
    });
  }

  cargarDatos(): void {
    // Lógica para cargar datos iniciales, por ejemplo, obtener actionBean desde el servicio
    this.pieWizardService.obtenerActionBean().subscribe(data => {
      this.actionBean = data;
    });
  }

  tabSeleccionado(): void {
    const currentIdx = this.obtenerIndiceTabActivo();
    localStorage.setItem('currentIdx', currentIdx.toString());
  }

  obtenerIndiceTabActivo(): number {
    // Implementar la lógica para obtener el índice del tab activo
    // Esto dependerá de la librería de tabs que se esté usando
    // Por ejemplo, si se usan ngx-bootstrap tabs:
    // return this.tabset.tabs.findIndex(tab => tab.active);
    // Aquí se retorna un valor de ejemplo
    return 0;
  }

  onSubmit(): void {
    if (this.formularioSolicitud.valid) {
      // Lógica para manejar el envío del formulario
      this.pieWizardService.enviarFormulario(this.formularioSolicitud.value)
        .subscribe(
          response => {
            // Manejar la respuesta exitosa
          },
          error => {
            // Manejar errores
          }
        );
    } else {
      this.mostrarErrores();
    }
  }

  guardarParcial(): void {
    this.tabSeleccionado();
    if (this.formularioSolicitud.valid) {
      // Lógica para guardar de forma parcial
      this.pieWizardService.guardarParcial(this.formularioSolicitud.value)
        .subscribe(
          response => {
            // Manejar respuesta exitosa
          },
          error => {
            // Manejar errores
          }
        );
    } else {
      this.mostrarErrores();
    }
  }

  mostrarErrores(): void {
    if (this.formularioSolicitud.invalid) {
      this.errorCampos = 'Faltan campos por capturar.';
      // Aquí se puede manejar lógica adicional para mostrar errores en la UI si es necesario
    } else {
      this.errorCampos = '';
    }
  }
}