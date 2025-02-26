import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent } from '@ng-mf/data-access-user'; 
import regimenValues from 'libs/shared/theme/assets/json/220201/regimen.json';
import tratdosValues from 'libs/shared/theme/assets/json/110101/tratdos-dropdown.json';
import nombreValues from 'libs/shared/theme/assets/json/220202/nombre.json';
import subproductoValues from 'libs/shared/theme/assets/json/220202/nombre.json';

@Component({
  selector: 'app-seleccion-del-cupo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent],
  templateUrl: './seleccion-del-cupo.component.html',
  styleUrls: ['./seleccion-del-cupo.component.scss'],
})
export class SeleccionDelCupoComponent implements OnInit {
  seleccionForm!: FormGroup;

  regimen: Catalogo[] = regimenValues.data;
  tratado: Catalogo[] = tratdosValues.tratado;
  producto: Catalogo[] = nombreValues.data;
  subproducto: Catalogo[] = subproductoValues.data;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.seleccionForm = this.fb.group({
      regimen: ['', Validators.required],
      tratado: ['', Validators.required],
      producto: ['', Validators.required],
      subproducto: ['', Validators.required]
    });
  }

  public regimenOnChange(event: Event): void {
    // Handle regimen change
  }

  public tratadoOnChange(event: Event): void {
    // Handle tratado change
  }

  public productoOnChange(event: Event): void {
    // Handle producto change
  }

  public subproductoOnChange(event: Event): void {
    // Handle subproducto change
  }
}