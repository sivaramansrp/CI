import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transportista } from '@ng-mf/data-access-user';

@Component({
  selector: 'datos-transportista',
  templateUrl: './datos-transportista.component.html',
  styleUrl: './datos-transportista.component.scss'
})
export class DatosTransportistaComponent {
  modal: string = 'modal';
  transportistas: Array<Transportista> = [];
  @ViewChild('closeModal') closeModal!: ElementRef;
  formTransportista: FormGroup = this.fb.group({
      transportista: ['', [Validators.required]],
      tipoPersona:['', [Validators.required]],
      taxId: ['', [Validators.required]],
      razonSocial: ['', [Validators.required]],
      rfc: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      primerApellido: ['', [Validators.required]],
      segundoApellido: ['', [Validators.required]],

  });
    constructor(private fb: FormBuilder,
    ) {}
  
    abrirModal(): void {
      this.modal = 'show';
    }
  
    cerrarModal(): void { 
      this.closeModal.nativeElement.click();
      
    }
    
    agregarTransportista(): void {
      if(!this.formTransportista.valid) {
        return;
      }
      const TRANSPORTISTA = this.formTransportista.value;
      this.transportistas.push(TRANSPORTISTA);
      this.formTransportista.reset();
      this.cerrarModal();
    }
    
}
