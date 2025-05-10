import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TablaExpandibleComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna, TablaSeleccion } from '@ng-mf/data-access-user';
import {
  DescripcionMercancia,
  // DETALLE_COLUMNA, 
  MERCANCIAS_COLUMNA
} from '../../constantes/flora-fauna.enum';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite250102State, Tramite250102Store } from '../../estados/tramite250102.store';
import { Tramite250102Query } from '../../estados/tramite250102.query';
import { map, Subject, takeUntil } from 'rxjs';

import catalogoDatos from '@libs/shared/theme/assets/json/250102/banco.json';
import { CONFIGURATION_TABLA, CONFIGURATION_TABLA_MERCANCIAS, Detalle, Producto } from '../../models/flora-fauna.models';
@Component({
  selector: 'app-mercancias',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ModalComponent, CatalogoSelectComponent, TablaDinamicaComponent, TablaExpandibleComponent, TituloComponent],
  templateUrl: './mercancias.component.html',
  styleUrls: ['./mercancias.component.scss']
})
export class MercanciasComponent implements OnInit {

  // Formulario reactivo que gestiona la entrada de datos de mercancías
  formMercancias!: FormGroup;

  /**
* Catálogo de descripciones. Usado para seleccionar la descripción de la mercancía.
*/
  descripcion: Catalogo[] = catalogoDatos.descripcion;

  /**
   * Catálogo de fracciones arancelarias. Se utiliza para seleccionar la fracción correspondiente.
   */
  fraccion: Catalogo[] = catalogoDatos.fraccion;

  /**
   * Catálogo de unidades de medida. Permite seleccionar la unidad en la que se mide la mercancía.
   */
  medida: Catalogo[] = catalogoDatos.medida;
  /**
   * Catálogo de géneros. Se usa para seleccionar el género biológico de la especie.
   */
  genero: Catalogo[] = catalogoDatos.genero;
  /**
   * Catálogo de especies. Permite seleccionar la especie correspondiente del producto.
   */
  especie: Catalogo[] = catalogoDatos.especie;
  /**
   * Catálogo de nombres comunes. Se utiliza para seleccionar el nombre común de la especie o mercancía.
   */
  comun: Catalogo[] = catalogoDatos.comun;

  /**
   * Catálogo del origen de la mercancía. Indica si es nacional o extranjero, entre otras opciones.
   */
  origen: Catalogo[] = catalogoDatos.origen;
  /**
   * Catálogo de procedencias. Describe el lugar de origen más específico de la mercancía (ej. país, región).
   */
  procedencia: Catalogo[] = catalogoDatos.procedencia;
  /**
  * Arreglo que almacena los detalles de las fracciones de mercancías.
  * 
  * @type {Detalle[]}
  * @description Este arreglo se llena con los datos de las fracciones arancelarias de las mercancías 
  * que se van a procesar o que se encuentran registradas en el sistema.
  */
  fraccionData: Detalle[] = [];
  
  /**
 * Lista de productos agregados por el usuario. Cada elemento representa una mercancía distinta.
 */
  producto: Producto[] = [];

  products: Producto[] = [];

  selectedProduct: Producto | null = null;

  TablaSeleccion = TablaSeleccion;

  configuracionTabla: ConfiguracionColumna<Producto>[] = CONFIGURATION_TABLA;

  configuracionMercanciasTabla: ConfiguracionColumna<Detalle>[] = CONFIGURATION_TABLA_MERCANCIAS;

  detalle: Map<number, Detalle[]> = new Map();

  /**
 * Indica si el modal para agregar mercancías está visible o no.
 */
  showMercanciasModal = false;

  /**
 * Notificador para manejar el ciclo de vida del componente y limpiar las suscripciones.
 * 
*/
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud que contiene información relevante sobre el trámite.
   * @description Esta variable mantiene el estado de la solicitud del trámite y se utiliza para 
   * obtener los datos relacionados con la mercancía en el formulario, como descripción, fracción, cantidad, etc.
   */
  public solicitudState!: Tramite250102State;

  constructor(private fb: FormBuilder,
    private tramite250102Store: Tramite250102Store,
    private tramite250102Query: Tramite250102Query) { }

  ngOnInit(): void {
    // Initialize sample data
    // this.initializeData();

    this.tramite250102Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Tramite250102State;
        })
      )
      .subscribe();

    /**
 * Inicializa el formulario `formMercancias` con los valores de estado de la solicitud.
 * El formulario está compuesto por varios campos, todos ellos requeridos. 
 * Estos campos corresponden a la información de la mercancía, como descripción, fracción arancelaria, 
 * cantidad, medida, entre otros, que provienen del estado de la solicitud (`solicitudState`).
 * 
 * @memberof MercanciasComponent
 */
    this.formMercancias = this.fb.group({
      descripcion: [this.solicitudState.descripcion, Validators.required],
      fraccion: [this.solicitudState.fraccion, Validators.required],
      arancelaria: [this.solicitudState.arancelaria, Validators.required],
      cantidad: [this.solicitudState.cantidad, Validators.required],
      medida: [this.solicitudState.medida, Validators.required],
      genero: [this.solicitudState.genero, Validators.required],
      especie: [this.solicitudState.especie, Validators.required],
      comun: [this.solicitudState.comun, Validators.required],
      origen: [this.solicitudState.origen, Validators.required],
      procedencia: [this.solicitudState.procedencia, Validators.required]
    });

    // Deshabilita el campo 'arancelaria' en el formulario.
    this.formMercancias.get('arancelaria')?.disable();

  }

  /**
   * Método que agrega un detalle de mercancía al array `fraccionData`.
   * Obtiene los valores del formulario y los mapea a los valores correspondientes 
   * de los catálogos de fracción, medida, etc.
   * 
   * @returns {void}
   */
  detalleData(): void {
    const DETALLE_FORMDATA = {
      fraccionArancelaria: this.fraccion.find(item => item.id === Number(this.formMercancias.value.fraccion))?.descripcion,
      cantidad: this.solicitudState.cantidad,
      unidadMedida: this.medida.find(item => item.id === Number(this.formMercancias.value.medida))?.descripcion,
      nombreCientifico: this.genero.find(item => item.id === Number(this.formMercancias.value.genero))?.descripcion,
      nombreComun: this.comun.find(item => item.id === Number(this.formMercancias.value.comun))?.descripcion,
      paisOrigen: this.origen.find(item => item.id === Number(this.formMercancias.value.origen))?.descripcion,
      paisProcedencia: this.procedencia.find(item => item.id === Number(this.formMercancias.value.procedencia))?.descripcion,
    }
    /**
 * Agrega un nuevo objeto de tipo `Detalle` al arreglo `fraccionData`.
 * Este arreglo contiene la información detallada de cada fracción arancelaria registrada.
 * 
 * @example
 * // Agrega un nuevo detalle generado a partir del formulario
 * this.fraccionData.push(DETALLE_FORMDATA);
 */
    this.fraccionData.push(DETALLE_FORMDATA);
  }

  /**
   * Método que establece los valores en el store correspondiente, 
   * utilizando un método de store basado en el campo y el valor del formulario.
   * 
   * @param {FormGroup} form - El formulario con los valores a guardar.
   * @param {string} campo - El campo del formulario que se va a guardar en el store.
   * @param {keyof Tramite250101Store} metodoNombre - El nombre del método en el store que se ejecutará.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite250102Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite250102Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

   /**
   * Método que cancela la operación actual y oculta el modal de mercancías.
   * 
   * @returns {void}
   */
   detalleCancelar(): void {
    // Muestra u oculta el modal de mercancías
    this.showMercanciasModal = !this.showMercanciasModal;
  }
  /**
   * Método que guarda los datos de un producto y cierra el modal de mercancías.
   * 
   * @returns {void}
   */
  detalleGuardar(): void {
    const PRODUCTO_FORMDATA = {
      id: this.producto.length + 1,
      descripcion: this.descripcion.find(item => item.id === Number(this.formMercancias.value.descripcion))?.descripcion,
    }
    /**
 * Agrega un nuevo objeto de tipo `Producto` al arreglo `producto`.
 * Este arreglo almacena los productos que el usuario ha agregado en el formulario.
 * 
 * @example
 * // Agrega un nuevo producto generado a partir del formulario
 * this.producto.push(PRODUCTO_FORMDATA);
 */
    this.producto.push(PRODUCTO_FORMDATA);
    // Muestra u oculta el modal de mercancías
    this.showMercanciasModal = !this.showMercanciasModal;
  }

  // Function to get product details for a specific product
  getDetalle = (product: Producto): Detalle[] => {
    return this.fraccionData || [];
  };

  // Handle product selection
  onProductSelected(product: Producto): void {
    this.selectedProduct = product;
  }

  /**
 * Método que alterna la visibilidad del modal para agregar mercancías.
 * 
 * @returns {void}
 */
  mercancias(): void {
    this.showMercanciasModal = !this.showMercanciasModal;
  }
}
