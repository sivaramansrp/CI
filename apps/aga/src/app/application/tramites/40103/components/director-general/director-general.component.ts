/* eslint-disable no-empty-function */
import { Component,OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chofer40103Query } from '../../estados/chofer40103.query';
import { Chofer40103Store } from '../../estados/chofer40103.store';
import { Subject } from 'rxjs';
import mockData from '@libs/shared/theme/assets/json/40103/director-general-mockdata.json';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-director-general',
  templateUrl: './director-general.component.html',
  styleUrls: ['./director-general.component.scss'],
})
export class DirectorGeneralComponent implements OnInit, OnDestroy {
  directorGeneralForm!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private chofer40103Query: Chofer40103Query, private chofer40103Store: Chofer40103Store) {}

  /**
   * Método del ciclo de vida de Angular que se llama después de que las propiedades enlazadas a datos se inicializan.
   * Inicializa el formulario del director general y establece los valores del formulario.
   */
  ngOnInit(): void {
    this.crearFormularioDirectorGeneral();
    this.setFormValues();

    // Escucha los cambios del formulario y actualiza la tienda
    this.directorGeneralForm.valueChanges
      .pipe(takeUntil(this.destroy$))
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
   * Actualiza la tienda con los datos del formulario actualizados.
   * @param updatedData Los datos actualizados del formulario.
   */
  updateStore(updatedData: unknown): void {
    const EXISTINGDATA = this.chofer40103Query.getValue().choferes;
    // Aquí puedes agregar la lógica para actualizar la tienda con los datos actualizados
  }
    /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Libera la suscripción a los cambios del formulario.
   */
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}