import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeguridadFisicaComponent } from '../seguridad-fisica/seguridad-fisica.component';

@Component({
  selector: 'app-profiles-mansajeria',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule, SeguridadFisicaComponent],
  templateUrl: './profiles-mansajeria.component.html',
  styleUrl: './profiles-mansajeria.component.css',
})
export class ProfilesMansajeriaComponent {
  profileForm!:FormGroup;
  mostrarContenido = false;
  showSeguridad = false;
  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      domicilio: [''],
      antiguedad: [''],
      productos: [''],
      embarquesExp: [''],
      embarquesImp: [''],
      empleados: [''],
      superficie: [''],
      nombre: [''],
      categoria: [''],
      vigencia: [''],
      nombre2: [''],
      categoria2: [''],
      vigencia2: [''],
      nombre3: [''],
      categoria3: [''],
      vigencia3: ['']
    })
  }

alternarContenido(): void {
  this.mostrarContenido = !this.mostrarContenido;
}

toggleSeguridad() {
  this.showSeguridad = !this.showSeguridad;
}
}
