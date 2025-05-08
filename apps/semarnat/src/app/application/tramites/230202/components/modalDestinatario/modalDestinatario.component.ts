import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ModalDestinatarioService } from './modalDestinatario.service'; // Commented out as per instructions

@Component({
  selector: 'app-modal-destinatario',
  templateUrl: './modal-destinatario.component.html',
  // providers: [ModalDestinatarioService] // Commented out as per instructions
})
export class ModalDestinatarioComponent implements OnInit {
  modalDestinatario: FormGroup;

  constructor(private fb: FormBuilder /*, private modalService: ModalDestinatarioService */ ) {
    this.modalDestinatario = this.fb.group({
      nacionalidad: [{ value: '', disabled: true }, Validators.required],
      tipoPersona: ['', Validators.required],
      razonSocial: ['', Validators.maxLength(250)],
      nombre: ['', Validators.maxLength(200)],
      apellidoPaterno: ['', Validators.maxLength(200)],
      apellidoMaterno: ['', Validators.maxLength(200)],
      codigoPostal: ['', [Validators.required, Validators.maxLength(15)]],
      paisSinMexico: [''],
      pais: [''],
      descripcionPais: [''],
      ciudad: ['', [Validators.required, Validators.maxLength(120)]],
      domicilio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization logic can be added here if necessary
  }

  personaFisica(): void {
    // Logic to handle selection of "Persona Física"
    // Example: Enable relevant form controls or perform other actions
    // this.modalService.handlePersonaFisica(); // Commented out as per instructions
  }

  personaMoral(): void {
    // Logic to handle selection of "Persona Moral"
    // Example: Enable relevant form controls or perform other actions
    // this.modalService.handlePersonaMoral(); // Commented out as per instructions
  }

  cancelar(): void {
    // Logic to handle the cancel action
    // Example: Reset the form or close the modal
    this.modalDestinatario.reset();
    // this.modalService.closeModal(); // Commented out as per instructions
  }

  guardar(): void {
    if (this.modalDestinatario.valid) {
      const formData = this.modalDestinatario.value;
      // Logic to handle form submission
      // Example: Call a service to save the data
      // this.modalService.saveDestinatario(formData).subscribe(response => {
      //   // Handle response
      // });
    } else {
      // Handle form validation errors
      this.markAllFieldsAsTouched();
    }
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.modalDestinatario.controls).forEach(field => {
      const control = this.modalDestinatario.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}