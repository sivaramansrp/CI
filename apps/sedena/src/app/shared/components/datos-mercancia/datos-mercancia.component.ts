import { ActivatedRoute } from '@angular/router';
import { CROSLISTA_DE_PAISES } from '../../constants/datos-solicitud.enum';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CrossListLable } from '@ng-mf/data-access-user';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MercanciaDetalle } from '../../models/datos-del-tramite.model';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
/**
 * @title Datos de la Mercancía
 * @description Componente que permite capturar y emitir la información relacionada con una mercancía específica.
 * @summary Componente para gestionar los datos de la mercancía, incluyendo fracción arancelaria, país de origen, valores y unidades.
 */

@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    CrosslistComponent,
  ],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.css',
})
export class DatosMercanciaComponent implements OnInit {
  /**
   * Observable para controlar el ciclo de vida de las suscripciones.
   * @property {Subject<void>} unsubscribe$
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Lista de mercancías registradas.
   * @property {MercanciaDetalle[]} datosMercancias
   */
  datosMercancias: MercanciaDetalle[] = [];

  /**
   * Evento que emite la lista de mercancías cuando se actualiza.
   * @event updateMercanciaDetalle
   */
  @Output() updateMercanciaDetalle = new EventEmitter<MercanciaDetalle[]>();

  /**
   * Formulario reactivo para capturar los datos de la mercancía.
   * @property {FormGroup} datosMercancia
   */
  datosMercancia!: FormGroup;

  /**
   * Catálogo de fracciones arancelarias.
   * @property {Catalogo[]} fraccionesCatalogo
   */
  fraccionesCatalogo: Catalogo[] = [];

  /**
   * Catálogo de unidades de medida comercial (UMC).
   * @property {Catalogo[]} umcCatalogo
   */
  umcCatalogo: Catalogo[] = [];

  /**
   * Catálogo de tipos de moneda.
   * @property {Catalogo[]} monedaCatalogo
   */
  monedaCatalogo: Catalogo[] = [];

  /**
   * Lista de países disponibles para seleccionar el país de origen.
   * @property {string[]} seleccionarOrigenDelPais
   */
  public seleccionarOrigenDelPais = CROSLISTA_DE_PAISES;

  /**
   * Etiquetas para el componente Crosslist de país de origen.
   * @property {CrossListLable} paisDeOriginLabel
   */
  public paisDeOriginLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen',
    derecha: 'País(es) seleccionado(s)',
  };

  /**
   * Países seleccionados como origen de la mercancía.
   * @property {string[]} seleccionadasPaisDeOriginDatos
   */
  public seleccionadasPaisDeOriginDatos: string[] = [];

  /**
   * Constructor del componente.
   * @method constructor
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {Router} router - Servicio para navegación.
   * @param {ActivatedRoute} activatedRoute - Ruta activa actual.
   * @param {Location} ubicaccion - Servicio para navegación hacia atrás.
   * @param {DatosSolicitudService} datosSolicitudService - Servicio para obtener catálogos relacionados con la mercancía.
   * @returns {void}
   */
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ubicaccion: Location,
    private datosSolicitudService: DatosSolicitudService
  ) {
    this.cargarDatos();
  }

  /**
   * Carga los catálogos necesarios para llenar los selectores del formulario.
   * @method cargarDatos
   * @returns {void}
   */
  cargarDatos(): void {
    this.datosSolicitudService
      .obtenerFraccionesCatalogo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.fraccionesCatalogo = data;
      });

    this.datosSolicitudService
      .obtenerUMCCatalogo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.umcCatalogo = data;
      });

    this.datosSolicitudService
      .obtenerMonedaCatalogo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.monedaCatalogo = data;
      });
  }

  /**
   * Navega hacia la ruta relativa proporcionada.
   * @method irAAcciones
   * @param {string} accionesPath - Ruta relativa hacia la vista de acciones.
   * @returns {void}
   */
  irAAcciones(accionesPath: string): void {
    this.router.navigate([accionesPath], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * Maneja el cambio en la selección del país de origen.
   * @method paisDeOriginSeleccionadasChange
   * @param {string[]} events - Lista de países seleccionados.
   * @returns {void}
   */
  paisDeOriginSeleccionadasChange(events: string[]): void {
    this.seleccionadasPaisDeOriginDatos = events;
    this.datosMercancia.patchValue({
      paisDeOriginDatos: events,
    });
  }

  /**
   * Guarda los datos de la mercancía actual, los emite al componente padre y resetea el formulario.
   * @method guardar
   * @returns {void}
   */
  guardar(): void {
    const DATOS_MERCANCIA: MercanciaDetalle = {
      fraccionArancelaria: this.datosMercancia.get('fraccionArancelaria')
        ?.value,
      descripcionFraccion: this.datosMercancia.get('descFraccion')?.value,
      unidadMedidaTarifa: this.datosMercancia.get('umt')?.value,
      umc: this.datosMercancia.get('umc')?.value,
      cantidadUMT: this.datosMercancia.get('cantidadUMT')?.value,
      valorComercial: this.datosMercancia.get('valorComercial')?.value,
      tipoMoneda: this.datosMercancia.get('tipoMoneda')?.value,
      descripcion: this.datosMercancia.get('descripcion')?.value,
      paisOrigen: this.seleccionadasPaisDeOriginDatos.join(','),
    };

    this.datosMercancias.push(DATOS_MERCANCIA);
    this.updateMercanciaDetalle.emit(this.datosMercancias);
    this.datosMercancia.reset();
    this.ubicaccion.back();
  }

  /**
   * Inicializa el formulario reactivo con valores por defecto y validaciones.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.datosMercancia = this.fb.group({
      descripcion: ['QAS', Validators.required],
      fraccionArancelaria: ['25030002', Validators.required],
      descFraccion: [
        {
          value:
            'Azufre de cualquier clase, excepto el sublimado, el precipitado y el coloidal.',
          disabled: true,
        },
        Validators.required,
      ],
      cantidadUMT: [null, Validators.required],
      umt: [{ value: 'Kilogramo', disabled: true }, Validators.required],
      valorComercial: [null, Validators.required],
      umc: [null, Validators.required],
      tipoMoneda: [null, Validators.required],
      paisDeOriginDatos: [null],
    });
  }

  /**
   * Limpia todos los campos del formulario.
   * @method limpiarFormulario
   * @returns {void}
   */
  limpiarFormulario(): void {
    this.datosMercancia.reset();
  }

  /**
   * @method cancelar
   * @description Navega hacia la vista anterior utilizando el servicio de ubicación (`Location`).
   * @returns {void}
   */
  cancelar(): void {
    this.ubicaccion.back();
  }
}
