import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-entidad-externa-140201',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  templateUrl: './entidad-externa-140201.component.html',
  styleUrl: './entidad-externa-140201.component.scss',
})
export class EntidadExterna140201Component implements OnInit {
  entidadForm!: FormGroup;
 constructor(private fb: FormBuilder
  ) {
    //constructor
  }

  ngOnInit(): void {
    this.entidadForm = this.fb.group({
      nombreDeEntidad: ['', [Validators.required]],
    });
  }
}
