import { Component } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { CatalogosSelect, DatosPasos } from '../../../../core/models/shared/components.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-datos-del',
  templateUrl: './datos-del.component.html',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    SelectCatalogosComponent
  ],
  styleUrl: './datos-del.component.scss'
})
export class DatosDelComponent {
  form!: FormGroup;
  radioBoton: string[] = ['Oficina Estatal/OISA', 'OSIA (solo perros y gatos)', 'oficina central'];
  mercanciasData: any
  dummyJson: string = '/assets/json/5701/220401/mercancias.json'
  dropdownConfigs: CatalogosSelect[] = [
    { labelNombre: 'Delegaciones estatales SAGARPA', required: true, catalogos: [{ id: 1, descripcion: 'Option 1' }, { id: 2, descripcion: 'Option 2' }, { id: 3, descripcion: 'Option 3' }], primerOpcion: '' },
    { labelNombre: 'OSIA', required: true, catalogos: [{ id: 1, descripcion: 'Option 1' }, { id: 2, descripcion: 'Option 2' }, { id: 3, descripcion: 'Option 3' }], primerOpcion: '' },
    { labelNombre: 'oficina centra', required: true, catalogos: [{ id: 1, descripcion: 'Option 1' }, { id: 2, descripcion: 'Option 2' }, { id: 3, descripcion: 'Option 3' }], primerOpcion: '' },
    { labelNombre: 'Distrito desarrollo rural (DDR)', required: true, catalogos: [{ id: 1, descripcion: 'Option 1' }, { id: 2, descripcion: 'Option 2' }, { id: 3, descripcion: 'Option 3' }], primerOpcion: '' },
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.initForm();
    this.http.get(this.dummyJson).subscribe(res => {
      this.mercanciasData = res;
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      seleccion: ['', Validators.required]
    });
  }

  onSelectionChange(value: string) {
  }

  seleccionar() {

  }  
}
