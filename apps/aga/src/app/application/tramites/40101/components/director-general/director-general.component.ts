import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import mockData from '../../../../../assets/json/40101/director-general-mockdata.json';

@Component({
  selector: 'app-director-general',
  templateUrl: './director-general.component.html',
  styleUrl: './director-general.component.scss',
})
export class DirectorGeneralComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.crearFormularioDirectorGeneral();
    this.setFormValues();
  }

  directorGeneralForm!: FormGroup;

  crearFormularioDirectorGeneral(): void {
    this.directorGeneralForm = this.fb.group({
      nombre: ['', [Validators.required]],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.crearFormularioDirectorGeneral();

    this.setFormValues();
  }

  setFormValues(): void {
    this.directorGeneralForm.get('nombre')?.setValue(mockData.nombre);
    this.directorGeneralForm
      .get('primerApellido')
      ?.setValue(mockData.primerApellido);
    this.directorGeneralForm
      .get('segundoApellido')
      ?.setValue(mockData.segundoApellido);
  }
}
