import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-representante-legal',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule
  ],
  templateUrl: './representanteLegal.component.html',
  styleUrl: './representanteLegal.component.css',
})
export class RepresentanteLegalComponent implements OnInit{
  constructor(private readonly fb: FormBuilder){}
    
      /**
       * Grupo de formularios principal.
       * @property {FormGroup} representante
       */
      representante!: FormGroup;

    ngOnInit(): void {
      this.representante = this.fb.group({
        rfc:['',Validators.required],
        nombre:[{value:'',disabled:true}, Validators.required],
        apellidoPaterno:[{value:'',disabled:true}, Validators.required],
        apellidoMaterno:[{value:'',disabled:true}],
      });
    }

    obtenerValor(){
      this.representante.patchValue({
        nombre:47875,
        apellidoPaterno:'Paterno',
        apellidoMaterno:'Materno'
      })
    }
}
