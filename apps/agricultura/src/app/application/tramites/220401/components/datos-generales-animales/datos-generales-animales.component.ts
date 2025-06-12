import { AbstractControl,FormBuilder,FormGroup,ReactiveFormsModule,ValidationErrors,Validators} from '@angular/forms';
import { Agregar220401Store, solicitud220401State } from '../../../../estados/tramites/agregar220401.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, REGEX_DESCRIPCION_ESPECIALES,REGEX_LEADING_SPACES} from '@ng-mf/data-access-user';
import { Subject,map,takeUntil } from 'rxjs';
import { AgregarQuery } from '../../../../estados/queries/agregar.query';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import aduanasJson from '@libs/shared/theme/assets/json/220401/umc.json';
import sexoJson from '@libs/shared/theme/assets/json/220401/sexo.json';

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
  /**
   * @comdoc
   * Inicializa el formulario de datos generales de animales.
   *
   * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), guarda los datos actuales del formulario.
   * De lo contrario, inicializa el formulario para su edición.
   *
   * @comdoc
   */
  private destroyNotifier$: Subject<void> = new Subject();
    /**
     * Inicializa el formulario de datos generales de animales.
     *
     * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), guarda los datos actuales del formulario.
     * De lo contrario, inicializa el formulario para su edición.
     */
    public solicitudState!: solicitud220401State;
  /** Configuración del primer select de aduanas */
  aduanas: Catalogo[] = aduanasJson;
 
  /** Configuración del segundo select de aduanas */
  sexo: Catalogo[] = sexoJson;

  /** Aduana seleccionada en el primer select */
  selectedAduana: Catalogo = { id: 0, descripcion: '' }; // Provide an initial value
  /** Aduana seleccionada en el segundo select */
  selectedAduanaOne: Catalogo = { id: 0, descripcion: '' }; // Provide an initial value

    /**
     * Indica si el formulario debe mostrarse solo en modo de lectura.
     * Cuando es verdadero, los campos del formulario no serán editables.
     */
    esFormularioSoloLectura: boolean = false; 
  /**
   * Maneja la selección de una aduana en el primer select.
   * @param e - La aduana seleccionada.
   */
  
  constructor(private fb: FormBuilder, 
    private agregar220401Store: Agregar220401Store,
    private agregarQuery: AgregarQuery,
     private consultaioQuery: ConsultaioQuery,
  ) {
        this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        
      })
    )
    .subscribe()
  }
  /**
   * Validador personalizado para validar una descripción especial.
   * Este validador verifica si el valor ingresado cumple con las reglas de caracteres permitidos y no tiene espacios al principio.
   * Si el valor no cumple con las reglas, se considera inválido.
   *
   * @param control - El control de formulario que contiene el valor a validar.
   * @returns Un objeto de error de validación `{ descripcionEspeciales: 'Ingresa datos válidos.' }` si el valor no cumple con las reglas,
   *          o `null` si el valor es válido.
   */
 
  static descripcionEspecialesValidator(
    control: AbstractControl
  ): ValidationErrors | null {
   
    const VALUE = control.value;

    if (
      REGEX_LEADING_SPACES.test(VALUE) ||
      !REGEX_DESCRIPCION_ESPECIALES.test(VALUE)
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
 
  static descripcionValidator(control: AbstractControl): ValidationErrors | null {
    
    const VALUE = control.value;
    // Implement your custom validation logic here
    if (VALUE && VALUE.length > 0) {
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
 
  static valueRangeValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      
      const VALUE = parseFloat(control.value);
      if (isNaN(VALUE) || VALUE < min || VALUE > max) {
        return { valueRange: true };
      }
      return null;
    };
  }
  /**
   * Inicializa el componente y configura el grupo de formularios con reglas de validación.
   */
  ngOnInit(): void {

this.inicializarGeneralesFormulario();
  }

  /**
   * @function inicializarFormulario
   * @description
   * Inicializa el formulario reactivo para la sección de datos generales de animales.
   * 
   * - Suscribe al observable `selectSolicitud$` para obtener el estado actual de la solicitud y actualizar la propiedad `solicitudState`.
   * - Crea el formulario `frmMercanciaAnimal` con los controles y validadores necesarios para cada campo, incluyendo validadores personalizados y reglas específicas de formato y longitud.
   * - Los campos incluyen información como fracción arancelaria, tratamiento, presentación, marca de embarque, fecha de caducidad, aduana, CITES, nombre de identificación, número de autorización CITES, raza, edad del animal, sexo y color.
   * 
   * @remarks
   * Este método debe ser llamado durante la inicialización del componente para asegurar que el formulario esté correctamente configurado y validado según los requisitos del dominio.
   */
  inicializarFormulario():void{
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
          DatosGeneralesAnimalesComponent.descripcionEspecialesValidator, // Validador personalizado
        ],
      ],
      presentacion: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern('^[0-9]*.?[0-9]+$'), // debe ser un numero
          DatosGeneralesAnimalesComponent.valueRangeValidator(0.01, 999999999999.99), // Validador personalizado para rango de valores
        ],
      ],
      marcaEmbarque: [
        '',
        [
          Validators.maxLength(30),
          DatosGeneralesAnimalesComponent.descripcionValidator, // Custom validator
        ],
      ],
      fechaCaducidad: [
        this.solicitudState?.fechaCaducidad || '',
        [
          Validators.required,
          Validators.maxLength(15),
          Validators.pattern('^[0-9]*.?[0-9]+$'), // debe ser un numero
          DatosGeneralesAnimalesComponent.valueRangeValidator(0.01, 999999999999.99), // Validador personalizado para rango de valores
        ],
      ],
      aduana: [this.solicitudState?.aduana || '',[ Validators.required]], // Agregue FormControl para el campo seleccionado
      cites: ['', Validators.maxLength(15)],
      nombreIdentificacion: [
        this.solicitudState?.nombreIdentificacion || '',
        [
          Validators.required,
          Validators.maxLength(200),
          DatosGeneralesAnimalesComponent.descripcionEspecialesValidator, // Validador personalizado
        ],
      ],
      numeroAutorizacionCITES: [ this.solicitudState?.raza || '',[Validators.maxLength(15)]],
      raza: [
        this.solicitudState?.raza || '',
        [
          Validators.maxLength(50),
          DatosGeneralesAnimalesComponent.descripcionEspecialesValidator, // Validador personalizado
        ],
      ],
      edadAnimal: [
        this.solicitudState?.edadAnimal || '',
        [
          Validators.required,
          Validators.maxLength(50),
          DatosGeneralesAnimalesComponent.descripcionEspecialesValidator, // Validador personalizado
        ],
      ],
      sexo:[
        this.solicitudState?.sexo || '',
      ],
      color: [
        this.solicitudState?.color || '',
        [
          Validators.maxLength(30),
          DatosGeneralesAnimalesComponent.descripcionEspecialesValidator, // Validador personalizado
        ],
      ],
    });
  }
    /**
     * Inicializa el formulario de datos generales de animales.
     *
     * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), guarda los datos actuales del formulario.
     * De lo contrario, inicializa el formulario para su edición.
     *
     * @comdoc
     */
    inicializarGeneralesFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
   
  }

    /**
     * @comdoc
     * Guarda los datos del formulario de mercancía animal.
     * 
     * Inicializa el formulario y ajusta su estado según el modo de solo lectura.
     * - Si el formulario está en modo solo lectura, lo deshabilita.
     * - Si no está en modo solo lectura, lo habilita.
     * - Si no aplica ninguna de las condiciones anteriores, no realiza ninguna acción adicional.
     */
    guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.frmMercanciaAnimal.disable();
      } else{
        this.frmMercanciaAnimal.enable();
      } 
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
  
  obtenerDescripcionFraccion(): void {
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
    
  }
  /**
   * @method setValoresStore
   * @description Establece los valores en el store de textiles.
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El nombre del campo.
   * @param {keyof ElegibilidadDeTextilesStore} metodoNombre - El método del store a invocar.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Agregar220401Store): void {
    const VALOR = form.get(campo)?.value;
    (this.agregar220401Store[metodoNombre] as (value: string) => void)(VALOR);
  }
/**
   * @method crearFormCombinacion
   * @description Método para crear el formulario formCombinacion.
   */   
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
