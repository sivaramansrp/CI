import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { ComposicionMaterial } from '../../models/materiales-peligrosos.model';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { Tramite230501Store } from '../../estados/stores/tramite230501Store.store';

@Component({
  selector: 'app-composicion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './composicion.component.html',
  styleUrl: './composicion.component.scss',
})
export class ComposicionComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo utilizado para gestionar los datos de composición.
   * Este formulario contiene los controles necesarios para capturar y validar
   * la información relacionada con la composición en el componente.
   */
  public composicionForm!: FormGroup;
  /**
   * Notificador utilizado para cancelar la suscripción a observables cuando el componente se destruye.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
* Indica si el formulario está en modo solo lectura.
* Cuando es `true`, los campos del formulario no se pueden editar.
*/
  esFormularioSoloLectura: boolean = false;
  /**
   * Constructor de la clase ComposicionComponent.
   * 
   * @param fb - Inyección del servicio FormBuilder para la creación y gestión de formularios reactivos.
   * @param ubicaccion - Inyección del servicio Location para manejar la navegación y ubicación del usuario.
   * @param tramite230501Store - Inyección del servicio Tramite230501Store para gestionar el estado relacionado con el trámite 230501.
   * 
   * Inicializa el formulario `composicionForm` con los campos:
   * - `componenteMaterial`: Campo obligatorio para especificar el material del componente.
   * - `porcentajeConcentracion`: Campo obligatorio para especificar el porcentaje de concentración, 
   *   con un valor mínimo de 0 y un máximo de 100.
   */
  constructor(private fb: FormBuilder, private ubicaccion: Location, private tramite230501Store: Tramite230501Store, private consultaQuery: ConsultaioQuery) {
  }
  createComposicionForm(): void {
    this.composicionForm = this.fb.group({
      componenteMaterial: ['', Validators.required],
      porcentajeConcentracion: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  ngOnInit(): void {
    this.createComposicionForm();
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }
       /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
     inicializarEstadoFormulario(): void {
      if(!this.composicionForm){
        this.createComposicionForm();
      }
      if (this.esFormularioSoloLectura) {
          this.composicionForm.disable();
      } else {
        this.composicionForm.enable();
      }
    }

  /**
   * Agrega un nuevo elemento a la tabla de composición si el formulario es válido.
   * 
   * Este método verifica la validez del formulario `composicionForm` y, si es válido, 
   * crea un nuevo objeto `ComposicionMaterial` con los valores del formulario. Luego, 
   * actualiza el estado de la tienda `tramite230501Store` añadiendo el nuevo objeto a 
   * la lista `composicionTablaDatos`. Finalmente, reinicia el formulario y navega hacia atrás.
   * 
   * @returns {void} No retorna ningún valor.
   */
  agregar(): void {
    if (this.composicionForm.valid) {
      const IDX: ComposicionMaterial = {
        componente: this.composicionForm.get('componenteMaterial')?.value,
        porcentajeConcentracion: this.composicionForm.get('porcentajeConcentracion')?.value,
      }
      this.setFormValida(this.composicionForm.valid);
      this.tramite230501Store.update((state) => ({
        ...state,
        composicionTablaDatos: [...state.composicionTablaDatos, IDX],
      }));
      this.composicionForm.reset();
      this.ubicaccion.back();
    }
  }

  /**
* Establece el estado de validación del formulario de destinatario.
* 
* @param valida - Un valor booleano que indica si el formulario de datos del destinatario es válido.
*/
  setFormValida(valida: boolean): void {
    this.tramite230501Store.setFormValida({ composicionForm: valida });
  }


  /**
   * Cancela la operación actual, restableciendo el formulario de composición
   * y navegando de regreso a la ubicación anterior.
   *
   * @returns {void} No devuelve ningún valor.
   */
  cancelar(): void {
    this.composicionForm.reset();
    this.ubicaccion.back();
  }

  /**
   * Restablece el formulario de composición a su estado inicial.
   * Este método reinicia todos los campos del formulario, eliminando
   * cualquier valor ingresado previamente por el usuario.
   */
  limpiarComposicion(): void {
    this.composicionForm.reset();
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
