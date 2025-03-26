import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import mockData from 'libs/shared/theme/assets/json/40102/director-general-mockdata.json';
import { Tramite40102Query } from '../../estados/tramite40102.query';
import { Tramite40102Store } from '../../estados/tramite40102.store';
import { ReplaySubject, takeUntil } from 'rxjs';

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
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Constructor del componente.
   * @param fb - Inyección del servicio FormBuilder.
   * @param tramite40102Query - Inyección del servicio Tramite40102Query.
   * @param tramite40102Store - Inyección del servicio Tramite40102Store.
   */
  constructor(
    private fb: FormBuilder,
    private tramite40102Query: Tramite40102Query,
    private tramite40102Store: Tramite40102Store
  ) {}

  /**
   * Método del ciclo de vida de Angular que se llama después de que las propiedades enlazadas a datos se inicializan.
   */
  ngOnInit(): void {
    this.crearFormularioDirectorGeneral();
    this.setFormValues();

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
      nombre: ['', [Validators.required]],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', [Validators.required]],
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
    const existingData = this.tramite40102Query.getValue().choferes;
    // Aquí se puede agregar la lógica para actualizar la tienda con los datos actualizados.
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
