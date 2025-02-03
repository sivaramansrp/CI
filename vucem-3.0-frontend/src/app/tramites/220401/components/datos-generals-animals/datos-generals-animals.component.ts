import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';

import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
/**
 * DatosGeneralsAnimalsComponent es un componente que maneja la selección de aduanas y otros datos generales de animales.
 */
@Component({
  selector: 'app-datos-generals-animals',
  standalone: true,
  imports: [ 
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    SelectCatalogosComponent],
  templateUrl: './datos-generals-animals.component.html',
  styleUrl: './datos-generals-animals.component.scss'
})
export class DatosGeneralsAnimalsComponent  {
    /** Configuración del primer select de aduanas */
    formGroup!: FormGroup;
    aduanas: CatalogosSelect = {
    labelNombre: 'UMC',
    required: true,
    primerOpcion: 'Seleccione una aduana',
    catalogos: [
      { id: 1, descripcion: 'Aduana 1' },
      { id: 2, descripcion: 'Aduana 2' },
      { id: 3, descripcion: 'Aduana 3' }
    ]
  };
    /** Configuración del segundo select de aduanas */
  aduanasOne: CatalogosSelect = {
    labelNombre: 'Sexo',
    required: true,
    primerOpcion: 'Seleccione una aduana',
    catalogos: [
      { id: 1, descripcion: 'Aduana 1' },
      { id: 2, descripcion: 'Aduana 2' },
      { id: 3, descripcion: 'Aduana 3' }
    ]
  };

  /** Aduana seleccionada en el primer select */
selectedAduana: Catalogo = { id: 0, descripcion: '' }; // Provide an initial value
  /** Aduana seleccionada en el segundo select */
selectedAduanaOne: Catalogo = { id: 0, descripcion: '' }; // Provide an initial value

  /**
   * Maneja la selección de una aduana en el primer select.
   * @param e - La aduana seleccionada.
   */
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      fraccionArancelaria: ['', [Validators.required, Validators.maxLength(8)]],
      tratamiento: ['', Validators.maxLength(1000)],
      presentacion: ['', Validators.required],
      marcaEmbarque: ['', Validators.maxLength(200)],
      fechaCaducidad: ['', Validators.required],
      cites: ['', Validators.maxLength(15)],
      nombreIdentificacion: ['', Validators.maxLength(1000)],
      raza: [''],
      edadAnimal: ['', Validators.required],
      color: ['', Validators.maxLength(15)],
      numeroAutorizacionCITES: ['', Validators.maxLength(15)]
    });
  }
aduanaSeleccion(e: Catalogo): void {

  this.selectedAduana = e;
  console.log('Aduana seleccionada:', e);
}
 /**
   * Maneja la selección de una aduana en el segundo select.
   * @param e - La aduana seleccionada.
   */
aduanaSeleccionOne(e: Catalogo): void {

   this.selectedAduanaOne = e;
  console.log('Aduana seleccionada:', e);
}
/**
 * Obtiene la descripción de la fracción arancelaria.
 * @param value - El valor de la fracción arancelaria.
 * @param length - La longitud del valor de la fracción arancelaria.
 */
obtenerDescripcionFraccion(value: string, length: number): void {
  // Implement the logic to obtain the description of the fraction
  this.formGroup.get('descFraccionArancelaria')?.setValue('Descripción de la fracción');
}
/**
 * Limpia los datos capturados en el formulario de mercancía.
 */
limpiarDatosCapturaMercancia(): void {
  this.formGroup.reset();
  this.ocultarErrores();
}
/**
 * Guarda los datos capturados en el formulario de mercancía.
 * Muestra un mensaje si el formulario es válido, de lo contrario muestra los errores.
 */
guardarCapturaMercancia(): void {
  if (this.formGroup.valid) {
    console.log('Form data:', this.formGroup.value);
    this.mostrarMensaje();
  } else {
    this.mostrarErrores();
  }
}
/**
 * Cierra la captura de mercancía animal y oculta los errores.
 */
cerrarCapturaMercanciaAnimal(): void {
  console.log('Cerrar captura de mercancia animal');
  this.ocultarErrores();
}
/**
 * Muestra un mensaje.
 */
mostrarMensaje(): void {
  console.log('Mostrar mensaje');
}
/**
 * Oculta los errores.
 */
ocultarErrores(): void {
  console.log('Ocultar errores');
}
/**
 * Muestra los errores.
 */
mostrarErrores(): void {
  console.log('Mostrar errores');
}
}
