/* eslint-disable class-methods-use-this */
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Catalogo } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
// eslint-disable-next-line @nx/enforce-module-boundaries
import aduanasJson from './../../../../../../../../../libs/shared/theme/assets/json/220401/umc.json';

// eslint-disable-next-line @nx/enforce-module-boundaries
import sexoJson from './../../../../../../../../../libs/shared/theme/assets/json/220401/sexo.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  REGEX_DESCRIPCION_ESPECIALES,
  REGEX_LEADING_SPACES,
} from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';

import { Agregar220401Store, solicitud220401State } from '../../../../estados/tramites/agregar220401.store';
import { AgregarQuery } from '../../../../estados/queries/agregar.query';
import { map, Subject, takeUntil } from 'rxjs';
/**
 * DatosGeneralsAnimalsComponent es un componente que maneja la selección de aduanas y otros datos generales de animales.
 */
@Component({
  selector: 'app-datos-generales-animales',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
  ],
  templateUrl: './datos-generales-animales.component.html',
  styleUrl: './datos-generales-animales.component.scss',
})
export class DatosGeneralesAnimalesComponent implements OnInit, OnDestroy {
  /** Configuración del primer select de aduanas */
  frmMercanciaAnimal!: FormGroup;
   private destroyNotifier$: Subject<void> = new Subject();
    public solicitudState!: solicitud220401State;
  /** Configuración del primer select de aduanas */
  aduanas: Catalogo[] = aduanasJson;
  // fraccionF: Catalogo[] = fractionValues;
  /** Configuración del segundo select de aduanas */
  sexo: Catalogo[] = sexoJson;

  /** Aduana seleccionada en el primer select */
  selectedAduana: Catalogo = { id: 0, descripcion: '' }; // Provide an initial value
  /** Aduana seleccionada en el segundo select */
  selectedAduanaOne: Catalogo = { id: 0, descripcion: '' }; // Provide an initial value

  /**
   * Maneja la selección de una aduana en el primer select.
   * @param e - La aduana seleccionada.
   */
  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder, 
    private agregar220401Store: Agregar220401Store,
    private agregarQuery: AgregarQuery,
  ) {}
  /**
   * Validador personalizado para validar una descripción especial.
   * Este validador verifica si el valor ingresado cumple con las reglas de caracteres permitidos y no tiene espacios al principio.
   * Si el valor no cumple con las reglas, se considera inválido.
   *
   * @param control - El control de formulario que contiene el valor a validar.
   * @returns Un objeto de error de validación `{ descripcionEspeciales: 'Ingresa datos válidos.' }` si el valor no cumple con las reglas,
   *          o `null` si el valor es válido.
   */
  // eslint-disable-next-line class-methods-use-this
  descripcionEspecialesValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const value = control.value;

    if (
      REGEX_LEADING_SPACES.test(value) ||
      !REGEX_DESCRIPCION_ESPECIALES.test(value)
    ) {
      return { descripcionEspeciales: 'Ingresa datos válidos.' }; // Error message
    }

    return null; // Input is valid
  }
  /**
   * Validador personalizado para regla de descripción especial.
   * @param control - El control de formulario a validar.
   * @returns Un objeto de error de validación o nulo.
   */
  // eslint-disable-next-line class-methods-use-this
  descripcionValidator(control: AbstractControl): ValidationErrors | null {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const value = control.value;
    // Implement your custom validation logic here
    if (value && value.length > 0) {
      return null;
    }
    return { descripcion: true };
  }

  /**
   * Validador personalizado para verificar si el valor está dentro del rango especificado.
   * @param min - El valor mínimo.
   * @param max - El valor máximo.
   * @returns Una función de validación.
   */
  // eslint-disable-next-line class-methods-use-this
  valueRangeValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
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

     this.agregarQuery.selectSolicitud$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.solicitudState = seccionState;
            })
          )
          .subscribe();

    this.frmMercanciaAnimal = this.fb.group({
      fraccionArancelaria: [
        this.solicitudState?.fraccionArancelaria || '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern('^[0-9]*$'), // Sólo dígitos
        ],
      ],
      tratamiento: [
        '',
        [
          Validators.maxLength(1000),
          this.descripcionEspecialesValidator, // Validador personalizado
        ],
      ],
      presentacion: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern('^[0-9]*.?[0-9]+$'), // debe ser un numero
          this.valueRangeValidator(0.01, 999999999999.99), // Validador personalizado para rango de valores
        ],
      ],
      marcaEmbarque: [
        '',
        [
          Validators.maxLength(30),
          this.descripcionValidator, // Custom validator
        ],
      ],
      fechaCaducidad: [
        this.solicitudState?.fechaCaducidad || '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern('^[0-9]*.?[0-9]+$'), // debe ser un numero
          this.valueRangeValidator(0.01, 999999999999.99), // Validador personalizado para rango de valores
        ],
      ],
      aduana: [this.solicitudState?.aduana || '',[ Validators.required]], // Agregue FormControl para el campo seleccionado
      cites: ['', Validators.maxLength(15)],
      nombreIdentificacion: [
        this.solicitudState?.nombreIdentificacion || '',
        [
          Validators.required,
          Validators.maxLength(200),
          this.descripcionEspecialesValidator, // Validador personalizado
        ],
      ],
      numeroAutorizacionCITES: [ this.solicitudState?.raza || '',[Validators.maxLength(15)]],
      raza: [
        this.solicitudState?.raza || '',
        [
          Validators.maxLength(50),
          this.descripcionEspecialesValidator, // Validador personalizado
        ],
      ],
      edadAnimal: [
        this.solicitudState?.edadAnimal || '',
        [
          Validators.required,
          Validators.maxLength(50),
          this.descripcionEspecialesValidator, // Validador personalizado
        ],
      ],
      sexo:[
        this.solicitudState?.sexo || '',
      ],
      color: [
        this.solicitudState?.color || '',
        [
          Validators.maxLength(30),
          this.descripcionEspecialesValidator, // Validador personalizado
        ],
      ],
    });
  }
  // fetchFraccion(): void {
  //   this.selectedValue = 'Nuevo';
  // }
 
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  obtenerDescripcionFraccion(value: string, length: number): void {
    // Implementar la lógica para obtener la descripción de la fracción
    this.frmMercanciaAnimal
      .get('descFraccionArancelaria')
      ?.setValue('Descripción de la fracción');
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
  // eslint-disable-next-line class-methods-use-this
  mostrarMensaje(): void {
    // Implementar la lógica para mostrar un mensaje
  }
  /**
   * Oculta los errores.
   */
  ocultarErrores(): void {
    // Implementar la lógica para ocultar los errores
  }
  /**
   * Muestra los errores.
   */
  mostrarErrores(): void {
    // Implementar la lógica para mostrar los errores
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Agregar220401Store): void {
    const VALOR = form.get(campo)?.value;
    console.log("value",VALOR);
    // const VALOR = form.get('datosdelForm')?.get(campo)?.value;
    (this.agregar220401Store[metodoNombre] as (value: string) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
