import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import mockData from 'libs/shared/theme/assets/json/40101/director-general-mockdata.json';
@Component({
  selector: 'app-director-general',
  templateUrl: './director-general.component.html',
  styleUrls: ['./director-general.component.scss'],
})
export class DirectorGeneralComponent implements OnInit {
  directorGeneralForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
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
   * Método del ciclo de vida de Angular que se llama después de que las propiedades enlazadas a datos se inicializan.
   */
  ngOnInit(): void {
    this.crearFormularioDirectorGeneral();
    this.setFormValues();
  }
  /**
   * Establece los valores del formulario utilizando datos simulados.
   */
  setFormValues(): void {
    console.log('Mock Data:', mockData);
    if (mockData) {
      setTimeout(() => {
        this.directorGeneralForm.patchValue({
          nombre: mockData.nombre || '',
          primerApellido: mockData.primerApellido || '',
          segundoApellido: mockData.segundoApellido || '',
        });
        console.log('Updated Form Value:', this.directorGeneralForm.value);
      });
    }
  }
}
