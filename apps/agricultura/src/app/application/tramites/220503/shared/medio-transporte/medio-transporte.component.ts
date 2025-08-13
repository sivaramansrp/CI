import { AlertComponent, Catalogo, ConsultaioQuery } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent,InputRadioComponent } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { DatosDeMercancias } from '../../models/solicitud-pantallas.model';
import { ES_SOLICITUD_FERROS_VALOR } from '../../enums/texto-enum';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/solicitud-pantallas.enum';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleChanges } from '@angular/core';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { Solicitud220503State } from '../../estados/tramites220503.store';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
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
    InputRadioComponent,
    AlertComponent,
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
  get grupoFormularioPadre(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }
  esSolicitudFerrosValor!: string;
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  tableData = {
    tableBody: [],
    tableHeader: [],
  };

   /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false;

  /**
   * Variable que almacena el estado actual de la solicitud.
   * Se inicializa como un objeto vacío de tipo `Solicitud220502State`.
   */
  solicitud220502State: Solicitud220503State = {} as Solicitud220503State;

  /**
   * Subject para desuscribirse de los observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();
 /**
   * Obtiene los datos de enumeración y establece valores de TEXTOS
   */
  /** Constante que almacena los textos utilizados en el componente.
    * Se importa desde el archivo `texto-enum.ts`.
    */
  ES_SOLICITUD_FERROS_VALOR = ES_SOLICITUD_FERROS_VALOR;

  enCambioValor: number | string = 0;
  constructor(
    public solicitud220503Query: Solicitud220503Query,
    public solicitud220503Store: Solicitud220503Store,
    private consultaioQuery: ConsultaioQuery,
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe()
  }

  /**
   * Gancho de ciclo de vida que inicializa el componente.
   * Agrega un control de formulario dinámico al formulario principal
   */
  ngOnInit(): void {
   this.inicializarEstadoFormulario();
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
     if (this.claveDeControl) {
      // Agregar un nuevo FormGroup dinámicamente al formulario principal
      this.grupoFormularioPadre.addControl(
        this.claveDeControl,
        new FormGroup({
          transporteIdMedio: new FormControl(
            this.solicitud220502State.transporteIdMedio || '',
            [Validators.required]
          ),
          identificacionTransporte: new FormControl(
            this.solicitud220502State.identificacionTransporte || ''
          ),
          esSolicitudFerros: new FormControl(
            this.solicitud220502State.esSolicitudFerros || 'no',
            [Validators.required]
          ),
          totalDeGuiasAmparadas: new FormControl(
            this.solicitud220502State.totalDeGuiasAmparadas || ''
          ),
        })
      );
    }

    this.solicitud220503Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((res: Solicitud220503State) => {
          this.solicitud220502State = res;
          const FORM_GROUP = this.grupoFormularioPadre.get(
            this.claveDeControl
          ) as FormGroup;
          if (FORM_GROUP) {
            FORM_GROUP.patchValue({
              transporteIdMedio: this.solicitud220502State.transporteIdMedio|| '',
              identificacionTransporte:
                this.solicitud220502State.identificacionTransporte || '',
              esSolicitudFerros: this.solicitud220502State.esSolicitudFerros || 'no',
              totalDeGuiasAmparadas:
                this.solicitud220502State.totalDeGuiasAmparadas || '',
            });
          }
        })
      )
      .subscribe();
if(this.esFormularioSoloLectura){
  (this.grupoFormularioPadre.get(this.claveDeControl) as FormGroup).disable();
}
  }

   /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
  }

    /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    
 
  this.inicializarFormulario();

  }


  /**
   * compo doc
   * @method enCambioDeValor
   * @description Actualiza el valor seleccionado.
   * @param {string | number} value - Nuevo valor seleccionado.
   *
   * Este método es para la etiqueta de radio de producto.
   */
  enCambioDeValor(value: number | string): void {
    this.enCambioValor = value;
    this.solicitud220503Store.setEsSolicitudFerros(value);
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
    this.solicitud220503Store.setTransporteIdMedio(event.id);
  }

  /**
   * Actualiza la identificación del transporte en el estado de la solicitud.
   *
   * @param event - Evento del input que contiene la identificación del transporte.
   */
  setIdentificacionTransporte(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220503Store.setIdentificacionTransporte(VALUE);
  }

  /**
   * Actualiza el total de guías amparadas en el estado de la solicitud.
   *
   * @param event - Evento del input que contiene el número total de guías amparadas.
   */
  setTotalDeGuiasAmparadas(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud220503Store.setTotalDeGuiasAmparadas(VALUE);
  }
    validarFormularios(): boolean {
    const FORM_GROUP = this.grupoFormularioPadre.get(this.claveDeControl) as FormGroup;
    if(FORM_GROUP.invalid){
      FORM_GROUP.markAllAsTouched();
      return false;
    }
    return FORM_GROUP ? FORM_GROUP.valid : false;
  }

 /**
 * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
 * 
 * Si existe una clave de control y el grupo de formulario padre contiene ese control,
 * se elimina del formulario para evitar referencias innecesarias.
 * 
 * Además, se emite y completa el observable `destroyed$` para cancelar suscripciones activas
 * y liberar recursos.
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
