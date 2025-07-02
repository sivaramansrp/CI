/**
 * @fileoverview Componente para la gestión del formulario de asignación.
 * Este componente maneja la lógica y la presentación del formulario de asignación,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module AsignciontabComponent
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite120404State, Tramite120404Store } from '../../estados/store/tramite120404.store';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { InputRadioComponent } from '@libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component';
import { SolicitanteasigncionserviceService } from '@libs/shared/data-access-user/src';
import { SolicitantetabComponent } from '../solicitantetab/solicitantetab.component';
import { Tramite120404Query } from '../../estados/queries/tramite120404.query';



/**
 * Componente para la gestión del formulario de asignación.
 * @selector app-asignciontab
 * @standalone true
 * @imports [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, SolicitantetabComponent, InputRadioComponent]
 * @templateUrl ./asignciontab.component.html
 * @styleUrl ./asignciontab.component.scss
 */
@Component({
  selector: 'app-asignciontab',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, CatalogoSelectComponent,SolicitantetabComponent, InputRadioComponent],
  templateUrl: './asigncion-tab.component.html',
  styleUrls: ['./asigncion-tab.component.scss'],
})
export class AsignciontabComponent implements OnInit, OnDestroy {
  /**
   * Sujeto para manejar la destrucción del componente.
   */
  public destroyed$ = new Subject<void>();

  /**
   * Formulario de asignación.
   */
  asignacionForm!: FormGroup;

  /**
   * Valor seleccionado de asignación.
   */
  selectedAsigncion: string | number = '';

  /**
   * Valor seleccionado para el componente de radio.
   */
  selectedValue: string | number = 'no';

  /**
   * Opciones de radio para la asignación.
   */
   asignacionRadio = [
    {
      label: 'Ampliación de vigencia',
      value: 'vigencia'
    },
    {
      label: 'Amplicacion de monto',
      value: 'monto'
    }
  ];

  /**
   * Estado de la solicitud.
   * Este estado se obtiene del store `Tramite120404Query`.
   */
  public solicitudState!: Tramite120404State;
  /**
   * Lista de asignaciones.
   */
  public solicitanteList: Catalogo[] =[];
  /**
   * Indica si el formulario es de solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   *  FormBuilder para la creación del formulario.
   *  Servicio para obtener los datos de asignación.
   */
  constructor(private fb: FormBuilder, private service: SolicitanteasigncionserviceService, private tramite120404Store:Tramite120404Store,private tramite120404Query:Tramite120404Query, private consultaioQuery: ConsultaioQuery) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.loadComboUnidadMedida();
  }

  /**
   * Inicializa el formulario de asignación.
   */
  initForm(): void {
     this.obtenerEstadoSolicitud();
      this.asignacionForm = this.fb.group({
      asignacionRadio: [this.solicitudState?.asignacionRadio || '', Validators.requiredTrue],
      asignacionsolitud: [this.solicitudState?.asignacionsolitud || '', Validators.required],
      numTramite: [this.solicitudState?.numTramite || '', Validators.required],
    });
  }
  
/**
 * @method obtenerEstadoSolicitud
 * @description
 * Método que obtiene el estado actual de la solicitud almacenado en la tienda `Tramite120404Query`.
 * Se suscribe al observable `selectTramite120404$` para recibir actualizaciones en tiempo real.
 * La suscripción se gestiona con `takeUntil(this.destroyed$)` para evitar fugas de memoria.
 *
 * @returns {void}
 * No retorna ningún valor, pero actualiza la variable `solicitudState` con los datos obtenidos.
 */
   obtenerEstadoSolicitud(): void {
    this.tramite120404Query.selectTramite120404$?.pipe(takeUntil(this.destroyed$))
      .subscribe((data: Tramite120404State) => {
        this.solicitudState = data;
      });
  }
  /**
   * Determina si se debe cargar un formulario nuevo o uno existente.  
   * Ejecuta la lógica correspondiente según el estado del componente.
  */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.initForm();
    }
  }


  /**
   * Verifica si un control del formulario es inválido.
   * Identificador del control.
   * true si el control es inválido, false en caso contrario.
   */
  isInvalid(id: string): boolean | null {
    const CONTROL = this.asignacionForm.get(id);
    return CONTROL ? CONTROL.invalid && CONTROL.touched : null;
  }

  /**
   * Carga los datos del combo de unidad de medida.
   */
  loadComboUnidadMedida(): void {
    this.service.getAsigncion().pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data) => {
      this.solicitanteList = data ;
    });
  }
 /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.initForm();
    if (this.esFormularioSoloLectura) {
      this.asignacionForm.disable();
    } else { 
      this.asignacionForm.enable();
    } 
}
  /**
  * Obtiene el valor de un control en el formulario y lo pasa a un método del store para actualizar el estado.
  */
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.tramite120404Store.establecerDatos({ [campo]: VALOR });
  }

  /**
   * Método de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}