import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CatalogoSelectComponent, ConfiguracionColumna, InputFecha, InputFechaComponent, InputRadioComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { RadioOpcion } from '../../../tramites/220202/models/220202/fitosanitario.model';
import { CONFIGURACION_DETALLAS_DATOS, FECHA_DE_DATA } from '../../constantes/datos-de-la-solicitue.enum';
import { DetallasDatos, ProductoDetallaEventos, ProductosCatalogosDatos } from '../../models/datos-de-la-solicitue.model';


/**
 * Decorador que define un componente de Angular.
 * 
 * Este componente es independiente (`standalone`) y puede ser utilizado sin necesidad de declararlo
 * en un módulo. Está diseñado para gestionar y mostrar información relacionada con subproductos.
 * 
 * @selector `app-sub-productos` - Selector utilizado para instanciar este componente en una plantilla HTML.
 * 
 * @standalone `true` - Indica que este componente es independiente y no requiere ser declarado en un módulo.
 * 
 * @imports - Lista de módulos y componentes importados que son necesarios para el funcionamiento de este componente:
 * - `CommonModule`: Proporciona directivas y servicios comunes de Angular.
 * - `CatalogoSelectComponent`: Componente personalizado para seleccionar elementos de un catálogo.
 * - `TituloComponent`: Componente personalizado para mostrar títulos.
 * - `ReactiveFormsModule`: Módulo para trabajar con formularios reactivos en Angular.
 * - `TablaDinamicaComponent`: Componente personalizado para mostrar tablas dinámicas.
 * - `InputRadioComponent`: Componente personalizado para manejar botones de radio.
 * 
 * @templateUrl `./sub-productos.component.html` - Ruta al archivo de plantilla HTML que define la estructura visual del componente.
 * 
 * @styleUrl `./sub-productos.component.scss` - Ruta al archivo de estilos SCSS que define la apariencia del componente.
 */
@Component({
  selector: 'app-sub-productos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    InputRadioComponent,
    InputFechaComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './sub-productos.component.html',
})
export class SubProductosComponent implements OnInit, OnDestroy {
  fechaInicioInput: InputFecha = FECHA_DE_DATA;
  /**
   * Representa el formulario reactivo utilizado para gestionar los datos de la mercancía
   * en el componente de detalles de animales vivos.
   * 
   * @type {FormGroup}
   */
  productosForm!: FormGroup;

  /**
   * Configuración de las columnas de la tabla que muestra los detalles de los datos sensibles.
   * Utiliza un arreglo de tipo `ConfiguracionColumna<DetallasDatos>` para definir las propiedades
   * y características de cada columna en la tabla.
   * 
   * @type {ConfiguracionColumna<DetallasDatos>[]}
   */
  public configuracionDetallasDatosTabla: ConfiguracionColumna<DetallasDatos>[] = CONFIGURACION_DETALLAS_DATOS;

  /**
     * Arreglo que almacena los detalles de los datos sensibles ingresados en el formulario.
     * Cada elemento es un objeto de tipo `DetallasDatos` que contiene información específica
     * sobre los animales vivos, como número de lote, fechas de producción, etc.
     * 
     * @type {DetallasDatos[]}
     */
  public detallasDatosTablaDatos: DetallasDatos[] = [];

  /**
     * Arreglo que almacena los detalles de los datos sensibles ingresados en el formulario.
     * Cada elemento es un objeto de tipo `DetallasDatos` que contiene información específica
     * sobre los animales vivos, como número de lote, fechas de producción, etc.
     * 
     * @type {DetallasDatos[]}
     */
  public detallasDatosTablaSeleccionada: DetallasDatos[] = [];
  /**
   * Representa el formulario reactivo utilizado para gestionar los detalles específicos
   * de los animales vivos, como número de lote, color de pelaje, edad, etc.
   * 
   * @type {FormGroup}
   */
  detalleForm!: FormGroup;

  /**
   * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
   * 
   * @type {Subject<void>}
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Datos de la solicitud que se recibirán como entrada en el componente.
   * 
   * @type {ProductosCatalogosDatos}
   */
  @Input() catalogosDatos!: ProductosCatalogosDatos;

  /**
   * Opciones para el botón de radio.
   * @property {RadioOpcion[]} opcionDeBotonDeRadio
   */
  opcionDeBotonDeRadio: RadioOpcion[] = [
    {
      "label": "No",
      "value": "no"
    },
    {
      "label": "Sí",
      "value": "si"
    },
  ];

  /**
   * Indica si el formulario debe mostrarse en modo solo lectura.
   * Cuando es true, los campos del formulario no serán editables por el usuario.
   * 
   * @type {boolean}
   */
  public tablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
     * Evento que se emite cuando se agregan datos al formulario de solicitud de animales vivos.
     * Este evento permite al componente padre recibir los datos del formulario para su procesamiento.
     * 
     * @type {EventEmitter<ProductoDetallaEventos>}
     */
  @Output() agregarDatosFormulario = new EventEmitter<ProductoDetallaEventos>();

  /**
   * Constructor del componente.
   * 
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param ubicaccion - Servicio de ubicación para navegar entre páginas.
   */
  constructor(private fb: FormBuilder,
    private ubicaccion: Location,
  ) {
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se crea el formulario reactivo y se configuran los campos necesarios.
   */
  ngOnInit(): void {
    this.crearFormulario();
  }


  /**
   * Crea y configura los formularios reactivos `productosForm` y `detalleForm` 
   * utilizados en el componente para gestionar los datos relacionados con 
   * productos y detalles específicos.
   * 
   * El formulario `productosForm` incluye los siguientes campos:
   * - `tipoRequisito`: Campo obligatorio para especificar el tipo de requisito.
   * - `requisito`: Campo obligatorio para definir el requisito.
   * - `numeroCertificado`: Campo opcional con un máximo de 50 caracteres y que 
   *   solo permite caracteres alfanuméricos.
   * - `fraccionArancelaria`: Campo obligatorio para la fracción arancelaria.
   * - `descripcionFraccion`: Campo opcional para la descripción de la fracción.
   * - `nico`: Campo obligatorio para el NICO (Número de Identificación Comercial).
   * - `descripcionNico`: Campo opcional para la descripción del NICO.
   * - `descripcion`: Campo opcional con un máximo de 1000 caracteres y que solo 
   *   permite caracteres alfanuméricos.
   * - `cantidadUMT`: Campo opcional que acepta un número con hasta 12 dígitos 
   *   enteros y 3 decimales.
   * - `umt`: Campo obligatorio que está deshabilitado inicialmente.
   * - `cantidadUMC`: Campo opcional que acepta un número con hasta 12 dígitos 
   *   enteros y 3 decimales.
   * - `umc`: Campo obligatorio para la unidad de medida comercial.
   * - `especie`: Campo obligatorio para especificar la especie.
   * - `uso`: Campo obligatorio para definir el uso.
   * - `paisOrigen`: Campo obligatorio para el país de origen.
   * - `paisDeProcedencia`: Campo obligatorio para el país de procedencia.
   * - `presentacion`: Campo opcional para la presentación del producto.
   * - `cantidadPresentacion`: Campo opcional para la cantidad en la presentación.
   * - `tipoPresentacion`: Campo opcional para el tipo de presentación.
   * - `tipoPlanta`: Campo opcional para el tipo de planta.
   * - `plantaAutorizadaOrigen`: Campo opcional para la planta autorizada de origen.
   * 
   * El formulario `detalleForm` incluye los siguientes campos:
   * - `numeroLote`: Campo opcional con un máximo de 16 caracteres y que solo 
   *   permite caracteres alfanuméricos.
   * - `rangoDeFecha`: Campo opcional para especificar un rango de fechas.
   * 
   * Este método inicializa ambos formularios con sus respectivos validadores 
   * para garantizar la integridad de los datos ingresados.
   */
  crearFormulario(): void {
    this.productosForm = this.fb.group({
      tipoRequisito: ['', Validators.required],
      requisito: ['', Validators.required],
      numeroCertificado: ['', [Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: [{ value: '', disabled: true }, Validators.required],
      nico: ['', Validators.required],
      descripcionNico: [{ value: '', disabled: true }, Validators.required],
      descripcion: ['', [Validators.maxLength(1000), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      cantidadUMT: ['', [Validators.pattern(/^\d{1,12}(\.\d{1,3})?$/)]],
      umt: [{ value: '', disabled: true }, Validators.required],
      cantidadUMC: ['', [Validators.pattern(/^\d{1,12}(\.\d{1,3})?$/)]],
      umc: ['', Validators.required],
      especie: ['', Validators.required],
      uso: ['', Validators.required],
      paisOrigen: ['', Validators.required],
      paisDeProcedencia: ['', Validators.required],
      presentacion: [''],
      cantidadPresentacion: [''],
      tipoPresentacion: [''],
      tipoPlanta: [''],
      plantaAutorizadaOrigen: ['']
    });

    this.detalleForm = this.fb.group({
      numeroLote: [''],
      rangoDeFecha: ['no'],
      procesoStart: [''],
      procesoEnd: [''],
      sacrificio: [''],
      sacrificioEnd: [''],
      caducidad: [''],
      caducidadEnd: ['']

    });
  }

  /**
* Maneja la selección del botón de radio y actualiza el store.
* @method radioBotonSeleccionado
*/
  radioBotonSeleccionado(): void {
    const VALOR = this.detalleForm.value.rangoDeFecha;
    this.detalleForm.patchValue({
      rangoDeFecha: VALOR ? VALOR : ''
    });
  }

  /**
* Navega a la ubicación anterior en el historial de navegación.
* Utiliza el servicio de ubicación para retroceder una página.
*/
  cancelar(): void {
    this.productosForm.reset();
    this.detalleForm.reset();
    this.ubicaccion.back();
  }

  /**
 * Método para agregar animales a la lista de datos sensibles.
 * Actualmente no implementa ninguna funcionalidad, pero se puede extender en el futuro.
 */
  agregarAnimales(): void {
    this.agregarDatosFormulario.emit(
      {
        formulario: this.productosForm.value,
        detallasDatosTablaDatos: this.detallasDatosTablaDatos
      }
    );
    this.ubicaccion.back();
  }

  /**
 * Limpia los datos relacionados con los animales vivos.
 * 
 * Este método vacía el arreglo `sensiblesTablaDatos` y reinicia el formulario `mercanciaForm`,
 * dejando ambos en su estado inicial. Útil para restablecer el formulario y los datos de la tabla
 * cuando se requiere comenzar una nueva operación o descartar los cambios actuales.
 */
  limpiarAnimalesVivo(): void {
    this.productosForm.reset();
    this.detalleForm.reset();
    this.detallasDatosTablaDatos = [];
  }

  /**
   * Agrega un nuevo detalle a la tabla de datos.
   * Este método crea un nuevo objeto `DetallasDatos` a partir del formulario `detalleForm`
   * y lo agrega al arreglo `detallasDatosTablaDatos`.
   */
  eliminarDetalle(): void {
    this.detallasDatosTablaDatos = [];
  }


  /**
   * Agrega un nuevo detalle a la tabla de datos y reinicia el formulario de detalles.
   * 
   * Este método crea un objeto de tipo `DetallasDatos` utilizando los valores del formulario
   * `detalleForm` y lo agrega al arreglo `detallasDatosTablaDatos`. Posteriormente, reinicia
   * el formulario para que esté listo para ingresar nuevos datos.
   * 
   * @remarks
   * - Las propiedades de fecha en el objeto `DetallasDatos` se inicializan como cadenas vacías.
   * - Este método asume que `detalleForm` está correctamente configurado con los controles necesarios.
   * 
   * @example
   * // Ejemplo de uso:
   * this.agregarDetalle();
   * 
   * @returns {void} Este método no devuelve ningún valor.
   */
  agregarDetalle(): void {
    const VALOR: DetallasDatos = {
      numeroDeLote: this.detalleForm.value.numeroLote,
      fechaElaboracionEmpaqueProceso: '',
      fechaProduccionSacrificio: '',
      fechaCaducidadProducto: '',
      fechaFinElaboracionEmpaqueProceso: '',
      fechaFinProduccionSacrificio: '',
      fechaFinCaducidadProducto: ''
    }
    this.detallasDatosTablaDatos.push(VALOR);
    this.detalleForm.reset();
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de destruir el componente.
   * Emite una señal a través del observable `destroy$` para notificar a los suscriptores que deben limpiar recursos y cancelar suscripciones.
   * Posteriormente, completa el observable para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
