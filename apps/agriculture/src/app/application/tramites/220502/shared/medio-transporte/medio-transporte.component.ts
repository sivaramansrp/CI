import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { DatosDeMercancias } from '../../models/solicitud-pantallas.model';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { OpcionesDeBotonDeRadio } from '../../enums/solicitud-pantallas.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { Solicitud220502Query } from '../../estados/tramites220502.query';
import { Solicitud220502State } from '../../estados/tramites220502.store';
import { Solicitud220502Store } from '../../estados/tramites220502.store';
import { Subject } from 'rxjs';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente para gestionar los datos del medio de transporte.
 */
@Component({
  selector: 'app-medio-transporte',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    TableComponent,
    InputRadioComponent
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (): ControlContainer =>
        inject<ControlContainer>(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './medio-transporte.component.html',
  styleUrl: './medio-transporte.component.scss',
})
/**
 * Componente para gestionar los datos del medio de transporte
 */
export class MedioTransporteComponent implements OnInit, OnDestroy, OnChanges {
  /** Propiedad de entrada para identificar la clave de control en el formulario principal */
  @Input() claveDeControl: string = '';

  /** Propiedad de entrada para contener datos relacionados con mercancia. */
  @Input() hMercanciaTabla: string[] = [];

  /** Propiedad de entrada para contener datos relacionados con mercancia. */
  @Input() dMercanciaBody: DatosDeMercancias[] = [];

  /** Propiedad de entrada para gestionar la selección del método de transporte. */
  @Input() mediodetransporte: CatalogosSelect = {} as CatalogosSelect;

  /** Inyectar el ControlContainer principal para administrar los controles de formulario */
  parentContainer = inject(ControlContainer);

  /** Getter para acceder al grupo de formularios principal */
  get grupoFormularioPadre(): FormGroup{
    return this.parentContainer.control as FormGroup;
  }
  esSolicitudFerrosValor!: string;
  opcionDeBotonDeRadio = OpcionesDeBotonDeRadio;

  tableData = {
    tableBody: [],
    tableHeader: [],
  };

  /**
   * Variable que almacena el estado actual de la solicitud.
   * Se inicializa como un objeto vacío de tipo `Solicitud220502State`.
   */
  solicitud220502State: Solicitud220502State = {} as Solicitud220502State;


  /**
    * Subject para desuscribirse de los observables.
    * @type {Subject<void>}
    */
  private destroyed$ = new Subject<void>();

  constructor(
    public solicitud220502Query: Solicitud220502Query,
    public solicitud220502Store: Solicitud220502Store
  ){
    //
  }

  /**
   * Gancho de ciclo de vida que inicializa el componente.
   * Agrega un control de formulario dinámico al formulario principal
   */
  ngOnInit(): void {
    if (this.claveDeControl) {
      // Agregar un nuevo FormGroup dinámicamente al formulario principal
      this.grupoFormularioPadre.addControl(
        this.claveDeControl,
        new FormGroup({
          transporteIdMedio: new FormControl(this.solicitud220502State.transporteIdMedio, [Validators.required]),
          identificacionTransporte: new FormControl(this.solicitud220502State.identificacionTransporte, [
            Validators.maxLength(30),
          ]),
          esSolicitudFerros: new FormControl(this.solicitud220502State.esSolicitudFerros, [Validators.required]),
          totalDeGuiasAmparadas: new FormControl(this.solicitud220502State.totalDeGuiasAmparadas, [
            Validators.maxLength(50),
          ]),
        })
      );
    }

     this.solicitud220502Query.selectSolicitud$.pipe(
            takeUntil(this.destroyed$),
            map((res:Solicitud220502State)=>{
              this.solicitud220502State = res;
              const FORM_GROUP = this.grupoFormularioPadre.get(this.claveDeControl) as FormGroup;
                if (FORM_GROUP) {
                FORM_GROUP.patchValue({
                  transporteIdMedio: this.solicitud220502State.transporteIdMedio,
                  identificacionTransporte: this.solicitud220502State.identificacionTransporte,
                  esSolicitudFerros: this.solicitud220502State.esSolicitudFerros,
                  totalDeGuiasAmparadas: this.solicitud220502State.totalDeGuiasAmparadas
                });
              }
            })
          ).subscribe();
  }

  /**
   * compo doc
   * @method enCambioDeValor
   * @description Actualiza el valor seleccionado.
   * @param {string | number} value - Nuevo valor seleccionado.
   *
   * Este método es para la etiqueta de radio de producto.
   */
  enCambioDeValor(value: string | number): void {
    this.solicitud220502Store.setEsSolicitudFerros(value);
  }

  /**
   * Maneja los cambios en las propiedades de entrada y actualiza los datos de la tabla en consecuencia.
   * @param {SimpleChanges} changes - Objeto que contiene las propiedades modificadas.
   *  
   */
  ngOnChanges(changes: SimpleChanges): void {
    const TBODYKEY = 'hMercanciaTabla';
    const TBODYDATA = 'dMercanciaBody';
    if (changes[TBODYKEY]?.currentValue) {
      this.tableData.tableHeader = changes[TBODYKEY]?.currentValue;
    }
    if (changes[TBODYDATA]?.currentValue) {
      this.tableData.tableBody = changes[TBODYDATA]?.currentValue;
    }
  }

  /**
   * Maneja la selección de un método de transporte.
   * Actualiza el formulario con la descripción del transporte seleccionado.
   * @param e - El artículo del catálogo seleccionado que representa el método de transporte.
   */
  seleccionMedioDeTransporte(e: Catalogo): void {
    if (
      this.claveDeControl &&
      this.grupoFormularioPadre.contains(this.claveDeControl)
    ) {
      this.grupoFormularioPadre.controls[this.claveDeControl].patchValue({
        transporteIdMedio: e.descripcion,
      });
    }
  }
  /**
   * Actualiza el medio de transporte en el estado de la solicitud.
   * 
   * @param event - Objeto de tipo Catalogo que contiene el identificador del medio de transporte.
   */
  setTransporteIdMedio(event: Catalogo): void {
    this.solicitud220502Store.setTransporteIdMedio(event.id);
  }

  /**
   * Actualiza la identificación del transporte en el estado de la solicitud.
   * 
   * @param event - Evento del input que contiene la identificación del transporte.
   */
  setIdentificacionTransporte(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220502Store.setIdentificacionTransporte(VALUE);
  }

  /**
   * Actualiza el total de guías amparadas en el estado de la solicitud.
   * 
   * @param event - Evento del input que contiene el número total de guías amparadas.
   */
  setTotalDeGuiasAmparadas(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220502Store.setTotalDeGuiasAmparadas(VALUE);
  }

  /**
   * Gancho de ciclo de vida que limpia el componente.
   * Elimina el control de formulario dinámico del formulario principal.
   */
  ngOnDestroy(): void {
    if (
      this.claveDeControl &&
      this.grupoFormularioPadre.contains(this.claveDeControl)
    ) {
      this.grupoFormularioPadre.removeControl(this.claveDeControl);
    }
  }
}
