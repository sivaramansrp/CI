import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import mockData from 'libs/shared/theme/assets/json/40102/director-general-mockdata.json';
import { Chofer40102Query } from '../../estados/tramite40102.query';
import { Chofer40102Store } from '../../estados/tramite40102.store';
@Component({
  selector: 'app-director-general',
  templateUrl: './director-general.component.html',
  styleUrls: ['./director-general.component.scss'],
})
export class DirectorGeneralComponent implements OnInit {
  directorGeneralForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private chofer40102Query: Chofer40102Query,
    private chofer40102Store: Chofer40102Store
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

    // Escuche los cambios de formulario y actualice la tienda.
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
    const existingData = this.chofer40102Query.getValue().choferes;
  }
}
