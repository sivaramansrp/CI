/* eslint-disable @nx/enforce-module-boundaries */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import RadioOptionsData from 'libs/shared/theme/assets/json/130106/radioButton.json';
import { Solicitud130106State } from '../../../../estados/tramites/tramite130106.store';
import SolicitudeDropdown from 'libs/shared/theme/assets/json/130106/datos-de-la-solicitud.json';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite130106Query } from '../../../../estados/queries/tramite130106.query';
import { Tramite130106Store } from '../../../../estados/tramites/tramite130106.store';
@Component({
  selector: 'app-datos-de-la-solicitude',
  standalone: true,
  imports: [TituloComponent, ReactiveFormsModule, CatalogoSelectComponent, InputRadioComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss'
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {

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


  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder,
    private tramite130106Store: Tramite130106Store,
    private tramite130106Query: Tramite130106Query
    // eslint-disable-next-line no-empty-function
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarFormularioSolicitud();
  }


  /**
   * Inicializa el formulario de la solicitud con los valores del estado.
   * También se suscribe a los cambios en el estado de la solicitud.
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
      solicitud: [this.solicitudState.solicitud, Validators.required], // Campo de solicitud, requerido
      regimen: [this.solicitudState.regimen, Validators.required], // Campo de régimen, requerido
      clasificacion: [this.solicitudState.clasificacion, Validators.required], // Campo de clasificación, requerido
      solicitudDescripcion: [this.solicitudState.solicitudDescripcion, Validators.required], // Campo de descripción de la solicitud, requerido
      producto: [this.solicitudState.producto, Validators.required], // Campo de solicitud, requerido
    });
  }

  /**
   * Configuraciones para los menús desplegables.
   * Cada objeto en el array representa una configuración de catálogo.
   */
  configuracionesDropdown = [
    { catalogos: SolicitudeDropdown.tramite }, // Configuración para el catálogo de trámites
    { catalogos: SolicitudeDropdown.regimen }, // Configuración para el catálogo de regímenes
    { catalogos: SolicitudeDropdown.arancelaria }, // Configuración para el catálogo de aranceles
    { catalogos: SolicitudeDropdown.umt } // Configuración para el catálogo de UMT
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

}
