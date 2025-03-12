import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { EncabezadoRequerimientoComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-autorizar-dictamen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EncabezadoRequerimientoComponent],
  templateUrl: './autorizar-dictamen.component.html',
  styleUrl: './autorizar-dictamen.component.css',
})
export class AutorizarDictamenComponent implements OnInit{   
  dictamenForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.dictamenForm = this.fb.group({
      cumplimiento: ['1'], 
      mensajeDictamen: [{ value: '', disabled: true }]      
    });
    
  }
  ngOnInit(): void {
    this.dictamenForm.get('mensajeDictamen')?.enable();
    this.dictamenForm.get('mensajeDictamen')?.setValue(this.obtenerNombreDelTítulo(1));
    this.dictamenForm.get('mensajeDictamen')?.disable();
  }

  BtnAutorizar() {  
    this.router.navigate(['funcionario/firma-electronica']);
  } 

  obtenerNombreDelTítulo(valor: number) {
    switch (valor) {
      case 1:
        return 'Justificacion del dictamen 1';
      case 2:
        return 'Sin justificacion';  
      default:
        return 'mensaje no encontrado';
    }
  }

}
