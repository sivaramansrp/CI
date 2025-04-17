import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguridadFisicaComponent } from '../seguridad-fisica/seguridad-fisica.component';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilesDomocilioDelaComponent } from '../profiles-domocilio-dela/profiles-domocilio-dela.component';

@Component({
  selector: 'app-profiles-mansajeria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ProfilesDomocilioDelaComponent,SeguridadFisicaComponent,],
  templateUrl: './profiles-mansajeria.component.html',
  styleUrls: ['./profiles-mansajeria.component.css'],
})
export class ProfilesMansajeriaComponent {
  profileForm!: FormGroup;
  mostrarContenido = false;
  showSeguridad = false;
  public hasAgregar: boolean = false;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      domicilio: new FormControl(''),
      antiguedad: new FormControl(''),
      productos: new FormControl(''),
      embarquesExp: new FormControl(''),
      embarquesImp: new FormControl(''),
      empleados: new FormControl(''),
      superficie: new FormControl(''),
      nombre: new FormControl(''),
      categoria: new FormControl(''),
      vigencia: new FormControl(''),
      nombre2: new FormControl(''),
      categoria2: new FormControl(''),
      vigencia2: new FormControl(''),
      nombre3: new FormControl(''),
      categoria3: new FormControl(''),
      vigencia3: new FormControl(''),
    });
  }

  alternarContenido(): void {
    this.mostrarContenido = !this.mostrarContenido;
  }

  toggleSeguridad():void {
    this.showSeguridad = !this.showSeguridad;
  }
}

