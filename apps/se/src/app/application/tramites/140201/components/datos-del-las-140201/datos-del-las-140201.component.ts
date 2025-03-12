import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NotifDomicileComponent } from '../NotifDomicile/NotifDomicile.component';
@Component({
  selector: 'app-datos-del-las-140201',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule ,NotifDomicileComponent],
  templateUrl: './datos-del-las-140201.component.html',
  styleUrl: './datos-del-las-140201.component.scss',
})
export class DatosDelLas140201Component implements OnInit {
  authNotifPersonsForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    //constructor
  }
  ngOnInit(): void {
    this.authNotifPersonsForm = this.fb.group({
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      correoElectronico: [''],
    });
  }
}
