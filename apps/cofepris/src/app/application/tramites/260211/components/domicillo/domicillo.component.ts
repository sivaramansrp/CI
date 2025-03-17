import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-domicillo',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule
  ],
  templateUrl: './domicillo.component.html',
  styleUrl: './domicillo.component.css',
})
export class DomicilloComponent implements OnInit {
  constructor(private readonly fb: FormBuilder){}

  /**
   * Grupo de formularios principal.
   * @property {FormGroup} domicilio
   */
  domicilio!: FormGroup;
  
  ngOnInit(){
    this.domicilio = this.fb.group({
      codigoPostal: ['', Validators.required],
    });
  }
}
