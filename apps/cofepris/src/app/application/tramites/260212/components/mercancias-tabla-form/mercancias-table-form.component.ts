import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent, CrosslistComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { PaisDeOriginComponent } from '../pais-de-origin/pais-de-origin.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SolicitudService } from '../../services/solicitud.service';

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
    PaisDeOriginComponent
  ],
  templateUrl: './mercancias-table-form.component.html',
  styleUrl: './mercancias-table-form.component.scss',
})
export class MercanciasTableFormComponent implements OnInit {
  /**
   * Evento de salida que emite una acción de cancelación.
   */
  @Output() cancel = new EventEmitter<void>();

  /**
   * Lista de fechas seleccionables en el rango de días.
   */
  selectRangoDias: string[] = [];

  /**
  * Variable que controla la visibilidad de la sección colapsable.
  */
  colapsable = false;

  /**
   * Alterna la visibilidad de la sección colapsable.
   */
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

  /**
  * Emite el evento de cancelación para cerrar el formulario.
  */
  close() {
    this.cancel.emit();
  }
  /**
    * Arreglo que almacena las claves del catálogo.
    */
  clave: Catalogo[] = []


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
  constructor(private fb: FormBuilder, private solicitudService: SolicitudService) { }

  /**
  * Método del ciclo de vida Angular que se ejecuta al inicializar el componente.
  * Inicializa el formulario y obtiene las claves del catálogo.
  */
  ngOnInit(): void {
    this.datosMercanciaFormInitial();

    this.solicitudService.getclave().subscribe((data) => {
      this.clave = data;
    }
    );
  }

  /**
 * Inicializa el formulario `datosMercanciaForm` con campos requeridos y validaciones.
 */
  datosMercanciaFormInitial() {
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
}
