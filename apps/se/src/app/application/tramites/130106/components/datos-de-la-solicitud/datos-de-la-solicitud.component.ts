/* Importación de componentes, servicios, formularios y datos necesarios para el manejo del trámite 130106 */
/* Incluye componentes UI, validaciones, operadores RxJS, estados y datos JSON relacionados */
import {CatalogoSelectComponent,InputRadioComponent,TituloComponent} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import RadioOptionsData from '@libs/shared/theme/assets/json/130106/radioButton.json';
import { Solicitud130106State } from '../../../../estados/tramites/tramite130106.store';
import SolicitudeDropdown from '@libs/shared/theme/assets/json/130106/datos-de-la-solicitud.json';
import { Tramite130106Query } from '../../../../estados/queries/tramite130106.query';
import { Tramite130106Store } from '../../../../estados/tramites/tramite130106.store';
/**
 * Componente Angular que representa la sección "Datos de la solicitud" del trámite 130106.
 * 
 * Este componente es autónomo (standalone) y se encarga de:
 * - Mostrar y gestionar un formulario reactivo con validaciones.
 * - Sincronizar datos con el estado global usando un store (Tramite130106Store).
 * - Deshabilitar o habilitar campos según el modo de solo lectura.
 * - Mostrar selectores de catálogo y botones de opción personalizados.
 * 
 * El formulario incluye los campos: solicitud, régimen, clasificación del régimen, producto y descripción.
 * Además, utiliza componentes personalizados como `CatalogoSelectComponent` e `InputRadioComponent`.
 */
@Component({
  selector: 'app-datos-de-la-solicitude',
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, InputRadioComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
/* Componente que gestiona los datos de la solicitud 130106 mediante formularios reactivos.  
   Soporta modo solo lectura y sincronización con el estado global a través de Store y Query. */
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

/** Indica si el formulario debe mostrarse en modo solo lectura.  
 *  Controla la habilitación o deshabilitación de los campos. */
 esFormularioSoloLectura: boolean = false;
  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea del tipo 'FormGroup'.
   *
   * @property {FormGroup} formulario - El formulario del componente.
   */
  public formulario!: FormGroup;

  /**
    * Subject para manejar la destrucción de observables y evitar fugas de memoria.
    */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud 130106.
   */
  public solicitudState!: Solicitud130106State;


  /**
   * Opciones para los botones de radio.
   */
  radioOptions = RadioOptionsData;
  /**
   * Constructor del componente. Inicializa las dependencias necesarias y prepara el formulario reactivo.
   * 
   * @param fb - FormBuilder utilizado para crear el formulario reactivo.
   * @param Tramite130106Store - Store que gestiona los valores persistentes del trámite 130106.
   * @param Tramite130106Query - Query que se utiliza para obtener el estado actual de la solicitud 130106.
   */  
  constructor(private fb: FormBuilder,
    private tramite130106Store: Tramite130106Store,
    private tramite130106Query: Tramite130106Query,
     private consultaioQuery: ConsultaioQuery,
     
  ) {
     this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
           this.inicializarCombinacionFormulario();
        })
      )
      .subscribe()
   }
  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarCombinacionFormulario();
  }
  /**
   * @comdoc
   * Guarda los datos del formulario de combinación requerida.
   * 
   * Inicializa el formulario y ajusta su estado de habilitación según si es de solo lectura.
   * - Si el formulario es de solo lectura, lo deshabilita.
   * - Si no es de solo lectura, lo habilita.
   * - Si no aplica ninguna de las condiciones anteriores, no realiza ninguna acción adicional.
   */
  guardarDatosFormulario(): void {
    /* Inicializa el formulario reactivo de solicitud */
/* Configura controles y validaciones necesarias */
      this.inicializarFormularioSolicitud();
     if (this.esFormularioSoloLectura) {
  this.formulario.disable();
} else {
  this.formulario.enable();
}
  }

  /**
   * Inicializa el formulario de la solicitud con los valores del estado.
   * También se suscribe a los cambios en el estado de la solicitud.
   */
    inicializarCombinacionFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     this.inicializarFormularioSolicitud()
    }  
  }
/**
 * Inicializa el formulario de solicitud.
 * Este método configura los valores predeterminados, validadores 
 * y estructura del formulario utilizado para capturar los datos de la solicitud.
 */
  inicializarFormularioSolicitud(): void {
    // Se suscribe a los cambios en el estado de la solicitud
    this.tramite130106Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$), // Se asegura de limpiar los observables al destruir el componente
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud130106State; // Asigna el estado de la solicitud
        })
      )
      .subscribe(); // Realiza la suscripción para actualizar el estado

    // Inicializa el formulario con los valores del estado de la solicitud
    this.formulario = this.fb.group({
      solicitud: [this.solicitudState.solicitud || 'inicial', Validators.required], // Campo de solicitud, requerido
      regimen: [this.solicitudState.regimen, Validators.required], // Campo de régimen, requerido
      clasificacion: [this.solicitudState.clasificacion, Validators.required], // Campo de clasificación, requerido
      solicitudDescripcion: [this.solicitudState.solicitudDescripcion, Validators.required], // Campo de descripción de la solicitud, requerido
      producto: [this.solicitudState.producto || 'Nuevo', Validators.required], // Campo de solicitud, requerido
    });
  }
 /* Configuraciones de catálogos utilizados en los selectores del formulario.  
   Cada entrada representa un conjunto de opciones cargado desde un archivo JSON. */ 
  configuracionesDropdown = [
    { catalogos: SolicitudeDropdown?.tramite}, // Configuración para el catálogo de trámites
    { catalogos: SolicitudeDropdown?.regimen}, // Configuración para el catálogo de regímenes
    { catalogos: SolicitudeDropdown?.arancelaria }, // Configuración para el catálogo de aranceles
    { catalogos: SolicitudeDropdown?.umt} // Configuración para el catálogo de UMT
  ];
  /**
   * Establece los valores en el store a partir del formulario.
   *
   * @param {FormGroup} form - El formulario del cual se obtendrán los valores.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite130106Store} metodoNombre - El nombre del método en el store que se llamará.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130106Store): void {
    const VALOR = form.get(campo)?.value; // Obtiene el valor del campo en el formulario
    (this.tramite130106Store[metodoNombre] as (value: unknown) => void)(VALOR); // Llama al método correspondiente en el store
  }

  /**
 * Se ejecuta cuando el componente es destruido. Limpia recursos y observables.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica que el componente ha sido destruido
    this.destroyNotifier$.complete(); // Completa el observable
  }

  /**
   * Maneja el cambio en el dropdown padre (régimen).
   * Limpia el valor del dropdown hijo (clasificación) cuando cambia el régimen.
   */
  onRegimenChange(): void {
   this.formulario.get('clasificacion')?.setValue(null);
  this.setValoresStore(this.formulario, 'regimen', 'setRegimen');
  this.tramite130106Store.setClasificacion('');
  }

  /**
   * Maneja el cambio en el dropdown hijo (clasificación).
   */
  onClasificacionChange(): void {
    this.setValoresStore(this.formulario, 'clasificacion', 'setClasificacion');
  }

}
