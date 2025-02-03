
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {  FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';

import { FormBuilder } from '@angular/forms';

import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

@Component({
  selector: 'app-pago-de-derecho',
  templateUrl: './pago-de-derecho.component.html',
  
  imports: [CommonModule,TituloComponent,ReactiveFormsModule,SelectCatalogosComponent,FormsModule],
  styleUrl: './pago-de-derecho.component.scss',
  standalone: true,
})
export class PagoDeDerechoComponent implements OnInit {
  FormSolicitud!: FormGroup;
  
  answer: string = '';
  
  public mercancia!: CatalogosSelect;

  constructor(private fb: FormBuilder) {
  
  }
/**
 * Hook del ciclo de vida de Angular que se llama después de que la vista del componente se ha inicializado completamente.
 * 
 * Este método realiza las siguientes acciones:
 * - Llama al método `getMercancia` para inicializar el objeto `mercancia`.
 * - Inicializa el grupo de formularios `FormSolicitud` con controles de formulario anidados y validadores.
 */

  ngOnInit(): void {
    this.getMercancia();
    this.FormSolicitud = this.fb.group({
      datosImportadorExportador: this.fb.group({
        exentoDePago: ['No', Validators.required],
        nombreImportExport: ['', Validators.required],
        rfcImportExport: ['', Validators.required],
        cadenaDependencia: ['', Validators.required],
        banco: ['', Validators.required],
        llaveDePago: ['', Validators.required],
        fechaPago: [' ', Validators.required],
        importePago: ['', Validators.required],
      }),
    });
 // Activa la lógica cuando el formulario se ha inicializado

  this.updateFormFieldsBasedOnExentoDePago('No');

 // Escuchar los cambios en el campo 'exentoDePago'
  this.FormSolicitud.get('datosImportadorExportador.exentoDePago')?.valueChanges.subscribe((value) => {
    this.updateFormFieldsBasedOnExentoDePago(value);
  });
}


    
/**
 * Actualiza los campos del formulario en función del valor de 'exentoDePago'.
 * 
 * Si el valor es 'No', establece valores específicos en los campos del formulario y los desactiva.
 * De lo contrario, restablece y desactiva los campos del formulario.
 * 
 * @param value - El valor de 'exentoDePago' para determinar las actualizaciones de los campos del formulario.
 */

  
  updateFormFieldsBasedOnExentoDePago(value: string): void {
    if (value === 'No') {
      
      this.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.setValue('454000554');
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.setValue('0001012A0000EX');
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.setValue('594.0');
  
    
      this.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.disable();
    } else {
     
      this.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.reset();
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.reset();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.reset();
  
      
      this.FormSolicitud.get('datosImportadorExportador.rfcImportExport')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.importePago')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.fechaPago')?.disable();
      this.FormSolicitud.get('datosImportadorExportador.llaveDePago')?.disable();
    }
  }
/**
 * Inicializa el objeto `mercancia` con propiedades y valores predefinidos.
 * 
 * El objeto `mercancia` contiene las siguientes propiedades:
 * - `labelNombre`: Una cadena de texto que se establece en 'Mercancía', utilizada como etiqueta o título.
 * - `required`: Un valor booleano que se establece en `true`, indicando que este campo es obligatorio.
 * - `primerOpcion`: Una cadena de texto que se establece en 'Seleccione un valor', utilizada como opción predeterminada o de marcador de posición en un menú desplegable.
 * - `catalogos`: Un arreglo de objetos que representan las opciones en el catálogo. Cada objeto tiene:
 *   - `id`: Un identificador único para la opción.
 *   - `descripcion`: Una cadena de texto que describe la opción. Actualmente, ambas opciones tienen la misma descripción 'Opción 1'.
 */

  public getMercancia() { 
    this.mercancia = { 
      labelNombre: 'Mercancía',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Opción 1',
        },
        {
          id: 2,
          descripcion: 'Opción 1',
        }
      ],
    }
  }
  /**
 * Valida el formulario y registra los valores del formulario si el formulario es válido.
 * 
 * Este método verifica si el grupo de formularios FormSolicitud es válido.
 * Si el formulario es válido, registra los valores del formulario en la consola.
 */
  validarFormulario() {
    if (this.FormSolicitud.valid) {
     
      console.log(this.FormSolicitud.value);
    }
  }
  public docSeleccionado(e: unknown) {
    console.log(e);
  }

}
