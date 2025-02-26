import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import entidadValues from 'libs/shared/theme/assets/json/130102/entidad_federativa.json';
import representacionValues from 'libs/shared/theme/assets/json/130102/representacion_federal.json';

@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, TituloComponent],
  templateUrl: './representacion-federal.component.html',
  styleUrls: ['./representacion-federal.component.scss']
})
export class RepresentacionFederalComponent implements OnInit {
  representacionForm!: FormGroup;
  entidad: Catalogo[] = entidadValues;
  representacion: Catalogo[] = representacionValues;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.representacionForm = this.fb.group({
      entidad: [''],
      representacion: [''],
    });
  }

  public entidadoOnChange(_e: Event): void {
    // this is a dynamic function once we get the api will implement it
  }

  public representacionOnChange(_e: Event): void {
    // this is a dynamic function once we get the api will implement it
  }
}