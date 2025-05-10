import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, TablaDinamicaComponent, TablaExpandibleComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna, TablaSeleccion } from '@ng-mf/data-access-user';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite250102State, Tramite250102Store } from '../../estados/tramite250102.store';
import { Tramite250102Query } from '../../estados/tramite250102.query';
import { map, Subject, takeUntil } from 'rxjs';

import catalogoDatos from '@libs/shared/theme/assets/json/250102/banco.json';
import { 
  CONFIGURATION_TABLA, 
  CONFIGURATION_TABLA_MERCANCIAS, 
  Detalle, 
  Producto 
} from '../../models/flora-fauna.models';

@Component({
  selector: 'app-mercancias',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ModalComponent, 
    CatalogoSelectComponent, 
    TablaDinamicaComponent, 
    TablaExpandibleComponent, 
    TituloComponent
  ],
  templateUrl: './mercancias.component.html',
  styleUrls: ['./mercancias.component.scss']
})
export class MercanciasComponent implements OnInit, OnDestroy {

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

  selectedProduct: Producto | null = null;

  TablaSeleccion = TablaSeleccion;

  // Use the imported configuration from the models file
  configuracionTabla: ConfiguracionColumna<Producto>[] = CONFIGURATION_TABLA;

  // Use the imported configuration from the models file
  configuracionMercanciasTabla: ConfiguracionColumna<Detalle>[] = CONFIGURATION_TABLA_MERCANCIAS;

  // Map to store details for each product
  detalleMap: Map<number, Detalle[]> = new Map();

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
    // Get the current state from the store
    this.tramite250102Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Tramite250102State;
          
          // If we have products in the state, load them
          if (this.solicitudState.productos && this.solicitudState.productos.length > 0) {
            this.producto = [...this.solicitudState.productos];
          }
          
          // If we have details in the state, load them
          if (this.solicitudState.detalles) {
            console.log('Loading details from state:', this.solicitudState.detalles);
            this.detalleMap = new Map(this.solicitudState.detalles);
          }
        })
      )
      .subscribe();

    /**
     * Inicializa el formulario `formMercancias` con los valores de estado de la solicitud.
     * El formulario está compuesto por varios campos, todos ellos requeridos. 
     * Estos campos corresponden a la información de la mercancía, como descripción, fracción arancelaria, 
     * cantidad, medida, entre otros, que provienen del estado de la solicitud (`solicitudState`).
     */
    this.formMercancias = this.fb.group({
      descripcion: [this.solicitudState?.descripcion || '', Validators.required],
      fraccion: [this.solicitudState?.fraccion || '', Validators.required],
      arancelaria: [this.solicitudState?.arancelaria || '', Validators.required],
      cantidad: [this.solicitudState?.cantidad || '', Validators.required],
      medida: [this.solicitudState?.medida || '', Validators.required],
      genero: [this.solicitudState?.genero || '', Validators.required],
      especie: [this.solicitudState?.especie || '', Validators.required],
      comun: [this.solicitudState?.comun || '', Validators.required],
      origen: [this.solicitudState?.origen || '', Validators.required],
      procedencia: [this.solicitudState?.procedencia || '', Validators.required]
    });

    // Deshabilita el campo 'arancelaria' en el formulario.
    this.formMercancias.get('arancelaria')?.disable();
  }

  /**
   * Function to get product details for a specific product
   * This is the function that will be passed to the TablaExpandibleComponent
   * 
   * @param product - The product to get details for
   * @returns An array of details for the product
   */
  obtenerDatosAnidados = (product: Producto): Detalle[] => {
    if (!product || !product.id) {
      console.warn('Invalid product or product ID:', product);
      return [];
    }
    console.log(`detalleMap:`, this.detalleMap);
    const details = this.detalleMap.get(product.id);
    
    if (!details || details.length === 0) {
      console.log(`No details found for product ${product.id}`);
      return [];
    }
    
    console.log(`Found ${details.length} details for product ${product.id}:`, details);
    return details;
  };

  /**
   * Handle product selection
   */
  onProductSelected(product: Producto): void {
    this.selectedProduct = product;
    console.log('Selected product:', product);
  }

  /**
   * Método que agrega un detalle de mercancía al array `fraccionData`.
   * Obtiene los valores del formulario y los mapea a los valores correspondientes 
   * de los catálogos de fracción, medida, etc.
   * 
   * @returns {void}
   */
  detalleData(): void {
    // Validate form values
    if (!this.formMercancias.valid) {
      console.error('Form is not valid');
      return;
    }
    
    const DETALLE_FORMDATA: Detalle = {
      fraccionArancelaria: this.fraccion.find(item => item.id === Number(this.formMercancias.value.fraccion))?.descripcion || '',
      cantidad: this.formMercancias.value.cantidad.toString(), // Convert to string to match Detalle interface
      unidadMedida: this.medida.find(item => item.id === Number(this.formMercancias.value.medida))?.descripcion || '',
      nombreCientifico: this.genero.find(item => item.id === Number(this.formMercancias.value.genero))?.descripcion || '',
      nombreComun: this.comun.find(item => item.id === Number(this.formMercancias.value.comun))?.descripcion || '',
      paisOrigen: this.origen.find(item => item.id === Number(this.formMercancias.value.origen))?.descripcion || '',
      paisProcedencia: this.procedencia.find(item => item.id === Number(this.formMercancias.value.procedencia))?.descripcion || '',
    };

    this.fraccionData.push(DETALLE_FORMDATA);
    console.log('Added detail:', DETALLE_FORMDATA);
    console.log('Current fraccionData:', this.fraccionData);
  }

  /**
   * Método que establece los valores en el store correspondiente, 
   * utilizando un método de store basado en el campo y el valor del formulario.
   * 
   * @param {FormGroup} form - El formulario con los valores a guardar.
   * @param {string} campo - El campo del formulario que se va a guardar en el store.
   * @param {keyof Tramite250102Store} metodoNombre - El nombre del método en el store que se ejecutará.
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
    // Reset the form
    this.formMercancias.reset();
    // Clear the fraccionData array
    this.fraccionData = [];
    // Muestra u oculta el modal de mercancías
    this.showMercanciasModal = !this.showMercanciasModal;
  }
  
  /**
   * Método que guarda los datos de un producto y cierra el modal de mercancías.
   * 
   * @returns {void}
   */
/**
 * Método que guarda los datos de un producto y cierra el modal de mercancías.
 * 
 * @returns {void}
 */
/**
 * Método que guarda los datos de un producto y cierra el modal de mercancías.
 * 
 * @returns {void}
 */
detalleGuardar(): void {
  if (this.fraccionData.length === 0) {
    console.error('No details to save');
    return;
  }
  
  // Validate that we have a description selected
  if (!this.formMercancias.value.descripcion) {
    console.error('No description selected');
    return;
  }
  
  const newProductId = this.generateId();
  
  const PRODUCTO_FORMDATA: Producto = {
    id: newProductId,
    descripcion: this.descripcion.find(item => item.id === Number(this.formMercancias.value.descripcion))?.descripcion || '',
  };
  
  // Add the new product to the array
  this.producto.push(PRODUCTO_FORMDATA);
  
  // Create a deep copy of the fraccionData array to ensure it's not affected by future changes
  const detailsCopy = [...this.fraccionData.map(detail => ({...detail}))];
  
  // Store the details for this specific product
  this.detalleMap.set(newProductId, detailsCopy);
  
  console.log('Saved product:', PRODUCTO_FORMDATA);
  console.log('Saved details:', detailsCopy);
  console.log('Current detalle map before store update:', this.detalleMap);
  
  // Create a properly typed tuple array for the entries
  const detalleEntries: [number, Detalle[]][] = Array.from(this.detalleMap.entries()).map(
    ([key, value]) => [key, [...value]] as [number, Detalle[]]
  );
  
  // Update the store with the new product and details
  this.tramite250102Store.setProductos([...this.producto]);
  this.tramite250102Store.setDetalles(detalleEntries);
  
  console.log('Current detalle map after store update:', this.detalleMap);
  
  // Reset the form
  this.formMercancias.reset();
  
  // Clear the fraccionData array
  this.fraccionData = [];
  
  // Muestra u oculta el modal de mercancías
  this.showMercanciasModal = !this.showMercanciasModal;
}


  /**
   * Método que alterna la visibilidad del modal para agregar mercancías.
   * 
   * @returns {void}
   */
  mercancias(): void {
    // Reset the form when opening the modal
    if (!this.showMercanciasModal) {
      this.formMercancias.reset();
      this.fraccionData = [];
    }
    this.showMercanciasModal = !this.showMercanciasModal;
  }
  
  /**
   * Genera un ID único para nuevos elementos
   * @returns {number} ID generado
   */
  private generateId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }
  
  /**
   * Cleanup on component destruction
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
