/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputRadioComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Subject, Subscription, distinctUntilChanged, take, takeUntil } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ConfiguracionDropdown } from '@libs/shared/data-access-user/src/core/models/110203/datos-busqueda.model';
import { RadioOpcion } from '@libs/shared/data-access-user/src/core/models/110203/datos-busqueda.model';
import { TableData } from '@libs/shared/data-access-user/src/core/models/110203/datos-busqueda.model';

import { ActivatedRoute, Router } from '@angular/router';
import { Tramite110203Query } from '../../../../estados/queries/tramite110203.query'
import { Tramite110203Store } from '../../../../estados/tramites/tramite110203.store';
import datosBusquedaDropdown from '@libs/shared/theme/assets/json/110203/datos-busqueda.json';
import destinatarioTable from '@libs/shared/theme/assets/json/110203/datos-busqueda-table.json'
import radioOpciones from '@libs/shared/theme/assets/json/110203/datos-busqueda.json';



/**
 * Standalone component for managing search data.
 * 
 * - Uses Angular modules and custom components.
 * - Provides search options, form validation, and table visualization.
 */
@Component({
  selector: 'app-datos-busqueda',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, InputRadioComponent, CatalogoSelectComponent, TableComponent],
  templateUrl: './datos-busqueda.component.html',
  styleUrl: './datos-busqueda.component.css',
})
export class DatosBusquedaComponent implements OnInit, OnDestroy {

  /**
  * Almacena el valor seleccionado, que puede ser un string o un número.
  * Se inicializa con "Por número de certificado".
  *
  * @property {string | number} valorSeleccionado - Valor seleccionado por el usuario.
  */
  valorSeleccionado: string | number = "Por número de certificado";

  /**
   * Indica si la tabla debe ser visible.
   * Se inicializa en false (no visible).
   *
   * @property {boolean} verTabla - Estado de visibilidad de la tabla.
   */
  verTabla = false;

  configuracionesDropdown: ConfiguracionDropdown[] = [];

  /**
   * Colección de entidades del catálogo.
   * Se inicializa de forma tardía (lazy initialization) con el operador '!'.
   *
   * @property {Catalogo[]} entidad - Entidades del catálogo.
   */
  public entidad!: Catalogo[];

  /**
   * Subject utilizado para manejar la desuscripción de observables.
   * Se inicializa para evitar fugas de memoria.
   *
   * @property {Subject<void>} unsubscribe$ - Subject para la desuscripción.
   */
  private unsubscribe$ = new Subject<void>();

  /**
   * Grupo de formularios que contiene los datos de búsqueda.
   * Se inicializa de forma tardía (lazy initialization) con el operador '!'.
   *
   * @property {FormGroup} datosBusquedaFormulario - Formulario de búsqueda.
   */
  datosBusquedaFormulario!: FormGroup;

  /**
   * Suscripción para manejar el ciclo de vida del formulario.
   * Se inicializa de forma tardía (lazy initialization) con el operador '!'.
   *
   * @property {Subscription} formSubscription - Suscripción para cambios en el formulario.
   */
  formSubscription!: Subscription;

  /**
   * Suscripción para restaurar datos o valores.
   * Se inicializa de forma tardía (lazy initialization) con el operador '!'.
   *
   * @property {Subscription} restauraSubscription$ - Suscripción para restaurar valores.
   */
  restauraSubscription$!: Subscription;

  /**
   * Opciones de radio para la selección en el formulario.
   * Cada opción tiene una etiqueta (label) y un valor (value).
   *
   * @property {RadioOpcion[]} radioOptions - Opciones de radio disponibles.
   */
  radioOptions: RadioOpcion[] = radioOpciones?.radioOptions;

  /**
   * Encabezados de la tabla para el establecimiento.
   * Se inicializa como un arreglo vacío.
   *
   * @property {string[]} establecimientoHeaderData - Encabezados de la tabla.
   */
  public establecimientoHeaderData: string[] = [];

  /**
   * Datos del cuerpo de la tabla para el establecimiento.
   * Se inicializa como un arreglo de tipo desconocido (unknown).
   *
   * @property {unknown} establecimientoBodyData - Datos del cuerpo de la tabla.
   */
  public establecimientoBodyData: unknown = [];


  destinatarioTableData: TableData = { encabezadoDeTabla: [], cuerpoTabla: [] };

  /** 
   * Constructor del componente.
   * Se inyectan las dependencias necesarias para el funcionamiento del componente.
   *
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {Router} router - Servicio para la navegación entre rutas.
   * @param {Tramite110203Query} tramite110203Query - Consulta para manejar datos del trámite 110203.
   * @param {Tramite110203Store} tramite110203Store - Almacenamiento para manejar el estado del trámite 110203.
   */
  constructor(
    private fb: FormBuilder, // Servicio para construir formularios reactivos
    private router: Router, // Servicio para la navegación entre rutas
    private tramite110203Query: Tramite110203Query, // Consulta para manejar datos del trámite 110203
    private tramite110203Store: Tramite110203Store, // Almacenamiento para manejar el estado del trámite 110203
    // eslint-disable-next-line no-empty-function
    private route: ActivatedRoute
  ) {
    /** 
     Configuración de dropdowns para los catálogos de búsqueda
     Incluye los datos para los tratados y países
   */
    this.configuracionesDropdown = [
      { catalogos: datosBusquedaDropdown?.tratado ?? [] },
      { catalogos: datosBusquedaDropdown?.pais ?? [] }
    ];
  }

  /** 
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se configuran los datos iniciales y las suscripciones necesarias.
   */
  ngOnInit(): void {
    /** 
     * Crea el formulario para la búsqueda de datos.
     */
    this.createFormDatosBusqueda();

    /** 
     * Suscribe a los cambios en el valor seleccionado del trámite.
     * Utiliza takeUntil para evitar fugas de memoria.
     */
    this.tramite110203Query.valorSeleccionado$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(valor => {
        this.valorSeleccionado = valor; // Actualiza el valor seleccionado.
      });

    /** 
     * Restaura los valores del formulario a su estado inicial.
     */
    this.restaurarValoresFormulario();

    /** 
 * Escucha los cambios en el campo "numeroDeCertificado" del formulario.  
 * Cuando el usuario modifica este campo, se actualiza el estado correspondiente  
 * en la tienda de Akita utilizando el método setNumeroDeCertificado.  
 */
    this.datosBusquedaFormulario.get('numeroDeCertificado')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(valor => this.tramite110203Store.setNumeroDeCertificado(valor));

    /** 
     * Escucha los cambios en el campo "tratadoAcuerdo" del formulario.  
     * Si el usuario cambia el valor, este se almacena en la tienda de Akita  
     * llamando al método setTratadoAcuerdo.  
     */
    this.datosBusquedaFormulario.get('tratadoAcuerdo')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(valor => this.tramite110203Store.setTratadoAcuerdo(valor));

    /** 
     * Escucha los cambios en el campo "paisBloque" del formulario.  
     * Cualquier modificación en este campo se refleja en el estado global  
     * de la aplicación a través del método setPaisBloque de la tienda.  
     */
    this.datosBusquedaFormulario.get('paisBloque')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(valor => this.tramite110203Store.setPaisBloque(valor));


    this.destinatarioTableData.encabezadoDeTabla = destinatarioTable?.encabezadoDeTabla;
    this.destinatarioTableData.cuerpoTabla = destinatarioTable?.cuerpoTabla;

    /** 
    * Llama a la función para obtener los datos del establecimiento.
    */
    this.getEstableCimiento();

  }
  /**
   * Handles radio value changes.
   * Updates the selected value, adjusts form validators, and syncs global state.
   * 
   * @param valor The new selected value (string or number).
   */
  enCambioValorRadio(valor: string | number): void {
    this.valorSeleccionado = valor;
    this.validadoresActualización();
    this.tramite110203Store.setValorSeleccionado(valor);
  }

  /**
   * Assigns establishment table data, including headers and body, from a JSON file.
   */
  private getEstableCimiento(): void {
    this.establecimientoHeaderData = this.destinatarioTableData?.encabezadoDeTabla;
    this.establecimientoBodyData = this.destinatarioTableData?.cuerpoTabla;
  }

  /**
   * Initializes the search form with fields for certificate number, treaty/agreement, and country/block.
   * Updates validators based on the selected radio value.
   */
  private createFormDatosBusqueda(): void {
    this.datosBusquedaFormulario = this.fb.group({
      numeroDeCertificado: [''],
      tratadoAcuerdo: [''],
      paisBloque: ['']
    });
    this.validadoresActualización();
  }

  /**
   * Updates form validators based on the selected value.
   * 
   * - For "Por número de certificado", sets `Validators.required` on `numeroDeCertificado`.
   * - For "Por Tratado/Acuerdo País/Bloque", sets `Validators.required` on `tratadoAcuerdo` and `paisBloque`.
   * - Clears validators if no condition matches.
   */
  private validadoresActualización(): void {
    this.datosBusquedaFormulario.get('numeroDeCertificado')?.setValidators(
      this.valorSeleccionado === 'Por número de certificado' ? Validators.required : null
    );

    this.datosBusquedaFormulario.get('tratadoAcuerdo')?.setValidators(
      this.valorSeleccionado === 'Por Tratado/Acuerdo País/Bloque' ? Validators.required : null
    );

    this.datosBusquedaFormulario.get('paisBloque')?.setValidators(
      this.valorSeleccionado === 'Por Tratado/Acuerdo País/Bloque' ? Validators.required : null
    );

    this.datosBusquedaFormulario.get('numeroDeCertificado')?.updateValueAndValidity();
    this.datosBusquedaFormulario.get('tratadoAcuerdo')?.updateValueAndValidity();
    this.datosBusquedaFormulario.get('paisBloque')?.updateValueAndValidity();
  }

  /** 
   * Método para realizar la búsqueda y mostrar la tabla de resultados.
   */
  public buscar(): void {
    this.verTabla = true; // Mostrar la tabla
  }

  /**
   * Restores form values from global state.
   * Subscribes to `selectSolicitud$` to fetch stored search data and updates the form.
   * Uses `distinctUntilChanged` to avoid redundant updates and `take(1)` to auto-unsubscribe.
   */
  private restaurarValoresFormulario(): void {
    this.restauraSubscription$ = this.tramite110203Query.selectSolicitud$
      .pipe(
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((datosBusqueda) => {
        if (datosBusqueda) {
          this.datosBusquedaFormulario.patchValue(datosBusqueda, { emitEvent: false });
        }
      });
  }

  /**
   * Navigates to the "selección de trámite" page.
   * Redirects to `/pago/seleccion-tramite` using Angular's Router.
   */
  navigateToSeleccionTramite(): void {
    this.router.navigate(['../tecnicosdatos'], { relativeTo: this.route });

  }

  /** 
   * Método de ciclo de vida de Angular que se ejecuta cuando el componente se destruye.  
   * Emite un valor en `unsubscribe$` para notificar a los observables que deben finalizar.  
   * Luego, marca `unsubscribe$` como completado para liberar memoria y evitar fugas de suscripción.  
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}