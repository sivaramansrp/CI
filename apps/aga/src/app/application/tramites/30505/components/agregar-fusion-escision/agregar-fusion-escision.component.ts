import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule,Location } from '@angular/common';
// import { ModalGridAgregarFusionEscisionService } from './modalGridAgregarFusionEscision.service'; // Service calls are commented out as per instructions

@Component({
  selector: 'app-agregar-fusion-escision',
  templateUrl: './agregar-fusion-escision.component.html',
  styleUrls: ['./agregar-fusion-escision.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AgregarFusionEscisionComponent implements OnInit {
  fusionEscisionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    // private modalGridAgregarFusionEscisionService: ModalGridAgregarFusionEscisionService // Service injection is commented out
  ) {
    this.fusionEscisionForm = this.fb.group({
      certificacionModal: [''], // Radio buttons, no validators
      
      // Controls for "conCertificacion"
      rfcBusquedaModal: ['', Validators.required],
      razonSocialFusionante: [{ value: '', disabled: true }, Validators.required],
      folioVucemFusionante: [{ value: '', disabled: true }, Validators.required],
      fechaInicioVigenciaFusionante: [{ value: '', disabled: true }, Validators.required],
      fechaFinVigenciaFusionante: [{ value: '', disabled: true }, Validators.required],
      
      // Controls for "sinCertificacion"
      rfcBusquedaModalSC: ['', Validators.required],
      razonSocialFusionanteSC: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  mostrarCertificacion(): void {
    // This function is triggered when certificationModal radio button is clicked
    const valor = this.fusionEscisionForm.get('certificacionModal')?.value;
    if (valor === '1') {
      this.fusionEscisionForm.get('razonSocialFusionante')?.disable();
      this.fusionEscisionForm.get('folioVucemFusionante')?.disable();
      this.fusionEscisionForm.get('fechaInicioVigenciaFusionante')?.disable();
      this.fusionEscisionForm.get('fechaFinVigenciaFusionante')?.disable();
      this.fusionEscisionForm.get('razonSocialFusionanteSC')?.disable();
    } else if (valor === '0') {
      this.fusionEscisionForm.get('razonSocialFusionante')?.disable();
      this.fusionEscisionForm.get('folioVucemFusionante')?.disable();
      this.fusionEscisionForm.get('fechaInicioVigenciaFusionante')?.disable();
      this.fusionEscisionForm.get('fechaFinVigenciaFusionante')?.disable();
      this.fusionEscisionForm.get('razonSocialFusionanteSC')?.enable();
    }
  }

  cargarDatosPersonaFusionada(): void {
    // this.modalGridAgregarFusionEscisionService.cargarDatosPersonaFusionada(this.fusionEscisionForm.value).subscribe(
    //   (response) => {
    //     // Handle successful response
    //   },
    //   (error) => {
    //     // Handle error
    //   }
    // );
    // Placeholder for cargarDatosPersonaFusionada implementation
  }

  agregarFusionEscision(): void {
    // this.modalGridAgregarFusionEscisionService.agregarFusionEscision(this.fusionEscisionForm.value).subscribe(
    //   (response) => {
    //     // Handle successful addition
    //   },
    //   (error) => {
    //     // Handle error
    //   }
    // );
    // Placeholder for agregarFusionEscision implementation
  }

  cerrarDialogoFusionEscision(): void {
  this.ubicaccion.back();
  }
}