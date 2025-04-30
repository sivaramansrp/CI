import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [CommonModule,
    CommonModule,
    FirmaElectronicaComponent
  ],
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {}
