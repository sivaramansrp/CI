import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { AvisoCalculoService } from './avisoCalculo.service'; // Service import commented out as per instructions

@Component({
  selector: 'app-aviso-calculo',
  templateUrl: './aviso-calculo.component.html',
  styleUrl:'./aviso-calculo.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  // providers: [AvisoCalculoService] // Service provider commented out as per instructions
})
export class AvisoCalculoComponent implements OnInit {
  avisoDeCalForm!: FormGroup;
  // dvMessageVisible: boolean = false;
  montoContribuVisible: boolean = false;
  montoTotalContribucionesVisible: boolean = false;
  tblErrorCalculo: string = '';

  constructor(private fb: FormBuilder
    // private avisoCalculoService: AvisoCalculoService // Service injection commented out as per instructions
  ) {}

  ngOnInit(): void {
    this.avisoDeCalForm = this.fb.group({
      capacidadAlmacenamiento: ['', Validators.required],
      tipoSolicitudPexim: ['', Validators.required],
      actividadProductiva: ['', Validators.required],
      tipoCaat: ['', Validators.required],
      tipoProgFomExp: ['', Validators.required],
      tipoTransito: ['', Validators.required],
      numeroEstablecimiento: ['', Validators.required],
      medioTransporte: ['', Validators.required],
      nombreBanco: ['', Validators.required],
      nomOficialAutorizado: ['', Validators.required],
      observaciones: ['', Validators.required],
      empresaControladora: ['', Validators.required],
      descripcionLugarEmbarque: [''] // Added missing form control without validators
    });

    // Subscribe to form changes to reset messages
    this.avisoDeCalForm.valueChanges.subscribe(() => {
      //this.dvMessageVisible = false;
      this.tblErrorCalculo = '';
    });
  }

  validaRadioCalculo(): void {
    const capacidad = this.avisoDeCalForm.get('capacidadAlmacenamiento')?.value;
    this.montoContribuVisible = capacidad === '1';

    const empresa = this.avisoDeCalForm.get('empresaControladora')?.value;
    this.montoTotalContribucionesVisible = empresa === '1';
  }

  // Example method to handle form submission
  onSubmit(): void {
    // if (this.avisoDeCalForm.invalid) {
    //   this.dvMessageVisible = true;
    //   this.tblErrorCalculo = 'Por favor, complete todos los campos requeridos.';
    //   return;
    }

    // Commented out service call as per instructions
    // this.avisoCalculoService.submitForm(this.form.value).subscribe(
    //   response => {
    //     // Handle successful response
    //   },
    //   error => {
    //     // Handle error response
    //   }
    // );
  // }

  // Additional helper methods can be added here as needed
}