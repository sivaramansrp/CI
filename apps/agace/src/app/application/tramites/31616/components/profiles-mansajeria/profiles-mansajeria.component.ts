import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlesFisicoComponent } from '../controles-fisico/controles-fisico.component';
import { ProfilesDomocilioDelaComponent } from '../profiles-domocilio-dela/profiles-domocilio-dela.component';
import { SeguridadFisicaComponent } from '../seguridad-fisica/seguridad-fisica.component';
import { SociosComercialesComponent } from '../socios-comerciales/socios-comerciales.component';

@Component({
  selector: 'app-profiles-mansajeria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ProfilesDomocilioDelaComponent,SeguridadFisicaComponent,ControlesFisicoComponent,SociosComercialesComponent],
  templateUrl: './profiles-mansajeria.component.html',
  styleUrls: ['./profiles-mansajeria.component.css'],
})
export class ProfilesMansajeriaComponent {
  profileForm!: FormGroup;
  mostrarContenido: boolean = false;
  mostrarSeguridad: boolean = false;
  mostrarAccesoFisico: boolean = false;
  mostrarSociosComeciales: boolean = false;
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

  alternarSeguridad():void {
    this.mostrarSeguridad = !this.mostrarSeguridad;
  }

  alternarAccesoFisico():void {
    this.mostrarAccesoFisico = !this.mostrarAccesoFisico;
  }

  alternarSociosComerciales():void {
    this.mostrarSociosComeciales = !this.mostrarSociosComeciales;
  }
}

