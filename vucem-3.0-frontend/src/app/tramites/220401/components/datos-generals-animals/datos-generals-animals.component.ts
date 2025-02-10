import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';

import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule,ValidationErrors,Validators } from '@angular/forms';
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
export class DatosGeneralsAnimalsComponent implements OnInit  {
    /** Configuración del primer select de aduanas */
    frmMercanciaAnimal!: FormGroup;
    /** Configuración del primer select de aduanas */
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
  /**
   * Validador personalizado para regla de descripción especial.
   * @param control - El control de formulario a validar.
   * @returns Un objeto de error de validación o nulo.
   */
    descripcionEspecialesValidatorFalse(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      const regex = /^[-A-Za-z0-9\u000D\u000A\u00D1\u00F1\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00C4\u00CB\u00CF\u00D6\u00DC\u00E4\u00EB\u00EF\u00F6\u00FC\u00C7\u00E7\u201C\u002B\u0022\u0027\u003C\u003D\u003E\u00B5\u00BA\u00DF\s\%$*()!_?ï¿½&#@;,.:'"ï¿½\/\[\]_-]*$/;
      if (/^[ ]+/.test(value) || !regex.test(value)) {
        return { descripcionEspeciales: false };
      }
      return null;
    }
  /**
   * Validador personalizado para regla de descripción especial.
   * @param control - El control de formulario a validar.
   * @returns Un objeto de error de validación o nulo.
   */
    descripcionValidator(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      // Implement your custom validation logic here
      if (value && value.length > 0) {
        return null;
      }
      return { descripcion: true };
    }
  /**
   * Validador personalizado para regla de descripción especial.
   * @param control - El control de formulario a validar.
   * @returns Un objeto de error de validación o nulo.
   */
  descripcionEspecialesValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /^[-A-Za-z0-9\u000D\u000A\u00D1\u00F1\u00C1\u00C9\u00CD\u00D3\u00DA\u00E1\u00E9\u00ED\u00F3\u00FA\u00C4\u00CB\u00CF\u00D6\u00DC\u00E4\u00EB\u00EF\u00F6\u00FC\u00C7\u00E7\u201C\u002B\u0022\u0027\u003C\u003D\u003E\u00B5\u00BA\u00DF\s\%$*()!_?ï¿½&#@;,.:'"ï¿½\/\[\]_-]*$/;
    if (/^[ ]+/.test(value) || !regex.test(value)) {
      return { descripcionEspeciales: 'Ingresa datos validos.' };
    }
    return null;
  }
   /**
   * Validador personalizado para verificar si el valor está dentro del rango especificado.
   * @param min - El valor mínimo.
   * @param max - El valor máximo.
   * @returns Una función de validación.
   */
   valueRangeValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = parseFloat(control.value);
      if (isNaN(value) || value < min || value > max) {
        return { valueRange: true };
      }
      return null;
    };
  }
 /**
   * Inicializa el componente y configura el grupo de formularios con reglas de validación.
   */
  ngOnInit(): void {
    this.frmMercanciaAnimal = this.fb.group({
      fraccionArancelaria: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]*$') // Sólo dígitos
      ]],
      tratamiento: ['', [
        Validators.maxLength(1000),
        this.descripcionEspecialesValidator // Validador personalizado
      ]],
      presentacion: ['', [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[0-9]*\.?[0-9]+$'), // debe ser un numero
        this.valueRangeValidator(0.01, 999999999999.99) // Validador personalizado para rango de valores
      ]],
      marcaEmbarque: ['', [
        Validators.maxLength(30),
        this.descripcionValidator // Custom validator
      ]],
      fechaCaducidad: ['', [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('^[0-9]*\.?[0-9]+$'), // debe ser un numero
        this.valueRangeValidator(0.01, 999999999999.99) // Validador personalizado para rango de valores
      ]],
      aduana: ['', Validators.required] ,// Agregue FormControl para el campo seleccionado
      cites: ['', Validators.maxLength(15)],
      nombreIdentificacion: ['', [
        Validators.required,
        Validators.maxLength(200),
        this.descripcionEspecialesValidatorFalse // Validador personalizado
      ]],
      numeroAutorizacionCITES: ['', Validators.maxLength(15)],
      raza: ['', [
        Validators.maxLength(50),
        this.descripcionEspecialesValidator // Validador personalizado
      ]],
      edadAnimal: ['', [
        Validators.required,
        Validators.maxLength(50),
        this.descripcionEspecialesValidator // Validador personalizado
      ]],
      color: ['', [
        Validators.maxLength(30),
        this.descripcionEspecialesValidator // Validador personalizado
      ]],
    });
  }
 /**
   * Maneja la selección de una aduana en el primer select.
   * @param e - La aduana seleccionada.
   */
aduanaSeleccion(e: Catalogo): void {

  this.selectedAduana = e;
  
}
 /**
   * Maneja la selección de una aduana en el segundo select.
   * @param e - La aduana seleccionada.
   */
aduanaSeleccionOne(e: Catalogo): void {

   this.selectedAduanaOne = e;

}
/**
 * Obtiene la descripción de la fracción arancelaria.
 * @param value - El valor de la fracción arancelaria.
 * @param length - La longitud del valor de la fracción arancelaria.
 */
obtenerDescripcionFraccion(value: string, length: number): void {
 // Implementar la lógica para obtener la descripción de la fracción
  this.frmMercanciaAnimal.get('descFraccionArancelaria')?.setValue('Descripción de la fracción');
}
/**
 * Limpia los datos capturados en el formulario de mercancía.
 */
limpiarDatosCapturaMercancia(): void {
  this.frmMercanciaAnimal.reset();
  this.ocultarErrores();
}
/**
 * Guarda los datos capturados en el formulario de mercancía.
 * Muestra un mensaje si el formulario es válido, de lo contrario muestra los errores.
 */
guardarCapturaMercancia(): void {
  if (this.frmMercanciaAnimal.valid) {
 
    this.mostrarMensaje();
  } else {
    this.mostrarErrores();
  }
}
/**
 * Cierra la captura de mercancía animal y oculta los errores.
 */
cerrarCapturaMercanciaAnimal(): void {

  this.ocultarErrores();
}
/**
 * Muestra un mensaje.
 */
mostrarMensaje(): void {

}
/**
 * Oculta los errores.
 */
ocultarErrores(): void {
 
}
/**
 * Muestra los errores.
 */
mostrarErrores(): void {
 
}
}
