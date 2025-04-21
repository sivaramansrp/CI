import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlesFisicoComponent } from '../controles-fisico/controles-fisico.component';
import { GestionAduaneraComponent } from '../gestion-aduanera/gestion-aduanera.component';
import { ProfilesDomocilioDelaComponent } from '../profiles-domocilio-dela/profiles-domocilio-dela.component';
import { SeguridadFisicaComponent } from '../seguridad-fisica/seguridad-fisica.component';
import { SeguridadProcesosComponent } from '../seguridad-procesos/seguridad-procesos.component';
import { SociosComercialesComponent } from '../socios-comerciales/socios-comerciales.component';

@Component({
  selector: 'app-perfiles-mensajeria',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProfilesDomocilioDelaComponent,
    SeguridadFisicaComponent,
    ControlesFisicoComponent,
    SociosComercialesComponent,
    SeguridadProcesosComponent,
    GestionAduaneraComponent
  ],
  templateUrl: './perfiles-mensajeria.component.html',
  styleUrls: ['./perfiles-mensajeria.component.css'],
})
export class PerfilesMensajeriaComponent {
  profileForm!: FormGroup;
  mostrarContenido: boolean = false;
  mostrarSeguridad: boolean = false;
  mostrarAccesoFisico: boolean = false;
  mostrarSociosComeciales: boolean = false;
  mostrarSeguridadProcesos: boolean = false;
  mostrarGestionAduanera: boolean = false;
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

  alternarSeguridad(): void {
    this.mostrarSeguridad = !this.mostrarSeguridad;
  }

  alternarAccesoFisico(): void {
    this.mostrarAccesoFisico = !this.mostrarAccesoFisico;
  }

  alternarSociosComerciales(): void {
    this.mostrarSociosComeciales = !this.mostrarSociosComeciales;
  }

  alternarSeguridadProcesos(): void {
    this.mostrarSeguridadProcesos = !this.mostrarSeguridadProcesos;
  }

  alternarGestionAduanera(): void {
    this.mostrarGestionAduanera = !this.mostrarGestionAduanera;
  }
}
