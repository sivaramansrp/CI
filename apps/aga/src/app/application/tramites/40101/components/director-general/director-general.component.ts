import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import mockData from 'libs/shared/theme/assets/json/40101/director-general-mockdata.json';
import { Chofer40101Query } from '../../estados/chofer40101.query';
import { Chofer40101Store } from '../../estados/chofer40101.store';
@Component({
  selector: 'app-director-general',
  templateUrl: './director-general.component.html',
  styleUrls: ['./director-general.component.scss'],
})
export class DirectorGeneralComponent implements OnInit {
  directorGeneralForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private chofer40101Query: Chofer40101Query,
    private chofer40101Store: Chofer40101Store
  ) {}
  /**
   * Crea el formulario para el director general.
   */

  /**
   * Método del ciclo de vida de Angular que se llama después de que las propiedades enlazadas a datos se inicializan.
   */
  ngOnInit(): void {
    this.crearFormularioDirectorGeneral();
    this.setFormValues();

    // Listen to form changes and update the store
    this.directorGeneralForm.valueChanges.subscribe((formData) => {
      this.updateStore(formData);
    });
    this.updateStore(this.directorGeneralForm.value);
  }
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
  updateStore(updatedData: any): void {
    const existingData = this.chofer40101Query.getValue().choferes;
  }
}
