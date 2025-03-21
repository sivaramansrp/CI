import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-solicitante',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './solicitante.component.html',
  styleUrl: './solicitante.component.scss'
})
export class SolicitanteComponent implements OnInit{

public solicitudForm!:FormGroup;

constructor(private fb: FormBuilder){
  this.establecerSolicitudForm();
}

ngOnInit(): void {
  this.establecerSolicitudForm();
}

public establecerSolicitudForm(): void {
  this.solicitudForm = this.fb.group({
    rfc: [{ value: '', disabled: true }],
    denominacion: [{ value: '', disabled: true }],
    actividadEconomica: [{ value: '', disabled: true }],
    correoElectronico: [{ value: '', disabled: true }],
    pais: [{ value: '', disabled: true }],
    codigoPostal: [{ value: '', disabled: true }],
    estado: [{ value: '', disabled: true }],
    municipioAlcaldia: [{ value: '', disabled: true }],
    localidad: [{ value: '', disabled: true }],
    colonia: [{ value: '', disabled: true }],
    calle: [{ value: '', disabled: true }],
    numeroExterior: [{ value: '', disabled: true }],
    numeroInterior: [{ value: '', disabled: true }],
    lada: [{ value: '', disabled: true }],
    telefono: [{ value: '', disabled: true }]
  });
}


// public establecerValoresDeFormulario(): void {
//   this.solicitudForm.get('rfc')?.setValue('AALM87326');
//   this.solicitudForm.get('denominacion')?.setValue('SVHGSA ASCV 332');
//   this.solicitudForm.get('actividadEconomica')?.setValue('SIMa gsys');
//   this.solicitudForm.get('correoElectronico')?.setValue('SV US');
//   this.solicitudForm.get('pais')?.setValue('ESTADOS UNIDOS MEXICANOS');
//     this.solicitudForm.get('codigoPostal')?.setValue('81210');
//     this.solicitudForm.get('estado')?.setValue('SINALOA');
//     this.solicitudForm.get('municipioAlcaldia')?.setValue('AHOME');
//     this.solicitudForm.get('localidad')?.setValue('LOS MOCHIS');
//     this.solicitudForm.get('colonia')?.setValue('MIGUEL HIDALGO');
//     this.solicitudForm.get('calle')?.setValue('CAMINO VIEJO');
//     this.solicitudForm.get('numeroExterior')?.setValue('1353')
// }
}
