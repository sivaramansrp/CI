import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplaySubject, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Tramite40101Query } from '../../estado/tramite40101.query';
import { Tramite40101Store } from '../../estado/tramite40101.store';
import mockData from '@libs/shared/theme/assets/json/40101/director-general-mockdata.json';
import { takeUntil } from 'rxjs';

/**
 * Componente para gestionar el formulario del director general.
 */
@Component({
  selector: 'app-director-general',
  templateUrl: './director-general.component.html',
  styleUrls: ['./director-general.component.scss'],
})
export class DirectorGeneralComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para el director general.
   */
  directorGeneralForm!: FormGroup;

  /**
   * Emite un valor cuando el componente es destruido para ayudar a cancelar la suscripción de los observables y prevenir fugas de memoria.
   * Normalmente se usa con el operador `takeUntil` de RxJS en componentes de Angular.
   * @private
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false;
  consultaState!: ConsultaioState;

  /**
   * Constructor del componente.
   * @param fb - Inyección del servicio FormBuilder.
   * @param tramite40101Query - Inyección del servicio Tramite40101Query.
   * @param tramite40101Store - Inyección del servicio Tramite40101Store.
   */
  constructor(
    private fb: FormBuilder,
    private tramite40101Query: Tramite40101Query,
    private tramite40101Store: Tramite40101Store,
    private consultaioQuery: ConsultaioQuery
  ) {

  }

  /**
   * Método del ciclo de vida de Angular que se llama después de que las propiedades enlazadas a datos se inicializan.
   */
  ngOnInit(): void {
    this.crearFormularioDirectorGeneral();

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
      map((seccionState) => {
        this.esFormularioSoloLectura = seccionState.readonly;
        this.consultaState = seccionState;
        if(seccionState.update) {
          this.setFormValues();
        }
      })
    )
    .subscribe();

    // Escuche los cambios de formulario y actualice la tienda.
    this.directorGeneralForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((formData) => {
        this.updateStore(formData);
      });
    this.updateStore(this.directorGeneralForm.value);
  }

  /**
   * Crea el formulario para el director general.
   */
  crearFormularioDirectorGeneral(): void {
    this.directorGeneralForm = this.fb.group({
      nombre: [this.tramite40101Store.getValue().nombre || '', [Validators.required]],
      primerApellido: [this.tramite40101Store.getValue().primerApellido || '', [Validators.required]],
      segundoApellido: [this.tramite40101Store.getValue().segundoApellido || '', [Validators.required]],
    });
  }

  /**
   * Establece los valores del formulario utilizando datos simulados.
   */
  setFormValues(): void {
    if (mockData) {
      setTimeout(() => {
        this.directorGeneralForm.patchValue({
          nombre: mockData.nombre || '',
          primerApellido: mockData.primerApellido || '',
          segundoApellido: mockData.segundoApellido || '',
        });
      });
    }
  }

  /**
   * Actualiza la tienda con los datos del formulario.
   * @param updatedData - Los datos actualizados del formulario.
   */
  updateStore(updatedData: any): void {
    this.tramite40101Store.setNombre(updatedData.nombre);
    this.tramite40101Store.setPrimerApellido(updatedData.primerApellido);
    this.tramite40101Store.setSegundoApellido(updatedData.segundoApellido)
    // Aquí se puede agregar la lógica para actualizar la tienda con los datos actualizados.
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
