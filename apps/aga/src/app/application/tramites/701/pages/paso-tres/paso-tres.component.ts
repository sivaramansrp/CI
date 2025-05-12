/* eslint-disable no-empty-function */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BtnContinuarComponent, FirmaElectronicaComponent } from '@ng-mf/data-access-user';
/**
 * Componente para el paso tres del wizard.
 */
@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss'],
  standalone: true,
      imports: [BtnContinuarComponent,FormsModule,ReactiveFormsModule,CommonModule,FirmaElectronicaComponent],
  
})
export class PasoTresComponent {

  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento.
   */
  constructor(private router: Router) {}

  /**
   * Obtiene la firma y navega a la página de acuse si la firma es válida.
   * @param {string} ev - La firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']);
    }
  }
}
