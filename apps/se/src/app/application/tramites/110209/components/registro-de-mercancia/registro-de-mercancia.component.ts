/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from "@ng-mf/data-access-user";
import { MercanciasService } from '../../services/mercancias/mercancias.service';

import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';





@Component({
  selector: 'app-registro-de-mercancia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent],
  templateUrl: './registro-de-mercancia.component.html',
  styleUrl: './registro-de-mercancia.component.scss',
})
export class RegistroDeMercanciaComponent implements OnInit,OnDestroy {

  mercanciaFrom!: FormGroup;
  tipoFacturaOptions!:Catalogo[];
  unidadOptions!:Catalogo[];

    private destroyed$ = new Subject<void>();

  constructor(private fb: FormBuilder , private service: MercanciasService , private router: Router,private tramite110209Query: Tramite110209Query ) { 
    this.mercanciaFrom = this.fb.group({
      nombreComercial: [{ value: '', disabled: true }],
      nombreIngles: [{ value: '', disabled: true }],
      descripcion: ['',Validators.pattern(/^(?!\s)(.*\S)?$/)],
      marca: ['',Validators.pattern(/^(?!\s)(.*\S)?$/)],
      valorMercancia: ['', Validators.pattern(/^\d{0,15}(\.\d{1,4})?$/)],
      cantidad: [{ value: '', disabled: true },Validators.pattern( /^\d{0,15}(\.\d{1,4})?$/)],
      unidadMedida: [''],
      numeroFactura: ['', Validators.pattern(/^[A-Za-z0-9Ññ]+$/)],
      tipoFactura: [''],
      fechaFactura: [{ value: '', disabled: true }]
    });
  }


  ngOnInit():void {
    
    this.getMercanciasValor();
    this.getTipoFactura();
    this.getUnidadValor()
  }

  getTipoFactura():void{
    this.service.getTipoDeFactura().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data:Catalogo[]) => {
        this.tipoFacturaOptions=data
      }
    );

  }


  getUnidadValor():void{
    this.service.getUnidad().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data:Catalogo[]) => {
        this.unidadOptions=data
      }
    );

  }

  getMercanciasValor(): void {
    this.tramite110209Query.selectTramite110102$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.mercanciaFrom.patchValue(
          {
            nombreComercial: data.mercanciasSeleccionadas.nombreComercial,
            nombreIngles: data.mercanciasSeleccionadas.nombreIngles,
            cantidad:21343,
            fechaFactura:'2025-02-25'
          }
        )
      }
    );
  }

  onNavigate(): void {  
    this.router.navigate(['/se/certificado-sgp/solicitud']);
 
   }


   ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete()

  }


}
