import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-aduanero',
  templateUrl: './aduanero.component.html',
  styleUrl: './aduanero.component.scss',
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AduaneroComponent {
  preOperativeForm! : FormGroup
}
