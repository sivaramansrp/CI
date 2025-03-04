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

  ngOnInit(): void {
    this.crearFormularioDirectorGeneral();
    this.setFormValues();
  }

  crearFormularioDirectorGeneral(): void {
    this.directorGeneralForm = this.fb.group({
      nombre: ['', [Validators.required]],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', [Validators.required]],
    });
  }

  setFormValues(): void {
    console.log('Mock Data:', mockData); // Debugging step
    if (mockData) {
      setTimeout(() => { // Ensures Angular Change Detection runs
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
