import { Catalogo, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolicitudDeRegistroTpl120101State, Tramite120101Store } from '../../../../estados/tramites/tramite120101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { RADIO_INDICAR } from '../../constantes/solicitud-de-registro-tpl.enum';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { SolicitudDeRegistroTplService } from '../../services/solicitud-de-registro-tpl.service';
import { Tramite120101Query } from '../../../../estados/queries/tramite120101.query';

/**
 * @component ProcesoProductivoComponent
 * @description
 * Componente que gestiona el formulario del proceso productivo en el trámite 120101.
 * 
 * Funcionalidad:
 * - Renderiza un formulario reactivo con controles dinámicos basados en las selecciones del usuario.
 * - Maneja la lógica de validación y actualización de los datos del formulario.
 * - Interactúa con servicios para obtener datos de catálogos y gestionar formularios.
 * 
 * @selector app-proceso-productivo
 * @templateUrl ./proceso-productivo.component.html
 * @styleUrl ./proceso-productivo.component.scss
 */@Component({
  selector: 'app-proceso-productivo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, InputRadioComponent],
  templateUrl: './proceso-productivo.component.html',
  styleUrl: './proceso-productivo.component.scss',
})

export class ProcesoProductivoComponent implements OnInit , OnDestroy{

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;

  /**
 * @property procesoProductivoForm
 * @description
 * Representa el formulario reactivo utilizado en el componente `ProcesoProductivoComponent`.
 * @type {FormGroup}
 */
  public procesoProductivoForm!: FormGroup; 

  /**
 * @property destroy$
 * @description
 * Sujeto utilizado para gestionar la destrucción de suscripciones en el componente `ProcesoProductivoComponent`.
 * @type {Subject<void>}
 */
  public destroy$ = new Subject<void>();

  /**
 * @property paisDeOrigen
 * @description
 * Almacena los datos del catálogo de países de origen utilizados en el formulario `procesoProductivoForm`.
 * @type {Catalogo[]}
 */
  public paisDeOrigen: Catalogo[] = [];
  /**
 * @property opcionesDeRadioIndicar
 * @description
 * Contiene las opciones de selección para el control de tipo radio en el formulario `procesoProductivoForm`.
 * @type {Array<any>}
 */
  public opcionesDeRadioIndicar = RADIO_INDICAR;

  /**
     * Estado de la solicitud de la sección 120101.
     * @type {SolicitudDeRegistroTpl120101State}
     * @memberof BienFinalComponent
     */
    public solicitudDeRegistroState!: SolicitudDeRegistroTpl120101State;

  /**
 * @constructor
 * @description
 * Constructor del componente `ProcesoProductivoComponent`. Inicializa las dependencias necesarias para el funcionamiento del componente.
 * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
 * @param {SolicitudDeRegistroTplService} solicitudDeRegistroTplService - Servicio para obtener datos del proceso productivo.
 * @param {ServicioDeFormularioService} servicioDeFormularioService - Servicio para gestionar formularios dinámicos.
 */
  constructor(
    private fb: FormBuilder,
    private solicitudDeRegistroTplService: SolicitudDeRegistroTplService,
    private servicioDeFormularioService: ServicioDeFormularioService,
    private tramite120101Store: Tramite120101Store,
    private tramite120101Query: Tramite120101Query,
  ) {
    // Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  /**
 * @method ngOnInit
 * @description
 * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente `ProcesoProductivoComponent`.
 * 
 * Funcionalidad:
 * - Inicializa el formulario `procesoProductivoForm` con un control llamado `indicar` y un valor predeterminado.
 * - Llama al método `obtenerDatosEstados` para cargar los datos necesarios para los catálogos.
 * - Configura los controles dinámicos del formulario según la selección inicial llamando a `sobreElCambioDeSeleccion`.
 * - Registra el formulario `procesoProductivoForm` en el servicio `ServicioDeFormularioService` para su gestión centralizada.
 * 
 * @example
 * // Este método se ejecuta automáticamente al cargar el componente.
 */
  ngOnInit(): void {
    this.tramite120101Query.selectSolicitudDeRegistroTpl$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudDeRegistroState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.servicioDeFormularioService.registerForm(
      'procesoProductivoForm',
      this.procesoProductivoForm
    );
  }

  /**
   * @method inicializarFormulario
   * @description
   * Inicializa el formulario reactivo `procesoProductivoForm` con los valores predeterminados y configura los controles dinámicos según el estado actual.
   * 
   * Funcionalidad:
   * - Crea el formulario con un control llamado `indicar` y un valor predeterminado basado en el estado de la solicitud.
   * - Llama al método `obtenerDatosEstados` para cargar los datos necesarios para los catálogos.
   * - Configura los controles dinámicos del formulario llamando a `sobreElCambioDeSeleccion` según el valor del campo `indicar`.
   * 
   * @example
   * this.inicializarFormulario();
   * // Inicializa el formulario y configura los controles dinámicos.
   */
  public inicializarFormulario(): void {
    this.procesoProductivoForm = this.fb.group({
      indicar: [this.solicitudDeRegistroState?.['indicar'] ? this.solicitudDeRegistroState?.['indicar'] : this.opcionesDeRadioIndicar[0]?.value, Validators.required],
    });
    this.obtenerDatosEstados();
    if (this.solicitudDeRegistroState?.['indicar']) {
      this.sobreElCambioDeSeleccion(this.solicitudDeRegistroState?.['indicar'] as string | number, 'indicar')
    } else {
      this.sobreElCambioDeSeleccion('1', 'indicar')
    }
  }

  /**
   * @method obtenerDatosEstados
   * @description
   * Método que obtiene los datos necesarios para los catálogos relacionados con los estados.
   * 
   * Funcionalidad:
   * - Llama al servicio `SolicitudDeRegistroTplService` para obtener los datos de los estados.
   * - Utiliza `takeUntil` para gestionar la suscripción y evitar fugas de memoria.
   * - Asigna la respuesta al arreglo `paisDeOrigen` para su uso en el formulario.
   * 
   * @example
   * this.obtenerDatosEstados();
   * // Los datos de los estados se cargan en `paisDeOrigen`.
   */
  obtenerDatosEstados(): void {
    this.solicitudDeRegistroTplService
      .obtenerDatosEstados()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => { 
        this.paisDeOrigen = resp;
      });
  }

  /**
   * @method sobreElCambioDeSeleccion
   * @description
   * Maneja los cambios en la selección de opciones dentro del formulario `procesoProductivoForm`.
   * 
   * Funcionalidad:
   * - Elimina los controles dinámicos existentes en el formulario.
   * - Agrega nuevos controles dinámicos al formulario según el valor seleccionado (`event`).
   * - Actualiza el valor del formulario utilizando el método `establecerValorDeFormulario`.
   * 
   * @param {string | number} event - El valor seleccionado que determina los controles dinámicos a agregar.
   * @param {string} campo - El nombre del campo que se actualiza en el formulario.
   * 
   * @example
   * this.sobreElCambioDeSeleccion('1', 'indicar');
   * // Agrega los controles correspondientes a la opción "1".
   */
  public sobreElCambioDeSeleccion(event: string | number, campo: string): void {
    this.eliminarControlesDinamicos();
    if (event==="1") {
      this.procesoProductivoForm.addControl('paisDeOrigenDeLaFibra', this.fb.control(this.solicitudDeRegistroState?.['paisDeOrigenDeLaFibra'] ? this.solicitudDeRegistroState?.['paisDeOrigenDeLaFibra'] : '', Validators.required));
      this.procesoProductivoForm.addControl('paisEnQueSeRealizoElHilado', this.fb.control(this.solicitudDeRegistroState?.['paisDeOrigenDeLaFibra'] ? this.solicitudDeRegistroState?.['paisDeOrigenDeLaFibra'] : '', Validators.required));
    } else if (event==="2") {
      this.procesoProductivoForm.addControl('paisEnQueSeRealizoElHilado', this.fb.control(this.solicitudDeRegistroState?.['paisEnQueSeRealizoElHilado'] ? this.solicitudDeRegistroState?.['paisEnQueSeRealizoElHilado'] : '', Validators.required));
      this.procesoProductivoForm.addControl('paisEnQueSeRealizoElTejido', this.fb.control(this.solicitudDeRegistroState?.['paisEnQueSeRealizoElTejido'] ? this.solicitudDeRegistroState?.['paisEnQueSeRealizoElTejido'] : '', Validators.required));
    } else if (event==="3") {
      this.procesoProductivoForm.addControl('paisEnQueSeRealizoElHilado', this.fb.control(this.solicitudDeRegistroState?.['paisEnQueSeRealizoElHilado'] ? this.solicitudDeRegistroState?.['paisEnQueSeRealizoElHilado'] : '', Validators.required));
      this.procesoProductivoForm.addControl('paisEnQueSeRealizoElTejidoAForma', this.fb.control(this.solicitudDeRegistroState?.['paisEnQueSeRealizoElTejidoAForma'] ? this.solicitudDeRegistroState?.['paisEnQueSeRealizoElTejidoAForma'] : '', Validators.required));
    } else if (event==="4"){
      this.procesoProductivoForm.addControl('paisEnQueSeRealizoElHilado', this.fb.control(this.solicitudDeRegistroState?.['paisEnQueSeRealizoElHilado'] ? this.solicitudDeRegistroState?.['paisEnQueSeRealizoElHilado'] : '', Validators.required));
      this.procesoProductivoForm.addControl('paisEnQueSeRealizoElTejido', this.fb.control(this.solicitudDeRegistroState?.['paisEnQueSeRealizoElTejido'] ? this.solicitudDeRegistroState?.['paisEnQueSeRealizoElTejido'] : '', Validators.required))
      this.procesoProductivoForm.addControl('paisEnQueSeRealizoElCorte', this.fb.control(this.solicitudDeRegistroState?.['paisEnQueSeRealizoElCorte'] ? this.solicitudDeRegistroState?.['paisEnQueSeRealizoElCorte'] : '', Validators.required));
      this.procesoProductivoForm.addControl('paisEnQueSeRealizoElEnsamble', this.fb.control(this.solicitudDeRegistroState?.['paisEnQueSeRealizoElEnsamble'] ? this.solicitudDeRegistroState?.['paisEnQueSeRealizoElEnsamble'] : '', Validators.required))
    }
    this.tramite120101Store.setDynamicFieldValue(campo, event);
    this.establecerValorDeFormulario(campo, event);
  }

  /**
   * @method eliminarControlesDinamicos
   * @description
   * Elimina los controles dinámicos existentes en el formulario `procesoProductivoForm`.
   * 
   * Funcionalidad:
   * - Recorre una lista de nombres de controles dinámicos.
   * - Verifica si cada control está presente en el formulario.
   * - Si el control existe, lo elimina del formulario y lo desregistra del servicio `ServicioDeFormularioService`.
   * 
   * @example
   * this.eliminarControlesDinamicos();
   * // Elimina todos los controles dinámicos del formulario.
   */
  public eliminarControlesDinamicos(): void {
    ['paisDeOrigenDeLaFibra', 'paisEnQueSeRealizoElHilado', 'paisEnQueSeRealizoElTejido', 'paisEnQueSeRealizoElTejidoAForma', 'paisEnQueSeRealizoElCorte', 'paisEnQueSeRealizoElEnsamble'].forEach(controlName => {
      if (this.procesoProductivoForm.contains(controlName)) {
        this.procesoProductivoForm.removeControl(controlName);
        this.servicioDeFormularioService.removeControl('procesoProductivoForm', controlName);
      }
    });
  }
  /**
   * @method establecerValorDeFormulario
   * @description
   * Establece un valor específico en el formulario `procesoProductivoForm`.
   * 
   * Funcionalidad:
   * - Utiliza el servicio `ServicioDeFormularioService` para actualizar el valor de un campo en el formulario.
   * - Convierte el valor a una cadena si es de tipo `number` antes de establecerlo.
   * 
   * @param {string} campo - El nombre del campo en el formulario que se actualizará.
   * @param {string | number | object} valor - El valor que se asignará al campo.
   * 
   * @example
   * this.establecerValorDeFormulario('indicar', '1');
   * // Establece el valor "1" en el campo "indicar" del formulario.
   */
  public establecerValorDeFormulario(campo: string, valor: string | number | object): void {
    this.servicioDeFormularioService.setFormValue('procesoProductivoForm', {
      [campo]: typeof valor === 'number' ? valor.toString() : valor,
    });
  }

  /**
   * @method eventoDeCambioDeValor
   * @description
   * Maneja el evento de cambio de valor en un campo del formulario `procesoProductivoForm`.
   * 
   * Funcionalidad:
   * - Captura el valor del campo que ha cambiado.
   * - Utiliza el método `establecerValorDeFormulario` para actualizar el valor del campo en el formulario.
   * 
   * @param {Event} event - El evento de cambio que contiene el nuevo valor del campo.
   * @param {string} campo - El nombre del campo que se actualizará en el formulario.
   * 
   * @example
   * <input (change)="eventoDeCambioDeValor($event, 'indicar')" />
   * // Actualiza el valor del campo "indicar" en el formulario.
   */
  public eventoDeCambioDeValor(event: Event, campo: string): void {
    const TARGET = event?.target as HTMLInputElement;
    if (TARGET?.value !== undefined) {
      const VALOR = TARGET.value;
      this.tramite120101Store.setDynamicFieldValue(campo, VALOR);
      this.establecerValorDeFormulario(campo, VALOR);
    }
  }
  
    
  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente `ProcesoProductivoComponent` se destruye.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
