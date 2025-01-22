import { Component, ElementRef, ViewChild } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Transportista } from '../../../../core/models/303/secciones.model';

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
      private toastr: ToastrService,
    ) {}
  
    abrirModal() {
      this.modal = 'show';
    }
  
    cerrarModal() { 
      this.closeModal.nativeElement.click();
      
    }
    
    agregarTransportista() {
      if(!this.formTransportista.valid) {
        return;
      }
      const transportista = this.formTransportista.value;
      this.transportistas.push(transportista);
      this.formTransportista.reset();
      this.cerrarModal();
    }
    
}
