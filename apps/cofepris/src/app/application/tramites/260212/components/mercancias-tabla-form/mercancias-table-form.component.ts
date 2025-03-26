import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Catalogo, CatalogoSelectComponent, CrosslistComponent, TituloComponent } from '@libs/shared/data-access-user/src';


import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SolicitudService } from '../../services/solicitud.service';
import { Tramite260212Store } from '../../estados/tramite260212.store';

import { Tramite260212Query } from '../../estados/tramite260212.query';

import { Observable, Subject } from 'rxjs';
import { PaisDeOrigenComponent } from '../pais-de-origen/pais-de-origen.component';

/**
 * Componente MercanciasTableFormComponent
 * Este componente gestiona un formulario para manejar datos de mercancías.
 */
@Component({
  selector: 'app-mercancias-table-form',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
    CrosslistComponent,
    PaisDeOrigenComponent
  ],
  templateUrl: './mercancias-table-form.component.html',
  styleUrl: './mercancias-table-form.component.scss',
})
export class MercanciasTableFormComponent implements OnInit, OnDestroy {
  /**
   * Evento de salida que emite una acción de Cancelaración.
   */
  @Output() Cancelar = new EventEmitter<void>();

  /**
    * Subject used for cleaning up component resources when destroyed.
    */
  private destroy$ = new Subject<void>();

  /**
   * Observable for the currently selected "clave" (key) value from the store.
   */
  selecteDespecificarClasificacion$: Observable<Catalogo | null> =
    this.tramite260212Query.selecteDespecificarClasificacion$;

  /**
   * Observable for the currently selected "descripcion" (description) value from the store.
   */
  selectedDescripcion$: Observable<Catalogo | null> =
    this.tramite260212Query.selectedDescripcion$;

  /**
  * Emite el evento de Cancelaración para cerrar el formulario.
  */
  cerrarMercanciasTableForm(): void {
    this.Cancelar.emit();
  }
  /**
    * Arreglo que almacena las claves del catálogo.
    */
  especificarClasificacion: Catalogo[] = [];

  /**
   * Arreglo que almacena las clasificaciones del producto.
   */
  clasificacionProducto: Catalogo[] = [];

  /**
   * Arreglo que almacena los estados físicos del producto.
   */
  estadoFisico: Catalogo[] = [];

  /**
   * Formulario reactivo para gestionar los datos de mercancías.
   */
  datosMercanciaForm!: FormGroup;

  /**
   * Constructor de la clase MercanciasTableFormComponent.
   * 
   * @param {FormBuilder} fb - Servicio de Angular para la creación de formularios reactivos.
   * @param {SolicitudService} solicitudService - Servicio personalizado para manejar solicitudes.
   */
  constructor(private fb: FormBuilder, private solicitudService: SolicitudService,
    private tramite260212Store: Tramite260212Store,
    private tramite260212Query: Tramite260212Query
  ) {
    // Se puede agregar lógica de inicialización aquí si es necesario
  }

  /**
  * Método del ciclo de vida Angular que se ejecuta al inicializar el componente.
  * Inicializa el formulario y obtiene las claves del catálogo.
  */
  ngOnInit(): void {
    this.datosMercanciaFormInitial();

    this.solicitudService.getClave().subscribe((data) => {
      this.especificarClasificacion = data;
    });

    this.solicitudService.getClasificacionProducto().subscribe((data) => {
      this.clasificacionProducto = data;
    });

    this.solicitudService.getTestadoFisico().subscribe((data) => {
      this.estadoFisico = data;
    });

    this.selecteDespecificarClasificacion$.subscribe((selectedDespecificarClasificacion) => {
      if (selectedDespecificarClasificacion) {
        this.datosMercanciaForm.get('especificarClasificacion')?.setValue(selectedDespecificarClasificacion);
      }
    });
  }

  /**
 * Inicializa el formulario `datosMercanciaForm` con campos requeridos y validaciones.
 */
  datosMercanciaFormInitial(): void {
    this.datosMercanciaForm = this.fb.group({
      clasificacion: ['', Validators.required],
      especificarClasificacion: ['', Validators.required],
      especificaDelProducto: ['', Validators.required],
      denominacionDistintiva: ['', Validators.required],
      nombreCientifico: ['', Validators.required],
      tipoDeProducto: ['', Validators.required],
      estadoFisico: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: ['', Validators.required],
      cantidadUMT: ['', Validators.required],
      UMT: ['', Validators.required],
      cantidadUMC: ['', Validators.required],
      UMC: ['', Validators.required],
      tipoDeEnvase: ['', Validators.required]
    });
  }

  /**
   * Obtiene el valor de 'especificarClasificacion' del formulario y lo establece en el store.
   */
  getEspecificar(): void {
    const SELECTED_ESPECIFICIAR = this.datosMercanciaForm.get('especificarClasificacion')?.value;
    this.tramite260212Store.setDespecificarClasificacion(SELECTED_ESPECIFICIAR);
  }

  /**
 * Angular lifecycle hook invoked when the component is destroyed.
 * Cleans up any subscriptions or resources associated with the component.
 */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
