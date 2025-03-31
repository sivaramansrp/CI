import { CatalogoSelectComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import dropDown from 'libs/shared/theme/assets/json/104/drop-down.json'

@Component({
  selector: 'app-datos-del-inmueble',
  standalone: true,
  imports: [CommonModule,TituloComponent,
    TableComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule],
  templateUrl: './datos-del-inmueble.component.html',
  styleUrl: './datos-del-inmueble.component.css',
})
export class DatosDelInmuebleComponent {

  fomentoExportacionForm!:FormGroup;

  constructor(private fb: FormBuilder) {
    this.inicializarFormularioTratados();
  }



  inicializarFormularioTratados(): void {
    this.fomentoExportacionForm = this.fb.group({
      tipoPrograma: ['', Validators.required],
      folioAutorizacion: ['', Validators.required],
    });
  }

  configuracionesDropdown = [
    { catalogos: dropDown.tipoPrograma },
    { catalogos: dropDown.folioAutorizacion },
  ];
}
