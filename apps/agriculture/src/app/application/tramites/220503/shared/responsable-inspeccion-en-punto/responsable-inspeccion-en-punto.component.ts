import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { Solicitud220503State } from '../../estados/tramites220503.store';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { Subject } from 'rxjs';
import { TipoContenedor } from '../../models/solicitud-pantallas.model';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente que representa al responsable de la inspección en un punto.
 * Este componente agrega y administra dinámicamente controles de formulario para los detalles de responsabilidad de inspección.
 */
@Component({
  selector: 'app-responsable-inspeccion-en-punto',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (): ControlContainer =>
        inject<ControlContainer>(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './responsable-inspeccion-en-punto.component.html',
  styleUrls: ['./responsable-inspeccion-en-punto.component.scss'],
})
export class ResponsableInspeccionEnPuntoComponent
  implements OnInit, OnDestroy
{
  /**Entrada de propiedad para identificar la clave de control en el formulario principal */
  @Input() claveDeControl: string = '';
  /** Inyecte el ControlContainer principal para administrar los controles de formulario*/
  contenedorPrincipal = inject(ControlContainer);
  /**
   * Getter para acceder al grupo de formulario principal.
   * Devuelve el grupo de formulario principal al que se agregan controles dinámicos.
   */
  get grupoFormularioPadre(): FormGroup {
    return this.contenedorPrincipal.control as FormGroup;
  }
  /** Almacena datos del catálogo para el tipo de contenedor. */
  tipoContenedor: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Subject para desuscribirse de los observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Variable que almacena el estado actual de la solicitud.
   * Se inicializa como un objeto vacío de tipo `Solicitud220503State`.
   */
  Solicitud220503State: Solicitud220503State = {} as Solicitud220503State;

  constructor(
    private solicitud220503Store: Solicitud220503Store,
    private solicitud220503Query: Solicitud220503Query,
    private solicitudService: SolicitudPantallasService /**Servicio para obtener datos de solicitud */
  ) {
    /** Inyectar el ControlContainer principal para administrar los controles de formulario */
  }
  /**
   * Ciclo de vida que inicializa el componente.
   * Agrega un control de formulario dinámico y carga datos iniciales.
   */
  ngOnInit(): void {
    if (this.claveDeControl) {
      // Agregue un nuevo FormGroup dinámico al formulario principal
      this.grupoFormularioPadre.addControl(
        this.claveDeControl,
        new FormGroup({
          nombre: new FormControl(this.Solicitud220503State.nombre, [
            Validators.required,
            Validators.maxLength(150),
          ]),
          primerapellido: new FormControl(
            this.Solicitud220503State.primerapellido,
            [Validators.maxLength(80)]
          ),
          segundoapellido: new FormControl(
            this.Solicitud220503State.segundoapellido,
            [Validators.maxLength(80)]
          ),
          mercancia: new FormControl(this.Solicitud220503State.mercancia, [
            Validators.required,
          ]),
          tipocontenedor: new FormControl(
            this.Solicitud220503State.tipocontenedor,
            []
          ),
        })
      );
    }

    this.solicitud220503Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((res: Solicitud220503State) => {
          this.Solicitud220503State = res;
          const FORM_GROUP = this.grupoFormularioPadre.get(
            this.claveDeControl
          ) as FormGroup;

          if (FORM_GROUP) {
            FORM_GROUP.patchValue({
              nombre: this.Solicitud220503State.nombre,
              primerapellido: this.Solicitud220503State.primerapellido,
              segundoapellido: this.Solicitud220503State.segundoapellido,
              mercancia: this.Solicitud220503State.mercancia,
              tipocontenedor: this.Solicitud220503State.tipocontenedor,
            });
          }
        })
      )
      .subscribe();
    this.cargarDatosIniciales(); // Cargar datos del catálogo inicial
  }
  /**
   * Maneja la selección de un artículo del catálogo.
   * Actualiza el formulario con la descripción del catálogo seleccionado.
   * @param e - El artículo del catálogo seleccionado
   */
  tipoContenedorSeleccion(e: Catalogo): void {
    if (
      this.claveDeControl &&
      this.grupoFormularioPadre.contains(this.claveDeControl)
    ) {
      this.grupoFormularioPadre.controls[this.claveDeControl].patchValue({
        tipocontenedor: e.descripcion,
      });
    }
  }
  /**
   * Carga datos del catálogo inicial para el tipo de contenedor.
   */
  cargarDatosIniciales(): void {
    this.solicitudService
      .getDataResponsableInspeccion()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data: TipoContenedor) => {
          this.tipoContenedor = data.tipoContenedor;
        },
      });
  }
  /**
   * Actualiza el nombre en el estado de la solicitud.
   *
   * @param event - Evento del input que contiene el nuevo valor del nombre.
   */
  setNombre(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.Solicitud220503State.nombre = VALUE;
  }

  /**
   * Actualiza el primer apellido en el estado de la solicitud.
   *
   * @param event - Evento del input que contiene el nuevo valor del primer apellido.
   */
  setPrimerapellido(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.Solicitud220503State.primerapellido = VALUE;
  }

  /**
   * Actualiza el segundo apellido en el estado de la solicitud.
   *
   * @param event - Evento del input que contiene el nuevo valor del segundo apellido.
   */
  setSegundoapellido(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.Solicitud220503State.segundoapellido = VALUE;
  }

  /**
   * Actualiza la mercancía en el estado de la solicitud.
   *
   * @param event - Evento del input que contiene la descripción de la mercancía.
   */
  setMercancia(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.Solicitud220503State.mercancia = VALUE;
  }

  /**
   * Actualiza el tipo de contenedor en el estado de la solicitud.
   *
   * @param event - Objeto de tipo Catalogo que contiene el identificador del tipo de contenedor.
   */
  setTipoContenedor(event: Catalogo): void {
    this.Solicitud220503State.tipocontenedor = event.id;
  }

  /**
   * Gancho de ciclo de vida que limpia el componente.
   * Elimina el control de formulario del formulario principal.
   */
  ngOnDestroy(): void {
    if (
      this.claveDeControl &&
      this.grupoFormularioPadre.contains(this.claveDeControl)
    ) {
      this.grupoFormularioPadre.removeControl(this.claveDeControl);
    }
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
