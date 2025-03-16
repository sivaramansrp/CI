import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-formulario-operacion-comercial',
  standalone: true,
  imports: [CommonModule, CatalogoSelectComponent],
  templateUrl: './formulario-operacion-comercial.component.html',
  styleUrl: './formulario-operacion-comercial.component.scss',
})
export class FormularioOperacionComercialComponent implements OnInit {
  clave: Catalogo[] = []

  isReadonly = true;
  formularioOperacionForm!:FormGroup

   constructor(private fb: FormBuilder,private solicitudService: SolicitudService) { }
    
    ngOnInit(): void {
  
      this.formularioOperacionInitial()
  
      this.solicitudService.getclave().subscribe((data) => {
        this.clave = data;
      }
      );
  
    }
  
    formularioOperacionInitial(){
      this.formularioOperacionForm = this.fb.group({
        noLicenciaSanitaria:[''],
        regimen:['',Validators.required],

     })
    }

  toggleReadonly(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.isReadonly = !checkbox.checked;
  }
}
