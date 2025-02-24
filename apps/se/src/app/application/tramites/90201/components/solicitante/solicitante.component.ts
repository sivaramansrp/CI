/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-solicitante',
  standalone: true,
  imports: [CommonModule,TituloComponent,ReactiveFormsModule],
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.css',
})
export class SolicitanteComponent {

  public solicitudForm!: FormGroup;


  constructor(private fb: FormBuilder) {
    this.establecerSolicitudForm();
   }

  ngOnInit(): void {
    this.establecerValoresDeFormulario();
  }

  public establecerSolicitudForm(): void {
    this.solicitudForm = this.fb.group({
      rfc: [{value: '',disabled: true}],
      denominacion: [{value: '',disabled: true}],
      actividadEconomica: [{value: '',disabled: true}],
      correoElectronico: [{value: '',disabled: true}]
    });
  }

  public establecerValoresDeFormulario(): void {
    this.solicitudForm.get('rfc')?.setValue('AALM87326');
    this.solicitudForm.get('denominacion')?.setValue('SVHGSA ASCV 332');
    this.solicitudForm.get('actividadEconomica')?.setValue('SIMa gsys');
    this.solicitudForm.get('correoElectronico')?.setValue('SV US');
  }


}
