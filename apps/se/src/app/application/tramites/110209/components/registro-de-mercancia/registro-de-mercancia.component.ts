import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MercanciasService } from '../../services/mercancias/mercancias.service';

import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registro-de-mercancia',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './registro-de-mercancia.component.html',
  styleUrl: './registro-de-mercancia.component.scss',
})
export class RegistroDeMercanciaComponent implements OnInit {

  mercanciaFrom!: FormGroup;
    private destroyed$ = new Subject<void>();

  constructor(private fb: FormBuilder , private service: MercanciasService , private router: Router) { 
    this.mercanciaFrom = this.fb.group({
      nombreComercial: [''],
      nombreIngles: [''],
      descripcion: [''],
      marca: [''],
      valorMercancia: [''],
      cantidad: [''],
      unidadMedida: [''],
      numeroFactura: [''],
      tipoFactura: [''],
      fechaFactura: ['']
    });
  }

  ngOnInit():void {
    
    this.getMercancias();
  }

  getMercancias(): void {
    this.service.getMercancias().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.mercanciaFrom.patchValue(
          {
            nombreComercial: data.nombreComercial,
            nombreIngles: data.nombreIngles,
          }
        )
      }
    );
  }

  onNavigate(): void {  
    this.router.navigate(['/se/certificado-sgp/solicitud']);
 
   }
}
