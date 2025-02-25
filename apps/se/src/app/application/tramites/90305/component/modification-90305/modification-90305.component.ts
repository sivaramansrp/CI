
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultadDomicilios90305Component } from '../consultad-domicilios-90305/consultad-domicilios-90305.component';

@Component({
  selector: 'app-modification-90305',
  standalone: true,
  imports: [CommonModule,ConsultadDomicilios90305Component],
  templateUrl: './modification-90305.component.html',
  styleUrl: './modification-90305.component.scss',
})
export class Modification90305Component {}
