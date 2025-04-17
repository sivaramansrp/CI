import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilesDomocilioDelaComponent } from '../profiles-domocilio-dela/profiles-domocilio-dela.component';

@Component({
  selector: 'app-profiles-mansajeria',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,ProfilesDomocilioDelaComponent],
  templateUrl: './profiles-mansajeria.component.html',
  styleUrl: './profiles-mansajeria.component.css',
})
export class ProfilesMansajeriaComponent {
  profileForm!:FormGroup;
  mostrarContenido = false;
  public hasAgregar:boolean = false;
  constructor(private fb: FormBuilder) {
}

alternarContenido(): void {
  this.mostrarContenido = !this.mostrarContenido;
}

public agregar(agregar:string) {
  if(agregar === 'Agregar'){
    this.hasAgregar = true;
  }
}
}
