import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, TablaExpandibleComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna, TablaSeleccion } from '@ng-mf/data-access-user';
import { DescripcionMercancia, Detalle, DETALLE_COLUMNA, MERCANCIAS_COLUMNA } from '../../constantes/flora-fauna.enum';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tramite250102State, Tramite250102Store } from '../../estados/tramite250102.store';
import { Tramite250102Query } from '../../estados/tramite250102.query';
import { map, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-mercancias',
  standalone: true,
  imports: [CommonModule,  FormsModule, ReactiveFormsModule,ModalComponent,CatalogoSelectComponent, TablaExpandibleComponent, TituloComponent],
  templateUrl: './mercancias.component.html',
  styleUrls: ['./mercancias.component.scss']
})
export class MercanciasComponent implements OnInit {

    // Formulario reactivo que gestiona la entrada de datos de mercancías
    formMercancias!: FormGroup;

  products: DescripcionMercancia[] = [];

  selectedProduct: DescripcionMercancia | null = null;

  TablaSeleccion = TablaSeleccion;

  mercanciasColumnas: ConfiguracionColumna<DescripcionMercancia>[] = MERCANCIAS_COLUMNA;

  detailColumns: ConfiguracionColumna<Detalle>[] = DETALLE_COLUMNA;

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

  constructor( private fb: FormBuilder,
    private tramite250102Store: Tramite250102Store,
    private tramite250102Query: Tramite250102Query) { }

  ngOnInit(): void {
    // Initialize sample data
    this.initializeData();

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

  // Function to get product details for a specific product
  getDetalle = (product: DescripcionMercancia): Detalle[] => {
    return this.detalle.get(product.id) || [];
  };

  // Handle product selection
  onProductSelected(product: DescripcionMercancia): void {
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

  // Initialize sample data
  private initializeData(): void {
    this.products = [
      { id: 1, descripcionMercancia: 'DIVERSOS EMBALAJES DE MADERA NUEVOS' }
    ];

    // Sample product details
    this.detalle.set(1, [
      { id: 101, fraccionArancelaria: '46019401', descripcionFraccionArancelaria: 'Trenzas y articulos similares, incluso ensamblados en tiras.', cantidad: 23, unidadMedida: 'Kilogramo' },]);
  }
}
